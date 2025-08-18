import type {Metadata} from 'next'
import {GeistSans} from 'geist/font/sans'
import {GeistMono} from 'geist/font/mono'
import './globals.css'
import ReactQueryProvider from './ReactQueryProvider'
import {UndoManagerProvider} from "@/features/undo/hooks/useUndoManager";
import {UndoFloatingButton} from "@/components/shared/UndoFloatingButton";
import {ThemeProvider} from "@/app/ThemeProvider";
import {ModeToggle} from "@/components/shared/ModeToggle";

export const metadata: Metadata = {
    title: 'Leads',
    description: 'Site para Visualização de Leads',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="pt" suppressHydrationWarning>
        <head>
            <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
                `}</style>
        </head>
        <body>
        <ReactQueryProvider>
            <UndoManagerProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="absolute top-8 right-8 z-50">
                        <ModeToggle />
                    </div>
                    {children}
                </ThemeProvider>
                <UndoFloatingButton />
            </UndoManagerProvider>
        </ReactQueryProvider>
        </body>
        </html>
    )
}