'use client'

import React from 'react'
import { GlowCard } from '@/components/ui/glow-card'
import { Sparkles, Tag, ArrowRight } from 'lucide-react'
import type { Offer } from '@/types'
import { useSettings } from '@/hooks/useSettings'

interface OfferCardProps {
    offer: Offer
}

const OfferCard = ({ offer }: OfferCardProps) => {
    const { settings } = useSettings()
    const currency = settings?.currency || 'LEI'
    return (
        <div className="relative overflow-hidden rounded-3xl p-[1px]">
            <div
                className="absolute inset-0 animate-pulse opacity-50"
                style={{ background: 'linear-gradient(45deg, oklch(0.55 0.15 72) 0%, oklch(0.84 0.18 80) 100%)' }}
            />
            <GlowCard className="!mx-0 !mt-0 relative overflow-hidden bg-black/90 backdrop-blur-xl border-0 rounded-[calc(1.5rem-1px)] p-5">
                {/* Badge */}
                <div
                    className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold tracking-tighter text-black uppercase"
                    style={{ background: 'linear-gradient(135deg, oklch(0.55 0.15 72), oklch(0.84 0.18 80))' }}
                >
                    {offer.badge || 'OFERTĂ'}
                </div>

                <div className="flex gap-4 items-start">
                    {/* Icon container */}
                    <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                        <div
                            className="absolute inset-0"
                            style={{ background: 'linear-gradient(135deg, oklch(0.84 0.18 80) 0%, oklch(0.55 0.15 72) 100%)' }}
                        />
                        <Tag className="text-black relative z-10" size={22} strokeWidth={2.5} />
                    </div>

                    <div className="flex flex-col gap-1 pr-12">
                        <h3 className="text-lg font-bold text-white leading-tight">
                            {offer.title}
                        </h3>
                        <p className="text-zinc-400 text-sm line-clamp-2">
                            {offer.description}
                        </p>
                    </div>
                </div>

                {/* Bottom section */}
                <div className="mt-5 flex items-end justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-widest">
                            Reducere
                        </span>
                        <span className="text-2xl font-black text-gold-gradient">
                            -{offer.discountValue}{offer.discountType === 'percent' ? '%' : ` ${currency}`}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-zinc-400 text-xs font-semibold group cursor-pointer hover:text-white transition-colors">
                        Rezervă acum
                        <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[oklch(0.84_0.18_80)] group-hover:text-black transition-all">
                            <ArrowRight size={14} />
                        </div>
                    </div>
                </div>

                {/* Decorative sparkles */}
                <Sparkles
                    className="absolute -bottom-2 -left-2 text-gold-gradient opacity-10"
                    size={64}
                />
            </GlowCard>
        </div>
    )
}

export default OfferCard
