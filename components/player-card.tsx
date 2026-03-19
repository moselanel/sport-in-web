"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifiedBadge } from "./verified-badge"
import type { Player } from "@/lib/types"
import { MapPin, Calendar } from "lucide-react"

interface PlayerCardProps {
  player: Player
  onClick?: () => void
  showSchool?: boolean
}

export function PlayerCard({ player, onClick, showSchool = true }: PlayerCardProps) {
  return (
    <Card
      className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
      onClick={onClick}
    >
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
              {player.positions.slice(0, 2).map((pos) => (
                <Badge key={pos} variant="outline" className="text-xs">
                  {pos}
                </Badge>
              ))}
            </div>
            {showSchool && player.school && !player.privacySettings.hideSchoolName && (
              <p className="text-xs text-muted-foreground mt-2">{player.school.name}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
