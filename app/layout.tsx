import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata: Metadata = {
  metadataBase: new URL("https://rehabconnect-three.vercel.app/"),

  title: {
    default: "RehabConnect | Professional Rehabilitation Support",
    template: "%s | RehabConnect",
  },

  description:
    "RehabConnect helps individuals and families connect with professional rehabilitation support, care coordination, and trusted consultation services.",

  keywords: [
    "RehabConnect",
    "rehabilitation",
    "rehabilitation support",
    "rehab consultation",
    "care coordination",
    "recovery support",
    "addiction recovery",
    "mental health rehabilitation",
  ],

  authors: [
    {
      name: "RehabConnect",
    },
  ],

  creator: "RehabConnect",

  openGraph: {
    title: "RehabConnect | Professional Rehabilitation Support",
    description:
      "Connect with professional Care Coordinators and get personalized rehabilitation support through RehabConnect.",
    siteName: "RehabConnect",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "RehabConnect | Professional Rehabilitation Support",
    description:
      "Connect with professional Care Coordinators and get personalized rehabilitation support through RehabConnect.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  cz-shortcut-listen="true">
        <SiteHeader />

        <main>{children}</main>

        <Footer />
        
        <FloatingContact />

        <CookieConsent />
      </body>
    </html>
  );
}
