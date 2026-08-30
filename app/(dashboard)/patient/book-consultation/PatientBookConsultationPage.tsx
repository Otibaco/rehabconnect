"use client";
import React, { useState } from 'react';

import {
  MessageSquare,
  PhoneCall,
  Video,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ConsultationType } from '@/types/type';
import { MOCK_COORDINATOR_PATIENTS } from '@/lib/data';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const PatientBookConsultationPage: React.FC = () => {
  const router = useRouter();

  const [bookingStep, setBookingStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedType, setSelectedType] = useState<ConsultationType>('video');
  const [selectedDate, setSelectedDate] = useState('2026-08-05');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [selectedCoordinator] = useState(MOCK_COORDINATOR_PATIENTS[0]);

  const consultationTypes: { type: ConsultationType; title: string; desc: string; duration: string; icon: React.ElementType }[] = [
    {
      type: 'chat',
      title: 'Live Chat',
      desc: 'Connect with your licensed Care Coordinator via end-to-end encrypted messaging.',
      duration: '30 Minutes',
      icon: MessageSquare,
    },
    {
      type: 'voice',
      title: 'Voice Call',
      desc: 'Direct confidential medical telephone triage with your Care Lead.',
      duration: '30 Minutes',
      icon: PhoneCall,
    },
    {
      type: 'video',
      title: 'HD Telehealth Video',
      desc: 'Face-to-face encrypted video intake and clinical recommendation session.',
      duration: '45 Minutes',
      icon: Video,
    },
    {
      type: 'physical',
      title: 'In-Person Consultation',
      desc: 'Arrange an in-person assessment at an accredited partner centre.',
      duration: '60 Minutes',
      icon: MapPin,
    },
  ];

  const availableSlots = ['09:00 AM', '10:30 AM', '01:15 PM', '03:00 PM', '04:30 PM'];

  const handleProceedToPayment = () => {
    router.push('/patient/payment');
  };

  return (
    <DashboardShell
      title="Book a Clinical Consultation"
      description="Schedule a 1-on-1 session with an accredited Nigerian healthcare coordinator."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient' }, { label: 'Book Consultation' }]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-2">
          {[
            { num: 1, label: 'Type' },
            { num: 2, label: 'Date' },
            { num: 3, label: 'Time' },
            { num: 4, label: 'Review' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                  bookingStep === s.num
                    ? 'bg-[var(--gold)] text-black shadow-md shadow-[var(--gold)]/20 font-bold'
                    : bookingStep > s.num
                    ? 'bg-[var(--green)] text-black font-bold'
                    : 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-subtle)]'
                }`}
              >
                {bookingStep > s.num ? <CheckCircle2 className="w-4 h-4 text-black" /> : s.num}
              </div>
              <span className={`text-xs font-semibold hidden sm:inline ${bookingStep === s.num ? 'text-[var(--gold)] font-bold' : 'text-[var(--foreground-subtle)]'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* STEP 1: CONSULTATION TYPE */}
        {bookingStep === 1 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5 shadow-xl">
            <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
              1. Choose Consultation Medium
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {consultationTypes.map((c) => {
                const Icon = c.icon;
                const selected = selectedType === c.type;
                return (
                  <div
                    key={c.type}
                    onClick={() => setSelectedType(c.type)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all space-y-2.5 ${
                      selected
                        ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--foreground)] shadow-lg shadow-[var(--gold)]/10'
                        : 'border-[var(--border)] bg-[var(--background-tertiary)] hover:border-[var(--gold)]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? 'bg-[var(--gold)] text-black' : 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--gold)]'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold text-[var(--gold)]">
                        {c.duration}
                      </span>
                    </div>
                    <h4 className="font-cinzel font-bold text-base text-[var(--foreground)]">{c.title}</h4>
                    <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{c.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => setBookingStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Select Date</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DATE */}
        {bookingStep === 2 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5 shadow-xl">
            <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--gold)]" />
              <span>2. Choose Consultation Date</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { date: '2026-08-04', label: 'Tue, Aug 4' },
                { date: '2026-08-05', label: 'Wed, Aug 5' },
                { date: '2026-08-06', label: 'Thu, Aug 6' },
                { date: '2026-08-07', label: 'Fri, Aug 7' },
              ].map((d) => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                    selectedDate === d.date
                      ? 'border-[var(--gold)] bg-[var(--gold)] text-black shadow-md shadow-[var(--gold)]/20'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] hover:border-[var(--gold)]/50'
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => setBookingStep(1)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setBookingStep(3)}
                className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Select Time</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CHOOSE TIME */}
        {bookingStep === 3 && (
          <div className="p-6 sm:p-7 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5 shadow-xl">
            <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--gold)]" />
              <span>3. Choose Time Slot</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedTime(slot)}
                  className={`p-4 rounded-2xl border text-center font-bold text-xs transition-all ${
                    selectedTime === slot
                      ? 'border-[var(--gold)] bg-[var(--gold)] text-black shadow-md shadow-[var(--gold)]/20'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] hover:border-[var(--gold)]/50'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>

            <div className="flex justify-between pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => setBookingStep(2)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={() => setBookingStep(4)}
                className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <span>Review Booking</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: REVIEW BOOKING */}
        {bookingStep === 4 && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
            <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
              4. Review Booking Summary
            </h3>

            <div className="p-5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-4 text-xs">
              <div className="flex items-center gap-3.5 pb-3 border-b border-[var(--border)]">
                <img
                  src={selectedCoordinator.avatar}
                  alt={selectedCoordinator.name}
                  className="w-12 h-12 rounded-xl object-cover border border-[var(--border-subtle)]"
                />
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                    {selectedCoordinator.name}
                  </h4>
                  <p className="text-[var(--foreground-muted)]">{selectedCoordinator.title}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[var(--foreground)]">
                <div>
                  <span className="text-[var(--foreground-subtle)] block text-[10px] font-bold uppercase">Consultation Format</span>
                  <span className="font-bold capitalize text-[var(--gold)]">{selectedType} Consultation</span>
                </div>
                <div>
                  <span className="text-[var(--foreground-subtle)] block text-[10px] font-bold uppercase">Date & Time</span>
                  <span className="font-bold text-[var(--foreground)]">{selectedDate} at {selectedTime}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border)] space-y-1.5">
                <div className="flex justify-between text-[var(--foreground-muted)]">
                  <span>Clinical Consultation Fee</span>
                  <span className="font-bold text-[var(--foreground)]">₦10,000</span>
                </div>
                <div className="flex justify-between text-[var(--foreground-muted)]">
                  <span>Platform Medical Triage Fee</span>
                  <span className="font-bold text-[var(--green)]">₦0 (Waived)</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-[var(--foreground)] pt-2 border-t border-[var(--border)]">
                  <span>Total Payable</span>
                  <span className="text-[var(--gold)] font-mono">₦10,000</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[var(--border)]">
              <button
                onClick={() => setBookingStep(3)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back
              </button>
              <button
                onClick={handleProceedToPayment}
                className="px-6 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Continue to Payment (₦10,000)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};
