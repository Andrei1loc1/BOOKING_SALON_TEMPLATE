'use client'

import React from 'react'
import type { DashboardStats } from '@/types/admin'
import { ADMIN_STATS_CONFIG } from '@/config/adminConfig'

interface AdminStatsGridProps {
    stats: DashboardStats
    loading: boolean
}

const AdminStatsGrid = ({ stats, loading }: AdminStatsGridProps) => {
    return (
        <div className="grid grid-cols-2 gap-2 px-4">
            {ADMIN_STATS_CONFIG.map(({ key, label, icon: Icon, suffix }) => (
                <div
                    key={key}
                    className="relative overflow-hidden rounded-xl border border-[oklch(0.84_0.18_80_/_0.10)] bg-[oklch(0.14_0_0)] p-3 flex items-center gap-3"
                >
                    {/* icon */}
                    <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[oklch(0.10_0_0)]"
                        style={{
                            background: 'linear-gradient(135deg, oklch(0.55 0.15 72), var(--color-gold-light))',
                            boxShadow: '0 2px 8px oklch(0.55 0.15 72 / 0.30)',
                        }}
                    >
                        <Icon size={15} strokeWidth={2.2} />
                    </div>

                    {/* value + label */}
                    <div className="flex flex-col min-w-0">
                        {loading ? (
                            <div className="h-5 w-12 rounded-md animate-pulse bg-[oklch(0.22_0_0)] mb-1" />
                        ) : (
                            <span className="text-lg font-bold tracking-tight text-[oklch(0.97_0_0)] leading-none">
                                {stats[key]}{suffix}
                            </span>
                        )}
                        <span className="text-[10px] font-medium text-[oklch(0.45_0_0)] mt-0.5 truncate">{label}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AdminStatsGrid
