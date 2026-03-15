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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { Clock, Loader2, Coffee } from 'lucide-react'
import { createBlockedSlot } from '@/actions/admin-actions'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import {
    BREAK_DEFAULT_VALUES,
    BREAK_LABELS,
    BREAK_DURATION_OPTIONS,
    BREAK_DIALOG,
} from '@/config/breakConfig'

interface AddBreakModalProps {
    onSuccess?: () => void
}

const AddBreakModal = ({ onSuccess }: AddBreakModalProps) => {
    const { user } = useAuth()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState(BREAK_DEFAULT_VALUES)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        try {
            await createBlockedSlot({
                ...formData,
                created_by: user.uid,
                date_time: `${formData.date}T${formData.time}`,
            })
            toast.success(BREAK_DIALOG.successMessage)
            setOpen(false)
            onSuccess?.()
        } catch (error) {
            console.error(error)
            toast.error(BREAK_DIALOG.errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border font-bold text-sm transition-all active:scale-[0.98] group"
                    style={{
                        background: 'transparent',
                        borderColor: 'oklch(0.84 0.18 80 / 0.3)',
                        color: 'oklch(0.84 0.18 80)',
                    }}
                >
                    <Coffee size={18} className="group-hover:rotate-12 transition-transform" />
                    {BREAK_DIALOG.triggerText}
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] overflow-hidden p-0 bg-transparent border-0 shadow-none">
                <div className="relative rounded-3xl p-[1px]" style={{ background: 'linear-gradient(135deg, oklch(0.84 0.18 80) 0%, transparent 35%, transparent 65%, oklch(0.55 0.15 72) 100%)' }}>
                    <div className="relative bg-[oklch(0.14_0_0)] rounded-[calc(1.5rem-1px)] p-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gold-gradient">
                                {BREAK_DIALOG.title}
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                {BREAK_DIALOG.description}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="date" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    {BREAK_LABELS.date}
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="date"
                                        type="date"
                                        className="bg-black/20 border-white/10 pl-10"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                    <Clock className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="time" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        {BREAK_LABELS.time}
                                    </Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        className="bg-black/20 border-white/10"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="duration" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                        {BREAK_LABELS.duration}
                                    </Label>
                                    <Select
                                        value={String(formData.duration)}
                                        onValueChange={(val) => setFormData({ ...formData, duration: Number(val) })}
                                    >
                                        <SelectTrigger className="bg-black/20 border-white/10">
                                            <SelectValue placeholder="Selectează" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-zinc-900 border-white/10 text-white">
                                            {BREAK_DURATION_OPTIONS.map((option) => (
                                                <SelectItem key={option.value} value={String(option.value)}>{option.label}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="reason" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    {BREAK_LABELS.reason}
                                </Label>
                                <Input
                                    id="reason"
                                    placeholder={BREAK_LABELS.reasonPlaceholder}
                                    className="bg-black/20 border-white/10"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex gap-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    className="flex-1 border border-white/10 text-zinc-400 hover:bg-white/5"
                                    onClick={() => setOpen(false)}
                                >
                                    {BREAK_DIALOG.cancelText}
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))] text-black font-bold hover:opacity-90"
                                >
                                    {loading ? <Loader2 className="animate-spin h-4 w-4" /> : BREAK_DIALOG.submitText}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddBreakModal
