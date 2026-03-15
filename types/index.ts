export interface UserProfile {
    name: string
    phone: string
    email?: string
    role: 'admin' | 'client' | 'employee'
    status: 'active' | 'inactive'
    created_at: string
    // Notification settings
    notificationSettings?: UserNotificationSettings
    // FCM token for push notifications
    fcmToken?: string
}

export interface UserNotificationSettings {
    pushEnabled: boolean
    remindersEnabled: boolean
    reminderHoursBefore: number // hours before appointment to send reminder
    bookingConfirmation: boolean
    marketingNotifications: boolean
}

export interface Service {
    id?: string
    name: string
    description: string
    duration: number
    price: number
    icon: string
    active: boolean
}

export interface Appointment {
    id?: string
    created_at: string
    date: string
    date_time: string
    time: string
    serviceId: string
    serviceName: string
    servicePrice: number
    serviceDuration: number
    status: 'confirmed' | 'cancelled' | 'completed'
    userId: string
    userName: string
    barberId?: string
    delay_minutes?: number
}

export interface LiveStats {
    isOpen: boolean
    occupancy: 'liber' | 'mediu' | 'ocupat'
    nextAppointment: string | null
    waitingTime: number // in minutes
    availableSpots: number
    totalToday: number
    activeClients: number
    trendOfTheDay: string | null // Most ordered service today
}

export interface BlockedSlot {
    id?: string
    created_by: string
    date: string
    date_time: string
    time: string
    duration: number
    reason: string
}

export interface Offer {
    id?: string
    created_at: string
    title: string
    description: string
    badge: string
    discountType: 'percent' | 'fixed'
    discountValue: number
    valid_from: string
    valid_until: string
    active: boolean
}

export interface DaySchedule {
    start: number
    end: number
    enabled: boolean
}

export interface Settings {
    shopName: string
    currency: string
    // Contact info
    phone?: string
    email?: string
    address?: string
    // Booking settings
    minAdvanceHours?: number
    maxAdvanceDays?: number
    cancellationHours?: number
    bufferMinutes?: number
    // Notifications
    emailNotifications?: boolean
    smsNotifications?: boolean
    // Schedule
    schedule: {
        sameForAll: boolean
        default: {
            start: number
            end: number
        }
        monday?: DaySchedule
        tuesday?: DaySchedule
        wednesday?: DaySchedule
        thursday?: DaySchedule
        friday?: DaySchedule
        saturday?: DaySchedule
        sunday?: DaySchedule
    }
}
