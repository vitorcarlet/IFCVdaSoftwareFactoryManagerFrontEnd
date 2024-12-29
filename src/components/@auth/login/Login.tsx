'use client'
import React, { useState } from 'react'
import { TextField, Button, Container, Typography, Box, Alert } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface LoginFormInputs {
    username: string
    password: string
}

export const Login: React.FC = () => {
    const { login } = useAuth()
    const { handleSubmit, control } = useForm<LoginFormInputs>()
    const router = useRouter()

    // Estado para armazenar erros
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    // Função para verificar se é a primeira vez que o usuário está entrando no site
    const checkFirstTimeUser = () => {
        const isFirstTime = localStorage.getItem('isFirstTimeUser')
        if (isFirstTime === null) {
            localStorage.setItem('isFirstTimeUser', 'false')
            router.replace('/dashboard/starter')
        } else {
            router.replace('/dashboard')
        }
    }

    const onSubmit = async (data: LoginFormInputs) => {
        try {
            const { username, password } = data

            login({ username, password })
                .then(response => {
                    if (response?.token) {
                        setErrorMessage(null) // Limpa erros anteriores
                        checkFirstTimeUser() // Chama a lógica após o login
                    }
                })
                .catch(error => {
                    console.error('Login error:', error)
                    setErrorMessage('Usuário ou senha inválidos. Tente novamente.')
                })
        } catch (error) {
            console.error('Login error:', error)
            setErrorMessage('Ocorreu um erro inesperado. Tente novamente mais tarde.')
        }
    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                {errorMessage && (
                    <Alert severity="error" style={{ marginBottom: '16px', width: '100%', color: 'error.main' }}>
                        {errorMessage}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Controller
                        name="username"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField {...field} label="Username" variant="outlined" margin="normal" fullWidth />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Password"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                </form>
            </Box>
        </Container>
    )
}
