"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/lib/stores/user-store";
import { formatCurrency } from "@/lib/format";
import { Check } from "lucide-react";

export default function BillingPage() {
  const { subscription } = useUserStore();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Billing & Subscription</h2>

      <Card className="bg-[#0c0c0e] border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Current Plan</CardTitle>
        </CardHeader>
        <CardContent>
          {subscription?.isActive ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-500">
                <Check className="h-5 w-5" />
                <span className="font-semibold uppercase">{subscription.plan} Plan Active</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your next billing date is {subscription.currentPeriodEnd ? new Date(subscription.currentPeriodEnd).toLocaleDateString() : 'N/A'}.
              </p>
              <Button variant="outline" className="border-red-500/50 text-red-500 hover:bg-red-500/10">
                Cancel Subscription
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">You are currently on the free plan.</p>
              <Button className="bg-primary text-white hover:bg-primary/90" asChild>
                <a href="/subscribe">Upgrade Now</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-[#0c0c0e] border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground italic">No recent invoices found.</p>
        </CardContent>
      </Card>
    </div>
  );
}
