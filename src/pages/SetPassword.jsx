import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useSearchParams } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import api from '../services/api';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Set Password',
        passwordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm Password',
        passwordRequired: 'New password is required.',
        confirmPasswordRequired: 'Please confirm your password.',
        passwordsMustMatch: 'Passwords do not match.',
        submitBtn: 'Set Password',
        invalidLink: 'This link is invalid or expired. Please request a new password link.',
        requestNewLink: 'Request New Password Link',
        successMsg: 'Your password has been set successfully. You may now log in.',
        returnLink: 'Return to Login'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Establecer Contraseña',
        passwordLabel: 'Nueva Contraseña',
        confirmPasswordLabel: 'Confirmar Contraseña',
        passwordRequired: 'La nueva contraseña es obligatoria.',
        confirmPasswordRequired: 'Por favor confirma tu contraseña.',
        passwordsMustMatch: 'Las contraseñas no coinciden.',
        submitBtn: 'Establecer Contraseña',
        invalidLink: 'Este enlace es inválido o ha expirado. Por favor solicita un nuevo enlace de contraseña.',
        requestNewLink: 'Solicitar Nuevo Enlace de Contraseña',
        successMsg: 'Tu contraseña se ha establecido correctamente. Ahora puedes iniciar sesión.',
        returnLink: 'Volver al Inicio de Sesión'
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Definir senha',
        passwordLabel: 'Nova Senha',
        confirmPasswordLabel: 'Confirmar Senha',
        passwordRequired: 'A nova senha é obrigatória.',
        confirmPasswordRequired: 'Por favor, confirme sua senha.',
        passwordsMustMatch: 'As senhas não coincidem.',
        submitBtn: 'Definir Senha',
        invalidLink: 'Este link é inválido ou expirou. Por favor, solicite um novo link de senha.',
        requestNewLink: 'Solicitar Novo Link de Senha',
        successMsg: 'Sua senha foi definida com sucesso. Agora você pode entrar.',
        returnLink: 'Voltar ao Login'
    }
};

export default function SetPassword() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext); 
    const actualText = pageText[currentLanguage];

    const [showSuccess, setShowSuccess] = useState(false); 
    const [showError, setShowError] = useState(false); 

    const [searchParams] = useSearchParams(); 
    const emailParam = searchParams.get('email') || ''; 
    const resetTokenParam = searchParams.get('token') || ''; 
    const hasValidParam = Boolean(emailParam && resetTokenParam); 

    const { 
        register, 
        handleSubmit, 
        watch, 
        reset, 
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            newPassword: '', 
            confirmPassword: ''
        }
    });

    const newPasswordValue = watch('newPassword'); 

    const handleFormSubmit = async (someData) => {
        
        try {
            await api.post('/api/judges/set-password', {
                email: emailParam, 
                resetToken: resetTokenParam, 
                newPassword: someData.newPassword
            });

            setShowSuccess(true); 
            reset(); 
        } catch (err) {
            setShowError(true);
            reset(); 
        }
    }

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>
        
        {showError && (
            <Alert variant='danger' className='mx-4 text-center fw-semibold'>{actualText.invalidLink}</Alert>
        )}

        <Form onSubmit={handleSubmit(handleFormSubmit)} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' autoComplete='new-password' disabled={showSuccess || showError || isSubmitting} isInvalid={!!errors.newPassword} {...register('newPassword', {
                        required: actualText.passwordRequired
                    })} />
                </div>
                {errors.newPassword && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.newPassword.message}</Alert>
                )}
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <div className='d-flex align-items-center'>
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.confirmPasswordLabel}</Form.Label>
                    <Form.Control type='password' autoComplete='new-password' disabled={showSuccess || showError || isSubmitting} isInvalid={!!errors.confirmPassword} {...register('confirmPassword', {
                        required: actualText.confirmPasswordRequired, 
                        validate: (currentValue) => currentValue === newPasswordValue || actualText.passwordsMustMatch
                    })} />
                </div>
                {errors.confirmPassword && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.confirmPassword.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'>
                <Button type='submit' disabled={showSuccess || showError || isSubmitting}>{actualText.submitBtn}</Button>
            </div>
        </Form>

        {showError && (
            <div className='text-center mt-3'>
                <Link className='text-muted fw-semibold' to='/request-password'>{actualText.requestNewLink}</Link>
            </div>
        )}

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