"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, X } from "lucide-react";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="flex flex-col items-center py-24">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-6">Simple, transparent pricing</h1>
          <p className="text-xl text-muted-foreground">Start with a 7-day free trial. Cancel anytime.</p>
        </div>

        {/* Toggle */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-muted-foreground'}`}>Monthly</span>
          <button 
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-16 h-8 rounded-full bg-slate-800 border border-slate-700 relative flex items-center px-1 transition-colors focus:outline-none"
          >
            <div className={`w-6 h-6 rounded-full bg-primary transform transition-transform ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
          </button>
          <span className={`text-sm font-medium ${isAnnual ? 'text-white' : 'text-muted-foreground'}`}>
            Annual <span className="text-green-400 text-xs ml-1">(Save 37%)</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
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
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Unlimited trades</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> F&O specific analytics</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> CSV Imports (Zerodha/Upstox)</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> P&L Calendar</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Strategy Tagging</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Standard Support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" nativeButton={false} render={<Link href="/signup?plan=quarterly" />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

          {/* Monthly or Annual based on toggle (Middle highlighted) */}
          <Card className="bg-slate-900 border-primary shadow-2xl shadow-primary/20 flex flex-col relative transform md:-translate-y-4">
            {isAnnual && (
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                Best Value
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-2xl text-white">{isAnnual ? 'Annual' : 'Monthly'}</CardTitle>
              <CardDescription className="text-slate-300">
                {isAnnual ? 'For serious, consistent traders' : 'Perfect for testing the waters'}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{isAnnual ? '₹2,999' : '₹399'}</span>
                <span className="text-slate-400">{isAnnual ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Unlimited trades</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> F&O specific analytics</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> CSV Imports (Zerodha/Upstox)</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> P&L Calendar</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Strategy Tagging</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> {isAnnual ? 'Priority Support' : 'Standard Support'}</li>
                {isAnnual && <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Early access to beta features</li>}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary hover:bg-primary/90" nativeButton={false} render={<Link href={`/signup?plan=${isAnnual ? 'annual' : 'monthly'}`} />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>

           {/* Lifetime / Other ? We have Monthly, Qtr, Annual. Let's make the 3rd card Monthly if annual is middle, else Annual if Monthly is middle. */}
          <Card className="bg-background border-border/50 flex flex-col">
            <CardHeader>
               <CardTitle className="text-2xl">{!isAnnual ? 'Annual' : 'Monthly'}</CardTitle>
               <CardDescription>
                 {!isAnnual ? 'For serious, consistent traders' : 'Perfect for testing the waters'}
               </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">{!isAnnual ? '₹2,999' : '₹399'}</span>
                <span className="text-muted-foreground">{!isAnnual ? '/yr' : '/mo'}</span>
              </div>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Unlimited trades</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> F&O specific analytics</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> CSV Imports (Zerodha/Upstox)</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> P&L Calendar</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Strategy Tagging</li>
                <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> {!isAnnual ? 'Priority Support' : 'Standard Support'}</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline" nativeButton={false} render={<Link href={`/signup?plan=${!isAnnual ? 'annual' : 'monthly'}`} />}>
                Start Free Trial
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Compare Plans</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="py-4 px-6 text-white font-semibold w-1/3">Features</th>
                  <th className="py-4 px-6 text-white font-semibold text-center w-1/5">Monthly</th>
                  <th className="py-4 px-6 text-white font-semibold text-center w-1/5">Quarterly</th>
                  <th className="py-4 px-6 text-primary font-bold text-center w-1/5">Annual</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/30">
                  <td className="py-4 px-6">Unlimited Trades</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/30 bg-muted/10">
                  <td className="py-4 px-6">F&O specific analytics</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-4 px-6">Broker CSV Imports</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/30 bg-muted/10">
                  <td className="py-4 px-6">Custom Tags & Strategies</td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/30">
                  <td className="py-4 px-6">Priority Support</td>
                  <td className="py-4 px-6 text-center"><X className="h-5 w-5 text-slate-600 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><X className="h-5 w-5 text-slate-600 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
                <tr className="border-b border-border/30 bg-muted/10">
                  <td className="py-4 px-6">Early Access to Beta</td>
                  <td className="py-4 px-6 text-center"><X className="h-5 w-5 text-slate-600 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><X className="h-5 w-5 text-slate-600 mx-auto" /></td>
                  <td className="py-4 px-6 text-center"><CheckCircle2 className="h-5 w-5 text-primary mx-auto" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <Accordion className="w-full">
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
              <AccordionTrigger className="text-left">What happens after the trial?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                After your 7-day trial, you will be billed for the plan you selected. If you cancel before the 7 days are up, you will not be charged anything.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

      </div>
    </div>
  );
}