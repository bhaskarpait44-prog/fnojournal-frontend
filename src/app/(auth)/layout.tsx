import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background">
      <header className="absolute top-0 w-full p-6">
        <Link href="/" className="font-bold text-xl tracking-tight text-white">
          TradeLog
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>
    </div>
  );
}