'use client'

import React, { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminAppointment } from '@/types/admin'

interface AdminCalendarProps {
    appointmentsByDate: Map<string, AdminAppointment[]>
    selected: Date | undefined
    onSelect: (date: Date | undefined) => void
}

// Converts a Date to "YYYY-MM-DD" in local time
function toLocalDateStr(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

// Returns dot colors for a given day based on appointment statuses
function getDayDots(appointments: AdminAppointment[]): string[] {
    const colors: string[] = []

    // Check if there are any confirmed (non-completed, non-cancelled) bookings
    const hasConfirmed = appointments.some(a => a.status === 'confirmed')

    // Show green dot only if there are confirmed bookings
    // Don't show dot if all bookings are completed or cancelled
    if (hasConfirmed) {
        colors.push('oklch(0.65 0.18 145)') // green
    }

    return colors
}

const AdminCalendar = ({ appointmentsByDate, selected, onSelect }: AdminCalendarProps) => {
    const [month, setMonth] = useState<Date>(new Date())

    return (
        <div
            className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_6px_24px_oklch(0_0_0_/_0.4)] mx-4 p-4"
        >
            {/* top gold accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.6), transparent)' }}
            />

            <DayPicker
                mode="single"
                selected={selected}
                onSelect={onSelect}
                month={month}
                onMonthChange={setMonth}
                locale={undefined}
                weekStartsOn={1}
                showOutsideDays
                classNames={{
                    root: 'w-full',
                    months: 'w-full',
                    month: 'w-full flex flex-col gap-3',
                    nav: 'flex items-center justify-between w-full absolute top-0 inset-x-0',
                    button_previous: 'flex items-center justify-center w-8 h-8 rounded-full text-[oklch(0.55_0_0)] hover:text-[oklch(0.84_0.18_80)] hover:bg-[oklch(0.20_0_0)] transition-colors',
                    button_next: 'flex items-center justify-center w-8 h-8 rounded-full text-[oklch(0.55_0_0)] hover:text-[oklch(0.84_0.18_80)] hover:bg-[oklch(0.20_0_0)] transition-colors',
                    month_caption: 'flex items-center justify-center h-8 w-full',
                    caption_label: 'text-sm font-semibold text-[oklch(0.90_0_0)] capitalize',
                    table: 'w-full border-collapse',
                    weekdays: 'flex w-full mb-1',
                    weekday: 'flex-1 text-center text-[11px] font-medium text-[oklch(0.40_0_0)] uppercase tracking-wide select-none py-1',
                    week: 'flex w-full',
                    day: 'flex-1 aspect-square relative',
                    outside: 'opacity-30',
                    disabled: 'opacity-20 cursor-not-allowed',
                    hidden: 'invisible',
                    today: '',
                    selected: '',
                }}
                components={{
                    Chevron: ({ orientation }) =>
                        orientation === 'left'
                            ? <ChevronLeftIcon className="size-4" />
                            : <ChevronRightIcon className="size-4" />,
                    DayButton: ({ day, modifiers, ...btnProps }) => {
                        const dateStr = toLocalDateStr(day.date)
                        const appts = appointmentsByDate.get(dateStr) ?? []
                        const dots = getDayDots(appts)
                        const isSelected = !!modifiers.selected
                        const isToday = day.date.toDateString() === new Date().toDateString()
                        const hasAppts = appts.length > 0

                        return (
                            <button
                                {...btnProps}
                                className={cn(
                                    'relative w-full h-full flex flex-col items-center justify-center gap-[3px] rounded-full transition-all duration-150 select-none',
                                    'text-sm font-medium',
                                    !isSelected && 'text-[oklch(0.80_0_0)] hover:bg-[oklch(0.20_0_0)] hover:text-[oklch(0.95_0_0)]',
                                    modifiers.outside && 'text-[oklch(0.35_0_0)]',
                                )}
                                style={
                                    isSelected
                                        ? {
                                            background: 'linear-gradient(135deg, oklch(0.84 0.18 80 / 0.15), oklch(0.70 0.15 80 / 0.2))',
                                            border: '1px solid oklch(0.84 0.18 80 / 0.3)',
                                            color: 'oklch(0.90 0 0)',
                                            fontWeight: 600,
                                            boxShadow: 'none',
                                        }
                                        : isToday
                                            ? {
                                                background: 'oklch(0.18 0.02 72)',
                                                border: '1px solid oklch(0.55 0.15 72 / 0.45)',
                                                color: 'oklch(0.80 0.10 78)',
                                                fontWeight: 600,
                                            }
                                            : undefined
                                }
                            >
                                <span>{day.date.getDate()}</span>

                                {/* dots */}
                                {hasAppts && (
                                    <div className="flex items-center gap-[3px]">
                                        {dots.map((color, i) => (
                                            <span
                                                key={i}
                                                className="inline-block rounded-full"
                                                style={{
                                                    width: 4,
                                                    height: 4,
                                                    background: color,
                                                    boxShadow: `0 0 4px ${color}`,
                                                }}
                                            />
                                        ))}
                                    </div>
                                )}
                            </button>
                        )
                    },
                }}
            />

            {/* Legend */}
            <div className="mt-3 pt-3 border-t border-[oklch(0.22_0_0)] flex items-center gap-4 flex-wrap">
                {[
                    { color: 'oklch(0.65 0.18 145)', label: 'Confirmat' },
                    { color: 'oklch(0.60 0.20 15)', label: 'Anulat' },
                ].map(({ color, label }) => (
                    <div key={label} className="flex items-center gap-1.5">
                        <span
                            className="inline-block rounded-full"
                            style={{ width: 6, height: 6, background: color, boxShadow: `0 0 5px ${color}` }}
                        />
                        <span className="text-[11px] text-[oklch(0.40_0_0)]">{label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminCalendar
