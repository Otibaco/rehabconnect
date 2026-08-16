"use client"
import React from "react";
import Link from "next/link";

import { EditorialHero } from "@/components/pages-components/EditorialHero";
import { SectionLabel } from "@/components/pages-components/SectionLabel";
import { FinalCTA } from "@/components/pages-components/FinalCTA";
import { FAQAccordion } from "@/components/pages-components/FAQAccordion";

import { faqsData } from "@/lib/data";
import { siteConfig } from "@/lib/config";

import { CheckCircle2, ArrowUpRight } from "lucide-react";

// Use your existing Service type here if you already have one.
interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  fullDescription: string;
  targetAudience: string;
  image: string;
  benefits: string[];
  process: string[];
  fee?: string;
}

interface ServiceDetailPageProps {
  service: Service;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
}) => {
  return (
    <>
      {/* HERO */}
      <EditorialHero
        number={service.number}
        sectionLabel="CLINICAL SERVICE DETAIL"
        title={service.title}
        subtitle={service.subtitle}
        breadcrumb={`Services / ${service.title}`}
      />

      {/* OVERVIEW & TARGET AUDIENCE */}
      <section className="py-20 md:py-28 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* DESCRIPTION */}
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel
                number="01"
                text="SERVICE DESCRIPTION"
              />

              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[var(--foreground)]">
                WHAT THIS SERVICE PROVIDES
              </h2>

              <p className="font-sans text-base text-[var(--foreground-muted)] leading-relaxed">
                {service.fullDescription}
              </p>

              <div className="p-5 bg-[var(--background-secondary)] border-l-2 border-[var(--gold)] rounded-sm space-y-2">
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase block">
                  Who This Service Is For:
                </span>

                <p className="font-sans text-xs sm:text-sm text-[var(--foreground)] leading-relaxed">
                  {service.targetAudience}
                </p>
              </div>
            </div>

            {/* IMAGE */}
            <div className="lg:col-span-5">
              <div className="relative rounded-sm overflow-hidden border border-[var(--border)] shadow-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[360px] object-cover brightness-95"
                />
              </div>
            </div>

          </div>

          {/* PROCESS & BENEFITS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[var(--border-subtle)]">

            {/* BENEFITS */}
            <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-6">
              <SectionLabel
                number="02"
                text="KEY BENEFITS"
              />

              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                CLINICAL ADVANTAGES
              </h3>

              <ul className="space-y-3 font-sans text-xs text-[var(--foreground-muted)]">
                {service.benefits.map((benefit, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />

                    <span className="leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* PROCESS */}
            <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-6">
              <SectionLabel
                number="03"
                text="STEP-BY-STEP PROCESS"
              />

              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                HOW IT WORKS
              </h3>

              <ol className="space-y-3 font-mono text-xs text-[var(--foreground-muted)]">
                {service.process.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm"
                  >
                    <span className="text-[var(--gold)] font-bold shrink-0">
                      {String(index + 1).padStart(2, "0")}.
                    </span>

                    <span className="font-sans text-xs leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING & BOOKING */}
      <section className="py-16 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">

          <SectionLabel
            number="04"
            text="FEE & SCHEDULING"
          />

          <h2 className="font-cinzel text-3xl font-bold text-[var(--foreground)]">
            FEES:{" "}
            {service.fee || `₦${siteConfig.consultationFee}`}
          </h2>

          <p className="font-sans text-sm text-[var(--foreground-muted)] max-w-xl mx-auto">
            All consultations are conducted online in a private virtual room
            by qualified Rehab Nigeria professionals.
          </p>

          <div className="pt-2">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-colors shadow-2xl"
            >
              <span>BOOK THIS SERVICE NOW</span>

              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SERVICE FAQ */}
      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          <SectionLabel
            number="05"
            text="QUESTIONS ABOUT THIS SERVICE"
          />

          <FAQAccordion items={faqsData.slice(0, 4)} />

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />
    </>
  );
};