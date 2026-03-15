import React from 'react'
import { History } from 'lucide-react'
import { HISTORY_STYLES, EMPTY_STATE_MESSAGES, type FilterTab } from '@/config/historyConfig'

interface HistoryEmptyStateProps {
    activeTab: FilterTab
}

export default function HistoryEmptyState({ activeTab }: HistoryEmptyStateProps) {
    return (
        <div
            className="flex flex-col items-center justify-center py-16 rounded-[20px]"
            style={HISTORY_STYLES.emptyContainer}
        >
            <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                style={HISTORY_STYLES.emptyIcon}
            >
                <History size={24} color="oklch(0.55 0.15 72)" strokeWidth={1.5} />
            </div>
            <p className="text-[14px] font-semibold text-[oklch(0.65_0_0)]">Niciun istoric</p>
            <p className="text-[12px] text-[oklch(0.40_0_0)] mt-1">
                {EMPTY_STATE_MESSAGES[activeTab]}
            </p>
        </div>
    )
}
