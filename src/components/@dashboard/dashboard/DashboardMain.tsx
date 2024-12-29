'use client'
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
    CssBaseline,
    Box,
    Container,
    Paper
} from '@mui/material'
import { useState } from 'react'
import Grid from '@mui/material/Grid2'
import { Iconify } from '@/components/iconify/iconify'

export default function DashboardMain() {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <Iconify icon="ic:outline-menu" size={3} />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Logo
                    </Typography>
                    <IconButton color="inherit">
                        <Iconify icon="ic:baseline-account-box" size={3} />
                        <Typography variant="body1" sx={{ marginLeft: 1 }}>
                            Nome do Usuário
                        </Typography>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
                <List>
                    {['Projetos', 'Reuniões', 'Relatórios', 'Configurações'].map((text, index) => (
                        <ListItem key={text} component="li">
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg">
                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 8, lg: 9 }}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                                <Typography variant="h6">Resumo de Projetos</Typography>
                                {/* Gráfico de andamento ou lista com status */}
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12, md: 4, lg: 3 }}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240 }}>
                                <Typography variant="h6">Próximas Reuniões</Typography>
                                {/* Agenda ou calendário */}
                            </Paper>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="h6">Relatórios Recentes</Typography>
                                {/* Lista de relatórios recentes */}
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    )
}
