import type { Metadata } from "next";
import AboutHero from "./Abouthero";
import AboutCTASection from "./Aboutctasection";
import MissionValuesSection from "./Missionvaluessection";
import HowItWorksSection from "./Howitworkssection";
import TrustNetworkSection from "./Trustnetworksection";
import AboutSection from "@/components/layout/AboutSection.tsx";


export const metadata: Metadata = {
  title: "About us | RehabConnect",
  description:
    "RehabConnect matches people seeking rehabilitation services with verified, trustworthy centres — confidentially and without pressure.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full theme-bg">
      <AboutHero />
      <AboutSection />
      {/* <AboutCTASection /> */}
      <MissionValuesSection />
      <HowItWorksSection />
      <TrustNetworkSection />
      <AboutCTASection />
    </main>
  );
}