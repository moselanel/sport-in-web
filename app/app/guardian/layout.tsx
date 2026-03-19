"use client"

import { AuthProvider } from "@/components/auth-context"
import { MobileLayout } from "@/components/mobile-layout"
import type { ReactNode } from "react"

export default function GuardianLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <MobileLayout role="guardian">{children}</MobileLayout>
    </AuthProvider>
  )
}
