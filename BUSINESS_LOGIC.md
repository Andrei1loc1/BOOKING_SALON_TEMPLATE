# 🏢 Booking App - Business Logic & Arhitectură

Acest document descrie logica de business, fluxurile aplicației și structura bazei de date (Firebase) pentru platforma de programări. Scopul acestui sistem este să ofere o soluție completă tip SaaS/Template pentru saloane, frizerii sau clinici, gestionând programările, statisicile în timp real, angajații și clienții.

---

## 🛠 Tech Stack
- **Framework:** Next.js (App Router) & React
- **Bază de date:** Firebase (Firestore) & Firebase Admin pentru securitate/cereri pe server-side
- **Stilizare:** Tailwind CSS + Radix UI + shadcn/ui + framer-motion (pentru animații)
- **Formulare & Validare:** React Hook Form + Zod
- **Date & Timp:** date-fns + react-day-picker

---

## 👥 1. Sistemul de Roluri și Autentificare (Users)

Platforma împarte utilizatorii în **3 categorii principale**, definite în câmpul `role`:

### A. Client (`role: 'client'`)
- Poate vedea serviciile disponibile și ofertele active.
- Își poate programa vizite (Appointment).
- Are acces la secțiunea „Istoric” unde poate vizualiza detaliile programărilor trecute sau viitoare și are opțiunea de a **anula** programările viitoare.

### B. Angajat (`role: 'employee'`)
- Are acces limitat față de administrator.
- Se concentrează pe vizualizarea calendarului personalizat și a programărilor alocate doar lui.
- Este inclus în sistemul de "BlockedSlots" pentru a defini pauzele din program.

### C. Administrator (`role: 'admin'`)
Are acces total asupra sistemului prin Dashboard-ul de Admin:
- **Statistici Live:** Încasări zilnice, timpul de așteptare, gradul de ocupare și serviciul/tendința zilei (`trendOfTheDay`).
- **Calendar & Programări:** Vizualizarea tuturor programărilor. Poate schimba statusul programărilor („complet”, „anulat”) direct din listă și poate adăuga pauze/indisponibilități (prin „Add Break”).
- **Management Oferte:** Poate crea oferte speciale ce apar instant pe ecranul clienților.

---

## 🌐 2. Entitățile Principale (Baza de date)

Baza de date este organizată în colecții:

### `users`
Păstrează informații despre clienți și staff: nume, telefon, email, `role` (admin, client, employee), status și setări de notificare.

### `services`
Lista cu lucrurile ce pot fi programate.
- *Proprietăți:* `name`, `description`, `duration` (minute), `price`, `icon` și status on/off (`active`).

### `appointments` (Programările)
Acesta este nucleul tranzacțional.
- *Proprietăți:* `date`, `time` (ora de început), informații despre serviciul selectat (nume, preț, durată în acel moment), client (`userId`, `userName`), *prestator* (`barberId`) și status: `confirmed`, `cancelled`, `completed`.
- *Logică importantă:* Prețul și durata sunt „înghețate” (salvate ca și copie) în momentul plasării programării, ca un instantaneu, în caz că prețurile serviciilor se schimbă ulterior.

### `offers`
Pentru promoții.
- *Proprietăți:* `title`, `description`, `badge` (ex. "-20%"), tip discount (procentual sau sumă fixă) și perioada de valabilitate (`valid_from`, `valid_until`).

### `blockedSlots` (Pauze / Indisponibilități)
Folosit de admini și angajați pentru pauză de masă sau situații neprevăzute. În calendar, o programare nu poate fi suprapusă peste un "BlockedSlot".

---

## ⚙️ 3. Fluxuri Principale (Business Logic)

### 3.1 Flow-ul de Programare (Client-Side Booking)
1. **Navigare:** Clientul intră în aplicație, vizualizează Dashboard-ul (cu ofertele active în top).
2. **Selecție Serviciu:** Clientul apasă pe „Rezervă/Booking” pe `BookingCard` și alege serviciul dorit.
3. **Data și Ora:** Sistemul interroghează baza de date pentru programările deja existente (`appointments`) și intervalele blocate (`blockedSlots`) pe data aleasă.
4. **Calcul Disponibilitate:** Se ia Orarul General (din Settings) și se extrag intervalele de ocupare + durata serviciului ales pentru a calcula slot-urile de timp (ex. din oră în oră).
5. **Confirmare:** Clientul apasă confirmare. Se salvează documentul în `appointments` cu `status: 'confirmed'`. Odată salvat, slotul devine indisponibil pentru ceilalți.

### 3.2 Live Stats & Dashboard (Admin-Side)
Modulul `useLiveStats` rulează pe panoul administratorului și calculează în timp real dinamica salonului pe ziua de azi:
- Se filtrează programările din baza de date pentru ziua curentă (`date == azi`).
- **`totalToday`:** Suma de încasări presupuse.
- **`activeClients`:** Numărul total de oameni aflați în salon/programați asăzi.
- **`nextAppointment`:** Cea mai apropiată oră ocupată de acum încolo.
- **`trendOfTheDay`:** Algoritmul numără ce serviciu are cele mai multe rezervări azi și îl returnează („Trendul Zilei” vizibil sub Stats).

### 3.3 Anulări și Istoric
Pentru a păstra date analitice oneste:
- O rezervare anulată de client primește `status: 'cancelled'`. **NU se șterge** din baza de date, ea rămâne afișată în „Istoric” pentru client cu o vizualizare gri/tearsă, iar din sistem li se dă eliberarea sloturilor de timp.
- Admin-ul are control complet și poate muta statusul dintr-un clic în `completed` odată ce serviciul este prestat, declanșând probabil o funcție de recenzii / fidelizare.

---

## 🛡 4. Reguli de Securitate și Constrângeri 

- Se face o verificare pe *Client-Side* dar și pe *Server-Side* astfel încât să nu poată rezerva 2 persoane fix în același timp (Race Condition handling).
- O programare nu poate fi făcută în afara orariului (`Settings > schedule`), care suportă setări customizate pe zile de Luni până Duminică.
- Accesul la vizualizarea încasărilor brute (financiare) se face strict dacă variabila `role === 'admin'`. Employee-ul nu are acces la tab-ul general de încasări ale afacerii.

Acest document reflectă logica de bază pe care funcționează întregul sistem "state-of-the-art" de programări dezvoltat.
