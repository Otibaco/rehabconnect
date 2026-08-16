"use client";
import { useAuth } from '@/context/AuthContext';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import React, { useState } from 'react';

import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Download,
  Building,
  Smartphone,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Appointment, PaymentTransaction } from '@/types/type';

export const PatientPaymentPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, addAppointment, addPayment } = useAuth();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank_transfer' | 'ussd'>('card');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('892');
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState<PaymentTransaction | null>(null);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      const refNumber = `RN-PAY-${Date.now().toString().slice(-8)}`;
      const pmt: PaymentTransaction = {
        id: `pay_${Date.now()}`,
        reference: refNumber,
        patientId: currentUser.id,
        patientName: currentUser.name,
        coordinatorName: 'Dr. Amara Okafor',
        amount: 10000,
        currency: 'NGN',
        paymentMethod,
        status: 'successful',
        date: new Date().toLocaleString(),
        consultationType: 'video',
      };

      const newApt: Appointment = {
        id: `apt_${Date.now()}`,
        patientId: currentUser.id,
        patientName: currentUser.name,
        patientAvatar: currentUser.avatar,
        coordinatorId: 'coord_1',
        coordinatorName: 'Dr. Amara Okafor',
        coordinatorTitle: 'Senior Neurological & Physical Care Lead',
        coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=400&q=80',
        type: 'video',
        date: '2026-08-05',
        timeSlot: '10:30 AM',
        durationMinutes: 45,
        fee: 10000,
        currency: 'NGN',
        status: 'scheduled',
        meetingLink: 'https://meet.rehabconnect.org/room-sarah-amara',
      };

      addPayment(pmt);
      addAppointment(newApt);
      setProcessing(false);
      setPaymentSuccess(pmt);
    }, 1000);
  };

  return (
    <DashboardShell
      title="Secure Clinical Checkout"
      description="Bank-grade encrypted gateway for Rehab Nigeria healthcare consultation fees."
      breadcrumbs={[
        { label: 'Healthcare Portal', path: '/patient/dashboard' },
        { label: 'Book Consultation', path: '/patient/consultations/book' },
        { label: 'Payment' },
      ]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        {!paymentSuccess ? (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left 3 cols: Paystack Simulated Form */}
            <div className="md:col-span-3 p-6 sm:p-7 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--gold)] text-black flex items-center justify-center text-xs font-bold font-cinzel">
                    RN
                  </div>
                  <span className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                    Paystack Checkout
                  </span>
                </div>
                <span className="text-[10px] text-[var(--gold)] font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" /> 256-Bit SSL Encrypted
                </span>
              </div>

              {/* Payment Method Selector */}
              <div className="grid grid-cols-3 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'bank_transfer'
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>Transfer</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('ussd')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === 'ussd'
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>USSD</span>
                </button>
              </div>

              <form onSubmit={handlePay} className="space-y-4 text-xs">
                {paymentMethod === 'card' && (
                  <>
                    <div className="space-y-1">
                      <label className="font-semibold text-[var(--foreground-muted)]">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="4111 2222 3333 4444"
                        className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="font-semibold text-[var(--foreground-muted)]">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          placeholder="MM/YY"
                          className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="font-semibold text-[var(--foreground-muted)]">
                          CVV
                        </label>
                        <input
                          type="text"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          placeholder="123"
                          className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-2 text-center">
                    <p className="text-[var(--foreground-muted)]">Transfer exactly ₦10,000 to:</p>
                    <p className="font-bold text-base text-[var(--gold)]">Wema Bank • 0123456789</p>
                    <p className="text-[10px] text-[var(--foreground-subtle)] font-bold uppercase">Rehab Nigeria Health Account</p>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-2 text-center">
                    <p className="text-[var(--foreground-muted)]">Dial USSD code on registered mobile number:</p>
                    <p className="font-bold text-lg text-[var(--gold)]">*737*000*8472#</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={processing}
                  className="w-full py-3.5 rounded-2xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  {processing ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-black" />
                      <span>Pay ₦10,000 Now</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right 2 cols: Order Summary */}
            <div className="md:col-span-2 p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
              <h4 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                Order Summary
              </h4>

              <div className="space-y-2 text-xs text-[var(--foreground-muted)]">
                <div className="flex justify-between">
                  <span>Clinical Consultation</span>
                  <span className="font-semibold text-[var(--foreground)]">₦10,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Medical Fee</span>
                  <span className="font-semibold text-[var(--green)]">₦0</span>
                </div>
                <div className="pt-2 border-t border-[var(--border)] flex justify-between text-sm font-bold text-[var(--foreground)]">
                  <span>Total Amount</span>
                  <span className="text-[var(--gold)] font-mono">₦10,000</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[11px] text-[var(--foreground-subtle)] leading-relaxed space-y-1">
                <span className="font-bold text-[var(--gold)] block">Medical Guarantee</span>
                <p>If you need to reschedule or cancel 24 hours prior, fees are fully credited or refunded.</p>
              </div>
            </div>
          </div>
        ) : (
          /* PAYMENT SUCCESS RECEIPT */
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[var(--green)]/20 text-[var(--green)] flex items-center justify-center mx-auto shadow-md border border-[var(--green)]/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="font-cinzel font-bold text-2xl text-[var(--foreground)]">
                Payment Successful
              </h2>
              <p className="text-xs text-[var(--gold)] font-mono">Receipt Reference: {paymentSuccess.reference}</p>
            </div>

            {/* Receipt Summary */}
            <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] max-w-sm mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[var(--foreground-subtle)]">Amount Paid:</span>
                <span className="font-bold text-[var(--foreground)]">₦10,000 NGN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-subtle)]">Payment Date:</span>
                <span className="font-semibold text-[var(--foreground)]">{paymentSuccess.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-subtle)]">Care Lead:</span>
                <span className="font-semibold text-[var(--foreground)]">{paymentSuccess.coordinatorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--foreground-subtle)]">Status:</span>
                <span className="font-bold text-[var(--green)]">Verified Paid</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => router.push('/patient/appointment-confirmation')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>View Confirmed Appointment</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  );
};
