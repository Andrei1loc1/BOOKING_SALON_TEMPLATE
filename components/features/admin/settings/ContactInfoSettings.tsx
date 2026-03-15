'use client'

import React from 'react'
import SettingsSection from './SettingsSection'
import SettingsRow from './SettingsRow'
import { SettingsInput } from './SettingsInput'
import type { Settings } from '@/types'

interface ContactInfoSettingsProps {
    form: Settings
    onChange: <K extends keyof Settings>(key: K, value: Settings[K]) => void
}

export const ContactInfoSettings: React.FC<ContactInfoSettingsProps> = ({ form, onChange }) => {
    return (
        <SettingsSection title="Informații de contact">
            <SettingsRow label="Telefon" hint="Număr de telefon">
                <SettingsInput
                    value={form.phone || ''}
                    onChange={v => onChange('phone', v)}
                    placeholder="+40 7xx xxx xxx"
                />
            </SettingsRow>
            <SettingsRow label="Email" hint="Adresa de email">
                <SettingsInput
                    value={form.email || ''}
                    onChange={v => onChange('email', v)}
                    placeholder="contact@salon.ro"
                />
            </SettingsRow>
            <SettingsRow label="Adresă" hint="Locația salonului" divider={false}>
                <SettingsInput
                    value={form.address || ''}
                    onChange={v => onChange('address', v)}
                    placeholder="Strada, Nr., Oraș"
                />
            </SettingsRow>
        </SettingsSection>
    )
}
