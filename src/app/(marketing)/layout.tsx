import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl tracking-tight text-white">
              TradeLog
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors hidden md:block">
              Login
            </Link>
            <Button render={<Link href="/signup" />} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-6">
              Start Free Trial
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border/40 py-12 bg-background">
        <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="font-bold text-xl tracking-tight text-white mb-4 block">
              TradeLog
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              The premium trading journal for serious F&O traders.
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Made for Indian traders 🇮🇳
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/features" className="hover:text-white">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
              <li><Link href="/changelog" className="hover:text-white">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              <li><Link href="/about" className="hover:text-white">About</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border/40 text-sm text-muted-foreground flex justify-between items-center">
          <p>© {new Date().getFullYear()} TradeLog. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}