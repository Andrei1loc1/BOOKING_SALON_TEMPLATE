'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createAppointment } from '@/actions/booking-actions'
import { useServices } from '@/hooks/useServices'
import { useAuth } from '@/hooks/useAuth'
import { toDateKey } from '@/lib/date-utils'
import { Plus, Calendar, Clock, User, Scissors, Check } from 'lucide-react'

interface AddAppointmentModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    selectedDate?: Date
    onSuccess?: () => void
}

const TIME_SLOTS = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
]

export const AddAppointmentModal: React.FC<AddAppointmentModalProps> = ({
    open,
    onOpenChange,
    selectedDate,
    onSuccess,
}) => {
    const { user } = useAuth()
    const { services } = useServices()

    const [clientName, setClientName] = useState('')
    const [clientPhone, setClientPhone] = useState('')
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            setClientName('')
            setClientPhone('')
            setSelectedService(null)
            setSelectedTime(null)
            setSuccess(false)
        }
    }, [open])

    const handleSubmit = async () => {
        if (!clientName || !clientPhone || !selectedService || !selectedTime || !selectedDate || !user) {
            return
        }

        setSubmitting(true)
        try {
            const service = services.find(s => s.id === selectedService)
            const dateKey = toDateKey(selectedDate)

            await createAppointment({
                date: dateKey,
                date_time: `${dateKey}T${selectedTime}:00`,
                time: selectedTime,
                serviceId: selectedService,
                serviceName: service?.name || 'Serviciu',
                servicePrice: service?.price || 0,
                serviceDuration: service?.duration || 30,
                userId: user.uid,
                userName: clientName,
            })

            setSuccess(true)
            setTimeout(() => {
                onOpenChange(false)
                onSuccess?.()
            }, 1500)
        } catch (error) {
            console.error('Error creating appointment:', error)
        } finally {
            setSubmitting(false)
        }
    }

    const selectedServiceData = services.find(s => s.id === selectedService)
    const isValid = clientName && clientPhone && selectedService && selectedTime

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('ro-RO', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        })
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
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
                                <Calendar className="w-5 h-5" />
                                Programare nouă
                            </DialogTitle>
                        </DialogHeader>

                        {success ? (
                            <div className="flex flex-col items-center justify-center py-8 gap-3">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ background: 'oklch(0.45 0.15 145 / 0.3)' }}
                                >
                                    <Check className="w-8 h-8" style={{ color: 'oklch(0.65 0.18 145)' }} />
                                </div>
                                <p className="text-lg font-medium text-white">Programare adăugată!</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4 mt-2">
                                {/* Selected Date Display */}
                                {selectedDate && (
                                    <div
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                                        style={{ background: 'oklch(0.2 0.04 80 / 0.2)' }}
                                    >
                                        <Calendar className="w-4 h-4" style={{ color: 'oklch(0.84 0.18 80)' }} />
                                        <span>{formatDate(selectedDate)}</span>
                                    </div>
                                )}

                                {/* Client Name */}
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs text-[oklch(0.7_0_0)] flex items-center gap-2">
                                        <User className="w-3.5 h-3.5" />
                                        Nume client
                                    </Label>
                                    <Input
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        placeholder="Ex: Ion Popescu"
                                        className="bg-[oklch(0.1_0_0)] border-[oklch(0.3_0_0)] text-white"
                                    />
                                </div>

                                {/* Client Phone */}
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs text-[oklch(0.7_0_0)]">Telefon</Label>
                                    <Input
                                        value={clientPhone}
                                        onChange={(e) => setClientPhone(e.target.value)}
                                        placeholder="Ex: +40 700 123 456"
                                        className="bg-[oklch(0.1_0_0)] border-[oklch(0.3_0_0)] text-white"
                                    />
                                </div>

                                {/* Service Selection */}
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs text-[oklch(0.7_0_0)] flex items-center gap-2">
                                        <Scissors className="w-3.5 h-3.5" />
                                        Serviciu
                                    </Label>
                                    <div className="grid grid-cols-2 gap-2 max-h-[120px] overflow-y-auto">
                                        {services.filter(s => s.active).map((service) => (
                                            <button
                                                key={service.id}
                                                onClick={() => setSelectedService(service.id!)}
                                                className={`flex flex-col items-start p-2 rounded-lg border transition-all text-left ${selectedService === service.id
                                                    ? 'border-[oklch(0.84_0.18_80)] bg-[oklch(0.84_0.18_80_/_0.1)]'
                                                    : 'border-[oklch(0.3_0_0)] hover:border-[oklch(0.5_0_0)]'
                                                    }`}
                                            >
                                                <span className="text-xs font-medium text-white">{service.name}</span>
                                                <span className="text-[10px] text-[oklch(0.6_0_0)]">
                                                    {service.price} lei · {service.duration} min
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Time Selection */}
                                <div className="flex flex-col gap-2">
                                    <Label className="text-xs text-[oklch(0.7_0_0)] flex items-center gap-2">
                                        <Clock className="w-3.5 h-3.5" />
                                        Ora
                                    </Label>
                                    <div className="grid grid-cols-4 gap-1.5 max-h-[100px] overflow-y-auto">
                                        {TIME_SLOTS.map((time) => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-1.5 px-2 rounded-md text-xs font-medium transition-all ${selectedTime === time
                                                    ? 'bg-[oklch(0.84_0.18_80)] text-black'
                                                    : 'bg-[oklch(0.2_0_0)] text-white hover:bg-[oklch(0.3_0_0)]'
                                                    }`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Summary */}
                                {selectedServiceData && selectedTime && (
                                    <div
                                        className="flex items-center justify-between p-3 rounded-lg text-sm"
                                        style={{ background: 'oklch(0.2 0.04 80 / 0.15)' }}
                                    >
                                        <span className="text-[oklch(0.7_0_0)]">Total:</span>
                                        <span className="font-semibold text-[oklch(0.84_0.18_80)]">
                                            {selectedServiceData.price} lei
                                        </span>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!isValid || submitting}
                                    className="w-full mt-2"
                                    style={{
                                        background: isValid
                                            ? 'linear-gradient(to right, oklch(0.55 0.15 72), oklch(0.84 0.18 80), oklch(0.55 0.15 72))'
                                            : 'oklch(0.3 0 0)',
                                    }}
                                >
                                    {submitting ? 'Se adaugă...' : 'Adaugă programare'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Standalone button component for use in pages
export const AddAppointmentButton = ({
    onClick
}: {
    onClick: () => void
}) => {
    return (
        <button
            onClick={onClick}
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
            <span className="relative">Adaugă programare</span>
        </button>
    )
}

export default AddAppointmentModal
