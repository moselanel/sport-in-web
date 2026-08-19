"use client"

import { useCallback, useMemo, useSyncExternalStore } from "react"
import type { Connection, Conversation, GuardianApproval, Person, Post } from "@/lib/types"
import {
  authUserToPersonId,
  people as seedPeople,
  seedConnections,
  seedConversations,
  seedGuardianApprovals,
  seedPosts,
} from "@/lib/social-data"
import { resolveConnectAction } from "@/lib/connection-rules"
import type { UserRole } from "@/lib/types"

interface SocialState {
  people: Person[]
  connections: Connection[]
  posts: Post[]
  conversations: Conversation[]
  approvals: GuardianApproval[]
}

// ── Module-level singleton store ──────────────────────────────────────
// Held outside React so a single live session store is shared across the
// mobile app + web portal shells (each of which mounts its own AuthProvider).
// State resets on full page reload — persistence is a Phase 2 concern.

let state: SocialState = {
  people: seedPeople,
  connections: seedConnections,
  posts: seedPosts,
  conversations: seedConversations,
  approvals: seedGuardianApprovals,
}

const listeners = new Set<() => void>()

function emit() {
  for (const l of listeners) l()
}

function setState(next: Partial<SocialState>) {
  state = { ...state, ...next }
  emit()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return state
}

const uid = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`
const now = () => new Date().toISOString()

// ── Selectors (pure) ──────────────────────────────────────────────────

export function getPerson(s: SocialState, id: string | undefined): Person | undefined {
  return s.people.find((p) => p.id === id)
}

export function connectionBetween(
  s: SocialState,
  a: string | undefined,
  b: string | undefined,
): Connection | undefined {
  if (!a || !b) return undefined
  return s.connections.find(
    (c) =>
      (c.requesterId === a && c.addresseeId === b) || (c.requesterId === b && c.addresseeId === a),
  )
}

export function acceptedConnectionsFor(s: SocialState, personId: string): Person[] {
  const ids = s.connections
    .filter((c) => c.status === "accepted" && (c.requesterId === personId || c.addresseeId === personId))
    .map((c) => (c.requesterId === personId ? c.addresseeId : c.requesterId))
  return ids.map((id) => getPerson(s, id)).filter((p): p is Person => !!p)
}

/** Incoming pending invitations addressed to this person. */
export function pendingInvitationsFor(s: SocialState, personId: string): Connection[] {
  return s.connections.filter((c) => c.status === "pending" && c.addresseeId === personId && !c.awaitingGuardian)
}

/** Outgoing requests this person sent that are still pending. */
export function sentRequestsFor(s: SocialState, personId: string): Connection[] {
  return s.connections.filter((c) => c.status === "pending" && c.requesterId === personId)
}

export function suggestionsFor(s: SocialState, personId: string, limit = 8): Person[] {
  const me = getPerson(s, personId)
  const connectedIds = new Set([
    personId,
    ...s.connections
      .filter((c) => c.requesterId === personId || c.addresseeId === personId)
      .map((c) => (c.requesterId === personId ? c.addresseeId : c.requesterId)),
  ])
  return s.people
    .filter((p) => !connectedIds.has(p.id))
    .map((p) => {
      const sharedSport = me?.sports.some((sp) => p.sports.includes(sp)) ? 2 : 0
      const sameProvince = me?.province && me.province === p.province ? 1 : 0
      return { p, score: sharedSport + sameProvince }
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p)
}

export function feedFor(s: SocialState, personId: string): Post[] {
  const network = new Set(acceptedConnectionsFor(s, personId).map((p) => p.id))
  network.add(personId)
  const fromNetwork = s.posts.filter((p) => network.has(p.authorId))
  // Keep the feed lively even for members with a thin network: fall back to the
  // full community timeline when the network view would be nearly empty.
  const source = fromNetwork.length >= 3 ? fromNetwork : s.posts
  return [...source].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
}

export function conversationsFor(s: SocialState, personId: string): Conversation[] {
  return [...s.conversations]
    .filter((c) => c.participantIds.includes(personId))
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
}

export function pendingApprovalsForGuardian(s: SocialState, guardianId: string): GuardianApproval[] {
  return s.approvals.filter((a) => a.guardianId === guardianId && a.status === "pending")
}

// ── Actions ───────────────────────────────────────────────────────────

function sendConnectRequest(fromId: string, toId: string) {
  const from = getPerson(state, fromId)
  const to = getPerson(state, toId)
  const action = resolveConnectAction(from, to)
  if (action.kind === "self") return

  if (connectionBetween(state, fromId, toId)) return // already exists

  if (action.kind === "guardian") {
    const connection: Connection = {
      id: uid("c"),
      requesterId: fromId,
      addresseeId: toId,
      status: "pending",
      awaitingGuardian: true,
      createdAt: now(),
    }
    const approval: GuardianApproval = {
      id: uid("ga"),
      type: "connection",
      fromPersonId: fromId,
      minorId: action.minorId,
      guardianId: action.guardianId,
      message: `${from?.name ?? "Someone"} would like to connect with ${to?.name ?? "your athlete"}.`,
      status: "pending",
      createdAt: now(),
    }
    setState({
      connections: [...state.connections, connection],
      approvals: [...state.approvals, approval],
    })
    return
  }

  const connection: Connection = {
    id: uid("c"),
    requesterId: fromId,
    addresseeId: toId,
    status: "pending",
    awaitingGuardian: false,
    createdAt: now(),
  }
  setState({ connections: [...state.connections, connection] })
}

function acceptConnection(connectionId: string) {
  setState({
    connections: state.connections.map((c) =>
      c.id === connectionId ? { ...c, status: "accepted", awaitingGuardian: false } : c,
    ),
  })
}

function declineConnection(connectionId: string) {
  setState({ connections: state.connections.filter((c) => c.id !== connectionId) })
}

function resolveApproval(approvalId: string, decision: "approved" | "declined") {
  const approval = state.approvals.find((a) => a.id === approvalId)
  if (!approval) return

  let connections = state.connections
  if (approval.type === "connection") {
    connections = state.connections.map((c) => {
      const matches =
        c.awaitingGuardian &&
        ((c.requesterId === approval.fromPersonId && c.addresseeId === approval.minorId) ||
          (c.addresseeId === approval.fromPersonId && c.requesterId === approval.minorId))
      if (!matches) return c
      return decision === "approved"
        ? { ...c, status: "accepted" as const, awaitingGuardian: false }
        : c
    })
    if (decision === "declined") {
      connections = connections.filter(
        (c) =>
          !(
            c.awaitingGuardian &&
            ((c.requesterId === approval.fromPersonId && c.addresseeId === approval.minorId) ||
              (c.addresseeId === approval.fromPersonId && c.requesterId === approval.minorId))
          ),
      )
    }
  }

  const conversations =
    approval.type === "message" && decision === "approved"
      ? state.conversations.map((c) =>
          c.participantIds.includes(approval.fromPersonId) && c.participantIds.includes(approval.minorId)
            ? { ...c, locked: false }
            : c,
        )
      : state.conversations

  setState({
    connections,
    conversations,
    approvals: state.approvals.map((a) => (a.id === approvalId ? { ...a, status: decision } : a)),
  })
}

function createPost(authorId: string, body: string, sportTags: string[], image?: string) {
  if (!body.trim()) return
  const post: Post = {
    id: uid("post"),
    authorId,
    body: body.trim(),
    image,
    sportTags,
    likes: [],
    comments: [],
    createdAt: now(),
  }
  setState({ posts: [post, ...state.posts] })
}

function toggleLike(postId: string, personId: string) {
  setState({
    posts: state.posts.map((p) => {
      if (p.id !== postId) return p
      const liked = p.likes.includes(personId)
      return { ...p, likes: liked ? p.likes.filter((id) => id !== personId) : [...p.likes, personId] }
    }),
  })
}

function addComment(postId: string, authorId: string, body: string) {
  if (!body.trim()) return
  setState({
    posts: state.posts.map((p) =>
      p.id === postId
        ? {
            ...p,
            comments: [
              ...p.comments,
              { id: uid("cm"), postId, authorId, body: body.trim(), createdAt: now() },
            ],
          }
        : p,
    ),
  })
}

/** Finds an existing conversation or creates one, applying the minor gate. */
function openConversation(viewerId: string, otherId: string): string {
  const existing = state.conversations.find(
    (c) => c.participantIds.length === 2 && c.participantIds.includes(viewerId) && c.participantIds.includes(otherId),
  )
  if (existing) return existing.id

  const viewer = getPerson(state, viewerId)
  const other = getPerson(state, otherId)
  const action = resolveConnectAction(viewer, other)
  const locked = action.kind === "guardian"

  const conv: Conversation = {
    id: uid("conv"),
    participantIds: [viewerId, otherId],
    messages: [],
    locked,
    updatedAt: now(),
  }

  let approvals = state.approvals
  if (locked && action.kind === "guardian") {
    approvals = [
      ...approvals,
      {
        id: uid("ga"),
        type: "message",
        fromPersonId: viewerId,
        minorId: action.minorId,
        guardianId: action.guardianId,
        message: `${viewer?.name ?? "Someone"} would like to message ${other?.name ?? "your athlete"}.`,
        status: "pending",
        createdAt: now(),
      },
    ]
  }

  setState({ conversations: [conv, ...state.conversations], approvals })
  return conv.id
}

function sendMessage(conversationId: string, senderId: string, body: string) {
  if (!body.trim()) return
  setState({
    conversations: state.conversations.map((c) => {
      if (c.id !== conversationId || c.locked) return c
      return {
        ...c,
        updatedAt: now(),
        messages: [
          ...c.messages,
          { id: uid("m"), conversationId, senderId, body: body.trim(), createdAt: now() },
        ],
      }
    }),
  })
}

const actions = {
  sendConnectRequest,
  acceptConnection,
  declineConnection,
  resolveApproval,
  createPost,
  toggleLike,
  addComment,
  openConversation,
  sendMessage,
}

export type SocialActions = typeof actions

// ── Hook ──────────────────────────────────────────────────────────────

export function useSocialStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const stableActions = useMemo(() => actions, [])
  return { state: snapshot, ...stableActions }
}

/** Resolve the person node for the current mock auth user. */
export function useCurrentPersonId(role: UserRole | undefined): string | undefined {
  return role ? authUserToPersonId[role] : undefined
}

/** Convenience: relative "time ago" formatting for feed/messages. */
export function useTimeAgo() {
  return useCallback((iso: string) => timeAgo(iso), [])
}

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ""
  const diff = Date.now() - then
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m`
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return `${hrs}h`
  const days = Math.round(hrs / 24)
  if (days < 7) return `${days}d`
  const weeks = Math.round(days / 7)
  if (weeks < 5) return `${weeks}w`
  return new Date(iso).toLocaleDateString()
}
