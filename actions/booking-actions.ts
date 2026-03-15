import { ref, push, get, update, query, orderByChild, equalTo } from 'firebase/database'
import { db } from '@/lib/firebase'
import { getAppointmentsToAutoComplete } from '@/lib/date-utils'
import type { Appointment, BlockedSlot } from '@/types'

export async function createAppointment(
    data: Omit<Appointment, 'id' | 'created_at' | 'status'>
): Promise<string> {
    const newRef = push(ref(db, 'appointments'))
    const appointment: Omit<Appointment, 'id'> = {
        ...data,
        status: 'confirmed',
        created_at: new Date().toISOString(),
    }
    await update(newRef, appointment)
    return newRef.key!
}

export async function getAllAppointments(): Promise<Appointment[]> {
    const snap = await get(ref(db, 'appointments'))
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<Appointment, 'id'>),
    }))
}

export async function getUserAppointments(userId: string): Promise<Appointment[]> {
    const q = query(ref(db, 'appointments'), orderByChild('userId'), equalTo(userId))
    const snap = await get(q)
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<Appointment, 'id'>),
    }))
}

export async function getAppointmentsByDate(date: string): Promise<Appointment[]> {
    const q = query(ref(db, 'appointments'), orderByChild('date'), equalTo(date))
    const snap = await get(q)
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<Appointment, 'id'>),
    }))
}

export async function cancelAppointment(appointmentId: string): Promise<void> {
    await update(ref(db, `appointments/${appointmentId}`), { status: 'cancelled' })
}

export async function isSlotAvailable(
    date: string,
    time: string,
    duration: number
): Promise<boolean> {
    const [existingAppointments, blockedSlots] = await Promise.all([
        getAppointmentsByDate(date),
        getBlockedSlotsByDate(date),
    ])

    const [hours, minutes] = time.split(':').map(Number)
    const newStart = hours * 60 + minutes
    const newEnd = newStart + duration

    const appointmentConflict = existingAppointments
        .filter(a => a.status !== 'cancelled')
        .some(a => {
            const [ah, am] = a.time.split(':').map(Number)
            const existStart = ah * 60 + am
            const existEnd = existStart + a.serviceDuration
            return newStart < existEnd && newEnd > existStart
        })

    const blockedConflict = blockedSlots.some(b => {
        const [bh, bm] = b.time.split(':').map(Number)
        const blockStart = bh * 60 + bm
        const blockEnd = blockStart + b.duration
        return newStart < blockEnd && newEnd > blockStart
    })

    return !appointmentConflict && !blockedConflict
}

async function getBlockedSlotsByDate(date: string): Promise<BlockedSlot[]> {
    const q = query(ref(db, 'blocked_slots'), orderByChild('date'), equalTo(date))
    const snap = await get(q)
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<BlockedSlot, 'id'>),
    }))
}

/**
 * Automatically mark appointments as completed if their scheduled time has passed.
 * Returns the number of appointments that were marked as completed.
 */
export async function autoCompleteAppointments(): Promise<number> {
    const allAppointments = await getAllAppointments()
    const toComplete = getAppointmentsToAutoComplete(allAppointments)

    if (toComplete.length === 0) {
        return 0
    }

    // Update each appointment to 'completed' status
    const updatePromises = toComplete.map(apt =>
        apt.id ? update(ref(db, `appointments/${apt.id}`), { status: 'completed' }) : null
    )

    await Promise.all(updatePromises.filter(Boolean))

    return toComplete.length
}
