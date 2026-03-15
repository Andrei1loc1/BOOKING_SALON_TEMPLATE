'use client'

import { useEffect, useState, useCallback } from 'react'
import { getAllAppointments, autoCompleteAppointments } from '@/actions/booking-actions'
import { getAllUsers } from '@/actions/admin-actions'
import type { Appointment } from '@/types'
import type { DashboardStats } from '@/types/admin'

export function useAdminDashboard() {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [stats, setStats] = useState<DashboardStats>({
        todayCount: 0,
        totalUsers: 0,
        monthRevenue: 0,
        pendingCount: 0,
    })
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const [allAppointments, allUsers] = await Promise.all([
                getAllAppointments(),
                getAllUsers(),
            ])

            const today = new Date().toISOString().split('T')[0]
            const now = new Date()
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()

            const todayCount = allAppointments.filter(
                a => a.date === today && a.status !== 'cancelled'
            ).length

            const pendingCount = 0 // No pending status anymore

            const monthRevenue = allAppointments
                .filter(a => a.created_at >= startOfMonth && a.status !== 'cancelled')
                .reduce((sum, a) => sum + (a.servicePrice ?? 0), 0)

            setAppointments(allAppointments)
            setStats({
                todayCount,
                totalUsers: allUsers.length,
                monthRevenue,
                pendingCount,
            })
        } catch {
            setError('Eroare la încărcarea datelor.')
        } finally {
            setLoading(false)
        }
    }

    // Auto-complete appointments that have passed their scheduled time
    const checkAndAutoComplete = useCallback(async () => {
        try {
            const completedCount = await autoCompleteAppointments()
            if (completedCount > 0) {
                await fetchData()
            }
        } catch (error) {
            console.error('Error auto-completing appointments:', error)
        }
    }, [])

    useEffect(() => {
        fetchData()
    }, [])

    // Check for appointments to auto-complete on mount and periodically
    useEffect(() => {
        checkAndAutoComplete()

        const interval = setInterval(checkAndAutoComplete, 2 * 60 * 1000)

        return () => clearInterval(interval)
    }, [checkAndAutoComplete])

    const todayAppointments = appointments
        .filter(a => a.date === new Date().toISOString().split('T')[0] && a.status !== 'cancelled')
        .sort((a, b) => a.time.localeCompare(b.time))

    const recentAppointments = [...appointments]
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .slice(0, 8)

    return {
        stats,
        todayAppointments,
        recentAppointments,
        allAppointments: appointments,
        loading,
        error,
        refetch: fetchData
    }
}
