'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'
import { isSlotAvailable } from '@/actions/booking-actions'
import { getSettings } from '@/actions/admin-actions'
import { toDateKey, generateTimeSlots } from '@/lib/date-utils'

import type { Service } from '@/types'

interface StepTwoProps {
    service: Service
    selectedDate: Date | null
    selectedTime: string | null
    onDateSelect: (d: Date) => void
    onTimeSelect: (t: string) => void
}

export default function StepTwo({
    service,
    selectedDate,
    selectedTime,
    onDateSelect,
    onTimeSelect,
}: StepTwoProps) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const [slots, setSlots] = useState<string[]>([])
    const [availability, setAvailability] = useState<Record<string, boolean>>({})
    const [checkingSlots, setCheckingSlots] = useState(false)
    const [scheduleStart, setScheduleStart] = useState(9)
    const [scheduleEnd, setScheduleEnd] = useState(18)

    useEffect(() => {
        getSettings().then((s) => {
            if (s?.schedule) {
                setScheduleStart(s.schedule.start)
                setScheduleEnd(s.schedule.end)
            }
        })
    }, [])

    const checkAvailability = useCallback(
        async (date: Date) => {
            const dateKey = toDateKey(date)
            const rawSlots = generateTimeSlots(scheduleStart, scheduleEnd)
            setSlots(rawSlots)
            setCheckingSlots(true)
            setAvailability({})

            const results = await Promise.all(
                rawSlots.map(async (t) => {
                    const ok = await isSlotAvailable(dateKey, t, service.duration)
                    return [t, ok] as [string, boolean]
                })
            )
            setAvailability(Object.fromEntries(results))
            setCheckingSlots(false)
        },
        [service.duration, scheduleStart, scheduleEnd]
    )

    useEffect(() => {
        if (selectedDate) checkAvailability(selectedDate)
    }, [selectedDate, checkAvailability])

    return (
        <div className="px-5 pb-6">
            {/* shadcn Calendar – styled via globals */}
            <Calendar
                mode="single"
                selected={selectedDate ?? undefined}
                onSelect={(d) => d && onDateSelect(d)}
                disabled={(d) => {
                    const day = new Date(d)
                    day.setHours(0, 0, 0, 0)
                    return day < today
                }}
                className="rounded-[16px] w-full"
            />

            <Separator className="my-5 bg-[oklch(0.22_0_0)]" />

            {/* Time slots */}
            <p className="text-sm font-semibold text-[oklch(0.85_0_0)] text-center mb-4">
                Ore Disponibile
            </p>

            {!selectedDate ? (
                <p className="text-xs text-[oklch(0.45_0_0)] text-center py-2">
                    Selectează o dată mai întâi.
                </p>
            ) : checkingSlots ? (
                <div className="flex items-center justify-center gap-2 py-4 text-[oklch(0.50_0_0)]">
                    <Loader2 size={16} className="animate-spin" />
                    <span className="text-xs">Se verifică programul…</span>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-2">
                    {slots.map((t) => {
                        const available = availability[t] ?? false
                        const isChosen = selectedTime === t
                        return (
                            <button
                                key={t}
                                disabled={!available}
                                onClick={() => onTimeSelect(t)}
                                className="py-[10px] rounded-[12px] text-sm font-semibold transition-all duration-150 active:scale-95"
                                style={
                                    isChosen
                                        ? {
                                            background: 'oklch(0.18 0.03 75)',
                                            border: '1px solid oklch(0.60 0.14 72 / 0.6)',
                                            color: 'oklch(0.88 0.10 80)',
                                        }
                                        : available
                                            ? {
                                                background: 'oklch(0.16 0 0)',
                                                border: '1px solid oklch(0.28 0 0)',
                                                color: 'oklch(0.85 0 0)',
                                            }
                                            : {
                                                background: 'oklch(0.12 0 0)',
                                                border: '1px solid oklch(0.18 0 0)',
                                                color: 'oklch(0.35 0 0)',
                                                cursor: 'not-allowed',
                                                textDecoration: 'line-through',
                                            }
                                }
                            >
                                {t}
                            </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
