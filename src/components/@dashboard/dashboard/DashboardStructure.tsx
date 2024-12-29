'use client'
import React from 'react'
import { Box, Paper, Typography } from '@mui/material'
import ChartComponent from './ChartComponent'
import MeetingsTable from './MeetingsTable'
import Grid from '@mui/material/Grid2'
import CalendarComponent from './CalendarComponent'

const DashboardStructure: React.FC = () => {
    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Gráfico
                        </Typography>
                        <ChartComponent />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Agenda
                        </Typography>
                        <CalendarComponent />
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Reuniões
                        </Typography>
                        <MeetingsTable />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardStructure
