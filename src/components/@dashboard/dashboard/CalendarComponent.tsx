import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import { EventInput } from '@fullcalendar/core'
import { useModal } from '@/hooks/useModal'
import { CircularProgress } from '@mui/material'
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

const CalendarComponent: React.FC = () => {
    const calendarRef = useRef<FullCalendar>(null)
    const [events, setEvents] = useState<EventInput[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const modal = useModal()

    const handleEventClick = (clickInfo: any) => {
        const { title, extendedProps, startStr: date } = clickInfo.event

        if (title && date && extendedProps && extendedProps.description) {
            modal.open({
                title: `Detalhes do Evento: ${title}`,
                size: 'md',
                customRender: () => (
                    <div>
                        <h2>{title}</h2>
                        <p>
                            <strong>Data:</strong> {date}
                        </p>
                        <p>
                            <strong>Descrição:</strong> {extendedProps.description}
                        </p>
                        <p>
                            <strong>Participantes:</strong> {extendedProps.participantes.join(', ')}
                        </p>
                        <p>
                            <strong>Organizador:</strong> {extendedProps.organizador}
                        </p>
                        <p>
                            <strong>Status:</strong> {extendedProps.status}
                        </p>
                    </div>
                )
            })
        } else {
            console.error('Some event properties are missing:', { title, date, extendedProps })
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get<Meeting[]>('/api/Reunioes/minhas')
                const eventsData: EventInput[] = response.data.map(meeting => ({
                    id: meeting.id.toString(),
                    title: meeting.titulo,
                    start: new Date(meeting.dataHora + 'Z'), // Adiciona 'Z' para UTC
                    description: meeting.descricao,
                    extendedProps: {
                        participantes: meeting.participantes,
                        projetoId: meeting.projetoId,
                        organizador: meeting.organizador,
                        status: meeting.status,
                        documentos: meeting.documentos
                    }
                }))
                setEvents(eventsData)
            } catch (error) {
                console.error('Error fetching meetings:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div>
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                initialView="dayGridMonth"
                events={events}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventClick={handleEventClick}
            />
        </div>
    )
}

export default CalendarComponent
