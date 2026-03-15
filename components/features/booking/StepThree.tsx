'use client'

import React from 'react'
import { Scissors, Calendar, DollarSign, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatDateLong } from '@/lib/date-utils'
import type { Service, Offer } from '@/types'
import { getActiveOffer, calculateDiscountedPrice } from '@/lib/offer-utils'

interface StepThreeProps {
    service: Service
    offers?: Offer[]
    date: Date
    time: string
    onBack: () => void
    onConfirm: () => void
    submitting: boolean
    currency?: string
}

interface RowItem {
    icon: React.ReactNode
    label: string
    value: React.ReactNode
}

function buildRows(service: Service, date: Date, time: string, offers: Offer[], currency: string = 'LEI'): RowItem[] {
    const activeOffer = getActiveOffer(offers)
    const discountedPrice = activeOffer ? calculateDiscountedPrice(service.price, activeOffer) : null

    return [
        { icon: <Scissors size={19} strokeWidth={2} />, label: 'Serviciu', value: service.name },
        { icon: <Calendar size={19} strokeWidth={2} />, label: 'Data și Ora', value: `${formatDateLong(date)} la ${time}` },
        {
            icon: <DollarSign size={19} strokeWidth={2} />,
            label: 'Preț',
            value: discountedPrice !== null ? (
                <span className="flex items-center gap-2">
                    <span className="line-through text-white/40 text-sm">{service.price} {currency}</span>
                    <span className="text-gold-light font-bold">{discountedPrice} {currency}</span>
                </span>
            ) : `${service.price} {currency}`,
        },
    ]
}

export default function StepThree({ service, offers = [], date, time, onBack, onConfirm, submitting, currency = 'LEI' }: StepThreeProps) {
    const items = buildRows(service, date, time, offers, currency)
    const activeOffer = getActiveOffer(offers)

    return (
        <div className="px-5 pb-8">
            <div className="relative overflow-hidden rounded-[22px] mb-8" style={{ background: 'oklch(0.13 0 0)', boxShadow: '0 8px 40px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(0.22 0 0)' }}>
                <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: 'linear-gradient(90deg, transparent 5%, oklch(0.84 0.18 80 / 0.35) 40%, oklch(0.90 0.10 83 / 0.5) 50%, oklch(0.84 0.18 80 / 0.35) 60%, transparent 95%)' }} />
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, oklch(0.84 0.18 80 / 0.04) 0%, transparent 70%)' }} />

                <div className="relative flex flex-col divide-y divide-[oklch(0.19_0_0)]">
                    {items.map((row) => (
                        <div key={row.label} className="flex items-center gap-4 px-5 py-4">
                            <div className="w-10 h-10 rounded-[11px] shrink-0 flex items-center justify-center text-[oklch(0.12_0_0)]" style={{ background: 'linear-gradient(to bottom right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))', boxShadow: '0 3px 14px oklch(0.55 0.15 72 / 0.40)' }}>
                                {row.icon}
                            </div>
                            <div className="flex flex-col gap-[2px] min-w-0">
                                <span className="text-[10px] font-semibold uppercase tracking-[0.7px] text-[oklch(0.40_0_0)]">{row.label}</span>
                                <span className="text-[14px] font-semibold text-[oklch(0.88_0_0)] leading-snug">{row.value}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex items-center gap-3">
                <Button variant="ghost" onClick={onBack} className="shrink-0 h-12 px-5 rounded-[16px] text-sm font-semibold text-[oklch(0.50_0_0)] hover:text-[oklch(0.75_0_0)] hover:bg-[oklch(0.16_0_0)] border border-[oklch(0.22_0_0)]">
                    Înapoi
                </Button>
                <Button onClick={onConfirm} disabled={submitting} className="flex-1 h-12 rounded-[16px] font-bold text-[14px] text-[oklch(0.10_0_0)] flex items-center justify-center gap-2 border-0 transition-opacity disabled:opacity-60" style={{ background: 'linear-gradient(to right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))', boxShadow: '0 4px 24px oklch(0.55 0.15 72 / 0.35)' }}>
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                    {submitting ? 'Se salvează…' : 'Confirmă Programarea'}
                </Button>
            </div>
        </div>
    )
}
