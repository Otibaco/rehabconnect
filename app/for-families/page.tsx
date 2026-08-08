import type { Metadata } from "next";
import ForFamilyHero from "./Forfamilyhero";
import SignsToWatchSection from "./Signstowatchsection";
import FamilyResourcesSection from "./Familyresourcessection";
import FamilyStoryVideoSection from "./Familystoryvideosection";
import FamilyTestimonialSection from "./Familytestimonialsection";
import FamilySupportFAQSection from "./Familysupportfaqsection";
import FamilyCTASection from "./Familyctasection";
import HowToHelpSection from "./Howtohelpsection";


export const metadata: Metadata = {
  title: "For Families | RehabConnect",
  description:
    "Confidential guidance for family members supporting a loved one — from recognizing the signs to staying involved through treatment.",
};

export default function ForFamilyPage() {
  return (
    <main className="relative w-full theme-bg">
      <ForFamilyHero />
      {/* <HowToHelpSection /> */}
      <SignsToWatchSection />
      <FamilyResourcesSection />
      <FamilyStoryVideoSection />
      <FamilyTestimonialSection />
      <FamilySupportFAQSection />
      <FamilyCTASection />
    </main>
  );
}