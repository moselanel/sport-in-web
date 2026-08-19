"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers } from "@/lib/mock-data"
import { Heart, MapPin, Calendar, GraduationCap, Search, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SavedPlayers() {
  // Seed the shortlist with a few players for the demo.
  const [savedIds, setSavedIds] = useState<string[]>(["1", "3", "4"])

  const savedPlayers = mockPlayers.filter((p) => savedIds.includes(p.id))

  const removePlayer = (id: string) => {
    setSavedIds((prev) => prev.filter((pid) => pid !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Saved Players</h1>
        <p className="text-muted-foreground">Your shortlist of athletes to follow up on</p>
      </div>

      {savedPlayers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedPlayers.map((player) => (
            <Card key={player.id} className="bg-card border-border">
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
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
                        {player.guardian.verified && <VerifiedBadge type="guardian" showLabel={false} />}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => removePlayer(player.id)}
                        aria-label={`Remove ${player.name} from saved`}
                      >
                        <Heart className="h-4 w-4 fill-destructive text-destructive" />
                      </Button>
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
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {player.sports.map((sport) => (
                        <Badge key={sport.id} variant="secondary" className="text-xs">
                          {sport.name}
                        </Badge>
                      ))}
                    </div>
                    {player.school && !player.privacySettings.hideSchoolName && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <GraduationCap className="h-3 w-3" />
                        {player.school.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-1">No saved players yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Save players from Talent Discovery to build your shortlist.
            </p>
            <Link href="/portal/scout">
              <Button variant="outline" className="bg-transparent gap-2">
                <Search className="h-4 w-4" />
                Discover Talent <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
