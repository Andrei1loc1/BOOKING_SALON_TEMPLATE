'use client'

import { useEffect, useState, useCallback } from 'react'
import { ref, query, orderByChild, equalTo, onValue } from 'firebase/database'
import { db } from '@/lib/firebase'
import type { Appointment, LiveStats } from '@/types'
import { DEFAULT_SETTINGS } from '@/config/settingsConfig'

// Helper: Parse time string to minutes from midnight
function timeToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
}

// Helper: Get current time in minutes from midnight
function getCurrentMinutes(): number {
    const now = new Date()
    return now.getHours() * 60 + now.getMinutes()
}

// Helper: Get today's date key
function getTodayDateKey(): string {
    return new Date().toISOString().split('T')[0]
}

// Type guard for DaySchedule
function isDaySchedule(obj: unknown): obj is { start: number; end: number; enabled: boolean } {
    return obj !== null && typeof obj === 'object' && 'start' in obj && 'end' in obj
}

// Helper: Check if salon is open now
function isSalonOpen(settings: typeof DEFAULT_SETTINGS): boolean {
    const now = new Date()
    const dayOfWeek = now.getDay()
    const currentMinutes = getCurrentMinutes()

    // Get schedule for today
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const todayKey = dayKeys[dayOfWeek] as keyof typeof settings.schedule

    let startHour = 10 // default
    let endHour = 19   // default
    let enabled = true

    if (settings.schedule.sameForAll) {
        startHour = settings.schedule.default.start
        endHour = settings.schedule.default.end
    } else {
        const daySchedule = settings.schedule[todayKey]
        if (isDaySchedule(daySchedule)) {
            startHour = daySchedule.start
            endHour = daySchedule.end
            enabled = daySchedule.enabled
        }
    }

    const startMinutes = startHour * 60
    const endMinutes = endHour * 60

    return enabled && currentMinutes >= startMinutes && currentMinutes < endMinutes
}

// Calculate live stats from appointments
function calculateLiveStats(
    appointments: Appointment[],
    isOpen: boolean,
    currentMinutes: number
): LiveStats {
    // Filter today's confirmed/pending appointments (not cancelled, not completed)
    const todayAppointments = appointments.filter(
        a => a.date === getTodayDateKey() && a.status === 'confirmed'
    ).sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))

    const totalToday = todayAppointments.length

    if (!isOpen || totalToday === 0) {
        return {
            isOpen,
            occupancy: 'liber',
            nextAppointment: null,
            waitingTime: 0,
            availableSpots: 3, // Max clients at once
            totalToday: 0,
            activeClients: 0,
            trendOfTheDay: null,
        }
    }

    // Find current active appointments (started but not finished)
    let activeClients = 0
    let nextAppointment: string | null = null
    let totalWaitingMinutes = 0
    let processedCount = 0

    for (const appt of todayAppointments) {
        const apptStart = timeToMinutes(appt.time)
        const apptDuration = (appt.serviceDuration || 30) + (appt.delay_minutes || 0)
        const apptEnd = apptStart + apptDuration

        if (currentMinutes >= apptStart && currentMinutes < apptEnd) {
            // This appointment is in progress
            activeClients++

            // Calculate remaining time for this appointment
            const remainingTime = apptEnd - currentMinutes
            totalWaitingMinutes += remainingTime

            processedCount++
        } else if (currentMinutes < apptStart) {
            // Future appointment - first one is next
            if (!nextAppointment) {
                nextAppointment = appt.time
            }

            // Add this appointment's duration to waiting time if we're in queue
            if (processedCount > 0 || activeClients > 0) {
                totalWaitingMinutes += apptDuration
            }
        }
    }

    // Determine occupancy
    let occupancy: 'liber' | 'mediu' | 'ocupat'
    if (activeClients === 0) {
        occupancy = 'liber'
    } else if (activeClients <= 1) {
        occupancy = 'mediu'
    } else {
        occupancy = 'ocupat'
    }

    // Calculate time until next appointment
    let timeUntilNext = 0
    if (nextAppointment) {
        timeUntilNext = timeToMinutes(nextAppointment) - currentMinutes
        if (timeUntilNext < 0) timeUntilNext = 0
    }

    // Calculate available spots (max 3 - current active)
    const availableSpots = Math.max(0, 3 - activeClients)

    // Waiting time: if no active clients but there's a queue, show time until next
    // If there are active clients, show accumulated waiting time
    const waitingTime = activeClients > 0
        ? totalWaitingMinutes
        : (timeUntilNext > 30 ? 0 : timeUntilNext) // Only show wait if within 30 min

    // Calculate trend of the day (most ordered service today)
    const trendOfTheDay = (() => {
        if (todayAppointments.length === 0) return null

        const serviceCounts: Record<string, number> = {}
        for (const appt of todayAppointments) {
            serviceCounts[appt.serviceName] = (serviceCounts[appt.serviceName] || 0) + 1
        }

        let maxCount = 0
        let topService: string | null = null
        for (const [service, count] of Object.entries(serviceCounts)) {
            if (count > maxCount) {
                maxCount = count
                topService = service
            }
        }

        return topService
    })()

    return {
        isOpen,
        occupancy,
        nextAppointment,
        waitingTime: Math.round(waitingTime),
        availableSpots,
        totalToday,
        activeClients,
        trendOfTheDay,
    }
}

export function useLiveStats() {
    const [stats, setStats] = useState<LiveStats>({
        isOpen: false,
        occupancy: 'liber',
        nextAppointment: null,
        waitingTime: 0,
        availableSpots: 3,
        totalToday: 0,
        activeClients: 0,
        trendOfTheDay: null,
    })
    const [loading, setLoading] = useState(true)

    const calculateStats = useCallback(() => {
        const currentMinutes = getCurrentMinutes()
        const todayKey = getTodayDateKey()

        // Get settings to check if open
        getSettings().then(settings => {
            const isOpen = isSalonOpen(settings || DEFAULT_SETTINGS)

            // Get today's appointments
            getTodayAppointments(todayKey).then(appointments => {
                const newStats = calculateLiveStats(appointments, isOpen, currentMinutes)
                setStats(newStats)
                setLoading(false)
            })
        })
    }, [])

    useEffect(() => {
        // Initial calculation
        calculateStats()

        // Update every 30 seconds
        const interval = setInterval(calculateStats, 30 * 1000)

        return () => clearInterval(interval)
    }, [calculateStats])

    return { stats, loading, refresh: calculateStats }
}

// Helper functions to fetch data
async function getSettings() {
    const { getSettings } = await import('@/actions/admin-actions')
    return getSettings()
}

async function getTodayAppointments(date: string): Promise<Appointment[]> {
    const q = query(ref(db, 'appointments'), orderByChild('date'), equalTo(date))

    return new Promise((resolve) => {
        onValue(q, (snapshot) => {
            if (!snapshot.exists()) {
                resolve([])
                return
            }

            const appointments = Object.entries(snapshot.val()).map(([id, val]) => ({
                id,
                ...(val as Omit<Appointment, 'id'>),
            }))

            resolve(appointments)
        }, { onlyOnce: true })
    })
}
