import React, { useState } from 'react'
import { Box, Button, TextField, Modal } from '@mui/material'
import axios from '@/utils/axios'
import { DataItem } from './ProjectIdeasMain'

interface EditProjectIdeaModalProps {
    item: DataItem
    handleClose: () => void
    setData: React.Dispatch<React.SetStateAction<DataItem[]>>
    setActualEditText: React.Dispatch<React.SetStateAction<string>>
}

const EditProjectIdeaModal: React.FC<EditProjectIdeaModalProps> = ({
    item,
    handleClose,
    setData,
    setActualEditText
}) => {
    const [text, setText] = useState(item.descricao)

    const handleSubmit = async () => {
        try {
            const response = await axios.put(`/api/Ideias/${item.id}`, { descricao: text })
            console.log('Response:', response.data)
            setActualEditText(text)
            setData(prevData => prevData.map(data => (data.id === item.id ? { ...data, descricao: text } : data)))
            handleClose()
        } catch (error) {
            console.error('Error submitting text:', error)
        }
    }

    return (
        <Box
        // sx={{
        //     position: 'absolute',
        //     top: '50%',
        //     left: '50%',
        //     transform: 'translate(-50%, -50%)',
        //     width: 400,
        //     bgcolor: 'background.paper',
        //     border: '2px solid #000',
        //     boxShadow: 24,
        //     p: 4
        // }}
        >
            <TextField
                fullWidth
                label="Edit Project Idea"
                value={text}
                onChange={e => setText(e.target.value)}
                variant="outlined"
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    )
}

export default EditProjectIdeaModal
