'use client'

import React, { useState } from 'react'
import { Clock, Plus, Minus, AlertCircle } from 'lucide-react'
import { statusConfig } from '@/config/statusConfig'
import { updateAppointmentDelay } from '@/actions/admin-actions'
import type { AdminAppointment } from '@/types/admin'

interface TodayScheduleProps {
    appointments: AdminAppointment[]
    loading: boolean
    onUpdate?: () => void
}

const TodaySchedule = ({ appointments, loading, onUpdate }: TodayScheduleProps) => {
    const [updatingId, setUpdatingId] = useState<string | null>(null)

    const handleDelayChange = async (appointmentId: string, currentDelay: number | undefined, delta: number) => {
        const newDelay = Math.max(0, (currentDelay || 0) + delta)
        setUpdatingId(appointmentId)
        try {
            await updateAppointmentDelay(appointmentId, newDelay)
            onUpdate?.()
        } finally {
            setUpdatingId(null)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-2 px-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[68px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                ))}
            </div>
        )
    }

    if (appointments.length === 0) {
        return (
            <div className="mx-4 rounded-2xl border border-[oklch(0.84_0.18_80_/_0.10)] bg-[oklch(0.15_0_0)] p-6 flex flex-col items-center gap-2">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                        background: 'oklch(0.18 0.02 75)',
                        border: '1px solid oklch(0.55 0.15 72 / 0.25)',
                    }}
                >
                    <Clock size={18} color="oklch(0.55 0.15 72)" />
                </div>
                <p className="text-sm text-[oklch(0.40_0_0)]">Nicio programare azi</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-2 px-4">
            {appointments.map(appt => {
                const c = statusConfig[appt.status]
                return (
                    <div
                        key={appt.id}
                        className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)] px-4 py-3 flex items-center gap-4"
                    >
                        {/* top accent */}
                        <div
                            className="absolute top-0 left-0 right-0 h-[1.5px]"
                            style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.45), transparent)' }}
                        />

                        {/* time */}
                        <div className="flex flex-col items-center min-w-[42px]">
                            <span
                                className="text-base font-bold"
                                style={{ color: 'oklch(0.84 0.18 80)' }}
                            >
                                {appt.time}
                            </span>
                        </div>

                        {/* divider */}
                        <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, oklch(0.35 0 0 / 0.7), transparent)' }} />

                        {/* info */}
                        <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-semibold text-[oklch(0.97_0_0)] truncate leading-snug">
                                {appt.userName}
                            </p>
                            <p className="text-xs text-[oklch(0.50_0_0)] truncate mt-0.5">
                                {appt.serviceName} · {appt.serviceDuration} min
                                {(appt as any).delay_minutes > 0 && (
                                    <span className="text-orange-400 ml-1">
                                        +{(appt as any).delay_minutes}min
                                    </span>
                                )}
                            </p>
                        </div>

                        {/* delay controls */}
                        {appt.id && appt.status === 'confirmed' && (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => handleDelayChange(appt.id!, (appt as any).delay_minutes, -5)}
                                    disabled={updatingId === appt.id || !((appt as any).delay_minutes > 0)}
                                    className="w-6 h-6 rounded-md bg-[oklch(0.2_0_0)] border border-[oklch(0.3_0_0)] flex items-center justify-center hover:bg-[oklch(0.25_0_0)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus size={12} className="text-[oklch(0.70_0_0)]" />
                                </button>
                                <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${((appt as any).delay_minutes || 0) > 0 ? 'bg-orange-500/20 border border-orange-500/30' : 'bg-[oklch(0.2_0_0)] border border-[oklch(0.3_0_0)]'}`}>
                                    {((appt as any).delay_minutes || 0) > 0 && (
                                        <AlertCircle size={10} className="text-orange-400" />
                                    )}
                                    <span className={`text-xs font-semibold ${((appt as any).delay_minutes || 0) > 0 ? 'text-orange-400' : 'text-[oklch(0.50_0_0)]'}`}>
                                        {((appt as any).delay_minutes || 0)}m
                                    </span>
                                </div>
                                <button
                                    onClick={() => handleDelayChange(appt.id!, (appt as any).delay_minutes, 5)}
                                    disabled={updatingId === appt.id}
                                    className="w-6 h-6 rounded-md bg-[oklch(0.2_0_0)] border border-[oklch(0.3_0_0)] flex items-center justify-center hover:bg-[oklch(0.25_0_0)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus size={12} className="text-[oklch(0.70_0_0)]" />
                                </button>
                            </div>
                        )}

                        {/* status badge */}
                        <div
                            className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border shrink-0"
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
                    </div>
                )
            })}
        </div>
    )
}

export default TodaySchedule
