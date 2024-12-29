'use client'
import React, { useState, useEffect } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import {
    Box,
    Card,
    Container,
    Tab,
    Tabs,
    Typography,
    TextField,
    Button,
    MenuItem,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
    Modal,
    Alert,
    Snackbar
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Iconify } from '@/components/iconify/iconify'
import Grid from '@mui/material/Grid2'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import axiosInstance from '@/utils/axios'
import axios from '@/utils/axios'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export interface Meeting {
    data: string // ISO string da data da reunião
    titulo: string // Título da reunião
    status: string // Status da reunião
    documentos: string[] // Links ou referências aos documentos relacionados
}

export interface ReportProject {
    nome: string // Nome do projeto
    status: string // Status do projeto (e.g., Em andamento, Aprovado, etc.)
    dataInicio: string // Data de início do projeto no formato ISO string
    dataConclusao: string // Data de conclusão do projeto no formato ISO string
    objetivos: string // Objetivos ou descrição do projeto
    reunioes: Meeting[] // Lista de reuniões associadas ao projeto
}

interface TabPanelProps {
    children?: React.ReactNode
    index: number
    value: number
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    )
}

export default function Reports() {
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [tabValue, setTabValue] = useState<number>(0)
    const [project, setProject] = useState<string>('')
    const [projects, setProjects] = useState<ReportProject[]>([])

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [selectedProject, setSelectedProject] = useState<ReportProject | null>(null)
    const [detailedData, setDetailedData] = useState<ReportProject | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('success')

    const handleSnackbarClose = () => {
        setSnackbarMessage(null)
    }

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true)
                const response = await axios.get('/api/Relatorios/todos-projetos')
                if (!response) {
                    throw new Error(`HTTP error! Status: `)
                }
                const data: ReportProject[] = await response.data
                setProjects(data)
            } catch (err: any) {
                setSnackbarMessage(err.message || 'Failed to fetch data')
                setSnackbarSeverity('error')
            } finally {
                setLoading(false)
            }
        }

        fetchProjects()
    }, [])

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue)
    }

    const handleExportPDF = () => {
        const doc = new jsPDF()
        doc.text('Relatório de Projetos', 14, 16)
        const tableColumn = ['Nome', 'Status', 'Data Início', 'Data Conclusão', 'Objetivos']
        const tableRows: any[] = []

        projects.forEach(project => {
            const projectData = [
                project.nome,
                project.status,
                dayjs(project.dataInicio).format('DD/MM/YYYY'),
                dayjs(project.dataConclusao).format('DD/MM/YYYY'),
                project.objetivos
            ]
            tableRows.push(projectData)
        })

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 20
        })

        doc.save('projects.pdf')
    }

    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(projects)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Projects')

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'array'
        })

        const data = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(data, 'projects.xlsx')
    }

    const handleOpenModal = (project: ReportProject) => {
        setSelectedProject(project)
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
        setSelectedProject(null)
        setDetailedData(null)
    }

    useEffect(() => {
        if (selectedProject) {
            // Simulate API call
            fetch(`/api/projects/${selectedProject.nome}`)
                .then(response => response.json())
                .then(data => setDetailedData(data))
                .catch(error => console.error('Error fetching data:', error))
        }
    }, [selectedProject])

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Carregando...
                </Typography>
            </Container>
        )
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Relatórios
                </Typography>
                <Card>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Relatório de Projetos" />
                            <Tab label="Relatório de Horas Trabalhadas" />
                        </Tabs>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Data Início</TableCell>
                                        <TableCell>Data Conclusão</TableCell>
                                        <TableCell>Objetivos</TableCell>
                                        <TableCell>Ações</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {projects.map((project, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{project.nome}</TableCell>
                                            <TableCell>{project.status}</TableCell>
                                            <TableCell>{dayjs(project.dataInicio).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{dayjs(project.dataConclusao).format('DD/MM/YYYY')}</TableCell>
                                            <TableCell>{project.objetivos}</TableCell>
                                            <TableCell>
                                                <Button variant="outlined" onClick={() => handleOpenModal(project)}>
                                                    Visualizar
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                        {/* Modal for detailed view */}
                        <Modal open={openModal} onClose={handleCloseModal}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    width: 400,
                                    bgcolor: 'background.paper',
                                    boxShadow: 24,
                                    p: 4
                                }}
                            >
                                {selectedProject && (
                                    <>
                                        <Typography variant="h6">{selectedProject.nome}</Typography>
                                        <Typography>Status: {selectedProject.status}</Typography>
                                        <Typography>
                                            Data Início: {dayjs(selectedProject.dataInicio).format('DD/MM/YYYY')}
                                        </Typography>
                                        <Typography>
                                            Data Conclusão: {dayjs(selectedProject.dataConclusao).format('DD/MM/YYYY')}
                                        </Typography>
                                        <Typography>Objetivos: {selectedProject.objetivos}</Typography>
                                        {detailedData ? (
                                            <>
                                                <Typography variant="h6" sx={{ mt: 2 }}>
                                                    Detalhes Adicionais
                                                </Typography>
                                                {detailedData.reunioes && detailedData.reunioes.length > 0 ? (
                                                    detailedData.reunioes.map((reuniao, index) => (
                                                        <Box key={index} sx={{ mt: 1 }}>
                                                            <Typography>Título: {reuniao.titulo}</Typography>
                                                            <Typography>
                                                                Data: {dayjs(reuniao.data).format('DD/MM/YYYY')}
                                                            </Typography>
                                                            {/* More fields */}
                                                        </Box>
                                                    ))
                                                ) : (
                                                    <Typography>Nenhuma reunião encontrada.</Typography>
                                                )}
                                            </>
                                        ) : (
                                            <Typography>Carregando...</Typography>
                                        )}
                                    </>
                                )}
                            </Box>
                        </Modal>
                    </TabPanel>

                    {/* ... The rest of your component remains unchanged ... */}

                    <Box sx={{ p: 2, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon={'solar:document-bold'} />}
                            onClick={handleExportPDF}
                        >
                            Exportar PDF
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Iconify icon={'icon-park-outline:excel'} />}
                            onClick={handleExportExcel}
                        >
                            Exportar Excel
                        </Button>
                    </Box>
                </Card>
                <Snackbar
                    open={!!snackbarMessage}
                    autoHideDuration={3000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                >
                    <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Container>
        </LocalizationProvider>
    )
}
