'use client'

import { useEffect, useState } from 'react'
import { getActiveOffers, getOffers } from '@/actions/admin-actions'
import type { Offer } from '@/types'

export function useOffers(includeInactive = false) {
    const [offers, setOffers] = useState<Offer[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetch = includeInactive ? getOffers : getActiveOffers
        fetch()
            .then(setOffers)
            .catch(() => setError('Eroare la încărcarea ofertelor.'))
            .finally(() => setLoading(false))
    }, [includeInactive])

    return { offers, loading, error }
}
