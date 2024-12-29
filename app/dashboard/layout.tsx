import { Metadata } from 'next'
import Grid from '@mui/material/Grid2'
import { Box } from '@mui/material'
import SideNav from '@/components/side-nav/SideNav'

export const metadata: Metadata = {
    title: {
        template: '%s | Software Factory Dashboard',
        default: 'Software Factory Dashboard'
    },
    description: 'Software Factory Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh')
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box>
            <Grid container style={{ height: '100vh' }}>
                <Grid size={2} style={{ height: 'auto' }}>
                    <SideNav />
                </Grid>
                <Grid
                    display={'flex'}
                    justifyContent={'center'}
                    size={10}
                    style={{ padding: '24px', overflowY: 'auto' }}
                >
                    {children}
                </Grid>
            </Grid>
        </Box>
    )
}
