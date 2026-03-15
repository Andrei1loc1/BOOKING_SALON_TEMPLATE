'use client'

import React from 'react'
import SettingsSection from './SettingsSection'
import SettingsRow from './SettingsRow'
import { SettingsInput } from './SettingsInput'
import { Switch } from '@/components/ui/switch'
import type { Settings, DaySchedule } from '@/types'
import { DAYS, type DayKey } from '@/config/settingsConfig'

interface ScheduleSettingsProps {
    form: Settings
    selectedDay: DayKey
    currentSchedule: DaySchedule
    onDayChange: (day: DayKey) => void
    onScheduleChange: (key: keyof DaySchedule, value: number | boolean) => void
    onSameForAllChange: (checked: boolean) => void
}

export const ScheduleSettings: React.FC<ScheduleSettingsProps> = ({
    form,
    selectedDay,
    currentSchedule,
    onDayChange,
    onScheduleChange,
    onSameForAllChange,
}) => {
    return (
        <SettingsSection title="Program de lucru">
            {/* Day selector */}
            <SettingsRow label="Ziua" hint="Selectează ziua">
                <select
                    value={selectedDay}
                    onChange={e => onDayChange(e.target.value as DayKey)}
                    className="w-40 rounded-xl px-3 py-1.5 text-sm font-medium text-[oklch(0.90_0_0)] outline-none"
                    style={{ background: 'oklch(0.18 0 0)', border: '1px solid oklch(0.28 0 0)' }}
                >
                    {DAYS.map(day => (
                        <option key={day.key} value={day.key} style={{ background: 'oklch(0.14 0 0)' }}>
                            {day.label}
                        </option>
                    ))}
                </select>
            </SettingsRow>

            {/* Same for all toggle */}
            <SettingsRow label="Program identic" hint="Acelasi orar pentru toate zilele" divider={false}>
                <Switch
                    checked={form.schedule.sameForAll}
                    onCheckedChange={onSameForAllChange}
                />
            </SettingsRow>

            {/* Start time */}
            <SettingsRow label="Ora de început" hint="Prima oră disponibilă">
                <SettingsInput
                    type="number"
                    value={currentSchedule.start}
                    onChange={v => onScheduleChange('start', Number(v))}
                    placeholder="9"
                />
            </SettingsRow>

            {/* End time */}
            <SettingsRow label="Ora de sfârșit" hint="Ultima oră disponibilă" divider={false}>
                <SettingsInput
                    type="number"
                    value={currentSchedule.end}
                    onChange={v => onScheduleChange('end', Number(v))}
                    placeholder="18"
                />
            </SettingsRow>
        </SettingsSection>
    )
}
