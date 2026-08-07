"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
    question: "Does this cost anything?",
    answer:
      "No. Speaking with a care coordinator and getting matched to a centre is free. You only ever pay the centre you choose, directly.",
  },
  {
    question: "Will you tell anyone I've reached out?",
    answer:
      "No. Your conversation stays between you and your coordinator. Nothing is shared with a centre, employer, or family member without your explicit permission.",
  },
  {
    question: "Do you accept insurance?",
    answer:
      "Many centres in our network accept insurance. Your coordinator can help you understand your coverage before you commit to anything.",
  },
  {
    question: "What if I'm not ready to commit yet?",
    answer:
      "That's completely fine. You can talk to a coordinator just to understand your options — there's no obligation to book anything.",
  },
  {
    question: "Can a family member reach out on my behalf?",
    answer:
      "Yes. Coordinators regularly speak with concerned family members first and can help plan how to approach the conversation with you.",
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SupportFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-muted)" }}
      aria-label="Frequently asked questions"
    >
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            Common questions
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Answers before you ask
          </h2>
        </motion.div>

        <ul className="flex flex-col gap-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.li
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: [0.22, 0.4, 0.22, 1], delay: index * 0.04 }}
                className="rounded-2xl glass-card theme-shadow overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold theme-text">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 theme-accent shrink-0 theme-transition ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${index}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 0.4, 0.22, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm theme-text-muted leading-relaxed">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}