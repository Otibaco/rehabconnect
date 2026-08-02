export type RoutePath = 
  | '/'
  | '/how-it-works'
  | '/for-patients'
  | '/for-families'
  | '/care-coordinators'
  | '/rehabilitation-centres'
  | '/about'
  | '/resources'
  | `/resources/${string}`
  | '/faq'
  | '/contact'
  | '/privacy'
  | '/terms'
  | '/cookies'
  | '/careers'
  | '/support'
  | '/help-center'
  | '/referral-portal'
  | '/portal-dashboard'
  // Auth Routes
  | '/login'
  | '/register'
  | '/forgot-password'
  | '/reset-password'
  | '/verify-email'
  | '/verify-otp'
  | '/welcome'
  | '/success'
  | '/session-expired'
  | '/unauthorized'
  | '/404'
  | '/500'
  | '/loading'
  // Patient App Routes
  | '/patient/dashboard'
  | '/patient/assessment'
  | '/patient/consultations/book'
  | '/patient/payment'
  | '/patient/appointment-confirmation'
  | '/patient/consultation-live'
  | '/patient/consultation-summary'
  | '/patient/history'
  | '/patient/notifications'
  | '/patient/settings'
  // Coordinator App Routes
  | '/coordinator/dashboard'
  | '/coordinator/appointments'
  | '/coordinator/patients'
  | '/coordinator/assessments'
  | '/coordinator/referrals'
  | '/coordinator/consultations'
  | '/coordinator/patient-detail'
  | '/coordinator/consultation-live'
  | '/coordinator/notes'
  | '/coordinator/summary-builder'
  | '/coordinator/follow-ups'
  | '/coordinator/history'
  | '/coordinator/profile'
  // Admin App Routes
  | '/admin/dashboard'
  | '/admin/users'
  | '/admin/rehab-centres'
  | '/admin/referrals'
  | '/admin/commissions'
  | '/admin/reports'
  | '/admin/cms'
  | '/admin/patients'
  | '/admin/coordinators'
  | '/admin/appointments'
  | '/admin/payments'
  | '/admin/consultation-reports'
  | '/admin/content'
  | '/admin/blog'
  | '/admin/notifications'
  | '/admin/analytics'
  | '/admin/settings';

export type UserRole = 'patient' | 'coordinator' | 'admin';
export type OnboardingTarget = 'myself' | 'family';

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
  hasActiveConsultation: boolean;
  assignedCoordinatorId?: string;
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

export interface ConsultationSummary {
  id: string;
  appointmentId: string;
  patientName: string;
  coordinatorName: string;
  date: string;
  discussionPoints: string[];
  clinicalObservations: string;
  recommendations: string[];
  nextSteps: string[];
  recommendedFacilities?: string[];
  followUpDate?: string;
}

export type ThemeMode = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: RoutePath;
  description?: string;
  badge?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
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

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: 'Patient' | 'Family Member' | 'Care Coordinator' | 'Rehab Director';
  location: string;
  avatar: string;
  rating: number;
  storyTitle?: string;
  centreName?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: 'Recovery Guide' | 'Family Support' | 'Clinical Insights' | 'Rehab Basics' | 'Mental Health';
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  content: string[];
  keyTakeaways: string[];
  relatedSlugs: string[];
  featured?: boolean;
  status?: 'draft' | 'published' | 'scheduled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Patients' | 'Families' | 'Consultations' | 'Rehabilitation Centres' | 'Care Coordinators' | 'Privacy & Safety';
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

export interface ReferralRecord {
  id: string;
  referralCode: string;
  patientId: string;
  patientName: string;
  coordinatorId: string;
  coordinatorName: string;
  rehabCentreId: string;
  rehabCentreName: string;
  rehabCentreLocation: string;
  careType: string;
  estimatedAdmissionCost: number;
  calculatedCommission: number;
  commissionStatus: 'pending' | 'approved' | 'paid';
  status: 'pending_acceptance' | 'accepted' | 'admission_completed' | 'declined';
  createdDate: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  userType: 'Patient' | 'Family Member' | 'Healthcare Provider' | 'Rehab Centre Representative' | 'Other';
  subject: string;
  message: string;
}

