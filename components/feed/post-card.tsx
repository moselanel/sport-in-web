"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PersonAvatar, kindLabel } from "@/components/social/person-avatar"
import { getPerson, timeAgo, useSocialStore } from "@/components/social-store"
import type { Post } from "@/lib/types"
import { Heart, MessageCircle, BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export function PostCard({ post, currentPersonId }: { post: Post; currentPersonId: string }) {
  const { state, toggleLike, addComment } = useSocialStore()
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")

  const author = getPerson(state, post.authorId)
  if (!author) return null

  const liked = post.likes.includes(currentPersonId)

  const submitComment = () => {
    addComment(post.id, currentPersonId, commentText)
    setCommentText("")
    setShowComments(true)
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        {/* Author */}
        <div className="flex items-start gap-3">
          <PersonAvatar person={author} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-medium text-foreground truncate">{author.name}</span>
              {author.verified && <BadgeCheck className="h-4 w-4 text-primary shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground truncate">{author.headline}</p>
            <p className="text-xs text-muted-foreground">
              {kindLabel(author.kind)} · {timeAgo(post.createdAt)}
            </p>
          </div>
        </div>

        {/* Body */}
        <p className="text-sm text-foreground leading-relaxed mt-3 whitespace-pre-wrap text-pretty">{post.body}</p>

        {post.image && (
          <img
            src={post.image || "/placeholder.svg"}
            alt=""
            className="mt-3 rounded-lg border border-border w-full object-cover max-h-80"
          />
        )}

        {post.sportTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {post.sportTags.map((t) => (
              <Badge key={t} className="bg-primary/10 text-primary hover:bg-primary/10">
                {t}
              </Badge>
            ))}
          </div>
        )}

        {/* Counts */}
        {(post.likes.length > 0 || post.comments.length > 0) && (
          <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
            <span>{post.likes.length > 0 ? `${post.likes.length} like${post.likes.length === 1 ? "" : "s"}` : ""}</span>
            <button
              type="button"
              className="hover:text-foreground"
              onClick={() => setShowComments((v) => !v)}
            >
              {post.comments.length > 0
                ? `${post.comments.length} comment${post.comments.length === 1 ? "" : "s"}`
                : ""}
            </button>
          </div>
        )}

        <Separator className="my-2" />

        {/* Actions */}
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            className={cn("flex-1", liked && "text-primary")}
            onClick={() => toggleLike(post.id, currentPersonId)}
          >
            <Heart className={cn("h-4 w-4 mr-1.5", liked && "fill-current")} />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setShowComments((v) => !v)}>
            <MessageCircle className="h-4 w-4 mr-1.5" />
            Comment
          </Button>
        </div>

        {/* Comments */}
        {showComments && (
          <div className="mt-2 space-y-3">
            {post.comments.map((c) => {
              const cAuthor = getPerson(state, c.authorId)
              if (!cAuthor) return null
              return (
                <div key={c.id} className="flex gap-2">
                  <PersonAvatar person={cAuthor} className="h-8 w-8" />
                  <div className="flex-1 rounded-lg bg-muted/60 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium text-foreground">{cAuthor.name}</span>
                      <span className="text-[10px] text-muted-foreground">{timeAgo(c.createdAt)}</span>
                    </div>
                    <p className="text-sm text-foreground">{c.body}</p>
                  </div>
                </div>
              )
            })}

            <div className="flex gap-2">
              <Input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) submitComment()
                }}
                placeholder="Add a comment..."
                className="h-9 bg-background"
              />
              <Button size="sm" onClick={submitComment} disabled={!commentText.trim()}>
                Send
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
