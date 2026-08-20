"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { GraduationCap, Search, Shield, Trophy, ArrowRight, ArrowLeft, Zap, Users } from "lucide-react"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/components/auth-context"
import type { UserRole } from "@/lib/types"

const roles: {
  id: UserRole
  title: string
  tagline: string
  image: string
  alt: string
  icon: typeof Search
  accent: "primary" | "chart-3" | "accent"
}[] = [
  {
    id: "scout",
    title: "Scout Portal",
    tagline: "Discover and connect with talented athletes",
    image: "/images/role-scout.png",
    alt: "Talent scout analyzing a match from the stands",
    icon: Search,
    accent: "primary",
  },
  {
    id: "school",
    title: "School Portal",
    tagline: "Manage athletes, teams, and events",
    image: "/images/role-school.png",
    alt: "School coach leading a team huddle",
    icon: GraduationCap,
    accent: "chart-3",
  },
  {
    id: "admin",
    title: "Admin Portal",
    tagline: "Platform administration and moderation",
    image: "/images/role-admin.png",
    alt: "Operations desk with analytics dashboards",
    icon: Shield,
    accent: "accent",
  },
]

const accentText: Record<string, string> = {
  primary: "text-primary",
  "chart-3": "text-chart-3",
  accent: "text-accent",
}
const accentBg: Record<string, string> = {
  primary: "bg-primary",
  "chart-3": "bg-chart-3",
  accent: "bg-accent",
}
const accentBorder: Record<string, string> = {
  primary: "hover:border-primary/50",
  "chart-3": "hover:border-chart-3/50",
  accent: "hover:border-accent/50",
}

function WebPortalLanding() {
  const router = useRouter()
  const { login } = useAuth()

  const handleRoleSelect = (role: UserRole) => {
    login(role)
    router.push(`/portal/${role}`)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero band */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-athlete.png"
            alt="Young South African athlete sprinting on a floodlit pitch"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/90 to-foreground/60" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="flex items-center gap-3 py-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9 text-background hover:bg-background/10 hover:text-background">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center">
                <Trophy className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <span className="font-bold text-background">SportIn</span>
                <span className="block text-xs text-background/60 leading-none">Web Portal</span>
              </div>
            </div>
          </div>

          <div className="max-w-2xl py-12 md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent mb-5">
              <Zap className="h-4 w-4" />
              Professional tools for sport
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-background text-balance leading-[0.95]">
              Find the next
              <br />
              <span className="text-primary">game-changer.</span>
            </h1>
            <p className="mt-4 text-lg text-background/80 max-w-xl text-pretty leading-relaxed">
              Scouts, schools, and administrators &mdash; sign in to discover talent, manage teams, and run the network.
            </p>
          </div>
        </div>
      </header>

      {/* Role selection */}
      <main className="flex-1 container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl mb-10">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground text-balance">
            Choose your portal
          </h2>
          <p className="mt-2 text-muted-foreground text-pretty">Select the role that matches how you work.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`group text-left relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:shadow-xl ${accentBorder[role.accent]}`}
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={role.image || "/placeholder.svg"}
                  alt={role.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div
                  className={`absolute top-4 left-4 h-12 w-12 rounded-2xl ${accentBg[role.accent]} flex items-center justify-center shadow-lg`}
                >
                  <role.icon
                    className={
                      role.accent === "chart-3"
                        ? "h-6 w-6 text-background"
                        : role.accent === "primary"
                          ? "h-6 w-6 text-primary-foreground"
                          : "h-6 w-6 text-accent-foreground"
                    }
                  />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                <p className="text-muted-foreground mt-1 text-sm">{role.tagline}</p>
                <span
                  className={`mt-4 inline-flex items-center gap-1 font-semibold ${accentText[role.accent]} group-hover:gap-2 transition-all`}
                >
                  Sign in <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-14 pt-8 border-t border-border">
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
