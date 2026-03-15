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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, UserPlus, Loader2 } from 'lucide-react'
import { createEmployee } from '@/actions/admin-actions'
import { toast } from 'sonner'

interface AddEmployeeModalProps {
    onSuccess?: () => void
}

const AddEmployeeModal = ({ onSuccess }: AddEmployeeModalProps) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.name.trim() || !formData.phone.trim()) {
            toast.error('Completează numele și telefonul')
            return
        }
        setLoading(true)
        try {
            await createEmployee({
                name: formData.name.trim(),
                phone: formData.phone.trim(),
            })
            toast.success('Angajat adăugat cu succes!')
            setOpen(false)
            setFormData({ name: '', phone: '' })
            onSuccess?.()
        } catch (error) {
            console.error(error)
            toast.error('Eroare la adăugarea angajatului.')
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
                    <UserPlus size={18} className="group-hover:rotate-12 transition-transform" />
                    Adaugă Angajat
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto overflow-hidden p-0 bg-transparent border-0 shadow-none">
                <div className="relative rounded-3xl p-[1px]" style={{ background: 'linear-gradient(135deg, oklch(0.55 0.15 72) 0%, transparent 35%, transparent 65%, oklch(0.84 0.18 80) 100%)' }}>
                    <div className="relative bg-[oklch(0.14_0_0)] rounded-[calc(1.5rem-1px)] p-6">
                        <DialogHeader>
                            <DialogTitle className="text-xl font-bold text-gold-gradient flex items-center gap-2">
                                <UserPlus className="w-5 h-5" />
                                Adaugă Angajat
                            </DialogTitle>
                            <DialogDescription className="text-zinc-400">
                                Completează datele pentru a adăuga un nou angajat.
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="name" className="text-sm font-medium text-zinc-300">
                                    Nume complet
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Ex: Ion Popescu"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className="h-11 rounded-xl bg-[oklch(0.15_0_0)] border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="phone" className="text-sm font-medium text-zinc-300">
                                    Telefon
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Ex: 0723456789"
                                    value={formData.phone}
                                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    className="h-11 rounded-xl bg-[oklch(0.15_0_0)] border-zinc-700 text-zinc-100 placeholder:text-zinc-500"
                                />
                            </div>

                            <div className="flex gap-3 mt-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="
                                        flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border font-bold text-sm transition-all active:scale-[0.98]
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
                                    {loading ? (
                                        <Loader2 className="w-4 h-4 relative animate-spin" />
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 relative" />
                                            <span className="relative">Adaugă</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 py-3 rounded-2xl font-medium text-sm text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 transition-colors"
                                >
                                    Anulează
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AddEmployeeModal