export type AppointmentStatus = 'confirmed' | 'cancelled' | 'completed'

export const statusConfig: Record<AppointmentStatus, {
    label: string
    bg: string
    border: string
    dot: string
    text: string
}> = {
    confirmed: {
        label: 'Confirmat',
        bg: 'oklch(0.30 0.08 145 / 0.25)',
        border: 'oklch(0.55 0.15 145 / 0.5)',
        dot: 'oklch(0.65 0.18 145)',
        text: 'oklch(0.75 0.14 145)',
    },
    completed: {
        label: 'Finalizat',
        bg: 'oklch(0.22 0 0 / 0.4)',
        border: 'oklch(0.45 0 0 / 0.4)',
        dot: 'oklch(0.60 0 0)',
        text: 'oklch(0.70 0 0)',
    },
    cancelled: {
        label: 'Anulat',
        bg: 'oklch(0.25 0.08 15 / 0.25)',
        border: 'oklch(0.50 0.18 15 / 0.5)',
        dot: 'oklch(0.60 0.20 15)',
        text: 'oklch(0.72 0.16 15)',
    },
}
