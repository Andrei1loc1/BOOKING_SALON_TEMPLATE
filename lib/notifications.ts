import {
    getToken,
    onMessage,
    Messaging
} from 'firebase/messaging'
import {
    ref,
    set,
    get,
    update,
    remove
} from 'firebase/database'
import { db } from './firebase'
import type { UserNotificationSettings } from '@/types'

// Import messaging dynamically to avoid SSR issues
let messaging: Messaging | null = null

/**
 * Initialize Firebase Messaging (client-side only)
 */
export async function initializeMessaging(): Promise<Messaging | null> {
    if (typeof window === 'undefined') return null

    if (!messaging) {
        try {
            const { getMessaging } = await import('firebase/messaging')
            const { getApp } = await import('firebase/app')
            const app = getApp()
            messaging = getMessaging(app)
        } catch (error) {
            console.error('Failed to initialize messaging:', error)
            return null
        }
    }

    return messaging
}

/**
 * Request notification permission and get FCM token
 */
export async function requestNotificationPermission(uid: string): Promise<string | null> {
    if (typeof window === 'undefined') return null

    try {
        const permission = await Notification.requestPermission()

        if (permission !== 'granted') {
            console.log('Notification permission denied')
            return null
        }

        const msg = await initializeMessaging()
        if (!msg) return null

        const token = await getToken(msg, {
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
        })

        if (token) {
            // Save token to user profile in database
            await set(ref(db, `users/${uid}/fcmToken`), token)
            console.log('FCM token saved successfully')
            return token
        }

        return null
    } catch (error) {
        console.error('Error getting notification permission:', error)
        return null
    }
}

/**
 * Revoke notification permission and remove FCM token
 */
export async function revokeNotificationPermission(uid: string): Promise<void> {
    try {
        await remove(ref(db, `users/${uid}/fcmToken`))
    } catch (error) {
        console.error('Error revoking notification permission:', error)
    }
}

/**
 * Get FCM token for a user
 */
export async function getUserFCMToken(uid: string): Promise<string | null> {
    try {
        const snapshot = await get(ref(db, `users/${uid}/fcmToken`))
        return snapshot.exists() ? snapshot.val() : null
    } catch (error) {
        console.error('Error getting FCM token:', error)
        return null
    }
}

/**
 * Save user notification settings to database
 */
export async function saveNotificationSettings(
    uid: string,
    settings: UserNotificationSettings
): Promise<void> {
    try {
        await update(ref(db, `users/${uid}`), {
            notificationSettings: settings
        })
    } catch (error) {
        console.error('Error saving notification settings:', error)
        throw error
    }
}

/**
 * Get user notification settings from database
 */
export async function getNotificationSettings(
    uid: string
): Promise<UserNotificationSettings | null> {
    try {
        const snapshot = await get(ref(db, `users/${uid}/notificationSettings`))
        return snapshot.exists() ? snapshot.val() : null
    } catch (error) {
        console.error('Error getting notification settings:', error)
        return null
    }
}

/**
 * Get default notification settings
 */
export function getDefaultNotificationSettings(): UserNotificationSettings {
    return {
        pushEnabled: true,
        remindersEnabled: true,
        reminderHoursBefore: 24,
        bookingConfirmation: true,
        marketingNotifications: false
    }
}

/**
 * Setup foreground message listener
 */
export function onForegroundMessage(
    callback: (payload: unknown) => void
): () => void {
    if (typeof window === 'undefined') return () => { }

    initializeMessaging().then(msg => {
        if (msg) {
            onMessage(msg, callback)
        }
    })

    return () => { }
}

// Notification types for the system
export type NotificationType =
    | 'appointment_reminder'
    | 'appointment_confirmation'
    | 'appointment_cancelled'
    | 'appointment_completed'
    | 'marketing'

export interface NotificationPayload {
    type: NotificationType
    title: string
    body: string
    data?: Record<string, string>
}

/**
 * Create notification payload for appointment reminder
 */
export function createReminderPayload(
    appointmentDate: string,
    serviceName: string,
    barberName?: string
): NotificationPayload {
    const date = new Date(appointmentDate)
    const formattedDate = date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    })

    return {
        type: 'appointment_reminder',
        title: '⏰ Reminder Programare',
        body: `Ai o programare maine pentru ${serviceName}${barberName ? ` cu ${barberName}` : ''} la ${formattedDate}`,
        data: {
            type: 'appointment_reminder',
            appointmentDate
        }
    }
}

/**
 * Create notification payload for booking confirmation
 */
export function createConfirmationPayload(
    appointmentDate: string,
    serviceName: string
): NotificationPayload {
    const date = new Date(appointmentDate)
    const formattedDate = date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit'
    })

    return {
        type: 'appointment_confirmation',
        title: '✅ Programare Confirmată',
        body: `Programarea ta pentru ${serviceName} a fost confirmată pentru ${formattedDate}`,
        data: {
            type: 'appointment_confirmation',
            appointmentDate
        }
    }
}
