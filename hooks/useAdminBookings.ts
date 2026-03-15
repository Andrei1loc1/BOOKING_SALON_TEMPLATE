'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import { getAllAppointments, autoCompleteAppointments } from '@/actions/booking-actions'
import { updateAppointmentStatus } from '@/actions/admin-actions'
import type { AdminAppointment } from '@/types/admin'

export function useAdminBookings() {
    const [appointments, setAppointments] = useState<AdminAppointment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAppointments = async () => {
        try {
            setLoading(true)
            const data = await getAllAppointments()
            setAppointments(data)
        } catch {
            setError('Eroare la încărcarea programărilor.')
        } finally {
            setLoading(false)
        }
    }

    // Auto-complete appointments that have passed their scheduled time
    const checkAndAutoComplete = useCallback(async () => {
        try {
            const completedCount = await autoCompleteAppointments()
            if (completedCount > 0) {
                // Refresh appointments after auto-completing
                await fetchAppointments()
            }
        } catch (error) {
            console.error('Error auto-completing appointments:', error)
        }
    }, [])

    useEffect(() => {
        fetchAppointments()
    }, [])

    // Check for appointments to auto-complete on mount and periodically
    useEffect(() => {
        // Check immediately on mount
        checkAndAutoComplete()

        // Check every 2 minutes
        const interval = setInterval(checkAndAutoComplete, 2 * 60 * 1000)

        return () => clearInterval(interval)
    }, [checkAndAutoComplete])

    // Map: "YYYY-MM-DD" -> statuses present on that day
    const appointmentsByDate = useMemo(() => {
        const map = new Map<string, AdminAppointment[]>()
        for (const appt of appointments) {
            const existing = map.get(appt.date) ?? []
            map.set(appt.date, [...existing, appt])
        }
        return map
    }, [appointments])

    const getForDate = (date: string) =>
        (appointmentsByDate.get(date) ?? []).sort((a, b) => a.time.localeCompare(b.time))

    const changeStatus = async (id: string, status: AdminAppointment['status']) => {
        await updateAppointmentStatus(id, status)
        setAppointments(prev =>
            prev.map(a => a.id === id ? { ...a, status } : a)
        )
    }

    return { appointments, appointmentsByDate, getForDate, loading, error, refetch: fetchAppointments, changeStatus }
}
