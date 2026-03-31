'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to onboarding page
    router.replace('/onboarding')
  }, [router])

  return null
}