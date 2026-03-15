'use client'

import React, { useState } from 'react'
import { PencilIcon, User, Loader2 } from 'lucide-react'
import { GlowCard } from '@/components/ui/glow-card'
import { useAuth } from '@/hooks/useAuth'
import { updateUserProfile } from '@/actions/user-settings-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'

interface AccountInfoCardProps {
    className?: string
}

export function AccountInfoCard({ className }: AccountInfoCardProps) {
    const { profile, loading, user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [editName, setEditName] = useState('')
    const [editPhone, setEditPhone] = useState('')
    const [open, setOpen] = useState(false)

    const memberSince = profile?.created_at
        ? new Date(profile.created_at).toLocaleDateString('ro-RO', { year: 'numeric', month: 'long' })
        : '—'

    const handleOpenEdit = () => {
        setEditName(profile?.name ?? '')
        setEditPhone(profile?.phone ?? '')
        setOpen(true)
    }

    const handleSave = async () => {
        if (!user?.uid) return

        setIsSaving(true)
        const result = await updateUserProfile(user.uid, {
            name: editName,
            phone: editPhone,
        })
        setIsSaving(false)

        if (result.success) {
            setOpen(false)
            // Force refresh the auth context by reloading
            window.location.reload()
        }
    }

    if (loading) {
        return (
            <GlowCard className={`!mx-0 !mt-0 w-full bg-card rounded-[calc(1.5rem-1px)] !border-0 !shadow-none !ring-0 before:hidden after:hidden px-5 ${className}`}>
                <div className="py-4 flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">Se încarcă...</span>
                </div>
            </GlowCard>
        )
    }

    return (
        <GlowCard
            className={`!mx-0 !mt-0 w-full bg-card rounded-[calc(1.5rem-1px)] !border-0 !shadow-none !ring-0 before:hidden after:hidden px-5 ${className}`}
        >
            <button
                onClick={handleOpenEdit}
                className="absolute p-1 hover:opacity-70 transition-opacity right-4 bottom-2"
            >
                <div className='flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors'
                    style={{
                        background: 'oklch(0.20 0.04 80 / 0.3)',
                        border: '1px solid oklch(0.84 0.18 80 / 0.2)',
                        color: 'oklch(0.84 0.18 80)',
                    }}>
                    <PencilIcon className="w-3 h-3" />
                    Editeaza
                </div>
            </button>
            <div className="py-1 mb-3">
                <div className="flex items-center justify-between py-3.5 border-b border-border">
                    <span className="text-sm text-muted-foreground">Nume</span>
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{profile?.name ?? '—'}</span>
                    </div>
                </div>
                <InfoRow label="Telefon" value={profile?.phone ?? '—'} />
                <InfoRow label="Membru din" value={memberSince} />
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent
                    className="sm:max-w-[400px] overflow-hidden p-0 bg-transparent border-0 shadow-none"
                >
                    <div
                        className="relative rounded-3xl p-[1px]"
                        style={{ background: 'linear-gradient(135deg, oklch(0.55 0.15 72) 0%, transparent 35%, transparent 65%, oklch(0.84 0.18 80) 100%)' }}
                    >
                        <div className="relative bg-[oklch(0.14_0_0)] rounded-[calc(1.5rem-1px)] p-6">
                            <DialogHeader>
                                <DialogTitle className="text-xl font-bold text-gold-gradient flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Editează datele contului
                                </DialogTitle>
                                <DialogDescription className="text-zinc-400">
                                    Modifică numele și numărul de telefon asociate contului tău.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400 flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" />
                                        Nume
                                    </label>
                                    <Input
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        placeholder="Numele tău"
                                        className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-medium text-zinc-400">
                                        Telefon
                                    </label>
                                    <Input
                                        value={editPhone}
                                        onChange={(e) => setEditPhone(e.target.value)}
                                        placeholder="Numărul de telefon"
                                        className="bg-black/30 border-white/10 focus:border-gold/50 focus:ring-1 focus:ring-gold/20"
                                    />
                                </div>
                            </div>
                            <DialogFooter className="pt-2 flex gap-3">
                                <Button
                                    variant="ghost"
                                    className="flex-1 border border-white/10 text-zinc-400 hover:bg-white/5 hover:text-zinc-300"
                                    onClick={() => setOpen(false)}
                                >
                                    Anulează
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="flex-1 !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))] text-black font-bold hover:opacity-90"
                                >
                                    {isSaving ? <Loader2 className="animate-spin h-4 w-4" /> : 'Salvează'}
                                </Button>
                            </DialogFooter>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </GlowCard>
    )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

interface InfoRowProps {
    label: string
    value: string
}

function InfoRow({ label, value }: InfoRowProps) {
    return (
        <div className="flex items-center justify-between py-3.5 border-b border-border last:border-0">
            <span className="text-sm text-muted-foreground">{label}</span>
            <span className="text-sm font-medium text-foreground">{value}</span>
        </div>
    )
}

export default AccountInfoCard
