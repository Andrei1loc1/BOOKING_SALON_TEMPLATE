import React from 'react'
import { BOOKING_STYLES } from '@/config/bookingConfig'

interface ContinueButtonProps {
    onClick: () => void
}

export default function ContinueButton({ onClick }: ContinueButtonProps) {
    return (
        <div className="px-5 pb-8">
            <button
                onClick={onClick}
                className="w-full py-4 rounded-[16px] font-bold text-sm text-[oklch(0.10_0_0)] active:scale-[0.98] transition-all duration-150"
                style={BOOKING_STYLES.continueButton}
            >
                Continuă →
            </button>
        </div>
    )
}
