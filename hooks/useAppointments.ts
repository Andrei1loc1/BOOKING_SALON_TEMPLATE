'use client'

import { useEffect, useState } from 'react'
import { getUserAppointments, getAllAppointments, cancelAppointment } from '@/actions/booking-actions'
import type { Appointment } from '@/types'

export function useAppointments(userId?: string) {
    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchAppointments = async () => {
        try {
            setLoading(true)
            const data = userId
                ? await getUserAppointments(userId)
                : await getAllAppointments()
            setAppointments(data)
        } catch {
            setError('Eroare la încărcarea programărilor.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAppointments()
    }, [userId])

    const cancel = async (appointmentId: string) => {
        await cancelAppointment(appointmentId)
        setAppointments(prev =>
            prev.map(a => a.id === appointmentId ? { ...a, status: 'cancelled' } : a)
        )
    }

    return { appointments, loading, error, refetch: fetchAppointments, cancel }
}
