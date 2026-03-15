import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, browserLocalPersistence, setPersistence } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Evită reinițializarea în Next.js HMR
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getDatabase(app)

// Sesiunea rămâne activă și după închiderea browserului (localStorage)
if (typeof window !== 'undefined') {
    setPersistence(auth, browserLocalPersistence).catch(() => { })
}
