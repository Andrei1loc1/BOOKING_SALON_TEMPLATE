/**
 * ============================================
 * TEMPLATES INDEX
 * ============================================
 * 
 * Pre-made templates for different business types.
 * Simply copy the desired template to config/salonConfig.ts
 * and modify as needed.
 * ============================================
 */

export { BARBERSHOP_TEMPLATE } from './barbershop'
export { BEAUTY_SALON_TEMPLATE } from './beautysalon'

// ============================================
// HOW TO USE TEMPLATES
// ============================================

/**
 * To create a new white-label deployment:
 * 
 * 1. Choose a template or start fresh:
 *    - BARBERSHOP_TEMPLATE - For barber shops
 *    - BEAUTY_SALON_TEMPLATE - For beauty/wellness salons
 * 
 * 2. Copy the template content to config/salonConfig.ts
 * 
 * 3. Modify the values:
 *    - business.name - Your salon name
 *    - business.contact - Phone, email, address
 *    - theme.colors - Your brand colors
 *    - services - Your service list
 *    - schedule - Your working hours
 * 
 * 4. Add your logo to public/logo.svg
 * 
 * 5. Deploy!
 * 
 * That's it! The entire app is now customized for your business.
 */

// Available templates
export const TEMPLATES = {
    barbershop: 'BARBERSHOP_TEMPLATE',
    beautysalon: 'BEAUTY_SALON_TEMPLATE',
} as const

export type TemplateType = keyof typeof TEMPLATES
