"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, AlertTriangle, CheckCircle, Flag, Clock } from "lucide-react"

interface Report {
  id: string
  type: "content" | "conduct" | "safety" | "privacy"
  subject: string
  reporter: string
  detail: string
  severity: "high" | "medium" | "low"
  status: "open" | "resolved"
  createdAt: string
}

const initialReports: Report[] = [
  {
    id: "1",
    type: "content",
    subject: "Inappropriate video thumbnail",
    reporter: "Guardian - Sarah M.",
    detail: "Reported video contains an unrelated thumbnail image.",
    severity: "medium",
    status: "open",
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    type: "safety",
    subject: "Unverified scout contact attempt",
    reporter: "Guardian - Peter D.",
    detail: "A scout without verification attempted to request contact directly.",
    severity: "high",
    status: "open",
    createdAt: "5 hours ago",
  },
  {
    id: "3",
    type: "privacy",
    subject: "School name shown despite privacy setting",
    reporter: "Guardian - Grace N.",
    detail: "Player profile displayed school name while privacy toggle was enabled.",
    severity: "low",
    status: "resolved",
    createdAt: "1 day ago",
  },
  {
    id: "4",
    type: "conduct",
    subject: "Spam messages from account",
    reporter: "Coach - John S.",
    detail: "An account is sending repeated identical messages to multiple players.",
    severity: "medium",
    status: "resolved",
    createdAt: "3 days ago",
  },
]

const severityStyles = {
  high: "bg-destructive/10 text-destructive",
  medium: "bg-accent/10 text-accent",
  low: "bg-muted text-muted-foreground",
} as const

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [tab, setTab] = useState<"open" | "resolved">("open")

  const resolve = (id: string) => {
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, status: "resolved" } : r)))
  }

  const visible = reports.filter((r) => r.status === tab)
  const openCount = reports.filter((r) => r.status === "open").length
  const highCount = reports.filter((r) => r.status === "open" && r.severity === "high").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Reports &amp; Safety</h1>
        <p className="text-muted-foreground">Review flagged content and safeguard young athletes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Open Reports" value={openCount} icon={<Flag className="h-6 w-6" />} />
        <StatCard title="High Severity" value={highCount} icon={<AlertTriangle className="h-6 w-6" />} />
        <StatCard
          title="Resolved"
          value={reports.filter((r) => r.status === "resolved").length}
          icon={<CheckCircle className="h-6 w-6" />}
        />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)}>
        <TabsList className="bg-muted">
          <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({reports.filter((r) => r.status === "resolved").length})</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {visible.map((report) => (
          <Card key={report.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-5 w-5 text-destructive" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">{report.subject}</h3>
                    <div className="flex items-center gap-2">
                      <Badge className={severityStyles[report.severity]}>{report.severity}</Badge>
                      <Badge variant="secondary" className="capitalize">
                        {report.type}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{report.detail}</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {report.reporter} - {report.createdAt}
                    </p>
                    {report.status === "open" ? (
                      <Button size="sm" onClick={() => resolve(report.id)}>
                        Mark Resolved
                      </Button>
                    ) : (
                      <Badge className="bg-primary/10 text-primary">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Resolved
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {visible.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary/50" />
              <p className="text-muted-foreground">No {tab} reports.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
