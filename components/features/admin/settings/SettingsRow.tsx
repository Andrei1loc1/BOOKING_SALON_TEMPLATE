'use client'

import React from 'react'

interface SettingsRowProps {
    label: string
    hint?: string
    children: React.ReactNode
    /** Adds a bottom border divider — use on all rows except the last */
    divider?: boolean
}

/** Un rând label + input/control într-un SettingsSection */
const SettingsRow = ({ label, hint, children, divider = true }: SettingsRowProps) => (
    <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={divider ? { borderBottom: '1px solid oklch(0.20 0 0)' } : undefined}
    >
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[oklch(0.90_0_0)]">{label}</p>
            {hint && <p className="text-xs text-[oklch(0.45_0_0)] mt-0.5">{hint}</p>}
        </div>
        <div className="shrink-0">{children}</div>
    </div>
)

export default SettingsRow
