"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FaqItem {
  question: string;
  answer: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const faqs: FaqItem[] = [
  {
    question: "Can I reach out even if my loved one doesn't know yet?",
    answer:
      "Yes. Many family members contact us first to understand options before ever mentioning it. Your coordinator can help you plan from there.",
  },
  {
    question: "Will my loved one find out I called?",
    answer:
      "Only if you choose to tell them. Your conversation with a coordinator is confidential and is never shared without your permission.",
  },
  {
    question: "What if they refuse to get help?",
    answer:
      "It's common. A coordinator can talk through intervention approaches, boundary setting, and what support looks like in the meantime.",
  },
  {
    question: "Can I be involved once they're in treatment?",
    answer:
      "Many centres offer family sessions or updates with the patient's consent. Your coordinator can help you understand what a specific program allows.",
  },
  {
    question: "Is there support for me, too?",
    answer:
      "Yes. Supporting a loved one is draining. Ask your coordinator about family support groups and counselling resources alongside their treatment plan.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FamilySupportFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-muted)" }}
      aria-label="Frequently asked questions for families"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.6fr] gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
          >
            <span className="text-xs font-medium tracking-[0.18em] theme-accent uppercase">
              Common questions
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl leading-[1.15] tracking-tight theme-text"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              What families ask us most.
            </h2>
          </motion.div>

          <ul>
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.li
                  key={faq.question}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.22, 0.4, 0.22, 1], delay: index * 0.04 }}
                  className="border-t theme-border last:border-b"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`family-faq-panel-${index}`}
                    className="flex w-full items-start gap-5 py-6 text-left"
                  >
                    <span
                      className="shrink-0 text-lg leading-none theme-accent w-7"
                      style={{ fontFamily: "var(--font-serif)" }}
                      aria-hidden="true"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-sm sm:text-base font-medium theme-text">
                      {faq.question}
                    </span>
                    <Plus
                      className={`h-4 w-4 theme-text-subtle shrink-0 mt-0.5 theme-transition ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`family-faq-panel-${index}`}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 0.4, 0.22, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pl-12 pb-6 text-sm theme-text-muted leading-relaxed max-w-lg">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}