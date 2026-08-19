export type UserRole = "admin" | "scout" | "school" | "guardian" | "player"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  verified: boolean
}

export interface Player {
  id: string
  name: string
  age: number
  gender?: string
  region: string
  province: string
  sports: Sport[]
  positions: string[]
  school?: School
  guardian: Guardian
  status: "active" | "pending" | "suspended"
  lastActive: string
  stats: PlayerStats
  videos: Video[]
  challenges: ChallengeResult[]
  privacySettings: PrivacySettings
}

export interface Sport {
  id: string
  name: string
  icon: string
}

export interface PlayerStats {
  speed: number
  power: number
  agility: number
  technique: number
  endurance: number
}

export interface PrivacySettings {
  visibleToScouts: boolean
  hideSchoolName: boolean
  guardianApprovalRequired: boolean
}

export interface Guardian {
  id: string
  name: string
  email: string
  phone: string
  relationship: string
  verified: boolean
}

export interface School {
  id: string
  name: string
  city: string
  province: string
  email: string
  phone: string
  logo?: string
  verificationStatus: "pending" | "verified" | "suspended"
  coaches: Coach[]
  players: Player[]
  teams: Team[]
}

export interface Coach {
  id: string
  name: string
  email: string
  phone: string
  role: string
  schoolId: string
  verified: boolean
}

export interface Team {
  id: string
  name: string
  ageGroup: string
  sport: Sport
  players: Player[]
}

export interface Video {
  id: string
  title: string
  thumbnail: string
  url: string
  sport: Sport
  type: "match" | "training" | "skills" | "school-event"
  playerId: string
  schoolTag?: string
  uploadedAt: string
  status: "pending" | "approved" | "rejected"
  duration: string
}

export interface Challenge {
  id: string
  title: string
  sport: Sport
  description: string
  rules: string[]
  requirements: string[]
  deadline?: string
}

export interface ChallengeResult {
  id: string
  challengeId: string
  playerId: string
  videoId: string
  score?: number
  submittedAt: string
}

export interface ContactRequest {
  id: string
  scoutId: string
  scoutName: string
  scoutOrganization: string
  playerId: string
  playerName: string
  guardianId: string
  status: "pending" | "approved" | "declined"
  message: string
  createdAt: string
}

export interface Notification {
  id: string
  type: "contact_request" | "video_approved" | "school_link" | "challenge" | "system"
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

// ── Social network layer ─────────────────────────────────────────────

export type PersonKind = "athlete" | "scout" | "coach" | "guardian" | "admin"

/**
 * A unified directory entry that spans every kind of member on the network
 * (athletes, scouts, coaches, guardians). This is the "profile" concept the
 * social graph, feed, and messaging all reference.
 */
export interface Person {
  id: string
  name: string
  kind: PersonKind
  headline: string
  avatar?: string
  province?: string
  sports: string[]
  /** Present for athletes; drives the minor-safety rules. */
  age?: number
  isMinor: boolean
  /** For minors: the guardian responsible for approving connections/messages. */
  guardianId?: string
  organization?: string
  verified: boolean
}

export type ConnectionStatus = "none" | "pending" | "accepted"

export interface Connection {
  id: string
  requesterId: string
  addresseeId: string
  status: "pending" | "accepted"
  /** True when this edge involves a minor and is awaiting guardian sign-off. */
  awaitingGuardian: boolean
  createdAt: string
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  body: string
  createdAt: string
}

export interface Post {
  id: string
  authorId: string
  body: string
  image?: string
  sportTags: string[]
  likes: string[] // person ids who liked
  comments: Comment[]
  createdAt: string
}

export interface Message {
  id: string
  conversationId: string
  senderId: string
  body: string
  createdAt: string
}

export interface Conversation {
  id: string
  participantIds: string[]
  messages: Message[]
  /** True when messaging is blocked pending guardian approval (minor involved). */
  locked: boolean
  updatedAt: string
}

export type GuardianApprovalType = "connection" | "message"

export interface GuardianApproval {
  id: string
  type: GuardianApprovalType
  fromPersonId: string
  minorId: string
  guardianId: string
  message: string
  status: "pending" | "approved" | "declined"
  createdAt: string
}
