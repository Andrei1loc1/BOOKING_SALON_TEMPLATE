'use client'

import { useEffect, useState } from 'react'
import { getAllUsers, updateUserStatus, updateUserRole } from '@/actions/admin-actions'
import type { AdminUserRow } from '@/types/admin'

export function useAdminUsers() {
    const [users, setUsers] = useState<AdminUserRow[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const data = await getAllUsers()
            setUsers(data as AdminUserRow[])
        } catch {
            setError('Eroare la încărcarea utilizatorilor.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const toggleStatus = async (userId: string, current: 'active' | 'inactive') => {
        const next = current === 'active' ? 'inactive' : 'active'
        await updateUserStatus(userId, next)
        setUsers(prev =>
            prev.map(u => u.id === userId ? { ...u, status: next } : u)
        )
    }

    const changeRole = async (userId: string, role: 'admin' | 'client' | 'employee') => {
        await updateUserRole(userId, role)
        setUsers(prev =>
            prev.map(u => u.id === userId ? { ...u, role } : u)
        )
    }

    return { users, loading, error, refetch: fetchUsers, toggleStatus, changeRole }
}
