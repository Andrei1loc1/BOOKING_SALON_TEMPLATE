'use client'

import React from 'react'
import SettingsSection from './SettingsSection'
import SettingsRow from './SettingsRow'
import { Switch } from '@/components/ui/switch'
import type { Settings } from '@/types'

interface NotificationSettingsProps {
    form: Settings
    onChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({ form, onChange }) => {
    return (
        <SettingsSection title="Notificări">
            <SettingsRow label="Email rezervări" hint="Notificări pentru rezervări noi">
                <Switch
                    checked={form.emailNotifications ?? true}
                    onCheckedChange={v => onChange('emailNotifications', v)}
                />
            </SettingsRow>
            <SettingsRow label="SMS rezervări" hint="Notificări SMS pentru rezervări" divider={false}>
                <Switch
                    checked={form.smsNotifications ?? false}
                    onCheckedChange={v => onChange('smsNotifications', v)}
                />
            </SettingsRow>
        </SettingsSection>
    )
}
