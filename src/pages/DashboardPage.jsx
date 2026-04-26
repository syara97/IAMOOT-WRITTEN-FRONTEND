import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Card, Image } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from '../contexts/RoleContext';

const DashboardPage = () => {

    const { currentLanguage, resetLanguage } = useContext(LanguageContext);
    const { currentRole, assignRole } = useContext(RoleContext);
    const performNavigation = useNavigate();

    const languageImages = {
        EN: 'images/enLogo.png',
        SPA: 'images/esLogo.png',
        POR: 'images/porLogo.png'
    }

    const buttonsText = {
        EN: { welcomeMsg: 'Welcome ', mainTitle: 'Select the Competition', descriptionText: 'The Competition is a unique trilingual (English, Portuguese, and Spanish) event established to train law students on how to use the Inter-American human rights legal system as a legitimate forum for redressing human rights violations. Since its inception in 1995, it has trained over 4900 students and faculty participants from over 365 universities from the Americas and beyond. Written on a cutting-edge topic currently debated within the Inter-American system, the hypothetical case operates as the basis of the competition, and students argue the merits of this case by writing legal memoranda and preparing oral arguments for presentation in front of human rights experts acting as the Inter-American Court of Human Rights.', oralComp: 'Oral Competition', writtenComp: 'Written Competition', buttonText: 'Sign Out' },
        SPA: { welcomeMsg: 'Bienvenido/a', mainTitle: 'Seleccione la Competencia', descriptionText: 'El Concurso es el único evento trilingüe (inglés, español y portugués) establecido para entrenar a estudiantes de Derecho en cómo usar el Sistema Interamericano de Derechos Humanos como una instancia legítima para reparar violaciones de derechos humanos. Desde su creación en 1995, el Concurso ha educado a más de 4900 estudiantes y profesor@s de más de 365 universidades de todo el mundo. El caso hipotético opera como la base del Concurso y trata de temas pertinentes dentro del Sistema Interamericano. Estudiantes discuten el caso mediante la presentación de un memorial escrito y de argumentos orales frente a expert@s en derechos humanos quienes actúan representando a la Corte Interamericana de Derechos Humanos.', oralComp: 'Competencia Oral', writtenComp: 'Competencia Escrita', buttonText: 'Cerrar Sesión' },
        POR: { welcomeMsg: 'Bem-vindo/a', mainTitle: 'Selecione a Competição', descriptionText: 'A Competição é um evento único e trilíngue (inglês, espanhol e português) estabelecida para treinar estudantes de Direito no uso do sistema legal interamericano como um fórum legítimo para a reparação de violações de direitos humanos. Desde seu início em 1995, a competição treinou mais de 4800 estudantes e professores de mais de 360 universidades nas Américas e além. O caso hipotético funciona como a base da competição e trata de temas atualmente debatidos no sistema interamericano. Os estudantes debatem o caso através de um memorial escrito e de argumentos orais apresentados perante especialistas em direitos humanos que atuam como a Corte Interamericana de Direitos Humanos.', oralComp: 'Competição Oral', writtenComp: 'Competição Escrita', buttonText: 'Sair' }
    };

    const actualText = buttonsText[currentLanguage];
    const selectedImage = "images/LogoIAMOOT.jpeg";

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        resetLanguage();
        performNavigation('/');
    };

    /******************************************
     * CHECKS THAT THE USER HAS AN AUTH TOKEN *
     ******************************************/
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) performNavigation('/login');
    }, []);

    return <div className='d-grid gap-2'>
        <Card className='text-center mb-2'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.welcomeMsg}</Card.Header>
            <Card.Header as='h1' className='display-6 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>
        <Image src={selectedImage} alt='' fluid className='mx-auto d-block' style={{ width: '50%', maxWidth: '620px', height: 'auto' }} />
        <p className='mx-auto px-4 w-75 mb-0 text-center'>{actualText.descriptionText}</p>
        <Button variant='primary' onClick={() => { performNavigation('/writtencomp/judge') }}>{actualText.writtenComp}</Button>
        <Button variant='danger' onClick={handleSignOut}>{actualText.buttonText}</Button>
    </div>;
};

export default DashboardPage;