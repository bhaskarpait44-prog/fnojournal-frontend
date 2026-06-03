"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useAnalyticsSummary, usePnlHistory, useStrategyPerformance } from "@/hooks/use-analytics";
import { formatCurrency } from "@/lib/format";

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('month');
  const { data: summary, isLoading: isSummaryLoading } = useAnalyticsSummary(dateRange);
  const { data: pnlHistory, isLoading: isHistoryLoading } = usePnlHistory(dateRange);
  const { data: strategyData, isLoading: isStrategyLoading } = useStrategyPerformance();

  const metrics = [
    { label: "Win Rate", value: summary?.winRate || "0%", color: "text-primary" },
    { label: "Avg Winner", value: formatCurrency(summary?.avgWinner || 0), color: "text-green-500" },
    { label: "Avg Loser", value: formatCurrency(summary?.avgLoser || 0), color: "text-red-400" },
    { label: "Profit Factor", value: summary?.profitFactor || "0.00", color: "text-white" },
    { label: "Max Drawdown", value: formatCurrency(summary?.maxDrawdown || 0), color: "text-red-400" },
    { label: "Best Day", value: formatCurrency(summary?.bestDay || 0), color: "text-green-500" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="bg-[#0c0c0e] border border-border/50 text-white text-sm rounded-md px-3 py-2"
        >
          <option value="month">This Month</option>
          <option value="30d">Last 30 Days</option>
          <option value="3m">Last 3 Months</option>
          <option value="year">This Year</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {metrics.map((stat, i) => (
          <Card key={i} className="bg-[#0c0c0e] border-border/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-muted-foreground mb-1">{stat.label}</span>
              <span className={`text-xl font-bold ${stat.color}`}>{stat.value}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Equity Curve */}
        <Card className="bg-[#0c0c0e] border-border/50 col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-white">P&L Equity Curve</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {isHistoryLoading ? (
              <div className="h-full w-full flex items-center justify-center text-muted-foreground">Loading chart...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={pnlHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="date" stroke="#888" fontSize={12} tickFormatter={(str) => str.split('-').slice(1).join('/')} />
                  <YAxis stroke="#888" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', color: '#fff' }}
                    itemStyle={{ color: '#3b82f6' }}
                  />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} dot={{ r: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        {/* Strategy Breakdown */}
        <Card className="bg-[#0c0c0e] border-border/50 md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg text-white">Strategy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {isStrategyLoading ? (
              <div className="text-muted-foreground">Loading performance...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {strategyData?.map((strat: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/30">
                    <div className="font-medium text-white text-sm">{strat.strategy}</div>
                    <div className="text-right">
                      <div className={`font-semibold text-sm ${strat.pnl < 0 ? 'text-red-400' : 'text-green-500'}`}>
                        {formatCurrency(strat.pnl)}
                      </div>
                      <div className="text-xs text-muted-foreground">WR: {strat.winRate}%</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
