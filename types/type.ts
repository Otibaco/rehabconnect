export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  number: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  process: string[];
  targetAudience: string;
  image: string;
  fee?: string;
}

export interface Professional {
  id: string;
  name: string;
  title: string;
  credentials: string;
  expertise: string[];
  bio: string;
  image: string;
  isFounder?: boolean;
  availableForConsultation: boolean;
}

export interface ResourceArticle {
  id: string;
  number: string;
  title: string;
  category: 'Education' | 'Family Support' | 'Recovery' | 'Substance Use' | 'Mental Wellbeing' | 'Announcements';
  readTime: string;
  description: string;
  content: string[];
  publishedDate: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Consultation' | 'Families' | 'Privacy' | 'Payment';
}

export interface ChallengeCampaign {
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'X (Twitter)';
  tagline: string;
  description: string;
  howToParticipate: string[];
  rules: string[];
  prizes?: string;
  hashtag: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  consultationFee: string;
  currency: string;
  phonePlaceholder: string;
  emailPlaceholder: string;
  whatsappPlaceholder: string;
  addressPlaceholder: string;
  socialLinks: {
    facebook: string;
    instagram: string;
    tiktok: string;
    x: string;
    whatsapp: string;
  };
}

export type RoutePath = 
  | '/'
  // Auth Routes
  | '/login'
  | '/register'
  | '/forgot-password'
  | '/reset-password'
  | '/onboarding'
  | '/verify-email'
  | '/verify-otp'
  | '/welcome'
  | '/success'
  | '/session-expired'
  | '/unauthorized'
  | '/404'
  | '/500'
  | '/loading'
  // Patient Unified Routes
  | '/patient'
  | '/patient/patient-journey'
  | '/patient/patient-consultations'
  | '/patient/patient-messages'
  | '/patient/patient-resources'
  | '/patient/patient-payment'
  | '/patient/patient-notifications'
  | '/patient/patient-settings'
  | '/patient/journey'
  | '/patient/consultations'
  | '/dashboard'
  // | '/dashboard/patient'
  // | '/dashboard/journey'
  // | '/patient/journey'
  // | '/dashboard/consultations'
  // | `/dashboard/consultation-room/${string}`
  // | '/dashboard/consultation-room'
  // | '/dashboard/consultation-live'
  // | '/consultation/live'
  // | '/dashboard/messages'
  // | '/dashboard/resources'
  // | '/dashboard/payments'
  // | '/dashboard/history'
  // | '/dashboard/notifications'
  // | '/dashboard/settings'
  // | '/dashboard/assessment'
  // Family Unified Routes
  | '/family'
  | '/family/loved-one'
  | '/family/consultations'
  | `/dashboard/family/consultation-room/${string}`
  | '/family/consultation'
  | '/family/messages'
  | '/family/resources'
  | '/family/payments'
  | '/family/notifications'
  | '/family/settings'


  // Care Coordinator Unified Routes
  | '/coordinator'
  | '/coordinator/patients'
  | `/coordinator/patients/${string}`
  | '/coordinator/consultations'
  | `/coordinator/consultations/${string}`
  | '/coordinator/consultation'
  | '/coordinator/messages'
  | '/coordinator/resources'
  | '/coordinator/protocols'
  | '/coordinator/followups'
  | '/coordinator/notifications'
  | '/coordinator/settings'
  // Legacy / Aliases for seamless backward compatibility
  | '/patient'
  | '/patient/assessment'
  | '/patient/consultations/book'
  | '/patient/payment'
  | '/patient/appointment-confirmation'
  | '/patient/consultation-live'
  | '/patient/consultation-summary'
  | '/patient/history'
  | '/patient/messages'
  | '/patient/resources'
  | '/patient/notifications'
  | '/patient/settings'
  | '/coordinator/dashboard'
  | '/coordinator/patients'
  | '/coordinator/consultations'
  | '/coordinator/messages'
  | '/coordinator/resources'
  | '/coordinator/notifications'
  | '/coordinator/settings'
  | '/coordinator/patient-detail'
  | '/coordinator/consultation-live'
  | '/coordinator/notes'
  | '/coordinator/summary-builder'
  | '/coordinator/appointments'
  | '/coordinator/profile'
  // Admin Unified Routes
  | '/admin'
  | '/admin/users'
  | '/admin/verification'
  | '/admin/reports'
  | '/admin/settings'
  | '/admin/rehab-centres'
  | '/admin/appointments'
  | '/admin/cms'
  | '/admin/patients'
  | '/admin/coordinators'
  | '/admin/payments'
  | '/admin/consultation-reports'
  | '/admin/content'
  | '/admin/blog'
  | '/admin/notifications'
  | '/admin/analytics'
  | '/admin/activity';


export type UserRole = 'patient' | 'family' | 'coordinator' | 'admin';
export type OnboardingTarget = 'myself' | 'family';

export interface CareJourneyStep {
  stageNumber: number;
  stageCode: '01_initial_consultation' | '02_assessment' | '03_recovery_planning' | '04_followup_support' | '05_ongoing_care';
  title: string;
  subtitle: string;
  status: 'completed' | 'in_progress' | 'pending';
  completedDate?: string;
  coordinatorNote?: string;
  actionRequired?: string;
}

export interface PatientCareJourney {
  patientId: string;
  patientName: string;
  currentStage: number; // 1, 2, 3, 4, 5
  overallStatus: 'Evaluating' | 'Assessment Active' | 'Plan Formulated' | 'In Treatment' | 'Ongoing Support';
  stages: CareJourneyStep[];
  latestUpdate: string;
  latestUpdateDate: string;
  nextStep: string;
  assignedCoordinatorName: string;
}

export interface FollowUpItem {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  contactRole: 'patient' | 'family';
  contactPersonName?: string;
  targetDate: string;
  reason: string;
  status: 'pending' | 'completed' | 'scheduled';
  priority: 'urgent' | 'high' | 'routine';
  journeyStage: string;
  notes?: string;
  lastConsultationDate: string;
}

export interface CoordinatorPatientRecord {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  email: string;
  phone: string;
  condition: string;
  category: string;
  careStatus: 'Intake Completed' | 'Assessment Complete' | 'Active Plan' | 'In Recovery' | 'Follow-up Needed';
  journeyStage: number; // 1 to 5
  lastConsultation: string;
  nextConsultation?: string;
  unreadMessagesCount: number;
  primaryContactType: 'patient' | 'family';
  familyContactName?: string;
  familyRelationship?: string;
  clinicalNotes: string;
  rehabGoals: string[];
}

export interface SupportedPerson {
  name: string;
  relationship: string;
  age?: number;
  condition: string;
  admissionStatus: 'evaluating' | 'matched' | 'in_treatment' | 'aftercare';
  assignedCentre?: string;
  lastUpdateDate: string;
  latestNote: string;
  progressScore: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar: string;
  role: UserRole;
  onboardingTarget?: OnboardingTarget;
  relationshipToPatient?: string;
  careTypePreference?: string;
  urgencyLevel?: string;
  assessmentStatus: 'not_started' | 'in_progress' | 'completed';
  assessmentProgress: number; // e.g. 0, 40, 65, 100
  hasActiveConsultation: boolean;
  assignedCoordinatorId?: string;
  supportedPerson?: SupportedPerson;
  createdAt: string;
}

export interface OnboardingData {
  target: OnboardingTarget;
  relationship?: string;
  supportType?: string;
  currentSituation?: string;
  urgency?: string;
  preferredCareFormat?: string;
  fullName?: string;
  email?: string;
  password?: string;
}

export interface PatientAssessmentData {
  id: string;
  patientId: string;
  patientName: string;
  supportCategory: string;
  primaryCondition: string;
  onsetDuration: string;
  previousTreatments: string[];
  mobilityLevel: string;
  rehabGoals: string[];
  preferredLocation: string;
  budgetOrInsurance: string;
  additionalNotes: string;
  submittedAt: string;
  status: 'pending_review' | 'under_review' | 'matched' | 'placed';
}

export type ConsultationType = 'chat' | 'voice' | 'video' | 'physical';
export type AppointmentStatus = 'scheduled' | 'in_progress' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar: string;
  coordinatorId: string;
  coordinatorName: string;
  coordinatorTitle: string;
  coordinatorAvatar: string;
  type: ConsultationType;
  date: string;
  timeSlot: string;
  durationMinutes: number;
  fee: number;
  currency: string;
  status: AppointmentStatus;
  meetingLink?: string;
  notes?: string;
  summaryId?: string;
}

export interface PaymentTransaction {
  id: string;
  reference: string;
  patientId: string;
  patientName: string;
  coordinatorName: string;
  amount: number;
  currency: string;
  paymentMethod: 'card' | 'bank_transfer' | 'ussd';
  status: 'successful' | 'pending' | 'failed' | 'refunded';
  date: string;
  consultationType: ConsultationType;
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'reminder';
  read: boolean;
  timestamp: string;
  actionUrl?: RoutePath;
}

export interface DirectMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  receiverId: string;
  text: string;
  timestamp: string;
  attachment?: {
    name: string;
    size: string;
    type: 'pdf' | 'image' | 'doc';
  };
}

export interface ClinicalResource {
  id: string;
  title: string;
  category: 'Neuro-Rehab' | 'Addiction Recovery' | 'Tele-Physiotherapy' | 'Cognitive Wellness' | 'Nutrition & Lifestyle';
  format: 'PDF Guide' | 'Video Routine' | 'Therapy Worksheet' | 'Audio Session';
  durationOrPages: string;
  description: string;
  prescribedCount: number;
  downloadUrl?: string;
}

export interface ConsultationSummary {
  id: string;
  appointmentId: string;
  patientId?: string;
  patientName: string;
  coordinatorName: string;
  date: string;
  status: 'completed' | 'followup_required';
  mainConcerns: string;
  clinicalObservations?: string;
  discussionPoints?: string[];
  findingsAndAssessment: string;
  recommendations: string[];
  nextStep: string;
  clientFacingSummary: string;
  followUpRequired: boolean;
  followUpDate?: string;
  journeyStageUpdatedTo?: number;
  recommendedResources?: string[];
  recommendedFacilities?: string[];
  createdAt?: string;
}

export interface CareCoordinator {
  id: string;
  name: string;
  title: string;
  specialty: string[];
  experienceYears: number;
  location: string;
  avatar: string;
  bio: string;
  rating: number;
  casesHandled: number;
  languages: string[];
  verified: boolean;
}


export interface AssessmentStep {
  title: string;
  subtitle: string;
  options: {
    label: string;
    value: string;
    description: string;
  }[];
}

export interface PatientCase {
  id: string;
  name: string;
  age: number;
  gender: string;
  avatar: string;
  condition: string;
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  matchedCentreName: string;
  assignedDate: string;
  notes: string;
  status: 'triage_pending' | 'referred' | 'admitted' | 'discharged';
}

export interface RehabCentre {
  id: string;
  name: string;
  location: string;
  accreditation: string[];
  specialties: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  capacity: string;
  description: string;
  features: string[];
  verified: boolean;
  featured?: boolean;
}



// import { RoutePath } from "@/types/type";

// export type UserRole = "patient" | "family" | "coordinator" | "admin";

export interface ShellUser {
  name: string;
  email: string;
  avatar: string;
  assessmentStatus?: "completed" | "in_progress";
  hasActiveConsultation?: boolean;
}

export interface ShellNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: RoutePath;
}

export interface SidebarItem {
  label: string;
  path: RoutePath;
  icon: React.ElementType;
  badge?: string;
}

export interface SidebarGroup {
  groupName?: string;
  items: SidebarItem[];
}

export const DEFAULT_USER: ShellUser = {
  name: "Guest User",
  email: "guest@rehabnigeria.com",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RN",
  assessmentStatus: "in_progress",
  hasActiveConsultation: false,
};