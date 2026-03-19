"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Search, Shield, Trophy, ChevronRight, ArrowLeft, Users } from "lucide-react"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/components/auth-context"
import type { UserRole } from "@/lib/types"

function WebPortalLanding() {
  const router = useRouter()
  const { login } = useAuth()

  const handleRoleSelect = (role: UserRole) => {
    login(role)
    router.push(`/portal/${role}`)
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
            <div className="h-9 w-9 rounded-lg bg-accent flex items-center justify-center">
              <Trophy className="h-5 w-5 text-accent-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold text-foreground">SportIn</span>
              <span className="text-xs text-muted-foreground block">Web Portal</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3 text-balance">SportIn Web Portal</h1>
          <p className="text-muted-foreground">Access the platform as a Scout, School, or Administrator</p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("scout")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-foreground">Scout Portal</CardTitle>
              <CardDescription>Discover and connect with talented athletes</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Sign In <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-chart-3/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("school")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-3 group-hover:bg-chart-3/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle className="text-foreground">School Portal</CardTitle>
              <CardDescription>Manage athletes, teams, and events</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-chart-3">
                Sign In <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("admin")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-3 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-foreground">Admin Portal</CardTitle>
              <CardDescription>Platform administration and moderation</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-accent">
                Sign In <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8 items-center text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>2,800+ Athletes</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              <span>340+ Schools</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <span>89 Verified Scouts</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function PortalPage() {
  return (
    <AuthProvider>
      <WebPortalLanding />
    </AuthProvider>
  )
}
