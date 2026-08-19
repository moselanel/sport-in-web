"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PersonAvatar, kindLabel } from "@/components/social/person-avatar"
import { ConnectButton } from "@/components/social/connect-button"
import type { Person } from "@/lib/types"
import { BadgeCheck, MapPin, ShieldCheck } from "lucide-react"

export function PersonCard({
  person,
  currentPersonId,
  messageHref,
}: {
  person: Person
  currentPersonId: string | undefined
  messageHref?: string
}) {
  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <PersonAvatar person={person} className="h-12 w-12" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground truncate">{person.name}</span>
              {person.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
            </div>
            <p className="text-sm text-muted-foreground truncate">{person.headline}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-muted-foreground">
              <span>{kindLabel(person.kind)}</span>
              {person.province && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {person.province}
                </span>
              )}
              {person.isMinor && (
                <span className="flex items-center gap-1 text-accent">
                  <ShieldCheck className="h-3 w-3" />
                  Guardian-protected
                </span>
              )}
            </div>
            {person.sports.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {person.sports.map((s) => (
                  <Badge key={s} variant="outline" className="bg-transparent text-xs">
                    {s}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-3">
          <ConnectButton currentPersonId={currentPersonId} target={person} messageHref={messageHref} />
        </div>
      </CardContent>
    </Card>
  )
}
