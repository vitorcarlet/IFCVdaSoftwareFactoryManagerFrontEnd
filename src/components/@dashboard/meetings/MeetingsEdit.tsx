'use client'
import React from 'react'
import { Typography, Grid, Paper, TextField, Button } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import axios from '@/utils/axios'

interface Meeting {
    id: number
    titulo: string
    descricao: string
    dataHora: string
    participantes: string[]
    projetoId: number
    organizador: string
    status: string
    documentos: string[]
}

interface MeetingEditProps {
    meeting: Meeting
    onClose: () => void
    onSave: (updatedMeeting: Meeting) => void
}

const MeetingEdit: React.FC<MeetingEditProps> = ({ meeting, onClose, onSave }) => {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Meeting>({
        defaultValues: meeting
    })

    const onSubmit = async (data: Meeting) => {
        try {
            const response = await axios.put(`/api/Reunioes/${meeting.id}`, data)
            onSave(response.data)
            onClose()
        } catch (error) {
            console.error('Error updating meeting:', error)
        }
    }

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Editar Reunião
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Controller
                            name="titulo"
                            control={control}
                            rules={{ required: 'Título é obrigatório' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Título"
                                    fullWidth
                                    error={!!errors.titulo}
                                    helperText={errors.titulo?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="descricao"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Descrição" fullWidth multiline rows={4} />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Controller
                            name="dataHora"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Data e Hora"
                                    type="datetime-local"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    {/* Adicione mais campos conforme necessário */}
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
        </Paper>
    )
}

export default MeetingEdit
