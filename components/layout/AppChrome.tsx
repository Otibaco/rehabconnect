'use client';

import { usePathname } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { SiteHeader } from '@/components/layout/SiteHeader';

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPatientPortalRoute = pathname === '/patient' || pathname.startsWith('/patient/');

  if (isPatientPortalRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
}
