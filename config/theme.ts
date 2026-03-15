/**
 * ============================================
 * DYNAMIC THEMING SYSTEM
 * ============================================
 * 
 * This file handles dynamic theme application using CSS variables.
 * The colors from salonConfig are applied to CSS custom properties
 * that can be used throughout the application.
 * 
 * Usage:
 * - Import useTheme() hook in components to access theme
 * - Theme is applied to :root in globals.css
 * - Use CSS variables like var(--color-gold) in components
 * ============================================
 */

import { useState, useEffect, useCallback } from 'react'
import { THEME_COLORS, THEME_PRESETS, type ThemeColors } from './salonConfig'

// ============================================
// THEME TYPES
// ============================================

export interface Theme {
    colors: ThemeColors
    isDark: boolean
    fontSize: 'small' | 'medium' | 'large'
    borderRadius: 'none' | 'small' | 'medium' | 'large' | 'full'
}

export type ThemePreset = keyof typeof THEME_PRESETS

// ============================================
// DEFAULT THEME
// ============================================

const DEFAULT_THEME: Theme = {
    colors: THEME_COLORS,
    isDark: false,
    fontSize: 'medium',
    borderRadius: 'medium',
}

// ============================================
// CSS VARIABLE MAPPING
// ============================================

/**
 * Maps theme colors to CSS custom properties
 */
export const CSS_VARIABLES: Record<keyof ThemeColors, string> = {
    primary: '--color-primary',
    primaryLight: '--color-primary-light',
    secondary: '--color-secondary',
    gold: '--color-gold',
    goldLight: '--color-gold-light',
    gold2: '--color-gold-2',
    background: '--background',
    card: '--card',
    foreground: '--foreground',
    mutedForeground: '--muted-foreground',
    border: '--border',
}

// ============================================
// THEME HOOK
// ============================================

/**
 * Hook to access and manage theme
 */
export function useTheme() {
    const [theme, setTheme] = useState<Theme>(DEFAULT_THEME)
    const [isLoaded, setIsLoaded] = useState(false)

    // Apply theme to document
    const applyTheme = useCallback((newTheme: Theme) => {
        if (typeof document === 'undefined') return

        const root = document.documentElement

        // Apply colors
        Object.entries(newTheme.colors).forEach(([key, value]) => {
            const cssVar = CSS_VARIABLES[key as keyof ThemeColors]
            if (cssVar) {
                root.style.setProperty(cssVar, value)
            }
        })

        // Apply dark mode
        if (newTheme.isDark) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }

        // Apply font size
        const fontSizes = {
            small: '14px',
            medium: '16px',
            large: '18px',
        }
        root.style.setProperty('--font-base', fontSizes[newTheme.fontSize])

        // Apply border radius
        const radii = {
            none: '0',
            small: '0.25rem',
            medium: '0.625rem',
            large: '1rem',
            full: '9999px',
        }
        root.style.setProperty('--radius', radii[newTheme.borderRadius])
    }, [])

    // Initialize theme on mount
    useEffect(() => {
        applyTheme(theme)
        setIsLoaded(true)
    }, [theme, applyTheme])

    // Update specific color
    const updateColor = useCallback((key: keyof ThemeColors, value: string) => {
        setTheme(prev => ({
            ...prev,
            colors: {
                ...prev.colors,
                [key]: value,
            },
        }))
    }, [])

    // Apply preset
    const applyPreset = useCallback((preset: ThemePreset) => {
        const presetColors = THEME_PRESETS[preset]
        if (presetColors) {
            setTheme(prev => ({
                ...prev,
                colors: {
                    ...prev.colors,
                    ...presetColors,
                },
            }))
        }
    }, [])

    // Toggle dark mode
    const toggleDarkMode = useCallback(() => {
        setTheme(prev => ({ ...prev, isDark: !prev.isDark }))
    }, [])

    // Reset to default
    const resetTheme = useCallback(() => {
        setTheme(DEFAULT_THEME)
    }, [])

    return {
        theme,
        isLoaded,
        applyTheme,
        updateColor,
        applyPreset,
        toggleDarkMode,
        resetTheme,
        presets: Object.keys(THEME_PRESETS) as ThemePreset[],
    }
}

// ============================================
// THEME INITIALIZATION
// ============================================

/**
 * Initialize theme on app startup - call this in your root layout
 */
export function initializeTheme() {
    if (typeof document === 'undefined') return

    const root = document.documentElement

    // Apply default theme colors to CSS variables
    Object.entries(THEME_COLORS).forEach(([key, value]) => {
        const cssVar = CSS_VARIABLES[key as keyof ThemeColors]
        if (cssVar) {
            root.style.setProperty(cssVar, value)
        }
    })
}

// ============================================
// HELPER: GET GRADIENT STYLE
// ============================================

/**
 * Generate gradient style for cards/headers
 */
export function getGradientStyle(intensity: 'low' | 'medium' | 'high' = 'medium'): React.CSSProperties {
    const intensities = {
        low: 'rgba(0,0,0,0.02)',
        medium: 'rgba(0,0,0,0.05)',
        high: 'rgba(0,0,0,0.1)',
    }

    return {
        background: `radial-gradient(circle, ${intensities[intensity]} 0%, transparent 70%)`,
    }
}

/**
 * Generate gold gradient for buttons/accents
 */
export function getGoldGradient(): React.CSSProperties {
    return {
        background: 'linear-gradient(to right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
    }
}

/**
 * Generate gradient border style
 */
export function getGradientBorderStyle(): React.CSSProperties {
    return {
        background: 'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)',
    }
}

// ============================================
// STYLES EXPORT (for inline styles)
// ============================================

/**
 * Pre-built style objects for common components
 */
export const THEME_STYLES = {
    // Card gradient background
    cardGradient: {
        background: 'radial-gradient(circle, oklch(0.84 0.18 80 / 0.07) 0%, transparent 70%)',
    },

    // Gold accent text
    goldText: {
        color: 'var(--color-gold)',
    },

    // Gold gradient text
    goldGradientText: {
        background: 'linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-light) 50%, var(--color-gold) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
    },

    // Primary button
    primaryButton: {
        background: 'linear-gradient(to right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
        boxShadow: '0 4px 20px oklch(0.55 0.15 72 / 0.35)',
    },

    // Border gradient container
    borderGradient: {
        background: 'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)',
    },

    // Glow effect
    glow: {
        boxShadow: '0 12px 35px oklch(0.80 0.16 70 / 0.25)',
    },
}

// Export all presets for easy access
export { THEME_PRESETS }
