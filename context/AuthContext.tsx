'use client'
import React, { createContext, useContext, useState } from 'react';
import {
  UserProfile,
  UserRole,
  OnboardingTarget,
  OnboardingData,
  PatientAssessmentData,
  Appointment,
  PaymentTransaction,
  AppNotification,
  ReferralRecord
} from '@/lib/types';

import { DEMO_ADMIN, DEMO_COORDINATOR, DEMO_PATIENT_FAMILY, DEMO_PATIENT_MYSELF, MOCK_APPOINTMENTS, MOCK_ASSESSMENTS, MOCK_NOTIFICATIONS, MOCK_PAYMENTS } from '@/lib/data/appMockData';
import { MOCK_REFERRALS } from '@/lib/data/mockData';

interface AuthContextType {
  currentUser: UserProfile;
  role: UserRole;
  switchRole: (newRole: UserRole, target?: OnboardingTarget) => void;
  onboardingData: OnboardingData;
  setOnboardingData: React.Dispatch<React.SetStateAction<OnboardingData>>;
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
  login: (email: string, role?: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_PATIENT_MYSELF);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    target: 'myself',
    supportType: 'Substance Use & Recovery',
    currentSituation: 'I am actively looking for rehabilitation support',
    urgency: 'As soon as possible',
    preferredCareFormat: 'Online consultation',
  });

  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [assessmentData, setAssessmentData] = useState<PatientAssessmentData | null>(MOCK_ASSESSMENTS[0]);
  const [referrals, setReferrals] = useState<ReferralRecord[]>(MOCK_REFERRALS);

  const addReferral = (ref: ReferralRecord) => {
    setReferrals((prev) => [ref, ...prev]);
  };

  const switchRole = (newRole: UserRole, target: OnboardingTarget = 'myself') => {
    setIsAuthenticated(true);
    if (newRole === 'coordinator') {
      setCurrentUser(DEMO_COORDINATOR);
    } else if (newRole === 'admin') {
      setCurrentUser(DEMO_ADMIN);
    } else {
      setCurrentUser(target === 'family' ? DEMO_PATIENT_FAMILY : DEMO_PATIENT_MYSELF);
    }
  };

  const addAppointment = (apt: Appointment) => {
    setAppointments((prev) => [apt, ...prev]);
    // Also create notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
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
      patientId: currentUser.id,
      patientName: currentUser.name,
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
    setCurrentUser((prev) => ({ ...prev, assessmentStatus: 'completed' }));
  };

  const login = (email: string, roleToSet: UserRole = 'patient') => {
    setIsAuthenticated(true);
    if (roleToSet === 'coordinator' || email.includes('coord')) {
      setCurrentUser(DEMO_COORDINATOR);
    } else if (roleToSet === 'admin' || email.includes('admin')) {
      setCurrentUser(DEMO_ADMIN);
    } else {
      setCurrentUser(DEMO_PATIENT_MYSELF);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser.role,
        switchRole,
        onboardingData,
        setOnboardingData,
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
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
