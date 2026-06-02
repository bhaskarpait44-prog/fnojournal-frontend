"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppStore } from "@/lib/stores/app-store";
import { useUserStore } from "@/lib/stores/user-store";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  ArrowLeftRight,
  PlusCircle,
  BarChart2,
  BookOpen,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  Menu,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function SPAShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  const { isSidebarOpen, setSidebarOpen, pageTitle, setPageTitle } = useAppStore();
  const { profile, subscription } = useUserStore();

  // Set title based on pathname
  useEffect(() => {
    if (pathname.includes("dashboard")) setPageTitle("Dashboard");
    else if (pathname.includes("trades/add")) setPageTitle("Add Trade");
    else if (pathname.includes("trades")) setPageTitle("Trades");
    else if (pathname.includes("analytics")) setPageTitle("Analytics");
    else if (pathname.includes("journal")) setPageTitle("Journal");
    else if (pathname.includes("billing")) setPageTitle("Billing");
    else if (pathname.includes("settings")) setPageTitle("Settings");
  }, [pathname, setPageTitle]);

  const navItems = [
    { name: "Dashboard", href: "/app/dashboard", icon: LayoutDashboard },
    { name: "Trades", href: "/app/trades", icon: ArrowLeftRight },
    { name: "Add Trade", href: "/app/trades/add", icon: PlusCircle, highlight: true },
    { name: "Analytics", href: "/app/analytics", icon: BarChart2 },
    { name: "Journal", href: "/app/journal", icon: BookOpen },
    { name: "Settings", href: "/app/settings", icon: Settings },
    { name: "Billing", href: "/app/billing", icon: CreditCard },
  ];

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-[#09090b] text-white overflow-hidden">
      {/* SIDEBAR (Desktop) */}
      <aside
        className={`hidden md:flex flex-col border-r border-border/50 bg-[#0c0c0e] transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border/50">
          {isSidebarOpen && (
            <Link href="/app/dashboard" className="font-bold text-xl tracking-tight text-white">
              TradeLog
            </Link>
          )}
          {!isSidebarOpen && (
            <Link href="/app/dashboard" className="font-bold text-xl tracking-tight text-white mx-auto">
              TL
            </Link>
          )}
          <button onClick={toggleSidebar} className="text-muted-foreground hover:text-white">
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} className="mx-auto" />}
          </button>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? item.highlight
                      ? "bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/20"
                      : "bg-muted/50 text-white font-medium"
                    : item.highlight
                    ? "text-primary hover:bg-primary/10"
                    : "text-muted-foreground hover:text-white hover:bg-muted/30"
                }`}
              >
                <item.icon size={20} className={`shrink-0 ${isSidebarOpen ? "mr-3" : "mx-auto"}`} />
                {isSidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Subscription Badge */}
        <div className="p-4 border-t border-border/50">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-background/50">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="text-sm">
                <p className="font-medium text-white capitalize">{subscription?.plan || 'Pro'} Plan</p>
                {subscription?.daysRemaining && (
                  <p className="text-xs text-muted-foreground">{subscription.daysRemaining} days left</p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* TOP NAV */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border/50 bg-[#0c0c0e]">
          <div className="flex items-center">
            <button className="md:hidden mr-4 text-muted-foreground hover:text-white">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-white">{pageTitle}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="text-muted-foreground hover:text-white">
              <Search size={20} />
            </button>
            <button className="text-muted-foreground hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 border border-[#0c0c0e]"></span>
            </button>
            
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-medium cursor-pointer border border-border/50">
              {profile?.name ? profile.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* MOBILE BOTTOM NAV */}
        <nav className="md:hidden h-16 border-t border-border/50 bg-[#0c0c0e] flex items-center justify-around px-2 pb-safe">
          {[
            navItems[0], // Dashboard
            navItems[1], // Trades
            navItems[2], // Add Trade
            navItems[3], // Analytics
            navItems[4], // Journal
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon size={20} className={item.highlight ? "text-primary" : ""} />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}