import React, { useEffect, useState } from 'react'
import { PieChart } from '@mui/x-charts/PieChart'
import { Card, CardContent, Typography, CircularProgress } from '@mui/material'
import axios from '@/utils/axios'

const ChartComponent = () => {
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/Dashboard/Gestor')
                const { totalProjetos, reunioesAgendadas, reunioesConcluidas } = response.data

                setData([
                    { id: 'Total Projetos', value: totalProjetos, label: 'Total Projetos' },
                    { id: 'Reuniões Agendadas', value: reunioesAgendadas, label: 'Reuniões Agendadas' },
                    { id: 'Reuniões Concluídas', value: reunioesConcluidas, label: 'Reuniões Concluídas' }
                ])
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '20px' }}>
                <CircularProgress />
            </div>
        )
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    Projetos e Reuniões
                </Typography>
                <PieChart
                    series={[
                        {
                            data
                        }
                    ]}
                    width={400}
                    height={400}
                />
            </CardContent>
        </Card>
    )
}

export default ChartComponent
