"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check, Clock, MessageSquare, ShieldCheck, UserPlus } from "lucide-react"
import type { Person } from "@/lib/types"
import { connectionBetween, useSocialStore } from "@/components/social-store"
import { involvesMinor } from "@/lib/connection-rules"

export function ConnectButton({
  currentPersonId,
  target,
  size = "sm",
  messageHref,
}: {
  currentPersonId: string | undefined
  target: Person
  size?: "sm" | "default"
  messageHref?: string
}) {
  const router = useRouter()
  const { state, sendConnectRequest, openConversation } = useSocialStore()

  if (!currentPersonId || currentPersonId === target.id) return null

  const me = state.people.find((p) => p.id === currentPersonId)
  const connection = connectionBetween(state, currentPersonId, target.id)
  const gated = involvesMinor(me, target)

  if (connection?.status === "accepted") {
    return (
      <Button
        size={size}
        variant="outline"
        className="bg-transparent"
        onClick={() => {
          const id = openConversation(currentPersonId, target.id)
          router.push(messageHref ? `${messageHref}?c=${id}` : `?c=${id}`)
        }}
      >
        <MessageSquare className="h-4 w-4 mr-1.5" />
        Message
      </Button>
    )
  }

  if (connection?.status === "pending") {
    return (
      <Button size={size} variant="secondary" disabled>
        {connection.awaitingGuardian ? (
          <>
            <ShieldCheck className="h-4 w-4 mr-1.5" />
            Awaiting guardian
          </>
        ) : (
          <>
            <Clock className="h-4 w-4 mr-1.5" />
            Pending
          </>
        )}
      </Button>
    )
  }

  return (
    <Button size={size} onClick={() => sendConnectRequest(currentPersonId, target.id)}>
      {gated ? <ShieldCheck className="h-4 w-4 mr-1.5" /> : <UserPlus className="h-4 w-4 mr-1.5" />}
      {gated ? "Request via guardian" : "Connect"}
    </Button>
  )
}

export function ConnectionCountBadge({ personId }: { personId: string }) {
  const { state } = useSocialStore()
  const count = state.connections.filter(
    (c) => c.status === "accepted" && (c.requesterId === personId || c.addresseeId === personId),
  ).length
  return (
    <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
      <Check className="h-3.5 w-3.5 text-primary" />
      {count} connection{count === 1 ? "" : "s"}
    </span>
  )
}
