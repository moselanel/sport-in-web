"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/stat-card"
import { mockVideos, mockPlayers } from "@/lib/mock-data"
import type { Video as VideoType } from "@/lib/types"
import { Play, Check, X, Video, Clock, CheckCircle } from "lucide-react"

export default function AdminVideos() {
  const [videos, setVideos] = useState<VideoType[]>(mockVideos)

  const moderate = (id: string, status: "approved" | "rejected") => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)))
  }

  const pending = videos.filter((v) => v.status === "pending")
  const approved = videos.filter((v) => v.status === "approved")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Video Moderation</h1>
        <p className="text-muted-foreground">Review and approve player-submitted videos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Videos" value={videos.length} icon={<Video className="h-6 w-6" />} />
        <StatCard title="Pending Review" value={pending.length} icon={<Clock className="h-6 w-6" />} />
        <StatCard title="Approved" value={approved.length} icon={<CheckCircle className="h-6 w-6" />} />
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Moderation Queue</h2>
        {pending.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {pending.map((video) => {
              const player = mockPlayers.find((p) => p.id === video.playerId)
              return (
                <Card key={video.id} className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="relative w-32 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <Play className="h-6 w-6 text-white" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {video.duration}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">{video.title}</p>
                        <p className="text-xs text-muted-foreground">{player?.name ?? "Unknown player"}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {video.sport.name}
                          </Badge>
                          <span className="text-xs text-muted-foreground capitalize">{video.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 bg-transparent text-destructive hover:text-destructive"
                        onClick={() => moderate(video.id, "rejected")}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button size="sm" className="flex-1" onClick={() => moderate(video.id, "approved")}>
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        ) : (
          <Card className="bg-card border-border">
            <CardContent className="py-12 text-center">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-primary/50" />
              <p className="text-muted-foreground">All caught up! No videos pending review.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
