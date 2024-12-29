'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Box,
    CircularProgress,
    Container,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from '@mui/material'
import { useState, useEffect, useMemo } from 'react'
import { Iconify } from '../iconify/iconify'
import useAuth from '@/hooks/useAuth'
import { set } from 'date-fns'
import { LOCAL_STORAGE } from '@/config'

const links = [
    {
        name: 'Dashboard Principal',
        href: '/dashboard',
        icon: 'heroicons:home-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Cadastro de Projetos',
        href: '/dashboard/projects/register',
        icon: 'heroicons:document-duplicate-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Gestão de Projetos',
        href: '/dashboard/projects/management',
        icon: 'heroicons:folder-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Aprovação de Projetos',
        href: '/dashboard/projects/approval',
        icon: 'heroicons:check-circle-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Consulta de Projetos Públicos',
        href: '/dashboard/projects',
        icon: 'mingcute:search-line',
        roles: ['Admin', 'Gestor', 'Aluno']
    },
    {
        name: 'Reuniões',
        href: '/dashboard/meetings',
        icon: 'heroicons:calendar-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Relatórios',
        href: '/dashboard/reports',
        icon: 'heroicons:chart-bar-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Registro de Ideias de Projetos',
        href: '/dashboard/projects/ideas/new',
        icon: 'heroicons:light-bulb-solid',
        roles: ['Admin', 'Gestor', 'Aluno']
    },
    {
        name: 'Ideias',
        href: '/dashboard/projects/ideas',
        icon: 'heroicons:light-bulb-solid',
        roles: ['Admin', 'Gestor']
    },
    {
        name: 'Starter Pack',
        href: '/dashboard/starter',
        icon: 'heroicons:book-open-solid',
        roles: ['Admin', 'Gestor', 'Aluno']
    },
    {
        name: 'Perfil do Usuário',
        href: '/dashboard/users',
        icon: 'heroicons:user-circle-solid',
        roles: ['Admin', 'Gestor', 'Aluno']
    },
    {
        name: 'Usuários e Permissões',
        href: '/dashboard/users-permissions',
        icon: 'heroicons:user-circle-solid',
        roles: ['Admin']
    }
    // ... rest of the links with roles included
]

export default function NavLinks() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    const pathname = usePathname()
    const theme = useTheme()
    //const [userRole, setUserRole] = useState<any>('aluno')
    const [isLoading, setIsLoading] = useState(false)

    const userRoleStorage = localStorage.getItem(LOCAL_STORAGE.LOCAL_STORAGE_LICENSE)
    const userRoleParsed = userRoleStorage ? JSON.parse(userRoleStorage) : null
    const userRole = userRoleParsed?.role

    console.log('userRoleStorage', userRole?.role)

    // Memoize the filtered links for performance
    const filteredLinks = useMemo(() => {
        return links.filter(link => link.roles.includes(userRole))
    }, [userRole])

    if (isLoading) {
        return (
            <Container>
                <CircularProgress />
                <Typography variant="subtitle1" sx={{ mt: 2 }}>
                    Carregando dashboard
                </Typography>
            </Container>
        )
    }

    return (
        <Box>
            {filteredLinks.map(link => (
                <Box key={link.name}>
                    <Link href={link.href} passHref style={{ textDecoration: 'none' }}>
                        <ListItemButton
                            sx={{
                                backgroundColor: 'inherit',
                                color: 'inherit',
                                ...(pathname === link.href && {
                                    backgroundColor: 'sky.100',
                                    color: 'black.600'
                                }),
                                '&:hover': {
                                    textDecoration: 'none'
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: '0px' }}>
                                <Box sx={{ marginRight: '.5rem' }}>
                                    <Iconify size={2} icon={link.icon} />
                                </Box>
                            </ListItemIcon>
                            <ListItemText
                                primaryTypographyProps={{
                                    variant: 'body2',
                                    sx: { color: theme.palette.text.primary, textDecoration: 'none' }
                                }}
                                sx={{
                                    display: { xs: 'none', md: 'block' },
                                    color: theme.palette.text.primary
                                }}
                                primary={link.name}
                                className="hidden md:block"
                            />
                        </ListItemButton>
                    </Link>
                </Box>
            ))}
        </Box>
    )
}
