'use client'
import React from 'react'
import { TextField, Button, Container, Typography, Box } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'

interface ForgotPasswordFormInputs {
    email: string
}

export const ForgotPassword: React.FC = () => {
    const { handleSubmit, control } = useForm<ForgotPasswordFormInputs>()
    const [message, setMessage] = React.useState<string | null>(null)

    const onSubmit = async (data: ForgotPasswordFormInputs) => {
        try {
            // Envia o e-mail para o endpoint de recuperação de senha
            const response = await axios.post('/api/auth/forgot-password', data)
            setMessage('Um link para redefinir sua senha foi enviado para seu e-mail.')
        } catch (error) {
            console.error('Erro ao enviar solicitação de recuperação de senha:', error)
            setMessage('Não foi possível enviar o e-mail. Por favor, tente novamente.')
        }
    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography variant="h4" component="h1" gutterBottom>
                    Esqueci a Senha
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="Email" variant="outlined" margin="normal" fullWidth />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Enviar
                    </Button>
                </form>
                {message && (
                    <Typography variant="body1" color="textSecondary" sx={{ mt: 2, textAlign: 'center' }}>
                        {message}
                    </Typography>
                )}
            </Box>
        </Container>
    )
}
