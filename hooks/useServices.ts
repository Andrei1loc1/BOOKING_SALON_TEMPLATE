'use client'

import { useEffect, useState } from 'react'
import { getActiveServices, getServices } from '@/actions/admin-actions'
import type { Service } from '@/types'

export function useServices(includeInactive = false) {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = includeInactive ? getServices : getActiveServices
        fetch()
            .then(setServices)
            .catch(() => setError('Eroare la încărcarea serviciilor.'))
            .finally(() => setLoading(false))
    }, [includeInactive])

    return { services, loading, error }
}
