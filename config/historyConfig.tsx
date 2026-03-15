import React from 'react'
import { LayoutList, CheckCircle2, XCircle, Clock } from 'lucide-react'

export type FilterTab = 'all' | 'confirmed' | 'completed' | 'cancelled'

export const HISTORY_TABS: { id: FilterTab; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'Toate', icon: <LayoutList size={13} /> },
    { id: 'confirmed', label: 'Active', icon: <Clock size={13} /> },
    { id: 'completed', label: 'Finalizate', icon: <CheckCircle2 size={13} /> },
    { id: 'cancelled', label: 'Anulate', icon: <XCircle size={13} /> },
]

export const HISTORY_STYLES = {
    iconContainer: {
        background: 'linear-gradient(to bottom right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
        boxShadow: '0 3px 14px oklch(0.55 0.15 72 / 0.40)',
    },
    ambientGlow: {
        background: 'radial-gradient(circle, oklch(0.84 0.18 80 / 0.07) 0%, transparent 70%)',
    },

    tabContainer: {
        background: 'oklch(0.13 0 0)',
        border: '1px solid oklch(0.84 0.18 80 / 0.08)',
    },
    tabActive: {
        background: 'linear-gradient(to bottom right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
        color: 'oklch(0.10 0 0)',
        boxShadow: '0 2px 10px oklch(0.55 0.15 72 / 0.35)',
    },
    tabInactive: {
        color: 'oklch(0.45 0 0)',
    },
    emptyContainer: {
        background: 'oklch(0.13 0 0)',
        border: '1px solid oklch(0.84 0.18 80 / 0.08)',
    },
    emptyIcon: {
        background: 'oklch(0.18 0.02 75)',
        border: '1px solid oklch(0.55 0.15 72 / 0.25)',
    },
} as const

export const EMPTY_STATE_MESSAGES: Record<FilterTab, string> = {
    all: 'Nu ai nicio programare.',
    confirmed: 'Nu ai programări active.',
    completed: 'Nu ai programări finalizate.',
    cancelled: 'Nu ai programări anulate.',
}

