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
  profile: UserProfile | null;
  subscription: SubscriptionStatus | null;
  setProfile: (profile: UserProfile | null) => void;
  setSubscription: (sub: SubscriptionStatus | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      profile: null,
      subscription: null,
      setProfile: (profile) => set({ profile }),
      setSubscription: (sub) => set({ subscription: sub }),
      logout: () => set({ profile: null, subscription: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
