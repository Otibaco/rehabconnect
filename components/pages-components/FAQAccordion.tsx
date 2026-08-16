"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { FAQItem } from '@/types/type';


interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items,
  title = 'FREQUENTLY ASKED QUESTIONS',
  subtitle = 'Clear answers regarding online consultations, family registration, confidentiality, and platform care.'
}) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className="border border-[var(--border)] bg-[var(--background-secondary)] rounded-sm overflow-hidden transition-colors"
          >
            <button
              onClick={() => toggle(item.id)}
              className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none group"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-[var(--gold)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="font-cinzel text-base sm:text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--gold-light)] transition-colors">
                  {item.question}
                </span>
              </div>
              
              <div className="p-1.5 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] shrink-0">
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--border-subtle)] font-sans text-sm text-[var(--foreground-muted)] leading-relaxed">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
