/**
 * ============================================
 * EXPORT UTILITIES
 * ============================================
 * Export appointments and revenue reports to CSV/Excel
 * ============================================
 */

import type { Appointment } from '@/types'

interface ExportOptions {
  filename?: string
}

/**
 * Generate CSV content for appointments
 */
function generateAppointmentsCSV(appointments: Appointment[]): string {
  // Sort by date descending
  const sorted = [...appointments].sort((a, b) => b.date.localeCompare(a.date))

  // CSV Header
  let csv = 'Data,Client,Serviciu,Ora,Pret (RON),Durata (min),Status\n'

  // Map status to Romanian
  const statusMap: Record<string, string> = {
    confirmed: 'Confirmata',
    pending: 'In asteptare',
    completed: 'Finalizata',
    cancelled: 'Anulata',
  }

  // Data rows
  for (const appt of sorted) {
    const status = statusMap[appt.status] || appt.status
    const row = [
      appt.date,
      `"${appt.userName.replace(/"/g, '""')}"`,
      `"${appt.serviceName.replace(/"/g, '""')}"`,
      appt.time,
      (appt.servicePrice || 0).toString(),
      appt.serviceDuration.toString(),
      status,
    ]
    csv += row.join(',') + '\n'
  }

  return csv
}

/**
 * Generate revenue summary CSV
 */
function generateRevenueCSV(appointments: Appointment[]): string {
  // Calculate stats
  const completed = appointments.filter(a => a.status === 'completed')
  const cancelled = appointments.filter(a => a.status === 'cancelled')
  const confirmed = appointments.filter(a => a.status === 'confirmed')

  const totalRevenue = completed.reduce((sum, a) => sum + (a.servicePrice || 0), 0)
  const pendingRevenue = confirmed.reduce((sum, a) => sum + (a.servicePrice || 0), 0)

  // Group by service
  const serviceStats: Record<string, { count: number; revenue: number }> = {}
  for (const appt of completed) {
    if (!serviceStats[appt.serviceName]) {
      serviceStats[appt.serviceName] = { count: 0, revenue: 0 }
    }
    serviceStats[appt.serviceName].count++
    serviceStats[appt.serviceName].revenue += appt.servicePrice || 0
  }

  // Group by month
  const monthlyStats: Record<string, { count: number; revenue: number }> = {}
  for (const appt of completed) {
    const month = appt.date.substring(0, 7) // YYYY-MM
    if (!monthlyStats[month]) {
      monthlyStats[month] = { count: 0, revenue: 0 }
    }
    monthlyStats[month].count++
    monthlyStats[month].revenue += appt.servicePrice || 0
  }

  // Generate CSV
  let csv = '\n--- RAPORT VENITURI ---\n\n'

  csv += 'Metric,Numar,Valoare (RON)\n'
  csv += `Total Programari,${appointments.length},\n`
  csv += `Finalizate,${completed.length},${totalRevenue}\n`
  csv += `Confirmate,${confirmed.length},${pendingRevenue}\n`
  csv += `Anulate,${cancelled.length},\n`

  csv += '\n--- VENITURI PE SERVICII ---\n\n'
  csv += 'Serviciu,Programari,Venit (RON)\n'
  for (const [service, stats] of Object.entries(serviceStats)) {
    csv += `"${service}",${stats.count},${stats.revenue}\n`
  }

  // Monthly breakdown if more than one month
  if (Object.keys(monthlyStats).length > 1) {
    csv += '\n--- VENITURI PE LUNI ---\n\n'
    csv += 'Luna,Programari,Venit (RON)\n'

    const months = [
      'Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie',
      'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'
    ]

    for (const [yearMonth, stats] of Object.entries(monthlyStats).sort().reverse()) {
      const [year, month] = yearMonth.split('-')
      const monthIndex = parseInt(month, 10) - 1
      csv += `${months[monthIndex]} ${year},${stats.count},${stats.revenue}\n`
    }
  }

  return csv
}

/**
 * Download data as CSV file (opens in Excel)
 */
export function downloadCSV(content: string, filename: string): void {
  // Add BOM for Excel to properly recognize UTF-8
  const BOM = '\uFEFF'
  const blob = new Blob([BOM + content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  const date = new Date().toISOString().split('T')[0]
  link.download = `${filename}_${date}.csv`

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}

/**
 * Export all appointments with revenue report
 */
export function exportAppointments(appointments: Appointment[], options: ExportOptions = {}): void {
  const filename = options.filename || 'raport_programari'

  // Generate appointments CSV
  const appointmentsCSV = generateAppointmentsCSV(appointments)

  // Generate revenue CSV
  const revenueCSV = generateRevenueCSV(appointments)

  // Combine both
  const fullContent = appointmentsCSV + revenueCSV

  // Download
  downloadCSV(fullContent, filename)
}
