"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContactRequests, mockPlayers } from "@/lib/mock-data"
import { Mail, Clock, CheckCircle, XCircle, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-accent/10 text-accent" },
  approved: { label: "Approved", icon: CheckCircle, className: "bg-primary/10 text-primary" },
  declined: { label: "Declined", icon: XCircle, className: "bg-destructive/10 text-destructive" },
} as const

export default function ScoutRequests() {
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "declined">("all")

  const requests = mockContactRequests.filter((r) => filter === "all" || r.status === filter)

  const counts = {
    all: mockContactRequests.length,
    pending: mockContactRequests.filter((r) => r.status === "pending").length,
    approved: mockContactRequests.filter((r) => r.status === "approved").length,
    declined: mockContactRequests.filter((r) => r.status === "declined").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Requests</h1>
        <p className="text-muted-foreground">Track the contact requests you&apos;ve sent to guardians</p>
      </div>

      <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
        <TabsList className="bg-muted">
          <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({counts.pending})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({counts.approved})</TabsTrigger>
          <TabsTrigger value="declined">Declined ({counts.declined})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="mt-6 space-y-4">
          {requests.map((request) => {
            const player = mockPlayers.find((p) => p.id === request.playerId)
            const status = statusConfig[request.status as keyof typeof statusConfig] ?? statusConfig.pending
            const StatusIcon = status.icon
            return (
              <Card key={request.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {request.playerName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{request.playerName}</h3>
                        <Badge className={status.className}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
                        <Calendar className="h-3.5 w-3.5" />
                        Sent {request.createdAt}
                        {player && (
                          <>
                            <span className="text-border">|</span>
                            {player.sports.map((s) => s.name).join(", ")}
                          </>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg">{request.message}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {requests.length === 0 && (
            <Card className="bg-card border-border">
              <CardContent className="py-12 text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground mb-4">No {filter !== "all" ? filter : ""} requests yet</p>
                <Link href="/portal/scout">
                  <Button variant="outline" className="bg-transparent gap-2">
                    Discover Talent <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
