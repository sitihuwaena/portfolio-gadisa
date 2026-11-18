"use client"

import { store } from '../store'
import { Provider } from 'react-redux'
import { initializeFirebase } from '@/lib/firebase'
import { useEffect } from 'react'
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '@/components/ui/toaster'


export default function Providers({ children }: Readonly<{ children: React.ReactNode }>) {

    useEffect(() => {
        initializeFirebaseApp()
    }, [])

    const initializeFirebaseApp = async () => {
        await initializeFirebase();
    }

    return (
        <Provider store={store}>
            <NextTopLoader color='#4FBBFF' showSpinner={false} />
            {children}
            <Toaster />
        </Provider>
    )
}