"use client"

import { type ReactNode, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Trophy,
  LayoutDashboard,
  Users,
  GraduationCap,
  Video,
  FileText,
  Settings,
  Search,
  Bell,
  Menu,
  X,
  LogOut,
  Target,
  Mail,
  Shield,
  Newspaper,
  Network,
  MessageSquare,
} from "lucide-react"
import { useAuth } from "./auth-context"

interface NavItem {
  label: string
  href: string
  icon: ReactNode
  badge?: number
}

const portalNavItems: Record<"admin" | "scout" | "school", NavItem[]> = {
  admin: [
    { label: "Dashboard", href: "/portal/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Feed", href: "/portal/admin/feed", icon: <Newspaper className="h-5 w-5" /> },
    { label: "Network", href: "/portal/admin/network", icon: <Network className="h-5 w-5" /> },
    { label: "Messages", href: "/portal/admin/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "Talent Management", href: "/portal/admin/talents", icon: <Users className="h-5 w-5" /> },
    { label: "Schools", href: "/portal/admin/schools", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Video Moderation", href: "/portal/admin/videos", icon: <Video className="h-5 w-5" />, badge: 12 },
    { label: "Skill Challenges", href: "/portal/admin/challenges", icon: <Target className="h-5 w-5" /> },
    { label: "Contact Requests", href: "/portal/admin/contacts", icon: <Mail className="h-5 w-5" /> },
    { label: "Reports & Safety", href: "/portal/admin/reports", icon: <Shield className="h-5 w-5" /> },
  ],
  scout: [
    { label: "Talent Discovery", href: "/portal/scout", icon: <Search className="h-5 w-5" /> },
    { label: "Feed", href: "/portal/scout/feed", icon: <Newspaper className="h-5 w-5" /> },
    { label: "Network", href: "/portal/scout/network", icon: <Network className="h-5 w-5" /> },
    { label: "Messages", href: "/portal/scout/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "My Requests", href: "/portal/scout/requests", icon: <Mail className="h-5 w-5" /> },
    { label: "Saved Players", href: "/portal/scout/saved", icon: <Users className="h-5 w-5" /> },
  ],
  school: [
    { label: "Dashboard", href: "/portal/school", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Feed", href: "/portal/school/feed", icon: <Newspaper className="h-5 w-5" /> },
    { label: "Network", href: "/portal/school/network", icon: <Network className="h-5 w-5" /> },
    { label: "Messages", href: "/portal/school/messages", icon: <MessageSquare className="h-5 w-5" /> },
    { label: "My Players", href: "/portal/school/players", icon: <Users className="h-5 w-5" /> },
    { label: "Teams & Squads", href: "/portal/school/teams", icon: <Target className="h-5 w-5" /> },
    { label: "Events & Trials", href: "/portal/school/events", icon: <FileText className="h-5 w-5" /> },
    { label: "Invites", href: "/portal/school/invites", icon: <Mail className="h-5 w-5" /> },
  ],
}

interface PortalLayoutProps {
  children: ReactNode
  role: "admin" | "scout" | "school"
}

export function PortalLayout({ children, role }: PortalLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const items = portalNavItems[role]

  const handleLogout = () => {
    logout()
    router.push("/portal")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <Link href="/portal" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <Trophy className="h-5 w-5 text-sidebar-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-semibold text-sidebar-foreground">SportIn</span>
              <span className="text-xs text-sidebar-foreground/60 block">Web Portal</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {items.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== `/portal/${role}` && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                {item.icon}
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <Badge variant="secondary" className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Link>
            )
          })}
        </nav>

        {/* User Menu */}
        <div className="p-4 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-sidebar-accent transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-sidebar-foreground">{user?.name || "User"}</p>
                  <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40 flex items-center px-4 lg:px-6 gap-4">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Logo */}
          <Link href="/portal" className="flex lg:hidden items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Trophy className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">SportIn Portal</span>
          </Link>

          <div className="flex-1" />

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full" />
          </Button>

          {/* Desktop User Menu */}
          <div className="hidden lg:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
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
          </div>
        </header>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-background z-30">
            <nav className="p-4 space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    )}
                  >
                    {item.icon}
                    <span className="flex-1">{item.label}</span>
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
