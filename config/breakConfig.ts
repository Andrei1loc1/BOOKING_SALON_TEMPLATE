export const BREAK_DEFAULT_VALUES = {
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    duration: 30,
    reason: 'Pauză',
}

export const BREAK_DURATION_OPTIONS = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '1 oră' },
    { value: 90, label: '1 oră 30 min' },
    { value: 120, label: '2 ore' },
]

export const BREAK_LABELS = {
    date: 'Data',
    time: 'Ora de start',
    duration: 'Durată (min)',
    reason: 'Motiv / Notă',
    reasonPlaceholder: 'Ex: Pauză de masă',
}

export const BREAK_DIALOG = {
    title: 'Programează Pauză',
    description: 'Blochează un interval orar pentru pauze sau alte activități.',
    triggerText: 'Adaugă Pauză',
    submitText: 'Confirmă Pauza',
    cancelText: 'Anulează',
    successMessage: 'Pauza a fost adăugată cu succes!',
    errorMessage: 'Eroare la adăugarea pauzei.',
}
