'use client'

import React, { useState } from 'react'
import { statusConfig } from '@/config/statusConfig'
import type { AdminAppointment } from '@/types/admin'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface RecentAppointmentsTableProps {
    appointments: AdminAppointment[]
    loading: boolean
    onStatusChange?: (id: string, status: AdminAppointment['status']) => void
}

const STATUS_OPTIONS: AdminAppointment['status'][] = ['confirmed', 'completed', 'cancelled']
const INITIAL_COUNT = 3

const RecentAppointmentsTable = ({ appointments, loading, onStatusChange }: RecentAppointmentsTableProps) => {
    const [showAll, setShowAll] = useState(false)

    const displayedAppointments = showAll
        ? appointments
        : appointments.slice(0, INITIAL_COUNT)

    const hasMore = appointments.length > INITIAL_COUNT

    if (loading) {
        return (
            <div className="flex flex-col gap-2 px-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[60px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                ))}
            </div>
        )
    }

    if (appointments.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-8 px-4">
                <p className="text-[oklch(0.50_0_0)] text-sm">Nu există programări recente</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 px-4">
            {displayedAppointments.map(appt => {
                const c = statusConfig[appt.status]
                const date = new Date(appt.date_time)
                const formattedDate = date.toLocaleDateString('ro-RO', { day: '2-digit', month: 'short' })

                return (
                    <div
                        key={appt.id}
                        className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)] px-4 py-3 flex items-center gap-3"
                    >
                        {/* top accent */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[1.5px]"
                            style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
                        />

                        {/* colored side dot */}
                        <div
                            className="w-1.5 h-8 rounded-full shrink-0"
                            style={{ background: c.dot, boxShadow: `0 0 8px ${c.dot}` }}
                        />

                        {/* info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-[oklch(0.97_0_0)] truncate leading-snug">
                                {appt.userName}
                            </p>
                            <p className="text-xs text-[oklch(0.50_0_0)] truncate mt-0.5">
                                {appt.serviceName}
                            </p>
                        </div>

                        {/* date + status */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                            <span className="text-[12px] font-medium text-[oklch(0.55_0_0)]">
                                {formattedDate} · {appt.time}
                            </span>
                            {onStatusChange ? (
                                <select
                                    value={appt.status}
                                    onChange={e => onStatusChange(appt.id!, e.target.value as AdminAppointment['status'])}
                                    className="text-[11px] font-semibold tracking-[0.3px] rounded-full px-[10px] py-[3px] outline-none cursor-pointer border"
                                    style={{
                                        background: c.bg,
                                        borderColor: c.border,
                                        color: c.text,
                                    }}
                                >
                                    {STATUS_OPTIONS.map(s => (
                                        <option
                                            key={s}
                                            value={s}
                                            style={{ background: 'oklch(0.14 0 0)', color: 'oklch(0.90 0 0)' }}
                                        >
                                            {statusConfig[s].label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span
                                    className="text-[10px] font-bold tracking-[0.3px] rounded-full px-[10px] py-[3px]"
                                    style={{ background: c.bg, borderColor: c.border, color: c.text }}
                                >
                                    {c.label}
                                </span>
                            )}
                        </div>
                    </div>
                )
            })}

            {/* Show more / Show less button */}
            {hasMore && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="flex items-center justify-center gap-2 py-3 mt-1 text-sm font-medium text-[oklch(0.55_0_0)] hover:text-[oklch(0.84_0.18_80)] transition-colors"
                >
                    {showAll ? (
                        <>
                            <ChevronUp className="w-4 h-4" />
                            Arată mai puține
                        </>
                    ) : (
                        <>
                            <ChevronDown className="w-4 h-4" />
                            Arată mai multe ({appointments.length - INITIAL_COUNT})
                        </>
                    )}
                </button>
            )}
        </div>
    )
}

export default RecentAppointmentsTable
