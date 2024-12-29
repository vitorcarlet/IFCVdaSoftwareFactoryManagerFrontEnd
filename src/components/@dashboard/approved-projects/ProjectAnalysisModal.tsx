import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material'
import { useState } from 'react'

interface ProjectAnalysisBoxProps {
    info: {
        action: 'aprovar' | 'rejeitar'
        projectId: string
    }
    onSuccess: (conclusion: string, action: string, projectId: string) => void
    onCancel: () => void
}

export const ProjectAnalysisModal = ({ info, onSuccess, onCancel }: ProjectAnalysisBoxProps) => {
    const [justification, setJustification] = useState('')
    const [loading, setLoading] = useState(false)

    const handleConfirm = async () => {
        setLoading(true)
        try {
            if (info.action === 'aprovar') {
                // Simula a aprovação (substituir por chamada real)
                console.log(`Aprovando projeto ID: ${info.projectId}`)
                await onSuccess(justification, info.action, info.projectId)
            } else {
                // Simula a rejeição (substituir por chamada real)
                console.log(`Reprovando projeto ID: ${info.projectId}, Justificativa: ${justification}`)
                await onSuccess(justification, info.action, info.projectId)
            }
        } catch (error) {
            console.error('Erro ao processar a ação:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '16px',
                marginTop: '16px',
                backgroundColor: '#f9f9f9',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
            }}
        >
            <Typography variant="h6">{info.action === 'aprovar' ? 'Aprovar Projeto' : 'Reprovar Projeto'}</Typography>
            <Typography variant="body1">
                {info.action === 'aprovar'
                    ? `Você está prestes a aprovar o projeto com ID: ${info.projectId}.`
                    : `Por favor, forneça uma justificativa para reprovar o projeto com ID: ${info.projectId}.`}
            </Typography>

            {info.action === 'rejeitar' && (
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Justificativa"
                    value={justification}
                    onChange={e => setJustification(e.target.value)}
                    variant="outlined"
                />
            )}

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '8px'
                }}
            >
                <Button variant="outlined" color="secondary" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    color={info.action === 'aprovar' ? 'primary' : 'error'}
                    onClick={handleConfirm}
                    disabled={loading || (info.action === 'rejeitar' && !justification.trim())}
                >
                    {loading ? <CircularProgress size={20} /> : info.action === 'aprovar' ? 'Aprovar' : 'Reprovar'}
                </Button>
            </Box>
        </Box>
    )
}
