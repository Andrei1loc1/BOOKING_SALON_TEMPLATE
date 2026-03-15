'use client'

import React, { useState, useEffect } from 'react'
import { getServices, createService, updateService, deleteService } from '@/actions/admin-actions'
import type { Service } from '@/types'
import { Plus, Pencil, Trash2, Check, X, Loader2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface DashboardServicesProps {
    onUpdate?: () => void
}

const DashboardServices = ({ onUpdate }: DashboardServicesProps) => {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)
    const [expanded, setExpanded] = useState(true)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [editPrice, setEditPrice] = useState('')
    const [showAddForm, setShowAddForm] = useState(false)
    const [newService, setNewService] = useState({ name: '', price: '', duration: '30' })
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = async () => {
        try {
            const data = await getServices()
            setServices(data.filter(s => s.active))
        } catch (error) {
            console.error('Error loading services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStartEdit = (service: Service) => {
        setEditingId(service.id!)
        setEditPrice(service.price.toString())
    }

    const handleSavePrice = async (serviceId: string) => {
        const price = parseFloat(editPrice)
        if (isNaN(price) || price < 0) {
            toast.error('Preț invalid')
            return
        }
        setSaving(true)
        try {
            await updateService(serviceId, { price })
            toast.success('Preț actualizat')
            loadServices()
            onUpdate?.()
        } catch (error) {
            toast.error('Eroare la actualizare')
        } finally {
            setSaving(false)
            setEditingId(null)
        }
    }

    const handleDelete = async (serviceId: string, serviceName: string) => {
        if (!confirm(`Sigur vrei să ștergi "${serviceName}"?`)) return
        setSaving(true)
        try {
            await deleteService(serviceId)
            toast.success('Serviciu șters')
            loadServices()
            onUpdate?.()
        } catch (error) {
            toast.error('Eroare la ștergere')
        } finally {
            setSaving(false)
        }
    }

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newService.name.trim() || !newService.price) {
            toast.error('Completează numele și prețul')
            return
        }
        setSaving(true)
        try {
            await createService({
                name: newService.name.trim(),
                description: '',
                price: parseFloat(newService.price),
                duration: parseInt(newService.duration) || 30,
                icon: 'scissors',
                active: true,
            })
            toast.success('Serviciu adăugat')
            setNewService({ name: '', price: '', duration: '30' })
            setShowAddForm(false)
            loadServices()
            onUpdate?.()
        } catch (error) {
            toast.error('Eroare la adăugare')
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col gap-2 px-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-[52px] rounded-2xl animate-pulse bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.08)]" />
                ))}
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-3 mx-4">
            {/* Card container */}
            <div className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)]">
                {/* top accent */}
                <div
                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                    style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
                />

                {/* Header */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="w-full px-4 py-3 flex items-center justify-between group"
                >
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" style={{ color: 'oklch(0.84 0.18 80)' }} />
                        <span className="text-[13px] font-semibold uppercase tracking-wide text-[oklch(0.70_0_0)]">
                            Servicii
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                            style={{
                                background: 'oklch(0.30 0.08 80 / 0.2)',
                                color: 'oklch(0.84 0.18 80)',
                            }}
                        >
                            {services.length}
                        </span>
                        <span
                            className={`text-[10px] transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                            style={{ color: 'oklch(0.45_0_0)' }}
                        >
                            ▼
                        </span>
                    </div>
                </button>

                {/* Content */}
                {expanded && (
                    <div className="flex flex-col gap-2 px-4 pb-4">
                        {/* Services List */}
                        {services.map(service => (
                            <div
                                key={service.id}
                                className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)] px-3 py-2.5 flex items-center gap-3"
                            >
                                {/* top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                                    style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
                                />

                                {/* Left accent */}
                                <div
                                    className="w-1 h-6 rounded-full shrink-0"
                                    style={{ background: 'oklch(0.55 0.15 72)', boxShadow: '0 0 6px oklch(0.55 0.15 72 / 0.5)' }}
                                />

                                {/* Name */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[14px] font-semibold text-[oklch(0.97_0_0)] truncate">
                                        {service.name}
                                    </p>
                                    <p className="text-[11px] text-[oklch(0.50_0_0)]">
                                        {service.duration} min
                                    </p>
                                </div>

                                {/* Price / Edit */}
                                {editingId === service.id ? (
                                    <div className="flex items-center gap-1">
                                        <input
                                            type="number"
                                            value={editPrice}
                                            onChange={e => setEditPrice(e.target.value)}
                                            className="w-16 px-2 py-1.5 rounded-xl text-sm font-semibold text-center bg-[oklch(0.2_0_0)] border border-[oklch(0.84_0.18_80_/_0.2)] text-[oklch(0.97_0_0)] outline-none"
                                            placeholder="Preț"
                                            autoFocus
                                        />
                                        <button
                                            onClick={() => handleSavePrice(service.id!)}
                                            disabled={saving}
                                            className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                                            style={{
                                                background: 'oklch(0.55 0.15 72)',
                                                color: 'oklch(0.15 0 0)',
                                            }}
                                        >
                                            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-1.5 rounded-xl hover:bg-[oklch(0.25_0_0)] transition-colors"
                                        >
                                            <X className="w-4 h-4" style={{ color: 'oklch(0.50_0_0)' }} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <span className="text-[14px] font-bold text-[oklch(0.84_0.18_80)]">
                                            {service.price} lei
                                        </span>
                                        <button
                                            onClick={() => handleStartEdit(service)}
                                            className="p-1.5 rounded-lg hover:bg-[oklch(0.25_0_0)] transition-colors"
                                        >
                                            <Pencil className="w-3.5 h-3.5" style={{ color: 'oklch(0.55_0_0)' }} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(service.id!, service.name)}
                                            className="p-1.5 rounded-lg hover:bg-[oklch(0.25_0_0)] transition-colors"
                                        >
                                            <Trash2 className="w-3.5 h-3.5" style={{ color: '#ef4444' }} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Add New Service */}
                        {showAddForm ? (
                            <form
                                onSubmit={handleAddService}
                                className="relative overflow-hidden rounded-2xl border border-[oklch(0.84_0.18_80_/_0.13)] bg-[oklch(0.15_0_0)] shadow-[0_4px_16px_oklch(0_0_0_/_0.3)] p-3 flex flex-col gap-2"
                            >
                                {/* top accent */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[1.5px]"
                                    style={{ background: 'linear-gradient(90deg, transparent, oklch(0.84 0.18 80 / 0.35), transparent)' }}
                                />
                                <input
                                    type="text"
                                    value={newService.name}
                                    onChange={e => setNewService({ ...newService, name: e.target.value })}
                                    placeholder="Nume serviciu"
                                    className="w-full px-3 py-2 rounded-xl text-sm bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.15)] text-[oklch(0.97_0_0)] placeholder:text-[oklch(0.40_0_0)] outline-none"
                                />
                                <div className="flex gap-2">
                                    <input
                                        type="number"
                                        value={newService.price}
                                        onChange={e => setNewService({ ...newService, price: e.target.value })}
                                        placeholder="Preț (lei)"
                                        className="flex-1 px-3 py-2 rounded-xl text-sm bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.15)] text-[oklch(0.97_0_0)] placeholder:text-[oklch(0.40_0_0)] outline-none"
                                    />
                                    <input
                                        type="number"
                                        value={newService.duration}
                                        onChange={e => setNewService({ ...newService, duration: e.target.value })}
                                        placeholder="Min"
                                        className="w-20 px-3 py-2 rounded-xl text-sm bg-[oklch(0.15_0_0)] border border-[oklch(0.84_0.18_80_/_0.15)] text-[oklch(0.97_0_0)] placeholder:text-[oklch(0.40_0_0)] outline-none"
                                    />
                                </div>
                                <div className="flex gap-2 mt-1">
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="
                                        w-full flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-2xl border font-bold text-sm transition-all active:scale-[0.98]
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
                                        {saving ? <Loader2 className="w-4 h-4 relative animate-spin" /> : <Check className="w-4 h-4 relative" />}
                                        <span className="relative">Salvează</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="px-4 py-2 rounded-xl text-sm font-medium text-[oklch(0.50_0_0)] hover:bg-[oklch(0.2_0_0)] transition-colors"
                                    >
                                        Anulează
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <button
                                onClick={() => setShowAddForm(true)}
                                className="relative overflow-hidden rounded-2xl border border-dashed border-[oklch(0.84_0.18_80_/_0.25)] bg-transparent py-2.5 flex items-center justify-center gap-2 hover:bg-[oklch(0.15_0_0)] transition-colors group"
                            >
                                <Plus className="w-4 h-4" style={{ color: 'oklch(0.55 0.15 72)' }} />
                                <span className="text-[13px] font-medium" style={{ color: 'oklch(0.55_0_0)' }}>
                                    Adaugă serviciu
                                </span>
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default DashboardServices