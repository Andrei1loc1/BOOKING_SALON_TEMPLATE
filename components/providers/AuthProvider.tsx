'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Cookies from 'js-cookie'

interface AuthContextValue {
    user: User | null
    loading: boolean
}

const AuthContext = createContext<AuthContextValue>({ user: null, loading: true })

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser)

            if (firebaseUser) {
                // Setăm cookie-ul pentru middleware — expiră în 30 de zile
                Cookies.set('auth-session', '1', { expires: 30, sameSite: 'strict' })
            } else {
                // Ștergem cookie-ul la logout
                Cookies.remove('auth-session')
                Cookies.remove('user-role')
            }

            setLoading(false)
        })
        return () => unsubscribe()
    }, [])

    // Cât timp Firebase verifică sesiunea din localStorage, afișăm un loader
    // pentru a evita flash-ul de conținut neautorizat
    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full animate-spin"
                        style={{
                            border: '2px solid transparent',
                            borderTopColor: 'oklch(0.84 0.18 80)',
                            borderRightColor: 'oklch(0.84 0.18 80 / 0.3)',
                        }}
                    />
                    <span className="text-sm text-muted-foreground">Se verifică sesiunea...</span>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}
