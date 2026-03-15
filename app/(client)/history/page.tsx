'use client'

import React, { useState, useMemo } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useAppointments } from '@/hooks/useAppointments'
import { useShowMore } from '@/hooks/useShowMore'
import { useSettings } from '@/hooks/useSettings'
import BookingCard from '@/components/features/dashboard/BookingCard'
import { Skeleton } from '@/components/ui/skeleton'
import HistoryHeader from '@/components/features/history/HistoryHeader'
import HistoryFilterTabs from '@/components/features/history/HistoryFilterTabs'
import HistoryEmptyState from '@/components/features/history/HistoryEmptyState'
import { ShowMoreButton } from '@/components/features/admin/dashboard/ShowMoreButton'
import type { FilterTab } from '@/config/historyConfig'
import type { AppointmentStatus } from '@/config/statusConfig'

export default function HistoryPage() {
    const { user } = useAuth()
    const { appointments, loading, cancel } = useAppointments(user?.uid)
    const { settings } = useSettings()
    const currency = settings?.currency || 'LEI'
    const [activeTab, setActiveTab] = useState<FilterTab>('all')

    const filtered = useMemo(
        () => activeTab === 'all'
            ? appointments
            : appointments.filter((a) => a.status === activeTab),
        [appointments, activeTab]
    )

    const { visibleItems, showAll, hasMore, toggleShowAll, remainingCount } = useShowMore({
        items: filtered,
        initialCount: 3
    })

    return (
        <div className="flex flex-col min-h-screen pb-6">
            <HistoryHeader />

            <HistoryFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />

            <div className="flex flex-col gap-3 px-5">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Skeleton key={i} className="w-full h-[180px] rounded-[18px] bg-[oklch(0.16_0_0)]" />
                    ))
                ) : filtered.length === 0 ? (
                    <HistoryEmptyState activeTab={activeTab} />
                ) : (
                    <>
                        {visibleItems.map((appointment) => (
                            <BookingCard
                                key={appointment.id}
                                title={appointment.serviceName}
                                duration={`${appointment.serviceDuration} MIN`}
                                price={`${appointment.servicePrice} ${currency}`}
                                date={appointment.date}
                                time={appointment.time}
                                status={appointment.status as AppointmentStatus}
                                onCancel={appointment.status === 'confirmed' && appointment.id ? () => cancel(appointment.id!) : undefined}
                            />
                        ))}
                        {hasMore && (
                            <ShowMoreButton
                                showAll={showAll}
                                onClick={toggleShowAll}
                                remainingCount={remainingCount}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
