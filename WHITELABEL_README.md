# White-Label Booking App Template

## Prezentare Generală

Acest proiect este structurat pentru a fi ușor de personalizat pentru orice tip de afacere (frizerie, salon de beautate, clinică, etc.). Totul este configurabil prin fișiere de configurare - nu trebuie să modifici logica aplicației.

---

## Structura Configurărilor

```
config/
├── salonConfig.ts      # Configurarea principală a salonului
├── translations.ts     # Toate textele din aplicație
├── theme.ts            # Sistemul de teme și culori
├── templates/          # Șabloane pre-făcute
│   ├── barbershop.ts   # Șablon pentru frizerie
│   ├── beautysalon.ts  # Șablon pentru salon de beautate
│   └── index.ts
└── index.ts           # Export centralizat
```

---

## Cum să Creezi un Nou Client

### Pasul 1: Alege un Șablon

Copiază un șablon din `config/templates/` în `config/salonConfig.ts`:

```bash
# Pentru frizerie
copy config/templates/barbershop.ts config/salonConfig.ts

# Pentru salon de beautate
copy config/templates/beautysalon.ts config/salonConfig.ts
```

### Pasul 2: Personalizează Configurarea

Deschide `config/salonConfig.ts` și modifică valorile:

```typescript
business: {
  name: 'Salonul Meu',           // Numele afacerii
  tagline: 'Profesionalism',    // Slogan
  address: 'Strada Mea Nr. 1',
  phone: '+40 700 000 000',
  email: 'contact@salon.ro',
  // ...
},

theme: {
  primary: 'oklch(0.55 0.2 320)',  // Culoarea principală
  gold: 'oklch(0.84 0.18 80)',      // Culoarea de accent
  // ...
},

services: [
  // Serviciile tale
  { name: 'Tuns', price: 50, duration: 30 },
  // ...
],
```

### Pasul 3: Adaugă Logo

- Pune logo-ul în `public/logo.svg`
- Actualizează `business.logoUrl` în configurare

### Pasul 4: Deployment

Asta e tot! Aplicația este acum personalizată pentru noul client.

---

## Configurări Disponibile

### 1. Business Info (`salonConfig.ts`)

```typescript
business: {
  name: string          // Numele afacerii
  tagline: string      // Sloganul
  address: string      // Adresa completă
  phone: string        // Telefon
  email: string        // Email
  website?: string     // Website (opțional)
  logoUrl: string      // URL logo
  faviconUrl: string   // URL favicon
}
```

### 2. Culori Teme (`salonConfig.ts`)

Folosește OKLCH pentru culori moderne:

```typescript
theme: {
  primary: 'oklch(0.55 0.2 320)',    // Albastru
  primaryLight: 'oklch(0.7 0.2 320)',
  gold: 'oklch(0.84 0.18 80)',       // Auriu
  goldLight: 'oklch(0.92 0.12 85)',
  // ...
}
```

**Predefined Presets:**

```typescript
import { THEME_PRESETS } from '@/config'

THEME_PRESETS.gold   // Auriu (implicit)
THEME_PRESETS.blue  // Albastru
THEME_PRESETS.green // Verde
THEME_PRESETS.purple// Mov
THEME_PRESETS.rose  // Roz
```

### 3. Servicii

```typescript
services: [
  {
    name: 'Tuns',
    description: 'Descriere serviciu',
    duration: 30,        // minute
    price: 50,           // LEI
    icon: 'Scissors',    // Iconița (lucide-react)
    active: true
  },
  // ...
]
```

### 4. Program

```typescript
schedule: {
  monday: { 
    isOpen: true, 
    openTime: '09:00', 
    closeTime: '21:00',
    breakStart: '13:00', // opțional
    breakEnd: '14:00'    // opțional
  },
  // ...
}
```

### 5. Reguli de Business

```typescript
rules: {
  currency: 'LEI',
  minAdvanceBookingHours: 1,    // Programare minimă cu X ore în avans
  maxAdvanceBookingDays: 30,    // Programare maximă cu X zile în avans
  minCancellationNoticeHours: 2, // Anulare cu X ore în avans
  // ...
}
```

### 6. Funcționalități

```typescript
features: {
  onlineBooking: true,       // Programări online
  offers: true,              // Oferte/Reduceri
  multiStaff: true,          // Mai mulți angajați
  onlinePayment: false,      // Plăți online
  pushNotifications: true,  // Notificări push
  // ...
}
```

---

## Folosirea Configurării în Componente

### Import

```typescript
import { t, formatPrice, THEME_STYLES, BUSINESS_INFO } from '@/config'
```

### Text (Translations)

```typescript
// Folosește pentru toate textele
<p>{t.welcome.greeting}</p>           // "Bine ai venit"
<span>{t.booking.service}</span>       // "Serviciu"
<button>{t.welcome.bookAppointment}</button> // "Programează o vizită"
```

### Prețuri Formatate

```typescript
// Formatează automat prețul cu moneda
<span>{formatPrice(50)}</span>  // "50 LEI"
```

### Stiluri Temă

```typescript
// Folosește stilurile pre-definite
<div style={THEME_STYLES.goldGradientText}>Titlu</div>
<div style={THEME_STYLES.borderGradient}>Card</div>
<button style={THEME_STYLES.primaryButton}>Click</button>
```

### CSS Variables

```tsx
// Folosește în style sau Tailwind
<div className="text-[var(--color-gold)]">Auriu</div>
<div style={{ background: 'var(--color-gold)' }}>Fundal</div>
```

### Info Business

```typescript
// Date de contact
<p>{BUSINESS_INFO.name}</p>
<p>{BUSINESS_INFO.phone}</p>
<p>{BUSINESS_INFO.address}</p>
```

---

## Cum să Traduci în Altă Limbă

1. Deschide `config/translations.ts`
2. Găsește secțiunea pentru limba dorită (`ro` sau `en`)
3. Modifică valorile

```typescript
export const ro = {
  welcome: {
    greeting: 'Bine ai venit',  // Schimbă aici
    subtitle: 'Programări rapide și simple',
    // ...
  },
  // ...
}
```

---

## Adăugarea unui Client Nou (Multi-Tenant)

Pentru a face aplicația truly multi-tenant (mai multe saloane pe aceeași instanță):

1. **Adaugă câmp `salonId`** la toate colecțiile Firebase
2. **Creează o pagină de login pentru admin** care să selecteze salonul
3. **Încarcă configurarea** din Firebase în funcție de `salonId`
4. **Folosește Context** pentru a transmite configurarea

Exemplu:

```typescript
// contexts/SalonContext.tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

const SalonContext = createContext(null)

export function SalonProvider({ children, salonId }) {
  const [config, setConfig] = useState(null)
  
  useEffect(() => {
    async function loadConfig() {
      const docRef = doc(db, 'salons', salonId)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        setConfig(docSnap.data())
      }
    }
    loadConfig()
  }, [salonId])
  
  return (
    <SalonContext.Provider value={config}>
      {children}
    </SalonContext.Provider>
  )
}
```

---

## Checklist pentru Deployment

- [ ] Am copiat șablonul în `salonConfig.ts`
- [ ] Am modificat numele salonului
- [ ] Am adăugat datele de contact
- [ ] Am setat culorile temei
- [ ] Am adăugat serviciile
- [ ] Am configurat programul
- [ ] Am pus logo-ul în `public/`
- [ ] Am testat aplicația
- [ ] Am făcut build-ul

---

## Comenzi Utile

```bash
# Development
npm run dev

# Build producție
npm run build

# Start producție
npm start

# Lint
npm run lint
```

---

## Structura Proiectului

```
bookingapp/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Panel admin
│   │   └── admin/
│   │       ├── bookings/
│   │       ├── dashboard/
│   │       ├── settings/
│   │       └── users/
│   ├── (client)/          # Pagini client
│   │   ├── booking/
│   │   ├── history/
│   │   ├── profile/
│   │   └── page.tsx       # Dashboard
│   ├── login/
│   └── register/
├── components/
│   ├── features/         # Componente de business logic
│   │   ├── admin/
│   │   ├── booking/
│   │   ├── dashboard/
│   │   ├── history/
│   │   └── profile/
│   └── ui/               # Componente UI (shadcn)
├── config/               # ✨ CONFIGURĂRILE AICI
│   ├── salonConfig.ts
│   ├── translations.ts
│   ├── theme.ts
│   └── templates/
├── hooks/                # React hooks
├── lib/                  # Utilități
├── actions/             # Server actions
└── types/                # TypeScript types
```

---

## Suport

Pentru întrebări sau probleme, consultă documentația sau contactează echipa de dezvoltare.
