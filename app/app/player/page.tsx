"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers, mockVideos, mockChallenges } from "@/lib/mock-data"
import Link from "next/link"
import { Video, Target, Upload, Play, ArrowRight, Calendar, MapPin, GraduationCap, Zap, Shield } from "lucide-react"

export default function PlayerProfile() {
  const player = mockPlayers[0]
  const myVideos = mockVideos.filter((v) => v.playerId === player.id)

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {/* Profile Card */}
      <Card className="bg-card border-border overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-primary/20 to-accent/20" />
        <CardContent className="pt-0 -mt-12">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 border-4 border-card">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                {player.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="mt-4">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-foreground">{player.name}</h1>
                <VerifiedBadge type="guardian" showLabel={false} />
              </div>
              <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {player.age} years
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {player.region}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {player.sports.map((sport) => (
                  <Badge key={sport.id} className="bg-primary/10 text-primary">
                    {sport.name}
                  </Badge>
                ))}
                {player.positions.map((pos) => (
                  <Badge key={pos} variant="outline">
                    {pos}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* School */}
          {player.school && (
            <Card className="bg-muted/50 border-border mt-6">
              <CardContent className="p-3 flex items-center gap-3">
                <GraduationCap className="h-5 w-5 text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{player.school.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {player.school.city}, {player.school.province}
                  </p>
                </div>
                <VerifiedBadge type="school" showLabel={false} />
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Stats Badges */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Attributes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(player.stats).map(([key, value]) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground capitalize">{key}</span>
                <span className="text-foreground font-medium">{value}</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Link href="/app/player/upload">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="font-medium text-foreground">Upload Video</p>
              <p className="text-xs text-muted-foreground mt-1">Share your skills</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/app/player/challenges">
          <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-4 text-center">
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-accent" />
              </div>
              <p className="font-medium text-foreground">Challenges</p>
              <p className="text-xs text-muted-foreground mt-1">{mockChallenges.length} available</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* My Videos */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-foreground text-lg flex items-center gap-2">
            <Video className="h-5 w-5" />
            My Highlights
          </CardTitle>
          <Link href="/app/player/videos">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          {myVideos.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {myVideos.slice(0, 4).map((video) => (
                <div
                  key={video.id}
                  className="relative rounded-lg overflow-hidden bg-muted aspect-video cursor-pointer"
                >
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                  {video.status === "pending" && (
                    <Badge className="absolute top-1 left-1 bg-accent/90 text-xs">Pending</Badge>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Video className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
              <p className="text-muted-foreground mb-3">No videos yet</p>
              <Link href="/app/player/upload">
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Video
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guardian Info */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4 flex gap-3">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Protected by Guardian</p>
            <p className="text-xs text-muted-foreground">
              Your profile is managed by {player.guardian.name}. All contact requests go through them.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
