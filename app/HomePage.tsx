"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FadeIn } from "../components/animations/FadeIn";
import { StaggerContainer } from "../components/animations/StaggerContainer";
import { TestimonialCarousel } from "../components/ui/TestimonialCarousel";
import { RehabCentreCard } from "../components/ui/RehabCentreCard";
import { CoordinatorCard } from "../components/ui/CoordinatorCard";
import { FAQAccordion } from "../components/ui/FAQAccordion";

import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  PhoneCall,
  Award,
  Lock,
  KeyRound,
  LayoutDashboard,
} from "lucide-react";

import {
  CARE_COORDINATORS,
  FAQS,
  REHAB_CENTRES,
  STATS,
} from "@/lib/data/mockData";
import AboutSection from "@/components/layout/AboutSection.tsx";
import WhyChooseSection, { WhyChooseCarousel } from "@/components/layout/WhyChooseCarousel";
import OurServicesCarousel from "@/components/layout/OurServicesCarousel";
import PartnersWithBanner from "@/components/layout/PartnersWithBanner";
import Hero from "@/components/layout/Hero";
import PathwaySection from "@/components/layout/PathwaySection";
import TestimonialSection from "@/components/layout/TestimonialSection";
import CTA from "@/components/layout/Cta";
import FAQSection from "@/components/layout/FAQSection";
import FamilyStoryBanner from "@/components/layout/FamilyStoryBanner";

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
    <div className="space-y-20 md:space-y-28 pb-20 transition-colors duration-300">

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
    
    <FAQSection />

      
    </div>
  );
};