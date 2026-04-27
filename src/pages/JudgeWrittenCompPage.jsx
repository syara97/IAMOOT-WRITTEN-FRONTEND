import React, { useContext, useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, ListGroup, Spinner, Alert } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import api from '../services/api';

const JudgeWrittenCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const performNavigation = useNavigate();


    const [availableMemos, setAvailableMemos] = useState([]);
    const [isLoadingMemos, setIsLoadingMemos] = useState(true);
    const [loadError, setLoadError] = useState('');


    const pageText = {
        EN: {welcomeMsg: 'My Assigned Memorandums', memoText: 'Memorandum:', logoutText: 'Sign Out', noMemosText: 'No remaining memorandums to score', loadingText: 'Loading memorandums...'}, 
        SPA: {welcomeMsg:'Mis Memorándums Asignados', memoText: 'Memorándum', logoutText: 'Cerrar Sesión', noMemosText: 'No quedan memorándums para calificar', loadingText: 'Cargando memorandums...'},
        POR: {welcomeMsg: 'Meus Memorandos Atribuídos', memoText: 'Memorando:', logoutText: 'Sair', noMemosText: 'Não há memorandos restantes para pontuar', loadingText: 'Carregando memorandos...'}
    };

    const actualText = pageText[currentLanguage] || pageText.EN;;

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        resetLanguage();
        performNavigation('/');
    };

    /******************************************
    * CHECKS THAT THE USER HAS AN AUTH TOKEN *
    ******************************************/
    useEffect(() => {
        async function loadAvailableMemos() {
            try {
                setIsLoadingMemos(true);
                setLoadError('');

                const response = await api.get('/api/written-judges/me');

                if (!response.data?.ok) {
                    throw new Error(response.data?.message || 'Unable to load memorandums');
                }

                setAvailableMemos(response.data.memoranda || []);
            } catch (error) {
                console.error('ERROR LOADING AVAILABLE MEMORANDA:', error);
                
                if (error.response?.status === 401) {
                        handleSignOut();
                        return;
                    }

                    setLoadError(error.response?.data?.message || error.message || 'Unable to load memorandums');
                } finally {
                    setIsLoadingMemos(false);
                }
            }

            loadAvailableMemos();
    }, []);

    
    return( 
        <div className='d-grid gap-2'>
            <Card className='text-center'>
                <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg}</Card.Header>
            </Card>

            {loadError && (
                <Alert variant='danger' className='text-center fw-semibold'>
                    {loadError}
                </Alert>
            )}
        
            <ListGroup>
                {isLoadingMemos ? (
                    <ListGroup.Item className='text-center'>
                        <Spinner animation='border' size='sm' /> {actualText.loadingText}
                    </ListGroup.Item>
                ) : availableMemos.length === 0 ? (
                    <ListGroup.Item>{actualText.noMemosText}</ListGroup.Item>
                ) : (
                    availableMemos.map((memo) => (
                        <ListGroup.Item
                            key={memo.memorandumID}
                            action
                            onClick={() => performNavigation(`/writtencomp/memorandum/${memo.memorandumID}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            {actualText.memoText} {memo.memorandumID}
                            {memo.status ? ` - ${memo.status}` : ''}
                        </ListGroup.Item>
                    ))
                )}
            </ListGroup>

            <Button variant='danger' onClick={handleSignOut}>{actualText.logoutText}</Button>
        </div>
    );
};

export default JudgeWrittenCompPage;