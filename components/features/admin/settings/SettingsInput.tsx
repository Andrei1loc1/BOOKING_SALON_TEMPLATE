'use client'

import React, { useState } from 'react'

interface SettingsInputProps {
    value: string | number
    onChange: (value: string) => void
    type?: 'text' | 'number'
    placeholder?: string
    className?: string
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
    value,
    onChange,
    type = 'text',
    placeholder,
    className = '',
}) => {
    const [focused, setFocused] = useState(false)

    return (
        <input
            type={type}
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder={placeholder}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`w-32 rounded-xl px-3 py-1.5 text-sm font-medium text-[oklch(0.90_0_0)] outline-none transition-colors ${className}`}
            style={{
                background: 'oklch(0.18 0 0)',
                border: '1px solid oklch(0.28 0 0)',
                ...(focused ? { border: '1px solid oklch(0.55 0.15 72 / 0.60)' } : {})
            }}
        />
    )
}
