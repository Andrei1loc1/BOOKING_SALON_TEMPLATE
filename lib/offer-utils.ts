// Utility functions for offer/discount calculations
import type { Offer, Service } from '@/types'

/**
 * Calculate the discounted price based on an offer
 */
export function calculateDiscountedPrice(price: number, offer: Offer): number {
    if (offer.discountType === 'percent') {
        return Math.round(price * (1 - offer.discountValue / 100))
    }
    return Math.max(0, price - offer.discountValue)
}

/**
 * Get the active offer from a list (first active offer)
 */
export function getActiveOffer(offers: Offer[]): Offer | null {
    return offers.length > 0 ? offers[0] : null
}

/**
 * Calculate discounted price for a service given a list of offers
 */
export function getDiscountedServicePrice(service: Service, offers: Offer[]): number | null {
    const offer = getActiveOffer(offers)
    if (!offer) return null
    return calculateDiscountedPrice(service.price, offer)
}

/**
 * Check if there are any active offers
 */
export function hasActiveOffer(offers: Offer[]): boolean {
    return offers.length > 0
}
