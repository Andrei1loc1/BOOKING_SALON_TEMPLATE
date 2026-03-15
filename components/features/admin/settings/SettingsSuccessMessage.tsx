'use client'

import React from 'react'
import { SETTINGS_STYLES } from '@/config/settingsConfig'

export const SettingsSuccessMessage: React.FC = () => {
    return (
        <div
            className="mx-4 rounded-2xl py-3 flex items-center justify-center gap-2 border"
            style={SETTINGS_STYLES.success}
        >
            <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: SETTINGS_STYLES.success.dot, boxShadow: '0 0 6px oklch(0.65 0.18 145 / 0.7)' }}
            />
            <span className="text-sm font-semibold" style={{ color: SETTINGS_STYLES.success.text }}>
                Salvat cu succes
            </span>
        </div>
    )
}
