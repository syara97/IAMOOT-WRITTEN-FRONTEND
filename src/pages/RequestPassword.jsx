import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import api from '../services/api';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Request Password',
        emailLabel: 'Email',
        submitBtn: 'Send Password Link',
        successMsg: 'If the information matches our records, an email has been sent with a password setup link.',
        returnLink: 'Return to Login',
        emailRequired: 'Email is required.',
        invalidEmail: 'Please enter a valid email address.'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Solicitar Contraseña',
        emailLabel: 'Correo Electrónico',
        submitBtn: 'Enviar Enlace de Contraseña',
        successMsg: 'Si la información coincide con nuestros registros, se ha enviado un correo electrónico con un enlace para establecer la contraseña.',
        returnLink: 'Volver al inicio de sesión',
        emailRequired: 'El correo electrónico es obligatorio.',
        invalidEmail: 'Por favor ingresa un correo electrónico válido.'
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Solicitar Senha',
        emailLabel: 'Email',
        submitBtn: 'Enviar Link de Senha',
        successMsg: 'Se as informações corresponderem aos nossos registros, um email foi enviado com um link para definir a senha.',
        returnLink: 'Voltar ao login',
        emailRequired: 'O email é obrigatório.',
        invalidEmail: 'Por favor insira um email válido.'
    }
};

export default function RequestPassword() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext); 
    const actualText = pageText[currentLanguage] 

    /* SUCCESS STATE */
    const [showSuccess, setShowSuccess] = useState(false); 

    /* FORM SETUP */
    const {
        register,
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting } 
    } = useForm({
        defaultValues: {
            email: '' 
        }
    });

    const handleFormSubmit = async (someData) => {
        try {
            await api.post('/api/written-judges/request-password', {
                email: someData.email
            }); 
        } catch (err) {
            console.error('request-password failed: ' + err); 
        } finally {
            setShowSuccess(true); 
            reset(); 
        }
    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>

            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.emailLabel}</Form.Label>
                    <Form.Control type='email' autoComplete='email' disabled={showSuccess || isSubmitting} isInvalid={!!errors.email} {...register('email', {
                        required: actualText.emailRequired, 
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
                            message: actualText.invalidEmail
                        }
                    })}/>
                </div>

                {errors.email && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.email.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button type='submit' disabled={showSuccess || isSubmitting}>{actualText.submitBtn}</Button>
            </div>

        </Form>

        {showSuccess && (
            <>
                <Alert variant='success' className='mt-3 text-center text-success fw-semibold'>{actualText.successMsg}</Alert>

                <div className='text-center mt-3'>
                    <Link className='text-muted fw-semibold' to='/login'>{actualText.returnLink}</Link>
                </div>
            </>
        )}

    </div>
}