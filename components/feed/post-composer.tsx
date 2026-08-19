"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { PersonAvatar } from "@/components/social/person-avatar"
import { useSocialStore } from "@/components/social-store"
import { sports } from "@/lib/mock-data"
import { Send } from "lucide-react"

export function PostComposer({ currentPersonId }: { currentPersonId: string }) {
  const { state, createPost } = useSocialStore()
  const me = state.people.find((p) => p.id === currentPersonId)
  const [body, setBody] = useState("")
  const [tags, setTags] = useState<string[]>([])

  if (!me) return null

  const toggleTag = (name: string) =>
    setTags((t) => (t.includes(name) ? t.filter((x) => x !== name) : [...t, name]))

  const submit = () => {
    createPost(currentPersonId, body, tags)
    setBody("")
    setTags([])
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <PersonAvatar person={me} />
          <div className="flex-1">
            <Textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share an update, a result, or spot a rising star..."
              className="min-h-[80px] resize-none border-border bg-background"
            />
            <div className="flex flex-wrap gap-1.5 mt-3">
              {sports.slice(0, 6).map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleTag(s.name)}
                  className="rounded-full"
                  aria-pressed={tags.includes(s.name)}
                >
                  <Badge
                    variant={tags.includes(s.name) ? "default" : "outline"}
                    className={tags.includes(s.name) ? "" : "bg-transparent"}
                  >
                    {s.name}
                  </Badge>
                </button>
              ))}
            </div>
            <div className="flex justify-end mt-3">
              <Button size="sm" onClick={submit} disabled={!body.trim()}>
                <Send className="h-4 w-4 mr-1.5" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
