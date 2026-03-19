"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { sports } from "@/lib/mock-data"
import { Upload, Video, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PlayerUpload() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sport, setSport] = useState("")
  const [type, setType] = useState("")
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle upload
  }

  return (
    <div className="space-y-6 p-4 max-w-lg mx-auto">
      <div className="flex items-center gap-3">
        <Link href="/app/player">
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground">Upload Video</h1>
          <p className="text-sm text-muted-foreground">Share your skills with scouts</p>
        </div>
      </div>

      <Card className="bg-muted/50 border-border">
        <CardContent className="p-4 flex gap-3">
          <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">Guardian Approval Required</p>
            <p className="text-xs text-muted-foreground">
              Your video will be reviewed by moderators before it becomes visible to scouts.
            </p>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onClick={() => document.getElementById("video-input")?.click()}
            >
              <input
                id="video-input"
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file ? (
                <div className="space-y-2">
                  <Video className="h-10 w-10 mx-auto text-primary" />
                  <p className="font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
                  <p className="font-medium text-foreground">Tap to select video</p>
                  <p className="text-sm text-muted-foreground">MP4, MOV up to 100MB</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              placeholder="e.g., Match Highlights vs Parktown"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Sport</Label>
            <Select value={sport} onValueChange={setSport}>
              <SelectTrigger>
                <SelectValue placeholder="Select sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((s) => (
                  <SelectItem key={s.id} value={s.id}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Video Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="highlight">Match Highlight</SelectItem>
                <SelectItem value="training">Training Session</SelectItem>
                <SelectItem value="skill">Skill Showcase</SelectItem>
                <SelectItem value="challenge">Challenge Submission</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description (Optional)</Label>
            <Textarea
              placeholder="Add details about this video..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={!file || !title || !sport || !type}>
          <Upload className="h-4 w-4 mr-2" />
          Submit for Review
        </Button>
      </form>
    </div>
  )
}
