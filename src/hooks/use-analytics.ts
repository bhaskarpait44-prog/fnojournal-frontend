"use client";

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export function useAnalyticsSummary(dateRange: string) {
  return useQuery({
    queryKey: ['analytics', 'summary', dateRange],
    queryFn: async () => {
      const res = await apiClient(`/analytics/summary?range=${dateRange}`);
      if (!res.ok) throw new Error('Failed to fetch analytics summary');
      const json = await res.json();
      return json.data;
    },
  });
}

export function usePnlHistory(dateRange: string) {
  return useQuery({
    queryKey: ['analytics', 'pnl-history', dateRange],
    queryFn: async () => {
      const res = await apiClient(`/analytics/pnl-history?range=${dateRange}`);
      if (!res.ok) throw new Error('Failed to fetch pnl history');
      const json = await res.json();
      return json.data;
    },
  });
}

export function useStrategyPerformance() {
  return useQuery({
    queryKey: ['analytics', 'strategy-performance'],
    queryFn: async () => {
      const res = await apiClient('/analytics/strategy-performance');
      if (!res.ok) throw new Error('Failed to fetch strategy performance');
      const json = await res.json();
      return json.data;
    },
  });
}

export function useDailyPnl() {
  return useQuery({
    queryKey: ['analytics', 'daily-pnl'],
    queryFn: async () => {
      const res = await apiClient('/analytics/daily-pnl');
      if (!res.ok) throw new Error('Failed to fetch daily pnl');
      const json = await res.json();
      return json.data;
    },
  });
}
