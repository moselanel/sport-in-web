"use client"

import { AuthProvider } from "@/components/auth-context"
import { PortalLayout } from "@/components/portal-layout"
import type { ReactNode } from "react"

export default function SchoolLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PortalLayout role="school">{children}</PortalLayout>
    </AuthProvider>
  )
}
