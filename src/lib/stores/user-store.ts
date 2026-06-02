import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url?: string;
}

export interface SubscriptionStatus {
  isActive: boolean;
  plan: 'monthly' | 'quarterly' | 'annual' | null;
  status: string | null;
  currentPeriodEnd: Date | null;
  trialEndsAt: Date | null;
  daysRemaining: number | null;
}

interface UserStore {
  token: string | null;
  profile: UserProfile | null;
  subscription: SubscriptionStatus | null;
  setToken: (token: string | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  setSubscription: (sub: SubscriptionStatus | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      token: null,
      profile: null,
      subscription: null,
      setToken: (token) => set({ token }),
      setProfile: (profile) => set({ profile }),
      setSubscription: (sub) => set({ subscription: sub }),
      logout: () => set({ token: null, profile: null, subscription: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
