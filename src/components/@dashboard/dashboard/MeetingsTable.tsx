import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress
} from '@mui/material'
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

const MeetingsTable: React.FC = () => {
    const [meetings, setMeetings] = useState<Meeting[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axios.get<Meeting[]>('/api/Reunioes/minhas')
                setMeetings(response.data)
            } catch (error) {
                console.error('Error fetching meetings:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMeetings()
    }, [])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Título</TableCell>
                        <TableCell>Data</TableCell>
                        <TableCell>Hora</TableCell>
                        <TableCell>Participantes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {meetings.map(meeting => (
                        <TableRow key={meeting.id}>
                            <TableCell>{meeting.id}</TableCell>
                            <TableCell>{meeting.titulo}</TableCell>
                            <TableCell>{new Date(meeting.dataHora).toLocaleDateString()}</TableCell>
                            <TableCell>
                                {new Date(meeting.dataHora).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </TableCell>
                            <TableCell>{meeting.participantes.join(', ')}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MeetingsTable
