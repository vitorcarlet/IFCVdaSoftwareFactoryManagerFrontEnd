import React, { useState } from 'react'
import { TextField, Typography, Button, Box, Autocomplete, Switch, FormControlLabel } from '@mui/material'
import axios from '@/utils/axios' // Ensure you have axios configured correctly
import { CreateUserData } from '@/types/types'

interface CreateUserProps {
    onSave: (newUser: CreateUserData) => Promise<void> // Callback when a user is created successfully
    onCancel: () => void // Callback to close the modal without saving
}

const roles = ['Admin', 'Gestor', 'Aluno']

const CreateUser: React.FC<CreateUserProps> = ({ onSave, onCancel }) => {
    const initialData: CreateUserData = {
        nome: '',
        email: '',
        role: '',
        telefone: '',
        isActive: false,
        username: '',
        password: '',
        numeroMatricula: ''
    }

    const [formData, setFormData] = useState<CreateUserData>(initialData)
    const [error, setError] = useState<string | null>(null)

    const handleInputChange = (field: keyof CreateUserData, value: string | boolean) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleSave = async () => {
        // Validate required fields
        if (
            !formData.nome ||
            !formData.email ||
            !formData.role ||
            !formData.username ||
            !formData.password ||
            !formData.numeroMatricula
        ) {
            setError('Please fill out all required fields.')
            return
        }

        setError(null)

        try {
            // Send a POST request to create a new user
            await axios.post('/api/Usuarios/cadastro', formData)
            onSave(formData) // Call success callback
        } catch (error) {
            console.error('Error creating user:', error)
            setError('Failed to create the user. Please try again.')
        }
    }

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                Add New User
            </Typography>

            {error && (
                <Typography color="error" variant="body2" gutterBottom>
                    {error}
                </Typography>
            )}

            <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    value={formData.nome}
                    onChange={e => handleInputChange('nome', e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    fullWidth
                    required
                />
                <Autocomplete
                    options={roles}
                    value={formData.role}
                    onChange={(event, newValue) => handleInputChange('role', newValue || '')}
                    renderInput={params => <TextField {...params} label="Role" required />}
                    fullWidth
                />
                <TextField
                    label="Username"
                    value={formData.username}
                    onChange={e => handleInputChange('username', e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={e => handleInputChange('password', e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Registration Number"
                    value={formData.numeroMatricula}
                    onChange={e => handleInputChange('numeroMatricula', e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Phone"
                    value={formData.telefone}
                    onChange={e => handleInputChange('telefone', e.target.value)}
                    fullWidth
                />
                <FormControlLabel
                    control={
                        <Switch
                            checked={formData.isActive}
                            onChange={e => handleInputChange('isActive', e.target.checked)}
                        />
                    }
                    label="Is Active"
                />
            </Box>

            <Box mt={3} display="flex" justifyContent="flex-end">
                <Button variant="contained" color="primary" onClick={handleSave} sx={{ mr: 2 }}>
                    Save
                </Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                    Cancel
                </Button>
            </Box>
        </Box>
    )
}

export default CreateUser
