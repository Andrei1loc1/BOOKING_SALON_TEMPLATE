'use client'

import React from 'react'

interface AdminSectionHeaderProps {
    title: string
    action?: React.ReactNode
}

const AdminSectionHeader = ({ title, action }: AdminSectionHeaderProps) => {
    return (
        <div className="flex items-center justify-between px-4">
            <span
                className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[oklch(0.45_0_0)]"
            >
                {title}
            </span>
            {action && <div>{action}</div>}
        </div>
    )
}

export default AdminSectionHeader
