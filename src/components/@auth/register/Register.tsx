'use client'
import React from 'react'
import { TextField, Button, Container, Typography, Box, MenuItem, Autocomplete } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'

// Esquema de validação com Zod
const registerFormSchema = z.object({
    nome: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    username: z.string().min(1, 'Nome é obrigatório').max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    password: z
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
        .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
        .regex(/[0-9]/, 'A senha deve conter pelo menos um número'),
    role: z.enum(['Admin', 'Gestor', 'Aluno']).refine(val => ['Admin', 'Gestor', 'Aluno'].includes(val), {
        message: 'Role inválida'
    }),
    telefone: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Telefone inválido (use o formato internacional com código do país)'),
    numeroMatricula: z.string().min(1, 'Número de matrícula é obrigatório'),
    isActive: z.boolean()
})

type RegisterFormInputs = z.infer<typeof registerFormSchema>

export const Register: React.FC = () => {
    const roles = ['Admin', 'Gestor', 'Aluno']
    const { register } = useAuth()
    const { handleSubmit, control } = useForm<RegisterFormInputs>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            isActive: true // Default para ativo
        }
    })

    const onSubmit = async (data: RegisterFormInputs) => {
        try {
            // Envia os dados para o endpoint de registro
            const response = await register(data)
            console.log('Register response:', response)

            // Aqui você pode redirecionar o usuário ou mostrar uma mensagem de sucesso
        } catch (error) {
            console.error('Register error:', error)
            // Exibe uma mensagem de erro caso o registro falhe
        }
    }

    return (
        <Container maxWidth="sm">
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
                <Typography variant="h4" component="h1" gutterBottom>
                    Registro
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
                    <Controller
                        name="nome"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="username"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Username"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="password"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Senha"
                                type="password"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="role"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Autocomplete
                                options={roles}
                                getOptionLabel={option => option}
                                value={field.value || null}
                                onChange={(_, newValue) => {
                                    field.onChange(newValue)
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Função"
                                        variant="outlined"
                                        margin="normal"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                    />
                                )}
                            />
                        )}
                    />
                    <Controller
                        name="telefone"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Telefone"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Controller
                        name="numeroMatricula"
                        control={control}
                        render={({ field, fieldState }) => (
                            <TextField
                                {...field}
                                label="Número de Matrícula"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={!!fieldState.error}
                                helperText={fieldState.error?.message}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Registrar
                    </Button>
                </form>
            </Box>
        </Container>
    )
}
