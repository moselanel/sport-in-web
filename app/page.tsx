"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Shield,
  Users,
  GraduationCap,
  Search,
  Trophy,
  ChevronRight,
  Smartphone,
  Monitor,
  Newspaper,
  MessageSquare,
  Network,
} from "lucide-react"
import { AuthProvider, useAuth } from "@/components/auth-context"
import type { UserRole } from "@/lib/types"

function WelcomePage() {
  const router = useRouter()
  const { login } = useAuth()

  const handleRoleSelect = (role: UserRole) => {
    login(role)
    switch (role) {
      case "admin":
        router.push("/portal/admin")
        break
      case "scout":
        router.push("/portal/scout")
        break
      case "school":
        router.push("/portal/school")
        break
      case "guardian":
        router.push("/app/guardian")
        break
      case "player":
        router.push("/app/player")
        break
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">SportIn</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => handleRoleSelect("scout")}>
            Scout Sign In
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            The Professional Network for Sport.
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Connect with athletes, scouts, coaches and schools. Share your journey, grow your network, and get
            discovered &mdash; with guardian-protected safety built in for every young athlete.
          </p>
        </div>

        {/* Platform Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* Mobile App Card */}
          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => router.push("/app")}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-4">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Smartphone className="h-7 w-7 text-primary" />
              </div>
              <CardTitle className="text-xl text-foreground">Mobile App</CardTitle>
              <CardDescription className="text-base">For Players and Guardians</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-primary" />
                  <span>Post updates & build your network</span>
                </li>
                <li className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span>Message connections safely</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>Guardian-controlled privacy & safety</span>
                </li>
              </ul>
              <Button className="w-full mt-4 group-hover:bg-primary/90">
                Open Mobile App
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Web Portal Card */}
          <Card
            className="bg-card border-border hover:border-accent/50 transition-all cursor-pointer group relative overflow-hidden"
            onClick={() => router.push("/portal")}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardHeader className="pb-4">
              <div className="h-14 w-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Monitor className="h-7 w-7 text-accent" />
              </div>
              <CardTitle className="text-xl text-foreground">Web Portal</CardTitle>
              <CardDescription className="text-base">For Admins, Scouts & Schools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Search className="h-4 w-4 text-accent" />
                  <span>Discover & connect with talent</span>
                </li>
                <li className="flex items-center gap-2">
                  <Network className="h-4 w-4 text-accent" />
                  <span>Grow your professional network</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-accent" />
                  <span>Manage schools & teams</span>
                </li>
              </ul>
              <Button variant="secondary" className="w-full mt-4 group-hover:bg-accent/20">
                Open Web Portal
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("player")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-foreground">I&apos;m a Player</CardTitle>
              <CardDescription>Showcase your skills and get discovered by scouts across South Africa</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("guardian")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-foreground">I&apos;m a Parent/Guardian</CardTitle>
              <CardDescription>
                Manage your child&apos;s profile with full control over privacy and contact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => handleRoleSelect("school")}
          >
            <CardHeader className="pb-4">
              <div className="h-12 w-12 rounded-xl bg-chart-3/10 flex items-center justify-center mb-4 group-hover:bg-chart-3/20 transition-colors">
                <GraduationCap className="h-6 w-6 text-chart-3" />
              </div>
              <CardTitle className="text-foreground">I&apos;m a School/Coach</CardTitle>
              <CardDescription>Manage your school&apos;s athletes, teams, and track performances</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="ghost" className="w-full justify-between group-hover:text-primary">
                Get Started <ChevronRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Admin & Scout Quick Access */}
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleRoleSelect("scout")}>
            <Search className="h-4 w-4" />
            Scout Portal
          </Button>
          <Button variant="outline" className="gap-2 bg-transparent" onClick={() => handleRoleSelect("admin")}>
            <Users className="h-4 w-4" />
            Admin Portal
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex flex-wrap justify-center gap-8 items-center text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span>Guardian Protected</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-primary" />
              <span>2,800+ Athletes</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span>340+ Schools</span>
            </div>
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              <span>89 Verified Scouts</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Your child&apos;s data is protected. Guardians remain in control.</p>
        </div>
      </footer>
    </div>
  )
}

export default function Page() {
  return (
    <AuthProvider>
      <WelcomePage />
    </AuthProvider>
  )
}
