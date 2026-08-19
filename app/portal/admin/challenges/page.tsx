"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { mockChallenges } from "@/lib/mock-data"
import { Target, Plus, ListChecks, ClipboardCheck } from "lucide-react"

export default function AdminChallenges() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Skill Challenges</h1>
          <p className="text-muted-foreground">Create and manage standardized skill challenges</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Challenge
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Challenges" value={mockChallenges.length} icon={<Target className="h-6 w-6" />} />
        <StatCard title="Submissions" value={1284} icon={<ClipboardCheck className="h-6 w-6" />} />
        <StatCard title="Sports Covered" value={new Set(mockChallenges.map((c) => c.sport.id)).size} icon={<ListChecks className="h-6 w-6" />} />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="bg-card border-border">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">{challenge.sport.name}</Badge>
              </div>
              <CardTitle className="text-foreground pt-2">{challenge.title}</CardTitle>
              <CardDescription>{challenge.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">Rules</p>
                <ul className="space-y-1">
                  {challenge.rules.map((rule) => (
                    <li key={rule} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-1">-</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  View Submissions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
