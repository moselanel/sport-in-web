"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import type { User, UserRole } from "@/lib/types"

interface AuthContextType {
  user: User | null
  login: (role: UserRole) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: Record<UserRole, User> = {
  admin: {
    id: "1",
    name: "Admin User",
    email: "admin@sportin.co.za",
    role: "admin",
    verified: true,
  },
  scout: {
    id: "2",
    name: "David Williams",
    email: "david@kaizerschiefs.co.za",
    role: "scout",
    verified: true,
  },
  school: {
    id: "3",
    name: "John Smith",
    email: "jsmith@pbhs.co.za",
    role: "school",
    verified: true,
  },
  guardian: {
    id: "4",
    name: "Sarah Mokoena",
    email: "sarah@email.com",
    role: "guardian",
    verified: true,
  },
  player: {
    id: "5",
    name: "Thabo Mokoena",
    email: "thabo@email.com",
    role: "player",
    verified: true,
  },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = (role: UserRole) => {
    setUser(mockUsers[role])
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
