'use client'

import React from 'react'

interface SettingsSelectProps<T extends string> {
    value: T
    onChange: (value: T) => void
    options: readonly T[] | T[]
    className?: string
}

export function SettingsSelect<T extends string>({
    value,
    onChange,
    options,
    className = ''
}: SettingsSelectProps<T>) {
    return (
        <select
            value={value}
            onChange={e => onChange(e.target.value as T)}
            className={`w-32 rounded-xl px-3 py-1.5 text-sm font-medium text-[oklch(0.90_0_0)] outline-none ${className}`}
            style={{ background: 'oklch(0.18 0 0)', border: '1px solid oklch(0.28 0 0)' }}
        >
            {options.map(option => (
                <option key={option} value={option} style={{ background: 'oklch(0.14 0 0)' }}>
                    {option}
                </option>
            ))}
        </select>
    )
}
