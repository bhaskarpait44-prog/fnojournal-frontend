"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JournalPage() {
  return (
    <div className="space-y-6">
      <Card className="bg-[#0c0c0e] border-border/50">
        <CardHeader>
          <CardTitle className="text-lg text-white">Trading Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-8">
            <div className="grid grid-cols-7 gap-2 max-w-3xl w-full">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs text-muted-foreground mb-2">{day}</div>
              ))}
              
              {/* Padding for month start */}
              <div className="h-16 rounded-md"></div>
              <div className="h-16 rounded-md"></div>
              <div className="h-16 rounded-md"></div>
              
              {/* Days */}
              {Array.from({length: 31}).map((_, i) => {
                // Randomly assign green, red, or slate
                const isWeekend = (i + 3) % 7 === 0 || (i + 4) % 7 === 0;
                let bgClass = "bg-slate-800/50 border border-slate-700/50";
                
                if (!isWeekend) {
                  const rand = Math.random();
                  if (rand > 0.6) bgClass = "bg-green-500/20 border border-green-500/30 text-green-500";
                  else if (rand > 0.3) bgClass = "bg-red-500/20 border border-red-500/30 text-red-500";
                }

                return (
                  <div key={i} className={`h-16 rounded-md p-2 flex flex-col justify-between ${bgClass} hover:ring-2 ring-primary cursor-pointer transition-all`}>
                    <span className="text-xs font-medium">{i + 1}</span>
                    {!isWeekend && bgClass.includes('green') && <span className="text-[10px] font-bold">+₹{(Math.random() * 5000).toFixed(0)}</span>}
                    {!isWeekend && bgClass.includes('red') && <span className="text-[10px] font-bold">-₹{(Math.random() * 2000).toFixed(0)}</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-[#0c0c0e] border-border/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Selected Day: 15 Jul 2026</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
                <h3 className="font-semibold text-green-500 mb-2">Net P&L: +₹3,450.00</h3>
                <p className="text-sm text-slate-300 mb-4">"Followed my setup perfectly. Waited for the 15min candle to close above VWAP before entering the BANKNIFTY 45000 CE."</p>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-slate-800 text-xs text-muted-foreground">2 Trades</span>
                  <span className="px-2 py-1 rounded bg-slate-800 text-xs text-muted-foreground">100% Win Rate</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}