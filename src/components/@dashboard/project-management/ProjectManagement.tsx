'use client'
import React, { useEffect, useState } from 'react'
import {
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextField,
    SelectChangeEvent,
    CircularProgress,
    Typography,
    Alert,
    Snackbar
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useModal } from '@/hooks/useModal'
import axios from '@/utils/axios'
import ProjectDetails from './ProjectDetails'
import ProjectEdit from './ProjectEdit'
import ProjectDelete from './ProjectDelete'

// Define the Project type
export type Project = {
    id: number
    nome: string
    ambienteNegocio: string
    necessidadeNegocio: string
    objetivos: string
    tecnologias: string
    stakeholders: string
    status: string
    comentarioGestor: string
    isPublic: boolean
    dataInicio: string
    dataConclusao: string
    participantes: string[]
}

// Define the props for the component
interface ProjectManagementProps {
    viewOnly?: boolean // Optional prop
}

const ProjectManagement: React.FC<ProjectManagementProps> = ({ viewOnly }) => {
    const [statusFilter, setStatusFilter] = useState('')
    const [dateFilter, setDateFilter] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [projects, setProjects] = useState<Project[]>([])
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
    const modal = useModal()

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get('/api/Projetos')
                setProjects(response.data)
            } catch (error) {
                console.error('Failed to fetch projects:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchProjects()
    }, [])

    const openDetails = (project: Project) => {
        modal.open({
            title: 'Detalhes do Projeto',
            size: 'md',
            customRender: () => <ProjectDetails {...project} />
        })
    }

    const handleEditClick = (project: Project) => {
        modal.open({
            title: 'Editar Projeto',
            size: 'md',
            customRender: () => (
                <ProjectEdit project={project} onClose={() => modal.close()} onSave={handleSaveProject} />
            )
        })
    }

    const handleDeleteClick = (projectId: number) => {
        modal.open({
            title: 'Deletar Projeto',
            size: 'md',
            customRender: () => (
                <ProjectDelete projectId={projectId} onClose={() => modal.close()} onDelete={handleDeleteProject} />
            )
        })
    }

    const handleDeleteProject = async (projectId: number) => {
        try {
            await axios.delete(`/api/Projetos/${projectId}`)
            setProjects(prevProjects => prevProjects.filter(project => project.id !== projectId))
            setSnackbarMessage('Projeto deletado com sucesso!')
        } catch (error) {
            console.error('Failed to delete project:', error)
            setSnackbarMessage('Falha ao deletar o projeto.')
        }
        modal.close()
    }

    const handleSaveProject = (updatedProject: Project) => {
        setProjects(prevProjects => prevProjects.map(p => (p.id === updatedProject.id ? updatedProject : p)))
        setSnackbarMessage('Projeto atualizado com sucesso!')
        // Add API call here if necessary
        // axios.put(`/api/Projetos/${updatedProject.id}`, updatedProject)
    }

    const handleStatusChange = (event: SelectChangeEvent<string>) => {
        setStatusFilter(event.target.value as string)
    }

    const handleSnackbarClose = () => {
        setSnackbarMessage(null)
    }

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDateFilter(event.target.value)
    }

    if (isLoading) {
        return (
            <TableContainer component={Paper} sx={{ textAlign: 'center', py: 5 }}>
                <CircularProgress />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Carregando dados dos projetos...
                </Typography>
            </TableContainer>
        )
    }

    return (
        <Container>
            <Grid container spacing={3}>
                <Grid xs={12} md={3}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Barra Lateral</Typography>
                        <ul>
                            <li>
                                <a href="#in-progress">In Progress</a>
                            </li>
                            <li>
                                <a href="#completed">Completed</a>
                            </li>
                            <li>
                                <a href="#all">All Projects</a>
                            </li>
                        </ul>
                    </Paper>
                </Grid>
                <Grid xs={12} md={9}>
                    <Paper sx={{ p: 2 }}>
                        <Typography variant="h6">Gestão de Projetos</Typography>
                        <Grid container spacing={2} sx={{ mb: 2 }}>
                            <Grid xs={12} sm={6}>
                                <FormControl fullWidth>
                                    <InputLabel>Status</InputLabel>
                                    <Select value={statusFilter} onChange={handleStatusChange} label="Status">
                                        <MenuItem value="">
                                            <em>Nenhum</em>
                                        </MenuItem>
                                        <MenuItem value="Em progresso">Em Progresso</MenuItem>
                                        <MenuItem value="Completado">Completado</MenuItem>
                                        <MenuItem value="Aprovado">Aprovado</MenuItem>
                                        <MenuItem value="Rejeitado">Rejeitado</MenuItem>
                                        <MenuItem value="Pendente">Pendente</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Data de Início"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true
                                    }}
                                    value={dateFilter}
                                    onChange={handleDateChange}
                                />
                            </Grid>
                        </Grid>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome do Projeto</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Data de Início</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map((project, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{project.nome}</TableCell>
                                            <TableCell>{project.status}</TableCell>
                                            <TableCell>{project.dataInicio}</TableCell>
                                            <TableCell>
                                                {viewOnly ? (
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => openDetails(project)}
                                                    >
                                                        Ver Detalhes
                                                    </Button>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            style={{ marginRight: '10px' }}
                                                            onClick={() => handleEditClick(project)}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="error"
                                                            style={{ marginRight: '10px' }}
                                                            onClick={() => handleDeleteClick(project.id)}
                                                        >
                                                            Deletar
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            style={{ marginRight: '10px', padding: 1 }}
                                                            onClick={() => openDetails(project)}
                                                        >
                                                            Ver Detalhes
                                                        </Button>
                                                        <Button variant="contained">Atualizar Status</Button>
                                                    </>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default ProjectManagement
