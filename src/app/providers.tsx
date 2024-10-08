'use client'
import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import React,{ FC } from 'react'

interface providersProps {
 children:React.ReactNode 
}

const Providers: FC<providersProps> = ({children}) => {
  return <>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          ><SessionProvider >

            {children}
            <Toaster />
          </SessionProvider>
          </ThemeProvider>
  </>
}

export default Providers