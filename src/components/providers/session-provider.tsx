"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/stores/user-store";
import { apiClient } from "@/lib/api-client";

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const { profile, setProfile, logout } = useUserStore();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      // If we don't have a profile, try to fetch it from the backend
      // This handles cases where localStorage is cleared but the auth cookie is still present
      if (!profile) {
        try {
          const res = await apiClient('/user/profile');
          if (res.ok) {
            const data = await res.json();
            setProfile(data.user);
          } else {
            // If the profile fetch fails (e.g., 401), ensure the store is cleared
            logout();
          }
        } catch (error) {
          console.error("Failed to fetch profile:", error);
        }
      }
      setIsInitializing(false);
    };

    initSession();
  }, [profile, setProfile, logout]);

  // Optionally show a global loader during the very first initialization
  // if you want to avoid any flicker
  // if (isInitializing) return <div className="h-screen w-screen bg-background" />;

  return <>{children}</>;
}
