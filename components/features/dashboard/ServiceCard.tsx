import React from 'react'

const ScissorsIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="20" y1="4" x2="8.12" y2="15.88" />
        <line x1="14.47" y1="14.48" x2="20" y2="20" />
        <line x1="8.12" y1="8.12" x2="12" y2="12" />
    </svg>
)

interface ServiceCardProps {
    title: string
    duration: string
    price: string
    description: string
    icon?: React.ReactNode
}

const ServiceCard = ({
    title,
    duration,
    price,
    description,
    icon,
}: ServiceCardProps) => {
    return (
        <div className="
            rounded-2xl border border-gold/20
            bg-card
            p-4
            flex flex-col gap-3
            shadow-[0_4px_24px_oklch(0_0_0/0.3)]
        ">
            {/* Top row: icon + title/duration + price */}
            <div className="flex items-center gap-3">

                {/* Icon */}
                <div
                    className="
                        w-12 h-12 rounded-xl flex-shrink-0
                        flex items-center justify-center
                        text-black
                    "
                    style={{
                        background: 'linear-gradient(to bottom right, oklch(0.55 0.15 72), var(--color-gold-light), oklch(0.55 0.15 72))',
                        boxShadow: '0 3px 14px oklch(0.55 0.15 72 / 0.40)',
                    }}
                >
                    {icon ?? <ScissorsIcon />}
                </div>

                {/* Title + duration */}
                <div className="flex flex-col flex-1 min-w-0">
                    <span className="font-bold text-base text-foreground leading-tight">{title}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 tracking-wider uppercase">{duration}</span>
                </div>

                {/* Price badge */}
                <div className="
                    flex-shrink-0
                    px-6 py-0.6 rounded-2xl
                    border border-gold/40
                    bg-gold/5
                ">
                    <span className="text-sm font-bold text-gold-light tracking-wider">{price}</span>
                </div>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export default ServiceCard