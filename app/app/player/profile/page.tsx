"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockPlayers } from "@/lib/mock-data"
import { Settings, Shield, Calendar, MapPin, GraduationCap, Edit, Users, Newspaper } from "lucide-react"
import {
  useSocialStore,
  useCurrentPersonId,
  acceptedConnectionsFor,
  getPerson,
} from "@/components/social-store"
import { PersonAvatar } from "@/components/social/person-avatar"
import { PostCard } from "@/components/feed/post-card"
import Link from "next/link"

export default function PlayerProfileSettings() {
  const player = mockPlayers[0]
  const { state } = useSocialStore()
  const personId = useCurrentPersonId("player")
  const me = getPerson(state, personId)
  const connections = personId ? acceptedConnectionsFor(state, personId) : []
  const myPosts = state.posts.filter((p) => p.authorId === personId)

  return (
    <div className="space-y-4 p-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      {/* LinkedIn-style header: cover banner + overlapping avatar */}
      <Card className="bg-card border-border overflow-hidden pt-0">
        <div className="h-24 bg-gradient-to-r from-primary/80 to-accent/60" />
        <CardContent className="pt-0">
          <div className="flex flex-col items-center text-center -mt-10">
            {me && <PersonAvatar person={me} className="h-20 w-20 ring-4 ring-card" />}
            <h2 className="text-lg font-semibold text-foreground mt-3">{me?.name ?? player.name}</h2>
            <p className="text-sm text-muted-foreground text-pretty">{me?.headline}</p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {player.age} years
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {player.region}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {player.sports.map((sport) => (
                <Badge key={sport.id} className="bg-primary/10 text-primary">
                  {sport.name}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
              <Link href="/app/player/network">
                <Button variant="ghost" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  {connections.length} connections
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {player.school && (
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              School
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium text-foreground">{player.school.name}</p>
            <p className="text-sm text-muted-foreground">
              {player.school.city}, {player.school.province}
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guardian
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-medium text-foreground">{player.guardian.name}</p>
          <p className="text-sm text-muted-foreground">Managing your profile and privacy settings</p>
        </CardContent>
      </Card>

      {/* Activity */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {myPosts.length > 0 && personId ? (
            myPosts.map((post) => <PostCard key={post.id} post={post} currentPersonId={personId} />)
          ) : (
            <p className="text-sm text-muted-foreground">
              No posts yet.{" "}
              <Link href="/app/player/feed" className="text-primary hover:underline">
                Share your first update
              </Link>
              .
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
