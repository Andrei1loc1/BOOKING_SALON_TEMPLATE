import type { Appointment } from '@/types'

export interface DashboardStats {
    todayCount: number
    totalUsers: number
    monthRevenue: number
    pendingCount: number
}

export interface AdminUserRow {
    id: string
    name: string
    phone: string
    role: 'admin' | 'client' | 'employee'
    status: 'active' | 'inactive'
    created_at: string
}

export type AdminAppointment = Appointment

export type BookingFilterTab = 'all' | 'confirmed' | 'cancelled' | 'completed'
