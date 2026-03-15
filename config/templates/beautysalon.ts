/**
 * ============================================
 * BEAUTY SALON TEMPLATE
 * ============================================
 * 
 * Copy this file and modify values for a new beauty salon client.
 * This is a pre-configured template for beauty/wellness salons.
 * 
 * Usage:
 * 1. Copy this file to config/salonConfig.ts
 * 2. Modify the values below
 * 3. The app will automatically use these values
 * ============================================
 */

import type { SalonConfig } from '../salonConfig'

export const BEAUTY_SALON_TEMPLATE: SalonConfig = {
    business: {
        name: 'Beauty Salon',
        tagline: 'Frumusețe și relaxare',
        address: 'Bulevardi Elena Nr. 5, Cluj-Napoca',
        phone: '+40 700 987 654',
        email: 'contact@beautysalon.ro',
        website: 'https://beautysalon.ro',
        logoUrl: '/logo-beauty.svg',
        faviconUrl: '/favicon.ico',
    },

    theme: {
        primary: 'oklch(0.55 0.2 320)',
        primaryLight: 'oklch(0.7 0.22 320)',
        secondary: 'oklch(0.95 0.05 320)',
        gold: 'oklch(0.78 0.15 40)',
        goldLight: 'oklch(0.9 0.1 45)',
        gold2: 'oklch(0.72 0.14 40)',
        background: 'oklch(0.98 0.02 280)',
        card: 'oklch(1 0 0)',
        foreground: 'oklch(0.2 0.02 280)',
        mutedForeground: 'oklch(0.5 0.05 280)',
        border: 'oklch(0.9 0.03 280)',
    },

    features: {
        onlineBooking: true,
        offers: true,
        multiStaff: true,
        onlinePayment: true,
        pushNotifications: true,
        marketingNotifications: true,
        loyaltyProgram: true,
        reviews: true,
    },

    rules: {
        currency: 'LEI',
        currencyCode: 'RON',
        minAdvanceBookingHours: 2,
        maxAdvanceBookingDays: 30,
        minCancellationNoticeHours: 24,
        defaultAppointmentDuration: 60,
        maxAppointmentsPerDay: 2,
        waitingList: true,
        requirePhoneVerification: true,
    },

    services: [
        {
            name: 'Coafură',
            description: 'Coafură profesională pentru orice ocazie',
            duration: 60,
            price: 120,
            icon: 'Sparkles',
            active: true,
        },
        {
            name: 'Vopsit Păr',
            description: 'Vopsit complet cu produse profesionale',
            duration: 120,
            price: 200,
            icon: 'Palette',
            active: true,
        },
        {
            name: 'Tratamente Faciale',
            description: 'Tratamente faciale profesionale',
            duration: 60,
            price: 150,
            icon: 'Flower',
            active: true,
        },
        {
            name: 'Manichiură',
            description: 'Manichiură clasică sau cu gel',
            duration: 45,
            price: 80,
            icon: 'Hand',
            active: true,
        },
        {
            name: 'Pedichiură',
            description: 'Pedichiură cu masaj',
            duration: 60,
            price: 100,
            icon: 'Foot',
            active: true,
        },
        {
            name: 'Machiaj',
            description: 'Machiaj profesional pentru ocazii',
            duration: 45,
            price: 90,
            icon: 'Brush',
            active: true,
        },
        {
            name: 'Epilare',
            description: 'Epilare cu ceară',
            duration: 30,
            price: 60,
            icon: 'Zap',
            active: true,
        },
        {
            name: 'Masaj',
            description: 'Masaj relaxant sau terapeutic',
            duration: 60,
            price: 130,
            icon: 'Heart',
            active: true,
        },
    ],

    schedule: {
        monday: { isOpen: true, openTime: '09:00', closeTime: '20:00', breakStart: '13:00', breakEnd: '14:00' },
        tuesday: { isOpen: true, openTime: '09:00', closeTime: '20:00', breakStart: '13:00', breakEnd: '14:00' },
        wednesday: { isOpen: true, openTime: '09:00', closeTime: '20:00', breakStart: '13:00', breakEnd: '14:00' },
        thursday: { isOpen: true, openTime: '09:00', closeTime: '20:00', breakStart: '13:00', breakEnd: '14:00' },
        friday: { isOpen: true, openTime: '09:00', closeTime: '20:00', breakStart: '13:00', breakEnd: '14:00' },
        saturday: { isOpen: true, openTime: '10:00', closeTime: '18:00' },
        sunday: { isOpen: false, openTime: '00:00', closeTime: '00:00' },
    },
}
