'use client'
import Link from 'next/link'
import { Box, Typography, Button, useTheme, Avatar, IconButton, Tooltip } from '@mui/material'
import { useEffect, useState } from 'react'
//import AuthService from "@/services/AuthService";
import { useRouter } from 'next/navigation'
import NavLinks from './NavLinks'
import { Iconify } from '../iconify/iconify'
import { useDarkMode } from '@/contexts/DarkModeContext'
import useAuth from '@/hooks/useAuth'

export default function SideNav() {
    //     const [isClient, setIsClient] = useState(false)
    //     const router = useRouter()

    //   useEffect(() => {
    //     setIsClient(true)
    //   }, [])

    //   function logOff(){
    //     AuthService().logOut();
    //     router.push('/')
    //   }
    const { darkMode, toggleDarkMode } = useDarkMode()

    const theme = useTheme()

    const { logout } = useAuth()
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
                position: 'fixed',
                top: 0,
                paddingX: 3,
                paddingY: 4,
                md: { paddingX: 2 },
                borderRight: '1px solid',
                borderRightColor: theme.palette.grey[400],
                backgroundColor: 'background.paper',
                //borderRightColor: 'primary.main',
                // borderRightColor: 'gray.800',
                height: '100vh'
            }}
        >
            <Link href="/" passHref>
                <Box
                    sx={{
                        marginBottom: 2,
                        display: 'flex',
                        height: 20,
                        alignItems: 'flex-end',
                        justifyContent: 'start',
                        borderRadius: 'md',
                        backgroundColor: 'blue.600',
                        padding: 4,
                        md: { height: 40 }
                    }}
                >
                    <Box sx={{ width: 32, color: 'white', md: { width: 40 } }}>
                        <Iconify size={5} icon="noto-v1:factory" />
                    </Box>
                </Box>
            </Link>
            <Box
                sx={{
                    display: 'flex',
                    flexGrow: 1,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: 2,
                    [theme.breakpoints.down('lg')]: {
                        flexDirection: 'column',
                        gap: 0,
                        spaceY: 2
                    }
                }}
            >
                <NavLinks />
                <Box
                    sx={{
                        display: { md: 'flex' },
                        height: 'auto',
                        width: 'full',
                        flexGrow: 0,
                        borderRadius: 'md',
                        backgroundColor: 'gray.50',
                        marginTop: 'auto' // This will push the button to the bottom
                    }}
                >
                    <Button
                        onClick={logout}
                        sx={{
                            display: 'flex',
                            height: 48,
                            width: 'full',
                            flexGrow: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 2,
                            borderRadius: 'md',
                            backgroundColor: 'gray.50',
                            padding: 3,
                            fontSize: 'sm',
                            fontWeight: 'medium',
                            '&:hover': { backgroundColor: 'sky.100', color: 'blue.600' },
                            md: {
                                flexGrow: 0,
                                justifyContent: 'start',
                                paddingX: 2,
                                paddingY: 3
                            }
                        }}
                    >
                        <Iconify size={5} icon="mynaui:power" />
                        <Box sx={{ display: { md: 'block' } }}>Sair</Box>
                    </Button>
                    <Tooltip title="Toggle dark mode">
                        <IconButton size="large" onClick={toggleDarkMode} sx={{ color: 'text.primary' }}>
                            <Avatar
                                sx={{
                                    bgcolor: darkMode ? theme.palette.common.white : theme.palette.common.black
                                }}
                            >
                                <Iconify
                                    icon={darkMode ? 'solar:moon-bold' : 'mingcute:sun-fill'}
                                    size={3}
                                    color={darkMode ? 'black' : 'white'}
                                />
                            </Avatar>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
        </Box>
    )
}
