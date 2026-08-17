'use client';

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
  ConsultationSummary,
  PatientCareJourney,
  FollowUpItem,
  CoordinatorPatientRecord
} from '@/types/type';
import {
  DEMO_PATIENT_MYSELF,
  DEMO_PATIENT_FAMILY,
  DEMO_COORDINATOR,
  DEMO_ADMIN,
  MOCK_ASSESSMENTS,
  MOCK_APPOINTMENTS,
  MOCK_PAYMENTS,
  MOCK_NOTIFICATIONS,
  MOCK_SUMMARIES,
  INITIAL_PATIENT_JOURNEY,
  INITIAL_FAMILY_JOURNEY,
  MOCK_COORDINATOR_PATIENTS,
  MOCK_FOLLOW_UPS,
  MOCK_CONVERSATIONS
} from '@/lib/data';

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
  updateAssessmentProgress: (progress: number) => void;
  // Care Journey & Consultation Summary workflow
  patientJourney: PatientCareJourney;
  familyJourney: PatientCareJourney;
  updateCareJourneyStage: (patientId: string, newStageNumber: number, note?: string) => void;
  summaries: ConsultationSummary[];
  saveConsultationSummaryAndComplete: (summary: Omit<ConsultationSummary, 'id' | 'createdAt'>) => void;
  // Follow-ups & Messaging
  followUps: FollowUpItem[];
  completeFollowUp: (id: string) => void;
  coordinatorPatients: CoordinatorPatientRecord[];
  conversations: typeof MOCK_CONVERSATIONS;
  sendMessage: (conversationId: string, text: string) => void;
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
    supportType: 'Physical & Neurological Rehabilitation',
    currentSituation: 'I am seeking online rehabilitation guidance following surgery',
    urgency: 'As soon as possible',
    preferredCareFormat: 'Online video consultation',
  });

  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [payments, setPayments] = useState<PaymentTransaction[]>(MOCK_PAYMENTS);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [assessmentData, setAssessmentData] = useState<PatientAssessmentData | null>(MOCK_ASSESSMENTS[0]);
  const [summaries, setSummaries] = useState<ConsultationSummary[]>(MOCK_SUMMARIES);
  const [patientJourney, setPatientJourney] = useState<PatientCareJourney>(INITIAL_PATIENT_JOURNEY);
  const [familyJourney, setFamilyJourney] = useState<PatientCareJourney>(INITIAL_FAMILY_JOURNEY);
  const [followUps, setFollowUps] = useState<FollowUpItem[]>(MOCK_FOLLOW_UPS);
  const [coordinatorPatients, setCoordinatorPatients] = useState<CoordinatorPatientRecord[]>(MOCK_COORDINATOR_PATIENTS as CoordinatorPatientRecord[]);
  const [conversations, setConversations] = useState(MOCK_CONVERSATIONS);

  const switchRole = (newRole: UserRole, target: OnboardingTarget = 'myself') => {
    setIsAuthenticated(true);
    if (newRole === 'coordinator') {
      setCurrentUser(DEMO_COORDINATOR);
    } else if (newRole === 'admin') {
      setCurrentUser(DEMO_ADMIN);
    } else if (newRole === 'family' || target === 'family') {
      setCurrentUser(DEMO_PATIENT_FAMILY);
    } else {
      setCurrentUser(DEMO_PATIENT_MYSELF);
    }
  };

  const updateAssessmentProgress = (progress: number) => {
    setCurrentUser((prev) => ({
      ...prev,
      assessmentProgress: progress,
      assessmentStatus: progress >= 100 ? 'completed' : 'in_progress',
    }));
  };

  const addAppointment = (apt: Appointment) => {
    setAppointments((prev) => [apt, ...prev]);
    // Also create notification
    const newNotif: AppNotification = {
      id: `notif_${Date.now()}`,
      userId: currentUser.id,
      title: 'Consultation Booked & Confirmed',
      message: `Your ${apt.type} video consultation with ${apt.coordinatorName} is booked for ${apt.date} at ${apt.timeSlot}.`,
      type: 'success',
      read: false,
      timestamp: 'Just now',
      actionUrl: '/dashboard/consultations',
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
      primaryCondition: data.primaryCondition || 'Post-Surgical Knee & Spinal Therapy',
      onsetDuration: data.onsetDuration || '1-3 months',
      previousTreatments: data.previousTreatments || ['Physical Therapy'],
      mobilityLevel: data.mobilityLevel || 'Independent with assistance',
      rehabGoals: data.rehabGoals || ['Improve mobility', 'Pain reduction'],
      preferredLocation: data.preferredLocation || '100% Online Tele-Rehab',
      budgetOrInsurance: data.budgetOrInsurance || 'Direct Private Billing',
      additionalNotes: data.additionalNotes || '',
      submittedAt: new Date().toISOString(),
      status: 'under_review',
    };
    setAssessmentData(fullAssessment);
    setCurrentUser((prev) => ({ ...prev, assessmentStatus: 'completed', assessmentProgress: 100 }));
  };

  const updateCareJourneyStage = (patientId: string, newStageNumber: number, note?: string) => {
    const updateHelper = (journey: PatientCareJourney): PatientCareJourney => {
      const updatedStages = journey.stages.map((stage) => {
        if (stage.stageNumber < newStageNumber) {
          return { ...stage, status: 'completed' as const, completedDate: stage.completedDate || 'Updated recently' };
        } else if (stage.stageNumber === newStageNumber) {
          return {
            ...stage,
            status: 'in_progress' as const,
            coordinatorNote: note || stage.coordinatorNote || 'Active care protocol in progress.',
          };
        } else {
          return { ...stage, status: 'pending' as const };
        }
      });

      return {
        ...journey,
        currentStage: newStageNumber,
        latestUpdate: note ? `Care Coordinator updated journey: ${note}` : `Care Coordinator advanced journey to Stage 0${newStageNumber}.`,
        latestUpdateDate: 'Just now',
      };
    };

    if (patientId === 'usr_patient_2') {
      setFamilyJourney((prev) => updateHelper(prev));
    } else {
      setPatientJourney((prev) => updateHelper(prev));
    }
  };

  // ONE-CLICK POST CONSULTATION COMPLETE & SYNC WORKFLOW
  const saveConsultationSummaryAndComplete = (summaryData: Omit<ConsultationSummary, 'id' | 'createdAt'>) => {
    const newSummaryId = `sum_${Date.now()}`;
    const newSummary: ConsultationSummary = {
      ...summaryData,
      id: newSummaryId,
      createdAt: new Date().toISOString(),
    };

    // 1. Add to summaries
    setSummaries((prev) => [newSummary, ...prev]);

    // 2. Mark consultation appointment as completed
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === summaryData.appointmentId
          ? { ...apt, status: 'completed' as const, summaryId: newSummaryId }
          : apt
      )
    );

    // 3. Update Patient Care Journey automatically if stage changed
    const targetPatientId = summaryData.patientId || (summaryData.patientName.includes('Okafor') ? 'usr_patient_2' : 'usr_patient_1');
    const stageToSet = summaryData.journeyStageUpdatedTo || (targetPatientId === 'usr_patient_2' ? 3 : 2);
    updateCareJourneyStage(targetPatientId, stageToSet, summaryData.nextStep);

    // 4. Create Follow-Up automatically if requested
    if (summaryData.followUpRequired && summaryData.followUpDate) {
      const isFamilyContact = targetPatientId === 'usr_patient_2' || summaryData.patientName.includes('David');
      const newFollowUp: FollowUpItem = {
        id: `flw_${Date.now()}`,
        patientId: targetPatientId,
        patientName: summaryData.patientName,
        patientAvatar: isFamilyContact
          ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
          : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        contactRole: isFamilyContact ? 'family' : 'patient',
        contactPersonName: isFamilyContact ? 'David Okafor (Son)' : undefined,
        targetDate: summaryData.followUpDate,
        reason: summaryData.nextStep || 'Follow-up clinical review & progress check',
        status: 'pending',
        priority: 'high',
        journeyStage: `0${stageToSet} — ${stageToSet === 1 ? 'Initial Consultation' : stageToSet === 2 ? 'Assessment' : stageToSet === 3 ? 'Recovery Planning' : stageToSet === 4 ? 'Follow-up Support' : 'Ongoing Care'}`,
        lastConsultationDate: summaryData.date,
        notes: summaryData.recommendations[0] || 'Check patient adherence to prescribed home protocol.',
      };
      setFollowUps((prev) => [newFollowUp, ...prev]);
    }

    // 5. Generate notifications for patient & family
    const newPatientNotif: AppNotification = {
      id: `notif_${Date.now()}_p`,
      userId: targetPatientId,
      title: 'Consultation Summary Available',
      message: `${summaryData.coordinatorName} has published your clinical summary and updated your Care Journey.`,
      type: 'info',
      read: false,
      timestamp: 'Just now',
      actionUrl: targetPatientId === 'usr_patient_2' ? '/dashboard/family/consultations' : '/dashboard/consultations',
    };

    setNotifications((prev) => [newPatientNotif, ...prev]);
  };

  const completeFollowUp = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: 'completed' as const } : f))
    );
  };

  const sendMessage = (conversationId: string, text: string) => {
    const newMsg = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderRole: currentUser.role === 'coordinator' ? 'Care Coordinator' : currentUser.role === 'family' ? 'Family Member' : 'Patient',
      receiverId: currentUser.role === 'coordinator' ? 'usr_patient_1' : 'usr_coord_1',
      text,
      timestamp: 'Just now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
  };

  const login = (email: string, roleToSet: UserRole = 'patient') => {
    setIsAuthenticated(true);
    if (roleToSet === 'coordinator' || email.includes('coord') || email.includes('doc')) {
      setCurrentUser(DEMO_COORDINATOR);
    } else if (roleToSet === 'admin' || email.includes('admin')) {
      setCurrentUser(DEMO_ADMIN);
    } else if (roleToSet === 'family' || email.includes('family')) {
      setCurrentUser(DEMO_PATIENT_FAMILY);
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
        updateAssessmentProgress,
        patientJourney,
        familyJourney,
        updateCareJourneyStage,
        summaries,
        saveConsultationSummaryAndComplete,
        followUps,
        completeFollowUp,
        coordinatorPatients,
        conversations,
        sendMessage,
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
