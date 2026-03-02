import React, { useContext } from 'react'; 
import { Button, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { LanguageContext } from '../contexts/LanguageContext';

const HomePage = () => {

    const { changeLanguage } = useContext(LanguageContext); 
    const performNavigation = useNavigate(); 

    const performLanguageChange = (someLanguage, someRoute) => {
        changeLanguage(someLanguage)
        performNavigation(someRoute)
    }

    return <div className='d-grid gap-2'>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2025 - Language Selection</Card.Header>
        </Card>

        <Button variant='primary' onClick={() => (performLanguageChange('EN', '/login'))}>English</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('ES', '/login'))}>Español</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('POR', '/login'))}>Português</Button>
    </div>
}; 

export default HomePage; 