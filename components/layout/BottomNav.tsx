'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavItem {
    href: string;
    label: string;
    icon: React.ComponentType;
}

const HomeIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
        <polyline points="9 21 9 13 15 13 15 21" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="3" ry="3" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const HistoryIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <polyline points="12 7 12 12 15 15" />
    </svg>
);

const ProfileIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const defaultNavItems: NavItem[] = [
    { href: '/', label: 'Home', icon: HomeIcon },
    { href: '/booking', label: 'Rezervari', icon: CalendarIcon },
    { href: '/history', label: 'Istoric', icon: HistoryIcon },
    { href: '/profile', label: 'Profil', icon: ProfileIcon },
];

interface BottomNavProps {
    items?: NavItem[];
}

export default function BottomNav({ items = defaultNavItems }: BottomNavProps) {
    const pathname = usePathname();

    return (
        <nav className="bottom-nav">
            <div className="bottom-nav__row">
                <div className="bottom-nav__items">
                    {items.map(({ href, label, icon: Icon }) => {
                        const isActive = pathname === href;
                        return (
                            <Link key={href} href={href} className={`bottom-nav__item ${isActive ? 'bottom-nav__item--active' : ''}`}>
                                <span className="bottom-nav__icon">
                                    <Icon />
                                    {isActive && <span className="bottom-nav__icon-glow" />}
                                </span>
                                <span className="bottom-nav__label">{label}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

        </nav>
    );
}

