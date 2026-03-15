'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GlowCard } from '@/components/ui/glow-card'
import { registerUser } from '@/actions/auth-actions'

export default function RegisterPage() {
    const router = useRouter()
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (password !== confirmPassword) {
            setError('Parolele nu se potrivesc.')
            return
        }

        if (password.length < 6) {
            setError('Parola trebuie să aibă cel puțin 6 caractere.')
            return
        }

        setLoading(true)

        try {
            await registerUser(phone.trim(), password, name.trim())
            router.push('/')
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : ''
            if (message.includes('email-already-in-use')) {
                setError('Acest număr de telefon este deja înregistrat.')
            } else if (message.includes('weak-password')) {
                setError('Parola trebuie să aibă cel puțin 6 caractere.')
            } else {
                setError('A apărut o eroare. Încearcă din nou.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-5 py-10">
            {/* Logo / Brand */}
            <div className="mb-10 flex flex-col items-center gap-3">
                <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                        border: '2px solid oklch(0.84 0.18 80 / 0.7)',
                        background: 'oklch(0.16 0 0)',
                        boxShadow: '0 0 32px oklch(0.84 0.18 80 / 0.25)',
                    }}
                >
                    <span
                        className="text-2xl font-bold"
                        style={{ color: 'oklch(0.84 0.18 80)' }}
                    >
                        B
                    </span>
                </div>
                <span className="text-gold-gradient text-3xl font-bold tracking-tight">
                    BarberApp
                </span>
            </div>

            {/* Card */}
            <div
                className="relative w-full max-w-sm rounded-3xl p-[1px] overflow-hidden"
                style={{
                    background:
                        'linear-gradient(135deg, var(--color-gold) 0%, transparent 35%, transparent 65%, var(--color-gold) 100%)',
                }}
            >
                <GlowCard className="!mx-0 !mt-0 relative w-full bg-card rounded-[calc(1.5rem-1px)] z-10 !border-0 !shadow-none !ring-0 before:hidden after:hidden">
                    <CardHeader>
                        <CardTitle className="text-2xl text-gold-gradient">
                            Creează cont
                        </CardTitle>
                        <CardDescription>
                            Înregistrează-te pentru a programa vizite.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="register-form">
                            {/* Name */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="register-name"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Nume complet
                                </label>
                                <input
                                    id="register-name"
                                    type="text"
                                    autoComplete="name"
                                    placeholder="Ion Popescu"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    className="w-full rounded-xl px-4 py-3 text-sm bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    style={{
                                        border: '1px solid oklch(0.30 0 0 / 0.45)',
                                    }}
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="register-phone"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Număr de telefon
                                </label>
                                <input
                                    id="register-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="07XX XXX XXX"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    required
                                    className="w-full rounded-xl px-4 py-3 text-sm bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    style={{
                                        border: '1px solid oklch(0.30 0 0 / 0.45)',
                                    }}
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="register-password"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Parolă
                                </label>
                                <input
                                    id="register-password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="w-full rounded-xl px-4 py-3 text-sm bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    style={{
                                        border: '1px solid oklch(0.30 0 0 / 0.45)',
                                    }}
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="flex flex-col gap-1.5">
                                <label
                                    htmlFor="register-confirm-password"
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    Confirmă parola
                                </label>
                                <input
                                    id="register-confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full rounded-xl px-4 py-3 text-sm bg-secondary text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    style={{
                                        border: '1px solid oklch(0.30 0 0 / 0.45)',
                                    }}
                                />
                            </div>

                            {/* Error */}
                            {error && (
                                <p className="text-sm text-destructive text-center -mt-1">
                                    {error}
                                </p>
                            )}

                            {/* Submit */}
                            <Button
                                id="register-submit"
                                type="submit"
                                disabled={loading}
                                className="
                                    w-full text-black font-semibold text-center justify-center px-6 mt-1
                                    rounded-xl py-4
                                    !bg-[linear-gradient(to_right,oklch(0.55_0.15_72),var(--color-gold-light),oklch(0.55_0.15_72))]
                                    shadow-[0_12px_35px] shadow-gold-2/25
                                    relative overflow-hidden
                                    disabled:opacity-60
                                "
                            >
                                <span
                                    className="
                                        pointer-events-none absolute inset-0
                                        bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.0))]
                                        opacity-30
                                    "
                                />
                                <span className="relative">
                                    {loading ? 'Se creează contul...' : 'Creează cont'}
                                </span>
                            </Button>
                        </form>
                    </CardContent>
                </GlowCard>
            </div>

            {/* Login link */}
            <p className="mt-6 text-sm text-muted-foreground">
                Ai deja cont?{' '}
                <button
                    id="go-to-login"
                    onClick={() => router.push('/login')}
                    className="font-semibold text-gold-gradient hover:opacity-80 transition-opacity bg-transparent border-none cursor-pointer p-0"
                >
                    Autentifică-te
                </button>
            </p>
        </div>
    )
}
