'use client'
import { useMemo } from 'react'

import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import { typography } from './typography'
import shadows, { customShadows } from './shadows'
import palette from './palette'
import { useDarkMode } from '../contexts/DarkModeContext'
import breakpoints from './breakpoints'

// ----------------------------------------------------------------------

import { ReactNode } from 'react'

export default function ThemeRegistry({ children }: { children: ReactNode }) {
    const { darkMode, toggleDarkMode } = useDarkMode()
    const isLight = darkMode === false
    const memoizedValue = useMemo(
        () => ({
            palette: isLight ? palette.light : palette.dark,
            typography,
            breakpoints,
            shape: { borderRadius: 8 },
            shadows: isLight ? shadows.light : shadows.dark,
            customShadows: isLight ? customShadows.light : customShadows.dark
        }),
        [isLight]
    )

    const theme = createTheme(memoizedValue)

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
