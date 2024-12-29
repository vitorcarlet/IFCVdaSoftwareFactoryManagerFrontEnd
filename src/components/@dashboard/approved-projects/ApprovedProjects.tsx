'use client'
import React, { useState, useEffect } from 'react'
import { Container, Typography, Card, CardContent, CardActions, Button } from '@mui/material'
import axios from '@/utils/axios'
import { useModal } from '@/hooks/useModal'
import { ProjectAnalysisModal } from './ProjectAnalysisModal'

interface Project {
    id: number
    nome: string
    ambienteNegocio: string
    necessidadeNegocio: string
    objetivos: string
    tecnologias: string
    stakeholders: string
    status: string
    comentarioGestor: string | null
    isPublic: boolean
    dataInicio: string
    dataConclusao: string
    participantes: string[]
}

const ApprovedProjects = () => {
    const [projects, setProjects] = useState<Project[]>([])
    const modal = useModal()

    // Requisição para buscar projetos pendentes
    const fetchPendingProjects = async () => {
        try {
            const response = await axios.get('/api/Projetos')
            const pendingProjects = response.data.filter((project: Project) => project.status === 'Pendente')
            setProjects(pendingProjects)
        } catch (error) {
            console.error('Erro ao buscar projetos:', error)
        }
    }

    useEffect(() => {
        fetchPendingProjects()
    }, [])

    // Conclusão da análise (aprovação/rejeição)
    const analysisConclusion = async (conclusion: string, action: string, projectId: string) => {
        try {
            await axios.post(`/api/Projetos/${projectId}/${action}`, {
                projectId
            })
            // Atualizar a lista de projetos
            setProjects(prev => prev.filter(project => project.id !== Number(projectId)))
        } catch (error) {
            console.error('Erro ao concluir análise:', error)
        } finally {
            modal.close()
        }
    }

    // Aprovar projeto
    const handleApprove = (projectId: number) => {
        modal.open({
            title: 'Aprovar Projeto',
            size: 'md',
            customRender: () => (
                <ProjectAnalysisModal
                    info={{ action: 'aprovar', projectId: projectId.toString() }}
                    onCancel={modal.close}
                    onSuccess={conclusion => analysisConclusion(conclusion, 'aprovar', projectId.toString())}
                />
            )
        })
    }

    // Rejeitar projeto
    const handleReject = (projectId: number) => {
        modal.open({
            title: 'Rejeitar Projeto',
            size: 'md',
            customRender: () => (
                <ProjectAnalysisModal
                    info={{ action: 'rejeitar', projectId: projectId.toString() }}
                    onCancel={modal.close}
                    onSuccess={conclusion => analysisConclusion(conclusion, 'reprovar', projectId.toString())}
                />
            )
        })
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Pending Projects for Approval
            </Typography>
            {projects.map(project => (
                <Card key={project.id} style={{ marginBottom: '16px' }}>
                    <CardContent>
                        <Typography variant="h5">{project.nome}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {project.necessidadeNegocio}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={() => handleApprove(project.id)}>
                            Aprovar
                        </Button>
                        <Button color="secondary" onClick={() => handleReject(project.id)}>
                            Rejeitar
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Container>
    )
}

export default ApprovedProjects
