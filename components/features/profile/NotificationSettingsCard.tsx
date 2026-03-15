'use client'

import React, { useState } from 'react'
import { Bell, Clock, CheckCircle2, Megaphone, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlowCard } from '@/components/ui/glow-card'
import { useUserSettings } from '@/hooks/useUserSettings'
import { cn } from '@/lib/utils'

interface NotificationSettingsCardProps {
    className?: string
}

export function NotificationSettingsCard({ className }: NotificationSettingsCardProps) {
    const {
        notificationSettings,
        isLoading,
        isSaving,
        hasPermission,
        updateSettings,
        requestPermission,
        revokePermission
    } = useUserSettings()

    const [localSettings, setLocalSettings] = useState(notificationSettings)
    const [showSaved, setShowSaved] = useState(false)

    React.useEffect(() => {
        setLocalSettings(notificationSettings)
    }, [notificationSettings])

    const handleToggle = async (key: keyof typeof notificationSettings, value: boolean) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }))

        // If disabling push, also revoke permission
        if (key === 'pushEnabled' && !value) {
            await revokePermission()
        }

        // If enabling push, request permission
        if (key === 'pushEnabled' && value && !hasPermission) {
            const granted = await requestPermission()
            if (!granted) {
                setLocalSettings(prev => ({ ...prev, pushEnabled: false }))
                return
            }
        }

        await updateSettings({ [key]: value })
        showSavedMessage()
    }

    const showSavedMessage = () => {
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 2000)
    }

    if (isLoading) {
        return (
            <GlowCard className={cn("!mx-0 !mt-0 -mt-2 px-5 !rounded-3xl", className)}>
                <div className="py-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Se încarcă...</span>
                </div>
            </GlowCard>
        )
    }

    return (
        <div className={className}>
            <GlowCard className="!mx-0 !mt-0 -mt-2 px-5 !rounded-3xl">
                <div className="py-1">
                    {/* Push Notifications Toggle */}
                    <SettingToggle
                        id="toggle-push"
                        icon={Bell}
                        label="Notificări push"
                        description={hasPermission ? "Active - vei primi alerte pe dispozitiv" : "Inactive - solicită permisiunea"}
                        checked={localSettings.pushEnabled}
                        onChange={(v) => handleToggle('pushEnabled', v)}
                        isEnabled={!hasPermission ? undefined : true}
                    />

                    {/* Reminders Toggle */}
                    <SettingToggle
                        id="toggle-reminders"
                        icon={Clock}
                        label="Reminder-uri"
                        description="Memento cu 24h înainte de vizită"
                        checked={localSettings.remindersEnabled}
                        onChange={(v) => handleToggle('remindersEnabled', v)}
                        disabled={!localSettings.pushEnabled}
                    />

                    {/* Booking Confirmation Toggle */}
                    <SettingToggle
                        id="toggle-confirmation"
                        icon={CheckCircle2}
                        label="Confirmare programări"
                        description="Notificare când programarea e confirmată"
                        checked={localSettings.bookingConfirmation}
                        onChange={(v) => handleToggle('bookingConfirmation', v)}
                        disabled={!localSettings.pushEnabled}
                    />

                    {/* Marketing Notifications Toggle */}
                    <SettingToggle
                        id="toggle-marketing"
                        icon={Megaphone}
                        label="Oferte și promoții"
                        description="Newsletter și oferte speciale"
                        checked={localSettings.marketingNotifications}
                        onChange={(v) => handleToggle('marketingNotifications', v)}
                        disabled={!localSettings.pushEnabled}
                    />
                </div>

                {/* Saved Message */}
                {showSaved && (
                    <div className="py-2 text-center">
                        <span className="text-xs text-green-500">Setări salvate!</span>
                    </div>
                )}
            </GlowCard>

            {/* Saving Indicator */}
            {isSaving && (
                <div className="text-center py-2">
                    <span className="text-xs text-muted-foreground">Se salvează...</span>
                </div>
            )}
        </div>
    )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface SettingToggleProps {
    id: string
    icon: React.ElementType
    label: string
    description?: string
    checked: boolean
    onChange: (value: boolean) => void
    disabled?: boolean
    isEnabled?: boolean
}

function SettingToggle({
    id,
    icon: Icon,
    label,
    description,
    checked,
    onChange,
    disabled,
    isEnabled = true
}: SettingToggleProps) {
    return (
        <div className={`flex items-center justify-between py-3.5 border-b border-border last:border-0 ${disabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'oklch(0.20 0 0)' }}
                >
                    <Icon size={15} style={{ color: 'oklch(0.84 0.18 80)' }} />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
            </div>
            {/* Toggle */}
            <button
                id={id}
                role="switch"
                aria-checked={checked}
                aria-disabled={disabled}
                disabled={disabled}
                onClick={() => !disabled && onChange(!checked)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? 'bg-gold' : 'bg-secondary'
                    } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                style={checked && isEnabled ? { background: 'oklch(0.84 0.18 80)' } : {}}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'
                        }`}
                />
            </button>
        </div>
    )
}

export default NotificationSettingsCard
