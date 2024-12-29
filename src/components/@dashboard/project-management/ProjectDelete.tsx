import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

interface ProjectDeleteProps {
    projectId: number
    onDelete: (projectId: number) => void
    onClose: () => void
}

export const ProjectDelete: React.FC<ProjectDeleteProps> = ({ projectId, onDelete, onClose }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Delete User
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the project <strong>{projectId}</strong>? This action cannot be undone.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button onClick={onClose} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button onClick={() => onDelete(projectId)} variant="contained" color="error">
                    Delete
                </Button>
            </Stack>
        </Box>
    )
}

export default ProjectDelete
