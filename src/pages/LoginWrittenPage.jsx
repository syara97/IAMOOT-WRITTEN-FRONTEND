import React, { useContext } from 'react'; 
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; 
import { Button, Card, Form} from 'react-bootstrap';
import axios from 'axios';

import { LanguageContext } from '../contexts/LanguageContext';
import { RoleContext } from '../contexts/RoleContext'; 
import { JudgeIDContext } from '../contexts/JudgeIDContext';

const LoginPage = () => {

    const { assignRole } = useContext(RoleContext); 
    const { assignJudgeID } = useContext(JudgeIDContext); 
    const { currentLanguage } = useContext(LanguageContext); 
    const performNavigation = useNavigate(); 
    const { register, handleSubmit, formState: { errors }, } = useForm();
    
    const onSubmit = async (someData) => {
        
        try {
            /* Sends an object to the route /api/login with userEmail and userPass variables. 
             * userEmail will contain someData.username which is what was typed for the user. 
             * userPass will contain someData.password which is what was typed for the password. 
             * It will wait for the /api/login to send a response, which is stored in the variable theResponse. 
             * The contents of the response are configured in the backend but this is how the client and server to communicate. */
            
            const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/loginWritten`, {
                userEmail: someData.username,
                userPass: someData.password
            })

            /* theResponse.data contains the information sent from the backend as it will be configured on the /api/login route. */
            const { currentID, currentName, currentRole, currentMemorandums } = res.data;

            assignJudgeID(currentID); 
            assignRole(currentRole);
            sessionStorage.setItem('fullName', currentName)
            sessionStorage.setItem('assignedMemorandums', JSON.stringify(currentMemorandums));
            performNavigation('/written/judge'); 

        } catch (err) {
            alert(`Invalid email or password`); 
            console.error(err); 
        }
    };

    const pageText = {
        EN: {mainTitle: 'IAMOOT 2025 - Access the Platform', theUsername: 'Username', userPlaceholder: 'Enter email', thePassword: 'Password', theButton: 'Sign In'},
        ES: {mainTitle: 'IAMOOT 2025 - Acceso a la Plataforma', theUsername: 'Usuario', userPlaceholder: 'Ingrese el correo electronico', thePassword: 'Contraseña', theButton: 'Iniciar Sesion'}, 
        POR: {mainTitle: 'IAMOOOT 2025 - Acesse a Plataforma', theUsername: 'Usuário', userPlaceholder: 'Insira o email', thePassword: 'Senha', theButton: 'Entrar'}
    };

    const actualText = pageText[currentLanguage]

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.theUsername}</Form.Label>
                    <Form.Control type='email' placeholder={actualText.userPlaceholder} {...register('username', {required: true})} />
                </div>
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{height: '38px'}}>{actualText.thePassword}</Form.Label>
                    <Form.Control type='password' placeholder={actualText.thePassword} {...register('password', {required: true})} />
                </div>
            </Form.Group>

            <div className='d-grid gap-2'><Button variant='primary' type='submit'>{actualText.theButton}</Button></div>
        </Form>
    </div>
};

export default LoginPage; 