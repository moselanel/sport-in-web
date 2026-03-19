"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockChallenges } from "@/lib/mock-data"
import { Target, Trophy, Clock, Video, ArrowRight } from "lucide-react"

export default function PlayerChallenges() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Skill Challenges</h1>
        <p className="text-sm text-muted-foreground">Complete challenges to showcase your abilities</p>
      </div>

      <div className="space-y-4">
        {mockChallenges.map((challenge) => (
          <Card key={challenge.id} className="bg-card border-border">
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.sport.name}</CardDescription>
                  </div>
                </div>
                {challenge.featured && (
                  <Badge className="bg-accent/10 text-accent">
                    <Trophy className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{challenge.description}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {challenge.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  {challenge.submissions} submissions
                </span>
              </div>
              <Button className="w-full">
                Start Challenge
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
