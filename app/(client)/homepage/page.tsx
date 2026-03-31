'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import ClientPage from '../page'

export default function Homepage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/onboarding')
    }
  }, [user, loading, router])

  // While loading auth state, show loading spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-12 h-12 rounded-full animate-spin"
            style={{
              border: '2px solid transparent',
              borderTopColor: 'oklch(0.84 0.18 80)',
              borderRightColor: 'oklch(0.84 0.18 80 / 0.3)',
            }}
          />
          <span className="text-sm text-muted-foreground">Se verifică sesiunea...</span>
        </div>
      </div>
    )
  }

  // If authenticated, show client dashboard
  if (user) {
    return <ClientPage />
  }

  // If not authenticated, this will redirect in useEffect
  return null
}