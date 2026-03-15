import React from 'react'
import { BOOKING_STYLES, TOTAL_STEPS } from '@/config/bookingConfig'

interface BookingProgressBarProps {
    step: number
}

export default function BookingProgressBar({ step }: BookingProgressBarProps) {
    return (
        <div className="px-5">
            <div className="w-full h-[3px] mt-4 mb-6 rounded-full overflow-hidden" style={BOOKING_STYLES.progressBarTrack}>
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${(step / TOTAL_STEPS) * 100}%`,
                        ...BOOKING_STYLES.progressBarFill,
                    }}
                />
            </div>
        </div>
    )
}
