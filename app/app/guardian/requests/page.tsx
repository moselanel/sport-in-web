"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockContactRequests } from "@/lib/mock-data"
import { Mail, CheckCircle, XCircle, Clock, User } from "lucide-react"

export default function GuardianRequests() {
  const pendingRequests = mockContactRequests.filter((r) => r.status === "pending")
  const pastRequests = mockContactRequests.filter((r) => r.status !== "pending")

  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Contact Requests</h1>
        <p className="text-sm text-muted-foreground">{pendingRequests.length} pending approval</p>
      </div>

      {pendingRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">Pending</h2>
          {pendingRequests.map((request) => (
            <Card key={request.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{request.scoutName}</p>
                    <p className="text-sm text-muted-foreground">{request.scoutOrganization}</p>
                    <p className="text-xs text-muted-foreground mt-1">Wants to contact {request.playerName}</p>
                  </div>
                  <Badge className="bg-accent/10 text-accent">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-lg">"{request.message}"</p>
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
        </div>
      )}

      {pastRequests.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground">History</h2>
          {pastRequests.map((request) => (
            <Card key={request.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{request.scoutName}</p>
                    <p className="text-sm text-muted-foreground">For {request.playerName}</p>
                  </div>
                  <Badge
                    className={
                      request.status === "approved"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-destructive/10 text-destructive"
                    }
                  >
                    {request.status === "approved" ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        Declined
                      </>
                    )}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {pendingRequests.length === 0 && pastRequests.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No contact requests yet</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
