"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Plus, Clock } from "lucide-react"

const events = [
  {
    id: "1",
    title: "U16 Football Trials",
    sport: "Football",
    date: "2024-02-10",
    time: "14:00",
    location: "Main Field, Pretoria Boys High",
    registered: 34,
    status: "open",
  },
  {
    id: "2",
    title: "Athletics Selection Day",
    sport: "Athletics",
    date: "2024-02-15",
    time: "09:00",
    location: "School Track",
    registered: 52,
    status: "open",
  },
  {
    id: "3",
    title: "U14 Netball Tryouts",
    sport: "Netball",
    date: "2024-02-18",
    time: "15:30",
    location: "Sports Hall B",
    registered: 21,
    status: "open",
  },
  {
    id: "4",
    title: "Rugby Development Camp",
    sport: "Rugby",
    date: "2024-01-28",
    time: "10:00",
    location: "Rugby Fields",
    registered: 40,
    status: "closed",
  },
]

const statusStyles = {
  open: "bg-primary/10 text-primary",
  closed: "bg-muted text-muted-foreground",
} as const

export default function SchoolEvents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Events &amp; Trials</h1>
          <p className="text-muted-foreground">Schedule and manage trials, tryouts, and camps</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="bg-card border-border">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{event.sport}</Badge>
                  <Badge className={statusStyles[event.status as keyof typeof statusStyles]}>
                    {event.status === "open" ? "Registration Open" : "Closed"}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-foreground pt-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {event.date}
                <span className="text-border">|</span>
                <Clock className="h-4 w-4" />
                {event.time}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {event.location}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="h-4 w-4" />
                {event.registered} registered
              </p>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
