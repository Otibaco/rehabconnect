"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AboutSection from "@/components/layout/AboutSection.tsx";
import WhyChooseSection, {
  WhyChooseCarousel,
} from "@/components/layout/WhyChooseCarousel";
import OurServicesCarousel from "@/components/layout/OurServicesCarousel";
import PartnersWithBanner from "@/components/layout/PartnersWithBanner";
import Hero from "@/components/layout/Hero";
import PathwaySection from "@/components/layout/PathwaySection";
import TestimonialSection from "@/components/layout/TestimonialSection";
import CTA from "@/components/layout/Cta";
import FAQSection from "@/components/layout/FAQSection";
import { homeFAQ } from "@/lib/data/page-content";

export const HomePage: React.FC = () => {
  const router = useRouter();
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  function openModal(type: string): void {
    setActiveModal(type);
  }

  function closeModal(): void {
    setActiveModal(null);
  }

  return (
    <div className="transition-colors duration-300">
      {/* <ServicesSection /> */}

      <Hero />

      <AboutSection />

      <OurServicesCarousel />

      <WhyChooseCarousel />

      <PartnersWithBanner />

      <PathwaySection />

      {/* <FamilyStoryBanner /> */}

      <TestimonialSection />

      <CTA />

      <FAQSection
        title={homeFAQ.title}
        subtitle={homeFAQ.subtitle}
        faqs={homeFAQ.faqs}
      />
    </div>
  );
};
