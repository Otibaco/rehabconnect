import type { Metadata } from "next";
import "./globals.css";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { AppChrome } from "@/components/layout/AppChrome";
import { AuthProvider } from "@/context/AuthContext";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body cz-shortcut-listen="true">
        <AuthProvider>
          <main>{children}</main>
          <FloatingContact />
          <CookieConsent />
        </AuthProvider>
      </body>
    </html>
  );
}
