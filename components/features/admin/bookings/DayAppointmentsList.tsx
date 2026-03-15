'use client'

import React from 'react'
import { CalendarDays } from 'lucide-react'
import { statusConfig } from '@/config/statusConfig'
import type { AdminAppointment } from '@/types/admin'

interface DayAppointmentsListProps {
    date: Date
    appointments: AdminAppointment[]
    onStatusChange: (id: string, status: AdminAppointment['status']) => void
}

const STATUS_OPTIONS: AdminAppointment['status'][] = ['confirmed', 'completed', 'cancelled']

const DayAppointmentsList = ({ date, appointments, onStatusChange }: DayAppointmentsListProps) => {
    const formattedDate = date.toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <div className="flex flex-col gap-3">
            {/* Day header */}
            <div className="px-4 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[oklch(0.45_0_0)]">
                        Programări
                    </span>
                    <span className="text-[15px] font-semibold text-[oklch(0.90_0_0)] capitalize">
                        {formattedDate}
                    </span>
                </div>
                <span
                    className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border text-[11px] font-semibold"
                    style={{
                        background: 'oklch(0.30 0.08 80 / 0.20)',
                        borderColor: 'oklch(0.84 0.18 80 / 0.4)',
                        color: 'oklch(0.84 0.18 80)',
                    }}
                >
                    {appointments.length} {appointments.length === 1 ? 'programare' : 'programări'}
                </span>
            </div>

            {/* Empty state */}
            {appointments.length === 0 ? (
                <div className="mx-4 rounded-2xl border border-[oklch(0.84_0.18_80_/_0.10)] bg-[oklch(0.15_0_0)] p-6 flex flex-col items-center gap-2">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{
                            background: 'oklch(0.18 0.02 75)',
                            border: '1px solid oklch(0.55 0.15 72 / 0.25)',
                        }}
                    >
                        <CalendarDays size={18} color="oklch(0.55 0.15 72)" />
                    </div>
                    <p className="text-sm text-[oklch(0.40_0_0)]">Nicio programare în această zi</p>
                </div>
            ) : (
                <div className="flex flex-col gap-2 px-4">
                    {appointments.map(appt => {
                        const c = statusConfig[appt.status]
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
                                        {appt.serviceName} · {appt.serviceDuration} min · {appt.servicePrice} lei
                                    </p>
                                </div>

                                {/* time + status dropdown */}
                                <div className="flex flex-col items-end gap-1.5 shrink-0">
                                    <span className="text-[18px] font-bold tracking-tight text-white/90">
                                        {appt.time}
                                    </span>
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
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default DayAppointmentsList
