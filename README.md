# Salon Booking App — Whitelabel SaaS Template

> A production-ready booking platform for hair salons, barbershops, and beauty centers.  
> Deploy a fully branded, isolated instance for any client in under **5 minutes**.

<br />

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Run Locally](#run-locally)
- [Whitelabel Deployment (New Client)](#whitelabel-deployment-new-client)
  - [Step 1 — Initialize Firebase](#step-1--initialize-firebase)
  - [Step 2 — Customize the Theme](#step-2--customize-the-theme)
  - [Step 3 — Deploy to Vercel](#step-3--deploy-to-vercel)
- [Project Structure](#project-structure)
- [License](#license)

---

## Overview

This template provides a **complete, multi-tenant SaaS foundation** for appointment-based businesses. Each client deployment connects to its own dedicated Firebase project, ensuring full data isolation and independent scalability.

The codebase is designed to be reusuable and configurable — a single repository powers unlimited branded instances, with all customization centralized in one config file.

---

## Key Features

| Feature | Description |
|---|---|
| 📱 **Client Booking Flow** | Smooth, step-by-step appointment wizard optimized for mobile |
| 🛡️ **Admin Dashboard** | Full control over appointments, staff, clients, services, and settings |
| 🎨 **Dynamic Theming** | Switch brand colors per-client via `config/salonConfig.ts` — no code changes needed |
| ☁️ **Multi-Tenant Architecture** | Each client has a fully isolated Firebase project and database |
| ⚡ **Automated Setup Script** | `scripts/init-salon.js` seeds the entire DB and creates the admin account in one command |
| 🔥 **Real-Time Updates** | Firebase Realtime Database keeps all views in sync instantly |
| 📊 **Live Statistics** | Revenue tracking, trending services, and daily appointment insights |
| 🏷️ **Offer & Discount Management** | Create and display promotional campaigns directly from the dashboard |
| 📲 **PWA Support** | Installable as a Progressive Web App for a native app feel |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS + OKLCH color system |
| **Backend & Auth** | Firebase (Authentication, Realtime Database) |
| **Icons** | Lucide React |
| **UI Primitives** | Radix UI / custom shadcn-style components |
| **Deployment** | Vercel |

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- A **Google Firebase** account with:
  - Authentication enabled (Phone provider)
  - Realtime Database created
- A **Vercel** account (recommended for deployment)

---

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Andrei1loc1/BOOKING_SALON_TEMPLATE.git
cd BOOKING_SALON_TEMPLATE

# 2. Install dependencies
npm install
```

---

### Environment Variables

Create a `.env.local` file in the project root and populate it with your Firebase project credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.europe-west1.firebasedatabase.app
```

> **Where to find these values:**  
> Firebase Console → Your Project → Project Settings → General → "Your apps" section.

---

### Run Locally

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Whitelabel Deployment (New Client)

A new fully-branded client instance can be live in under 5 minutes by following these three steps.

### Step 1 — Initialize Firebase

1. Create a **new Firebase project** for the client.
2. Enable **Authentication** → Phone provider.
3. Enable **Realtime Database** (choose the region closest to the client).
4. Go to **Project Settings → Service Accounts** and download the Service Account JSON.
5. Save the file as `firebase-service-account.json` in the project root.  
   *(This file is git-ignored — never commit it.)*
6. Open `scripts/init-salon.js` and update the `CLIENT_CONFIG` block with the client's details:
   - Admin phone number
   - Salon name
   - Currency
   - Default services
7. Run the seeder:

```bash
node scripts/init-salon.js
```

This command automatically creates all database collections, default services, business settings, and the owner's admin account — with zero manual Firebase data entry.

---

### Step 2 — Customize the Theme

1. Open `config/salonConfig.ts`.
2. Set `THEME_COLORS` to one of the built-in presets (`Gold`, `Blue`, `Green`, `Purple`, `Rose`) or define a custom OKLCH palette.
3. Replace `public/logo.svg` and `public/favicon.ico` with the client's branding assets.

---

### Step 3 — Deploy to Vercel

1. Push your customized branch to GitHub.
2. Create a **new Vercel project** linked to the repository.
3. Add the client's Firebase credentials under **Settings → Environment Variables**.
4. Click **Deploy**.

The new instance is live, fully isolated, and independently scalable.

---

## Project Structure

```
bookingapp/
├── actions/        # Server actions — booking logic, admin operations
├── app/            # Next.js App Router
│   ├── (client)/   # Customer-facing pages (booking flow, history)
│   └── (admin)/    # Admin pages (dashboard, schedule, settings)
├── components/     # Reusable UI components (cards, modals, buttons)
├── config/         # Whitelabel config (theme presets, salon definitions)
├── hooks/          # Custom React hooks (useAuth, useAppointments, etc.)
├── lib/            # Utility functions (date helpers, formatters, calculators)
├── scripts/        # Automation scripts (init-salon.js)
├── types/          # Global TypeScript type definitions
└── public/         # Static assets (logo, icons, manifest)
```

---

## License

This project is a **commercial template**. Redistribution or resale without explicit permission is not permitted.  
For licensing inquiries, please open an issue or contact the author directly.

---

*Built with care for modern businesses that deserve scalable, professional software.*
