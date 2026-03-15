'use client'

import React from 'react'
import { Shield, User, Briefcase } from 'lucide-react'
import type { AdminUserRow } from '@/types/admin'

interface UserCardProps {
    user: AdminUserRow
    onToggleStatus: (id: string, current: 'active' | 'inactive') => void
    onChangeRole: (id: string, role: 'admin' | 'client' | 'employee') => void
}

const ROLE_CONFIG = {
    admin: {
        label: 'Admin',
        icon: Shield,
        bg: 'oklch(0.25 0.08 280 / 0.30)',
        border: 'oklch(0.55 0.18 280 / 0.45)',
        text: 'oklch(0.75 0.18 280)',
    },
    client: {
        label: 'Client',
        icon: User,
        bg: 'oklch(0.20 0 0 / 0.40)',
        border: 'oklch(0.35 0 0 / 0.50)',
        text: 'oklch(0.60 0 0)',
    },
    employee: {
        label: 'Angajat',
        icon: Briefcase,
        bg: 'oklch(0.30 0.08 80 / 0.30)',
        border: 'oklch(0.84 0.18 80 / 0.45)',
        text: 'oklch(0.84 0.18 80)',
    },
}

const UserCard = ({ user, onToggleStatus, onChangeRole }: UserCardProps) => {
    const isActive = user.status === 'active'
    const role = ROLE_CONFIG[user.role]
    const RoleIcon = role.icon

    const initials = user.name
        .split(' ')
        .map(w => w[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()

    return (
        <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)] px-4 py-3 flex items-center gap-3">
            {/* top accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
            />

            {/* Avatar */}
            <div
                className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-[oklch(0.10_0_0)] text-sm font-bold"
                style={{
                    background: 'linear-gradient(135deg, oklch(0.55 0.15 72), var(--color-gold-light))',
                    boxShadow: '0 3px 12px oklch(0.55 0.15 72 / 0.35)',
                }}
            >
                {initials}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <p className="text-[15px] font-semibold text-[oklch(0.97_0_0)] truncate leading-snug">
                    {user.name}
                </p>
                <p className="text-xs text-[oklch(0.50_0_0)] truncate mt-0.5">
                    {user.phone}
                </p>
            </div>

            {/* Role badge + status toggle */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
                {/* Role badge - static, no dropdown */}
                <div
                    className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border"
                    style={{ background: role.bg, borderColor: role.border }}
                >
                    <RoleIcon size={10} style={{ color: role.text, flexShrink: 0 }} strokeWidth={2.5} />
                    <span className="text-[11px] font-semibold tracking-[0.3px]" style={{ color: role.text }}>
                        {role.label}
                    </span>
                </div>

                {/* Status toggle - only for employees */}
                {user.role === 'employee' && (
                    <button
                        onClick={() => onToggleStatus(user.id, user.status)}
                        className="inline-flex items-center gap-[5px] py-[3px] px-[10px] rounded-full border transition-opacity duration-150 hover:opacity-80 active:scale-95"
                        style={
                            isActive
                                ? {
                                    background: 'oklch(0.30 0.08 145 / 0.25)',
                                    borderColor: 'oklch(0.55 0.15 145 / 0.50)',
                                }
                                : {
                                    background: 'oklch(0.25 0.08 15 / 0.25)',
                                    borderColor: 'oklch(0.50 0.18 15 / 0.50)',
                                }
                        }
                    >
                        <span
                            className="inline-block shrink-0 w-1.5 h-1.5 rounded-full"
                            style={
                                isActive
                                    ? { background: 'oklch(0.65 0.18 145)', boxShadow: '0 0 5px oklch(0.65 0.18 145)' }
                                    : { background: 'oklch(0.60 0.20 15)', boxShadow: '0 0 5px oklch(0.60 0.20 15)' }
                            }
                        />
                        <span
                            className="text-[11px] font-semibold tracking-[0.3px]"
                            style={{ color: isActive ? 'oklch(0.75 0.14 145)' : 'oklch(0.72 0.16 15)' }}
                        >
                            {isActive ? 'Activ' : 'Inactiv'}
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}

export default UserCard
