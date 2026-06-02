"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const data = [
  { name: 'Mon', profit: 4000 },
  { name: 'Tue', profit: 3000 },
  { name: 'Wed', profit: 2000 },
  { name: 'Thu', profit: 2780 },
  { name: 'Fri', profit: 1890 },
  { name: 'Sat', profit: 2390 },
  { name: 'Sun', profit: 3490 },
];

const dayData = [
  { name: 'Mon', value: 4500 },
  { name: 'Tue', value: -1200 },
  { name: 'Wed', value: 3000 },
  { name: 'Thu', value: 8000 },
  { name: 'Fri', value: -500 },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
        <select className="bg-[#0c0c0e] border border-border/50 text-white text-sm rounded-md px-3 py-2">
          <option>This Month</option>
          <option>Last 30 Days</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Win Rate", value: "62.4%", color: "text-primary" },
          { label: "Avg Winner", value: "₹2,450", color: "text-green-500" },
          { label: "Avg Loser", value: "-₹1,200", color: "text-red-400" },
          { label: "Profit Factor", value: "2.04", color: "text-white" },
          { label: "Max Drawdown", value: "-₹8,500", color: "text-red-400" },
          { label: "Best Day", value: "₹12,400", color: "text-green-500" },
        ].map((stat, i) => (
          <Card key={i} className="bg-[#0c0c0e] border-border/50">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xs text-muted-foreground mb-1">{stat.label}</span>
              <span className={\`text-xl font-bold \${stat.color}\`}>{stat.value}</span>
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
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Day of week */}
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">P&L by Day of Week</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dayData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                <Bar dataKey="value" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Strategy Breakdown Placeholder */}
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Strategy Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'Breakout', pnl: '+₹15,000', winrate: '68%' },
                { name: 'Mean Reversion', pnl: '+₹8,200', winrate: '55%' },
                { name: 'Expiry Hero Zero', pnl: '-₹4,500', winrate: '12%' },
              ].map((strat, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border border-border/30">
                  <div className="font-medium text-white text-sm">{strat.name}</div>
                  <div className="text-right">
                    <div className={\`font-semibold text-sm \${strat.pnl.startsWith('-') ? 'text-red-400' : 'text-green-500'}\`}>{strat.pnl}</div>
                    <div className="text-xs text-muted-foreground">WR: {strat.winrate}</div>
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