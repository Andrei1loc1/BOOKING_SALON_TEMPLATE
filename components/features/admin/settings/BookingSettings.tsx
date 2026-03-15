'use client'

import React from 'react'
import SettingsSection from './SettingsSection'
import SettingsRow from './SettingsRow'
import { SettingsInput } from './SettingsInput'
import type { Settings } from '@/types'

interface BookingSettingsProps {
    form: Settings
    onChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const BookingSettings: React.FC<BookingSettingsProps> = ({ form, onChange }) => {
    return (
        <SettingsSection title="Setări rezervări">
            <SettingsRow label="Rezervare minimă" hint="Cu cât timp înainte (ore)">
                <SettingsInput
                    type="number"
                    value={form.minAdvanceHours || 2}
                    onChange={v => onChange('minAdvanceHours', Number(v))}
                    placeholder="2"
                />
            </SettingsRow>
            <SettingsRow label="Rezervare maximă" hint="Cu cât timp înainte (zile)">
                <SettingsInput
                    type="number"
                    value={form.maxAdvanceDays || 30}
                    onChange={v => onChange('maxAdvanceDays', Number(v))}
                    placeholder="30"
                />
            </SettingsRow>
            <SettingsRow label="Anulare permisă" hint="Cu cât timp înainte (ore)">
                <SettingsInput
                    type="number"
                    value={form.cancellationHours || 24}
                    onChange={v => onChange('cancellationHours', Number(v))}
                    placeholder="24"
                />
            </SettingsRow>
            <SettingsRow label="Pauză între programări" hint="Timp de buffer (minute)" divider={false}>
                <SettingsInput
                    type="number"
                    value={form.bufferMinutes || 15}
                    onChange={v => onChange('bufferMinutes', Number(v))}
                    placeholder="15"
                />
            </SettingsRow>
        </SettingsSection>
    )
}
