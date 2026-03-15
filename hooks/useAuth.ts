'use client'

import { useEffect, useState } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUserProfile, getCurrentUserRole } from '@/actions/auth-actions'
import type { UserProfile } from '@/types'

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [role, setRole] = useState<'admin' | 'client' | 'employee' | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            setUser(firebaseUser)

            if (firebaseUser) {
                const [userProfile, userRole] = await Promise.all([
                    getUserProfile(firebaseUser.uid),
                    getCurrentUserRole(firebaseUser.uid),
                ])
                setProfile(userProfile)
                setRole(userRole)
            } else {
                setProfile(null)
                setRole(null)
            }

            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return { user, profile, role, loading, isAdmin: role === 'admin' }
}
