import { Calendar, Scissors, X } from 'lucide-react'
import React from 'react'
import { statusConfig, AppointmentStatus } from '@/config/statusConfig'

interface BookingCardProps {
    title: string
    duration: string
    price: string
    date?: string
    time?: string
    status?: AppointmentStatus
    onCancel?: () => void
}

const BookingCard = ({
    title,
    duration,
    price,
    date = 'Luni, 4 Mar',
    time = '14:00',
    status = 'confirmed',
    onCancel,
}: BookingCardProps) => {
    const c = statusConfig[status] ?? statusConfig.confirmed

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_6px_24px_oklch(0_0_0_/_0.4)]"
        >
            {/* Top gold accent line */}
            <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                    background:
                        'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.8), oklch(0.92 0.12 85), oklch(0.84 0.18 80 / 0.8), transparent)',
                }}
            />

            <div className="px-4 pt-4 pb-3.5 flex flex-col gap-3">

                {/* ── Row 1: icon + title + status + time ── */}
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-[oklch(0.10_0_0)]"
                        style={{
                            background:
                                'linear-gradient(135deg, oklch(0.55 0.15 72), var(--color-gold-light))',
                            boxShadow: '0 3px 12px oklch(0.55 0.15 72 / 0.35)',
                        }}
                    >
                        <Scissors size={17} strokeWidth={2.2} />
                    </div>

                    {/* Title + badges row */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-[oklch(0.97_0_0)] truncate leading-snug">
                            {title}
                        </p>
                        <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                            {/* Status badge */}
                            <div
                                className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border"
                                style={{ background: c.bg, borderColor: c.border }}
                            >
                                <span
                                    className="inline-block shrink-0 w-1.5 h-1.5 rounded-full"
                                    style={{ background: c.dot, boxShadow: `0 0 5px ${c.dot}` }}
                                />
                                <span className="text-[11px] font-semibold tracking-[0.3px]" style={{ color: c.text }}>
                                    {c.label}
                                </span>
                            </div>

                            {/* Cancel badge — only for confirmed appointments */}
                            {status === 'confirmed' && onCancel && (
                                <button
                                    onClick={onCancel}
                                    className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border transition-opacity duration-150 hover:opacity-80 active:scale-95"
                                    style={{
                                        background: 'oklch(0.25 0.08 15 / 0.25)',
                                        borderColor: 'oklch(0.50 0.18 15 / 0.5)',
                                    }}
                                >
                                    <X size={10} style={{ color: 'oklch(0.72 0.16 15)', flexShrink: 0 }} strokeWidth={2.5} />
                                    <span
                                        className="text-[11px] font-semibold tracking-[0.3px]"
                                        style={{ color: 'oklch(0.72 0.16 15)' }}
                                    >
                                        Anulează
                                    </span>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Time */}
                    <span className="text-[18px] font-bold tracking-tight shrink-0 text-white/90 self-center">
                        {time}
                    </span>
                </div>

                {/* Divider */}
                <div
                    className="h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, oklch(0.35 0 0 / 0.7), transparent)' }}
                />

                {/* ── Row 2: date · price chips ── */}
                <div className="flex items-center gap-2">

                    {/* Date */}
                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                        <Calendar size={14} style={{ color: 'oklch(0.84 0.18 80)', flexShrink: 0 }} />
                        <span className="text-[14px] font-medium text-[oklch(0.85_0_0)] truncate">
                            {date}
                        </span>
                    </div>

                    {/* Price */}
                    <span
                        className="text-[15px] font-bold shrink-0"
                        style={{ color: 'oklch(0.82 0.14 80)' }}
                    >
                        {price}
                    </span>

                </div>
            </div>
        </div>
    )
}

export default BookingCard
