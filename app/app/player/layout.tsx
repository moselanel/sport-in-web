"use client"

import { AuthProvider } from "@/components/auth-context"
import { MobileLayout } from "@/components/mobile-layout"
import type { ReactNode } from "react"

export default function PlayerLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MobileLayout role="player">{children}</MobileLayout>
    </AuthProvider>
  )
}
