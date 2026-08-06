import type { Metadata } from "next";
import ContactHero from "./ContactHero";
import ContactOptions from "./ContactOptions";
import ContactFormSection from "./ContactFormSection";
import OfficeSupportSection from "./OfficeSupportSection";
import WhyContactSection from "./WhyContactSection";


export const metadata: Metadata = {
  title: "Contact us | Rehabpath",
  description:
    "Speak with a care coordinator, ask questions in confidence, and get matched with a verified rehabilitation centre.",
};

export default function ContactPage() {
  return (
    <main className="relative w-full theme-bg">
      <ContactHero />
      <ContactOptions />
      <ContactFormSection />
      <OfficeSupportSection />
      <WhyContactSection />

    </main>
  );
}