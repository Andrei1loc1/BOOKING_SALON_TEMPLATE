'use client'

import React from 'react'
import { useSettingsForm } from '@/hooks/useSettingsForm'
import { SettingsPageHeader } from '@/components/features/admin/settings/SettingsPageHeader'
import { SettingsPageSkeleton } from '@/components/features/admin/settings/SettingsPageSkeleton'
import { SalonSettings } from '@/components/features/admin/settings/SalonSettings'
import { ContactInfoSettings } from '@/components/features/admin/settings/ContactInfoSettings'
import { BookingSettings } from '@/components/features/admin/settings/BookingSettings'
import { NotificationSettings } from '@/components/features/admin/settings/NotificationSettings'
import { ScheduleSettings } from '@/components/features/admin/settings/ScheduleSettings'
import { SaveSettingsButton } from '@/components/features/admin/settings/SaveSettingsButton'
import { SettingsSuccessMessage } from '@/components/features/admin/settings/SettingsSuccessMessage'

const AdminSettingsPage: React.FC = () => {
    const {
        form,
        loading,
        saving,
        saved,
        selectedDay,
        currentSchedule,
        set,
        setSelectedDay,
        setCurrentDaySchedule,
        handleSameForAllChange,
        handleSave,
    } = useSettingsForm()

    return (
        <div className="flex flex-col gap-6 py-8 min-h-dvh bg-background pb-30">
            {/* Header */}
            <SettingsPageHeader />

            {loading ? (
                <SettingsPageSkeleton />
            ) : (
                <>
                    {/* Salon Settings */}
                    <SalonSettings form={form} onChange={set} />

                    {/* Contact Info Settings */}
                    <ContactInfoSettings form={form} onChange={set} />

                    {/* Booking Settings */}
                    <BookingSettings form={form} onChange={set} />

                    {/* Notification Settings */}
                    <NotificationSettings form={form} onChange={set} />

                    {/* Schedule Settings */}
                    <ScheduleSettings
                        form={form}
                        selectedDay={selectedDay}
                        currentSchedule={currentSchedule}
                        onDayChange={setSelectedDay}
                        onScheduleChange={setCurrentDaySchedule}
                        onSameForAllChange={handleSameForAllChange}
                    />

                    {/* Save Button */}
                    {saved ? (
                        <SettingsSuccessMessage />
                    ) : (
                        <SaveSettingsButton onSave={handleSave} saving={saving} />
                    )}
                </>
            )}
        </div>
    )
}

export default AdminSettingsPage
