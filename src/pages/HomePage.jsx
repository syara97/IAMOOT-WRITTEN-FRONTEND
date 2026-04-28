import React, { useContext } from 'react'; 
import { Button, Card, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { LanguageContext } from '../contexts/LanguageContext';

const HomePage = () => {

    const { changeLanguage } = useContext(LanguageContext); 
    const performNavigation = useNavigate(); 

    const selectedImage = "images/LogoIAMOOT.jpeg";

    const performLanguageChange = (someLanguage, someRoute) => {
        changeLanguage(someLanguage)
        performNavigation(someRoute)
    }

    return <div className='d-grid gap-2'>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>IAMOOT 2026 - Language Selection</Card.Header>
        </Card>

        <Image src={selectedImage} alt='IAMOOT Logo' fluid className='mx-auto d-block' style={{ width: '50%', maxWidth: '620px', height: 'auto' }} />

        <Button variant='primary' onClick={() => (performLanguageChange('EN', '/login'))}>English</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('SPA', '/login'))}>Español</Button>
        <Button variant='primary' onClick={() => (performLanguageChange('POR', '/login'))}>Português</Button>
    </div>
}; 

export default HomePage; 