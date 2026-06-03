"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/lib/stores/user-store";

export default function SettingsPage() {
  const { profile } = useUserStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Account Settings</h2>

      <div className="grid gap-6">
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Profile Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-muted-foreground">Full Name</Label>
              <Input id="name" defaultValue={profile?.name || ''} className="bg-background/50 border-border/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-muted-foreground">Email Address</Label>
              <Input id="email" defaultValue={profile?.email || ''} disabled className="bg-background/50 border-border/50 opacity-50" />
            </div>
            <Button className="bg-primary text-white hover:bg-primary/90">
              Save Changes
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="current-pass" className="text-muted-foreground">Current Password</Label>
              <Input id="current-pass" type="password" placeholder="••••••••" className="bg-background/50 border-border/50" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-pass" className="text-muted-foreground">New Password</Label>
              <Input id="new-pass" type="password" placeholder="••••••••" className="bg-background/50 border-border/50" />
            </div>
            <Button variant="outline" className="border-border/50">
              Update Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
