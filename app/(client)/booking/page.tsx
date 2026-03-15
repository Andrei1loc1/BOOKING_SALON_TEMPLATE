'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useServices } from '@/hooks/useServices'
import { useOffers } from '@/hooks/useOffers'
import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'
import { createAppointment } from '@/actions/booking-actions'
import { toDateKey } from '@/lib/date-utils'
import { calculateDiscountedPrice } from '@/lib/offer-utils'
import StepOne from '@/components/features/booking/StepOne'
import StepTwo from '@/components/features/booking/StepTwo'
import StepThree from '@/components/features/booking/StepThree'
import BookingHeader from '@/components/features/booking/BookingHeader'
import BookingProgressBar from '@/components/features/booking/BookingProgressBar'
import ContinueButton from '@/components/features/booking/ContinueButton'
import { BOOKING_STYLES } from '@/config/bookingConfig'
import type { Service } from '@/types'

export default function BookingPage() {
    const router = useRouter()
    const { user, profile } = useAuth()
    const { services, loading: servicesLoading } = useServices()
    const { offers } = useOffers()
    const { settings } = useSettings()
    
    // Fallback currency
    const currency = settings?.currency || 'LEI'

    const [step, setStep] = useState(1)
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    const handleSelectService = (s: Service) => {
        setSelectedService(s)
        setSelectedDate(null)
        setSelectedTime(null)
        setStep(2)
    }

    const handleBack = () => setStep((s) => Math.max(1, s - 1))

    const handleConfirm = async () => {
        if (!selectedService || !selectedDate || !selectedTime || !user) return
        setSubmitting(true)
        try {
            const dateKey = toDateKey(selectedDate)
            const finalPrice = offers.length > 0 ? calculateDiscountedPrice(selectedService.price, offers[0]) : selectedService.price

            await createAppointment({
                date: dateKey,
                date_time: `${dateKey}T${selectedTime}:00`,
                time: selectedTime,
                serviceId: selectedService.id!,
                serviceName: selectedService.name,
                servicePrice: finalPrice,
                serviceDuration: selectedService.duration,
                userId: user.uid,
                userName: profile?.name ?? user.email ?? 'Client',
            })
            router.push('/')
        } catch {
            alert('A apărut o eroare. Încearcă din nou.')
        } finally {
            setSubmitting(false)
        }
    }

    const canProceed = selectedDate !== null && selectedTime !== null

    return (
        <div className="relative mt-10 overflow-hidden" style={{ background: 'oklch(0.10 0 0)' }}>
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none" style={BOOKING_STYLES.ambientGlowTopRight} />
            <div className="absolute bottom-32 -left-16 w-56 h-56 rounded-full pointer-events-none" style={BOOKING_STYLES.ambientGlowBottomLeft} />

            <BookingHeader step={step} onBack={handleBack} />
            <BookingProgressBar step={step} />

            {step === 1 && (
                <StepOne services={services} offers={offers} loading={servicesLoading} selected={selectedService} onSelect={handleSelectService} currency={currency} />
            )}

            {step === 2 && selectedService && (
                <>
                    <StepTwo service={selectedService} selectedDate={selectedDate} selectedTime={selectedTime} onDateSelect={(d) => { setSelectedDate(d); setSelectedTime(null) }} onTimeSelect={setSelectedTime} />
                    {canProceed && <ContinueButton onClick={() => setStep(3)} />}
                </>
            )}

            {step === 3 && selectedService && selectedDate && selectedTime && (
                <StepThree service={selectedService} offers={offers} date={selectedDate} time={selectedTime} onBack={handleBack} onConfirm={handleConfirm} submitting={submitting} currency={currency} />
            )}
        </div>
    )
}
