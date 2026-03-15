import type { DaySchedule, Settings } from '@/types'

// ─── Day Types ─────────────────────────────────────────────────────────────────────
export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export const DAYS: { key: DayKey; label: string }[] = [
    { key: 'monday', label: 'Luni' },
    { key: 'tuesday', label: 'Marți' },
    { key: 'wednesday', label: 'Miercuri' },
    { key: 'thursday', label: 'Joi' },
    { key: 'friday', label: 'Vineri' },
    { key: 'saturday', label: 'Sâmbătă' },
    { key: 'sunday', label: 'Duminică' },
]

// ─── Default Schedule ───────────────────────────────────────────────────────────
export const DEFAULT_DAY_SCHEDULE: DaySchedule = { start: 9, end: 18, enabled: true }

export const getDefaultSchedule = (): Settings['schedule'] => ({
    sameForAll: true,
    default: { start: 9, end: 18 },
    monday: { ...DEFAULT_DAY_SCHEDULE },
    tuesday: { ...DEFAULT_DAY_SCHEDULE },
    wednesday: { ...DEFAULT_DAY_SCHEDULE },
    thursday: { ...DEFAULT_DAY_SCHEDULE },
    friday: { ...DEFAULT_DAY_SCHEDULE },
    saturday: { ...DEFAULT_DAY_SCHEDULE, start: 10, end: 16 },
    sunday: { ...DEFAULT_DAY_SCHEDULE, enabled: false },
})

// ─── Default Settings ───────────────────────────────────────────────────────────
export const DEFAULT_SETTINGS: Settings = {
    shopName: '',
    currency: 'RON',
    phone: '',
    email: '',
    address: '',
    minAdvanceHours: 2,
    maxAdvanceDays: 30,
    cancellationHours: 24,
    bufferMinutes: 15,
    emailNotifications: true,
    smsNotifications: false,
    schedule: getDefaultSchedule(),
}

// ─── Currency Options ───────────────────────────────────────────────────────────
export const CURRENCIES = ['RON', 'EUR', 'USD'] as const

// ─── Styles ─────────────────────────────────────────────────────────────────────
export const SETTINGS_STYLES = {
    input: {
        background: 'oklch(0.18 0 0)',
        border: '1px solid oklch(0.28 0 0)',
        focusBorder: '1px solid oklch(0.55 0.15 72 / 0.60)',
    },
    saveButton: {
        background: 'linear-gradient(to right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
        boxShadow: '0 6px_24px oklch(0.55 0.15 72 / 0.30)',
    },
    success: {
        border: 'oklch(0.55_0.15_145_/_0.45)',
        background: 'oklch(0.30_0.08_145_/_0.25)',
        dot: 'oklch(0.65_0.18_145)',
        text: 'oklch(0.75_0.14_145)',
    },
} as const
