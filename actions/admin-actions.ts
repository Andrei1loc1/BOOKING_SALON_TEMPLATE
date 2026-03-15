import { ref, push, get, set, update, remove, query, orderByChild, equalTo } from 'firebase/database'
import { db } from '@/lib/firebase'
import type { Service, BlockedSlot, Offer, Settings, UserProfile } from '@/types'

export async function getServices(): Promise<Service[]> {
    const snap = await get(ref(db, 'services'))
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<Service, 'id'>),
    }))
}

export async function getActiveServices(): Promise<Service[]> {
    const services = await getServices()
    return services.filter(s => s.active)
}

export async function createService(data: Omit<Service, 'id'>): Promise<string> {
    const newRef = push(ref(db, 'services'))
    await set(newRef, data)
    return newRef.key!
}

export async function updateService(
    serviceId: string,
    data: Partial<Omit<Service, 'id'>>
): Promise<void> {
    await update(ref(db, `services/${serviceId}`), data)
}

export async function deleteService(serviceId: string): Promise<void> {
    await update(ref(db, `services/${serviceId}`), { active: false })
}

export async function createEmployee(data: {
    name: string
    phone: string
}): Promise<string> {
    const normalizedPhone = data.phone.replace(/\s|-/g, '')
    const q = query(ref(db, 'users'), orderByChild('phone'), equalTo(normalizedPhone))
    const snap = await get(q)

    if (snap.exists()) {
        throw new Error('Numărul de telefon există deja')
    }

    const newRef = push(ref(db, 'users'))
    const profile: UserProfile = {
        name: data.name,
        phone: normalizedPhone,
        role: 'employee',
        status: 'active',
        created_at: new Date().toISOString(),
    }
    await set(newRef, profile)
    return newRef.key!
}

export async function updateAppointmentStatus(
    appointmentId: string,
    status: 'confirmed' | 'cancelled' | 'completed'
): Promise<void> {
    await update(ref(db, `appointments/${appointmentId}`), { status })
}

export async function deleteAppointment(appointmentId: string): Promise<void> {
    await remove(ref(db, `appointments/${appointmentId}`))
}

export async function getBlockedSlots(): Promise<BlockedSlot[]> {
    const snap = await get(ref(db, 'blocked_slots'))
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<BlockedSlot, 'id'>),
    }))
}

export async function getBlockedSlotsByDate(date: string): Promise<BlockedSlot[]> {
    const q = query(ref(db, 'blocked_slots'), orderByChild('date'), equalTo(date))
    const snap = await get(q)
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<BlockedSlot, 'id'>),
    }))
}

export async function createBlockedSlot(data: Omit<BlockedSlot, 'id'>): Promise<string> {
    const newRef = push(ref(db, 'blocked_slots'))
    await set(newRef, data)
    return newRef.key!
}

export async function deleteBlockedSlot(slotId: string): Promise<void> {
    await remove(ref(db, `blocked_slots/${slotId}`))
}

export async function getOffers(): Promise<Offer[]> {
    const snap = await get(ref(db, 'offers'))
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({
        id,
        ...(val as Omit<Offer, 'id'>),
    }))
}

export async function getActiveOffers(): Promise<Offer[]> {
    const now = new Date().toISOString()
    const offers = await getOffers()
    return offers.filter(o => o.active && o.valid_from <= now && o.valid_until >= now)
}

export async function createOffer(data: Omit<Offer, 'id' | 'created_at'>): Promise<string> {
    const newRef = push(ref(db, 'offers'))
    await set(newRef, { ...data, created_at: new Date().toISOString() })
    return newRef.key!
}

export async function updateOffer(
    offerId: string,
    data: Partial<Omit<Offer, 'id' | 'created_at'>>
): Promise<void> {
    await update(ref(db, `offers/${offerId}`), data)
}

export async function deleteOffer(offerId: string): Promise<void> {
    await remove(ref(db, `offers/${offerId}`))
}

export async function getSettings(): Promise<Settings | null> {
    const snap = await get(ref(db, 'settings'))
    return snap.exists() ? (snap.val() as Settings) : null
}

export async function updateSettings(data: Partial<Settings>): Promise<void> {
    await update(ref(db, 'settings'), data)
}

export async function getAllUsers() {
    const snap = await get(ref(db, 'users'))
    if (!snap.exists()) return []
    return Object.entries(snap.val()).map(([id, val]) => ({ id, ...(val as object) }))
}

export async function updateUserStatus(
    userId: string,
    status: 'active' | 'inactive'
): Promise<void> {
    await update(ref(db, `users/${userId}`), { status })
}

export async function updateUserRole(
    userId: string,
    role: 'admin' | 'client' | 'employee'
): Promise<void> {
    await update(ref(db, `users/${userId}`), { role })
}

export async function updateAppointmentDelay(
    appointmentId: string,
    delayMinutes: number
): Promise<void> {
    await update(ref(db, `appointments/${appointmentId}`), { delay_minutes: delayMinutes })
}
