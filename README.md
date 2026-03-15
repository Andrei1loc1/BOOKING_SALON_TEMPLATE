# 🚀 Salon Booking App - Whitelabel SaaS Template

A professional, scalable, and fully dynamic booking application template designed for hair salons, barbershops, and beauty centers. Built with a Whitelabel/SaaS architecture in mind, allowing you to instantly deploy unique instances for multiple clients with isolated Firebase databases.

## ✨ Key Features

- **📱 User Booking Flow:** Seamless step-by-step booking experience optimized for mobile devices.
- **🛡️ Admin Dashboard:** Complete control for salon owners over appointments, services, users (employees/clients), and business settings.
- **🎨 Whitelabel Ready (Dynamic Theming):** Easily switch color palettes and business features via a single central config file (`config/salonConfig.ts`).
- **☁️ Multi-Tenant via Separate DBs:** Fully isolated client data. Each deployment connects to its own dedicated Firebase project.
- **⚡ Automated Setup Script:** Includes a specialized seeder script (`scripts/init-salon.js`) to instantly generate the necessary database structure and the initial admin user.
- **🔥 Real-time Data:** Powered by Firebase Realtime Database and Auth for instant, reliable updates across all clients.
- **📊 Live Statistics & Offer Management:** Built-in tools for tracking revenue, popular services, and managing discount campaigns dynamically.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + OKLCH Colors (for mathematically precise theme generation)
- **Backend & Auth:** Firebase (Authentication, Realtime Database)
- **Icons:** Lucide React
- **UI Components:** Radix UI / shadcn-like custom builds

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A Google Firebase account (with Realtime Database and Authentication via Phone enabled)
- Vercel account (for fast deployment)

### 2. Installation

Clone the repository:
```bash
git clone https://github.com/Andrei1loc1/BOOKING_SALON_TEMPLATE.git
cd BOOKING_SALON_TEMPLATE
```

Install dependencies:
```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your Firebase configuration:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.europe-west1.firebasedatabase.app
```

## 🏭 Whitelabel Deployment Process (For New Clients)

Deploying a new instance for a client takes less than 5 minutes.

### Step 1: Initialize the Client's Database
1. Create a new Firebase project for the client.
2. Enable **Authentication** (Phone provider) and **Realtime Database**.
3. Download the Service Account JSON from *Firebase Project Settings -> Service Accounts*.
4. Save it as `firebase-service-account.json` in the project root *(Note: This file is git-ignored for security).*
5. Update the `CLIENT_CONFIG` block in `scripts/init-salon.js` with the new client's details (Admin Phone, Name, Shop Name, currency, etc.).
6. Run the initialization script:
   ```bash
   node scripts/init-salon.js
   ```
   *This automatically generates the default services, settings, empty collections, and creates the owner's Admin account with zero manual Firebase data entry.*

### Step 2: Customize Visual Theme
1. Open `config/salonConfig.ts`.
2. Update the `THEME_COLORS` with one of the predefined presets (e.g., Gold, Blue, Green, Purple, Rose) or create a custom OKLCH palette.
3. Replace `public/logo.svg` and `public/favicon.ico` with the client's logo.

### Step 3: Deploy
1. Push your custom changes to a branch or just connect your main repo.
2. Create a new project in Vercel.
3. Add the new client's Firebase variables to the Vercel Environment Variables section.
4. Click **Deploy**. The site is instantly live and fully decoupled!

## 📁 Project Structure

```text
├── actions/            # Server actions for booking logic and admin operations
├── app/                # Next.js App Router (/(client) and /(admin) views grouped)
├── components/         # Reusable UI cards, buttons, dashboard components
├── config/             # Whitelabel configuration (Salon presets, Themes, Definitions)
├── hooks/              # Custom React hooks (useAuth, useAppointments, useSettings)
├── lib/                # Utility modules (date formatting, calculation utils)
├── scripts/            # Setup and deployment automation scripts (init-salon.js)
├── types/              # TypeScript global definitions
└── public/             # Static assets (logos, icons)
```

---
*Built with ❤️ for modern businesses looking for scalable software solutions.*
