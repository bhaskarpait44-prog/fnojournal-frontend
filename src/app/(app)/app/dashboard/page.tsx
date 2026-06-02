"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, TrendingUp, IndianRupee, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
            <IndianRupee className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+₹45,231.50</div>
            <p className="text-xs text-muted-foreground mt-1">Net after charges</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">62.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Based on 145 trades</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">145</div>
            <p className="text-xs text-muted-foreground mt-1">This month: 24</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Month P&L</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-400">-₹4,120.00</div>
            <p className="text-xs text-muted-foreground mt-1">Needs improvement</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* P&L Chart Placeholder */}
        <Card className="md:col-span-2 bg-[#0c0c0e] border-border/50 h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg text-white">P&L Sparkline (Last 30 Days)</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex items-center justify-center">
            <p className="text-muted-foreground">Chart Component Placeholder</p>
          </CardContent>
        </Card>

        {/* Recent Trades Table Placeholder */}
        <Card className="bg-[#0c0c0e] border-border/50 h-[400px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-white">Recent Trades</CardTitle>
            <Button size="sm" variant="ghost" className="h-8 text-primary" asChild>
              <Link href="/app/trades/add"><PlusCircle className="mr-2 h-4 w-4" /> Add</Link>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
             <div className="space-y-4 mt-4">
               {[1, 2, 3, 4, 5].map((i) => (
                 <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/30">
                   <div>
                     <div className="font-medium text-white text-sm">BANKNIFTY 45000 CE</div>
                     <div className="text-xs text-muted-foreground">14 Jul 2026</div>
                   </div>
                   <div className={`font-semibold ${i % 3 === 0 ? 'text-red-400' : 'text-green-500'}`}>
                     {i % 3 === 0 ? '-₹1,200' : '+₹3,450'}
                   </div>
                 </div>
               ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}