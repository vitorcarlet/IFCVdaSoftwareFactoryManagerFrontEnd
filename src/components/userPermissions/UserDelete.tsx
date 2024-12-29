import React from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

interface UserDeleteProps {
    userName: string
    onConfirm: () => void
    onCancel: () => void
}

export const UserDelete: React.FC<UserDeleteProps> = ({ userName, onConfirm, onCancel }) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Delete User
            </Typography>
            <Typography variant="body1" gutterBottom>
                Are you sure you want to delete the user <strong>{userName}</strong>? This action cannot be undone.
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
                <Button onClick={onCancel} variant="outlined" color="secondary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="error">
                    Delete
                </Button>
            </Stack>
        </Box>
    )
}

export default UserDelete
