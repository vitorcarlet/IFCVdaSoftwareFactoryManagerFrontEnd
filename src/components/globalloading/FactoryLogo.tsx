'use client'

import { forwardRef } from 'react'
import NextLink from 'next/link'

import { useTheme } from '@mui/material/styles'
import { BoxProps, Theme } from '@mui/system'
import { Box } from '@mui/material'

interface Props extends BoxProps {
    disabledLink?: boolean
    width?: number
    height?: number
}

const Logo = (theme: Theme) => {
    const background = theme.palette.text.primary
    const primary = theme.palette.mode === 'dark' ? '#ffd149' : '#c61117'

    return (
        <svg xmlns="http://www.w3.org/2000/svg" id="Camada_1" data-name="Camada 1" viewBox="0 0 149 45">
            <rect x="20" y="100" width="160" height="80" fill="#d1d5db" />
            <rect x="30" y="110" width="140" height="60" fill="#9ca3af" />

            <rect x="50" y="70" width="20" height="40" fill="#6b7280" />
            <rect x="130" y="50" width="20" height="60" fill="#6b7280" />

            <circle cx="140" cy="30" r="10" fill="#e5e7eb" />
            <circle cx="145" cy="20" r="15" fill="#e5e7eb" />
            <circle cx="135" cy="15" r="12" fill="#e5e7eb" />

            <circle cx="60" cy="60" r="8" fill="#e5e7eb" />
            <circle cx="65" cy="50" r="12" fill="#e5e7eb" />
            <circle cx="55" cy="45" r="10" fill="#e5e7eb" />

            <rect x="60" y="130" width="20" height="30" fill="#374151" />
            <rect x="120" y="130" width="20" height="30" fill="#374151" />
            <rect x="90" y="140" width="20" height="20" fill="#4b5563" />
        </svg>
    )
}

export const FactoryLogo = forwardRef<any, Props>(({ disabledLink = false, width = 180, height = 50, sx }, ref) => {
    const theme = useTheme()

    const logo = (
        <Box ref={ref} sx={{ width, height, cursor: 'pointer', ...sx }}>
            {Logo(theme)}
        </Box>
    )

    if (disabledLink) {
        return <>{logo}</>
    }

    return <NextLink href="/">{logo}</NextLink>
})
