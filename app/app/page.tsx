"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Shield, Trophy, ArrowRight, ArrowLeft, Zap, Video, Users } from "lucide-react"
import Link from "next/link"
import { AuthProvider, useAuth } from "@/components/auth-context"

const roles = [
  {
    id: "player" as const,
    title: "I'm a Player",
    tagline: "Showcase your skills and get discovered",
    image: "/images/role-player.png",
    alt: "Young athlete celebrating a goal under stadium floodlights",
    accent: "primary",
    perks: [
      { icon: Video, label: "Post highlight reels" },
      { icon: Users, label: "Grow your network" },
    ],
  },
  {
    id: "guardian" as const,
    title: "I'm a Guardian",
    tagline: "Manage your child's profile with full control",
    image: "/images/role-guardian.png",
    alt: "Proud parent beside their young athlete on the sideline",
    accent: "accent",
    perks: [
      { icon: Shield, label: "Approve every contact" },
      { icon: Users, label: "Control privacy" },
    ],
  },
]

function MobileAppLanding() {
  const router = useRouter()
  const { login } = useAuth()

  const handleRoleSelect = (role: "player" | "guardian") => {
    login(role)
    router.push(`/app/${role}`)
  }

  return (
    <div className="min-h-screen bg-background lg:grid lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden lg:flex flex-col justify-between overflow-hidden p-10">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-athlete.png"
            alt="Young South African athlete sprinting on a floodlit pitch"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/50" />
        </div>
        <div className="relative flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
            <Trophy className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <span className="text-xl font-bold tracking-tight text-background">SportIn</span>
            <span className="block text-xs text-background/60">Mobile App</span>
          </div>
        </div>
        <div className="relative max-w-sm">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent mb-5">
            <Zap className="h-4 w-4" />
            South Africa&apos;s Sports Network
          </span>
          <h2 className="text-4xl font-bold tracking-tighter text-background text-balance leading-[0.95]">
            Your talent.
            <br />
            Their <span className="text-primary">spotlight.</span>
          </h2>
          <p className="mt-4 text-background/75 text-pretty leading-relaxed">
            One app for young athletes and the guardians who champion them &mdash; safe, connected, built to get you
            seen.
          </p>
        </div>
      </aside>

      {/* Selection panel */}
      <main className="flex flex-col min-h-screen lg:min-h-0">
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 lg:border-0 lg:bg-transparent">
          <div className="px-4 lg:px-10 py-4 flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-2 lg:hidden">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SportIn</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col justify-center px-4 lg:px-10 py-8 lg:py-0 max-w-xl w-full mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
              How do you play?
            </h1>
            <p className="mt-2 text-muted-foreground text-pretty">
              Choose your role to jump into the app.
            </p>
          </div>

          <div className="space-y-5">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="group relative w-full overflow-hidden rounded-3xl border border-border bg-card text-left transition-all hover:shadow-xl data-[accent=primary]:hover:border-primary/50 data-[accent=accent]:hover:border-accent/50"
                data-accent={role.accent}
              >
                <div className="flex items-stretch">
                  <div className="relative w-32 sm:w-40 shrink-0 overflow-hidden">
                    <Image
                      src={role.image || "/placeholder.svg"}
                      alt={role.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/90" />
                  </div>
                  <div className="flex-1 p-5">
                    <h3 className="text-xl font-bold text-foreground">{role.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{role.tagline}</p>
                    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                      {role.perks.map((perk) => (
                        <li key={perk.label} className="flex items-center gap-1.5 text-xs text-foreground/70">
                          <perk.icon
                            className={role.accent === "primary" ? "h-3.5 w-3.5 text-primary" : "h-3.5 w-3.5 text-accent"}
                          />
                          {perk.label}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={
                        role.accent === "primary"
                          ? "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all"
                          : "mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all"
                      }
                    >
                      Get started <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
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
