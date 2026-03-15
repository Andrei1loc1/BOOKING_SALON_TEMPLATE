/**
 * ============================================
 * BARBERSHOP TEMPLATE
 * ============================================
 * 
 * Copy this file and modify values for a new barbershop client.
 * This is a pre-configured template for barber shops.
 * 
 * Usage:
 * 1. Copy this file to config/salonConfig.ts
 * 2. Modify the values below
 * 3. The app will automatically use these values
 * ============================================
 */

import type { SalonConfig } from '../salonConfig'

export const BARBERSHOP_TEMPLATE: SalonConfig = {
    business: {
        name: 'Barber Shop',
        tagline: 'Tradiție și stil',
        address: 'Strada Centrală Nr. 10, București',
        phone: '+40 700 123 456',
        email: 'contact@barbershop.ro',
        website: 'https://barbershop.ro',
        logoUrl: '/logo-barbershop.svg',
        faviconUrl: '/favicon.ico',
    },

    theme: {
        primary: 'oklch(0.205 0 0)',
        primaryLight: 'oklch(0.45 0.15 50)',
        secondary: 'oklch(0.15 0.02 280)',
        gold: 'oklch(0.75 0.15 45)',
        goldLight: 'oklch(0.88 0.12 50)',
        gold2: 'oklch(0.68 0.14 45)',
        background: 'oklch(0.98 0 0)',
        card: 'oklch(1 0 0)',
        foreground: 'oklch(0.145 0 0)',
        mutedForeground: 'oklch(0.556 0 0)',
        border: 'oklch(0.922 0 0)',
    },

    features: {
        onlineBooking: true,
        offers: true,
        multiStaff: true,
        onlinePayment: false,
        pushNotifications: true,
        marketingNotifications: false,
        loyaltyProgram: false,
        reviews: true,
    },

    rules: {
        currency: 'LEI',
        currencyCode: 'RON',
        minAdvanceBookingHours: 1,
        maxAdvanceBookingDays: 14,
        minCancellationNoticeHours: 2,
        defaultAppointmentDuration: 30,
        maxAppointmentsPerDay: 1,
        waitingList: true,
        requirePhoneVerification: false,
    },

    services: [
        {
            name: 'Tuns Bărbați',
            description: 'Tuns clasică sau modernă pentru bărbați',
            duration: 30,
            price: 50,
            icon: 'Scissors',
            active: true,
        },
        {
            name: 'Tuns Copii',
            description: 'Tuns pentru copii până la 12 ani',
            duration: 20,
            price: 35,
            icon: 'Child',
            active: true,
        },
        {
            name: 'Barbă',
            description: 'Tuns și aranjare barbă cu prosoape calde',
            duration: 25,
            price: 40,
            icon: 'Razor',
            active: true,
        },
        {
            name: 'Ras Clasică',
            description: 'Ras cu cuțit tradițional',
            duration: 30,
            price: 45,
            icon: 'Blade',
            active: true,
        },
        {
            name: 'Tratament Păr',
            description: 'Tratament pentru scalp și păr',
            duration: 30,
            price: 35,
            icon: 'Droplets',
            active: true,
        },
        {
            name: 'Pachet Complete',
            description: 'Tuns + Barbă + Tratament',
            duration: 60,
            price: 100,
            icon: 'Star',
            active: true,
        },
    ],

    schedule: {
        monday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
        friday: { isOpen: true, openTime: '09:00', closeTime: '21:00', breakStart: '13:00', breakEnd: '14:00' },
        saturday: { isOpen: true, openTime: '10:00', closeTime: '18:00' },
        sunday: { isOpen: false, openTime: '00:00', closeTime: '00:00' },
    },
}
