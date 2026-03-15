'use client'

import { useState, useMemo } from 'react'

interface UseShowMoreOptions<T> {
    items: T[]
    initialCount?: number
}

interface UseShowMoreReturn<T> {
    visibleItems: T[]
    showAll: boolean
    hasMore: boolean
    toggleShowAll: () => void
    totalCount: number
    remainingCount: number
}

export function useShowMore<T>({ items, initialCount = 3 }: UseShowMoreOptions<T>): UseShowMoreReturn<T> {
    const [showAll, setShowAll] = useState(false)

    const visibleItems = useMemo(
        () => showAll ? items : items.slice(0, initialCount),
        [items, showAll, initialCount]
    )

    const hasMore = items.length > initialCount
    const remainingCount = items.length - initialCount

    const toggleShowAll = () => {
        setShowAll(prev => !prev)
    }

    return {
        visibleItems,
        showAll,
        hasMore,
        toggleShowAll,
        totalCount: items.length,
        remainingCount
    }
}
