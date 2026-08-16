"use client"
import React, { useState } from 'react';
import { EditorialHero } from '@/components/pages-components/EditorialHero';
import { SectionLabel } from '@/components/pages-components/SectionLabel';
import { siteConfig } from '@/lib/config';
import { Phone, Mail, MessageSquare, MapPin, Send, ArrowUpRight, CheckCircle2, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Enquiry',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-0">
      
      <SiteHeader />
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="GENERAL ENQUIRIES & PARTNERSHIPS"
        title="CONTACT REHAB NIGERIA."
        subtitle="Get in touch with our institutional administration for general enquiries, media, corporate partnerships, or technical support."
        breadcrumb="Contact"
      />

      {/* CONTACT DETAILS & ENQUIRY FORM — ASYMMETRICAL LAYOUT */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* CONTACT DETAILS */}
            <div className="lg:col-span-5 space-y-8">
              <SectionLabel number="02" text="OFFICIAL COMMUNICATIONS" />

              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
                GET IN TOUCH
              </h2>

              <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                Please note: This contact channel is for administrative, corporate, media, and general enquiries. If you are seeking private clinical rehabilitation support, please start the online consultation flow directly.
              </p>

              <div className="space-y-4 font-mono text-xs">
                <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm flex items-start gap-3.5 hover:border-[var(--gold)] transition-colors">
                  <Phone className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground-subtle)] uppercase block text-[10px]">Administrative Phone:</span>
                    <span className="text-[var(--foreground)] font-bold text-sm">{siteConfig.phonePlaceholder}</span>
                  </div>
                </div>

                <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm flex items-start gap-3.5 hover:border-[var(--gold)] transition-colors">
                  <Mail className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground-subtle)] uppercase block text-[10px]">Email Address:</span>
                    <span className="text-[var(--foreground)] font-bold text-sm">{siteConfig.emailPlaceholder}</span>
                  </div>
                </div>

                <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm flex items-start gap-3.5 hover:border-[var(--brand-whatsapp)] transition-colors">
                  <MessageSquare className="w-5 h-5 text-[var(--brand-whatsapp)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground-subtle)] uppercase block text-[10px]">WhatsApp Business:</span>
                    <span className="text-[var(--brand-whatsapp)] font-bold text-sm">{siteConfig.whatsappPlaceholder}</span>
                  </div>
                </div>

                <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm flex items-start gap-3.5 hover:border-[var(--gold)] transition-colors">
                  <MapPin className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[var(--foreground-subtle)] uppercase block text-[10px]">Headquarters:</span>
                    <span className="text-[var(--foreground)] font-bold text-sm">{siteConfig.addressPlaceholder}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* GENERAL ENQUIRY FORM */}
            <div className="lg:col-span-7 bg-[var(--background-secondary)] border border-[var(--border)] p-8 sm:p-10 rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              <SectionLabel number="03" text="ADMINISTRATIVE MESSAGE" />

              <h3 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
                Send An Enquiry Message
              </h3>

              {submitted ? (
                <div className="p-8 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-center space-y-4 font-sans">
                  <div className="p-3 bg-[var(--green)]/20 text-[var(--green-light)] rounded-full w-fit mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                    Thank You For Reaching Out
                  </h4>
                  <p className="text-xs text-[var(--foreground-muted)] max-w-md mx-auto leading-relaxed">
                    Your administrative message has been logged. Our communications team will respond within 24 business hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm mt-2 hover:bg-[var(--gold-light)] transition-colors"
                  >
                    SEND ANOTHER MESSAGE
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Chinedu Okonkwo"
                        className="w-full p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. chinedu@example.com"
                        className="w-full p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Phone Number</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. +234 800 000 0000"
                        className="w-full p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Enquiry Type</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                      >
                        <option>General Enquiry</option>
                        <option>Corporate / NGO Partnership</option>
                        <option>Media & Public Relations</option>
                        <option>Professional Network Joining</option>
                        <option>Technical Support</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Write your general enquiry message here..."
                      className="w-full p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2 shadow-xl"
                  >
                    <Send className="w-4 h-4" />
                    <span>SUBMIT ENQUIRY MESSAGE</span>
                  </button>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* SEEKING CLINICAL CARE CTA */}
      <section className="py-20 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <SectionLabel number="04" text="SEEKING CLINICAL REHABILITATION CARE?" />
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
            LOOKING FOR PROFESSIONAL PATIENT CARE?
          </h2>
          <p className="font-sans text-sm sm:text-base text-[var(--foreground-muted)] max-w-xl mx-auto leading-relaxed">
            If you or a family member are seeking private, professional online rehabilitation consultation, please proceed directly to our patient journey page.
          </p>

          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-colors shadow-2xl"
          >
            <span>START YOUR JOURNEY →</span>
          </Link>
        </div>
      </section>

      <Footer />

    </div>
  );
};
