'use server'

import {
    ref,
    get,
    update
} from 'firebase/database'
import { db } from '@/lib/firebase'
import type { UserNotificationSettings, UserProfile } from '@/types'

/**
 * Get user notification settings from database
 */
export async function getUserNotificationSettings(
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
 * Save user notification settings to database
 */
export async function saveUserNotificationSettings(
    uid: string,
    settings: UserNotificationSettings
): Promise<{ success: boolean; error?: string }> {
    try {
        await update(ref(db, `users/${uid}`), {
            notificationSettings: settings,
            updated_at: new Date().toISOString()
        })
        return { success: true }
    } catch (error) {
        console.error('Error saving notification settings:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

/**
 * Get user profile by UID
 */
export async function getUserProfileData(
    uid: string
): Promise<UserProfile | null> {
    try {
        const snapshot = await get(ref(db, `users/${uid}`))
        return snapshot.exists() ? (snapshot.val() as UserProfile) : null
    } catch (error) {
        console.error('Error getting user profile:', error)
        return null
    }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
    uid: string,
    data: Partial<UserProfile>
): Promise<{ success: boolean; error?: string }> {
    try {
        await update(ref(db, `users/${uid}`), {
            ...data,
            updated_at: new Date().toISOString()
        })
        return { success: true }
    } catch (error) {
        console.error('Error updating user profile:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}
