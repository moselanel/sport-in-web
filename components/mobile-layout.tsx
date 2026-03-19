"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Trophy, Video, Settings, Bell, LogOut, Target, Mail, Home, Upload, User, Users } from "lucide-react"
import { useAuth } from "./auth-context"

interface NavItem {
  label: string
  href: string
  icon: ReactNode
  badge?: number
}

const mobileNavItems: Record<"player" | "guardian", NavItem[]> = {
  player: [
    { label: "Home", href: "/app/player", icon: <Home className="h-5 w-5" /> },
    { label: "Videos", href: "/app/player/videos", icon: <Video className="h-5 w-5" /> },
    { label: "Upload", href: "/app/player/upload", icon: <Upload className="h-5 w-5" /> },
    { label: "Challenges", href: "/app/player/challenges", icon: <Target className="h-5 w-5" /> },
    { label: "Profile", href: "/app/player/profile", icon: <User className="h-5 w-5" /> },
  ],
  guardian: [
    { label: "Home", href: "/app/guardian", icon: <Home className="h-5 w-5" /> },
    { label: "Players", href: "/app/guardian/players", icon: <Users className="h-5 w-5" /> },
    { label: "Requests", href: "/app/guardian/requests", icon: <Mail className="h-5 w-5" />, badge: 2 },
    { label: "Settings", href: "/app/guardian/settings", icon: <Settings className="h-5 w-5" /> },
  ],
}

interface MobileLayoutProps {
  children: ReactNode
  role: "player" | "guardian"
}

export function MobileLayout({ children, role }: MobileLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const items = mobileNavItems[role]

  const handleLogout = () => {
    logout()
    router.push("/app")
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Header */}
      <header className="h-14 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-40 flex items-center px-4 gap-4">
        {/* Logo */}
        <Link href="/app" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">SportIn</span>
        </Link>

        <div className="flex-1" />

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-primary rounded-full" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Page Content - with bottom padding for nav */}
      <main className="flex-1 pb-20 overflow-auto">{children}</main>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border z-50 safe-area-pb">
        <div className="flex items-center justify-around h-full max-w-lg mx-auto">
          {items.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/app/player" && item.href !== "/app/guardian" && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-2 min-w-[64px] relative",
                  isActive ? "text-primary" : "text-muted-foreground",
                )}
              >
                <div className="relative">
                  {item.icon}
                  {item.badge && (
                    <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-[10px] font-medium rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
