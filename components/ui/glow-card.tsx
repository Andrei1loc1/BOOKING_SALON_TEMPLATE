import * as React from "react"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

export function GlowCard({
    className,
    ...props
}: React.ComponentProps<typeof Card>) {
    return (
        <Card
            className={cn(
                "relative overflow-hidden rounded-3xl",
                "bg-card border-none",
                "shadow-[0_18px_60px_rgba(0,0,0,0.55)]",
                // gold ring
                "ring-1 ring-gold/25",
                className
            )}
            {...props}
        />
    )
}