import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import TopBar from "@/components/layout/TopBar";

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
      <body className="antialiased theme-bg theme-text" cz-shortcut-listen="true">
        <AuthProvider>
          <TopBar />

          <div className="sticky top-0 z-[80]">
            <Navbar />
          </div>

          <main>{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
