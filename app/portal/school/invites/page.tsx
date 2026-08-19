"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Mail, Clock, CheckCircle, Send } from "lucide-react"

interface Invite {
  id: string
  name: string
  email: string
  status: "pending" | "accepted"
  sentAt: string
}

const initialInvites: Invite[] = [
  { id: "1", name: "Thabo Mokoena", email: "thabo@email.com", status: "pending", sentAt: "2 days ago" },
  { id: "2", name: "Lerato Dlamini", email: "lerato@email.com", status: "accepted", sentAt: "5 days ago" },
  { id: "3", name: "Sipho Nkosi", email: "sipho@email.com", status: "pending", sentAt: "1 week ago" },
]

export default function SchoolInvites() {
  const [invites, setInvites] = useState<Invite[]>(initialInvites)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) return
    setInvites((prev) => [
      { id: crypto.randomUUID(), name: name.trim(), email: email.trim(), status: "pending", sentAt: "just now" },
      ...prev,
    ])
    setName("")
    setEmail("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Invite Players</h1>
        <p className="text-muted-foreground">Invite athletes to link their profile with your school</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Send an Invitation</CardTitle>
          <CardDescription>The player&apos;s guardian will need to approve the link.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSend} className="flex flex-col md:flex-row gap-4 md:items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="player-name">Player Name</Label>
              <Input
                id="player-name"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background"
              />
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="player-email">Guardian Email</Label>
              <Input
                id="player-email"
                type="email"
                placeholder="guardian@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background"
              />
            </div>
            <Button type="submit" className="gap-2">
              <Send className="h-4 w-4" />
              Send Invite
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Sent Invitations</CardTitle>
          <CardDescription>{invites.filter((i) => i.status === "pending").length} awaiting response</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {invites.map((invite) => (
            <div key={invite.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {invite.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-foreground">{invite.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    {invite.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground hidden sm:block">{invite.sentAt}</span>
                {invite.status === "pending" ? (
                  <Badge className="bg-accent/10 text-accent">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </Badge>
                ) : (
                  <Badge className="bg-primary/10 text-primary">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Accepted
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
