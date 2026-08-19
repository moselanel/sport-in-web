"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PersonAvatar } from "@/components/social/person-avatar"
import { conversationsFor, getPerson, timeAgo, useSocialStore } from "@/components/social-store"
import { authUserToPersonId, roleBasePath } from "@/lib/social-data"
import type { Conversation, UserRole } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ArrowLeft, MessageSquare, Send, ShieldAlert } from "lucide-react"

export function MessagesScreen({ role }: { role: UserRole }) {
  return (
    <Suspense fallback={<div className="p-4 max-w-4xl mx-auto text-muted-foreground">Loading messages...</div>}>
      <MessagesScreenInner role={role} />
    </Suspense>
  )
}

function MessagesScreenInner({ role }: { role: UserRole }) {
  const personId = authUserToPersonId[role]
  const basePath = `${roleBasePath[role]}/messages`
  const router = useRouter()
  const params = useSearchParams()
  const activeId = params.get("c")

  const { state, sendMessage } = useSocialStore()
  const conversations = conversationsFor(state, personId)
  const active = conversations.find((c) => c.id === activeId) ?? null

  const setActive = (id: string | null) => {
    router.push(id ? `${basePath}?c=${id}` : basePath)
  }

  return (
    <div className="h-[calc(100vh-8rem)] lg:h-[calc(100vh-10rem)] max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold text-foreground mb-4">Messages</h1>
      <div className="flex h-full rounded-lg border border-border overflow-hidden bg-card">
        {/* Conversation list */}
        <aside
          className={cn(
            "w-full lg:w-72 border-r border-border flex-col",
            active ? "hidden lg:flex" : "flex",
          )}
        >
          <ScrollArea className="flex-1">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-sm text-muted-foreground">
                No conversations yet. Connect with someone and start a chat.
              </div>
            ) : (
              conversations.map((c) => (
                <ConversationRow
                  key={c.id}
                  conversation={c}
                  personId={personId}
                  active={c.id === activeId}
                  onSelect={() => setActive(c.id)}
                />
              ))
            )}
          </ScrollArea>
        </aside>

        {/* Thread */}
        <section className={cn("flex-1 flex-col", active ? "flex" : "hidden lg:flex")}>
          {active ? (
            <Thread
              conversation={active}
              personId={personId}
              onBack={() => setActive(null)}
              onSend={(body) => sendMessage(active.id, personId, body)}
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground p-6">
              <MessageSquare className="h-10 w-10 mb-3 text-muted-foreground/50" />
              <p className="text-sm">Select a conversation to start messaging</p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function otherParticipant(conversation: Conversation, personId: string) {
  return conversation.participantIds.find((id) => id !== personId)
}

function ConversationRow({
  conversation,
  personId,
  active,
  onSelect,
}: {
  conversation: Conversation
  personId: string
  active: boolean
  onSelect: () => void
}) {
  const { state } = useSocialStore()
  const other = getPerson(state, otherParticipant(conversation, personId) ?? "")
  if (!other) return null
  const last = conversation.messages[conversation.messages.length - 1]

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "w-full flex items-center gap-3 p-3 text-left border-b border-border/60 hover:bg-muted/50 transition-colors",
        active && "bg-muted",
      )}
    >
      <PersonAvatar person={other} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium text-foreground truncate text-sm">{other.name}</span>
          {last && <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(last.createdAt)}</span>}
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {conversation.locked ? "Awaiting guardian approval" : last?.body ?? "No messages yet"}
        </p>
      </div>
    </button>
  )
}

function Thread({
  conversation,
  personId,
  onBack,
  onSend,
}: {
  conversation: Conversation
  personId: string
  onBack: () => void
  onSend: (body: string) => void
}) {
  const { state } = useSocialStore()
  const other = getPerson(state, otherParticipant(conversation, personId) ?? "")
  const [text, setText] = useState("")
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation.messages.length])

  const submit = () => {
    if (!text.trim() || conversation.locked) return
    onSend(text)
    setText("")
  }

  if (!other) return null

  return (
    <>
      {/* Thread header */}
      <div className="flex items-center gap-3 p-3 border-b border-border">
        <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <PersonAvatar person={other} className="h-9 w-9" />
        <div className="min-w-0">
          <p className="font-medium text-foreground truncate text-sm">{other.name}</p>
          <p className="text-xs text-muted-foreground truncate">{other.headline}</p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {conversation.messages.map((m) => {
            const mine = m.senderId === personId
            return (
              <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-3 py-2 text-sm",
                    mine
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm",
                  )}
                >
                  <p className="whitespace-pre-wrap">{m.body}</p>
                  <p className={cn("text-[10px] mt-1", mine ? "text-primary-foreground/70" : "text-muted-foreground")}>
                    {timeAgo(m.createdAt)}
                  </p>
                </div>
              </div>
            )
          })}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      {/* Composer / gate */}
      {conversation.locked ? (
        <div className="p-4 border-t border-border">
          <div className="flex items-start gap-2 rounded-lg bg-accent/10 p-3 text-sm text-foreground">
            <ShieldAlert className="h-4 w-4 text-accent shrink-0 mt-0.5" />
            <p className="text-pretty">
              {other.name} is a minor. Messaging is paused until their guardian approves your request.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 p-3 border-t border-border">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing && e.keyCode !== 229) submit()
            }}
            placeholder="Write a message..."
            className="bg-background"
          />
          <Button size="icon" onClick={submit} disabled={!text.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      )}
    </>
  )
}
