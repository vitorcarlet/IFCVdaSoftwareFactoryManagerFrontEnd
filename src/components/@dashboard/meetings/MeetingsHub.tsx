'use client'
import React, { useState, useEffect } from 'react'
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
    Snackbar,
    Alert,
    Button
} from '@mui/material'
import axios from '@/utils/axios'
import { useModal } from '@/hooks/useModal'
import MeetingDelete from './MeetingDelete'
import MeetingEdit from './MeetingsEdit'
import MeetingCreate from './MeetingCreate'

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

const MeetingsHub: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [loading, setLoading] = useState(true)
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
    const modal = useModal()

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get('/api/Reunioes/todas')
                setMeetings(response.data)
                setSnackbarMessage('Dados carregados com sucesso!')
            } catch (error) {
                console.error('Error fetching meetings:', error)
                setSnackbarMessage('Erro ao carregar os dados.')
            } finally {
                setLoading(false)
            }
        }

        fetchMeetings()
    }, [])

    const handleEditClick = (meeting: Meeting) => {
        modal.open({
            title: 'Editar Reunião',
            size: 'md',
            customRender: () => (
                <MeetingEdit meeting={meeting} onClose={() => modal.close()} onSave={handleSaveMeeting} />
            )
        })
    }

    const handleSaveMeeting = async (updatedMeeting: Meeting) => {
        try {
            await axios.put(`/api/Reunioes/${updatedMeeting.id}`, updatedMeeting)
            setMeetings(prevMeetings => prevMeetings.map(m => (m.id === updatedMeeting.id ? updatedMeeting : m)))
            setSnackbarMessage('Reunião atualizada com sucesso!')
        } catch (error) {
            console.error('Failed to update meeting:', error)
            setSnackbarMessage('Falha ao atualizar a reunião.')
        }
    }

    const handleDeleteClick = (meetingId: number) => {
        modal.open({
            title: 'Deletar Reunião',
            size: 'md',
            customRender: () => (
                <MeetingDelete meetingId={meetingId} onClose={() => modal.close()} onDelete={handleDeleteMeeting} />
            )
        })
    }

    const handleDeleteMeeting = async (meetingId: number) => {
        try {
            await axios.delete(`/api/Reunioes/${meetingId}`)
            setMeetings(prevMeetings => prevMeetings.filter(meeting => meeting.id !== meetingId))
            setSnackbarMessage('Reunião deletada com sucesso!')
        } catch (error) {
            console.error('Failed to delete meeting:', error)
            setSnackbarMessage('Falha ao deletar a reunião.')
        }
        modal.close()
    }

    const handleCreateClick = () => {
        modal.open({
            title: 'Criar Nova Reunião',
            size: 'md',
            customRender: () => <MeetingCreate onClose={() => modal.close()} onCreate={handleCreateMeeting} />
        })
    }

    const handleCreateMeeting = (newMeeting: Meeting) => {
        setMeetings(prevMeetings => [newMeeting, ...prevMeetings])
        setSnackbarMessage('Reunião criada com sucesso!')
    }

    const handleCloseSnackbar = () => {
        setSnackbarMessage(null)
    }

    if (loading) {
        return (
            <Container>
                <CircularProgress />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Carregando dados das reuniões...
                </Typography>
            </Container>
        )
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Meetings Hub
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCreateClick} style={{ marginBottom: '20px' }}>
                Criar Nova Reunião
            </Button>
            <Paper>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Data</TableCell>
                                <TableCell>Organizador</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {meetings.map(meeting => (
                                <TableRow key={meeting.id}>
                                    <TableCell>{meeting.id}</TableCell>
                                    <TableCell>{meeting.titulo}</TableCell>
                                    <TableCell>{meeting.descricao}</TableCell>
                                    <TableCell>{new Date(meeting.dataHora).toLocaleString()}</TableCell>
                                    <TableCell>{meeting.organizador}</TableCell>
                                    <TableCell>{meeting.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleEditClick(meeting)}
                                        >
                                            Editar
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            style={{ marginRight: '10px' }}
                                            onClick={() => handleDeleteClick(meeting.id)}
                                        >
                                            Deletar
                                        </Button>
                                        {/* Você pode adicionar mais botões aqui, como "Ver Detalhes" */}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Snackbar open={!!snackbarMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default MeetingsHub
