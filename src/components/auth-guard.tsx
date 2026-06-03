"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/stores/user-store";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { profile } = useUserStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !profile) {
      router.push("/login");
    }
  }, [mounted, profile, router]);

  if (!mounted || !profile) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
}
