import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | TradeLog",
  description: "Simple, transparent pricing for the best F&O trading journal. Start your 7-day free trial today.",
  openGraph: {
    title: "Pricing | TradeLog",
    description: "Start your 7-day free trial of TradeLog, the premium trading journal for Indian traders.",
  }
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
