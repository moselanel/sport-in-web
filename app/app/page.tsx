"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Trophy, ChevronRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/components/auth-context"

function MobileAppLanding() {
  const router = useRouter()
  const { login } = useAuth()

  const handleRoleSelect = (role: "player" | "guardian") => {
    login(role)
    router.push(`/app/${role}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <Link href="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">SportIn</span>
              <span className="text-xs text-muted-foreground block">Mobile App</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">Welcome to SportIn</h1>
          <p className="text-muted-foreground">Choose how you want to use the app</p>
        </div>

        {/* Role Selection */}
        <div className="space-y-4 max-w-md mx-auto">
          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("player")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">I&apos;m a Player</CardTitle>
                  <CardDescription>Showcase your skills and talents</CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </CardHeader>
          </Card>

          <Card
            className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("guardian")}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg text-foreground">I&apos;m a Guardian</CardTitle>
                  <CardDescription>Manage your child&apos;s profile</CardDescription>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Trust Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-sm text-muted-foreground">
            <Shield className="h-4 w-4 text-primary" />
            <span>Guardian-protected platform</span>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function MobileAppPage() {
  return (
    <AuthProvider>
      <MobileAppLanding />
    </AuthProvider>
  )
}
