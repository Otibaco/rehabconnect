import type { Metadata } from "next";
import ForPatientHero from "./Forpatienthero";
import WhatToExpectSection from "./Whattoexpectsection";
import ProgramsSection from "./Programssection";
import PatientStoryVideoSection from "./Patientstoryvideosection";
import TestimonialSection from "./Testimonialsection";
import PatientCTASection from "./Patientctasection";
import { forPatientsFAQ } from "@/lib/data/page-content";
import FAQSection from "@/components/layout/FAQSection";

export const metadata: Metadata = {
  title: "For Patients | RehabConnect",
  description:
    "Confidential support to help you find the right rehabilitation program — from your first call to your first day and beyond.",
};

export default function ForPatientPage() {
  return (
    <main className="relative w-full theme-bg">
      <ForPatientHero />
      <WhatToExpectSection />
      <ProgramsSection />
      <PatientStoryVideoSection />
      <TestimonialSection />
      <FAQSection
        title={forPatientsFAQ.title}
        subtitle={forPatientsFAQ.subtitle}
        faqs={forPatientsFAQ.faqs}
      />
      <PatientCTASection />
    </main>
  );
}
