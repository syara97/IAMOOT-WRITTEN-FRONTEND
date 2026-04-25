import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Alert, Button, Card, Form } from 'react-bootstrap';

import { LanguageContext } from '../contexts/LanguageContext';
import api from '../services/api';

const pageText = {
    EN: {
        mainTitle: 'IAMOOT 2026 - Access the Platform',
        userLabel: 'Email',
        passwordLabel: 'Password',
        submitBtn: 'Sign In',
        passwordHelp: 'Set / Reset Password',
        emailRequired: 'Email is required.',
        invalidEmail: 'Please enter a valid email address.',
        passwordRequired: 'Password is required.',
        invalidCredentials: 'Email or password is incorrect.'
    },
    ES: {
        mainTitle: 'IAMOOT 2026 - Acceso a la Plataforma',
        userLabel: 'Correo Electronico',
        passwordLabel: 'Contraseña',
        submitBtn: 'Iniciar sesión',
        passwordHelp: 'Establecer / Restablecer contraseña',
        emailRequired: 'El correo electronico es obligatorio.',
        invalidEmail: 'Por favor ingresa un correo electronico valido.',
        passwordRequired: 'La contraseña es obligatoria.',
        invalidCredentials: 'El correo electronico o la contraseña son incorrectos.'
    },
    POR: {
        mainTitle: 'IAMOOT 2026 - Acesse a Plataforma',
        userLabel: 'Email',
        passwordLabel: 'Senha',
        submitBtn: 'Entrar',
        passwordHelp: 'Definir / Redefinir senha',
        emailRequired: 'O email é obrigatório.',
        invalidEmail: 'Por favor insira um email válido.',
        passwordRequired: 'A senha é obrigatória.',
        invalidCredentials: 'O email ou a senha estão incorretos.'
    }
};

export default function Login() {

    /* SETS THE LANGUAGE */
    const { currentLanguage } = useContext(LanguageContext);
    const actualText = pageText[currentLanguage];

    const [authError, setAuthError] = useState('');
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        resetField,
        setFocus,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (someData) => {

        try {
            const loginResponse = await api.post('/api/judges/login', {
                email: someData.email,
                password: someData.password
            });

            const authToken = loginResponse.data?.token;
            if (authToken) localStorage.setItem('authToken', authToken);

            navigate('/dashboard', { replace: true });

        } catch (err) {
            setAuthError(actualText.invalidCredentials);
            resetField('password');
            setFocus('password');
        }
    };

    return <div>
        <Card className='text-center mb-3'>
            <Card.Header as='h1' className='display-5 fw-bold'>{actualText.mainTitle}</Card.Header>
        </Card>

        {authError && (
            <Alert variant='danger' className='mx-4 text-center fw-semibold'>{authError}</Alert>
        )}

        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.userLabel}</Form.Label>
                    <Form.Control type='email' autoComplete='email' disabled={isSubmitting} isInvalid={!!errors.email} {...register('email', {
                        required: actualText.emailRequired,
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: actualText.invalidEmail
                        },
                        onChange: () => authError && setAuthError('')
                    })} />
                </div>

                {errors.email && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.email.message}</Alert>
                )}
            </Form.Group>

            <Form.Group className='mb-3 px-4'>
                <div className="d-flex align-items-center">
                    <Form.Label className='fw-bold text-nowrap d-flex align-items-center mb-0 me-2' style={{ height: '38px' }}>{actualText.passwordLabel}</Form.Label>
                    <Form.Control type='password' autoComplete='current-password' disabled={isSubmitting} isInvalid={!!errors.password} {...register('password', {
                        required: actualText.passwordRequired,
                        onChange: () => authError && setAuthError('')
                    })} />
                </div>

                {errors.password && (
                    <Alert variant='danger' className='mt-2 py-2'>{errors.password.message}</Alert>
                )}
            </Form.Group>

            <div className='d-grid gap-2'><Button type='submit' disabled={isSubmitting}>{actualText.submitBtn}</Button></div>
        </Form>

        <div className='text-center mt-3'><Link className='text-muted fw-semibold' to='/request-password'>{actualText.passwordHelp}</Link></div>
    </div>
};