export const BOOKING_TITLES = [
    'Alege Serviciul',
    'Alege Data și Ora',
    'Confirmă Programarea',
] as const

export const BOOKING_STYLES = {
    ambientGlowTopRight: {
        background: 'radial-gradient(circle, oklch(0.84 0.18 80 / 0.07) 0%, transparent 70%)',
    },
    ambientGlowBottomLeft: {
        background: 'radial-gradient(circle, oklch(0.55 0.15 72 / 0.05) 0%, transparent 70%)',
    },
    progressBarTrack: {
        background: 'oklch(0.22 0 0)',
    },
    progressBarFill: {
        background: 'linear-gradient(90deg, oklch(0.65 0.18 75), oklch(0.92 0.12 85))',
    },
    continueButton: {
        background: 'linear-gradient(to right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
        boxShadow: '0 4px 20px oklch(0.55 0.15 72 / 0.35)',
    },
} as const

export const TOTAL_STEPS = 3
