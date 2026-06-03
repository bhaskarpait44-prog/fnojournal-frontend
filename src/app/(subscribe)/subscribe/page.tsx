"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

// Placeholder for Razorpay window type
declare global {
  interface Window {
    Razorpay: any;
  }
}

import { useUserStore } from "@/lib/stores/user-store";
import { apiClient } from "@/lib/api-client";

export default function SubscribePage() {
  const router = useRouter();
  const { profile } = useUserStore();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [polling, setPolling] = useState(false);

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleSubscribe = async (planId: string) => {
    setIsLoading(planId);
    setError(null);
    
    try {
      // 1. Create subscription via API
      const res = await apiClient('/subscriptions/create', { 
        method: 'POST', 
        body: JSON.stringify({ plan_id: planId }) 
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initiate subscription');
      
      // In a real Razorpay flow, data would have a razorpay_subscription_id
      const subscriptionId = data.subscription?.razorpay_subscription_id || data.subscription?.id;

      // 2. Open Razorpay (Using mock key as example, should be env var)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        subscription_id: subscriptionId,
        name: "TradeLog",
        description: `${planId.charAt(0).toUpperCase() + planId.slice(1)} Subscription`,
        prefill: {
          name: profile?.name || "",
          email: profile?.email || "",
        },
        theme: {
          color: "#3b82f6"
        },
        handler: function (response: any) {
          handlePaymentSuccess(response.razorpay_payment_id, subscriptionId);
        }
      };
      
      if (!window.Razorpay) {
        throw new Error("Payment gateway failed to load. Please refresh and try again.");
      }
      
      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        setError(response.error.description || "Payment failed. Please try again.");
        setIsLoading(null);
      });
      
      rzp.open();
      
    } catch (err: any) {
      setError(err.message || "Failed to initiate subscription");
      setIsLoading(null);
    }
  };

  const handlePaymentSuccess = async (paymentId: string, subscriptionId: string) => {
    setPolling(true);
    let attempts = 0;
    const maxAttempts = 10;
    
    const poll = setInterval(async () => {
      attempts++;
      try {
        const res = await apiClient('/subscriptions/status');
        const data = await res.json();
        
        if (data.subscription?.status === 'active') {
          clearInterval(poll);
          setPolling(false);
          router.push("/app/dashboard");
        } else if (attempts >= maxAttempts) {
          clearInterval(poll);
          setPolling(false);
          setError("Payment successful, but activation is taking longer than expected. Please check your dashboard in a few minutes.");
        }
      } catch (err) {
        console.error("Polling error", err);
      }
    }, 2000);
  };

  if (polling) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <Loader2 className="h-16 w-16 text-primary animate-spin mx-auto" />
          <h2 className="text-2xl font-bold text-white">Activating your subscription...</h2>
          <p className="text-muted-foreground">Please don't close this window. We are verifying your payment with Razorpay.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="w-full max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold text-white mb-4">Complete your subscription</h1>
        <p className="text-muted-foreground">Logged in as <span className="font-semibold text-white">{profile?.email}</span></p>
      </div>

      {error && (
        <div className="w-full max-w-2xl mb-8 p-4 rounded-md bg-red-500/10 border border-red-500/50 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-red-500">Payment Issue</h3>
            <p className="text-sm text-red-500/80 mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8 w-full max-w-5xl">
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
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => handleSubscribe('monthly')}
              disabled={isLoading !== null}
            >
              {isLoading === 'monthly' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Subscribe Monthly"}
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
              <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> Unlimited trades</li>
              <li className="flex items-center"><CheckCircle2 className="h-4 w-4 text-primary mr-2" /> F&O specific analytics</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={() => handleSubscribe('annual')}
              disabled={isLoading !== null}
            >
              {isLoading === 'annual' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Subscribe Annually"}
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
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => handleSubscribe('quarterly')}
              disabled={isLoading !== null}
            >
              {isLoading === 'quarterly' ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Subscribe Quarterly"}
            </Button>
          </CardFooter>
        </Card>
      </div>
      <p className="text-center text-sm text-muted-foreground mt-8">Prices exclusive of 18% GST. You can cancel anytime.</p>
    </div>
  );
}