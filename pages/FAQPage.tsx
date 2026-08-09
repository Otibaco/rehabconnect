import React, { useState } from 'react';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { FAQAccordion } from '@/components/editorial/FAQAccordion';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { faqsData } from '@/lib/data';

export const FAQPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Consultation', 'Families', 'Privacy', 'Payment'];

  const filteredFaqs = faqsData.filter((f) => 
    activeCategory === 'All' || f.category === activeCategory
  );

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="PLATFORM ANSWERS & HELP"
        title="FREQUENTLY ASKED QUESTIONS."
        subtitle="Clear answers regarding online consultations, family registration, confidentiality, and platform care."
        breadcrumb="FAQ"
      />

      {/* CATEGORY TABS */}
      <section className="py-8 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-sm transition-colors ${
                activeCategory === cat
                  ? 'bg-[var(--gold)] text-[#080907] font-bold'
                  : 'bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>
      </section>

      {/* ACCORDION LIST */}
      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <SectionLabel number="02" text={`SHOWING ${filteredFaqs.length} QUESTIONS`} />
          <FAQAccordion items={filteredFaqs} />
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
