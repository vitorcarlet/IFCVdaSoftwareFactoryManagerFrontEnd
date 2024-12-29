import React from 'react'
import { Project } from './ProjectManagement'
import { Typography, Grid, Paper } from '@mui/material'

const ProjectDetails = (project: Project) => {
    return (
        <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
                {project.nome}
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Business Area:</strong> {project.ambienteNegocio}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Business Need:</strong> {project.necessidadeNegocio}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Objectives:</strong> {project.objetivos}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Technologies:</strong> {project.tecnologias}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Stakeholders:</strong> {project.stakeholders}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Status:</strong> {project.status}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Manager Comment:</strong> {project.comentarioGestor}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Public:</strong> {project.isPublic ? 'Yes' : 'No'}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Start Date:</strong> {project.dataInicio}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>End Date:</strong> {project.dataConclusao}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        <strong>Participants:</strong> {project.participantes.join(', ')}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProjectDetails
