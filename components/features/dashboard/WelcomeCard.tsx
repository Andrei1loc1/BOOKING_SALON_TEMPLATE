"use client"
import React from 'react'
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GlowCard } from "@/components/ui/glow-card"
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'
// Import configuration - this is all you need to change for white-label
import { t, THEME_STYLES } from '@/config'

const WelcomeCard = () => {
    const router = useRouter()
    const { profile } = useAuth()
    const { settings } = useSettings()

    // Get user name or use default
    const userName = profile?.name || ''

    return (
        <div
            className="relative mx-5 mt-5 rounded-3xl p-[1px] overflow-hidden"
            style={{
                background: 'linear-gradient(135deg, oklch(0.84 0.18 80) 0%, transparent 35%, transparent 65%, oklch(0.84 0.18 80) 100%)',
                overflow: 'hidden'
            }}
        >

            {/* Cardul propriu-zis care acoperă interiorul, lăsând vizibil doar 1px de padding din părinte */}
            <GlowCard className="!mx-0 !mt-0 relative w-full h-full bg-card rounded-[calc(1.5rem-1px)] z-10 !border-0 !shadow-none !ring-0 before:hidden after:hidden">
                <CardHeader>
                    <CardTitle className="text-2xl" style={THEME_STYLES.goldGradientText}>
                        {/* Using translations */}
                        {userName ? `${t.welcome.greeting}, ${userName}` : t.welcome.greeting}
                    </CardTitle>
                    <CardDescription>
                        {settings?.shopName ? `La ${settings.shopName}` : t.welcome.subtitle}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                    <Button
                        onClick={() => router.push('/booking')}
                        className="
                        w-full text-black font-semibold text-left justify-start px-6
                        rounded-lg py-4
                        shadow-[0_12px_35px] shadow-gold-2/25
                        relative overflow-hidden
                      "
                        style={THEME_STYLES.primaryButton}
                    >
                        <span
                            className="
                              pointer-events-none absolute inset-0
                              bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.0))]
                              opacity-30
                            "
                        />
                        <span className="relative">{t.welcome.bookAppointment}</span>
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => {
                            const el = document.getElementById('your-bookings')
                            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="w-full font-semibold rounded-lg py-4"
                    >
                        {t.welcome.viewYourBookings}
                    </Button>
                </CardContent>
            </GlowCard>
        </div>
    )
}

export default WelcomeCard
