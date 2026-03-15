'use client'

import React from 'react'
import { Gift, Sparkles, Star } from 'lucide-react'
import type { Offer } from '@/types'

interface OfferBadgeProps {
    offer: Offer
    currency?: string
}

// Confetti particles
const Confetti = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
            <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-sm animate-confetti"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: -10,
                    background: ['#FFD700', '#FF6B6B', '#4ECDC4', '#A855F7', '#F97316'][i % 5],
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${2 + Math.random() * 2}s`,
                }}
            />
        ))}
    </div>
)

export default function OfferBadge({ offer, currency = 'LEI' }: OfferBadgeProps) {
    return (
        <div className="relative -mb-2 mt-6 mx-1">
            <Confetti />

            <div
                className="relative overflow-hidden rounded-2xl py-3 px-4"
                style={{
                    background: 'linear-gradient(135deg, oklch(0.55 0.15 72 / 0.2) 0%, oklch(0.84 0.18 80 / 0.15) 50%, oklch(0.55 0.15 72 / 0.2) 100%)',
                    border: '1px solid oklch(0.84 0.18 80 / 0.3)',
                    boxShadow: '0 0 30px oklch(0.84 0.18 80 / 0.15), inset 0 1px 0 oklch(1 0 0 / 0.1)',
                }}
            >
                {/* Sparkle effects */}
                <div className="absolute top-1 left-2">
                    <Sparkles size={12} className="text-gold-light animate-pulse" style={{ opacity: 0.6 }} />
                </div>
                <div className="absolute top-2 right-3">
                    <Star size={10} className="text-gold-light animate-pulse" style={{ opacity: 0.8, animationDelay: '0.5s' }} />
                </div>

                <div className="flex items-center justify-center gap-3">
                    <div className="relative">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
                            style={{
                                background: 'linear-gradient(135deg, oklch(0.84 0.18 80), oklch(0.92 0.12 85))',
                                boxShadow: '0 2px 10px oklch(0.84 0.18 80 / 0.5)',
                            }}
                        >
                            <Gift size={16} className="text-black" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-1 -right-1">
                            <Sparkles size={8} className="text-gold-light" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-xs font-semibold uppercase tracking-wider text-gold-light">
                            Surpriză pentru tine!
                        </p>
                        <div className="flex items-center justify-center gap-2 mt-0.5">
                            <span className="text-lg font-black text-gold-gradient">
                                -{offer.discountValue}{offer.discountType === 'percent' ? '%' : ` ${currency}`}
                            </span>
                            <span className="text-xs text-white/60">reducere</span>
                        </div>
                    </div>

                    <div className="relative">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center animate-bounce"
                            style={{
                                background: 'linear-gradient(135deg, oklch(0.84 0.18 80), oklch(0.92 0.12 85))',
                                boxShadow: '0 2px 10px oklch(0.84 0.18 80 / 0.5)',
                            }}
                        >
                            <Gift size={16} className="text-black" strokeWidth={2.5} />
                        </div>
                        <div className="absolute -top-1 -left-1">
                            <Sparkles size={8} className="text-gold-light" />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes confetti {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(150px) rotate(720deg);
                        opacity: 0;
                    }
                }
                .animate-confetti {
                    animation: confetti 3s ease-out forwards;
                }
            `}</style>
        </div>
    )
}
