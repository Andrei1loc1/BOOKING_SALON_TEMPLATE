import React from 'react'
import { History } from 'lucide-react'
import { HISTORY_STYLES } from '@/config/historyConfig'

export default function HistoryHeader() {
    return (
        <div className="relative px-5 pt-15 pb-10 overflow-hidden">
            <div
                className="absolute -top-10 -right-10 w-48 h-48 rounded-full pointer-events-none"
                style={HISTORY_STYLES.ambientGlow}
            />
            <div className="flex items-center justify-center gap-3 mb-1">

                <h1 className="text-2xl font-bold text-gold-gradient">Istoric</h1>
            </div>
            <p className="text-[13px] text-[oklch(0.45_0_0)] flex items-center justify-center">
                Toate programările tale anterioare
            </p>
        </div>
    )
}
