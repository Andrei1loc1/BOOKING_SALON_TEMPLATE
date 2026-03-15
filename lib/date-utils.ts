export function toDateKey(date: Date): string {
    return date.toISOString().split('T')[0]
}

export function formatDateLong(date: Date): string {
    return date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })
}

export function generateTimeSlots(startHour: number, endHour: number): string[] {
    const slots: string[] = []
    for (let h = startHour; h < endHour; h++) {
        slots.push(`${String(h).padStart(2, '0')}:00`)
        slots.push(`${String(h).padStart(2, '0')}:30`)
    }
    return slots
}

/**
 * Check if an appointment should be automatically marked as completed
 * based on the scheduled date, time, and service duration.
 */
export function shouldAutoCompleteAppointment(
    appointmentDate: string,
    appointmentTime: string,
    serviceDuration: number,
    currentStatus: string
): boolean {
    // Only auto-complete if status is confirmed (not pending, completed or cancelled)
    if (currentStatus !== 'confirmed') {
        return false
    }

    const now = new Date()
    const [hours, minutes] = appointmentTime.split(':').map(Number)

    // Create appointment end time (start time + duration)
    const appointmentEnd = new Date(appointmentDate)
    appointmentEnd.setHours(hours, minutes + serviceDuration, 0, 0)

    // Auto-complete if appointment end time has passed
    return now > appointmentEnd
}

/**
 * Get appointments that should be automatically marked as completed
 */
export function getAppointmentsToAutoComplete<T extends {
    id?: string
    date: string
    time: string
    status: string
    serviceDuration: number
}>(
    appointments: T[]
): T[] {
    return appointments.filter(apt =>
        shouldAutoCompleteAppointment(
            apt.date,
            apt.time,
            apt.serviceDuration,
            apt.status
        )
    )
}
