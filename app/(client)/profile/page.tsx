'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Shield, Info } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { logoutUser } from '@/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { GlowCard } from '@/components/ui/glow-card'
import {
    NotificationSettingsCard,
    AccountInfoCard
} from '@/components/features/profile'

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ProfilePage() {
    const router = useRouter()
    const { profile, loading: authLoading } = useAuth()
    const [loggingOut, setLoggingOut] = useState(false)

    async function handleLogout() {
        setLoggingOut(true)
        await logoutUser()
        router.push('/login')
    }

    if (authLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <span className="text-muted-foreground text-sm">Se încarcă...</span>
            </div>
        )
    }

    const initials = profile?.name
        ? profile.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
        : '?'

    return (
        <div className="flex flex-col mx-5 mt-10 gap-5 pb-8">

            {/* ── Avatar + name ── */}
            <div className="flex flex-col items-center gap-3 mb-2">
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold"
                    style={{
                        border: '2px solid oklch(0.84 0.18 80 / 0.7)',
                        background: 'oklch(0.16 0 0)',
                        boxShadow: '0 0 32px oklch(0.84 0.18 80 / 0.2)',
                        color: 'oklch(0.84 0.18 80)',
                    }}
                >
                    {initials}
                </div>
                <div className="text-center">
                    <p className="text-xl font-semibold text-foreground">
                        {profile?.name ?? '—'}
                    </p>
                </div>
            </div>

            {/* ── Cont ── */}
            <SectionTitle>Cont</SectionTitle>
            <div
                className="relative rounded-3xl p-[1px] overflow-hidden -mt-2"
                style={{
                    background:
                        'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)',
                }}
            >
                <AccountInfoCard className="!rounded-[calc(1.5rem-1px)]" />
            </div>

            {/* ── Notificări ── */}
            <SectionTitle>Notificări</SectionTitle>
            <NotificationSettingsCard />

            {/* ── Aplicație ── */}
            <SectionTitle>Aplicație</SectionTitle>
            <GlowCard className="!mx-0 !mt-0 -mt-2 px-5 !rounded-3xl">
                <div className="py-1">
                    <SettingLink
                        id="link-privacy"
                        icon={Shield}
                        label="Confidențialitate"
                        description="Politica de confidențialitate"
                    />
                    <SettingLink
                        id="link-about"
                        icon={Info}
                        label="Despre aplicație"
                        description="Versiunea 1.0.0"
                    />
                </div>
            </GlowCard>

            {/* ── Logout ── */}
            <Button
                id="logout-button"
                onClick={handleLogout}
                disabled={loggingOut}
                variant="outline"
                className="w-full rounded-xl py-4 text-sm font-semibold border-border text-destructive hover:bg-destructive/10 hover:border-destructive transition-colors disabled:opacity-60"
            >
                {loggingOut ? 'Se deconectează...' : 'Deconectare'}
            </Button>

        </div>
    )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
            {children}
        </span>
    )
}

function SettingLink({
    id,
    icon: Icon,
    label,
    description,
    onClick,
}: {
    id: string
    icon: React.ElementType
    label: string
    description?: string
    onClick?: () => void
}) {
    return (
        <button
            id={id}
            onClick={onClick}
            className="flex items-center justify-between py-3.5 border-b border-border last:border-0 w-full text-left hover:opacity-80 transition-opacity"
        >
            <div className="flex items-center gap-3">
                <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'oklch(0.20 0 0)' }}
                >
                    <Icon size={15} style={{ color: 'oklch(0.84 0.18 80)' }} />
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
                    )}
                </div>
            </div>
            <ChevronRightIcon className="text-muted-foreground flex-shrink-0" />
        </button>
    )
}

function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    )
}
