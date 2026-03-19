"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { VerifiedBadge } from "@/components/verified-badge"
import { mockPlayers, sports, provinces } from "@/lib/mock-data"
import type { Player } from "@/lib/types"
import {
  Search,
  MapPin,
  Calendar,
  Play,
  Heart,
  Mail,
  Target,
  Video,
  Trophy,
  GraduationCap,
  SlidersHorizontal,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ScoutTalentDiscovery() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState<string>("all")
  const [selectedProvince, setSelectedProvince] = useState<string>("all")
  const [selectedAge, setSelectedAge] = useState<string>("all")
  const [selectedGender, setSelectedGender] = useState<string>("all")
  const [schoolPlayersOnly, setSchoolPlayersOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null)
  const [showContactDialog, setShowContactDialog] = useState(false)
  const [contactMessage, setContactMessage] = useState("")
  const [savedPlayers, setSavedPlayers] = useState<string[]>([])

  const filteredPlayers = mockPlayers.filter((player) => {
    if (!player.privacySettings.visibleToScouts) return false
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSport = selectedSport === "all" || player.sports.some((s) => s.id === selectedSport)
    const matchesProvince = selectedProvince === "all" || player.province === selectedProvince
    const matchesAge =
      selectedAge === "all" ||
      (selectedAge === "u14" && player.age < 14) ||
      (selectedAge === "u16" && player.age >= 14 && player.age < 16) ||
      (selectedAge === "u18" && player.age >= 16 && player.age < 18) ||
      (selectedAge === "u21" && player.age >= 18 && player.age < 21)
    const matchesGender = selectedGender === "all" || player.gender?.toLowerCase() === selectedGender
    const matchesSchool = !schoolPlayersOnly || !!player.school
    return matchesSearch && matchesSport && matchesProvince && matchesAge && matchesGender && matchesSchool
  })

  const toggleSavePlayer = (playerId: string) => {
    setSavedPlayers((prev) => (prev.includes(playerId) ? prev.filter((id) => id !== playerId) : [...prev, playerId]))
  }

  const handleContactRequest = () => {
    setShowContactDialog(false)
    setContactMessage("")
    setSelectedPlayer(null)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Talent Discovery</h1>
        <p className="text-muted-foreground">Search and discover young talent across South Africa</p>
      </div>

      {/* Search & Filter Bar */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search players by name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>
              <Button variant="outline" className="bg-transparent gap-2" onClick={() => setShowFilters(!showFilters)}>
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {(selectedSport !== "all" ||
                  selectedProvince !== "all" ||
                  selectedAge !== "all" ||
                  selectedGender !== "all" ||
                  schoolPlayersOnly) && (
                  <Badge variant="secondary" className="ml-1">
                    Active
                  </Badge>
                )}
              </Button>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 pt-4 border-t border-border">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Sport</Label>
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Sports" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      {sports.map((sport) => (
                        <SelectItem key={sport.id} value={sport.id}>
                          {sport.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Age Group</Label>
                  <Select value={selectedAge} onValueChange={setSelectedAge}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Ages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Ages</SelectItem>
                      <SelectItem value="u14">Under 14</SelectItem>
                      <SelectItem value="u16">Under 16</SelectItem>
                      <SelectItem value="u18">Under 18</SelectItem>
                      <SelectItem value="u21">Under 21</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Province</Label>
                  <Select value={selectedProvince} onValueChange={setSelectedProvince}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All Provinces" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Provinces</SelectItem>
                      {provinces.map((province) => (
                        <SelectItem key={province} value={province}>
                          {province}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Gender</Label>
                  <Select value={selectedGender} onValueChange={setSelectedGender}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 flex items-end">
                  <div className="flex items-center gap-2">
                    <Switch id="school-only" checked={schoolPlayersOnly} onCheckedChange={setSchoolPlayersOnly} />
                    <Label htmlFor="school-only" className="text-sm">
                      School Players Only
                    </Label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{filteredPlayers.length}</span> players
        </p>
      </div>

      {/* Player Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredPlayers.map((player) => (
          <Card
            key={player.id}
            className="bg-card border-border hover:border-primary/50 transition-all cursor-pointer group"
            onClick={() => setSelectedPlayer(player)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                    {player.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground truncate">{player.name}</h3>
                      {player.guardian.verified && <VerifiedBadge type="guardian" showLabel={false} />}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSavePlayer(player.id)
                      }}
                    >
                      <Heart
                        className={`h-4 w-4 ${savedPlayers.includes(player.id) ? "fill-destructive text-destructive" : ""}`}
                      />
                    </Button>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {player.age} yrs
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {player.region}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {player.sports.map((sport) => (
                      <Badge key={sport.id} variant="secondary" className="text-xs">
                        {sport.name}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">{player.positions.join(" - ")}</p>
                  {player.school && !player.privacySettings.hideSchoolName && (
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      {player.school.name}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPlayers.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="py-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-muted-foreground">No players found matching your criteria</p>
            <Button
              variant="outline"
              className="mt-4 bg-transparent"
              onClick={() => {
                setSelectedSport("all")
                setSelectedProvince("all")
                setSelectedAge("all")
                setSelectedGender("all")
                setSchoolPlayersOnly(false)
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Player Profile Dialog */}
      <Dialog open={!!selectedPlayer && !showContactDialog} onOpenChange={() => setSelectedPlayer(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedPlayer && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {selectedPlayer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <DialogTitle className="text-xl">{selectedPlayer.name}</DialogTitle>
                        {selectedPlayer.guardian.verified && <VerifiedBadge type="guardian" />}
                      </div>
                      <DialogDescription className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {selectedPlayer.age} years old
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {selectedPlayer.region}, {selectedPlayer.province}
                        </span>
                      </DialogDescription>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSavePlayer(selectedPlayer.id)}
                    className="flex-shrink-0"
                  >
                    <Heart
                      className={`h-5 w-5 ${savedPlayers.includes(selectedPlayer.id) ? "fill-destructive text-destructive" : ""}`}
                    />
                  </Button>
                </div>
              </DialogHeader>

              <Tabs defaultValue="highlights" className="mt-6">
                <TabsList className="bg-muted">
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="stats">Stats & Attributes</TabsTrigger>
                  <TabsTrigger value="challenges">Challenges</TabsTrigger>
                </TabsList>

                <TabsContent value="highlights" className="mt-4">
                  <div className="grid gap-4">
                    <div className="flex flex-wrap gap-2">
                      {selectedPlayer.sports.map((sport) => (
                        <Badge key={sport.id} className="bg-primary/10 text-primary">
                          {sport.name}
                        </Badge>
                      ))}
                      {selectedPlayer.positions.map((pos) => (
                        <Badge key={pos} variant="outline">
                          {pos}
                        </Badge>
                      ))}
                    </div>

                    {selectedPlayer.school && !selectedPlayer.privacySettings.hideSchoolName && (
                      <Card className="bg-muted/50 border-border">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <GraduationCap className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{selectedPlayer.school.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {selectedPlayer.school.city}, {selectedPlayer.school.province}
                            </p>
                          </div>
                          {selectedPlayer.school.verificationStatus === "verified" && (
                            <VerifiedBadge type="school" size="sm" />
                          )}
                        </CardContent>
                      </Card>
                    )}

                    <Card className="bg-muted/50 border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Video className="h-4 w-4" />
                          Performance Videos
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center py-8 text-muted-foreground">
                        <Play className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No videos available</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="stats" className="mt-4">
                  <Card className="bg-muted/50 border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Target className="h-4 w-4" />
                        Attributes
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(selectedPlayer.stats).map(([key, value]) => (
                        <div key={key} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground capitalize">{key}</span>
                            <span className="text-foreground font-medium">{value}</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full" style={{ width: `${value}%` }} />
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="challenges" className="mt-4">
                  <Card className="bg-muted/50 border-border">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        Challenge Results
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center py-8 text-muted-foreground">
                      <Trophy className="h-10 w-10 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No challenge submissions yet</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <DialogFooter className="mt-6">
                <Button variant="outline" className="bg-transparent" onClick={() => setSelectedPlayer(null)}>
                  Close
                </Button>
                <Button
                  onClick={() => {
                    setShowContactDialog(true)
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Request Contact
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Contact Request Dialog */}
      <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Contact</DialogTitle>
            <DialogDescription>
              This request will be sent to {selectedPlayer?.name}&apos;s guardian for approval. Direct contact with
              minors is not permitted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Message to Guardian</Label>
              <Textarea
                placeholder="Introduce yourself and explain why you'd like to connect with this player..."
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="bg-transparent" onClick={() => setShowContactDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleContactRequest} disabled={!contactMessage.trim()}>
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
