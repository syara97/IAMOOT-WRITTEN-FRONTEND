import React, { useContext, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, ListGroup } from 'react-bootstrap'; 

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from "../contexts/RoleContext";

const JudgeWrittenCompPage = () => { 

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext); 
    const performNavigation = useNavigate(); 

    const pageText = {
        EN: {welcomeMsg: 'My Assigned Memorandums', memoText: 'Memorandum:', logoutText: 'Sign Out'}, 
        ES: {welcomeMsg:'Mis Memorándums Asignados', memoText: 'Memorándum', logoutText: 'Cerrar Sesión'},
        POR: {welcomeMsg: 'Meus Memorandos Atribuídos', memoText: 'Memorando:', logoutText: 'Sair'}
    }

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
    
    return <div className='d-grid gap-2'>
        <Card className='text-center'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg}</Card.Header>
        </Card>

        <ListGroup>
            <ListGroup.Item action onClick={() => {performNavigation('/writtencomp/memorandum/1')}} style={{ cursor: 'pointer'}}>{actualText.memoText} #1</ListGroup.Item>
            <ListGroup.Item action onClick={() => {performNavigation('/writtencomp/memorandum/2')}} style={{ cursor: 'pointer'}}>{actualText.memoText} #2</ListGroup.Item>
        </ListGroup>

        <Button variant='danger' onClick={handleSignOut}>{actualText.logoutText}</Button>
    </div>

};

export default JudgeWrittenCompPage;