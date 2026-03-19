"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Shield, Bell, Eye, LogOut } from "lucide-react"

export default function GuardianSettings() {
  return (
    <div className="space-y-6 p-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage your account and privacy</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy Settings
          </CardTitle>
          <CardDescription>Control what scouts can see</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="visible-scouts" className="flex-1">
              <p className="font-medium">Visible to Scouts</p>
              <p className="text-sm text-muted-foreground">Allow scouts to discover your players</p>
            </Label>
            <Switch id="visible-scouts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-school" className="flex-1">
              <p className="font-medium">Show School Name</p>
              <p className="text-sm text-muted-foreground">Display school affiliation publicly</p>
            </Label>
            <Switch id="show-school" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-stats" className="flex-1">
              <p className="font-medium">Show Stats</p>
              <p className="text-sm text-muted-foreground">Display performance statistics</p>
            </Label>
            <Switch id="show-stats" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="contact-requests" className="flex-1">
              <p className="font-medium">Contact Requests</p>
              <p className="text-sm text-muted-foreground">When scouts request contact</p>
            </Label>
            <Switch id="contact-requests" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="video-status" className="flex-1">
              <p className="font-medium">Video Status Updates</p>
              <p className="text-sm text-muted-foreground">When videos are approved/rejected</p>
            </Label>
            <Switch id="video-status" defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start bg-transparent">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-start bg-transparent text-destructive">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
