import {
  UserProfile,
  Consultation,
  PatientRecord,
  FamilySupportLink,
  CoordinatorVerification,
  PaymentRecord,
  NotificationItem,
  Conversation,
  Message
} from '../types/dashboard';

export const mockUsers: Record<string, UserProfile> = {
  patient: {
    id: 'usr_pat_001',
    firstName: 'Chinedu',
    lastName: 'Okonkwo',
    email: 'chinedu.o@example.com',
    phone: '+234 803 123 4567',
    role: 'patient',
    createdAt: '2026-07-15'
  },
  family: {
    id: 'usr_fam_001',
    firstName: 'Amina',
    lastName: 'Okonkwo',
    email: 'amina.o@example.com',
    phone: '+234 802 987 6543',
    role: 'family',
    familyAccessStatus: 'Granted',
    createdAt: '2026-07-18'
  },
  coordinator: {
    id: 'usr_doc_001',
    firstName: 'Dr. Emeka',
    lastName: 'Nwachukwu',
    email: 'dr.emeka@rehabnigeria.org',
    phone: '+234 805 555 0192',
    role: 'coordinator',
    verificationStatus: 'Verified',
    createdAt: '2026-05-10'
  },
  admin: {
    id: 'usr_adm_001',
    firstName: 'Grace',
    lastName: 'Adeleke',
    email: 'admin.grace@rehabnigeria.org',
    phone: '+234 809 111 2233',
    role: 'admin',
    createdAt: '2026-01-01'
  }
};

export const mockConsultations: Consultation[] = [
  {
    id: 'cns_101',
    patientName: 'Chinedu Okonkwo',
    patientId: 'usr_pat_001',
    consultantName: 'Dr. Emeka Nwachukwu',
    consultantId: 'usr_doc_001',
    consultantTitle: 'Consultant Psychiatrist & Medical Lead',
    date: 'Today, 2:00 PM',
    time: '14:00 - 14:45 WAT',
    durationMinutes: 45,
    status: 'Upcoming',
    type: 'Initial Consultation',
    fee: '₦10,000',
    notes: 'Patient completed pre-consultation intake. Discussing baseline history and treatment goals.',
    meetingLink: '/dashboard/consultation-room/cns_101'
  },
  {
    id: 'cns_102',
    patientName: 'Chinedu Okonkwo',
    patientId: 'usr_pat_001',
    consultantName: 'Dr. Folake Adebayo',
    consultantId: 'usr_doc_002',
    consultantTitle: 'Clinical Psychologist',
    date: 'Aug 14, 2026',
    time: '11:00 - 11:45 WAT',
    durationMinutes: 45,
    status: 'Upcoming',
    type: 'Follow-up Counseling',
    fee: '₦10,000',
    meetingLink: '/dashboard/consultation-room/cns_102'
  },
  {
    id: 'cns_100',
    patientName: 'Chinedu Okonkwo',
    patientId: 'usr_pat_001',
    consultantName: 'Dr. Emeka Nwachukwu',
    consultantId: 'usr_doc_001',
    consultantTitle: 'Consultant Psychiatrist',
    date: 'Jul 28, 2026',
    time: '10:00 - 10:45 WAT',
    durationMinutes: 45,
    status: 'Completed',
    type: 'Initial Consultation',
    fee: '₦10,000',
    notes: 'Comprehensive intake reviewed. Patient responded well to supportive counseling outline.'
  },
  {
    id: 'cns_103',
    patientName: 'Ibrahim Bello',
    patientId: 'usr_pat_002',
    consultantName: 'Dr. Emeka Nwachukwu',
    consultantId: 'usr_doc_001',
    consultantTitle: 'Consultant Psychiatrist',
    date: 'Today, 4:30 PM',
    time: '16:30 - 17:15 WAT',
    durationMinutes: 45,
    status: 'Upcoming',
    type: 'Follow-up Counseling',
    fee: '₦10,000',
    meetingLink: '/dashboard/consultation-room/cns_103'
  }
];

export const mockPatients: PatientRecord[] = [
  {
    id: 'usr_pat_001',
    name: 'Chinedu Okonkwo',
    email: 'chinedu.o@example.com',
    phone: '+234 803 123 4567',
    age: 32,
    gender: 'Male',
    location: 'Lagos State',
    reasonForSupport: 'Seeking guidance regarding alcohol dependence and stress-related cravings.',
    substances: ['Alcohol', 'Prescription Sedatives'],
    durationOfConcern: '1 - 2 Years',
    frequency: 'Daily in evening',
    priorSupport: false,
    medicalHistory: 'Mild hypertension. No reported drug allergies.',
    emergencyContactName: 'Amina Okonkwo',
    emergencyContactPhone: '+234 802 987 6543',
    emergencyContactRelation: 'Spouse',
    riskLevel: 'Moderate',
    status: 'Active',
    assignedConsultantId: 'usr_doc_001',
    assignedConsultantName: 'Dr. Emeka Nwachukwu',
    consentGranted: true,
    lastConsultationDate: 'Jul 28, 2026',
    nextAppointmentDate: 'Today, 2:00 PM'
  },
  {
    id: 'usr_pat_002',
    name: 'Ibrahim Bello',
    email: 'ibrahim.b@example.com',
    phone: '+234 806 333 4455',
    age: 26,
    gender: 'Male',
    location: 'Kano State',
    reasonForSupport: 'Family-initiated consultation for codeine syrup dependency.',
    substances: ['Codeine Cough Syrup'],
    durationOfConcern: '6 - 12 Months',
    frequency: 'Multiple times weekly',
    priorSupport: true,
    medicalHistory: 'No major physical ailments.',
    emergencyContactName: 'Fatima Bello',
    emergencyContactPhone: '+234 803 777 8899',
    emergencyContactRelation: 'Mother',
    riskLevel: 'Moderate',
    status: 'Active',
    assignedConsultantId: 'usr_doc_001',
    assignedConsultantName: 'Dr. Emeka Nwachukwu',
    consentGranted: true,
    lastConsultationDate: 'Aug 02, 2026',
    nextAppointmentDate: 'Today, 4:30 PM'
  },
  {
    id: 'usr_pat_003',
    name: 'Blessing Danjuma',
    email: 'blessing.d@example.com',
    phone: '+234 811 222 3344',
    age: 29,
    gender: 'Female',
    location: 'FCT Abuja',
    reasonForSupport: 'Prescription painkiller dependence following surgical procedure.',
    substances: ['Tramadol', 'Opioids'],
    durationOfConcern: '> 2 Years',
    frequency: 'Daily',
    priorSupport: false,
    medicalHistory: 'Chronic lower back pain history.',
    emergencyContactName: 'David Danjuma',
    emergencyContactPhone: '+234 812 345 6789',
    emergencyContactRelation: 'Brother',
    riskLevel: 'High',
    status: 'Active',
    assignedConsultantId: 'usr_doc_001',
    assignedConsultantName: 'Dr. Emeka Nwachukwu',
    consentGranted: true,
    lastConsultationDate: 'Aug 05, 2026',
    nextAppointmentDate: 'Aug 12, 2026'
  }
];

export const mockFamilyLinks: FamilySupportLink[] = [
  {
    id: 'fam_lnk_01',
    familyMemberName: 'Amina Okonkwo',
    familyMemberEmail: 'amina.o@example.com',
    patientName: 'Chinedu Okonkwo',
    relationship: 'Spouse',
    consentStatus: 'Granted',
    nextAppointment: 'Today, 2:00 PM',
    lastUpdated: 'Aug 01, 2026'
  },
  {
    id: 'fam_lnk_02',
    familyMemberName: 'Fatima Bello',
    familyMemberEmail: 'fatima.b@example.com',
    patientName: 'Ibrahim Bello',
    relationship: 'Parent',
    consentStatus: 'Granted',
    nextAppointment: 'Today, 4:30 PM',
    lastUpdated: 'Jul 29, 2026'
  },
  {
    id: 'fam_lnk_03',
    familyMemberName: 'Oluwaseun Thorne',
    familyMemberEmail: 'seun.t@example.com',
    patientName: 'Michael Thorne',
    relationship: 'Sibling',
    consentStatus: 'Pending',
    lastUpdated: 'Aug 08, 2026'
  }
];

export const mockVerifications: CoordinatorVerification[] = [
  {
    id: 'ver_01',
    coordinatorId: 'usr_doc_003',
    name: 'Dr. Tariye Ebiowei',
    email: 'tariye.e@example.com',
    phone: '+234 802 444 1122',
    professionalTitle: 'Addiction Medicine Specialist',
    qualifications: 'MBBS, FWACP (Psychiatry)',
    registrationNumber: 'MDCN/R/64821',
    yearsOfExperience: 9,
    specialization: ['Substance Dependency', 'Detox Protocol', 'Dual Diagnosis'],
    status: 'Pending',
    submittedAt: 'Aug 07, 2026'
  },
  {
    id: 'ver_02',
    coordinatorId: 'usr_doc_004',
    name: 'Kafayat Salami',
    email: 'k.salami@example.com',
    phone: '+234 803 999 8811',
    professionalTitle: 'Certified Addiction Counsellor',
    qualifications: 'M.Sc. Clinical Psychology, ICAP I',
    registrationNumber: 'NAPA/CP/2022/104',
    yearsOfExperience: 6,
    specialization: ['Cognitive Behavioral Therapy', 'Family Counseling'],
    status: 'Under Review',
    submittedAt: 'Aug 05, 2026'
  },
  {
    id: 'ver_00',
    coordinatorId: 'usr_doc_001',
    name: 'Dr. Emeka Nwachukwu',
    email: 'dr.emeka@rehabnigeria.org',
    phone: '+234 805 555 0192',
    professionalTitle: 'Consultant Psychiatrist',
    qualifications: 'MBBS, FWACP (Psychiatry)',
    registrationNumber: 'MDCN/R/42190',
    yearsOfExperience: 14,
    specialization: ['Psychiatry', 'Substance Use Recovery', 'Clinical Governance'],
    status: 'Verified',
    submittedAt: 'May 10, 2026',
    reviewedBy: 'Grace Adeleke (Admin)'
  }
];

export const mockCoordinators = mockVerifications;

export const mockPayments: PaymentRecord[] = [
  {
    id: 'pay_901',
    transactionRef: 'RN-PAY-20260801-9481',
    amount: '₦10,000',
    serviceName: 'Standard Online Consultation Fee',
    date: 'Aug 01, 2026',
    status: 'Paid',
    paymentMethod: 'Card (Paystack)'
  },
  {
    id: 'pay_902',
    transactionRef: 'RN-PAY-20260715-3310',
    amount: '₦10,000',
    serviceName: 'Follow-up Virtual Session',
    date: 'Jul 15, 2026',
    status: 'Paid',
    paymentMethod: 'Bank Transfer'
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif_01',
    title: 'Upcoming Virtual Consultation',
    message: 'Your virtual consultation room with Dr. Emeka Nwachukwu (MDCN Ref: 48910) is open. Scheduled for Today at 2:00 PM WAT.',
    timestamp: '15 mins ago',
    type: 'appointment',
    read: false,
    priority: 'high',
    actionUrl: '/dashboard/consultation-room/cns_101',
    actionText: 'ENTER VIRTUAL ROOM'
  },
  {
    id: 'notif_02',
    title: 'Clinical Care Note Update',
    message: 'Dr. Emeka Nwachukwu published an updated wellness recovery plan and intake summary for review.',
    timestamp: '1 hour ago',
    type: 'alert',
    read: false,
    priority: 'urgent',
    actionUrl: '/dashboard/journey',
    actionText: 'VIEW RECOVERY PLAN'
  },
  {
    id: 'notif_03',
    title: 'Payment Receipt Confirmed',
    message: 'Payment of ₦10,000 for Standard Consultation Fee was received via Paystack (Ref: RN-PAY-20260801-9481).',
    timestamp: '3 hours ago',
    type: 'payment',
    read: true,
    priority: 'medium',
    actionUrl: '/dashboard/payments',
    actionText: 'DOWNLOAD RECEIPT'
  },
  {
    id: 'notif_04',
    title: 'New Encrypted Message',
    message: 'Care Team sent a confidential response regarding family support access permissions.',
    timestamp: 'Yesterday at 4:15 PM',
    type: 'message',
    read: true,
    priority: 'medium',
    actionUrl: '/dashboard/messages',
    actionText: 'OPEN MESSAGES'
  },
  {
    id: 'notif_05',
    title: 'MDCN Verification Approved',
    message: 'Medical credentials for Dr. Folake Adebayo verified successfully by Platform Governance Board.',
    timestamp: '2 days ago',
    type: 'verification',
    read: true,
    priority: 'low',
    actionUrl: '/admin/verification',
    actionText: 'AUDIT VERIFICATION'
  },
  {
    id: 'notif_06',
    title: 'Security & Privacy Audit Notice',
    message: 'Annual HIPAA & NDPR compliance scan completed with zero vulnerabilities detected across all encrypted records.',
    timestamp: '3 days ago',
    type: 'system',
    read: true,
    priority: 'low',
    actionUrl: '/dashboard/settings',
    actionText: 'SECURITY SETTINGS'
  }
];

export const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    participantId: 'usr_doc_001',
    participantName: 'Dr. Emeka Nwachukwu',
    participantRole: 'coordinator',
    lastMessage: 'Good morning Chinedu. I have reviewed your intake details and look forward to our session today at 2:00 PM.',
    lastMessageTimestamp: '10:15 AM',
    unreadCount: 1,
    category: 'Clinical Care'
  },
  {
    id: 'conv_2',
    participantId: 'usr_fam_001',
    participantName: 'Amina Okonkwo',
    participantRole: 'family',
    lastMessage: 'I have logged in and confirmed my family account details.',
    lastMessageTimestamp: 'Yesterday',
    unreadCount: 0,
    category: 'Family Advisory'
  }
];

export const mockMessages: Record<string, Message[]> = {
  conv_1: [
    {
      id: 'msg_01',
      conversationId: 'conv_1',
      senderId: 'usr_pat_001',
      senderName: 'Chinedu Okonkwo',
      senderRole: 'patient',
      recipientId: 'usr_doc_001',
      content: 'Hello Dr. Emeka, I have completed the health background intake form.',
      timestamp: 'Yesterday 3:40 PM',
      read: true
    },
    {
      id: 'msg_02',
      conversationId: 'conv_1',
      senderId: 'usr_doc_001',
      senderName: 'Dr. Emeka Nwachukwu',
      senderRole: 'coordinator',
      recipientId: 'usr_pat_001',
      content: 'Good morning Chinedu. I have reviewed your intake details and look forward to our session today at 2:00 PM.',
      timestamp: 'Today 10:15 AM',
      read: false
    }
  ]
};
