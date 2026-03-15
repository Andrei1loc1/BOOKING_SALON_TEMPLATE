'use client'

import React, { useState } from 'react'
import { useAdminBookings } from '@/hooks/useAdminBookings'
import AdminCalendar from '@/components/features/admin/bookings/AdminCalendar'
import DayAppointmentsList from '@/components/features/admin/bookings/DayAppointmentsList'
import AddAppointmentModal, { AddAppointmentButton } from '@/components/features/admin/bookings/AddAppointmentModal'
import { Calendar } from 'lucide-react'

function toLocalDateStr(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

const AdminBookingsPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
    const [showAddModal, setShowAddModal] = useState(false)
    const { appointmentsByDate, getForDate, loading, changeStatus, refetch } = useAdminBookings()

    const dateStr = selectedDate ? toLocalDateStr(selectedDate) : null
    const dayAppointments = dateStr ? getForDate(dateStr) : []

    const today = new Date().toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <div className="flex flex-col gap-6 py-8 min-h-dvh bg-background pb-[90px]">

            {/* Header */}
            <div className="px-5 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[oklch(0.45_0_0)]">
                        Calendar
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-gold-gradient leading-tight">
                        Rezervări
                    </h1>
                </div>

                {/* Date badge */}
                <div
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold capitalize"
                    style={{
                        background: 'oklch(0.18 0.04 80 / 0.5)',
                        borderColor: 'oklch(0.84 0.18 80 / 0.20)',
                        color: 'oklch(0.75 0.12 80)',
                    }}
                >
                    <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ background: 'oklch(0.84 0.18 80)', boxShadow: '0 0 6px oklch(0.84 0.18 80 / 0.7)' }}
                    />
                    {today}
                </div>
            </div>

            {/* Calendar */}
            {loading ? (
                <div
                    className="mx-4 rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] animate-pulse"
                    style={{ height: 320 }}
                />
            ) : (
                <AdminCalendar
                    appointmentsByDate={appointmentsByDate}
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                />
            )}

            {/* Add Appointment Button */}
            <div className="px-4">
                <AddAppointmentButton onClick={() => setShowAddModal(true)} />
            </div>

            {/* Day appointments */}
            {selectedDate && (
                <DayAppointmentsList
                    date={selectedDate}
                    appointments={dayAppointments}
                    onStatusChange={changeStatus}
                />
            )}

            {/* Add Appointment Modal */}
            <AddAppointmentModal
                open={showAddModal}
                onOpenChange={setShowAddModal}
                selectedDate={selectedDate}
                onSuccess={refetch}
            />

        </div>
    )
}

export default AdminBookingsPage
