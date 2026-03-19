"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockPlayers } from "@/lib/mock-data"
import { Settings, Shield, Calendar, MapPin, GraduationCap, Edit } from "lucide-react"

export default function PlayerProfileSettings() {
  const player = mockPlayers[0]

  return (
    <div className="space-y-6 p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 mb-4">
              <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold text-foreground">{player.name}</h2>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {player.age} years
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {player.region}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {player.sports.map((sport) => (
                <Badge key={sport.id} className="bg-primary/10 text-primary">
                  {sport.name}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {player.school && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              School
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-foreground">{player.school.name}</p>
            <p className="text-sm text-muted-foreground">
              {player.school.city}, {player.school.province}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guardian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium text-foreground">{player.guardian.name}</p>
          <p className="text-sm text-muted-foreground">Managing your profile and privacy settings</p>
        </CardContent>
      </Card>
    </div>
  )
}
