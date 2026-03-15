'use client'

import React from 'react'
import SettingsSection from './SettingsSection'
import SettingsRow from './SettingsRow'
import { SettingsInput } from './SettingsInput'
import { SettingsSelect } from './SettingsSelect'
import type { Settings } from '@/types'
import { CURRENCIES } from '@/config/settingsConfig'

interface SalonSettingsProps {
    form: Settings
    onChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const SalonSettings: React.FC<SalonSettingsProps> = ({ form, onChange }) => {
    return (
        <SettingsSection title="Salon">
            <SettingsRow label="Nume salon" hint="Afișat în aplicație">
                <SettingsInput
                    value={form.shopName}
                    onChange={v => onChange('shopName', v)}
                    placeholder="ex. Studio Andrei"
                />
            </SettingsRow>
            <SettingsRow label="Monedă" hint="Folosită la prețuri" divider={false}>
                <SettingsSelect
                    value={form.currency}
                    onChange={v => onChange('currency', v)}
                    options={CURRENCIES}
                />
            </SettingsRow>
        </SettingsSection>
    )
}
