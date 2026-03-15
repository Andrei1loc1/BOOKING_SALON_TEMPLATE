export type DiscountType = 'percent' | 'fixed'

export const OFFER_DISCOUNT_TYPES: { value: DiscountType; label: string }[] = [
    { value: 'percent', label: 'Procentual (%)' },
    { value: 'fixed', label: 'Fix (RON)' },
]

export const OFFER_STATUS_OPTIONS: { value: boolean; label: string }[] = [
    { value: true, label: 'Activă' },
    { value: false, label: 'Inactivă' },
]

export const OFFER_DEFAULT_VALUES = {
    title: '',
    description: '',
    badge: 'OFERTĂ',
    discountType: 'percent' as DiscountType,
    discountValue: 0,
    active: true,
}

export const OFFER_LABELS = {
    title: 'Titlu Ofertă',
    titlePlaceholder: 'Ex: Reducere de Primăvară',
    description: 'Descriere',
    descriptionPlaceholder: 'Detalii despre ofertă...',
    badge: 'Badge (Text scurt)',
    badgePlaceholder: 'OFERTĂ',
    discountType: 'Tip Reducere',
    discountValue: 'Valoare',
    active: 'Status',
    validFrom: 'Valabilă de la',
    validUntil: 'Valabilă până la',
}

export const OFFER_DIALOG = {
    title: 'Creează Ofertă Nouă',
    description: 'Completează detaliile ofertei pentru a o afișa clienților.',
    triggerText: 'Adaugă Ofertă',
    submitText: 'Creează Ofertă',
    cancelText: 'Anulează',
    successMessage: 'Oferta a fost adăugată cu succes!',
    errorMessage: 'Eroare la adăugarea ofertei.',
}

export const OFFER_FORM_GRID = {
    firstRow: ['badge', 'discountType'],
    secondRow: ['discountValue', 'active'],
    thirdRow: ['validFrom', 'validUntil'],
} as const
