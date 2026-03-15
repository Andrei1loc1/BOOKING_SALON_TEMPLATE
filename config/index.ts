/**
 * ============================================
 * CONFIG INDEX
 * ============================================
 * 
 * Central export point for all configuration files.
 * Import from here for convenience.
 * ============================================
 */

// Salon Configuration
export {
    SALON_CONFIG,
    BUSINESS_INFO,
    THEME_COLORS,
    FEATURE_FLAGS,
    BUSINESS_RULES,
    DEFAULT_SERVICES,
    DEFAULT_SCHEDULE,
    formatPrice,
    formatDuration,
    hasFeature,
    type SalonConfig,
    type BusinessInfo,
    type ThemeColors,
    type FeatureFlags,
    type BusinessRules,
    type WeeklySchedule,
    type DaySchedule,
} from './salonConfig'

// Translations
export {
    ro,
    en,
    getTranslations,
    t,
    currentLang,
    type Translations,
    type Language,
} from './translations'

// Theme
export {
    useTheme,
    initializeTheme,
    getGradientStyle,
    getGoldGradient,
    getGradientBorderStyle,
    THEME_STYLES,
    CSS_VARIABLES,
    type Theme,
    type ThemePreset,
} from './theme'

// Theme Presets
export { THEME_PRESETS } from './theme'

// Booking config
export {
    BOOKING_TITLES,
    BOOKING_STYLES,
    TOTAL_STEPS,
} from './bookingConfig'

// Admin config
export {
    ADMIN_STATS_CONFIG,
    BOOKING_FILTER_TABS,
} from './adminConfig'

// Status config
export { statusConfig as STATUS_CONFIG } from './statusConfig'

// ============================================
// QUICK REFERENCE
// ============================================

/**
 * Quick reference for using configurations:
 * 
 * // Get business name
 * import { BUSINESS_INFO } from '@/config'
 * <h1>{BUSINESS_INFO.name}</h1>
 * 
 * // Format price
 * import { formatPrice } from '@/config'
 * <span>{formatPrice(50)}</span> // "50 LEI"
 * 
 * // Use translations
 * import { t } from '@/config'
 * <p>{t.welcome.greeting}</p>
 * 
 * // Check feature
 * import { hasFeature } from '@/config'
 * {hasFeature('offers') && <OffersSection />}
 * 
 * // Use theme styles
 * import { THEME_STYLES } from '@/config'
 * <div style={THEME_STYLES.goldGradientText}>Title</div>
 */
