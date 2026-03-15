/**
 * ============================================
 * TRANSLATIONS & UI TEXT
 * ============================================
 * 
 * All user-facing text in one place.
 * Modify these values for each white-label deployment.
 * 
 * Structure:
 * - common: Shared text across multiple pages
 * - welcome: Welcome/home page
 * - booking: Booking flow
 * - dashboard: User dashboard
 * - admin: Admin panel
 * - settings: Settings page
 * - errors: Error messages
 * - notifications: Notification text
 * ============================================
 */

export type Language = 'ro' | 'en'

// ============================================
// TRANSLATIONS STRUCTURE
// ============================================

export interface Translations {
    /** Common/shared text */
    common: {
        appName: string
        loading: string
        save: string
        cancel: string
        delete: string
        edit: string
        add: string
        confirm: string
        back: string
        next: string
        previous: string
        search: string
        filter: string
        all: string
        none: string
        yes: string
        no: string
        close: string
        open: string
        minutes: string
        hours: string
        days: string
        lei: string
        currency: string
    }

    /** Welcome/Home page */
    welcome: {
        greeting: string
        subtitle: string
        bookAppointment: string
    }

    /** Stats/labels on dashboard */
    stats: {
        totalAppointments: string
        totalSpent: string
        favoriteService: string
        popularServices: string
        yourBookings: string
        noActiveBookings: string
        loadingAppointments: string
        loadingServices: string
    }

    /** Booking flow */
    booking: {
        step1Title: string
        step2Title: string
        step3Title: string
        selectService: string
        selectDateTime: string
        confirmBooking: string
        chooseService: string
        chooseDate: string
        chooseTime: string
        noServices: string
        noSlotsAvailable: string
        bookingConfirmed: string
        bookingSuccess: string
        continueButton: string
        backButton: string
        service: string
        date: string
        time: string
        price: string
        duration: string
    }

    /** User dashboard */
    dashboard: {
        welcome: string
        welcomeBack: string
        quickActions: string
        recentBookings: string
        noBookings: string
        viewAll: string
        activeBookings: string
        pastBookings: string
    }

    /** History page */
    history: {
        title: string
        all: string
        completed: string
        cancelled: string
        noHistory: string
        filter: string
    }

    /** Profile page */
    profile: {
        title: string
        accountInfo: string
        notifications: string
        notificationSettings: string
        pushNotifications: string
        bookingReminders: string
        reminderTime: string
        marketingNotifications: string
        saveChanges: string
        changesSaved: string
    }

    /** Admin dashboard */
    admin: {
        dashboard: string
        bookings: string
        users: string
        settings: string
        todayAppointments: string
        pendingAppointments: string
        totalUsers: string
        monthlyRevenue: string
        recentBookings: string
        todaySchedule: string
        noAppointmentsToday: string
    }

    /** Admin - Bookings */
    adminBookings: {
        title: string
        all: string
        confirmed: string
        pending: string
        completed: string
        cancelled: string
        addBreak: string
        breakStart: string
        breakEnd: string
        noBreaks: string
    }

    /** Admin - Users */
    adminUsers: {
        title: string
        search: string
        name: string
        email: string
        phone: string
        role: string
        status: string
        active: string
        inactive: string
        noUsers: string
    }

    /** Admin - Settings */
    adminSettings: {
        title: string
        salon: string
        salonName: string
        salonDescription: string
        contactInfo: string
        address: string
        phone: string
        email: string
        booking: string
        advanceBooking: string
        minNotice: string
        maxAdvance: string
        notifications: string
        enableNotifications: string
        schedule: string
        workingHours: string
        closed: string
        open: string
        breakTime: string
        save: string
        saved: string
        saving: string
    }

    /** Auth pages */
    auth: {
        login: string
        register: string
        email: string
        password: string
        confirmPassword: string
        forgotPassword: string
        noAccount: string
        hasAccount: string
        signUp: string
        signIn: string
        logout: string
        name: string
        phone: string
        createAccount: string
        welcomeBack: string
    }

    /** Errors */
    errors: {
        general: string
        networkError: string
        authError: string
        notFound: string
        unauthorized: string
        validationError: string
        bookingFailed: string
        cancelFailed: string
    }

    /** Notifications */
    notifications: {
        bookingCreated: string
        bookingConfirmed: string
        bookingCancelled: string
        bookingReminder: string
    }

    /** Status labels */
    status: {
        confirmed: string
        pending: string
        cancelled: string
        completed: string
    }

    /** Time labels */
    time: {
        today: string
        tomorrow: string
        yesterday: string
        morning: string
        afternoon: string
        evening: string
    }
}

// ============================================
// ROMANIAN TRANSLATIONS (DEFAULT)
// ============================================

export const ro: Translations = {
    common: {
        appName: 'Salonul Meu',
        loading: 'Se încarcă...',
        save: 'Salvează',
        cancel: 'Anulează',
        delete: 'Șterge',
        edit: 'Editează',
        add: 'Adaugă',
        confirm: 'Confirmă',
        back: 'Înapoi',
        next: 'Următorul',
        previous: 'Anterior',
        search: 'Caută',
        filter: 'Filtrează',
        all: 'Toate',
        none: 'Niciunul',
        yes: 'Da',
        no: 'Nu',
        close: 'Închide',
        open: 'Deschide',
        minutes: 'minute',
        hours: 'ore',
        days: 'zile',
        lei: 'LEI',
        currency: 'Lei',
    },

    welcome: {
        greeting: 'Bine ai venit',
        subtitle: 'Programări rapide și simple',
        bookAppointment: 'Programează o vizită',
    },

    stats: {
        totalAppointments: 'TOTAL PROGRAMĂRI',
        totalSpent: 'CHELTUIELI TOTALE',
        favoriteService: 'SERVICIU PREFERAT',
        popularServices: 'Servicii populare',
        yourBookings: 'Rezervările tale',
        noActiveBookings: 'Nu ai programări active.',
        loadingAppointments: 'Se încarcă programările...',
        loadingServices: 'Se încarcă serviciile...',
    },

    booking: {
        step1Title: 'Alege Serviciul',
        step2Title: 'Alege Data și Ora',
        step3Title: 'Confirmă Programarea',
        selectService: 'Alege serviciul dorit',
        selectDateTime: 'Selectează data și ora',
        confirmBooking: 'Confirmă programarea',
        chooseService: 'Alege',
        chooseDate: 'Alege data',
        chooseTime: 'Alege ora',
        noServices: 'Nu există servicii disponibile',
        noSlotsAvailable: 'Nu există intervale disponibile',
        bookingConfirmed: 'Programare confirmată!',
        bookingSuccess: 'Programarea ta a fost creată cu succes.',
        continueButton: 'Continuă',
        backButton: 'Înapoi',
        service: 'Serviciu',
        date: 'Data',
        time: 'Ora',
        price: 'Preț',
        duration: 'Durată',
    },

    dashboard: {
        welcome: 'Bine ai venit',
        welcomeBack: 'Bine ai revenit',
        quickActions: 'Acțiuni rapide',
        recentBookings: 'Programări recente',
        noBookings: 'Nu ai programări',
        viewAll: 'Vezi toate',
        activeBookings: 'Programări active',
        pastBookings: 'Programări trecute',
    },

    history: {
        title: 'Istoricul programărilor',
        all: 'Toate',
        completed: 'Finalizate',
        cancelled: 'Anulate',
        noHistory: 'Nu ai istoric de programări.',
        filter: 'Filtrează',
    },

    profile: {
        title: 'Profilul meu',
        accountInfo: 'Informații cont',
        notifications: 'Notificări',
        notificationSettings: 'Setări notificări',
        pushNotifications: 'Notificări push',
        bookingReminders: 'Mementouri programări',
        reminderTime: 'Timp înainte de programare',
        marketingNotifications: 'Notificări marketing',
        saveChanges: 'Salvează modificările',
        changesSaved: 'Modificările au fost salvate',
    },

    admin: {
        dashboard: 'Panou Admin',
        bookings: 'Programări',
        users: 'Clienți',
        settings: 'Setări',
        todayAppointments: 'Azi',
        pendingAppointments: 'În așteptare',
        totalUsers: 'Utilizatori',
        monthlyRevenue: 'Venit lunar',
        recentBookings: 'Programări recente',
        todaySchedule: 'Programul de azi',
        noAppointmentsToday: 'Nu sunt programări azi',
    },

    adminBookings: {
        title: 'Programări',
        all: 'Toate',
        confirmed: 'Confirmate',
        pending: 'În așteptare',
        completed: 'Finalizate',
        cancelled: 'Anulate',
        addBreak: 'Adaugă pauză',
        breakStart: 'Început pauză',
        breakEnd: 'Sfârșit pauză',
        noBreaks: 'Nu sunt pauze',
    },

    adminUsers: {
        title: 'Clienți',
        search: 'Caută clienți...',
        name: 'Nume',
        email: 'Email',
        phone: 'Telefon',
        role: 'Rol',
        status: 'Status',
        active: 'Activ',
        inactive: 'Inactiv',
        noUsers: 'Nu există clienți',
    },

    adminSettings: {
        title: 'Setări',
        salon: 'Salon',
        salonName: 'Nume salon',
        salonDescription: 'Descriere salon',
        contactInfo: 'Informații contact',
        address: 'Adresă',
        phone: 'Telefon',
        email: 'Email',
        booking: 'Programări',
        advanceBooking: 'Programare anticipată',
        minNotice: 'Notificare minimă',
        maxAdvance: 'Maxim zile în avans',
        notifications: 'Notificări',
        enableNotifications: 'Activează notificările',
        schedule: 'Program',
        workingHours: 'Ore de lucru',
        closed: 'Închis',
        open: 'Deschis',
        breakTime: 'Pauză',
        save: 'Salvează',
        saved: 'Salvat!',
        saving: 'Se salvează...',
    },

    auth: {
        login: 'Autentificare',
        register: 'Înregistrare',
        email: 'Email',
        password: 'Parolă',
        confirmPassword: 'Confirmă parola',
        forgotPassword: 'Ai uitat parola?',
        noAccount: 'Nu ai cont?',
        hasAccount: 'Ai deja cont?',
        signUp: 'Înregistrează-te',
        signIn: 'Autentifică-te',
        logout: 'Deconectare',
        name: 'Nume',
        phone: 'Telefon',
        createAccount: 'Creează cont',
        welcomeBack: 'Bine ai revenit!',
    },

    errors: {
        general: 'A apărut o eroare',
        networkError: 'Eroare de conexiune',
        authError: 'Eroare de autentificare',
        notFound: 'Nu a fost găsit',
        unauthorized: 'Nu ai acces',
        validationError: 'Date incorecte',
        bookingFailed: 'Programarea a eșuat',
        cancelFailed: 'Anularea a eșuat',
    },

    notifications: {
        bookingCreated: 'Programare creată',
        bookingConfirmed: 'Programare confirmată',
        bookingCancelled: 'Programare anulată',
        bookingReminder: 'Mementou programare',
    },

    status: {
        confirmed: 'Confirmată',
        pending: 'În așteptare',
        cancelled: 'Anulată',
        completed: 'Finalizată',
    },

    time: {
        today: 'Azi',
        tomorrow: 'Mâine',
        yesterday: 'Ieri',
        morning: 'Dimineață',
        afternoon: 'După-amiază',
        evening: 'Seară',
    },
}

// ============================================
// ENGLISH TRANSLATIONS
// ============================================

export const en: Translations = {
    common: {
        appName: 'My Salon',
        loading: 'Loading...',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete',
        edit: 'Edit',
        add: 'Add',
        confirm: 'Confirm',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        search: 'Search',
        filter: 'Filter',
        all: 'All',
        none: 'None',
        yes: 'Yes',
        no: 'No',
        close: 'Close',
        open: 'Open',
        minutes: 'minutes',
        hours: 'hours',
        days: 'days',
        lei: 'RON',
        currency: 'Lei',
    },

    welcome: {
        greeting: 'Welcome',
        subtitle: 'Quick and easy bookings',
        bookAppointment: 'Book an appointment',
    },

    stats: {
        totalAppointments: 'TOTAL BOOKINGS',
        totalSpent: 'TOTAL SPENT',
        favoriteService: 'FAVORITE SERVICE',
        popularServices: 'Popular services',
        yourBookings: 'Your bookings',
        noActiveBookings: 'You have no active bookings.',
        loadingAppointments: 'Loading bookings...',
        loadingServices: 'Loading services...',
    },

    booking: {
        step1Title: 'Choose Service',
        step2Title: 'Choose Date & Time',
        step3Title: 'Confirm Booking',
        selectService: 'Choose your service',
        selectDateTime: 'Select date and time',
        confirmBooking: 'Confirm booking',
        chooseService: 'Choose',
        chooseDate: 'Choose date',
        chooseTime: 'Choose time',
        noServices: 'No services available',
        noSlotsAvailable: 'No slots available',
        bookingConfirmed: 'Booking confirmed!',
        bookingSuccess: 'Your booking has been created successfully.',
        continueButton: 'Continue',
        backButton: 'Back',
        service: 'Service',
        date: 'Date',
        time: 'Time',
        price: 'Price',
        duration: 'Duration',
    },

    dashboard: {
        welcome: 'Welcome',
        welcomeBack: 'Welcome back',
        quickActions: 'Quick actions',
        recentBookings: 'Recent bookings',
        noBookings: 'No bookings',
        viewAll: 'View all',
        activeBookings: 'Active bookings',
        pastBookings: 'Past bookings',
    },

    history: {
        title: 'Booking history',
        all: 'All',
        completed: 'Completed',
        cancelled: 'Cancelled',
        noHistory: 'No booking history.',
        filter: 'Filter',
    },

    profile: {
        title: 'My Profile',
        accountInfo: 'Account Info',
        notifications: 'Notifications',
        notificationSettings: 'Notification settings',
        pushNotifications: 'Push notifications',
        bookingReminders: 'Booking reminders',
        reminderTime: 'Time before booking',
        marketingNotifications: 'Marketing notifications',
        saveChanges: 'Save changes',
        changesSaved: 'Changes saved',
    },

    admin: {
        dashboard: 'Admin Panel',
        bookings: 'Bookings',
        users: 'Clients',
        settings: 'Settings',
        todayAppointments: 'Today',
        pendingAppointments: 'Pending',
        totalUsers: 'Users',
        monthlyRevenue: 'Monthly revenue',
        recentBookings: 'Recent bookings',
        todaySchedule: 'Today\'s schedule',
        noAppointmentsToday: 'No appointments today',
    },

    adminBookings: {
        title: 'Bookings',
        all: 'All',
        confirmed: 'Confirmed',
        pending: 'Pending',
        completed: 'Completed',
        cancelled: 'Cancelled',
        addBreak: 'Add break',
        breakStart: 'Break start',
        breakEnd: 'Break end',
        noBreaks: 'No breaks',
    },

    adminUsers: {
        title: 'Clients',
        search: 'Search clients...',
        name: 'Name',
        email: 'Email',
        phone: 'Phone',
        role: 'Role',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        noUsers: 'No clients',
    },

    adminSettings: {
        title: 'Settings',
        salon: 'Salon',
        salonName: 'Salon name',
        salonDescription: 'Salon description',
        contactInfo: 'Contact info',
        address: 'Address',
        phone: 'Phone',
        email: 'Email',
        booking: 'Bookings',
        advanceBooking: 'Advance booking',
        minNotice: 'Minimum notice',
        maxAdvance: 'Max days in advance',
        notifications: 'Notifications',
        enableNotifications: 'Enable notifications',
        schedule: 'Schedule',
        workingHours: 'Working hours',
        closed: 'Closed',
        open: 'Open',
        breakTime: 'Break',
        save: 'Save',
        saved: 'Saved!',
        saving: 'Saving...',
    },

    auth: {
        login: 'Login',
        register: 'Register',
        email: 'Email',
        password: 'Password',
        confirmPassword: 'Confirm password',
        forgotPassword: 'Forgot password?',
        noAccount: 'No account?',
        hasAccount: 'Already have an account?',
        signUp: 'Sign up',
        signIn: 'Sign in',
        logout: 'Logout',
        name: 'Name',
        phone: 'Phone',
        createAccount: 'Create account',
        welcomeBack: 'Welcome back!',
    },

    errors: {
        general: 'An error occurred',
        networkError: 'Connection error',
        authError: 'Authentication error',
        notFound: 'Not found',
        unauthorized: 'Unauthorized',
        validationError: 'Invalid data',
        bookingFailed: 'Booking failed',
        cancelFailed: 'Cancellation failed',
    },

    notifications: {
        bookingCreated: 'Booking created',
        bookingConfirmed: 'Booking confirmed',
        bookingCancelled: 'Booking cancelled',
        bookingReminder: 'Booking reminder',
    },

    status: {
        confirmed: 'Confirmed',
        pending: 'Pending',
        cancelled: 'Cancelled',
        completed: 'Completed',
    },

    time: {
        today: 'Today',
        tomorrow: 'Tomorrow',
        yesterday: 'Yesterday',
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening',
    },
}

// ============================================
// EXPORT & HELPER FUNCTIONS
// ============================================

/**
 * Get translations for a specific language
 */
export const getTranslations = (lang: Language = 'ro'): Translations => {
    return lang === 'ro' ? ro : en
}

/**
 * Current language (default: Romanian)
 * In a real app, this would come from user preferences or URL
 */
export const currentLang: Language = 'ro'

/**
 * Get current translations
 */
export const t = getTranslations(currentLang)

// Re-export for convenience
export default { ro, en, getTranslations, t }
