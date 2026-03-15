import React from 'react'
import { ChevronLeft } from 'lucide-react'
import { BOOKING_TITLES, BOOKING_STYLES, TOTAL_STEPS } from '@/config/bookingConfig'

interface BookingHeaderProps {
    step: number
    onBack: () => void
}

export default function BookingHeader({ step, onBack }: BookingHeaderProps) {
    return (
        <div className="flex items-center justify-center relative px-6 pt-6">
            {step > 1 && (
                <button
                    onClick={onBack}
                    className="absolute left-6 p-1 text-[oklch(0.65_0_0)] hover:text-[oklch(0.92_0.12_85)] transition-colors"
                >
                    <ChevronLeft size={22} />
                </button>
            )}
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gold-gradient">
                    {BOOKING_TITLES[step - 1]}
                </h1>
                <p className="text-xs text-[oklch(0.50_0_0)] mt-0.5">
                    Pasul {step} din {TOTAL_STEPS}
                </p>
            </div>
        </div>
    )
}
