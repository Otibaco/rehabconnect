'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Search, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Data — RehabConnect-specific FAQs
// ---------------------------------------------------------------------------

const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How does RehabConnect match me with a rehabilitation centre?',
    answer:
      'After you complete a brief confidential assessment, a dedicated care coordinator reviews your clinical needs, location preferences, budget, and any specific requirements. They then provide a shortlist of pre-vetted, accredited centres that best match your situation — saving you weeks of research and uncertainty.',
  },
  {
    id: 'faq-2',
    question: 'Is my information kept confidential?',
    answer:
      'Absolutely. All information you share with RehabConnect is encrypted and handled with the strictest confidentiality. We never share your details with any facility without your explicit consent. Your privacy and peace of mind are foundational to how we operate.',
  },
  {
    id: 'faq-3',
    question: 'What types of rehabilitation services are available through your platform?',
    answer:
      'Our partner network covers a wide range of services including substance use disorder treatment, mental health support, dual-diagnosis programmes, inpatient and outpatient care, detoxification, family therapy, and aftercare. We help you find the right level of care for your unique situation.',
  },
  {
    id: 'faq-4',
    question: 'Does RehabConnect charge for its coordination service?',
    answer:
      'No. RehabConnect’s care coordination and matching service is completely free for individuals and families. We are committed to removing barriers to access — so you can focus on recovery, not on costs or logistics.',
  },
  {
    id: 'faq-5',
    question: 'How quickly can I expect to be placed in a centre?',
    answer:
      'Timelines vary based on your specific needs and the availability of suitable centres, but most people receive verified recommendations within 48 hours of completing their assessment. In urgent situations, we can often expedite the process significantly.',
  },
  {
    id: 'faq-6',
    question: 'Can RehabConnect help if I am searching for a family member?',
    answer:
      'Yes. Many of the people who reach out to us are searching on behalf of a loved one. Our care coordinators are experienced in guiding families through the process sensitively, helping you understand options and supporting you through every step of admission.',
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const answerVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
      opacity: { duration: 0.2 },
    },
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] },
      opacity: { duration: 0.3, delay: 0.05 },
    },
  },
};

// ---------------------------------------------------------------------------
// FAQAccordion Component
// ---------------------------------------------------------------------------

interface FAQAccordionProps {
  items: FAQItem[];
  allowSearch?: boolean;
  maxVisible?: number;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  allowSearch = false,
  maxVisible,
}) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggle = useCallback(
    (id: string) => {
      setOpenId((prev) => (prev === id ? null : id));
    },
    []
  );

  const filteredItems = searchQuery.trim()
    ? items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : items;

  const visibleItems = maxVisible ? filteredItems.slice(0, maxVisible) : filteredItems;

  if (filteredItems.length === 0 && searchQuery.trim()) {
    return (
      <div className="text-center py-10">
        <p className="text-sm text-[var(--color-text-muted)]">
          No FAQs match your search. Try a different keyword.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {visibleItems.map((item, index) => {
        const isOpen = openId === item.id;

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              delay: index * 0.06,
              duration: 0.45,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden transition-shadow duration-300 hover:shadow-sm"
          >
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${item.id}`}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
            >
              <span className="text-sm sm:text-base font-medium text-[var(--color-text)] pr-2 leading-snug">
                {item.question}
              </span>
              <span className="shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] transition-all duration-200 group-hover:bg-[var(--color-accent)] group-hover:text-white">
                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-answer-${item.id}`}
                  variants={answerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 pt-0 text-sm leading-relaxed text-[var(--color-text-muted)] border-t border-[var(--color-border)] mx-5">
                    <div className="pt-4">{item.answer}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Main FAQ Section
// ---------------------------------------------------------------------------

export const FAQSection: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="relative py-20 sm:py-28"
      style={{ backgroundColor: 'var(--color-section-soft)' }}
    >
      <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="text-center mb-12 space-y-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-sm font-medium tracking-wide text-[var(--color-accent)]">
            FAQ
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="text-sm text-[var(--color-text-muted)] max-w-lg mx-auto">
            Clear answers about how RehabConnect helps you find the right rehabilitation centre.
          </p>
        </motion.div>

        {/* Accordion */}
        <FAQAccordion items={FAQS} allowSearch={false} maxVisible={5} />

        {/* View all link */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button
            onClick={() => router.push('/faq')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline transition-all"
          >
            View full FAQ centre
            <ArrowRight size={15} />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default FAQSection;