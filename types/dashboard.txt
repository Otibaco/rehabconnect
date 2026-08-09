export type UserRole = 'patient' | 'family' | 'coordinator' | 'admin';

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  verificationStatus?: 'Pending' | 'Under Review' | 'Verified' | 'Rejected';
  familyAccessStatus?: 'Granted' | 'Pending' | 'Restricted';
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string | number;
  section?: string;
}

export interface Consultation {
  id: string;
  patientName: string;
  patientId: string;
  consultantName: string;
  consultantId: string;
  consultantTitle: string;
  date: string;
  time: string;
  durationMinutes: number;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Cancelled';
  type: 'Initial Consultation' | 'Follow-up Counseling' | 'Family Advisory' | 'Crisis Support';
  fee: string;
  notes?: string;
  meetingLink?: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: { name: string; url: string; size: string }[];
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: UserRole;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  category: 'Clinical Care' | 'Administrative' | 'Family Advisory';
}

export interface PatientRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  gender: string;
  location: string;
  reasonForSupport: string;
  substances: string[];
  durationOfConcern: string;
  frequency: string;
  priorSupport: boolean;
  medicalHistory: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelation: string;
  riskLevel: 'Low' | 'Moderate' | 'High';
  status: 'Active' | 'Onboarding' | 'Completed' | 'Archived';
  assignedConsultantId?: string;
  assignedConsultantName?: string;
  consentGranted: boolean;
  lastConsultationDate?: string;
  nextAppointmentDate?: string;
}

export interface FamilySupportLink {
  id: string;
  familyMemberName: string;
  familyMemberEmail: string;
  patientName: string;
  relationship: 'Parent' | 'Spouse' | 'Sibling' | 'Child' | 'Guardian' | 'Relative';
  consentStatus: 'Granted' | 'Pending' | 'Restricted';
  nextAppointment?: string;
  lastUpdated: string;
}

export interface CoordinatorVerification {
  id: string;
  coordinatorId: string;
  name: string;
  email: string;
  phone: string;
  professionalTitle: string;
  qualifications: string;
  registrationNumber: string; // MDCN, etc.
  yearsOfExperience: number;
  specialization: string[];
  documentUrl?: string;
  status: 'Pending' | 'Under Review' | 'Verified' | 'Rejected';
  submittedAt: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface PaymentRecord {
  id: string;
  transactionRef: string;
  amount: string;
  serviceName: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Failed' | 'Refunded';
  paymentMethod: 'Card (Paystack)' | 'Bank Transfer' | 'USSD';
  receiptUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'appointment' | 'message' | 'payment' | 'verification' | 'system' | 'alert';
  read: boolean;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionText?: string;
}

export interface OnboardingState {
  role: UserRole;
  step: number;
  totalSteps: number;
  data: Record<string, any>;
  isCompleted: boolean;
}
