import React, { SetStateAction, Dispatch } from 'react'
import { Box, Typography, Button } from '@mui/material'
import axios from '@/utils/axios'

interface SureDeleteModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    itemId: number
    setData: Dispatch<SetStateAction<any[]>>
    setShowAlert: Dispatch<SetStateAction<boolean>>
}

export const SureDeleteModal: React.FC<SureDeleteModalProps> = ({
    setShowAlert,
    isOpen,
    setData,
    onClose,
    onConfirm,
    itemId
}) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`/api/Ideias/${itemId}`)
            setShowAlert(true)
            setData(prevData => prevData.filter(item => item.id !== itemId))
            onConfirm()
        } catch (error) {
            console.error('Failed to delete item:', error)
        }
    }

    if (!isOpen) return null

    return (
        <Box
        // sx={{
        //     position: 'fixed',
        //     top: '50%',
        //     left: '50%',
        //     transform: 'translate(-50%, -50%)',
        //     bgcolor: 'background.paper',
        //     boxShadow: 24,
        //     p: 4,
        //     zIndex: 1300
        // }}
        >
            <Typography variant="h6">Are you sure you want to delete this item?</Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                This action cannot be undone.
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button onClick={onClose} color="primary" sx={{ mr: 2 }}>
                    Cancel
                </Button>
                <Button onClick={handleDelete} color="secondary">
                    Delete
                </Button>
            </Box>
        </Box>
    )
}
