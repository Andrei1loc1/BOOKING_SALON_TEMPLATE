'use client'

import { useEffect, useState, useCallback } from 'react'
import { useSettings } from './useSettings'
import { updateSettings } from '@/actions/admin-actions'
import type { Settings, DaySchedule } from '@/types'
import {
    DEFAULT_SETTINGS,
    DEFAULT_DAY_SCHEDULE,
    getDefaultSchedule,
    type DayKey
} from '@/config/settingsConfig'

export function useSettingsForm() {
    const { settings, loading } = useSettings()

    const [form, setForm] = useState<Settings>(DEFAULT_SETTINGS)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [selectedDay, setSelectedDay] = useState<DayKey>('monday')

    // Initialize form with settings from database
    useEffect(() => {
        if (settings) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            // Migrate old format to new format if needed
            if (!('sameForAll' in settings.schedule)) {
                const oldSchedule = settings.schedule as { start: number; end: number }
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setForm({
                    ...DEFAULT_SETTINGS,
                    ...settings,
                    schedule: {
                        sameForAll: true,
                        default: { start: oldSchedule.start, end: oldSchedule.end },
                        monday: { ...DEFAULT_DAY_SCHEDULE, start: oldSchedule.start, end: oldSchedule.end },
                        tuesday: { ...DEFAULT_DAY_SCHEDULE, start: oldSchedule.start, end: oldSchedule.end },
                        wednesday: { ...DEFAULT_DAY_SCHEDULE, start: oldSchedule.start, end: oldSchedule.end },
                        thursday: { ...DEFAULT_DAY_SCHEDULE, start: oldSchedule.start, end: oldSchedule.end },
                        friday: { ...DEFAULT_DAY_SCHEDULE, start: oldSchedule.start, end: oldSchedule.end },
                        saturday: { ...DEFAULT_DAY_SCHEDULE, start: 10, end: 16 },
                        sunday: { ...DEFAULT_DAY_SCHEDULE, enabled: false },
                    },
                })
            } else {
                // Merge with defaults to ensure all new fields exist
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setForm({
                    ...DEFAULT_SETTINGS,
                    ...settings,
                })
            }
        }
    }, [settings])

    // Generic setter for any settings field
    const set = useCallback(<K extends keyof Settings>(key: K, value: Settings[K]) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }, [])

    // Get current day schedule based on selection
    const getCurrentDaySchedule = useCallback((): DaySchedule => {
        if (form.schedule.sameForAll) {
            return { ...form.schedule.default, enabled: true }
        }
        return form.schedule[selectedDay] || { ...DEFAULT_DAY_SCHEDULE }
    }, [form.schedule, selectedDay])

    // Set current day schedule
    const setCurrentDaySchedule = useCallback((key: keyof DaySchedule, value: number | boolean) => {
        if (form.schedule.sameForAll) {
            setForm(prev => ({
                ...prev,
                schedule: {
                    ...prev.schedule,
                    default: { ...prev.schedule.default, [key]: value },
                },
            }))
        } else {
            setForm(prev => ({
                ...prev,
                schedule: {
                    ...prev.schedule,
                    [selectedDay]: { ...(prev.schedule[selectedDay] || DEFAULT_DAY_SCHEDULE), [key]: value },
                },
            }))
        }
    }, [form.schedule.sameForAll, selectedDay])

    // Toggle same for all schedule
    const handleSameForAllChange = useCallback((checked: boolean) => {
        setForm(prev => ({
            ...prev,
            schedule: { ...prev.schedule, sameForAll: checked },
        }))
    }, [])

    // Save settings to database
    const handleSave = useCallback(async () => {
        setSaving(true)
        await updateSettings(form)
        setSaving(false)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }, [form])

    // Get current schedule for display
    const currentSchedule = getCurrentDaySchedule()

    return {
        // State
        form,
        loading,
        saving,
        saved,
        selectedDay,
        currentSchedule,

        // Setters
        set,
        setSelectedDay,
        setCurrentDaySchedule,
        handleSameForAllChange,
        handleSave,
    }
}
