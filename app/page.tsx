"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Users,
  GraduationCap,
  Search,
  Trophy,
  ChevronRight,
  Smartphone,
  Monitor,
  Video,
  Zap,
  ArrowRight,
} from "lucide-react"
import { AuthProvider } from "@/components/auth-context"

function WelcomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/70 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Trophy className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">SportIn</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/portal")}>
              Web Portal
            </Button>
            <Button size="sm" onClick={() => router.push("/app")}>
              Open App
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero-athlete.png"
              alt="Young South African athlete sprinting on a floodlit pitch"
              fill
              priority
              className="object-cover object-center"
            />
            {/* Dark gradient for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/85 to-foreground/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent" />
          </div>

          <div className="relative container mx-auto px-4 py-24 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 border border-accent/30 px-4 py-1.5 text-sm font-medium text-accent mb-6">
                <Zap className="h-4 w-4" />
                South Africa&apos;s Sports Network
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-background text-balance leading-[0.95]">
                Get seen.
                <br />
                Get <span className="text-primary">signed.</span>
              </h1>
              <p className="mt-6 text-lg md:text-xl text-background/80 max-w-xl text-pretty leading-relaxed">
                The professional network built for sport. Showcase highlights, grow your network, and get discovered by
                scouts and schools &mdash; with guardian-grade safety for every young athlete.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" className="gap-2 text-base h-12 px-6" onClick={() => router.push("/app")}>
                  <Smartphone className="h-5 w-5" />
                  Open Mobile App
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 text-base h-12 px-6"
                  onClick={() => router.push("/portal")}
                >
                  <Monitor className="h-5 w-5" />
                  Enter Web Portal
                </Button>
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="relative border-t border-background/10 bg-foreground/40 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
                {[
                  { value: "2,800+", label: "Athletes", icon: Trophy },
                  { value: "340+", label: "Schools", icon: GraduationCap },
                  { value: "89", label: "Verified Scouts", icon: Search },
                  { value: "100%", label: "Guardian Protected", icon: Shield },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 justify-center md:justify-start">
                    <stat.icon className="h-6 w-6 text-primary shrink-0" />
                    <div>
                      <div className="text-xl font-bold text-background leading-none">{stat.value}</div>
                      <div className="text-sm text-background/60">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Choose your path */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
              Choose how you play
            </h2>
            <p className="mt-3 text-lg text-muted-foreground text-pretty">
              Two ways in, one connected network. Pick the experience that fits you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Mobile App */}
            <button
              onClick={() => router.push("/app")}
              className="group text-left relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-primary/50 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/sport-netball.png"
                  alt="Young netball player leaping for the ball"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <Smartphone className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground">Mobile App</h3>
                <p className="text-muted-foreground mt-1">For players &amp; guardians</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-primary" /> Post highlights &amp; build your profile
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" /> Grow your network &amp; message safely
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" /> Guardian-controlled privacy
                  </li>
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-primary group-hover:gap-2 transition-all">
                  Open the app <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>

            {/* Web Portal */}
            <button
              onClick={() => router.push("/portal")}
              className="group text-left relative overflow-hidden rounded-3xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-xl"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src="/images/sport-rugby.png"
                  alt="Young rugby player breaking a tackle"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
                <div className="absolute top-4 left-4 h-12 w-12 rounded-2xl bg-accent flex items-center justify-center shadow-lg">
                  <Monitor className="h-6 w-6 text-accent-foreground" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground">Web Portal</h3>
                <p className="text-muted-foreground mt-1">For scouts, schools &amp; admins</p>
                <ul className="mt-4 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-accent" /> Discover &amp; scout talent
                  </li>
                  <li className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" /> Manage schools &amp; teams
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-accent" /> Track performances &amp; requests
                  </li>
                </ul>
                <span className="mt-5 inline-flex items-center gap-1 font-semibold text-accent group-hover:gap-2 transition-all">
                  Enter the portal <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          </div>
        </section>

        {/* Feature band */}
        <section className="bg-secondary/50 border-y border-border">
          <div className="container mx-auto px-4 py-16 md:py-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground text-balance">
                Everything you need to break through
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Video,
                  title: "Showcase your game",
                  body: "Upload highlight reels and build a profile that puts your skills front and centre.",
                },
                {
                  icon: Search,
                  title: "Get discovered",
                  body: "Verified scouts and schools search real talent daily. Be the athlete they find.",
                },
                {
                  icon: Shield,
                  title: "Safe by design",
                  body: "Every young athlete is guardian-protected. Contact and privacy stay in trusted hands.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-card border border-border p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{feature.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 md:py-20 text-center">
            <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-primary-foreground/10" />
            <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary-foreground/10" />
            <div className="relative max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground text-balance">
                Your breakthrough starts here
              </h2>
              <p className="mt-3 text-lg text-primary-foreground/80 text-pretty">
                Join thousands of South African athletes already building their future on SportIn.
              </p>
              <Button
                size="lg"
                variant="secondary"
                className="mt-8 gap-2 text-base h-12 px-8"
                onClick={() => router.push("/app")}
              >
                Get Started
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SportIn</span>
          </div>
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
