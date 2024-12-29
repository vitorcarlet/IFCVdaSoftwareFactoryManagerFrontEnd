import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

interface MeetingDeleteProps {
    meetingId: number
    onDelete: (meetingId: number) => void
    onClose: () => void
}

const MeetingDelete: React.FC<MeetingDeleteProps> = ({ meetingId, onDelete, onClose }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Deletar Reunião
            </Typography>
            <Typography variant="body1" gutterBottom>
                Tem certeza de que deseja deletar a reunião <strong>{meetingId}</strong>? Esta ação não pode ser
                desfeita.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button onClick={onClose} variant="outlined" color="secondary">
                    Cancelar
                </Button>
                <Button onClick={() => onDelete(meetingId)} variant="contained" color="error">
                    Deletar
                </Button>
            </Stack>
        </Box>
    )
}

export default MeetingDelete
