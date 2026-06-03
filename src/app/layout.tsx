import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/providers/query-provider';
import { SessionProvider } from '@/components/providers/session-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'TradeLog — F&O Trading Journal for Indian Traders',
    template: '%s | TradeLog'
  },
  description: 'Track every Nifty, BankNifty, and stock F&O trade. Understand your edge, stop repeating mistakes, and become a profitable trader with the most advanced journal for Indian markets.',
  keywords: ['F&O trading journal', 'options trading journal india', 'nifty trading log', 'banknifty journal', 'NSE trading journal', 'Zerodha tradebook import'],
  authors: [{ name: 'TradeLog Team' }],
  creator: 'TradeLog',
  publisher: 'TradeLog',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'TradeLog — F&O Trading Journal for Indian Traders',
    description: 'The premium trading journal built for serious F&O traders.',
    url: 'https://tradelog.in',
    siteName: 'TradeLog',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TradeLog — F&O Trading Journal',
    description: 'Track every Nifty, BankNifty, and stock F&O trade.',
    creator: '@tradelog',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", inter.variable)} style={{ colorScheme: 'dark' }}>
      <body className="antialiased bg-background text-foreground">
        <Providers>
          <SessionProvider>
            {children}
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}
