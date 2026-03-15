/**
 * ============================================
 * WHITE-LABEL TEMPLATE CONFIGURATION
 * ============================================
 * 
 * This file contains ALL configuration options that can be customized
 * for each white-label deployment. Simply copy this file and modify
 * the values to create a new salon template.
 * 
 * Categories:
 * - Business Info (name, contact, logo)
 * - Colors (theme customization)
 * - Features (toggle features on/off)
 * - Business Rules (booking rules, limits)
 * ============================================
 */

import type { Service } from '@/types'

// ============================================
// 1. BUSINESS INFORMATION
// ============================================

export interface BusinessInfo {
    /** Display name of the salon/business */
    name: string
    /** Short tagline or description */
    tagline: string
    /** Full address */
    address: string
    /** Contact phone number */
    phone: string
    /** Contact email */
    email: string
    /** Website URL (optional) */
    website?: string
    /** Logo URL (use /logo.svg in public folder) */
    logoUrl: string
    /** Favicon URL */
    faviconUrl: string
}

/**
 * Default business info - modify these values for each deployment
 */
export const BUSINESS_INFO: BusinessInfo = {
    name: 'Salonul Meu',
    tagline: 'Profesionalism și stil',
    address: 'Strada Exemplu Nr. 1, Oraș, Judet',
    phone: '+40 123 456 789',
    email: 'contact@salonulmeu.ro',
    website: '',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico',
}

// ============================================
// 2. THEME COLORS (CSS Variables)
// ============================================

export interface ThemeColors {
    /** Primary brand color (used for main actions, highlights) */
    primary: string
    /** Primary lighter variant */
    primaryLight: string
    /** Secondary/accent color */
    secondary: string
    /** Gold color for special highlights */
    gold: string
    /** Gold lighter variant */
    goldLight: string
    /** Gold dark variant */
    gold2: string
    /** Background color */
    background: string
    /** Card background */
    card: string
    /** Text foreground */
    foreground: string
    /** Muted text color */
    mutedForeground: string
    /** Border color */
    border: string
}

/**
 * Default theme colors - modify these for each deployment
 * Uses OKLCH color space for better color matching
 */
export const THEME_COLORS: ThemeColors = {
    primary: 'oklch(0.205 0 0)',
    primaryLight: 'oklch(0.55 0.15 72)',
    secondary: 'oklch(0.97 0 0)',
    gold: 'oklch(0.84 0.18 80)',
    goldLight: 'oklch(0.92 0.12 85)',
    gold2: 'oklch(0.80 0.16 70)',
    background: 'oklch(1 0 0)',
    card: 'oklch(1 0 0)',
    foreground: 'oklch(0.145 0 0)',
    mutedForeground: 'oklch(0.556 0 0)',
    border: 'oklch(0.922 0 0)',
}

// ============================================
// 3. FEATURE FLAGS
// ============================================

export interface FeatureFlags {
    /** Enable online booking for clients */
    onlineBooking: boolean
    /** Enable offers/discounts system */
    offers: boolean
    /** Enable multiple staff members */
    multiStaff: boolean
    /** Enable online payment */
    onlinePayment: boolean
    /** Enable push notifications */
    pushNotifications: boolean
    /** Enable marketing notifications */
    marketingNotifications: boolean
    /** Enable loyalty program */
    loyaltyProgram: boolean
    /** Enable reviews/ratings */
    reviews: boolean
}

/**
 * Feature flags - enable/disable features for this deployment
 */
export const FEATURE_FLAGS: FeatureFlags = {
    onlineBooking: true,
    offers: true,
    multiStaff: false,
    onlinePayment: false,
    pushNotifications: true,
    marketingNotifications: false,
    loyaltyProgram: false,
    reviews: false,
}

// ============================================
// 4. BUSINESS RULES
// ============================================

export interface BusinessRules {
    /** Currency symbol */
    currency: string
    /** Currency code (ISO 4217) */
    currencyCode: string
    /** Minimum advance booking time in hours */
    minAdvanceBookingHours: number
    /** Maximum advance booking days */
    maxAdvanceBookingDays: number
    /** Minimum cancellation notice in hours */
    minCancellationNoticeHours: number
    /** Default appointment duration in minutes (fallback) */
    defaultAppointmentDuration: number
    /** Maximum appointments per day per client */
    maxAppointmentsPerDay: number
    /** Enable waiting list */
    waitingList: boolean
    /** Require phone verification */
    requirePhoneVerification: boolean
}

/**
 * Business rules - customize booking behavior
 */
export const BUSINESS_RULES: BusinessRules = {
    currency: 'LEI',
    currencyCode: 'RON',
    minAdvanceBookingHours: 1,
    maxAdvanceBookingDays: 30,
    minCancellationNoticeHours: 2,
    defaultAppointmentDuration: 30,
    maxAppointmentsPerDay: 1,
    waitingList: false,
    requirePhoneVerification: false,
}

// ============================================
// 5. DEFAULT SERVICES
// ============================================

/**
 * Default services - pre-populated when creating a new salon
 * Modify these for each deployment or add your own
 */
export const DEFAULT_SERVICES: Omit<Service, 'id'>[] = [
    {
        name: 'Tuns',
        description: 'Tuns clasică sau modernă',
        duration: 30,
        price: 50,
        icon: 'Scissors',
        active: true,
    },
    {
        name: 'Aranjat',
        description: 'Aranjare și styling',
        duration: 45,
        price: 60,
        icon: 'Sparkles',
        active: true,
    },
    {
        name: 'Barbă',
        description: 'Tuns și aranjare barbă',
        duration: 20,
        price: 40,
        icon: 'Razor',
        active: true,
    },
    {
        name: 'Tratament',
        description: 'Tratament pentru păr',
        duration: 30,
        price: 35,
        icon: 'Droplets',
        active: true,
    },
]

// ============================================
// 6. SCHEDULE DEFAULTS
// ============================================

export interface DaySchedule {
    /** Whether the business is open on this day */
    isOpen: boolean
    /** Opening time (24h format) */
    openTime: string
    /** Closing time (24h format) */
    closeTime: string
    /** Break start time (optional) */
    breakStart?: string
    /** Break end time (optional) */
    breakEnd?: string
}

export interface WeeklySchedule {
    monday: DaySchedule
    tuesday: DaySchedule
    wednesday: DaySchedule
    thursday: DaySchedule
    friday: DaySchedule
    saturday: DaySchedule
    sunday: DaySchedule
}

/**
 * Default weekly schedule
 */
export const DEFAULT_SCHEDULE: WeeklySchedule = {
    monday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
    tuesday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
    wednesday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
    thursday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
    friday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
    saturday: { isOpen: true, openTime: '10:00', closeTime: '18:00' },
    sunday: { isOpen: false, openTime: '00:00', closeTime: '00:00' },
}

// ============================================
// 7. TEMPLATE PRESETS
// ============================================

/**
 * Pre-made theme presets for quick setup
 */
export const THEME_PRESETS = {
    gold: {
        primary: 'oklch(0.205 0 0)',
        primaryLight: 'oklch(0.55 0.15 72)',
        gold: 'oklch(0.84 0.18 80)',
        goldLight: 'oklch(0.92 0.12 85)',
        gold2: 'oklch(0.80 0.16 70)',
    },
    blue: {
        primary: 'oklch(0.55 0.2 240)',
        primaryLight: 'oklch(0.65 0.2 240)',
        gold: 'oklch(0.6 0.2 240)',
        goldLight: 'oklch(0.8 0.15 240)',
        gold2: 'oklch(0.7 0.18 240)',
    },
    green: {
        primary: 'oklch(0.45 0.15 150)',
        primaryLight: 'oklch(0.6 0.15 150)',
        gold: 'oklch(0.55 0.2 150)',
        goldLight: 'oklch(0.75 0.15 150)',
        gold2: 'oklch(0.65 0.18 150)',
    },
    purple: {
        primary: 'oklch(0.5 0.2 280)',
        primaryLight: 'oklch(0.65 0.2 280)',
        gold: 'oklch(0.6 0.25 280)',
        goldLight: 'oklch(0.78 0.18 280)',
        gold2: 'oklch(0.68 0.22 280)',
    },
    rose: {
        primary: 'oklch(0.55 0.18 340)',
        primaryLight: 'oklch(0.68 0.18 340)',
        gold: 'oklch(0.65 0.2 340)',
        goldLight: 'oklch(0.82 0.15 340)',
        gold2: 'oklch(0.72 0.18 340)',
    },
} as const

// ============================================
// 8. COMPLETE SALON CONFIG
// ============================================

export interface SalonConfig {
    business: BusinessInfo
    theme: ThemeColors
    features: FeatureFlags
    rules: BusinessRules
    services: Omit<Service, 'id'>[]
    schedule: WeeklySchedule
}

/**
 * Complete salon configuration - use this to create a new deployment
 * Copy this object and modify values for each white-label client
 */
export const SALON_CONFIG: SalonConfig = {
    business: BUSINESS_INFO,
    theme: THEME_COLORS,
    features: FEATURE_FLAGS,
    rules: BUSINESS_RULES,
    services: DEFAULT_SERVICES,
    schedule: DEFAULT_SCHEDULE,
}

// ============================================
// 9. EXPORT HELPERS
// ============================================

/**
 * Get currency display string (e.g., "50 LEI")
 */
export const formatPrice = (price: number, currency?: string): string => {
    return `${price} ${currency || BUSINESS_RULES.currency}`
}

/**
 * Get formatted duration (e.g., "30 MIN")
 */
export const formatDuration = (minutes: number): string => {
    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60)
        const mins = minutes % 60
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`
    }
    return `${minutes} MIN`
}

/**
 * Check if a feature is enabled
 */
export const hasFeature = (feature: keyof FeatureFlags): boolean => {
    return FEATURE_FLAGS[feature]
}
