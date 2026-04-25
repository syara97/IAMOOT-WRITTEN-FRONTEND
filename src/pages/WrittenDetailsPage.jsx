import React, { useContext, useEffect, useState } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";
import { JudgeIDContext } from '../contexts/JudgeIDContext';

import questionText from '../data/writtenRubric';

const WrittenDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); 
    const { memorandumID } = useParams(); 
    const performNavigation = useNavigate();
    const { judgeID } = useContext(JudgeIDContext);
    const numericJudgeID = Number(judgeID);


    const [memorandumLink, setMemorandumLink] = useState('');
    const [isMemoLinkLoading, setIsMemoLinkLoading] = useState(true);
    const [memoLinkError, setMemoLinkError] = useState('');
    const [isScoreLoading, setIsScoresLoading] = useState(true);
    const [scoresLoadError, setIsScoresLoadError] = useState('');
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccessMsg, setSubmitSuccessMsg] = useState('');

    const pageText = {
        EN: {pageTitle: 'Memorandum', labelPrompt: 'Enter score', errorMessage: 'Please enter a value for the above field', submitMsg: 'Submit score', openMemoMsg: 'Open Memorandum in Dropbox', loadingMemoMsg: 'Loading memorandum link...', memoLoadErrorMsg: 'Unable to load memorandum link' },
        SPA: {pageTitle: "Memorándum", labelPrompt: "Ingrese puntuación", errorMessage: "Por favor, ingrese un valor para el campo anterior", submitMsg: "Registrar puntuación", openMemoMsg: "Abrir memorándum en Dropbox", loadingMemoMsg: "Cargando enlace del memorándum...", memoLoadErrorMsg: "No se pudo cargar el enlace del memorándum" },
        POR: {pageTitle:"Memorando", labelPrompt: "Insira a pontuação", errorMessage: "Por favor, insira um valor para o campo acima", submitMsg: "Registrar pontuação", openMemoMsg: "Abrir memorando no Dropbox", loadingMemoMsg: "Carregando link do memorando...", memoLoadErrorMsg: "Não foi possível carregar o link do memorando" }
    };

    const actualText = pageText[currentLanguage]; 
    const actualFormText = questionText[currentLanguage]; 
    
    //const judgeID = sessionStorage.getItem('judgeID');

    const handleSignOut = () => {
            resetLanguage(); 
            assignRole(''); 
            performNavigation('/');
        };
    
    /*********************************
     * CHECKS THAT THE ROLE IS JUDGE *
    *********************************/
    useEffect(() => {
        if (currentRole !== 'Judge'){
            handleSignOut(); 
        }
    }, [currentRole]);

    useEffect(() => {
        async function fetchMemorandumLink() {
            try {
                setIsMemoLinkLoading(true);
                setMemoLinkError('');
                setMemorandumLink('');

                const backendBaseURL = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(`${backendBaseURL}/api/written-memorandums/${memorandumID}/link`);
                const responseData = await response.json();

                if (!response.ok || !responseData.ok || !responseData.sharedLink) {
                    throw new Error(responseData.message ||'Unable to fetch memorandum link');
                }

                setMemorandumLink(responseData.sharedLink);
            } catch (linkError) {
                console.error('MEMORANDUM LINK FETCH ERROR:', linkError);
                setMemoLinkError(actualText.memoLoadErrorMsg);
            } finally {
                setIsMemoLinkLoading(false);
            }
        }

        if (memorandumID) {
            fetchMemorandumLink();
        }
    }, [memorandumID, actualText.memoLoadErrorMsg]);

    useEffect(() => {
        async function fetchSavedScores() {
            if (!memorandumID || Number.isNaN(numericJudgeID)) {
                setIsScoresLoading(false);
                setIsScoresLoadError('Judge ID not found');
                return;
            }

            try {
                setIsScoresLoading(true);
                setIsScoresLoadError('')
                setSubmitError('');
                setSubmitSuccessMsg('');

                const backendBaseURL = import.meta.env.VITE_API_BASE_URL;
                const response = await fetch(
                    `${backendBaseURL}/api/written-memoranda/${memorandumID}/scores/${numericJudgeID}`
                );

                const responseData = await response.json();

                if (!response.ok) {
                    throw new Error(responseData.message || 'Unable to fetch saved scores');
                }

                if (responseData.hasSubmission && Array.isArray(responseData.submittedScores)) {
                    responseData.submittedScores.forEach((currentScore, scoreIndex ) => {
                        setValue(`submittedScores.${scoreIndex}`, currentScore);
                    });

                    setIsScoreSubmitted(true);
                } else {
                    setIsScoreSubmitted(false);
                }
            } catch (scoreError) {
                console.error('MEMORANDUM SCORES FETCH ERROR:', scoreError);
                setIsScoresLoadError(scoreError.message || 'Unable to load saved scores');
            } finally {
                setIsScoresLoading(false);
            }
        }

        fetchSavedScores();
    }, [memorandumID, judgeID, setValue]);



    const onSubmit =  async (someData) => {
        if (isScoreSubmitted) {
            setSubmitError('Scores for this memorandum were already submitted and are locked.');
            return;
        }
        
        try {
            setSubmitError('');
            setSubmitSuccessMsg('');

            const backendBaseURL = import.meta.env.VITE_API_BASE_URL;

            const response = await fetch(
                `${backendBaseURL}/api/written-memoranda/${memorandumID}/scores`,
                {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json'
                    }, 
                    body: JSON.stringify({
                        judgeID: numericJudgeID,
                        submittedScores: someData.submittedScores.map((score) => Number(score))
                    })
                }
            );
            const responseData = await response.json();
                    
            if (!response.ok) {
                throw new Error(responseData.message || 'Unable to submit scores');
            }

            setIsScoreSubmitted(true);
            
            alert('Scores submitted successfully.');

            performNavigation('/writtencomp/judge');

        } catch (submitScoresError) {
            console.error('WRITTEN SCORE SUBMIT ERROR:', submitScoresError);
            setSubmitError(submitScoresError.message || 'Unable to submit scores');
        }
    };
        
    return <div>
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.pageTitle} {memorandumID}</Card.Header>
        </Card>

        <Card className='mb-4'>
            <Card.Body>
                {isMemoLinkLoading && (
                    <div className='d-flex align-items-center gap-2 justify-content-center'>
                        <Spinner animation='border' size='sm' />
                        <span>{actualText.loadingMemoMsg}</span>
                        </div>
                )}

                {!isMemoLinkLoading && memoLinkError && (
                    <div className='text-danger fw-semibold'>{memoLinkError}</div>
                )}

                {!isMemoLinkLoading && memorandumLink && (
                    <div className='d-grid gap-2'>
                        <Button 
                            variant='primary'
                            onClick={() => window.open(memorandumLink, '_blank', 'noopener,noreferrer')}
                        >
                            {actualText.openMemoMsg}
                        </Button>
                    </div>
                )}
            </Card.Body>
        </Card>

        {isScoreLoading && (
            <div className='text-center mb-3'> Loading saved scores... </div>
        )}     

        {scoresLoadError && (
            <div className='text-danger fw-semibold mb-3'>{scoresLoadError}</div>
        )}

        {submitError && (
            <div className='text-danger fw-semibold mb-3'>{submitError}</div>
        )}

        {submitSuccessMsg && (
            <div className='text-success fw-semibold mb-3'>{submitSuccessMsg}</div>
        )}

        <Form onSubmit={handleSubmit(onSubmit)}>
            {actualFormText.map( (currentQuestion, questionIndex) => (
                <Card key={questionIndex} className='mb-4'>
                    <Card.Body>
                        <Card.Title>{currentQuestion.currentCategory}</Card.Title>
                        <ListGroup variant='flush'>
                            {currentQuestion.currentCriteria.map( (currentCriterion, criteriaIndex) => (
                                <ListGroup.Item key={criteriaIndex}>
                                    {currentCriterion}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Form.Group className='w-100'>
                            <div className='d-flex align-items-center gap-2'>
                                <Form.Label 
                                    className='fw-bold text-nowrap mb-0 me-2 d-flex align-items-center' 
                                    style={{height: '38px'}}
                                >
                                        {actualText.labelPrompt}
                                </Form.Label>

                                <Form.Control 
                                    type='number' 
                                    min={currentQuestion.minValue} 
                                    max={currentQuestion.maxValue} 
                                    disabled={isScoreSubmitted}
                                    onWheel={(someEvent) => someEvent.target.blur()}
                                    {...register(`submittedScores.${questionIndex}`, {
                                        required: actualText.errorMessage, 
                                        min: {
                                            value: currentQuestion.minValue,
                                            message: actualText.errorMessage
                                        }, 
                                        max: {
                                            value: currentQuestion.maxValue,
                                            message: actualText.errorMessage
                                        }
                                    })}
                                    onBlur={(someEvent) => {
                                        let targetValue = Number(someEvent.target.value); 
                                        if (targetValue < currentQuestion.minValue) { setValue(`submittedScores.${questionIndex}`, currentQuestion.minValue); }
                                        if (targetValue > currentQuestion.maxValue) { setValue(`submittedScores.${questionIndex}`, currentQuestion.maxValue); }
                                    }}
                                />
                            </div>
                            {errors.submittedScores?.[questionIndex] && (
                                <div className='text-danger mt-2 fw-semibold fs-italic'>
                                    {errors.submittedScores[questionIndex].message}
                                </div>
                            )}
                        </Form.Group>
                    </Card.Body>
            </Card> 
            ))}
            <div className='d-grid gap-2'>
                <Button variant='success' type='submit' disabled={isScoreSubmitted || isScoreLoading}>
                    {isScoreSubmitted ? 'Scores already submitted' : actualText.submitMsg}
                </Button>
            </div>
        </Form>
    </div>
};

export default WrittenDetailsPage; 