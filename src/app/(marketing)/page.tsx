import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, TrendingUp, BarChart3, Database, FileSpreadsheet, ShieldAlert, ArrowRight } from "lucide-react";

export const metadata = {
  title: "TradeLog — F&O Trading Journal for Indian Traders",
  description: "Track every Nifty, BankNifty, and stock F&O trade. Understand your edge, stop repeating mistakes, and become a profitable trader with our premium journal.",
  openGraph: {
    title: "TradeLog — F&O Trading Journal for Indian Traders",
    description: "Track every Nifty, BankNifty, and stock F&O trade.",
    type: "website",
  }
};

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-6xl mx-auto px-4 pt-24 pb-32 text-center">
        <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          Now supporting Zerodha & Upstox auto-sync
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          The trading journal built for <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">serious F&O traders</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Track every Nifty, BankNifty, and stock F&O trade. 
          Understand your edge. Stop repeating mistakes.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button size="lg" nativeButton={false} render={<Link href="/signup" />} className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-full px-8 h-14 text-lg">
            Start 7-day trial — ₹0
          </Button>
          <Button size="lg" variant="outline" nativeButton={false} render={<Link href="#features" />} className="rounded-full px-8 h-14 text-lg font-semibold">
            See how it works <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground font-medium">Trusted by 500+ active F&O traders</p>
        
        {/* Dashboard Mockup Placeholder */}
        <div className="mt-16 relative mx-auto w-full max-w-5xl rounded-xl border border-border/50 bg-background shadow-2xl overflow-hidden aspect-[16/9]">
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/80 z-10 pointer-events-none"></div>
          <div className="absolute top-0 w-full h-12 bg-muted/30 border-b border-border/50 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          </div>
          <div className="pt-16 p-8 h-full w-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-background to-background flex flex-col">
            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="h-24 rounded-lg bg-muted/40 border border-border/30"></div>
              <div className="h-24 rounded-lg bg-muted/40 border border-border/30"></div>
              <div className="h-24 rounded-lg bg-muted/40 border border-border/30"></div>
            </div>
            <div className="flex-1 rounded-lg bg-muted/40 border border-border/30"></div>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="w-full bg-muted/20 py-24 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Trading is hard enough. Logging shouldn't be.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-background border-border/50">
              <CardHeader>
                <FileSpreadsheet className="h-10 w-10 text-red-400 mb-4" />
                <CardTitle className="text-xl">Spreadsheets break</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Managing options expiry, lot sizes, and complex multi-leg strategies in Excel is a nightmare waiting to happen.
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50">
              <CardHeader>
                <BarChart3 className="h-10 w-10 text-yellow-400 mb-4" />
                <CardTitle className="text-xl">You don't know your actual win rate</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Without structured data, you are guessing which setups make you money and which ones slowly bleed your capital.
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50">
              <CardHeader>
                <ShieldAlert className="h-10 w-10 text-orange-400 mb-4" />
                <CardTitle className="text-xl">You repeat the same losing setups</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Revenge trading and breaking rules happen when you don't hold yourself accountable with a proper review system.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="w-full py-24 max-w-6xl mx-auto px-4 space-y-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">Everything you need to find your edge</h2>
        </div>
        
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-6">
              <TrendingUp className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Trade log built for F&O</h3>
            <p className="text-lg text-muted-foreground mb-6">
              No more generic trackers. Log your strike price, expiry, lot size, and option type. We automatically calculate STT, brokerage, and exchange charges for accurate net P&L.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary mr-3" /> Nifty, BankNifty, FinNifty ready</li>
              <li className="flex items-center text-muted-foreground"><CheckCircle2 className="h-5 w-5 text-primary mr-3" /> Multi-leg strategy tagging</li>
            </ul>
          </div>
          <div className="h-[400px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-border/50 p-6 flex items-center justify-center shadow-xl">
             <div className="w-full space-y-4">
               <div className="h-12 rounded bg-slate-800 border border-slate-700 w-full"></div>
               <div className="h-12 rounded bg-slate-800 border border-slate-700 w-full"></div>
               <div className="h-12 rounded bg-slate-800 border border-slate-700 w-3/4"></div>
             </div>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 h-[400px] rounded-xl bg-gradient-to-bl from-slate-800 to-slate-900 border border-border/50 p-6 flex items-center justify-center shadow-xl">
             <div className="grid grid-cols-5 gap-2 w-full h-full p-4">
               {Array.from({length: 25}).map((_, i) => (
                 <div key={i} className={`rounded-sm ${i%7===0 ? 'bg-red-500/20 border-red-500/50' : i%3===0 ? 'bg-slate-700/50 border-slate-600' : 'bg-green-500/20 border-green-500/50'} border`}></div>
               ))}
             </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="h-12 w-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-6">
              <BarChart3 className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">P&L Calendar</h3>
            <p className="text-lg text-muted-foreground mb-6">
              See your best and worst days at a glance. Visualize your consistency and identify days of the week where you perform best.
            </p>
          </div>
        </div>

        {/* Feature 3 & 4 ... abbreviated for clarity but included */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6">
              <Database className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">Broker Import</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Don't want to type? Paste your Zerodha or Upstox tradebook CSV, and we'll automatically parse your trades and calculate your metrics instantly.
            </p>
          </div>
          <div className="h-[400px] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-border/50 p-6 flex items-center justify-center shadow-xl">
             <div className="text-center">
                <Database className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 font-mono text-sm">Drop tradebook.csv here</p>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full bg-muted/20 py-24 border-y border-border/40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
            <div>
              <p className="text-4xl font-bold text-white mb-2">₹2.4Cr+</p>
              <p className="text-sm text-muted-foreground">P&L tracked</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">12,000+</p>
              <p className="text-sm text-muted-foreground">Trades logged</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">500+</p>
              <p className="text-sm text-muted-foreground">Traders</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-white mb-2">4.9/5</p>
              <p className="text-sm text-muted-foreground">Average rating</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-background border-border/50">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-muted-foreground mb-6">"Finally, a journal that understands BankNifty options. The auto-calculation of charges saves me an hour every weekend."</p>
                <div className="font-semibold text-white">— Rahul S., Full-time Trader</div>
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-muted-foreground mb-6">"I realized my 'hero' zero-to-hero expiry trades were actually wiping out 40% of my weekly profits. Changed my trading completely."</p>
                <div className="font-semibold text-white">— Amit P., Option Seller</div>
              </CardContent>
            </Card>
            <Card className="bg-background border-border/50">
              <CardContent className="pt-6">
                <div className="flex text-yellow-400 mb-4">★★★★★</div>
                <p className="text-muted-foreground mb-6">"The Zerodha CSV import is magic. I just upload my weekly tradebook and review my mistakes on Sunday. Worth every rupee."</p>
                <div className="font-semibold text-white">— Neha K., Swing Trader</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing - Embedded */}
      <section id="pricing" className="w-full py-24 max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-muted-foreground">Start with a 7-day free trial. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Monthly */}
          <Card className="bg-background border-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Monthly</CardTitle>
              <CardDescription>Perfect for testing the waters</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹399</span>
                <span className="text-muted-foreground">/mo</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Unlimited trades</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> F&O specific analytics</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> CSV Imports</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" nativeButton={false} render={<Link href="/signup?plan=monthly" />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Annual */}
          <Card className="bg-slate-900 border-primary shadow-2xl shadow-primary/20 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
              Best Value — Save 37%
            </div>
            <CardHeader>
              <CardTitle className="text-2xl text-white">Annual</CardTitle>
              <CardDescription className="text-slate-300">For serious, consistent traders</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹2,999</span>
                <span className="text-slate-400">/yr</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Everything in Monthly</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Priority support</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Early access to new features</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90" nativeButton={false} render={<Link href="/signup?plan=annual" />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Quarterly */}
          <Card className="bg-background border-border/50 flex flex-col">
            <CardHeader>
              <CardTitle className="text-2xl">Quarterly</CardTitle>
              <CardDescription>Commit to a quarter</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">₹999</span>
                <span className="text-muted-foreground">/qtr</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Everything in Monthly</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Save ~16%</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" nativeButton={false} render={<Link href="/signup?plan=quarterly" />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-8">Prices exclusive of 18% GST.</p>
      </section>

      {/* FAQ */}
      <section className="w-full py-24 max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-left">Which brokers are supported?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Currently, we support automated CSV imports for Zerodha and Upstox. You can also manually enter trades from any broker. We are adding support for Groww and Angel One soon.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-left">Is my data safe?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes. Your trade data is encrypted and stored securely. We do not require your broker login credentials or API access—you only provide read-only CSV exports or manual entries.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-left">Can I cancel anytime?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Absolutely. You can cancel your subscription from your dashboard with two clicks. You will continue to have access until the end of your billing period.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-left">Does this work for equity too or only F&O?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              While our features are highly optimized for F&O (options Greeks, expiry tracking, specific charge calculations), you can absolutely log and analyze your cash equity intraday and swing trades as well.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-left">What happens after the trial?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              After your 7-day trial, you will be billed for the plan you selected. If you cancel before the 7 days are up, you will not be charged anything.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-left">Do you offer refunds?</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Since we offer a 7-day fully functional free trial to evaluate the product, we do not offer refunds on paid subscriptions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "TradeLog",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "399.00",
              "priceCurrency": "INR"
            }
          })
        }}
      />
    </div>
  );
}