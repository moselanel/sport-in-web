"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { Target, Users, Plus, Trophy } from "lucide-react"

const teams = [
  { name: "U13 Football", sport: "Football", players: 18, coach: "John Smith", record: "6W - 2L" },
  { name: "U15 Football", sport: "Football", players: 22, coach: "Mary Johnson", record: "8W - 1L" },
  { name: "U16 Rugby", sport: "Rugby", players: 25, coach: "John Smith", record: "5W - 3L" },
  { name: "U14 Netball", sport: "Netball", players: 12, coach: "Mary Johnson", record: "7W - 0L" },
  { name: "U18 Athletics", sport: "Athletics", players: 16, coach: "David Peters", record: "3 medals" },
  { name: "U15 Cricket", sport: "Cricket", players: 14, coach: "Andrew Bell", record: "4W - 4L" },
]

export default function SchoolTeams() {
  const totalPlayers = teams.reduce((sum, t) => sum + t.players, 0)
  const sports = new Set(teams.map((t) => t.sport))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Teams &amp; Squads</h1>
          <p className="text-muted-foreground">Manage your school&apos;s registered teams</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Team
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Active Teams" value={teams.length} icon={<Target className="h-6 w-6" />} />
        <StatCard title="Total Players" value={totalPlayers} icon={<Users className="h-6 w-6" />} />
        <StatCard title="Sports" value={sports.size} icon={<Trophy className="h-6 w-6" />} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((team) => (
          <Card key={team.name} className="bg-card border-border hover:border-primary/50 transition-all">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Target className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="secondary">{team.sport}</Badge>
              </div>
              <CardTitle className="text-foreground pt-2">{team.name}</CardTitle>
              <CardDescription>Coach: {team.coach}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {team.players} players
                </span>
                <Badge className="bg-primary/10 text-primary">{team.record}</Badge>
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                Manage Squad
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
