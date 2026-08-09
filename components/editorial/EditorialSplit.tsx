import React from 'react';
import { SectionLabel } from './SectionLabel';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface EditorialSplitProps {
  number?: string;
  label: string;
  title: string;
  body: string[];
  image: string;
  imageAlt?: string;
  ctaText?: string;
  ctaLink?: string;
  reverse?: boolean;
  highlightText?: string;
}

export const EditorialSplit: React.FC<EditorialSplitProps> = ({
  number,
  label,
  title,
  body,
  image,
  imageAlt = 'Rehab Nigeria healthcare visual',
  ctaText,
  ctaLink,
  reverse = false,
  highlightText,
}) => {
  return (
    <section className="py-20 md:py-28 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center ${
          reverse ? 'lg:flex-row-reverse' : ''
        }`}>
          
          {/* TEXT CONTENT COLUMN */}
          <div className={`lg:col-span-6 space-y-6 ${reverse ? 'lg:order-2' : 'lg:order-1'}`}>
            <SectionLabel number={number} text={label} />

            <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
              {title}
            </h2>

            <div className="space-y-4 font-sans text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed">
              {body.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {highlightText && (
              <div className="p-4 bg-[var(--background-tertiary)] border-l-2 border-[var(--gold)] text-xs font-mono text-[var(--foreground)]">
                {highlightText}
              </div>
            )}

            {ctaText && ctaLink && (
              <div className="pt-4">
                <Link
                  href={ctaLink}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--background-tertiary)] hover:bg-[var(--gold)] text-[var(--foreground)] hover:text-[#080907] border border-[var(--border-subtle)] font-mono text-xs font-bold tracking-wider rounded-sm transition-all group"
                >
                  <span>{ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* ASYMMETRIC IMAGE COLUMN */}
          <div className={`lg:col-span-6 relative ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
            
            {/* Background Decorative Gold Frame Offset */}
            <div className="absolute -inset-3 border border-[var(--border-subtle)] rounded-sm transform translate-x-2 translate-y-2 pointer-events-none hidden sm:block"></div>
            
            <div className="relative rounded-sm overflow-hidden border border-[var(--border)] group">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-[360px] sm:h-[480px] object-cover filter brightness-90 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60"></div>
              
              {/* Corner Gold Accent */}
              <div className="absolute top-4 right-4 bg-[var(--background)]/90 backdrop-blur-md px-3 py-1 border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--gold)] uppercase tracking-widest">
                REHAB NIGERIA CARE
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
