"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockSchools } from "@/lib/mock-data"
import { GraduationCap, Search, MapPin, Mail, Phone, CheckCircle, Clock } from "lucide-react"

export default function AdminSchools() {
  const [query, setQuery] = useState("")

  const schools = mockSchools.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
  const verified = mockSchools.filter((s) => s.verificationStatus === "verified").length
  const pending = mockSchools.filter((s) => s.verificationStatus === "pending").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Schools</h1>
        <p className="text-muted-foreground">Onboard and verify schools on the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Schools" value={mockSchools.length} icon={<GraduationCap className="h-6 w-6" />} />
        <StatCard title="Verified" value={verified} icon={<CheckCircle className="h-6 w-6" />} />
        <StatCard title="Pending Review" value={pending} icon={<Clock className="h-6 w-6" />} />
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 bg-background"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        {schools.map((school) => (
          <Card key={school.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-6 w-6 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground truncate">{school.name}</h3>
                    {school.verificationStatus === "verified" && <VerifiedBadge type="school" size="sm" showLabel={false} />}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {school.city}, {school.province}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {school.email}
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    {school.phone}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                {school.verificationStatus === "verified" ? (
                  <Badge className="bg-primary/10 text-primary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                ) : (
                  <Badge className="bg-accent/10 text-accent">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                )}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    View
                  </Button>
                  {school.verificationStatus !== "verified" && <Button size="sm">Verify</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
