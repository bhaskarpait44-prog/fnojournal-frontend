import { SPAShell } from '@/components/spa/spa-shell';
import { AuthGuard } from '@/components/auth-guard';

export const metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <SPAShell>
        {children}
      </SPAShell>
    </AuthGuard>
  );
}
