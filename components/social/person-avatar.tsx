import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import type { Person, PersonKind } from "@/lib/types"

const kindStyles: Record<PersonKind, string> = {
  athlete: "bg-primary text-primary-foreground",
  scout: "bg-accent text-accent-foreground",
  coach: "bg-chart-3 text-background",
  guardian: "bg-chart-4 text-background",
  admin: "bg-muted text-foreground",
}

export function personInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
}

export function PersonAvatar({
  person,
  className,
}: {
  person: Pick<Person, "name" | "kind" | "avatar">
  className?: string
}) {
  return (
    <Avatar className={cn("h-10 w-10", className)}>
      {person.avatar && <AvatarImage src={person.avatar || "/placeholder.svg"} alt={person.name} />}
      <AvatarFallback className={cn("text-sm font-medium", kindStyles[person.kind])}>
        {personInitials(person.name)}
      </AvatarFallback>
    </Avatar>
  )
}

const kindLabels: Record<PersonKind, string> = {
  athlete: "Athlete",
  scout: "Scout",
  coach: "Coach",
  guardian: "Guardian",
  admin: "Admin",
}

export function kindLabel(kind: PersonKind): string {
  return kindLabels[kind]
}
