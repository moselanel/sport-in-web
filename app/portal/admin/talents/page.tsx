"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard } from "@/components/stat-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers } from "@/lib/mock-data"
import { Users, Search, MapPin, ShieldCheck, Clock } from "lucide-react"

const statusStyles = {
  active: "bg-primary/10 text-primary",
  pending: "bg-accent/10 text-accent",
  suspended: "bg-destructive/10 text-destructive",
} as const

export default function AdminTalents() {
  const [query, setQuery] = useState("")
  const [tab, setTab] = useState<"all" | "active" | "pending">("all")

  const players = mockPlayers.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase())
    const matchesTab = tab === "all" || p.status === tab
    return matchesQuery && matchesTab
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Talent Management</h1>
        <p className="text-muted-foreground">Manage registered athletes across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Players" value={mockPlayers.length} icon={<Users className="h-6 w-6" />} />
        <StatCard
          title="Active"
          value={mockPlayers.filter((p) => p.status === "active").length}
          icon={<ShieldCheck className="h-6 w-6" />}
        />
        <StatCard
          title="Pending"
          value={mockPlayers.filter((p) => p.status === "pending").length}
          icon={<Clock className="h-6 w-6" />}
        />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search athletes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
          <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
            <TabsList className="bg-muted">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-0 divide-y divide-border">
          {players.map((player) => (
            <div key={player.id} className="flex items-center justify-between gap-4 p-4">
              <div className="flex items-center gap-3 min-w-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground truncate">{player.name}</p>
                    {player.guardian.verified && <VerifiedBadge type="guardian" showLabel={false} />}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {player.region} - {player.age} yrs
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex flex-wrap gap-1.5 justify-end max-w-[180px]">
                  {player.sports.map((sport) => (
                    <Badge key={sport.id} variant="secondary" className="text-xs">
                      {sport.name}
                    </Badge>
                  ))}
                </div>
                <Badge className={statusStyles[player.status as keyof typeof statusStyles] ?? statusStyles.active}>
                  {player.status}
                </Badge>
                <Button variant="outline" size="sm" className="bg-transparent">
                  Manage
                </Button>
              </div>
            </div>
          ))}
          {players.length === 0 && (
            <div className="py-12 text-center text-muted-foreground">No athletes match your filters</div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
