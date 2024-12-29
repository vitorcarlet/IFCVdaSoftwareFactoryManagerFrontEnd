import { DarkModeProvider } from '@/contexts/DarkModeContext'
import { poppins } from './dashboard/fonts'
import { Metadata } from 'next'
import ThemeRegistry from '@/theme'
import { AuthProvider } from '@/contexts/JWTContext'
import { ModalGlobalProvider } from '@/contexts/ModalContext'

export const metadata: Metadata = {
    title: {
        template: '%s | Software Factory Dashboard',
        default: 'Software Factory Dashboard'
    },
    description: 'Software Factory Dashboard built with App Router.',
    metadataBase: new URL('https://next-learn-dashboard.vercel.sh')
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-BR">
            <body className={`${poppins.className} antialised`}>
                <AuthProvider>
                    <DarkModeProvider>
                        <ThemeRegistry>
                            <ModalGlobalProvider>{children}</ModalGlobalProvider>
                        </ThemeRegistry>
                    </DarkModeProvider>
                </AuthProvider>
            </body>
        </html>
    )
}
