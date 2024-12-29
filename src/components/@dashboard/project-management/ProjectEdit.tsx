import React from 'react'
import { Project } from './ProjectManagement'
import { Typography, Grid, Paper, TextField, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from '@/utils/axios'

interface ProjectEditProps {
    project?: Project | null
    onClose: () => void
    onSave: (updatedProject: Project) => void
}

const ProjectEdit: React.FC<ProjectEditProps> = ({ project, onClose, onSave }) => {
    if (!project) {
        return (
            <Paper style={{ padding: '20px' }}>
                <Typography variant="h6" color="error">
                    É impossível prosseguir sem um projeto selecionado.
                </Typography>
                <Button variant="contained" color="secondary" onClick={onClose} style={{ marginTop: '20px' }}>
                    Fechar
                </Button>
            </Paper>
        )
    }
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Project>({
        defaultValues: project
    })

    const onSubmit = async (data: Project) => {
        try {
            const response = await axios.put(`/api/Projetos/${project.id}`, data)
            onSave(response.data)
            onClose()
        } catch (error) {
            console.error('Error updating project:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Controller
                        name="nome"
                        control={control}
                        rules={{ required: 'Nome é obrigatório' }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                fullWidth
                                error={!!errors.nome}
                                helperText={errors.nome?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="ambienteNegocio"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Ambiente de Negócio" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="necessidadeNegocio"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Necessidade de Negócio" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="objetivos"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Objetivos" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="tecnologias"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Tecnologias" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="stakeholders"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Stakeholders" fullWidth />}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="status"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Status" fullWidth />}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                        Salvar
                    </Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default ProjectEdit
