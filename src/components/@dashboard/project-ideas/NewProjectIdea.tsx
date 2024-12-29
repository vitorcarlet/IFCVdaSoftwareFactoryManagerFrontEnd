'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Container,
    Stack,
    Autocomplete,
    Snackbar,
    Alert
} from '@mui/material'
import useAuth from '@/hooks/useAuth'
import axios from '@/utils/axios'

const technologySuggestions = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C#',
    'Ruby',
    'Go',
    'Rust',
    'PHP',
    'Swift',
    'Kotlin',
    'HTML',
    'CSS',
    'SQL',
    'GraphQL'
]

interface ProjectIdeaForm {
    nome: string
    descricao: string
    proponente: string
    objective?: string
    technologies?: string[]
}

export default function NewProjectIdea() {
    const { control, handleSubmit, reset } = useForm<ProjectIdeaForm>({
        defaultValues: {
            nome: '',
            descricao: '',
            proponente: '',
            objective: '',
            technologies: []
        }
    })

    const { ...state } = useAuth()

    const [technologies, setTechnologies] = useState<string[]>([])
    const [snackbarOpen, setSnackbarOpen] = useState(false)

    const onSubmit = async (data: ProjectIdeaForm) => {
        const payload = {
            nome: data.nome,
            descricao: data.descricao,
            proponente: data.proponente
        }

        try {
            const response = await axios.post('/api/Ideias', payload)
            console.log('Submitted project idea:', response.data)
            reset() // Reset form after successful submission
            setTechnologies([]) // Clear technologies
            setSnackbarOpen(true) // Open success snackbar
        } catch (error) {
            console.error('Failed to submit project idea:', error)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false)
    }

    console.log(state, 'state')

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registro de Ideias de Projetos
                </Typography>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Stack spacing={3}>
                        <Controller
                            name="nome"
                            control={control}
                            rules={{ required: 'O nome do projeto é obrigatório.' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Título do Projeto"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="descricao"
                            control={control}
                            rules={{ required: 'A descrição é obrigatória.' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    multiline
                                    rows={4}
                                    label="Descrição"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="proponente"
                            control={control}
                            rules={{ required: 'O proponente é obrigatório.' }}
                            render={({ field, fieldState }) => (
                                <TextField
                                    {...field}
                                    required
                                    fullWidth
                                    label="Proponente"
                                    error={!!fieldState.error}
                                    helperText={fieldState.error?.message}
                                />
                            )}
                        />
                        <Controller
                            name="objective"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} fullWidth multiline rows={3} label="Objetivo" />
                            )}
                        />
                        <Autocomplete
                            multiple
                            freeSolo
                            options={technologySuggestions}
                            value={technologies}
                            onChange={(e, newValue) => setTechnologies(newValue)} // Update selected technologies
                            filterSelectedOptions
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Tecnologias Sugeridas"
                                    helperText="Pressione Enter para adicionar ou selecione uma sugestão"
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
                            Enviar Ideia
                        </Button>
                    </Stack>
                </Box>
            </Paper>

            {/* Snackbar de Sucesso */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Ideia de projeto enviada com sucesso!
                </Alert>
            </Snackbar>
        </Container>
    )
}
