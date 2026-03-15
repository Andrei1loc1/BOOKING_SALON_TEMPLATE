'use client'

import React from 'react'

interface SettingsSectionProps {
    title: string
    children: React.ReactNode
}

/** Grupează câmpuri de setări într-un card cu gold top accent și titlu secțiune */
const SettingsSection = ({ title, children }: SettingsSectionProps) => (
    <div className="flex flex-col gap-3">
        <span className="px-4 text-[11px] font-semibold tracking-[0.12em] uppercase text-[oklch(0.45_0_0)]">
            {title}
        </span>
        <div className="relative overflow-hidden mx-4 rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)]">
            {/* top accent */}
            <div
                className="absolute top-0 left-0 right-0 h-[1.5px]"
                style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
            />
            {children}
        </div>
    </div>
)

export default SettingsSection
