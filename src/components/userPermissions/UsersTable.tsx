'use client'
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Typography,
    CircularProgress,
    ButtonGroup,
    Button,
    Snackbar,
    Alert
} from '@mui/material'
import { CreateUserData, UserPermissionsData } from '@/types/types'
import { Iconify } from '../iconify/iconify'
import { useModal } from '@/hooks/useModal'
import UserPermissionsEditor from './UserPermissionsEditor'
import axios from '@/utils/axios'
import { UserDelete } from './UserDelete'
import UserInfoEditor from './UserPermissionsEditor'
import CreateUser from './CreateUser'

export const UsersTable: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [selectedUser, setSelectedUser] = useState<UserPermissionsData | null>(null)
    const [users, setUsers] = useState<UserPermissionsData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null)
    const modal = useModal()

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/Usuarios')
                setUsers(response.data)
            } catch (error) {
                console.error('Failed to fetch user permissions:', error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchUsers()
    }, [])

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: UserPermissionsData) => {
        setAnchorEl(event.currentTarget)
        setSelectedUser(user)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
        setSelectedUser(null)
    }

    const handleSaveUser = async (updatedUser: UserPermissionsData) => {
        try {
            await axios.put(`/api/Usuarios/${updatedUser.id}`, updatedUser)
            setUsers(prevUsers => prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user)))
            setSnackbarMessage('User updated successfully!')
            modal.close()
        } catch (error) {
            console.error('Failed to update user:', error)
        }
    }

    const handleEdit = () => {
        if (selectedUser) {
            modal.open({
                title: `Edit Permissions for ${selectedUser.nome}`,
                customRender: () => (
                    <UserPermissionsEditor user={selectedUser} onSave={handleSaveUser} onCancel={modal.close} />
                )
            })
        }
    }

    const deleteUser = async () => {
        try {
            await axios.delete(`/api/Usuarios/${selectedUser?.id}`)
            setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser?.id))
            setSnackbarMessage('User deleted successfully!')
            modal.close()
        } catch (error) {
            console.error('Failed to delete item:', error)
        }
    }

    const handleDelete = () => {
        if (selectedUser) {
            handleMenuClose()
            modal.open({
                title: `Deletar usuário ${selectedUser.nome}?`,
                customRender: () => (
                    <UserDelete
                        userName={selectedUser?.nome || ''}
                        onConfirm={deleteUser}
                        onCancel={() => modal.close()}
                    />
                )
            })
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarMessage(null)
    }

    const filteredUsers = users.filter(user => {
        if (filter === 'active') return user.isActive
        if (filter === 'inactive') return !user.isActive
        return true
    })

    if (isLoading) {
        return (
            <TableContainer component={Paper} sx={{ textAlign: 'center', py: 5 }}>
                <CircularProgress />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Loading user data...
                </Typography>
            </TableContainer>
        )
    }

    const handleAddUser = async (newUser: CreateUserData) => {
        try {
            const response = await axios.post('/api/Usuarios/cadastro', newUser)
            if (!response.data?.usuario) {
                throw new Error('Response does not contain usuario field')
            }
            setUsers(prevUsers => [...prevUsers, response.data.usuario])
            setSnackbarMessage('User added successfully!')
            modal.close()
        } catch (error) {
            console.error('Failed to add user:', error)
            setSnackbarMessage('Failed to add user')
        }
    }

    return (
        <TableContainer component={Paper}>
            <Typography variant="h6" component="div" sx={{ p: 2 }}>
                Tabela de Usuários
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() =>
                    modal.open({
                        title: 'Adicionar Novo Usuário',
                        customRender: () => <CreateUser onSave={handleAddUser} onCancel={modal.close} />
                    })
                }
            >
                Novo Usuário
            </Button>
            <ButtonGroup sx={{ p: 2 }}>
                <Button variant={filter === 'all' ? 'contained' : 'outlined'} onClick={() => setFilter('all')}>
                    Todos
                </Button>
                <Button variant={filter === 'active' ? 'contained' : 'outlined'} onClick={() => setFilter('active')}>
                    Ativos
                </Button>
                <Button
                    variant={filter === 'inactive' ? 'contained' : 'outlined'}
                    onClick={() => setFilter('inactive')}
                >
                    Inativos
                </Button>
            </ButtonGroup>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Telefone</TableCell>
                        <TableCell>Ativo</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.nome}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.telefone}</TableCell>
                            <TableCell>{user.isActive ? 'Sim' : 'Não'}</TableCell>
                            <TableCell align="right">
                                <IconButton onClick={event => handleMenuOpen(event, user)} aria-label="more">
                                    <Iconify size={2} icon={'fluent:more-vertical-48-regular'} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Menu de opções do usuário */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
            >
                <MenuItem onClick={handleEdit}>Edit User</MenuItem>
                <MenuItem onClick={handleDelete}>Delete User</MenuItem>
            </Menu>

            {/* Snackbar de sucesso */}
            <Snackbar
                open={!!snackbarMessage}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </TableContainer>
    )
}
