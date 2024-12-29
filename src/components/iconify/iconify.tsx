'use client'

import { Icon, IconifyIcon, iconExists } from '@iconify/react'

import { BoxProps } from '@mui/system'

import { StackProps, Box } from '@mui/material'

type Props = BoxProps &
  Pick<StackProps, 'color'> & {
    icon: IconifyIcon | string
    size?: number
  }

const fallbackIcon = (icon: IconifyIcon | string) => {
  if (typeof icon !== 'string' || iconExists(icon)) {
    return icon
  }

  return icon.replace('fa6-solid:', 'fa-solid:')
}

export const Iconify = ({ icon, size = 2, sx, ...other }: Props) => {
  return <Box component={Icon} icon={fallbackIcon(icon)} sx={{ fontSize: size * 10, ...sx }} {...other} />
}
