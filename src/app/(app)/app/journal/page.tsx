"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDailyPnl } from "@/hooks/use-analytics";
import { formatCurrency } from "@/lib/format";
import { Loader2 } from "lucide-react";

export default function JournalPage() {
  const { data: dailyPnL, isLoading } = useDailyPnl();
  const [currentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-[#0c0c0e] border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg text-white">{monthName} {year}</CardTitle>
          <div className="flex gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500/20 border border-green-500/30 rounded" />
              <span className="text-[10px] text-muted-foreground">Profit</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500/20 border border-red-500/30 rounded" />
              <span className="text-[10px] text-muted-foreground">Loss</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center py-4">
            <div className="grid grid-cols-7 gap-2 max-w-3xl w-full">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-xs text-muted-foreground mb-2">{day}</div>
              ))}
              
              {/* Padding for month start */}
              {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                <div key={`pad-${i}`} className="h-16 md:h-20 rounded-md bg-transparent"></div>
              ))}
              
              {/* Days */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${year}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const pnl = dailyPnL?.[dateStr];
                
                let bgClass = "bg-muted/10 border border-border/20 text-muted-foreground";
                if (pnl > 0) bgClass = "bg-green-500/10 border border-green-500/30 text-green-500";
                else if (pnl < 0) bgClass = "bg-red-500/10 border border-red-500/30 text-red-500";

                return (
                  <div key={day} className={`h-16 md:h-20 rounded-md p-1.5 md:p-2 flex flex-col justify-between ${bgClass} hover:ring-1 ring-primary cursor-pointer transition-all`}>
                    <span className="text-[10px] md:text-xs font-medium">{day}</span>
                    {pnl !== undefined && (
                      <span className="text-[9px] md:text-[10px] font-bold truncate">
                        {pnl > 0 ? '+' : ''}{formatCurrency(pnl)}
                      </span>
                    )}
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
            <CardTitle className="text-lg text-white">Daily Insight</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground italic">Click on a day to see detailed trade notes and screenshots.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
