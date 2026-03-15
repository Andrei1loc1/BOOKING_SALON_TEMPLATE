'use client'

import React, { useState } from 'react'
import { useAdminDashboard } from '@/hooks/useAdminDashboard'
import { updateAppointmentStatus } from '@/actions/admin-actions'
import AdminStatsGrid from '@/components/features/admin/dashboard/AdminStatsGrid'
import TodaySchedule from '@/components/features/admin/dashboard/TodaySchedule'
import RecentAppointmentsTable from '@/components/features/admin/dashboard/RecentAppointmentsTable'
import DashboardServices from '@/components/features/admin/dashboard/DashboardServices'
import AdminSectionHeader from '@/components/features/admin/AdminSectionHeader'
import AddOfferModal from '@/components/features/admin/settings/AddOfferModal'
import AddBreakModal from '@/components/features/admin/bookings/AddBreakModal'
import type { AdminAppointment } from '@/types/admin'
import type { Appointment } from '@/types'
import { Download, FileSpreadsheet, Calendar, Filter } from 'lucide-react'
import { exportAppointments } from '@/lib/export-utils'

const AdminDashboardPage = () => {
    const { stats, todayAppointments, recentAppointments, allAppointments, loading, refetch } = useAdminDashboard()
    const [exporting, setExporting] = useState(false)
    const [showExportMenu, setShowExportMenu] = useState(false)

    const handleStatusChange = async (id: string, status: AdminAppointment['status']) => {
        await updateAppointmentStatus(id, status)
        refetch()
    }

    const handleExport = async (period: 'all' | 'month' | 'today') => {
        setExporting(true)
        setShowExportMenu(false)

        try {
            let filteredAppointments: Appointment[] = allAppointments

            if (period === 'today') {
                const today = new Date().toISOString().split('T')[0]
                filteredAppointments = allAppointments.filter((a: Appointment) => a.date === today)
            } else if (period === 'month') {
                const now = new Date()
                const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]
                filteredAppointments = allAppointments.filter((a: Appointment) => a.date >= startOfMonth)
            }

            const filename = period === 'all'
                ? 'toate_programarile'
                : period === 'month'
                    ? `programari_luna`
                    : 'programari_azi'

            exportAppointments(filteredAppointments, { filename })
        } catch (error) {
            console.error('Export error:', error)
        } finally {
            setExporting(false)
        }
    }

    const today = new Date().toLocaleDateString('ro-RO', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    // Export button component
    const ExportButton = () => (
        <div className="relative">
            <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={exporting}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                    background: 'oklch(0.20 0.04 80 / 0.3)',
                    border: '1px solid oklch(0.84 0.18 80 / 0.2)',
                    color: 'oklch(0.84 0.18 80)',
                }}
            >
                <Download className="w-3.5 h-3.5" />
                {exporting ? 'Se exporta...' : 'Export'}
            </button>

            {/* Export Menu */}
            {showExportMenu && (
                <div
                    className="absolute right-0 top-full mt-2 w-40 rounded-xl border shadow-lg z-50 overflow-hidden"
                    style={{
                        background: 'oklch(0.15 0 0)',
                        borderColor: 'oklch(0.3 0 0)',
                    }}
                >
                    <button
                        onClick={() => handleExport('today')}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left hover:bg-[oklch(0.2 0 0)] transition-colors"
                    >
                        <Calendar className="w-3.5 h-3.5" style={{ color: 'oklch(0.84 0.18 80)' }} />
                        <span>Azi</span>
                    </button>
                    <button
                        onClick={() => handleExport('month')}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left hover:bg-[oklch(0.2 0 0)] transition-colors"
                    >
                        <FileSpreadsheet className="w-3.5 h-3.5" style={{ color: 'oklch(0.84 0.18 80)' }} />
                        <span>Luna aceasta</span>
                    </button>
                    <button
                        onClick={() => handleExport('all')}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-left hover:bg-[oklch(0.2 0 0)] transition-colors"
                    >
                        <Filter className="w-3.5 h-3.5" style={{ color: 'oklch(0.84 0.18 80)' }} />
                        <span>Toate</span>
                    </button>
                </div>
            )}
        </div>
    )

    return (
        <div className="flex flex-col gap-6 py-8 min-h-dvh bg-background pb-28">

            {/* Header */}
            <div className="px-5 flex items-center justify-between">
                <div className="flex flex-col gap-0.5">
                    <p className="text-[11px] font-medium tracking-widest uppercase text-[oklch(0.45_0_0)]">
                        Bine ai revenit
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-gold-gradient leading-tight">
                        Dashboard
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

            {/* Stats */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader title="Statistici" />
                <AdminStatsGrid stats={stats} loading={loading} />
            </div>

            {/* Programări azi */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader
                    title="Programări azi"
                    action={
                        !loading && (
                            <span
                                className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border text-[11px] font-semibold"
                                style={{
                                    background: 'oklch(0.30 0.08 80 / 0.20)',
                                    borderColor: 'oklch(0.84 0.18 80 / 0.4)',
                                    color: 'oklch(0.84 0.18 80)',
                                }}
                            >
                                {todayAppointments.length}
                            </span>
                        )
                    }
                />
                <TodaySchedule appointments={todayAppointments} loading={loading} onUpdate={refetch} />

                {/* Actions below TodaySchedule */}
                <div className="px-4 flex flex-col gap-3 mt-2">
                    <AddOfferModal onSuccess={refetch} />
                    <AddBreakModal onSuccess={refetch} />
                </div>
            </div>

            {/* Servicii */}
            <DashboardServices onUpdate={refetch} />

            {/* Recente + Export */}
            <div className="flex flex-col gap-3">
                <AdminSectionHeader
                    title="Programări recente"
                    action={<ExportButton />}
                />

                <RecentAppointmentsTable
                    appointments={recentAppointments}
                    loading={loading}
                    onStatusChange={handleStatusChange}
                />
            </div>

        </div>
    )
}

export default AdminDashboardPage
