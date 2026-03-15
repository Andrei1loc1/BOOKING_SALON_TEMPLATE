'use client'

import React from 'react'
import { SETTINGS_STYLES } from '@/config/settingsConfig'

interface SaveSettingsButtonProps {
    onSave: () => void
    saving: boolean
}

export const SaveSettingsButton: React.FC<SaveSettingsButtonProps> = ({ onSave, saving }) => {
    return (
        <button
            onClick={onSave}
            disabled={saving}
            className="mx-4 w-[calc(100%-2rem)] py-3 rounded-2xl text-sm font-bold text-[oklch(0.10_0_0)] transition-opacity active:scale-[0.98] disabled:opacity-50"
            style={SETTINGS_STYLES.saveButton}
        >
            {saving ? 'Se salvează...' : 'Salvează modificările'}
        </button>
    )
}
