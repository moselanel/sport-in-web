import type { Person } from "./types"

/**
 * Hybrid audience model
 * ---------------------
 * - Adult ↔ Adult: connect and message directly (LinkedIn-style).
 * - Any edge involving a MINOR: routes through the minor's guardian for
 *   approval before a connection is formed or a message can be sent.
 *
 * This preserves the platform's existing child-safety guarantees while
 * opening up open peer-to-peer networking between adults.
 */

export function isMinor(person: Person | undefined): boolean {
  return !!person?.isMinor
}

/** True when an action between these two people needs guardian sign-off. */
export function involvesMinor(a: Person | undefined, b: Person | undefined): boolean {
  return isMinor(a) || isMinor(b)
}

/** Adults can connect directly; edges touching a minor cannot. */
export function canConnectDirectly(a: Person | undefined, b: Person | undefined): boolean {
  return !!a && !!b && a.id !== b.id && !involvesMinor(a, b)
}

/** Returns the minor in the pair, if any (used to route guardian approvals). */
export function minorIn(a: Person | undefined, b: Person | undefined): Person | undefined {
  if (isMinor(a)) return a
  if (isMinor(b)) return b
  return undefined
}

/**
 * Whether `viewer` is allowed to open a direct message thread with `other`
 * without any pending guardian gate. Messaging a minor is always gated.
 */
export function canMessageDirectly(viewer: Person | undefined, other: Person | undefined): boolean {
  return !!viewer && !!other && viewer.id !== other.id && !involvesMinor(viewer, other)
}

export type ConnectAction =
  | { kind: "direct" } // form the connection immediately
  | { kind: "guardian"; minorId: string; guardianId: string } // route to guardian
  | { kind: "self" } // cannot connect to yourself

export function resolveConnectAction(a: Person | undefined, b: Person | undefined): ConnectAction {
  if (!a || !b || a.id === b.id) return { kind: "self" }
  const minor = minorIn(a, b)
  if (minor?.guardianId) {
    return { kind: "guardian", minorId: minor.id, guardianId: minor.guardianId }
  }
  return { kind: "direct" }
}
