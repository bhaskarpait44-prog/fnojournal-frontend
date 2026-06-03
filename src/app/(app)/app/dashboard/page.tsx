"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, TrendingUp, IndianRupee, Activity, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useAnalyticsSummary } from "@/hooks/use-analytics";
import { useTradesList } from "@/hooks/use-trades";
import { formatCurrency } from "@/lib/format";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const { data: summary, isLoading: analyticsLoading } = useAnalyticsSummary('all');
  const { data: tradesData, isLoading: tradesLoading } = useTradesList();

  if (analyticsLoading || tradesLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const recentTrades = tradesData?.slice(0, 5) || [];

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total P&L</CardTitle>
            <IndianRupee className={`h-4 w-4 ${(summary?.netPnl || 0) >= 0 ? 'text-green-500' : 'text-red-400'}`} />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${(summary?.netPnl || 0) >= 0 ? 'text-green-500' : 'text-red-400'}`}>
              {formatCurrency(summary?.netPnl || 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Net after charges</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary?.winRate || '0%'}</div>
            <p className="text-xs text-muted-foreground mt-1">Based on {summary?.totalTrades || 0} trades</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary?.totalTrades || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">All time trades</p>
          </CardContent>
        </Card>
        
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Profit Factor</CardTitle>
            <Target className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{summary?.profitFactor || '0.00'}</div>
            <p className="text-xs text-muted-foreground mt-1">Consistency score</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* P&L Chart Placeholder */}
        <Card className="md:col-span-2 bg-[#0c0c0e] border-border/50 h-[400px]">
          <CardHeader>
            <CardTitle className="text-lg text-white">Quick Summary</CardTitle>
          </CardHeader>
          <CardContent className="h-full flex flex-col items-center justify-center text-muted-foreground">
            <TrendingUp className="h-12 w-12 mb-4 text-primary/20" />
            <p className="text-sm">Welcome back! You have made {summary?.totalTrades || 0} trades so far.</p>
            <p className="text-xs mt-2 text-muted-foreground">Go to Analytics for detailed performance charts.</p>
          </CardContent>
        </Card>

        {/* Recent Trades Table */}
        <Card className="bg-[#0c0c0e] border-border/50 h-[400px] flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-white">Recent Trades</CardTitle>
            <Button size="sm" variant="ghost" className="h-8 text-primary" asChild>
              <Link href="/app/trades/add">
                <PlusCircle className="mr-2 h-4 w-4" /> Add
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
             <div className="space-y-4 mt-4">
               {recentTrades.length === 0 ? (
                 <p className="text-center text-muted-foreground text-sm mt-8 italic">No trades yet. Add your first trade!</p>
               ) : (
                 recentTrades.map((trade: any) => (
                   <div key={trade.id} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/30">
                     <div>
                       <div className="font-medium text-white text-sm">{trade.underlying} {trade.strike_price || ''} {trade.instrument_type}</div>
                       <div className="text-xs text-muted-foreground">{new Date(trade.entry_datetime).toLocaleDateString()}</div>
                     </div>
                     <div className={`font-semibold ${Number(trade.net_pnl) >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                       {formatCurrency(trade.net_pnl)}
                     </div>
                   </div>
                 ))
               )}
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
