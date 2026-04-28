import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Alert, Button, Card, Form, ListGroup, Spinner } from 'react-bootstrap';

import api from '../services/api';
import { LanguageContext } from '../contexts/LanguageContext';

import questionText from '../data/writtenRubric';

const WrittenDetailsPage = () => {
    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const { memorandumID } = useParams();
    const performNavigation = useNavigate();

    const [memorandumLink, setMemorandumLink] = useState('');
    const [isMemoLinkLoading, setIsMemoLinkLoading] = useState(true);
    const [memoLinkError, setMemoLinkError] = useState('');

    const [isScoreLoading, setIsScoresLoading] = useState(true);
    const [scoresLoadError, setIsScoresLoadError] = useState('');
    const [isScoreSubmitted, setIsScoreSubmitted] = useState(false);

    const [submitError, setSubmitError] = useState('');

    const pageText = {
        EN: {
            pageTitle: 'Memorandum',
            labelPrompt: 'Enter score',
            errorMessage: 'Please enter a valid score for the above field',
            submitMsg: 'Submit score',
            alreadySubmittedMsg: 'Scores already submitted',
            openMemoMsg: 'Open Memorandum in Dropbox',
            loadingMemoMsg: 'Loading memorandum link...',
            memoLoadErrorMsg: 'Unable to load memorandum link',
            loadingScoresMsg: 'Loading saved scores...',
            scoreLoadErrorMsg: 'Unable to load saved scores',
            successMsg: 'Scores submitted successfully.',
            lockedMsg: 'Scores for this memorandum were already submitted and are locked.',
            benchMemoTitle: 'Bench Memorandum',
            openEnglishBenchMemoMsg: 'Open Bench Memorandum in English',
            openSpanishBenchMemoMsg: 'Open Bench Memorandum in Spanish'
        },
        SPA: {
            pageTitle: 'Memorándum',
            labelPrompt: 'Ingrese puntuación',
            errorMessage: 'Por favor, ingrese una puntuación válida para el campo anterior',
            submitMsg: 'Registrar puntuación',
            alreadySubmittedMsg: 'Puntuaciones ya registradas',
            openMemoMsg: 'Abrir memorándum en Dropbox',
            loadingMemoMsg: 'Cargando enlace del memorándum...',
            memoLoadErrorMsg: 'No se pudo cargar el enlace del memorándum',
            loadingScoresMsg: 'Cargando puntuaciones guardadas...',
            scoreLoadErrorMsg: 'No se pudieron cargar las puntuaciones guardadas',
            successMsg: 'Puntuaciones enviadas con éxito.',
            lockedMsg: 'Las puntuaciones para este memorándum ya fueron enviadas y están bloqueadas.',
            benchMemoTitle: 'Memorandos Inforamatio',
            openEnglishBenchMemoMsg: 'Abrir Memorándum Informativo en Inglés',
            openSpanishBenchMemoMsg: 'Abrir Memorándum Informativo en Español'
        },
        POR: {
            pageTitle: 'Memorando',
            labelPrompt: 'Insira a pontuação',
            errorMessage: 'Por favor, insira uma pontuação válida para o campo acima',
            submitMsg: 'Registrar pontuação',
            alreadySubmittedMsg: 'Pontuações já registradas',
            openMemoMsg: 'Abrir memorando no Dropbox',
            loadingMemoMsg: 'Carregando link do memorando...',
            memoLoadErrorMsg: 'Não foi possível carregar o link do memorando',
            loadingScoresMsg: 'Carregando pontuações salvas...',
            scoreLoadErrorMsg: 'Não foi possível carregar as pontuações salvas',
            successMsg: 'Pontuações enviadas com sucesso.',
            lockedMsg: 'As pontuações para este memorando já foram enviadas e estão bloqueadas.',
            benchMemoTitle: 'Memorandos Informativos',
            openEnglishBenchMemoMsg: 'Abrir Memorando Informativo em Inglês',
            openSpanishBenchMemoMsg: 'Abrir Memorando Informativo em Espanhol'
        }
    };

    const actualText = pageText[currentLanguage] || pageText.EN;
    const actualFormText = questionText[currentLanguage] || questionText.EN;

    const benchMemoLinks = {
        EN: 'https://docsend.com/view/xtg8bkmkuj35f77b',
        SPA: 'https://docsend.com/view/r5hdaevskcq3mj29'
    };

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        resetLanguage();
        performNavigation('/login', { replace: true });
    };

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');

        if (!authToken) {
            performNavigation('/login', { replace: true });
        }
    }, [performNavigation]);

    useEffect(() => {
        async function fetchMemorandumLink() {
            if (!memorandumID) {
                setIsMemoLinkLoading(false);
                setMemoLinkError(actualText.memoLoadErrorMsg);
                return;
            }

            try {
                setIsMemoLinkLoading(true);
                setMemoLinkError('');
                setMemorandumLink('');

                const response = await api.get(`/api/written-memoranda/${memorandumID}/link`);
                const responseData = response.data;

                if (!responseData?.ok || !responseData.sharedLink) {
                    throw new Error(responseData?.message || 'Unable to fetch memorandum link');
                }

                setMemorandumLink(responseData.sharedLink);
            } catch (linkError) {
                console.error('MEMORANDUM LINK FETCH ERROR:', linkError);

                if (linkError.response?.status === 401) {
                    handleSignOut();
                    return;
                }

                setMemoLinkError(actualText.memoLoadErrorMsg);
            } finally {
                setIsMemoLinkLoading(false);
            }
        }

        fetchMemorandumLink();
    }, [memorandumID, actualText.memoLoadErrorMsg]);

    useEffect(() => {
        async function fetchSavedScores() {
            if (!memorandumID) {
                setIsScoresLoading(false);
                setIsScoresLoadError(actualText.scoreLoadErrorMsg);
                return;
            }

            try {
                setIsScoresLoading(true);
                setIsScoresLoadError('');
                setSubmitError('');

                const response = await api.get(`/api/written-memoranda/${memorandumID}/my-score`);
                const responseData = response.data;

                if (responseData?.hasSubmission && Array.isArray(responseData.submittedScores)) {
                    responseData.submittedScores.forEach((currentScore, scoreIndex) => {
                        setValue(`submittedScores.${scoreIndex}`, currentScore);
                    });

                    setIsScoreSubmitted(true);
                } else {
                    setIsScoreSubmitted(false);
                }
            } catch (scoreError) {
                console.error('MEMORANDUM SCORES FETCH ERROR:', scoreError);

                if (scoreError.response?.status === 401) {
                    handleSignOut();
                    return;
                }

                setIsScoresLoadError(
                    scoreError.response?.data?.message ||
                    scoreError.message ||
                    actualText.scoreLoadErrorMsg
                );
            } finally {
                setIsScoresLoading(false);
            }
        }

        fetchSavedScores();
    }, [memorandumID, setValue, actualText.scoreLoadErrorMsg]);

    const onSubmit = async (someData) => {
        if (isScoreSubmitted) {
            setSubmitError(actualText.lockedMsg);
            return;
        }

        try {
            setSubmitError('');

            const response = await api.post(
                `/api/written-memoranda/${memorandumID}/my-score`,
                {
                    submittedScores: someData.submittedScores.map((score) => Number(score))
                }
            );

            const responseData = response.data;

            if (!responseData?.ok) {
                throw new Error(responseData?.message || 'Unable to submit scores');
            }

            setIsScoreSubmitted(true);

            alert(actualText.successMsg);

            performNavigation('/writtencomp/judge');
        } catch (submitScoresError) {
            console.error('WRITTEN SCORE SUBMIT ERROR:', submitScoresError);

            if (submitScoresError.response?.status === 401) {
                handleSignOut();
                return;
            }

            setSubmitError(
                submitScoresError.response?.data?.message ||
                submitScoresError.message ||
                'Unable to submit scores'
            );
        }
    };

    return (
        <div>
            <Card className='text-center mb-4'>
                <Card.Header as='h1' className='display-5 fw-bold'>
                    {actualText.pageTitle} {memorandumID}
                </Card.Header>
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

                            <hr className='my-3' />

                            <div className='fw-bold text-center'>
                                {actualText.benchMemoTitle} 
                            </div>

                            <Button
                                variant='secondary'
                                onClick={() => window.open(benchMemoLinks.EN, '_blank', 'noopener,noreferrer')}
                            >
                                {actualText.openEnglishBenchMemoMsg}
                            </Button>

                            <Button
                                variant='secondary'
                                onClick={() => window.open(benchMemoLinks.SPA, '_blank', 'noopener,noreferrer')}
                            >
                                {actualText.openSpanishBenchMemoMsg}
                            </Button>
                        </div>
                    )}
                </Card.Body>
            </Card>

            {isScoreLoading && (
                <div className='text-center mb-3'>{actualText.loadingScoresMsg}</div>
            )}

            {scoresLoadError && (
                <Alert variant='danger' className='fw-semibold mb-3'>
                    {scoresLoadError}
                </Alert>
            )}

            {submitError && (
                <Alert variant='danger' className='fw-semibold mb-3'>
                    {submitError}
                </Alert>
            )}

            <Form onSubmit={handleSubmit(onSubmit)}>
                {actualFormText.map((currentQuestion, questionIndex) => (
                    <Card key={questionIndex} className='mb-4'>
                        <Card.Body>
                            <Card.Title>{currentQuestion.currentCategory}</Card.Title>

                            <ListGroup variant='flush'>
                                {currentQuestion.currentCriteria.map((currentCriterion, criteriaIndex) => (
                                    <ListGroup.Item key={criteriaIndex}>
                                        {currentCriterion}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                            <Form.Group className='w-100'>
                                <div className='d-flex align-items-center gap-2'>
                                    <Form.Label
                                        className='fw-bold text-nowrap mb-0 me-2 d-flex align-items-center'
                                        style={{ height: '38px' }}
                                    >
                                        {actualText.labelPrompt}
                                    </Form.Label>

                                    <Form.Control
                                        type='number'
                                        min={currentQuestion.minValue}
                                        max={currentQuestion.maxValue}
                                        disabled={isScoreSubmitted || isScoreLoading}
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
                                            const rawValue = someEvent.target.value;

                                            if (rawValue === '') {
                                                return;
                                            }

                                            const targetValue = Number(rawValue);

                                            if (targetValue < currentQuestion.minValue) {
                                                setValue(`submittedScores.${questionIndex}`, currentQuestion.minValue);
                                            }

                                            if (targetValue > currentQuestion.maxValue) {
                                                setValue(`submittedScores.${questionIndex}`, currentQuestion.maxValue);
                                            }
                                        }}
                                    />
                                </div>

                                {errors.submittedScores?.[questionIndex] && (
                                    <div className='text-danger mt-2 fw-semibold fst-italic'>
                                        {errors.submittedScores[questionIndex].message}
                                    </div>
                                )}
                            </Form.Group>
                        </Card.Body>
                    </Card>
                ))}

                <div className='d-grid gap-2'>
                    <Button variant='success' type='submit' disabled={isScoreSubmitted || isScoreLoading}>
                        {isScoreSubmitted ? actualText.alreadySubmittedMsg : actualText.submitMsg}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default WrittenDetailsPage;