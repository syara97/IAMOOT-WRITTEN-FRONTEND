import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, ListGroup, Spinner } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";
import { JudgeIDContext } from '../contexts/JudgeIDContext';

const JudgeWrittenCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const { judgeID } = useContext(JudgeIDContext);

    const performNavigation = useNavigate(); 
    const assignedMemos = JSON.parse(sessionStorage.getItem('assignedMemorandums') || '[]');

    const [availableMemos, setAvailableMemos] = useState([]);
    const [isLoadingMemos, setIsLoadingMemos] = useState(true);

    const numericJudgeID = Number(judgeID);

    const pageText = {
        EN: {welcomeMsg: 'My Assigned Memorandums', memoText: 'Memorandum:', logoutText: 'Sign Out', noMemosText: 'No remaining memorandums to score'}, 
        SPA: {welcomeMsg:'Mis Memorándums Asignados', memoText: 'Memorándum', logoutText: 'Cerrar Sesión', noMemosText: 'No quedan memorándums para calificar'},
        POR: {welcomeMsg: 'Meus Memorandos Atribuídos', memoText: 'Memorando:', logoutText: 'Sair', noMemosText: 'Não há memorandos restantes para pontuar'}
    };

    const actualText = pageText[currentLanguage];

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
        async function loadAvailableMemos() {
            try {
                setIsLoadingMemos(true);
                
                if (Number.isNaN(numericJudgeID)) {
                    setAvailableMemos([]);
                    return;
                }

                const backendBaseURL = import.meta.env.VITE_API_BASE_URL;

                const memoChecks = await Promise.all(
                    assignedMemos.map(async (memoID) => {
                        const response = await fetch(
                            `${backendBaseURL}/api/written-memoranda/${memoID}/scores/${numericJudgeID}`
                        );

                        const responseData = await response.json();

                        return {
                            memoID,
                            hasSubmission: response.ok && responseData.hasSubmission === true
                        };
                    })
                );

                const unsubmittedMemos = memoChecks
                    .filter((memoCheck) => !memoCheck.hasSubmission)
                    .map((memoCheck) => memoCheck.memoID);

                setAvailableMemos(unsubmittedMemos);
            } catch (error) {
                console.error('ERROR LOADING AVAILABLE MEMORANDA:', error);
                setAvailableMemos(assignedMemos);
            } finally {
                setIsLoadingMemos(false);
            }
        }

        loadAvailableMemos();
    }, [judgeID, numericJudgeID]);
    
    return <div className='d-grid gap-2'>
        <Card className='text-center'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg}</Card.Header>
        </Card>

        <ListGroup>
            {isLoadingMemos ? (
                <ListGroup.Item className='text-center'>
                    <Spinner animation='border' size='sm' /> Loading memorandums...
                </ListGroup.Item>
            ) : availableMemos.length === 0 ? (
                <ListGroup.Item>{actualText.noMemosText}</ListGroup.Item>
            ) : (
                availableMemos.map((memoId) => (
                    <ListGroup.Item
                        key={memoId}
                        action
                        onClick={() => performNavigation(`/writtencomp/memorandum/${memoId}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        {actualText.memoText} {memoId}
                    </ListGroup.Item>
                ))
            )}
        </ListGroup>

        <Button variant='danger' onClick={handleSignOut}>{actualText.logoutText}</Button>
    </div>

};

export default JudgeWrittenCompPage;