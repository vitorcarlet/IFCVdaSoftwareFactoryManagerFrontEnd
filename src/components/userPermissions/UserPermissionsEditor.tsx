import React, { useState } from 'react'
import { TextField, Typography, Button, Box, Autocomplete } from '@mui/material'
import { UserPermissionsData } from '@/types/types'

interface UserInfoEditorProps {
    user: UserPermissionsData
    onSave: (updatedUser: UserPermissionsData) => void
    onCancel: () => void
}

const roles = ['Admin', 'Gestor', 'Aluno']

const UserInfoEditor: React.FC<UserInfoEditorProps> = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState<UserPermissionsData>({ ...user })

    const handleInputChange = (field: keyof UserPermissionsData, value: string | boolean) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }))
    }

    const handleSave = () => {
        onSave(formData)
    }

    return (
        <Box p={3}>
            <Typography variant="h5" gutterBottom>
                Edit Information for {user.nome}
            </Typography>

            <Box mt={2} display="flex" flexDirection="column" gap={2}>
                <TextField
                    label="Name"
                    value={formData.nome}
                    onChange={e => handleInputChange('nome', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Email"
                    value={formData.email}
                    onChange={e => handleInputChange('email', e.target.value)}
                    fullWidth
                />
                <Autocomplete
                    options={roles}
                    value={formData.role}
                    onChange={(event, newValue) => handleInputChange('role', newValue || '')}
                    renderInput={params => <TextField {...params} label="Role" />}
                    fullWidth
                />
                <TextField
                    label="Phone"
                    value={formData.telefone}
                    onChange={e => handleInputChange('telefone', e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Is Active"
                    value={formData.isActive ? 'Yes' : 'No'}
                    onChange={e => handleInputChange('isActive', e.target.value === 'Yes')}
                    fullWidth
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

export default UserInfoEditor
