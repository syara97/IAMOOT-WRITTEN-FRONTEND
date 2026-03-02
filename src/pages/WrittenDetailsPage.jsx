import React, { useContext, useEffect } from 'react'; 
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom'; 
import { Button, Card, Form, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

import questionText from '../data/writtenRubric';

const WrittenDetailsPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { register, handleSubmit, formState: { errors }, setValue } = useForm(); 
    const { memorandumID } = useParams(); 
    const performNavigation = useNavigate(); 

    const pageText = {
        EN: {pageTitle: 'Memorandum', labelPrompt: 'Enter score', errorMessage: 'Please enter a value for the above field', submitMsg: 'Submit score'}, 
        ES: {pageTitle: "Memorándum", labelPrompt: "Ingrese puntuación", errorMessage: "Por favor, ingrese un valor para el campo anterior", submitMsg: "Registrar puntuación"},
        POR: {pageTitle: "Memorando", labelPrompt: "Insira a pontuação", errorMessage: "Por favor, insira um valor para o campo acima", submitMsg: "Registrar pontuação"}
    }

    const actualText = pageText[currentLanguage]; 
    const actualFormText = questionText[currentLanguage]; 

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

    const onSubmit = (someData) => {
        let totalScore = 0; 
        (someData.submittedScores).forEach( (currentScore) => {
            totalScore = totalScore + Number(currentScore); 
        })
        console.log(`totalScore is ${totalScore}`);
        performNavigation('/writtencomp/judge');
    }
        
    return <div>
        <Card className='text-center mb-4'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.pageTitle} {memorandumID}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)}>
            {actualFormText.map( (currentQuestion, questionIndex) => (
            <Card key={questionIndex} className='mb-4'>
                    <Card.Body>
                        <Card.Title>{currentQuestion.currentCategory}</Card.Title>
                        <ListGroup variant='flush'>
                            {currentQuestion.currentCriteria.map( (currentCriterion, criteriaIndex) => (
                                <ListGroup.Item key={criteriaIndex}>{currentCriterion}</ListGroup.Item>
                            ))}
                        </ListGroup>

                        <Form.Group className='w-100'>
                            <div className='d-flex align-items-center gap-2'>
                                <Form.Label className='fw-bold text-nowrap mb-0 me-2 d-flex align-items-center' style={{height: '38px'}}>{actualText.labelPrompt}</Form.Label>
                                <Form.Control 
                                    type='number' 
                                    min={currentQuestion.minValue} 
                                    max={currentQuestion.maxValue} 
                                    onWheel={(someEvent) => someEvent.target.blur()}
                                    {...register(`submittedScores.${questionIndex}`, {
                                        required: actualText.errorMessage, 
                                        min: currentQuestion.minValue, 
                                        max: currentQuestion.maxValue
                                    })}
                                    onBlur={(someEvent) => {
                                        let targetValue = Number(someEvent.target.value); 
                                        if (targetValue < currentQuestion.minValue) setValue(`submittedScores.${questionIndex}`, currentQuestion.minValue);
                                        if (targetValue > currentQuestion.maxValue) setValue(`submittedScores.${questionIndex}`, currentQuestion.maxValue);
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
            <div className='d-grid gap-2'><Button variant='success' type='submit'>{actualText.submitMsg}</Button></div>
        </Form>

    </div>
};

export default WrittenDetailsPage; 