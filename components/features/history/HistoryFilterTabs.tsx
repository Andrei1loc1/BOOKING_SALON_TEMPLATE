import React from 'react'
import { HISTORY_TABS, HISTORY_STYLES, type FilterTab } from '@/config/historyConfig'

interface HistoryFilterTabsProps {
    activeTab: FilterTab
    onTabChange: (tab: FilterTab) => void
}

export default function HistoryFilterTabs({ activeTab, onTabChange }: HistoryFilterTabsProps) {
    return (
        <div
            className="flex items-center gap-2 mx-5 mb-5 p-1 rounded-[16px]"
            style={HISTORY_STYLES.tabContainer}
        >
            {HISTORY_TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 rounded-[12px] text-[11px] font-semibold transition-all duration-200 whitespace-nowrap"
                        style={isActive ? HISTORY_STYLES.tabActive : HISTORY_STYLES.tabInactive}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                )
            })}
        </div>
    )
}
