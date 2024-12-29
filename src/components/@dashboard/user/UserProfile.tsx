'use client'
import { useState } from 'react'
import { Box, Card, Stack, Avatar, Typography, TextField, Button, Divider } from '@mui/material'
import { Iconify } from '@/components/iconify/iconify'
import axios from '@/utils/axios'

interface UserProfileProps {
    nome?: string
    email?: string
    role?: string
    avatar?: string
    username?: string
    telefone?: string
}

export default function UserProfile() {
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [formData, setFormData] = useState<UserProfileProps>({
        nome: 'John Doe',
        email: 'johhn@example.com',
        role: 'user',
        avatar: 'V',
        username: 'john',
        telefone: '41998435321'
    })
    const [originalData, setOriginalData] = useState<UserProfileProps>({ ...formData })

    const handleEdit = () => {
        if (!isEditing) {
            setOriginalData({ ...formData }) // Salvar os valores atuais antes de editar
        }
        setIsEditing(!isEditing)
    }

    const handleSave = async () => {
        try {
            setIsSaving(true)
            // Lógica de salvar dados no backend
            await axios.post('/api/user/update', formData)
            setOriginalData({ ...formData }) // Atualiza os valores originais após salvar
            setIsEditing(false)
        } catch (error) {
            console.error('Erro ao salvar os dados', error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleCancel = () => {
        setFormData({ ...originalData }) // Reverter para os valores originais
        setIsEditing(false)
    }

    return (
        <Card sx={{ p: 3, maxWidth: 600, mx: 'auto', width: '100%' }}>
            <Stack spacing={3} alignItems="center" sx={{ px: 2 }}>
                <Avatar src={formData.avatar} alt={formData.nome} sx={{ width: 120, height: 120 }} />

                <Stack spacing={2} sx={{ width: '100%' }}>
                    <Typography variant="h6" align="center">
                        Perfil do Usuário
                    </Typography>

                    <Divider />

                    <Box component="form">
                        <Stack spacing={3}>
                            <TextField
                                label="Nome"
                                value={formData.nome}
                                disabled={!isEditing}
                                onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                fullWidth
                            />

                            <TextField
                                label="E-mail"
                                value={formData.email}
                                disabled={!isEditing}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                fullWidth
                            />

                            <TextField label="Papel" value={formData.role} disabled fullWidth />

                            <TextField
                                label="Nome de Usuário"
                                value={formData.username}
                                disabled={!isEditing}
                                onChange={e => setFormData({ ...formData, username: e.target.value })}
                                fullWidth
                            />

                            <TextField
                                label="Telefone"
                                value={formData.telefone}
                                disabled={!isEditing}
                                onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                                fullWidth
                            />

                            {isEditing && (
                                <Button variant="outlined" onClick={handleCancel} sx={{ alignSelf: 'flex-end' }}>
                                    Cancelar
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                disabled={isSaving}
                                startIcon={
                                    isEditing ? (
                                        <Iconify icon={'material-symbols:sync-saved-locally-rounded'} size={2} />
                                    ) : (
                                        <Iconify icon={'fa-solid:edit'} size={2} />
                                    )
                                }
                                onClick={isEditing ? handleSave : handleEdit}
                                sx={{ alignSelf: 'flex-end' }}
                            >
                                {isEditing ? 'Salvar' : 'Editar'}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    )
}
