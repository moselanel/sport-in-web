"use client"

import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PersonAvatar } from "@/components/social/person-avatar"
import { PersonCard } from "@/components/social/person-card"
import {
  acceptedConnectionsFor,
  getPerson,
  pendingInvitationsFor,
  suggestionsFor,
  useSocialStore,
} from "@/components/social-store"
import { authUserToPersonId, roleBasePath } from "@/lib/social-data"
import { sports, provinces } from "@/lib/mock-data"
import type { UserRole } from "@/lib/types"
import { Check, Search, UserCheck, Users, X } from "lucide-react"

export function NetworkScreen({ role }: { role: UserRole }) {
  const personId = authUserToPersonId[role]
  const messageHref = `${roleBasePath[role]}/messages`
  const { state, acceptConnection, declineConnection } = useSocialStore()

  const [query, setQuery] = useState("")
  const [sport, setSport] = useState<string | null>(null)
  const [province, setProvince] = useState<string | null>(null)

  const connections = acceptedConnectionsFor(state, personId)
  const invitations = pendingInvitationsFor(state, personId)
  const suggestions = suggestionsFor(state, personId, 12)

  const discover = useMemo(() => {
    return suggestions.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if (sport && !p.sports.includes(sport)) return false
      if (province && p.province !== province) return false
      return true
    })
  }, [suggestions, query, sport, province])

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground">My Network</h1>
        <p className="text-sm text-muted-foreground">
          {connections.length} connection{connections.length === 1 ? "" : "s"}
          {invitations.length > 0 && ` · ${invitations.length} pending invitation${invitations.length === 1 ? "" : "s"}`}
        </p>
      </div>

      <Tabs defaultValue="connections">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="connections">
            <Users className="h-4 w-4 mr-1.5" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="invitations" className="relative">
            <UserCheck className="h-4 w-4 mr-1.5" />
            Invitations
            {invitations.length > 0 && (
              <span className="ml-1.5 h-5 min-w-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center">
                {invitations.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="discover">
            <Search className="h-4 w-4 mr-1.5" />
            Discover
          </TabsTrigger>
        </TabsList>

        {/* Connections */}
        <TabsContent value="connections" className="mt-4 space-y-3">
          {connections.length === 0 ? (
            <EmptyState icon={<Users className="h-10 w-10" />} text="You have no connections yet. Head to Discover to grow your network." />
          ) : (
            connections.map((p) => (
              <PersonCard key={p.id} person={p} currentPersonId={personId} messageHref={messageHref} />
            ))
          )}
        </TabsContent>

        {/* Invitations */}
        <TabsContent value="invitations" className="mt-4 space-y-3">
          {invitations.length === 0 ? (
            <EmptyState icon={<UserCheck className="h-10 w-10" />} text="No pending invitations." />
          ) : (
            invitations.map((c) => {
              const requester = getPerson(state, c.requesterId)
              if (!requester) return null
              return (
                <Card key={c.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <PersonAvatar person={requester} className="h-12 w-12" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{requester.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{requester.headline}</p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" onClick={() => acceptConnection(c.id)}>
                            <Check className="h-4 w-4 mr-1.5" />
                            Accept
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="bg-transparent"
                            onClick={() => declineConnection(c.id)}
                          >
                            <X className="h-4 w-4 mr-1.5" />
                            Ignore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        {/* Discover */}
        <TabsContent value="discover" className="mt-4 space-y-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search people by name..."
                  className="pl-9 bg-background"
                />
              </div>
              <div className="flex flex-wrap gap-1.5">
                {sports.map((s) => (
                  <button key={s.id} type="button" onClick={() => setSport(sport === s.name ? null : s.name)}>
                    <Badge variant={sport === s.name ? "default" : "outline"} className={sport === s.name ? "" : "bg-transparent"}>
                      {s.name}
                    </Badge>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {provinces.slice(0, 5).map((p) => (
                  <button key={p} type="button" onClick={() => setProvince(province === p ? null : p)}>
                    <Badge variant={province === p ? "secondary" : "outline"} className={province === p ? "" : "bg-transparent"}>
                      {p}
                    </Badge>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {discover.length === 0 ? (
            <EmptyState icon={<Search className="h-10 w-10" />} text="No people match those filters." />
          ) : (
            discover.map((p) => (
              <PersonCard key={p.id} person={p} currentPersonId={personId} messageHref={messageHref} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="py-12 text-center">
        <div className="text-muted-foreground/50 mx-auto mb-3 flex justify-center">{icon}</div>
        <p className="text-muted-foreground text-sm text-balance max-w-xs mx-auto">{text}</p>
      </CardContent>
    </Card>
  )
}
