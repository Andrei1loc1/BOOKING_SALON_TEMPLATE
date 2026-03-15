import { CalendarDays, Users, TrendingUp, Clock } from 'lucide-react'
import type { BookingFilterTab } from '@/types/admin'

export const ADMIN_STATS_CONFIG = [
    {
        key: 'todayCount' as const,
        label: 'Azi',
        icon: CalendarDays,
        suffix: '',
    },
    {
        key: 'pendingCount' as const,
        label: 'În așteptare',
        icon: Clock,
        suffix: '',
    },
    {
        key: 'totalUsers' as const,
        label: 'Utilizatori',
        icon: Users,
        suffix: '',
    },
    {
        key: 'monthRevenue' as const,
        label: 'Venit lunar',
        icon: TrendingUp,
        suffix: ' lei',
    },
]

export const BOOKING_FILTER_TABS: { id: BookingFilterTab; label: string }[] = [
    { id: 'all', label: 'Toate' },
    { id: 'confirmed', label: 'Confirmate' },
    { id: 'completed', label: 'Finalizate' },
    { id: 'cancelled', label: 'Anulate' },
]
