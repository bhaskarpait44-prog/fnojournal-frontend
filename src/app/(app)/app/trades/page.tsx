"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Download, Search, Filter, Loader2 } from "lucide-react";
import Link from "next/link";
import { useTradesList } from "@/hooks/use-trades";
import { formatCurrency } from "@/lib/format";

export default function TradesPage() {
  const { data: trades, isLoading } = useTradesList();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search instrument..." 
              className="pl-9 w-64 bg-[#0c0c0e] border-border/50 text-white"
            />
          </div>
          <Button variant="outline" size="icon" className="bg-[#0c0c0e] border-border/50 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="bg-[#0c0c0e] border-border/50 text-white hover:bg-slate-800">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button nativeButton={false} render={<Link href="/app/trades/add" />} className="bg-primary hover:bg-primary/90">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Trade
          </Button>
        </div>
      </div>

      <Card className="bg-[#0c0c0e] border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">All Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-border/50 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground bg-muted/20 border-b border-border/50">
                <tr>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium">Instrument</th>
                  <th className="px-6 py-3 font-medium">Type</th>
                  <th className="px-6 py-3 font-medium">Action</th>
                  <th className="px-6 py-3 font-medium text-right">Net P&L</th>
                  <th className="px-6 py-3 font-medium">Tag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50 text-white">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center">
                      <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                    </td>
                  </tr>
                ) : trades?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-10 text-center text-muted-foreground">
                      No trades found. Start by adding your first trade!
                    </td>
                  </tr>
                ) : (
                  trades?.map((trade: any) => (
                    <tr key={trade.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-6 py-4">{new Date(trade.entry_datetime).toLocaleDateString('en-IN')}</td>
                      <td className="px-6 py-4 font-medium">{trade.underlying} {trade.strike_price} {trade.instrument_type}</td>
                      <td className="px-6 py-4">{trade.instrument_type === 'FUT' ? 'Future' : 'Options'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${trade.action === 'BUY' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                          {trade.action}
                        </span>
                      </td>
                      <td className={`px-6 py-4 text-right font-semibold ${trade.net_pnl >= 0 ? 'text-green-500' : 'text-red-400'}`}>
                        {formatCurrency(trade.net_pnl)}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 rounded-full bg-slate-800 text-xs text-muted-foreground">
                          {trade.strategy_tag || 'N/A'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}