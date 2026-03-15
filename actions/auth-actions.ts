import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    type UserCredential,
} from 'firebase/auth'
import { ref, set, get, query, orderByChild, equalTo } from 'firebase/database'
import { auth, db } from '@/lib/firebase'
import type { UserProfile } from '@/types'

function phoneToEmail(phone: string): string {
    const normalized = phone.replace(/\s|-/g, '')
    return `${normalized}@barbershop.local`
}

export async function registerUser(
    phone: string,
    password: string,
    name: string,
): Promise<UserCredential> {
    const email = phoneToEmail(phone)

    const credential = await createUserWithEmailAndPassword(auth, email, password)
    const uid = credential.user.uid

    await updateProfile(credential.user, { displayName: name })

    const profile: UserProfile = {
        name,
        phone,
        role: 'client',
        status: 'active',
        created_at: new Date().toISOString(),
    }
    await set(ref(db, `users/${uid}`), profile)

    return credential
}

export async function loginUser(
    phone: string,
    password: string
): Promise<UserCredential> {
    const email = phoneToEmail(phone)
    return signInWithEmailAndPassword(auth, email, password)
}

export async function logoutUser(): Promise<void> {
    return signOut(auth)
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    const snap = await get(ref(db, `users/${uid}`))
    return snap.exists() ? (snap.val() as UserProfile) : null
}

export async function getCurrentUserRole(uid: string): Promise<'admin' | 'client' | null> {
    const profile = await getUserProfile(uid)
    return profile?.role ?? null
}

export async function isPhoneRegistered(phone: string): Promise<boolean> {
    const normalized = phone.replace(/\s|-/g, '')
    const q = query(ref(db, 'users'), orderByChild('phone'), equalTo(normalized))
    const snap = await get(q)
    return snap.exists()
}
