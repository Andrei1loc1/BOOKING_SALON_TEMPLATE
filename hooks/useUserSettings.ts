'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'
import {
    requestNotificationPermission,
    revokeNotificationPermission,
    onForegroundMessage,
    getDefaultNotificationSettings
} from '@/lib/notifications'
import {
    saveUserNotificationSettings,
    getUserNotificationSettings
} from '@/actions/user-settings-actions'
import type { UserNotificationSettings } from '@/types'

interface UseUserSettingsReturn {
    notificationSettings: UserNotificationSettings
    isLoading: boolean
    isSaving: boolean
    error: string | null
    hasPermission: boolean
    updateSettings: (settings: Partial<UserNotificationSettings>) => Promise<void>
    requestPermission: () => Promise<boolean>
    revokePermission: () => Promise<void>
}

export function useUserSettings(): UseUserSettingsReturn {
    const { user } = useAuth()
    const [notificationSettings, setNotificationSettings] = useState<UserNotificationSettings>(
        getDefaultNotificationSettings()
    )
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [hasPermission, setHasPermission] = useState(false)

    // Load settings from database on mount
    useEffect(() => {
        async function loadSettings() {
            if (!user?.uid) {
                setIsLoading(false)
                return
            }

            try {
                const settings = await getUserNotificationSettings(user.uid)
                if (settings) {
                    setNotificationSettings(settings)
                }

                // Check if user has FCM token
                if ('serviceWorkerRegistration' in window) {
                    const permission = Notification.permission
                    setHasPermission(permission === 'granted')
                }
            } catch (err) {
                console.error('Error loading settings:', err)
                setError('Failed to load settings')
            } finally {
                setIsLoading(false)
            }
        }

        loadSettings()
    }, [user?.uid])

    // Listen for foreground messages
    useEffect(() => {
        const unsubscribe = onForegroundMessage((payload) => {
            console.log('Foreground message received:', payload)
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // Update notification settings
    const updateSettings = useCallback(async (
        newSettings: Partial<UserNotificationSettings>
    ) => {
        if (!user?.uid) return

        setIsSaving(true)
        setError(null)

        try {
            const updatedSettings = { ...notificationSettings, ...newSettings }

            const result = await saveUserNotificationSettings(user.uid, updatedSettings)

            if (result.success) {
                setNotificationSettings(updatedSettings)
            } else {
                setError(result.error || 'Failed to save settings')
            }
        } catch (err) {
            console.error('Error saving settings:', err)
            setError('Failed to save settings')
        } finally {
            setIsSaving(false)
        }
    }, [user?.uid, notificationSettings])

    // Request notification permission
    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (!user?.uid) return false

        try {
            const token = await requestNotificationPermission(user.uid)
            const granted = token !== null
            setHasPermission(granted)

            if (granted) {
                // Enable push notifications in settings
                await updateSettings({ pushEnabled: true })
            }

            return granted
        } catch (err) {
            console.error('Error requesting permission:', err)
            return false
        }
    }, [user?.uid, updateSettings])

    // Revoke notification permission
    const revokePermission = useCallback(async () => {
        if (!user?.uid) return

        try {
            await revokeNotificationPermission(user.uid)
            setHasPermission(false)

            // Disable push notifications in settings
            await updateSettings({ pushEnabled: false })
        } catch (err) {
            console.error('Error revoking permission:', err)
        }
    }, [user?.uid, updateSettings])

    return {
        notificationSettings,
        isLoading,
        isSaving,
        error,
        hasPermission,
        updateSettings,
        requestPermission,
        revokePermission
    }
}
