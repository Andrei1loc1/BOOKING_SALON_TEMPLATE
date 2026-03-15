'use client'

import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Percent, Tag, Calendar, Loader2, Sparkles, Clock } from 'lucide-react'
import { createOffer } from '@/actions/admin-actions'
import { toast } from 'sonner'
import type { Offer } from '@/types'
import {
    OFFER_DEFAULT_VALUES,
    OFFER_LABELS,
    OFFER_DIALOG,
} from '@/config/offerConfig'

interface AddOfferModalProps {
    onSuccess?: () => void
}

const AddOfferModal = ({ onSuccess }: AddOfferModalProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<Omit<Offer, 'id' | 'created_at'>>({
        ...OFFER_DEFAULT_VALUES,
        badge: 'OFERTĂ',
        discountType: 'percent',
        active: true,
        valid_from: new Date().toISOString().split('T')[0],
        valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await createOffer(formData)
            toast.success(OFFER_DIALOG.successMessage)
            setOpen(false)
            setFormData({
                ...OFFER_DEFAULT_VALUES,
                badge: 'OFERTĂ',
                discountType: 'percent',
                active: true,
                valid_from: new Date().toISOString().split('T')[0],
                valid_until: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            })
            onSuccess?.()
        } catch (error) {
            console.error(error)
            toast.error(OFFER_DIALOG.errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="
                        w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border font-bold text-sm transition-all active:scale-[0.98]
                        !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))]
                        shadow-[0_12px_35px] shadow-gold-2/25
                        relative overflow-hidden
                    "
                    style={{
                        borderColor: 'oklch(0.84 0.18 80 / 0.4)',
                        color: 'oklch(0.15 0 0)',
                    }}
                >
                    <span
                        className="
                          pointer-events-none absolute inset-0
                          bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.0))]
                          opacity-30
                        "
                    />
                    <Plus size={18} strokeWidth={2.5} className="relative" />
                    <span className="relative">{OFFER_DIALOG.triggerText}</span>
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto overflow-hidden p-0 bg-transparent border-0 shadow-none">
                <div className="relative rounded-3xl p-[1px]" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.15 72) 0%, transparent 35%, transparent 65%, oklch(0.84 0.18 80) 100%)' }}>
                    <div className="relative bg-[oklch(0.14_0_0)] rounded-[calc(1.5rem-1px)] p-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gold-gradient flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                {OFFER_DIALOG.title}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                {OFFER_DIALOG.description}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                            {/* Section 1: Basic Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-2 border-b border-white/5">
                                    <Sparkles className="w-3.5 h-3.5" />
                                    <span>Informații generale</span>
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="title" className="text-xs font-medium text-zinc-400">
                                            {OFFER_LABELS.title}
                                        </Label>
                                        <Input
                                            id="title"
                                            placeholder={OFFER_LABELS.titlePlaceholder}
                                            className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="description" className="text-xs font-medium text-zinc-400">
                                            {OFFER_LABELS.description}
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder={OFFER_LABELS.descriptionPlaceholder}
                                            className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 min-h-[80px] resize-none"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Offer Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-2 border-b border-white/5">
                                    <Tag className="w-3.5 h-3.5" />
                                    <span>Detalii ofertă</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="value" className="text-xs font-medium text-zinc-400">
                                            {OFFER_LABELS.discountValue}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="value"
                                                type="number"
                                                className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 pl-9"
                                                value={formData.discountValue}
                                                onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                                required
                                            />
                                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Validity */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 pb-2 border-b border-white/5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Perioada de valabilitate</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="valid_from" className="text-xs font-medium text-zinc-400">
                                            {OFFER_LABELS.validFrom}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="valid_from"
                                                type="date"
                                                className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 pl-9"
                                                value={formData.valid_from}
                                                onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
                                                required
                                            />
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label htmlFor="valid_until" className="text-xs font-medium text-zinc-400">
                                            {OFFER_LABELS.validUntil}
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="valid_until"
                                                type="date"
                                                className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20 pl-9"
                                                value={formData.valid_until}
                                                onChange={(e) => setFormData({ ...formData, valid_until: e.target.value })}
                                                required
                                            />
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-2 flex gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1 border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-300"
                                    onClick={() => setOpen(false)}
                                >
                                    {OFFER_DIALOG.cancelText}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))] text-black font-bold hover:opacity-90"
                                >
                                    {loading ? <Loader2 className="animate-spin h-4 w-4" /> : OFFER_DIALOG.submitText}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddOfferModal
