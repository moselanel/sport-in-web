"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers } from "@/lib/mock-data"
import { Search, MapPin, Calendar, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SchoolPlayers() {
  const [query, setQuery] = useState("")

  const players = mockPlayers.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Players</h1>
          <p className="text-muted-foreground">Athletes linked to Pretoria Boys High School</p>
        </div>
        <Link href="/portal/school/invites">
          <Button className="gap-2">
            <Users className="h-4 w-4" />
            Invite Players
          </Button>
        </Link>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search players by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.map((player) => (
          <Card key={player.id} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
                    {player.guardian.verified && <VerifiedBadge type="guardian" showLabel={false} />}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {player.age} yrs
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {player.region}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {player.sports.map((sport) => (
                      <Badge key={sport.id} variant="secondary" className="text-xs">
                        {sport.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {players.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">No players match your search</p>
            <Link href="/portal/school/invites">
              <Button variant="outline" className="bg-transparent gap-2">
                Invite Players <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
