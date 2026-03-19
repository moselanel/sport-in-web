"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers, mockNotifications, mockContactRequests } from "@/lib/mock-data"
import Link from "next/link"
import {
  Users,
  Mail,
  Shield,
  Bell,
  ArrowRight,
  CheckCircle,
  XCircle,
  Video,
  GraduationCap,
  Calendar,
} from "lucide-react"

export default function GuardianDashboard() {
  const myPlayers = mockPlayers.slice(0, 2)
  const unreadNotifications = mockNotifications.filter((n) => !n.read)
  const pendingRequests = mockContactRequests.filter((r) => r.status === "pending")

  return (
    <div className="space-y-6 max-w-2xl mx-auto p-4">
      {/* Welcome Header */}
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Manage your children&apos;s profiles and permissions</p>
      </div>

      {/* Notifications Banner */}
      {unreadNotifications.length > 0 && (
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                You have {unreadNotifications.length} new notification{unreadNotifications.length > 1 ? "s" : ""}
              </span>
            </div>
            <Link href="/app/guardian/requests">
              <Button size="sm">View</Button>
            </Link>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{myPlayers.length}</p>
            <p className="text-sm text-muted-foreground">Linked Players</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-2">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <p className="text-2xl font-bold text-foreground">{pendingRequests.length}</p>
            <p className="text-sm text-muted-foreground">Pending Requests</p>
          </CardContent>
        </Card>
      </div>

      {/* My Players */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-foreground text-lg">My Players</CardTitle>
          <Link href="/app/guardian/players">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent className="space-y-3">
          {myPlayers.map((player) => (
            <Link key={player.id} href={`/app/guardian/players/${player.id}`}>
              <Card className="bg-muted/50 border-border hover:bg-muted transition-colors cursor-pointer">
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
        </CardContent>
      </Card>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-foreground text-lg">Pending Requests</CardTitle>
            <Link href="/app/guardian/requests">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingRequests.slice(0, 2).map((request) => (
              <Card key={request.id} className="bg-muted/50 border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{request.scoutName}</p>
                      <p className="text-sm text-muted-foreground">{request.scoutOrganization}</p>
                      <p className="text-xs text-muted-foreground mt-1">Wants to contact {request.playerName}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <XCircle className="h-4 w-4 mr-1" />
                      Decline
                    </Button>
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Recent Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Video className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Video Approved</p>
              <p className="text-xs text-muted-foreground">Sprint Training Session - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="h-9 w-9 rounded-full bg-accent/10 flex items-center justify-center">
              <GraduationCap className="h-4 w-4 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">School Link Request</p>
              <p className="text-xs text-muted-foreground">Pretoria Boys High - 1 day ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Safety Info */}
      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4 flex gap-3">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Your child&apos;s data is protected</p>
            <p className="text-xs text-muted-foreground">
              All contact requests must be approved by you. Scouts cannot message your child directly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
