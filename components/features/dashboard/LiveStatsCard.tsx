'use client'

import React from 'react'
import { Users, Clock, Calendar, TrendingUp } from 'lucide-react'
import type { LiveStats } from '@/types'

interface LiveStatsCardProps {
    stats: LiveStats
    loading?: boolean
}

const OCCUPANCY_CONFIG = {
    liber: { label: 'Liber', color: 'text-emerald-400', bg: 'bg-emerald-500/8', border: 'border-emerald-500/25', iconBg: 'bg-emerald-500/15' },
    mediu: { label: 'Mediu', color: 'text-amber-400', bg: 'bg-amber-500/8', border: 'border-amber-500/25', iconBg: 'bg-amber-500/15' },
    ocupat: { label: 'Ocupat', color: 'text-rose-400', bg: 'bg-rose-500/8', border: 'border-rose-500/25', iconBg: 'bg-rose-500/15' },
}

const formatWaitingTime = (minutes: number) => {
    if (minutes === 0) return '—'
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
}

export default function LiveStatsCard({ stats, loading }: LiveStatsCardProps) {
    const config = OCCUPANCY_CONFIG[stats.occupancy]

    if (loading) {
        return (
            <div className="mx-5 mt-4 rounded-2xl border border-gold/10 bg-card shadow-[0_4px_24px_oklch(0_0_0/0.3)] p-4 animate-pulse">
                <div className="h-4 w-24 bg-muted rounded mb-3"></div>
                <div className="flex gap-3">
                    <div className="h-20 flex-1 bg-muted rounded-xl"></div>
                    <div className="h-20 flex-1 bg-muted rounded-xl"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="mx-5 mt-4 rounded-2xl border border-gold/10 bg-card shadow-[0_4px_24px_oklch(0_0_0/0.3)] overflow-hidden">
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                        </span>
                        <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">Live</span>
                    </div>
                    <div className="flex-1" />
                    <span className="text-xs text-muted-foreground">{stats.totalToday} programări azi</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-xl p-3 ${config.bg} border ${config.border}`}>
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-6 h-6 rounded-lg ${config.iconBg} flex items-center justify-center`}><Users size={13} className={config.color} /></div>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Locuri libere</span>
                        </div>
                        <div className="flex items-baseline gap-1.5 pl-0.5">
                            <span className={`text-2xl font-bold ${config.color}`}>{stats.availableSpots}</span>
                            <span className="text-xs text-muted-foreground">/ 3</span>
                        </div>
                    </div>

                    <div className="rounded-xl p-3 bg-gradient-to-br from-gold/10 to-gold/5 border border-gold/20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-gold/15 flex items-center justify-center"><TrendingUp size={13} className="text-gold-light" /></div>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Trendul zilei</span>
                        </div>
                        <span className="text-lg font-semibold text-gold-light">{stats.trendOfTheDay || '—'}</span>
                    </div>

                    <div className="rounded-xl p-3 bg-card border border-gold/10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center"><Calendar size={13} className="text-gold-light" /></div>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Următoarea</span>
                        </div>
                        <span className="text-base font-semibold text-foreground">{stats.nextAppointment || '—'}</span>
                    </div>

                    <div className="rounded-xl p-3 bg-card border border-gold/10">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-lg bg-gold/10 flex items-center justify-center"><Clock size={13} className="text-gold-light" /></div>
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Timp așteptare</span>
                        </div>
                        <span className="text-base font-semibold text-foreground">{stats.isOpen ? formatWaitingTime(stats.waitingTime) : 'Închis'}</span>
                    </div>
                </div>

                {stats.activeClients > 0 && (
                    <div className="mt-3 pt-3 border-t border-gold/10">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                            <span>{stats.activeClients} client{stats.activeClients > 1 ? 'i' : ''} în salon</span>
                        </div>
                    </div>
                )}
            </div>
        </div >
    )
}
