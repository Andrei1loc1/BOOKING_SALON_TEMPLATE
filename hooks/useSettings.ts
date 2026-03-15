'use client'

import { useEffect, useState } from 'react'
import { getSettings } from '@/actions/admin-actions'
import type { Settings } from '@/types'

export function useSettings() {
    const [settings, setSettings] = useState<Settings | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        getSettings()
            .then(setSettings)
            .catch(() => setError('Eroare la încărcarea setărilor.'))
            .finally(() => setLoading(false))
    }, [])

    return { settings, loading, error }
}
