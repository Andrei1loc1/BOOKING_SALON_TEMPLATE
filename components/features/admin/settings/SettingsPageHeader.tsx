'use client'

import React from 'react'

export const SettingsPageHeader: React.FC = () => {
    return (
        <div className="px-5 flex items-center justify-between">
            <div className="flex flex-col gap-0.5">
                <p className="text-[11px] font-medium tracking-widest uppercase text-[oklch(0.45_0_0)]">
                    Aplicație
                </p>
                <h1 className="text-2xl font-bold tracking-tight text-gold-gradient leading-tight">
                    Setări
                </h1>
            </div>

            {/* Badge */}
            <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[11px] font-semibold"
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
                Configurare
            </div>
        </div>
    )
}
