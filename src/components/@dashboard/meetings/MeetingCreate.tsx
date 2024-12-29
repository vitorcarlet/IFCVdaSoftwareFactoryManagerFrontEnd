// MeetingCreate.tsx

import React from 'react'
import { Typography, Grid, Paper, TextField, Button, Autocomplete } from '@mui/material'
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

interface MeetingCreateProps {
    onClose: () => void
    onCreate: (newMeeting: Meeting) => void
}

const MeetingCreate: React.FC<MeetingCreateProps> = ({ onClose, onCreate }) => {
    const [participants, setParticipants] = React.useState<string[]>([])
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<Partial<Meeting>>({
        defaultValues: {
            titulo: '',
            descricao: '',
            dataHora: '',
            participantes: [],
            projetoId: 0,
            organizador: '',
            status: ''
        }
    })

    const onSubmit = async (data: Partial<Meeting>) => {
        try {
            const response = await axios.post('/api/Reunioes', data)
            onCreate(response.data)
            onClose()
        } catch (error) {
            console.error('Error creating meeting:', error)
        }
    }

    return (
        <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
                Criar Nova Reunião
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* Título */}
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
                    {/* Descrição */}
                    <Grid item xs={12}>
                        <Controller
                            name="descricao"
                            control={control}
                            render={({ field }) => (
                                <TextField {...field} label="Descrição" fullWidth multiline rows={4} />
                            )}
                        />
                    </Grid>
                    {/* Data e Hora */}
                    <Grid item xs={12}>
                        <Controller
                            name="dataHora"
                            control={control}
                            rules={{ required: 'Data e Hora são obrigatórias' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Data e Hora"
                                    type="datetime-local"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    error={!!errors.dataHora}
                                    helperText={errors.dataHora?.message}
                                />
                            )}
                        />
                    </Grid>
                    {/* Participantes */}
                    <Grid item xs={12}>
                        <Controller
                            name="participantes"
                            control={control}
                            render={({ field }) => (
                                <Autocomplete
                                    //{...field}
                                    options={[]}
                                    multiple
                                    freeSolo
                                    value={participants}
                                    onChange={(e, newValue) => setParticipants(newValue)} // Update selected technologies
                                    filterSelectedOptions
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            label="Participantes"
                                            helperText="Pressione Enter para adicionar um participante"
                                        />
                                    )}
                                />
                            )}
                        />
                    </Grid>
                    {/* Projeto ID */}
                    <Grid item xs={12}>
                        <Controller
                            name="projetoId"
                            control={control}
                            rules={{ required: 'Projeto ID é obrigatório' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ID do Projeto"
                                    type="number"
                                    fullWidth
                                    error={!!errors.projetoId}
                                    helperText={errors.projetoId?.message}
                                />
                            )}
                        />
                    </Grid>
                    {/* Organizador */}
                    <Grid item xs={12}>
                        <Controller
                            name="organizador"
                            control={control}
                            rules={{ required: 'Organizador é obrigatório' }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Organizador"
                                    fullWidth
                                    error={!!errors.organizador}
                                    helperText={errors.organizador?.message}
                                />
                            )}
                        />
                    </Grid>
                    {/* Status */}
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
                            Criar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    )
}

export default MeetingCreate
