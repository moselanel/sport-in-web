"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers, mockVideos } from "@/lib/mock-data"
import Link from "next/link"
import { Users, Target, Video, Shield, ArrowRight, Play, Clock, MapPin, Calendar } from "lucide-react"

const schoolTeams = [
  { name: "U13 Football", players: 18, sport: "Football" },
  { name: "U15 Football", players: 22, sport: "Football" },
  { name: "U16 Rugby", players: 25, sport: "Rugby" },
  { name: "U14 Netball", players: 12, sport: "Netball" },
]

const recentPerformances = mockVideos.filter((v) => v.status === "approved").slice(0, 3)

export default function SchoolDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-foreground">Pretoria Boys High School</h1>
            <VerifiedBadge type="school" />
          </div>
          <p className="text-muted-foreground flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Pretoria, Gauteng
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/portal/school/invites">
            <Button variant="outline" className="bg-transparent">
              Invite Players
            </Button>
          </Link>
          <Link href="/portal/school/events">
            <Button>Create Event</Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Linked Players"
          value={48}
          icon={<Users className="h-6 w-6" />}
          change="+3 this week"
          changeType="positive"
        />
        <StatCard
          title="Active Teams"
          value={schoolTeams.length}
          icon={<Target className="h-6 w-6" />}
          change="4 sports"
          changeType="neutral"
        />
        <StatCard
          title="Recent Videos"
          value={12}
          icon={<Video className="h-6 w-6" />}
          change="3 pending approval"
          changeType="neutral"
        />
        <StatCard
          title="Pending Approvals"
          value={5}
          icon={<Shield className="h-6 w-6" />}
          change="Guardian links"
          changeType="neutral"
        />
      </div>

      {/* Teams & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Teams */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Teams & Squads</CardTitle>
              <CardDescription>Your registered teams</CardDescription>
            </div>
            <Link href="/portal/school/teams">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {schoolTeams.map((team) => (
              <div
                key={team.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{team.name}</p>
                    <p className="text-sm text-muted-foreground">{team.sport}</p>
                  </div>
                </div>
                <Badge variant="secondary">{team.players} players</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Performances */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Recent Performances</CardTitle>
              <CardDescription>Tagged videos from your players</CardDescription>
            </div>
            <Link href="/portal/school/players">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentPerformances.map((video) => {
              const player = mockPlayers.find((p) => p.id === video.playerId)
              return (
                <div
                  key={video.id}
                  className="flex gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                >
                  <div className="relative w-24 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-5 w-5 text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground truncate">{video.title}</p>
                    <p className="text-xs text-muted-foreground">{player?.name || "Unknown"}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        {video.sport.name}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{video.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Pending */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/portal/school/invites">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Invite Player <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portal/school/teams">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Manage Teams <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portal/school/events">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Create Trial Event <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pending Guardian Approvals */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-foreground">Pending Guardian Approvals</CardTitle>
            <CardDescription>Players awaiting guardian confirmation to link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockPlayers.slice(0, 3).map((player) => (
              <div key={player.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {player.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-foreground">{player.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Invited 2 days ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-accent/10 text-accent">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
