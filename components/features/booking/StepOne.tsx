'use client'

import React from 'react'
import { Scissors, Crown, Smile, Clock, ChevronRight } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import type { Service, Offer } from '@/types'
import { getActiveOffer, calculateDiscountedPrice } from '@/lib/offer-utils'
import OfferBadge from './OfferBadge'

const ICON_MAP: Record<string, React.ReactNode> = {
    scissors: <Scissors size={20} strokeWidth={2} />,
    crown: <Crown size={20} strokeWidth={2} />,
    smile: <Smile size={20} strokeWidth={2} />,
}

function getIcon(icon: string) {
    return ICON_MAP[icon] ?? <Scissors size={20} strokeWidth={2} />
}

interface StepOneProps {
    services: Service[]
    offers: Offer[]
    loading: boolean
    selected: Service | null
    onSelect: (s: Service) => void
    currency?: string
}

export default function StepOne({ services, offers, loading, selected, onSelect, currency = 'LEI' }: StepOneProps) {
    const activeOffer = getActiveOffer(offers)

    return (
        <div className="flex flex-col gap-6 px-5 pb-6 mt-10">
            {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="w-full h-[88px] rounded-[20px] bg-[oklch(0.16_0_0)]" />
                ))
            ) : (
                <>
                    {services.map((service) => {
                        const isSelected = selected?.id === service.id
                        const discountedPrice = activeOffer
                            ? calculateDiscountedPrice(service.price, activeOffer)
                            : null

                        return (
                            <button
                                key={service.id}
                                onClick={() => onSelect(service)}
                                className="relative w-full overflow-hidden rounded-[20px] text-left transition-all duration-200 active:scale-[0.98]"
                                style={{
                                    background: isSelected ? 'oklch(0.13 0.01 80)' : 'oklch(0.13 0 0)',
                                    border: '1px solid oklch(0.84 0.18 80 / 0.10)',
                                    boxShadow: isSelected ? '0 6px 24px oklch(0.84 0.18 80 / 0.07)' : '0 4px 16px oklch(0 0 0 / 0.4)',
                                }}
                            >
                                {isSelected && (
                                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.4), oklch(0.92 0.10 83 / 0.6), oklch(0.84 0.18 80 / 0.4), transparent)' }} />
                                )}
                                {isSelected && (
                                    <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(0.84 0.18 80 / 0.04) 0%, transparent 70%)' }} />
                                )}

                                <div className="relative flex items-center gap-4 px-4 py-5">
                                    <div className="w-12 h-12 rounded-[14px] shrink-0 flex items-center justify-center text-[oklch(0.10_0_0)] shadow-lg" style={{ background: 'linear-gradient(to bottom right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))', boxShadow: '0 3px 14px oklch(0.55 0.15 72 / 0.40)' }}>
                                        {getIcon(service.icon)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-[15px] leading-tight" style={{ color: isSelected ? 'oklch(0.97 0 0)' : 'oklch(0.90 0 0)' }}>
                                            {service.name}
                                        </p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock size={11} color="oklch(0.50 0 0)" />
                                            <p className="text-[12px] text-[oklch(0.50_0_0)]">{service.duration} min</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <div className="px-3 py-1.5 rounded-[10px]" style={{ background: isSelected ? 'oklch(0.84 0.18 80 / 0.08)' : 'oklch(0.18 0 0)', border: `1px solid ${isSelected ? 'oklch(0.84 0.18 80 / 0.20)' : 'oklch(0.26 0 0)'}` }}>
                                            {discountedPrice !== null ? (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-bold text-[13px] line-through text-white/40">{service.price}</span>
                                                    <span className="font-bold text-[15px] text-gold-light">{discountedPrice} {currency}</span>
                                                </div>
                                            ) : (
                                                <span className="font-bold text-[15px] text-white">{service.price} {currency}</span>
                                            )}
                                        </div>
                                        <ChevronRight size={16} style={{ color: isSelected ? 'oklch(0.60 0.08 78)' : 'oklch(0.30 0 0)' }} />
                                    </div>
                                </div>
                            </button>
                        )
                    })}

                    {activeOffer && <OfferBadge offer={activeOffer} currency={currency} />}
                </>
            )}
        </div>
    )
}
