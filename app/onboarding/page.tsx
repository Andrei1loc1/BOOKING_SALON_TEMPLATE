"use client"
import { GlowCard } from "@/components/ui/glow-card"
import { auth, db } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { get, ref, set } from "firebase/database";
import { Shield, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OnboardingPage() {
    const router = useRouter()
    const [loading, setLoading] = useState<'client' | 'admin' | null>(null)
    const [error, setError] = useState<string | null>(null)


    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5">
            <div className="mb-6 flex flex-col items-center gap-3">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                        border: '2px solid oklch(0.84 0.18 80 / 0.7)',
                        background: 'oklch(0.16 0 0)',
                        boxShadow: '0 0 32px oklch(0.84 0.18 80 / 0.25)',
                    }}
                >
                    <span className="text-2xl font-bold" style={{ color: 'oklch(0.84 0.18 80)' }}>B</span>
                </div>
                <span className="text-gold-gradient text-3xl font-bold tracking-tight">BarberApp</span>
            </div>

            <div className="mb-8 px-3 py-1 rounded-full text-xs font-medium"
                style={{
                    background: 'oklch(0.84 0.18 80 / 0.12)',
                    color: 'oklch(0.84 0.18 80)',
                    border: '1px solid oklch(0.84 0.18 80 / 0.25)',
                }}
            >
                Mod Test — Alege rolul
            </div>

            <div className="w-full max-w-sm flex flex-col gap-4">
                {/* Client */}
                <div
                    className="rounded-3xl p-[1px] overflow-hidden cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)' }}
                    onClick={async () => {
                        try {
                            setLoading("client")
                            setError(null)

                            const cred = await signInWithEmailAndPassword(
                                auth,
                                "client@demo.com",
                                "123456"
                            )

                            const user = cred.user

                            const userRef = ref(db, "users/" + user.uid)
                            const snapshot = await get(userRef)

                            if (!snapshot.exists()) {
                                await set(userRef, {
                                    name: "Demo Client",
                                    phone: "0700000000",
                                    role: "client",
                                    status: "active",
                                    created_at: new Date().toISOString()
                                })
                            }

                            router.push("/homepage")
                        } catch (err) {
                            setError("Eroare la autentificare")
                        } finally {
                            setLoading(null)
                        }
                    }}
                >
                    <GlowCard className="!mx-0 !mt-0 relative w-full bg-card rounded-[calc(1.5rem-1px)] z-10 !border-0 !shadow-none !ring-0 before:hidden after:hidden">
                        <div className="flex items-center gap-4 px-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: 'oklch(0.84 0.18 80 / 0.12)', border: '1px solid oklch(0.84 0.18 80 / 0.25)' }}
                            >
                                <User size={22} style={{ color: 'oklch(0.84 0.18 80)' }} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-foreground">
                                    {loading === 'client' ? 'Se autentifică...' : 'Intră ca Client'}
                                </span>
                                <span className="text-sm text-muted-foreground">Vezi dashboard-ul clientului</span>
                            </div>
                        </div>
                    </GlowCard>
                </div>

                {/* Admin */}
                <div
                    className="rounded-3xl p-[1px] overflow-hidden cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)' }}
                    onClick={() => { router.push("/admin/dashboard") }}
                >
                    <GlowCard className="!mx-0 !mt-0 relative w-full bg-card rounded-[calc(1.5rem-1px)] z-10 !border-0 !shadow-none !ring-0 before:hidden after:hidden">
                        <div className="flex items-center gap-4 px-5">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                                style={{ background: 'oklch(0.84 0.18 80 / 0.12)', border: '1px solid oklch(0.84 0.18 80 / 0.25)' }}
                            >
                                <Shield size={22} style={{ color: 'oklch(0.84 0.18 80)' }} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-semibold text-foreground">
                                    {loading === 'admin' ? 'Se autentifică...' : 'Intră ca Admin'}
                                </span>
                                <span className="text-sm text-muted-foreground">Panou de administrare</span>
                            </div>
                        </div>
                    </GlowCard>
                </div>
            </div>

            {error && <p className="mt-4 text-sm text-destructive text-center max-w-sm">{error}</p>}
        </div>
    )
}
