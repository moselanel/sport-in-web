import type { Person, Connection, Post, Conversation, GuardianApproval, UserRole } from "./types"

/**
 * Unified people directory. Athletes are drawn from the existing mock players;
 * adults (scouts, coaches, guardians) round out the network so connections,
 * feed, and messaging have realistic content.
 */
export const people: Person[] = [
  // ── Athletes (minors + one 18yo adult athlete) ───────────────────────
  {
    id: "person-player-1",
    name: "Thabo Mokoena",
    kind: "athlete",
    headline: "Striker & Sprinter · Pretoria Boys High",
    province: "Gauteng",
    sports: ["Football", "Athletics"],
    age: 16,
    isMinor: true,
    guardianId: "person-guardian-1",
    verified: true,
  },
  {
    id: "person-player-2",
    name: "Lerato Dlamini",
    kind: "athlete",
    headline: "Goal Shooter · Bishops Diocesan College",
    province: "Western Cape",
    sports: ["Netball"],
    age: 14,
    isMinor: true,
    guardianId: "person-guardian-2",
    verified: true,
  },
  {
    id: "person-player-3",
    name: "Sipho Nkosi",
    kind: "athlete",
    headline: "Fly-half & All-rounder · Glenwood High",
    province: "KwaZulu-Natal",
    sports: ["Rugby", "Cricket"],
    age: 17,
    isMinor: true,
    guardianId: "person-guardian-3",
    verified: true,
  },
  {
    id: "person-player-4",
    name: "Nomvula Zulu",
    kind: "athlete",
    headline: "Long Jump & 100m · Free State Athletics",
    province: "Free State",
    sports: ["Athletics"],
    age: 15,
    isMinor: true,
    guardianId: "person-guardian-4",
    verified: true,
  },
  {
    id: "person-player-6",
    name: "Aphiwe Jacobs",
    kind: "athlete",
    headline: "Winger · Stellenbosch Academy · 18",
    province: "Western Cape",
    sports: ["Rugby"],
    age: 18,
    isMinor: false,
    verified: true,
  },

  // ── Scouts ───────────────────────────────────────────────────────────
  {
    id: "person-scout-1",
    name: "David Williams",
    kind: "scout",
    headline: "Talent Scout · Kaizer Chiefs Academy",
    province: "Gauteng",
    sports: ["Football"],
    isMinor: false,
    organization: "Kaizer Chiefs Academy",
    verified: true,
  },
  {
    id: "person-scout-2",
    name: "Sarah van der Berg",
    kind: "scout",
    headline: "Development Scout · Netball SA",
    province: "Western Cape",
    sports: ["Netball"],
    isMinor: false,
    organization: "Netball SA Development",
    verified: true,
  },
  {
    id: "person-scout-3",
    name: "Riaan Botha",
    kind: "scout",
    headline: "Regional Scout · SA Rugby Pathways",
    province: "KwaZulu-Natal",
    sports: ["Rugby"],
    isMinor: false,
    organization: "SA Rugby Pathways",
    verified: true,
  },

  // ── Coaches ──────────────────────────────────────────────────────────
  {
    id: "person-coach-1",
    name: "John Smith",
    kind: "coach",
    headline: "Head Coach · Pretoria Boys High",
    province: "Gauteng",
    sports: ["Football", "Athletics"],
    isMinor: false,
    organization: "Pretoria Boys High",
    verified: true,
  },
  {
    id: "person-coach-2",
    name: "Mary Johnson",
    kind: "coach",
    headline: "Assistant Coach · Pretoria Boys High",
    province: "Gauteng",
    sports: ["Athletics"],
    isMinor: false,
    organization: "Pretoria Boys High",
    verified: true,
  },

  // ── Guardians ────────────────────────────────────────────────────────
  {
    id: "person-guardian-1",
    name: "Sarah Mokoena",
    kind: "guardian",
    headline: "Guardian of Thabo Mokoena",
    province: "Gauteng",
    sports: [],
    isMinor: false,
    verified: true,
  },
  {
    id: "person-guardian-2",
    name: "Peter Dlamini",
    kind: "guardian",
    headline: "Guardian of Lerato Dlamini",
    province: "Western Cape",
    sports: [],
    isMinor: false,
    verified: true,
  },
  {
    id: "person-guardian-3",
    name: "Grace Nkosi",
    kind: "guardian",
    headline: "Guardian of Sipho Nkosi",
    province: "KwaZulu-Natal",
    sports: [],
    isMinor: false,
    verified: true,
  },
  {
    id: "person-guardian-4",
    name: "James Zulu",
    kind: "guardian",
    headline: "Guardian of Nomvula Zulu",
    province: "Free State",
    sports: [],
    isMinor: false,
    verified: true,
  },
]

/**
 * Maps the mock auth user (from auth-context) to the person that represents
 * them in the social graph. Keyed by auth role + name so the logged-in user
 * has a real node in the network.
 */
export const authUserToPersonId: Record<UserRole, string> = {
  player: "person-player-1", // Thabo Mokoena
  scout: "person-scout-1", // David Williams
  school: "person-coach-1", // John Smith
  guardian: "person-guardian-1", // Sarah Mokoena
  admin: "person-scout-1", // admins browse as a scout-like view for the demo
}

/** Where each role's routes live, used to build in-shell social links. */
export const roleBasePath: Record<UserRole, string> = {
  player: "/app/player",
  guardian: "/app/guardian",
  scout: "/portal/scout",
  school: "/portal/school",
  admin: "/portal/admin",
}

export const seedConnections: Connection[] = [
  {
    id: "c1",
    requesterId: "person-scout-1",
    addresseeId: "person-coach-1",
    status: "accepted",
    awaitingGuardian: false,
    createdAt: "2024-01-02",
  },
  {
    id: "c2",
    requesterId: "person-scout-1",
    addresseeId: "person-scout-2",
    status: "accepted",
    awaitingGuardian: false,
    createdAt: "2024-01-03",
  },
  {
    id: "c3",
    requesterId: "person-coach-1",
    addresseeId: "person-coach-2",
    status: "accepted",
    awaitingGuardian: false,
    createdAt: "2024-01-04",
  },
  {
    id: "c4",
    requesterId: "person-scout-3",
    addresseeId: "person-coach-1",
    status: "accepted",
    awaitingGuardian: false,
    createdAt: "2024-01-05",
  },
  {
    id: "c5",
    requesterId: "person-guardian-1",
    addresseeId: "person-coach-1",
    status: "accepted",
    awaitingGuardian: false,
    createdAt: "2024-01-06",
  },
  {
    id: "c6",
    requesterId: "person-scout-2",
    addresseeId: "person-scout-3",
    status: "pending",
    awaitingGuardian: false,
    createdAt: "2024-01-08",
  },
]

export const seedPosts: Post[] = [
  {
    id: "post-1",
    authorId: "person-coach-1",
    body: "Proud of our U16 squad after a hard-fought inter-school final today. The character this group showed in the second half was next level. Scouts, keep an eye on this cohort.",
    sportTags: ["Football"],
    likes: ["person-scout-1", "person-scout-2", "person-guardian-1"],
    comments: [
      {
        id: "cm-1",
        postId: "post-1",
        authorId: "person-scout-1",
        body: "Great to hear, John. Will reach out about a couple of the strikers.",
        createdAt: "2024-01-14T18:20:00Z",
      },
    ],
    createdAt: "2024-01-14T16:00:00Z",
  },
  {
    id: "post-2",
    authorId: "person-scout-2",
    body: "Netball SA development camp applications are open. We are specifically looking for goal shooters and centres across the Western and Eastern Cape. Tag a rising star below.",
    sportTags: ["Netball"],
    likes: ["person-coach-1", "person-scout-1"],
    comments: [],
    createdAt: "2024-01-13T09:30:00Z",
  },
  {
    id: "post-3",
    authorId: "person-scout-1",
    body: "What I look for first in a young striker is not the goals — it is off-the-ball movement and how they respond after a mistake. Technique can be coached; mentality is harder to find.",
    sportTags: ["Football"],
    likes: ["person-coach-1", "person-coach-2", "person-scout-3", "person-guardian-1"],
    comments: [
      {
        id: "cm-2",
        postId: "post-3",
        authorId: "person-coach-2",
        body: "100%. Resilience separates the good from the great.",
        createdAt: "2024-01-12T11:00:00Z",
      },
    ],
    createdAt: "2024-01-12T08:15:00Z",
  },
  {
    id: "post-4",
    authorId: "person-player-6",
    body: "Signed my first academy contract with Stellenbosch this week. Thank you to every coach who believed in me since U14. This is only the beginning.",
    sportTags: ["Rugby"],
    likes: ["person-scout-3", "person-coach-1", "person-scout-1"],
    comments: [
      {
        id: "cm-3",
        postId: "post-4",
        authorId: "person-scout-3",
        body: "Thoroughly deserved, Aphiwe. Go well.",
        createdAt: "2024-01-11T14:00:00Z",
      },
    ],
    createdAt: "2024-01-11T12:00:00Z",
  },
  {
    id: "post-5",
    authorId: "person-scout-3",
    body: "Reminder to young athletes: your highlight reel gets you noticed, but your school reports and attitude at trials get you signed. We are watching the whole picture.",
    sportTags: ["Rugby"],
    likes: ["person-coach-1"],
    comments: [],
    createdAt: "2024-01-10T07:45:00Z",
  },
]

export const seedConversations: Conversation[] = [
  {
    id: "conv-1",
    participantIds: ["person-scout-1", "person-coach-1"],
    locked: false,
    updatedAt: "2024-01-14T18:40:00Z",
    messages: [
      {
        id: "m-1",
        conversationId: "conv-1",
        senderId: "person-scout-1",
        body: "John, great result today. Could we set up a call about two of your forwards?",
        createdAt: "2024-01-14T18:30:00Z",
      },
      {
        id: "m-2",
        conversationId: "conv-1",
        senderId: "person-coach-1",
        body: "Absolutely, David. I'm free Thursday afternoon. I'll loop in the guardians before any player contact.",
        createdAt: "2024-01-14T18:40:00Z",
      },
    ],
  },
  {
    id: "conv-2",
    participantIds: ["person-scout-1", "person-scout-2"],
    locked: false,
    updatedAt: "2024-01-13T10:05:00Z",
    messages: [
      {
        id: "m-3",
        conversationId: "conv-2",
        senderId: "person-scout-2",
        body: "Are you going to the provincial trials next month? Would be good to compare notes.",
        createdAt: "2024-01-13T10:00:00Z",
      },
      {
        id: "m-4",
        conversationId: "conv-2",
        senderId: "person-scout-1",
        body: "Planning to. Let's grab a coffee there.",
        createdAt: "2024-01-13T10:05:00Z",
      },
    ],
  },
]

export const seedGuardianApprovals: GuardianApproval[] = [
  {
    id: "ga-1",
    type: "connection",
    fromPersonId: "person-scout-1",
    minorId: "person-player-1",
    guardianId: "person-guardian-1",
    message: "David Williams (Kaizer Chiefs Academy) would like to connect with Thabo.",
    status: "pending",
    createdAt: "2024-01-15T09:00:00Z",
  },
]
