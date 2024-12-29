'use client'
import { Iconify } from '@/components/iconify/iconify'
import { Box, Card, Typography, Container, Paper, Button } from '@mui/material'
import Grid from '@mui/material/Grid2'

const StarterPack = () => {
    const resources = [
        {
            title: 'Guia para Bolsistas',
            description: 'Informações essenciais para alunos bolsistas sobre direitos e responsabilidades.',
            icon: <Iconify icon={'material-symbols:school-rounded'} sx={{ fontSize: 40 }} />
        },
        {
            title: 'Tutoriais em Vídeo',
            description: 'Acesse nossa biblioteca de vídeos instrucionais.',
            icon: <Iconify icon={'mdi:cast-tutorial'} sx={{ fontSize: 40 }} />
        },
        {
            title: 'Moodle',
            description: 'Acesse a plataforma Moodle para conteúdos complementares.',
            icon: <Iconify icon={'simple-icons:moodle'} sx={{ fontSize: 40 }} />,
            link: 'https://ead.ifc.edu.br'
        }
    ]

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 4 }}>
                Pacote Inicial - Bem-vindo(a)!
            </Typography>

            <Grid container spacing={3}>
                {resources.map((resource, index) => (
                    <Grid size={{ xs: 12, md: 4 }} key={index}>
                        <Card
                            sx={{
                                p: 3,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>{resource.icon}</Box>
                            <Typography variant="h6" component="h2" gutterBottom align="center">
                                {resource.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                                {resource.description}
                            </Typography>
                            <Box sx={{ mt: 'auto', textAlign: 'center' }}>
                                {resource.link ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={resource.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Acessar
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary">
                                        Acessar
                                    </Button>
                                )}
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Paper sx={{ p: 3, mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Dicas Importantes
                </Typography>
                <Typography variant="body1" paragraph>
                    • Explore todos os recursos disponíveis no pacote inicial
                </Typography>
                <Typography variant="body1" paragraph>
                    • Em caso de dúvidas, entre em contato com seu coordenador
                </Typography>
                <Typography variant="body1">• Mantenha-se atualizado com as novidades através do Moodle</Typography>
            </Paper>
        </Container>
    )
}

export default StarterPack
