"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, GraduationCap, Search, Video, TrendingUp, ArrowRight, Play } from "lucide-react"
import { adminStats, regionData, sportData, mockVideos } from "@/lib/mock-data"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Overview</h1>
        <p className="text-muted-foreground">Monitor and manage the SportIn platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Players"
          value={adminStats.totalPlayers}
          icon={<Users className="h-6 w-6" />}
          change="+12% this month"
          changeType="positive"
        />
        <StatCard
          title="Total Guardians"
          value={adminStats.totalGuardians}
          icon={<Shield className="h-6 w-6" />}
          change="+8% this month"
          changeType="positive"
        />
        <StatCard
          title="Schools Onboarded"
          value={adminStats.totalSchools}
          icon={<GraduationCap className="h-6 w-6" />}
          change="+5 this week"
          changeType="positive"
        />
        <StatCard
          title="Verified Scouts"
          value={adminStats.verifiedScouts}
          icon={<Search className="h-6 w-6" />}
          change="+2 this week"
          changeType="positive"
        />
        <StatCard
          title="Pending Videos"
          value={adminStats.pendingVideos}
          icon={<Video className="h-6 w-6" />}
          change="12 urgent"
          changeType="neutral"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Talent by Region */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Talent by Region</CardTitle>
            <CardDescription>Distribution of registered players across provinces</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData} layout="vertical">
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis
                    dataKey="region"
                    type="category"
                    width={100}
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="players" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Talent by Sport */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Talent by Sport</CardTitle>
            <CardDescription>Multi-sport distribution of athletes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sportData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="players"
                    nameKey="sport"
                    label={({ sport, percent }) => `${sport} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {sportData.map((entry, index) => (
                      <Cell key={entry.sport} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Pending Videos */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick Links */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/portal/admin/videos">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Review Videos
                <Badge variant="secondary">{adminStats.pendingVideos}</Badge>
              </Button>
            </Link>
            <Link href="/portal/admin/schools">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Manage Schools
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portal/admin/talents">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Manage Users
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/portal/admin/reports">
              <Button variant="outline" className="w-full justify-between bg-transparent">
                Reports & Safety
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Pending Videos Preview */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-foreground">Videos Pending Moderation</CardTitle>
              <CardDescription>Recent uploads awaiting review</CardDescription>
            </div>
            <Link href="/portal/admin/videos">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 gap-4">
              {mockVideos
                .filter((v) => v.status === "pending")
                .slice(0, 4)
                .map((video) => (
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
                        <Play className="h-6 w-6 text-white" />
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-foreground truncate">{video.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {video.sport.name} - {video.type}
                      </p>
                      <p className="text-xs text-muted-foreground">{video.uploadedAt}</p>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Activity */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <CardTitle className="text-foreground">Platform Activity</CardTitle>
          </div>
          <CardDescription>
            <span className="text-2xl font-bold text-foreground">{adminStats.weeklyActiveUsers.toLocaleString()}</span>{" "}
            weekly active users
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
