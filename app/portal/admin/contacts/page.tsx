"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { StatCard } from "@/components/stat-card"
import { mockContactRequests } from "@/lib/mock-data"
import { Mail, Clock, CheckCircle, XCircle, Building2, ArrowRight } from "lucide-react"

const statusConfig = {
  pending: { label: "Pending", icon: Clock, className: "bg-accent/10 text-accent" },
  approved: { label: "Approved", icon: CheckCircle, className: "bg-primary/10 text-primary" },
  declined: { label: "Declined", icon: XCircle, className: "bg-destructive/10 text-destructive" },
} as const

export default function AdminContacts() {
  const pending = mockContactRequests.filter((r) => r.status === "pending").length
  const approved = mockContactRequests.filter((r) => r.status === "approved").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Requests</h1>
        <p className="text-muted-foreground">Oversee scout-to-guardian contact activity across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Requests" value={mockContactRequests.length} icon={<Mail className="h-6 w-6" />} />
        <StatCard title="Pending" value={pending} icon={<Clock className="h-6 w-6" />} />
        <StatCard title="Approved" value={approved} icon={<CheckCircle className="h-6 w-6" />} />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-0 divide-y divide-border">
          {mockContactRequests.map((request) => {
            const status = statusConfig[request.status as keyof typeof statusConfig] ?? statusConfig.pending
            const StatusIcon = status.icon
            return (
              <div key={request.id} className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-chart-3/10 text-chart-3 text-sm">
                      {request.scoutName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{request.scoutName}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Building2 className="h-3 w-3" />
                      {request.scoutOrganization}
                    </p>
                  </div>
                  <Badge className={status.className}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {status.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pl-12 flex-wrap">
                  <span className="font-medium text-foreground">{request.scoutName.split(" ")[0]}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                  <span className="font-medium text-foreground">{request.playerName}</span>
                  <span className="text-border">|</span>
                  <span>{request.createdAt}</span>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
