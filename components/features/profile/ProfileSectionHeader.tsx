import React from 'react'

interface ProfileSectionHeaderProps {
    children: React.ReactNode
}

export function ProfileSectionHeader({ children }: ProfileSectionHeaderProps) {
    return (
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground px-1">
            {children}
        </span>
    )
}

export default ProfileSectionHeader
