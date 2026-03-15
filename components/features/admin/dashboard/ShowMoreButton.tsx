'use client'

import React from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface ShowMoreButtonProps {
    showAll: boolean
    onClick: () => void
    remainingCount: number
}

export function ShowMoreButton({ showAll, onClick, remainingCount }: ShowMoreButtonProps) {
    return (
        <button
            onClick={onClick}
            className="flex items-center justify-center gap-2 py-3 mt-1 text-sm font-medium text-[oklch(0.55_0_0)] hover:text-[oklch(0.84_0.18_80)] transition-colors"
        >
            {showAll ? (
                <>
                    <ChevronUp className="w-4 h-4" />
                    Arată mai puține
                </>
            ) : (
                <>
                    <ChevronDown className="w-4 h-4" />
                    Arată mai multe ({remainingCount})
                </>
            )}
        </button>
    )
}
