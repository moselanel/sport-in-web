import { Badge } from "@/components/ui/badge"
import { Shield, GraduationCap, UserCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type BadgeType = "guardian" | "school" | "scout"

interface VerifiedBadgeProps {
  type: BadgeType
  size?: "sm" | "md"
  showLabel?: boolean
}

const badgeConfig: Record<BadgeType, { icon: typeof Shield; label: string; className: string }> = {
  guardian: {
    icon: Shield,
    label: "Guardian Verified",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  school: {
    icon: GraduationCap,
    label: "School Verified",
    className: "bg-accent/10 text-accent border-accent/20",
  },
  scout: {
    icon: UserCheck,
    label: "Scout Verified",
    className: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  },
}

export function VerifiedBadge({ type, size = "sm", showLabel = true }: VerifiedBadgeProps) {
  const config = badgeConfig[type]
  const Icon = config.icon

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1 font-medium",
        config.className,
        size === "sm" ? "text-xs px-2 py-0.5" : "text-sm px-2.5 py-1",
      )}
    >
      <Icon className={size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
      {showLabel && config.label}
    </Badge>
  )
}
