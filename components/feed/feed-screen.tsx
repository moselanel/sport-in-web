"use client"

import { FeedView } from "@/components/feed/feed-view"
import { authUserToPersonId } from "@/lib/social-data"
import type { UserRole } from "@/lib/types"

export function FeedScreen({ role }: { role: UserRole }) {
  const personId = authUserToPersonId[role]
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="mb-4">
        <h1 className="text-xl font-bold text-foreground">Feed</h1>
        <p className="text-sm text-muted-foreground">Updates from your sports network</p>
      </div>
      <FeedView currentPersonId={personId} />
    </div>
  )
}
