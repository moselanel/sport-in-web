"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockVideos, mockPlayers } from "@/lib/mock-data"
import { Video, Play, Clock, CheckCircle, XCircle, Upload } from "lucide-react"
import Link from "next/link"

export default function PlayerVideos() {
  const player = mockPlayers[0]
  const myVideos = mockVideos.filter((v) => v.playerId === player.id)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-500/10 text-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-accent/10 text-accent">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-destructive/10 text-destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-foreground">My Videos</h1>
          <p className="text-sm text-muted-foreground">{myVideos.length} videos uploaded</p>
        </div>
        <Link href="/app/player/upload">
          <Button size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </Link>
      </div>

      {myVideos.length > 0 ? (
        <div className="space-y-4">
          {myVideos.map((video) => (
            <Card key={video.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg?height=80&width=128&query=sports video thumbnail"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {video.sport.name} - {video.type}
                    </p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(video.status)}
                      <span className="text-xs text-muted-foreground">{video.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground mb-4">No videos uploaded yet</p>
            <Link href="/app/player/upload">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Your First Video
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
