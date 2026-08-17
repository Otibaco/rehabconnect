// context/AppDataContext.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';
import {
  PatientAssessmentData,
  Appointment,
  PaymentTransaction,
  AppNotification,
} from '@/types/type';
import {
  MOCK_ASSESSMENTS,
  MOCK_APPOINTMENTS,
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS,
} from '@/lib/data';
import { useAuth } from './AuthContext';

interface ReferralRecord {
  id: string;
  patientName: string;
  source: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

interface AppDataContextType {
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  payments: PaymentTransaction[];
  addPayment: (pmt: PaymentTransaction) => void;
  notifications: AppNotification[];
  markNotificationRead: (id: string) => void;
  assessmentData: PatientAssessmentData | null;
  submitAssessment: (data: Partial<PatientAssessmentData>) => void;
  referrals: ReferralRecord[];
  addReferral: (ref: ReferralRecord) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [assessmentData, setAssessmentData] = useState<PatientAssessmentData | null>(MOCK_ASSESSMENTS[0]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);

  const addReferral = (ref: ReferralRecord) => {
    setReferrals((prev) => [ref, ...prev]);
  };

  const addAppointment = (apt: Appointment) => {
    setAppointments((prev) => [apt, ...prev]);
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser?.id ?? 'unknown',
      title: 'Appointment Booked',
      message: `Your ${apt.type} consultation is scheduled for ${apt.date} at ${apt.timeSlot}.`,
      type: 'success',
      read: false,
      timestamp: 'Just now',
      actionUrl: '/patient/dashboard',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const addPayment = (pmt: PaymentTransaction) => {
    setPayments((prev) => [pmt, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const submitAssessment = (data: Partial<PatientAssessmentData>) => {
    const fullAssessment: PatientAssessmentData = {
      id: `asm_${Date.now()}`,
      patientId: currentUser?.id ?? 'unknown',
      patientName: currentUser?.name ?? 'Unknown',
      supportCategory: data.supportCategory || 'Physical Rehabilitation',
      primaryCondition: data.primaryCondition || 'General Post-Hospitalization Care',
      onsetDuration: data.onsetDuration || '1-3 months',
      previousTreatments: data.previousTreatments || ['Physical Therapy'],
      mobilityLevel: data.mobilityLevel || 'Independent with assistance',
      rehabGoals: data.rehabGoals || ['Improve mobility', 'Pain reduction'],
      preferredLocation: data.preferredLocation || 'Lagos State',
      budgetOrInsurance: data.budgetOrInsurance || 'Private Health Insurance',
      additionalNotes: data.additionalNotes || '',
      submittedAt: new Date().toISOString(),
      status: 'under_review',
    };
    setAssessmentData(fullAssessment);
  };

  return (
    <AppDataContext.Provider
      value={{
        appointments,
        addAppointment,
        payments,
        addPayment,
        notifications,
        markNotificationRead,
        assessmentData,
        submitAssessment,
        referrals,
        addReferral,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};