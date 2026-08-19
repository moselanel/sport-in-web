"use client"

import { PostComposer } from "@/components/feed/post-composer"
import { PostCard } from "@/components/feed/post-card"
import { feedFor, useSocialStore } from "@/components/social-store"
import { Card, CardContent } from "@/components/ui/card"
import { Newspaper } from "lucide-react"

export function FeedView({ currentPersonId }: { currentPersonId: string | undefined }) {
  const { state } = useSocialStore()

  if (!currentPersonId) {
    return (
      <Card className="bg-card border-border">
        <CardContent className="py-12 text-center text-muted-foreground">Sign in to view your feed.</CardContent>
      </Card>
    )
  }

  const posts = feedFor(state, currentPersonId)

  return (
    <div className="space-y-4">
      <PostComposer currentPersonId={currentPersonId} />
      {posts.length === 0 ? (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Newspaper className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground">No posts yet. Be the first to share something.</p>
          </CardContent>
        </Card>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} currentPersonId={currentPersonId} />)
      )}
    </div>
  )
}
