'use client'
import React, { useState } from 'react'
import { Container, TextField, Button, Typography, Box, Grid } from '@mui/material'

const ProjectRegister: React.FC = () => {
    const [projectName, setProjectName] = useState('')
    const [businessDescription, setBusinessDescription] = useState('')
    const [generalObjectives, setGeneralObjectives] = useState('')
    const [technologies, setTechnologies] = useState<string[]>([])
    const [stakeholders, setStakeholders] = useState<string[]>([])
    const [status, setStatus] = useState('')

    const handleAddTechnology = () => {
        setTechnologies([...technologies, ''])
    }

    const handleAddStakeholder = () => {
        setStakeholders([...stakeholders, ''])
    }

    const handleSubmit = () => {
        // Handle form submission logic here
        setStatus('Project submitted for approval.')
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Project Registration
            </Typography>
            <Box component="form" noValidate autoComplete="off">
                <TextField
                    fullWidth
                    label="Project Name"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="Business Description"
                    value={businessDescription}
                    onChange={e => setBusinessDescription(e.target.value)}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    label="General and Specific Objectives"
                    value={generalObjectives}
                    onChange={e => setGeneralObjectives(e.target.value)}
                    margin="normal"
                />
                <Box mt={2}>
                    <Typography variant="h6">Technologies</Typography>
                    {technologies.map((tech, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            label={`Technology ${index + 1}`}
                            value={tech}
                            onChange={e => {
                                const newTechnologies = [...technologies]
                                newTechnologies[index] = e.target.value
                                setTechnologies(newTechnologies)
                            }}
                            margin="normal"
                        />
                    ))}
                    <Button variant="contained" onClick={handleAddTechnology}>
                        Add Technology
                    </Button>
                </Box>
                <Box mt={2}>
                    <Typography variant="h6">Stakeholders</Typography>
                    {stakeholders.map((stakeholder, index) => (
                        <TextField
                            key={index}
                            fullWidth
                            label={`Stakeholder ${index + 1}`}
                            value={stakeholder}
                            onChange={e => {
                                const newStakeholders = [...stakeholders]
                                newStakeholders[index] = e.target.value
                                setStakeholders(newStakeholders)
                            }}
                            margin="normal"
                        />
                    ))}
                    <Button variant="contained" onClick={handleAddStakeholder}>
                        Add Stakeholder
                    </Button>
                </Box>
                <Box mt={2}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Save (or Submit for Approval)
                    </Button>
                </Box>
            </Box>
            <Box mt={2}>
                <Typography variant="body1">{status}</Typography>
            </Box>
        </Container>
    )
}

export default ProjectRegister
