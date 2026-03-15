'use client'

import React from 'react'
import WelcomeCard from '@/components/features/dashboard/WelcomeCard'
import LiveStatsCard from '@/components/features/dashboard/LiveStatsCard'
import StatsCard from '@/components/features/dashboard/StatsCard'
import ServiceCard from '@/components/features/dashboard/ServiceCard'
import BookingCard from '@/components/features/dashboard/BookingCard'
import { GlowCard } from '@/components/ui/glow-card'
import { useAuth } from '@/hooks/useAuth'
import { useServices } from '@/hooks/useServices'
import { useAppointments } from '@/hooks/useAppointments'
import { useLiveStats } from '@/hooks/useLiveStats'
import { useSettings } from '@/hooks/useSettings'
// Import configuration
import { t, formatPrice, THEME_STYLES } from '@/config'

const Page = () => {
    const { user } = useAuth()
    const { settings } = useSettings()
    
    // Fallback currency if not yet loaded
    const currency = settings?.currency || t.common?.lei || 'LEI'
    const { services, loading: servicesLoading } = useServices()
    const { appointments, loading: appointmentsLoading, cancel } = useAppointments(user?.uid)
    const { stats: liveStats, loading: liveStatsLoading } = useLiveStats()

    const confirmedAppointments = appointments.filter(a => a.status === 'confirmed')
    const totalSpent = appointments
        .filter(a => a.status === 'completed')
        .reduce((sum, a) => sum + (a.servicePrice ?? 0), 0)
    const favoriteService = confirmedAppointments.length > 0
        ? confirmedAppointments[confirmedAppointments.length - 1].serviceName
        : '—'

    return (
        <div className="pb-20">
            <WelcomeCard />

            {/* Live Stats */}
            <LiveStatsCard stats={liveStats} loading={liveStatsLoading} />

            <div className='flex flex-col mt-5 mx-5 gap-3'>
                <StatsCard title={t.stats.totalAppointments} count={confirmedAppointments.length} />
                <StatsCard title={t.stats.totalSpent} count={totalSpent > 0 ? formatPrice(totalSpent, currency) : `0 ${currency}`} />
                <StatsCard title={t.stats.favoriteService} count={favoriteService} />
            </div>

            <div className='mt-10 mx-5'>
                <span className='text-2xl' style={THEME_STYLES.goldGradientText}>{t.stats.popularServices}</span>
            </div>

            <div className='flex flex-col mt-4 mx-5 gap-3 pb-4'>
                {servicesLoading ? (
                    <span className='text-muted-foreground text-sm'>{t.stats.loadingServices}</span>
                ) : (
                    services.map(service => (
                        <ServiceCard
                            key={service.id}
                            title={service.name}
                            duration={`${service.duration} ${t.common.minutes}`}
                            price={formatPrice(service.price, currency)}
                            description={service.description}
                        />
                    ))
                )}
            </div>

            <div
                className="relative mx-5 my-10 rounded-3xl p-[1px] overflow-hidden"
                style={THEME_STYLES.borderGradient}
            >
                <GlowCard className="!mx-0 !mt-0 relative w-full h-full bg-card rounded-[calc(1.5rem-1px)] z-10 !border-0 !shadow-none !ring-0 before:hidden after:hidden">
                    <div className='text-center mx-5'>
                        <span className='text-2xl' style={THEME_STYLES.goldGradientText}>{t.stats.yourBookings}</span>
                    </div>

                    <div className='flex flex-col mt-4 mx-5 gap-3 pb-4'>
                        {appointmentsLoading ? (
                            <span className='text-muted-foreground text-sm'>{t.stats.loadingAppointments}</span>
                        ) : confirmedAppointments.length === 0 ? (
                            <span className='text-muted-foreground text-sm text-center py-4'>{t.stats.noActiveBookings}</span>
                        ) : (
                            confirmedAppointments.map(appointment => (
                                <BookingCard
                                    key={appointment.id}
                                    title={appointment.serviceName}
                                    date={appointment.date}
                                    time={appointment.time}
                                    duration={`${appointment.serviceDuration} ${t.common.minutes}`}
                                    status={appointment.status}
                                    price={formatPrice(appointment.servicePrice, currency)}
                                    onCancel={() => cancel(appointment.id!)}
                                />
                            ))
                        )}
                    </div>
                </GlowCard>
            </div>
        </div>
    )
}

export default Page
