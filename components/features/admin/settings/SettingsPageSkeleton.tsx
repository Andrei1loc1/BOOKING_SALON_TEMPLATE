'use client'

import React from 'react'

const SKELETON_COUNT = 5

export const SettingsPageSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-4 px-4">
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div
                    key={i}
                    className="h-[100px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]"
                />
            ))}
        </div>
    )
}
