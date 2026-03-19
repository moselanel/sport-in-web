"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers } from "@/lib/mock-data"
import { Plus, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function GuardianPlayers() {
  const myPlayers = mockPlayers.slice(0, 2)

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Players</h1>
          <p className="text-sm text-muted-foreground">{myPlayers.length} linked players</p>
        </div>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Player
        </Button>
      </div>

      <div className="space-y-4">
        {myPlayers.map((player) => (
          <Link key={player.id} href={`/app/guardian/players/${player.id}`}>
            <Card className="bg-card border-border hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{player.name}</h3>
                      <VerifiedBadge type="guardian" showLabel={false} />
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{player.age} years old</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {player.sports.map((sport) => (
                        <Badge key={sport.id} variant="secondary" className="text-xs">
                          {sport.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
