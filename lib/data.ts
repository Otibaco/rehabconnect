import { ChallengeCampaign, ClinicalResource, FAQItem, Professional, ResourceArticle, ServiceItem } from "@/types/type";

export const servicesData: ServiceItem[] = [
  {
    id: 'online-consultation',
    slug: 'online-consultation',
    number: '01',
    title: 'ONLINE REHABILITATION CONSULTATION',
    subtitle: 'Private 1-on-1 virtual clinical consultation with a qualified professional',
    shortDescription: 'A secure, dignified online session providing immediate professional guidance, history intake, and individual recovery pathway planning.',
    fullDescription: 'Our Online Rehabilitation Consultation connects you directly with a qualified healthcare professional from the comfort and privacy of your own space. Designed specifically to overcome stigma, distance, and privacy concerns, this initial 1-on-1 consultation allows you to discuss your history, personal challenges, and recovery goals without judgment. Your consultant will conduct a thorough assessment and recommend tailored next steps.',
    targetAudience: 'Individuals affected by substance use seeking private, professional guidance without visiting a physical clinic.',
    benefits: [
      '100% confidential and private online video environment',
      'Thorough clinical history intake prior to session',
      'Personalized recovery roadmap and recommendations',
      'No physical travel or waiting room exposure required',
      'Guidance on medical detox, therapy, or ongoing online support'
    ],
    process: [
      'Account creation and basic profile setup',
      'Completion of secure background & history onboarding form',
      'Scheduling your consultation time slot',
      'Payment of ₦10,000 consultation fee',
      'Attending private video session with your assigned consultant'
    ],
    fee: '₦10,000',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'substance-use-assessment',
    slug: 'substance-use-assessment',
    number: '02',
    title: 'SUBSTANCE USE ASSESSMENT',
    subtitle: 'Comprehensive evaluation of dependency levels and health factors',
    shortDescription: 'A clinical evaluation tool and consultation focused on understanding the frequency, severity, and underlying drivers of substance dependency.',
    fullDescription: 'Understanding the extent and root causes of substance use is crucial for effective recovery. Our clinical evaluation framework evaluates physical, psychological, and social factors associated with substance use disorders. Conducted by experienced professionals, this assessment provides clarity for individuals and families on the most appropriate level of care.',
    targetAudience: 'Anyone seeking a clear, objective clinical understanding of their relationship with alcohol, pharmaceuticals, or illicit substances.',
    benefits: [
      'Evidence-based assessment methodology',
      'Identification of co-occurring mental health factors',
      'Clear risk categorization and level of care guidance',
      'Compassionate explanation of clinical findings to patient or family',
      'Documentation provided for external medical referral if required'
    ],
    process: [
      'Detailed online onboarding questionnaire',
      'Review by qualified medical consultant',
      'Structured 45-minute clinical evaluation call',
      'Delivery of personalized assessment summary report'
    ],
    fee: 'Included in Consultation',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'follow-up-support',
    slug: 'follow-up-support',
    number: '03',
    title: 'FOLLOW-UP SUPPORT & COUNSELING',
    subtitle: 'Sustained digital check-ins and recovery reinforcement sessions',
    shortDescription: 'Ongoing follow-up consultations to monitor progress, address relapse triggers, and maintain long-term recovery momentum.',
    fullDescription: 'Recovery is an ongoing journey that benefits from continuous care and accountability. Our follow-up support program connects patients with their consultant for scheduled check-ins, progress tracking, coping strategy updates, and crisis prevention. These structured follow-up sessions ensure you never feel alone after your initial consultation.',
    targetAudience: 'Patients who have completed an initial consultation and want ongoing professional accountability and guidance.',
    benefits: [
      'Continuous progress monitoring and goal setting',
      'Identification and management of triggers and cravings',
      'Flexible weekly or bi-weekly video consultation slots',
      'Direct platform messaging for non-emergency inquiries',
      'Long-term lifestyle and mental wellbeing counseling'
    ],
    process: [
      'Schedule follow-up session following initial consultation',
      'Review progress metrics and daily log reflections',
      'Interactive 30-minute counseling video call',
      'Refine recovery plan and assign actionable focus steps'
    ],
    fee: 'Custom Session Rates',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'family-support',
    slug: 'family-support',
    number: '04',
    title: 'FAMILY CONSULTATION & SUPPORT',
    subtitle: 'Guidance for relatives and loved ones seeking help for someone they care about',
    shortDescription: 'Dedicated consultations helping families navigate substance use, establish healthy communication, and initiate support pathways.',
    fullDescription: 'Substance use impacts entire families, leaving loved ones feeling anxious, confused, or unsure of how to help. Our Family Support service allows concerned relatives to consult privately with a professional. Learn how to approach your loved one effectively, recognize warning signs, navigate consent and privacy boundaries, and encourage them toward recovery.',
    targetAudience: 'Parents, spouses, siblings, and guardians concerned about a family member experiencing substance use challenges.',
    benefits: [
      'Private guidance on initiating conversation without triggering conflict',
      'Understanding the medical nature of substance use disorder',
      'Setting healthy boundaries while maintaining loving support',
      'Step-by-step process for initiating a patient onboarding on their behalf',
      'Reduction of family stress, isolation, and helplessness'
    ],
    process: [
      'Family member registers account on behalf of concerned relative',
      'Provides background context on the individual situation',
      'Attends family advisory consultation with a healthcare professional',
      'Receives actionable family strategy and patient invitation protocol'
    ],
    fee: '₦10,000',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'recovery-guidance',
    slug: 'recovery-guidance',
    number: '05',
    title: 'RECOVERY GUIDANCE & LIFESTYLE PLANNING',
    subtitle: 'Holistic rehabilitation roadmaps incorporating wellness and social support',
    shortDescription: 'Comprehensive lifestyle counseling focusing on nutrition, routine building, mental resilience, and community reintegration.',
    fullDescription: 'Rehabilitation extends beyond overcoming physical dependency—it encompasses rebuilding a meaningful, healthy life. Our Recovery Guidance service provides practical lifestyle planning covering daily routines, stress management, sleep hygiene, social support networks, and vocational focus to minimize relapse risks.',
    targetAudience: 'Individuals in early or stable recovery building a structured lifestyle framework.',
    benefits: [
      'Holistic health & routine optimization',
      'Stress management and anxiety reduction techniques',
      'Guidance on rebuilding healthy relationships and community ties',
      'Customized daily habit tracking and accountability'
    ],
    process: [
      'Assessment of current daily habits and stress environments',
      'Co-creation of a personalized 12-week Recovery Lifestyle Plan',
      'Monthly review and routine adjustment consultations'
    ],
    fee: 'Consultation Included',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'
  }
];

export const professionalsData: Professional[] = [
  {
    id: 'consultant-founder-01',
    name: '[CONSULTANT NAME - FOUNDER & MEDICAL DIRECTOR]',
    title: 'Medical Doctor & Rehabilitation Specialist',
    credentials: 'MBBS, FWACP (Psychiatry Candidate / Addiction Medicine Specialist)',
    expertise: ['Addiction Medicine', 'Substance Use Assessment', 'Dual Diagnosis', 'Family Rehabilitation Guidance'],
    bio: 'A passionate Nigerian medical doctor dedicated to breaking down societal stigma and transforming rehabilitation access across Nigeria. With clinical experience in addiction medicine and mental healthcare, the founder established Rehab Nigeria to provide a private, compassionate, digital-first pathway for individuals and families seeking dignified care.',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
    isFounder: true,
    availableForConsultation: true
  },
  {
    id: 'consultant-02-placeholder',
    name: '[QUALIFIED PSYCHOLOGIST / COUNSELLOR]',
    title: 'Clinical Psychologist',
    credentials: 'M.Sc. Clinical Psychology',
    expertise: ['Cognitive Behavioral Therapy (CBT)', 'Motivational Interviewing', 'Relapse Prevention', 'Trauma-Informed Care'],
    bio: 'Specializes in behavioral therapy and trauma recovery for individuals dealing with chemical dependency and emotional triggers. Joins the Rehab Nigeria professional network to deliver patient-centered virtual therapy.',
    image: 'https://images.unsplash.com/photo-1594824813566-7885a3964510?auto=format&fit=crop&q=80&w=800',
    isFounder: false,
    availableForConsultation: true
  },
  {
    id: 'consultant-03-placeholder',
    name: '[ADDICTION COUNSELLOR SPECIALIST]',
    title: 'Certified Addiction Counselor',
    credentials: 'ICRC Certified Addiction Specialist',
    expertise: ['Substance Dependency Counseling', 'Family Systems Counseling', 'Community Support Integration'],
    bio: 'Extensive background in community-based rehabilitation and support group facilitation, helping patients establish strong recovery foundations.',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800',
    isFounder: false,
    availableForConsultation: true
  }
];

export const faqsData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What is Rehab Nigeria?',
    answer: 'Rehab Nigeria is a private digital rehabilitation platform providing accessible, discreet online consultations and recovery guidance for individuals and families affected by substance use across Nigeria.'
  },
  {
    id: 'faq-2',
    category: 'Consultation',
    question: 'How much does an online consultation cost?',
    answer: 'An initial 1-on-1 private online consultation with a qualified Rehab Nigeria consultant costs ₦10,000. This includes pre-consultation background review and a comprehensive clinical video consultation session.'
  },
  {
    id: 'faq-3',
    category: 'Consultation',
    question: 'How does an online consultation work?',
    answer: 'After registering an account and filling out your confidential onboarding history, you select an available consultation slot and complete payment. At your appointment time, you join a secure, private virtual consultation room with your assigned professional.'
  },
  {
    id: 'faq-4',
    category: 'Families',
    question: 'Can I register on behalf of a family member or loved one?',
    answer: 'Yes. Family members and concerned relatives can initiate the registration process and book a Family Consultation to speak with a professional about supporting their loved one and initiating a respectful recovery pathway.'
  },
  {
    id: 'faq-5',
    category: 'Consultation',
    question: 'Who will I speak with during my session?',
    answer: 'You will speak directly with a qualified healthcare professional, such as a licensed medical doctor, clinical psychologist, or certified addiction counsellor within the Rehab Nigeria professional network.'
  },
  {
    id: 'faq-6',
    category: 'Consultation',
    question: 'Is video consultation conducted on the platform?',
    answer: 'Yes. Online consultations take place in a secure, web-based consultation interface accessible via your patient portal once logged in.'
  },
  {
    id: 'faq-7',
    category: 'Privacy',
    question: 'How is my personal and medical information handled?',
    answer: 'We treat privacy and confidentiality with the highest institutional standards. Your profile information, background history, and consultation notes are strictly protected and accessible only to authorized clinical personnel directly involved in your care.'
  },
  {
    id: 'faq-8',
    category: 'Consultation',
    question: 'Can I continue with follow-up sessions after my first meeting?',
    answer: 'Absolutly. Your consultant will recommend a structured follow-up plan based on your needs. You can schedule follow-up sessions seamlessly through the platform.'
  },
  {
    id: 'faq-9',
    category: 'General',
    question: 'Is Rehab Nigeria a replacement for emergency medical care?',
    answer: 'No. Rehab Nigeria provides online rehabilitation consultation and elective counseling. It is NOT an emergency medical service. If someone is experiencing severe drug overdose, acute medical crisis, or imminent self-harm, immediate emergency hospital care must be sought.'
  },
  {
    id: 'faq-10',
    category: 'Payment',
    question: 'What payment methods are accepted for the ₦10,000 consultation?',
    answer: 'We support secure digital payments via major Nigerian debit cards, USSD, and direct bank transfers managed through encrypted payment gateways.'
  }
];

export const resourceArticles: ResourceArticle[] = [
  {
    id: 'art-1',
    number: '01',
    title: 'Understanding Substance Use Disorder as a Medical Condition',
    category: 'Education',
    readTime: '5 min read',
    publishedDate: 'August 2026',
    description: 'Deconstructing societal stigma: Why substance dependency is a health condition that responds to professional medical care rather than moral judgment.',
    content: [
      'Substance Use Disorder (SUD) is a complex medical condition characterized by an inability to control the use of a substance despite negative consequences.',
      'Brain chemistry changes occur over time, making willpower alone insufficient without professional clinical intervention and supportive therapy.',
      'Shifting society from judgment to medical care creates safe spaces where individuals feel empowered to seek help early.'
    ]
  },
  {
    id: 'art-2',
    number: '02',
    title: 'How Families Can Support a Loved One Without Conflict',
    category: 'Family Support',
    readTime: '7 min read',
    publishedDate: 'August 2026',
    description: 'Practical communication techniques for parents, spouses, and siblings seeking to encourage recovery while setting healthy emotional boundaries.',
    content: [
      'Approaching a loved one requires empathy, calm timing, and avoiding confrontational statements.',
      'Expressing care rather than criticism helps lower defensive barriers.',
      'Family support programs provide relatives with the tools to navigate this delicate process gracefully.'
    ]
  },
  {
    id: 'art-3',
    number: '03',
    title: 'When Should Someone Seek Professional Rehabilitation Support?',
    category: 'Recovery',
    readTime: '6 min read',
    publishedDate: 'August 2026',
    description: 'Key indicators that signal it is time to consult an addiction specialist or medical doctor privately.',
    content: [
      'Noticeable impacts on personal relationships, physical health, or career obligations.',
      'Unsuccessful individual attempts to reduce or stop substance use.',
      'Experiencing anxiety, cravings, or mood changes when trying to abstain.'
    ]
  },
  {
    id: 'art-4',
    number: '04',
    title: 'Privacy and Digital Healthcare: Overcoming Stigma Online',
    category: 'Substance Use',
    readTime: '4 min read',
    publishedDate: 'August 2026',
    description: 'How telemedicine and online consultation platforms are breaking geographical and social barriers in Nigerian healthcare.',
    content: [
      'Privacy concerns often prevent individuals from walking into physical rehabilitation centers in their local communities.',
      'Online consultations allow patients to speak with top medical specialists from anywhere in Nigeria without public exposure.',
      'Digital healthcare bridges distance and offers a dignified entry point to care.'
    ]
  },
  {
    id: 'art-5',
    number: '05',
    title: 'Building Resilience & Trigger Management in Recovery',
    category: 'Mental Wellbeing',
    readTime: '8 min read',
    publishedDate: 'August 2026',
    description: 'Actionable strategies for recognizing environmental triggers and developing sustainable coping mechanisms.',
    content: [
      'Identifying emotional stress, social environments, and routine habits that spark cravings.',
      'Developing alternative coping responses through mindfulness, exercise, and structured therapy.',
      'Building a strong digital and offline support system.'
    ]
  }
];

export const socialChallengesData: ChallengeCampaign[] = [
  {
    platform: 'Facebook',
    tagline: 'Change The Conversation — Family & Community Awareness',
    description: 'An educational discussion series focusing on breaking community silence around substance use disorder in Nigeria.',
    howToParticipate: [
      'Follow the official Rehab Nigeria Facebook Page: [OFFICIAL FACEBOOK HANDLE]',
      'Share our weekly educational posts and case study infographics',
      'Engage in respectful live Q&A discussions hosted by medical professionals',
      'Tag 3 friends or family members to help spread evidence-based health awareness'
    ],
    rules: [
      'Strictly maintain respectful, empathetic language at all times',
      'No stigmatizing or offensive comments will be tolerated',
      'Do not post personal contact details or confidential medical stories publicly'
    ],
    prizes: 'Participants with the highest engagement receive sponsored wellness packages and recovery awareness merchandise.',
    hashtag: '#RehabNigeria #ChangeTheConversation #RecoveryIsPossible'
  },
  {
    platform: 'Instagram',
    tagline: 'Voices of Hope — Visual Recovery & Mental Health Stories',
    description: 'A visual video campaign featuring expert tips, myth-busting Reels, and uplifting recovery narratives.',
    howToParticipate: [
      'Follow @[OFFICIAL INSTAGRAM HANDLE]',
      'Repost official campaign Reels to your Instagram Story',
      'Create a 30-second video sharing why compassionate healthcare access matters in Nigeria using #RehabNigeria',
      'Join our Instagram Live sessions with Rehab Nigeria medical consultants'
    ],
    rules: [
      'Video content must align with compassionate, non-stigmatizing community guidelines',
      'Ensure clear audio and positive visual messaging',
      'Must tag @[OFFICIAL INSTAGRAM HANDLE] in all entry posts'
    ],
    prizes: 'Featured spotlight on Rehab Nigeria official channels and health consultation vouchers.',
    hashtag: '#RehabNigeriaVoices #BreakTheStigma #DigitalHealthNG'
  },
  {
    platform: 'TikTok',
    tagline: '#StartTheConversation Challenge — Youth & Student Awareness',
    description: 'A creative short-form video movement targeted at young adults to educate on pharmaceutical & substance awareness.',
    howToParticipate: [
      'Use the official Rehab Nigeria audio track on TikTok',
      'Record an educational duet or creative video explaining one myth about substance use',
      'Include the official hashtag #StartTheConversation in your caption',
      'Tag official account: @[OFFICIAL TIKTOK HANDLE]'
    ],
    rules: [
      'No depiction or encouragement of actual substance consumption',
      'Focus purely on education, support, and empathy',
      'Submissions must be original content'
    ],
    prizes: 'Top creative creators win digital health gifts and educational grants.',
    hashtag: '#StartTheConversation #RehabNigeria #YouthHealthNG'
  },
  {
    platform: 'X (Twitter)',
    tagline: '#RehabNigeriaSpaces — Weekly Expert Twitter Spaces',
    description: 'Real-time audio dialogues discussing substance use disorders, health policy, family support, and telemedicine solutions.',
    howToParticipate: [
      'Follow @[OFFICIAL X HANDLE]',
      'Set reminders for weekly Friday Twitter Spaces at 7:00 PM WAT',
      'Tweet your questions during the space using #RehabNigeriaSpaces',
      'Retweet official infographics and summary threads'
    ],
    rules: [
      'Keep discussion constructive and focused on medical/social support',
      'Adhere to platform community standards'
    ],
    hashtag: '#RehabNigeriaSpaces #HealthTechAfrica #RecoverySupport'
  }
];

// here

import {
  UserProfile,
  PatientAssessmentData,
  Appointment,
  PaymentTransaction,
  AppNotification,
  ConsultationSummary,
  PatientCareJourney,
} from '@/types/type';

export const DEMO_PATIENT_MYSELF: UserProfile = {
  id: 'usr_patient_1',
  name: 'Sarah Jenkins',
  email: 'sarah.j@example.com',
  phone: '+234 803 123 4567',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  role: 'patient',
  onboardingTarget: 'myself',
  careTypePreference: 'Physical & Neurological Rehabilitation',
  urgencyLevel: 'Within 1-2 weeks',
  assessmentStatus: 'in_progress',
  assessmentProgress: 40,
  hasActiveConsultation: true,
  assignedCoordinatorId: 'coord_1',
  createdAt: '2026-07-28',
};

export const DEMO_PATIENT_FAMILY: UserProfile = {
  id: 'usr_patient_2',
  name: 'David Okafor',
  email: 'david.okafor@example.com',
  phone: '+234 802 987 6543',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  role: 'family',
  onboardingTarget: 'family',
  relationshipToPatient: 'Parent (Father, 68)',
  careTypePreference: 'Post-Stroke Physical Rehabilitation',
  urgencyLevel: 'As soon as possible',
  assessmentStatus: 'completed',
  assessmentProgress: 100,
  hasActiveConsultation: true,
  assignedCoordinatorId: 'coord_1',
  supportedPerson: {
    name: 'Chief Chukwuemeka Okafor',
    relationship: 'Father (Age 68)',
    age: 68,
    condition: 'Post-Ischemic Stroke & Hemiparesis Rehabilitation',
    admissionStatus: 'in_treatment',
    assignedCentre: 'Apex Neuro & Spine Rehabilitation Institute, Abuja',
    lastUpdateDate: 'Yesterday at 4:30 PM',
    latestNote: 'Physical therapy session showed 15% improvement in left arm mobility. Dr. Amara reviewed speech exercises.',
    progressScore: 68,
  },
  createdAt: '2026-07-30',
};

export const DEMO_COORDINATOR: UserProfile = {
  id: 'usr_coord_1',
  name: 'Dr. Amara Okafor',
  email: 'amara.okafor@rehabnigeria.org',
  phone: '+234 801 555 0192',
  avatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=400&q=80',
  role: 'coordinator',
  assessmentStatus: 'completed',
  assessmentProgress: 100,
  hasActiveConsultation: true,
  createdAt: '2025-11-15',
};

export const DEMO_ADMIN: UserProfile = {
  id: 'usr_admin_1',
  name: 'Victoria Adeyemi',
  email: 'admin@rehabnigeria.org',
  phone: '+234 800 000 9000',
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  role: 'admin',
  assessmentStatus: 'completed',
  assessmentProgress: 100,
  hasActiveConsultation: false,
  createdAt: '2025-01-01',
};

export const MOCK_ASSESSMENTS: PatientAssessmentData[] = [
  {
    id: 'asm_101',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    supportCategory: 'Physical & Neurological Rehab',
    primaryCondition: 'Post-Surgical Knee Reconstruction & Spinal Therapy',
    onsetDuration: '3-6 months',
    previousTreatments: ['Outpatient Physical Therapy', 'Pain Management Protocols'],
    mobilityLevel: 'Partial mobility with crutches',
    rehabGoals: ['Restore full weight-bearing walking', 'Reduce chronic knee swelling', 'Return to daily activities'],
    preferredLocation: 'Lagos Island / Victoria Island',
    budgetOrInsurance: 'Private Health Insurance + Out-of-Pocket',
    additionalNotes: 'Patient prefers quiet inpatient environment with hydrotherapy access.',
    submittedAt: '2026-07-29T10:30:00Z',
    status: 'matched',
  },
  {
    id: 'asm_102',
    patientId: 'usr_patient_2',
    patientName: 'David Okafor (for Father)',
    supportCategory: 'Post-Stroke Recovery',
    primaryCondition: 'Ischemic Stroke with mild hemiparesis',
    onsetDuration: 'Less than 1 month',
    previousTreatments: ['Acute Hospital Care', 'Neurology Evaluation'],
    mobilityLevel: 'Requires wheelchair assistance',
    rehabGoals: ['Speech recovery', 'Upper extremity motor control improvement'],
    preferredLocation: 'Ikeja / GRA',
    budgetOrInsurance: 'Self-Funded Family Care Account',
    additionalNotes: 'Urgent placement required within 48 hours following hospital discharge.',
    submittedAt: '2026-07-31T14:15:00Z',
    status: 'under_review',
  },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt_501',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coordinatorId: 'coord_1',
    coordinatorName: 'Dr. Amara Okafor',
    coordinatorTitle: 'Senior Neurological & Physical Care Lead',
    coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=400&q=80',
    type: 'video',
    date: '2026-08-03',
    timeSlot: '10:30 AM',
    durationMinutes: 45,
    fee: 10000,
    currency: 'NGN',
    status: 'scheduled',
    meetingLink: 'https://meet.rehabconnect.org/room-sarah-amara',
    notes: 'Pre-assessment reviewed. Discussing inpatient intake options at HopeHaven Sanctuary.',
  },
  {
    id: 'apt_502',
    patientId: 'usr_patient_2',
    patientName: 'David Okafor',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coordinatorId: 'coord_2',
    coordinatorName: 'Marcus Vance',
    coordinatorTitle: 'Behavioral & Trauma Recovery Director',
    coordinatorAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    type: 'voice',
    date: '2026-08-04',
    timeSlot: '02:00 PM',
    durationMinutes: 30,
    fee: 10000,
    currency: 'NGN',
    status: 'scheduled',
    meetingLink: 'https://voice.rehabconnect.org/call-david-marcus',
    notes: 'Family guidance intake session regarding stroke rehabilitation pathways.',
  },
  {
    id: 'apt_500',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coordinatorId: 'coord_1',
    coordinatorName: 'Dr. Amara Okafor',
    coordinatorTitle: 'Senior Neurological & Physical Care Lead',
    coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=400&q=80',
    type: 'chat',
    date: '2026-07-29',
    timeSlot: '11:00 AM',
    durationMinutes: 30,
    fee: 10000,
    currency: 'NGN',
    status: 'completed',
    summaryId: 'sum_301',
  },
];

export const MOCK_PAYMENTS: PaymentTransaction[] = [
  {
    id: 'pay_901',
    reference: 'RC-PAY-20260729-8472',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    coordinatorName: 'Dr. Amara Okafor',
    amount: 10000,
    currency: 'NGN',
    paymentMethod: 'card',
    status: 'successful',
    date: '2026-07-29 10:45 AM',
    consultationType: 'chat',
  },
  {
    id: 'pay_902',
    reference: 'RC-PAY-20260801-1923',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    coordinatorName: 'Dr. Amara Okafor',
    amount: 10000,
    currency: 'NGN',
    paymentMethod: 'card',
    status: 'successful',
    date: '2026-08-01 04:12 PM',
    consultationType: 'video',
  },
  {
    id: 'pay_903',
    reference: 'RC-PAY-20260802-5531',
    patientId: 'usr_patient_2',
    patientName: 'David Okafor',
    coordinatorName: 'Marcus Vance',
    amount: 10000,
    currency: 'NGN',
    paymentMethod: 'bank_transfer',
    status: 'successful',
    date: '2026-08-02 09:30 AM',
    consultationType: 'voice',
  },
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif_1',
    userId: 'usr_patient_1',
    title: 'Consultation Confirmed',
    message: 'Your video consultation with Dr. Amara Okafor is confirmed for Aug 3 at 10:30 AM.',
    type: 'success',
    read: false,
    timestamp: '10 minutes ago',
    actionUrl: '/patient/dashboard',
  },
  {
    id: 'notif_2',
    userId: 'usr_patient_1',
    title: 'Assessment Received',
    message: 'Your rehabilitation assessment has been reviewed by your Care Lead.',
    type: 'info',
    read: true,
    timestamp: '2 hours ago',
    actionUrl: '/patient/assessment',
  },
  {
    id: 'notif_3',
    userId: 'usr_coord_1',
    title: 'New Patient Assessment',
    message: 'Sarah Jenkins completed a physical rehabilitation assessment needing review.',
    type: 'reminder',
    read: false,
    timestamp: '1 hour ago',
    actionUrl: '/coordinator/patients',
  },
];

export const MOCK_SUMMARIES: ConsultationSummary[] = [
  {
    id: 'sum_301',
    appointmentId: 'apt_500',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    coordinatorName: 'Dr. Amara Okafor',
    date: 'July 29, 2026',
    status: 'completed',
    mainConcerns: 'Post-operative knee swelling, stair climbing instability, and transition from acute care to structured hydrotherapy.',
    clinicalObservations: 'Patient exhibits high recovery motivation with mild localized swelling. Responding well to conservative ice protocol.',
    discussionPoints: [
      'Reviewed post-operative knee reconstructive MRI scans and surgeon mobility notes.',
      'Evaluated patient concerns regarding stairs navigation and swelling.',
      'Identified top accredited inpatient hydrotherapy facilities in Victoria Island.',
    ],
    findingsAndAssessment: 'Right knee flexion at 85 degrees with mild joint effusion. Safe for gentle isometric loading and supervised aquatic gait training.',
    recommendations: [
      'Begin Stage 02 structured assessment protocol.',
      'Maintain daily quadriceps activation exercises (3x daily, 15 reps).',
      'Follow ice compression protocol (20 mins post-exercise).',
    ],
    nextStep: 'Complete specialized mobility assessment worksheet and attend Assessment review session.',
    clientFacingSummary: 'Sarah had a productive initial consultation. Her surgical knee is healing on track. We agreed on commencing formal recovery planning with hydrotherapy targets.',
    followUpRequired: true,
    followUpDate: 'August 03, 2026',
    journeyStageUpdatedTo: 2,
    recommendedResources: ['Post-Op Knee Recovery Protocol (PDF)', 'Aquatic Gait Video Routine'],
    recommendedFacilities: ['HopeHaven Recovery Sanctuary', 'St. Victoria Neuro-Rehab Campus'],
    createdAt: '2026-07-29T11:45:00Z',
  },
  {
    id: 'sum_302',
    appointmentId: 'apt_502',
    patientId: 'usr_patient_2',
    patientName: 'Chief Chukwuemeka Okafor (David Okafor - Son)',
    coordinatorName: 'Dr. Amara Okafor',
    date: 'August 02, 2026',
    status: 'completed',
    mainConcerns: 'Family consultation regarding ischemic stroke aftermath, left-side hemiparesis, and caregiver home preparation.',
    findingsAndAssessment: 'Family is well-organized. Patient is 4 weeks post-stroke with recovering speech clarity and mild left upper extremity contracture.',
    recommendations: [
      'Initiate combined tele-physiotherapy and speech exercises.',
      'Provide family caregiver fatigue relief resources and home safety checklist.',
      'Schedule follow-up review in 10 days.',
    ],
    nextStep: 'Family to review home ergonomics guide and start daily assisted range-of-motion routine.',
    clientFacingSummary: 'Consulted with David regarding his father Chief Chukwuemeka. Outlined neuro-rehabilitation trajectory and confirmed home safety adaptation plan.',
    followUpRequired: true,
    followUpDate: 'August 12, 2026',
    journeyStageUpdatedTo: 3,
    recommendedResources: ['Stroke Family Caregiver Guide', 'Home Safety Adaptation Checklist'],
    createdAt: '2026-08-02T15:00:00Z',
  },
];

export const INITIAL_PATIENT_JOURNEY: PatientCareJourney = {
  patientId: 'usr_patient_1',
  patientName: 'Sarah Jenkins',
  currentStage: 2,
  overallStatus: 'Assessment Active',
  latestUpdate: 'Dr. Amara completed the Initial Consultation and advanced your journey to Step 2 (Assessment).',
  latestUpdateDate: 'July 29, 2026 at 11:45 AM',
  nextStep: 'Attend scheduled Video Consultation on Aug 3 at 10:30 AM to finalize your Recovery Plan.',
  assignedCoordinatorName: 'Dr. Amara Okafor',
  stages: [
    {
      stageNumber: 1,
      stageCode: '01_initial_consultation',
      title: '01 — Initial Consultation',
      subtitle: 'Clinical intake and goals review with Care Coordinator',
      status: 'completed',
      completedDate: 'July 29, 2026',
      coordinatorNote: 'Completed initial clinical review. Clear understanding of post-op surgical history.',
    },
    {
      stageNumber: 2,
      stageCode: '02_assessment',
      title: '02 — Assessment',
      subtitle: 'Comprehensive mobility, functional capacity & pain evaluation',
      status: 'in_progress',
      actionRequired: 'Upcoming video consultation scheduled for August 3, 2026',
      coordinatorNote: 'Assessment findings reviewed. Next: formulate recovery milestones.',
    },
    {
      stageNumber: 3,
      stageCode: '03_recovery_planning',
      title: '03 — Recovery Planning',
      subtitle: 'Tailored rehabilitation protocol, exercise regime & facility matching',
      status: 'pending',
      coordinatorNote: 'Will be activated following completion of Stage 02 Assessment.',
    },
    {
      stageNumber: 4,
      stageCode: '04_followup_support',
      title: '04 — Follow-up Support',
      subtitle: 'Periodic coordinator check-ins, protocol adjustments & direct chat',
      status: 'pending',
    },
    {
      stageNumber: 5,
      stageCode: '05_ongoing_care',
      title: '05 — Ongoing Care',
      subtitle: 'Long-term wellness maintenance and relapse prevention',
      status: 'pending',
    },
  ],
};

export const INITIAL_FAMILY_JOURNEY: PatientCareJourney = {
  patientId: 'usr_patient_2',
  patientName: 'Chief Chukwuemeka Okafor',
  currentStage: 3,
  overallStatus: 'Plan Formulated',
  latestUpdate: 'Dr. Amara approved the Stage 03 Recovery Plan for physical & speech rehabilitation.',
  latestUpdateDate: 'August 02, 2026 at 3:00 PM',
  nextStep: 'Family to review daily assisted exercise guide and attend follow-up check-in.',
  assignedCoordinatorName: 'Dr. Amara Okafor',
  stages: [
    {
      stageNumber: 1,
      stageCode: '01_initial_consultation',
      title: '01 — Initial Consultation',
      subtitle: 'Family intake and baseline patient case evaluation',
      status: 'completed',
      completedDate: 'July 31, 2026',
      coordinatorNote: 'David provided thorough hospital discharge notes and stroke onset timeline.',
    },
    {
      stageNumber: 2,
      stageCode: '02_assessment',
      title: '02 — Assessment',
      subtitle: 'Detailed neurological hemiparesis and speech review',
      status: 'completed',
      completedDate: 'August 02, 2026',
      coordinatorNote: 'Assessment completed with family. Left arm motor mobility identified as priority.',
    },
    {
      stageNumber: 3,
      stageCode: '03_recovery_planning',
      title: '03 — Recovery Planning',
      subtitle: 'Home rehabilitation schedule + caregiver guidance protocol',
      status: 'in_progress',
      actionRequired: 'Active home protocol in progress. Regular check-ins via chat.',
      coordinatorNote: 'Care plan deployed. Family is actively assisting with daily exercises.',
    },
    {
      stageNumber: 4,
      stageCode: '04_followup_support',
      title: '04 — Follow-up Support',
      subtitle: 'Bi-weekly tele-review with Care Coordinator',
      status: 'pending',
    },
    {
      stageNumber: 5,
      stageCode: '05_ongoing_care',
      title: '05 — Ongoing Care',
      subtitle: 'Sustained independence and outpatient wellness',
      status: 'pending',
    },
  ],
};

export const MOCK_COORDINATOR_PATIENTS = [
  {
    id: 'usr_patient_1',
    name: 'Sarah Jenkins',
    age: 34,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    email: 'sarah.j@example.com',
    phone: '+234 803 123 4567',
    condition: 'Post-Surgical Knee Reconstruction & Spinal Therapy',
    category: 'Physical Rehabilitation',
    careStatus: 'Assessment Complete',
    journeyStage: 2,
    lastConsultation: 'July 29, 2026',
    nextConsultation: 'August 03, 2026 (10:30 AM)',
    unreadMessagesCount: 1,
    primaryContactType: 'patient',
    clinicalNotes: 'Patient recovering well. Needs hydrotherapy placement support in Lagos.',
    rehabGoals: ['Independent stair navigation', 'Return to full daily walking without crutches', 'Pain score below 2/10'],
  },
  {
    id: 'usr_patient_2',
    name: 'Chief Chukwuemeka Okafor',
    age: 68,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    email: 'david.okafor@example.com',
    phone: '+234 802 987 6543',
    condition: 'Post-Ischemic Stroke & Left Hemiparesis',
    category: 'Neurological Recovery',
    careStatus: 'Active Plan',
    journeyStage: 3,
    lastConsultation: 'August 02, 2026',
    nextConsultation: 'August 12, 2026 (02:00 PM)',
    unreadMessagesCount: 2,
    primaryContactType: 'family',
    familyContactName: 'David Okafor',
    familyRelationship: 'Son (Primary Caregiver)',
    clinicalNotes: 'Family is highly committed. Father showing 15% motor gain in left fingers.',
    rehabGoals: ['Upper extremity grasp and release', 'Assisted standing balance', 'Clear conversational speech'],
  },
  {
    id: 'usr_patient_3',
    name: 'Ibrahim Danjuma',
    age: 29,
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    email: 'ibrahim.d@example.com',
    phone: '+234 809 333 4455',
    condition: 'Substance Dependency & Behavioral Wellness',
    category: 'Addiction Recovery',
    careStatus: 'Intake Completed',
    journeyStage: 1,
    lastConsultation: 'August 01, 2026',
    nextConsultation: 'August 05, 2026 (11:00 AM)',
    unreadMessagesCount: 0,
    primaryContactType: 'patient',
    clinicalNotes: 'Initial consultation completed. Formulating outpatient detox and cognitive therapy.',
    rehabGoals: ['90-day sobriety milestone', 'Daily mindfulness engagement', 'Cognitive restructuring'],
  },
  {
    id: 'usr_patient_4',
    name: 'Mrs. Folashade Adeleke',
    age: 52,
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'fola.adeleke@example.com',
    phone: '+234 802 111 8899',
    condition: 'Chronic Lumbar Radiculopathy & Post-Accident Trauma',
    category: 'Spinal Rehabilitation',
    careStatus: 'In Recovery',
    journeyStage: 4,
    lastConsultation: 'July 25, 2026',
    nextConsultation: 'August 08, 2026 (03:30 PM)',
    unreadMessagesCount: 0,
    primaryContactType: 'patient',
    clinicalNotes: 'Core strengthening exercises established. Pain reduced by 40% from baseline.',
    rehabGoals: ['Core stability', 'Walking 5,000 steps pain-free', 'Ergonomic work posture'],
  },
];

export const MOCK_FOLLOW_UPS = [
  {
    id: 'flw_1',
    patientId: 'usr_patient_1',
    patientName: 'Sarah Jenkins',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    contactRole: 'patient' as const,
    targetDate: 'August 03, 2026',
    reason: 'Stage 02 Assessment Review & Hydrotherapy Placement',
    status: 'scheduled' as const,
    priority: 'high' as const,
    journeyStage: '02 — Assessment',
    lastConsultationDate: 'July 29, 2026',
    notes: 'Confirm if surgeon approved weight-bearing hydrotherapy exercises.',
  },
  {
    id: 'flw_2',
    patientId: 'usr_patient_2',
    patientName: 'Chief Chukwuemeka Okafor',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    contactRole: 'family' as const,
    contactPersonName: 'David Okafor (Son)',
    targetDate: 'August 12, 2026',
    reason: 'Stroke Motor Milestone & Caregiver Burnout Check-in',
    status: 'pending' as const,
    priority: 'urgent' as const,
    journeyStage: '03 — Recovery Planning',
    lastConsultationDate: 'August 02, 2026',
    notes: 'Assess left arm range of motion progress and family support network.',
  },
  {
    id: 'flw_3',
    patientId: 'usr_patient_3',
    patientName: 'Ibrahim Danjuma',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    contactRole: 'patient' as const,
    targetDate: 'August 05, 2026',
    reason: 'Follow-up on Behavioral Recovery Journal & Assessment',
    status: 'pending' as const,
    priority: 'routine' as const,
    journeyStage: '01 — Initial Consultation',
    lastConsultationDate: 'August 01, 2026',
    notes: 'Verify completion of trigger identification worksheet.',
  },
];

export const MOCK_FAMILY_RESOURCES = [
  {
    id: 'fam_res_1',
    title: 'Supporting a Loved One Through Stroke Recovery',
    category: 'Family Guide',
    format: 'PDF Guide',
    readTime: '8 min read',
    description: 'Practical clinical insights on navigating speech challenges, emotional changes, and mobility routines safely at home.',
    highlight: 'Includes home safety adaptation checklist.',
  },
  {
    id: 'fam_res_2',
    title: 'Preventing Caregiver Burnout: A Practical Roadmap',
    category: 'Caregiver Wellness',
    format: 'Therapy Worksheet',
    readTime: '6 min read',
    description: 'Evidence-based strategies to manage emotional fatigue, set healthy care boundaries, and maintain your own wellbeing.',
    highlight: 'Self-assessment fatigue meter included.',
  },
  {
    id: 'fam_res_3',
    title: 'Effective Communication During Neurological Rehab',
    category: 'Communication Guidance',
    format: 'Video Guide',
    readTime: '12 min video',
    description: 'How to support speech therapy, avoid cognitive frustration, and celebrate small daily communication milestones.',
    highlight: 'Demonstrations by Dr. Amara Okafor.',
  },
  {
    id: 'fam_res_4',
    title: 'What Families Should Expect: The 5 Stages of Recovery',
    category: 'Recovery Education',
    format: 'Infographic Guide',
    readTime: '5 min read',
    description: 'A realistic overview of the recovery trajectory from initial assessment to sustained ongoing care in Nigeria.',
    highlight: 'Milestone tracking markers for home care.',
  },
];

export const MOCK_CONVERSATIONS = [
  {
    id: 'conv_1',
    participantId: 'usr_patient_1',
    participantName: 'Sarah Jenkins',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    participantRole: 'patient' as const,
    currentJourneyStage: '02 — Assessment',
    lastConsultationDate: 'July 29, 2026',
    nextConsultationDate: 'August 03, 2026 at 10:30 AM',
    latestCareUpdate: 'Initial Consultation completed. Moving to Stage 02 Assessment.',
    unreadCount: 1,
    messages: [
      {
        id: 'msg_1',
        senderId: 'usr_coord_1',
        senderName: 'Dr. Amara Okafor',
        senderRole: 'Care Coordinator',
        receiverId: 'usr_patient_1',
        text: 'Hello Sarah, welcome to Rehab Nigeria. I reviewed your knee surgery records. Please make sure to do the gentle quadriceps quad-sets 3 times daily.',
        timestamp: 'July 29, 2026 • 12:15 PM',
      },
      {
        id: 'msg_2',
        senderId: 'usr_patient_1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Patient',
        receiverId: 'usr_coord_1',
        text: 'Thank you Dr. Amara! The swelling went down noticeably after following the ice schedule. Looking forward to our video visit on Monday.',
        timestamp: 'Yesterday • 4:20 PM',
      },
      {
        id: 'msg_3',
        senderId: 'usr_patient_1',
        senderName: 'Sarah Jenkins',
        senderRole: 'Patient',
        receiverId: 'usr_coord_1',
        text: 'Quick question: Should I wear a light compression sleeve when doing the seated heel slides?',
        timestamp: 'Today • 09:14 AM',
      },
    ],
  },
  {
    id: 'conv_2',
    participantId: 'usr_patient_2',
    participantName: 'David Okafor',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    participantRole: 'family' as const,
    relatedPatientName: 'Chief Chukwuemeka Okafor (Father)',
    relationship: 'Son & Primary Caregiver',
    currentJourneyStage: '03 — Recovery Planning',
    lastConsultationDate: 'August 02, 2026',
    nextConsultationDate: 'August 12, 2026 at 02:00 PM',
    latestCareUpdate: 'Recovery Plan approved. Home exercises active.',
    unreadCount: 2,
    messages: [
      {
        id: 'msg_f1',
        senderId: 'usr_coord_1',
        senderName: 'Dr. Amara Okafor',
        senderRole: 'Care Coordinator',
        receiverId: 'usr_patient_2',
        text: 'Good afternoon David. Thank you for attending our family intake call. Chief Chukwuemeka is in very good hands. How was his morning assisted walk?',
        timestamp: 'August 02, 2026 • 04:30 PM',
      },
      {
        id: 'msg_f2',
        senderId: 'usr_patient_2',
        senderName: 'David Okafor',
        senderRole: 'Family Member',
        receiverId: 'usr_coord_1',
        text: 'Dr. Amara, he was able to stand for 4 minutes with minimal support! His mood is also noticeably higher since we started following your structured schedule.',
        timestamp: 'Yesterday • 6:10 PM',
      },
      {
        id: 'msg_f3',
        senderId: 'usr_patient_2',
        senderName: 'David Okafor',
        senderRole: 'Family Member',
        receiverId: 'usr_coord_1',
        text: 'We also reviewed the Family Guide on caregiver rest. My sister will take turns with me starting tomorrow.',
        timestamp: 'Today • 08:30 AM',
      },
    ],
  },
];

export const MOCK_ADMIN_STATS = {
  totalPatients: 1420,
  activeCoordinators: 28,
  totalConsultations: 3850,
  monthlyRevenueNGN: 38500000,
  pendingAssessments: 14,
  upcomingAppointments: 62,
  rehabCentresPartnered: 45,
};

export const MOCK_CLINICAL_RESOURCES: ClinicalResource[] = [
  {
    id: 'res-1',
    title: 'Post-Stroke Upper Extremity Motor Re-training Protocol',
    category: 'Neuro-Rehab',
    format: 'PDF Guide',
    durationOrPages: '14 Pages • Illustrated Drills',
    description: 'Evidence-based digital guide for restoring fine motor control, grip strength, and arm elevation from home.',
    prescribedCount: 184,
  },
  {
    id: 'res-2',
    title: 'Cognitive Behavioral Craving Prevention & Trigger Mapping',
    category: 'Addiction Recovery',
    format: 'Therapy Worksheet',
    durationOrPages: '8 Pages • Interactive Worksheet',
    description: 'Psychological framework for identifying stress triggers, establishing emergency pause habits, and managing cravings.',
    prescribedCount: 220,
  },
  {
    id: 'res-3',
    title: 'Interactive Biomechanical Knee & Spinal Alignment Routine',
    category: 'Tele-Physiotherapy',
    format: 'Video Routine',
    durationOrPages: '22 Mins • HD Video',
    description: 'Doctor-guided daily movement session focusing on joint decompression, hamstring elasticity, and core stability.',
    prescribedCount: 310,
  },
  {
    id: 'res-4',
    title: 'Circadian Sleep Optimization & Cortisol Reduction Plan',
    category: 'Cognitive Wellness',
    format: 'PDF Guide',
    durationOrPages: '6 Pages • Clinical Protocol',
    description: 'Medical recommendations for restoring REM sleep quality, reducing neuro-inflammation, and calming the central nervous system.',
    prescribedCount: 145,
  },
  {
    id: 'res-5',
    title: 'Anti-Inflammatory Neuro-Nutritional Recovery Roadmap',
    category: 'Nutrition & Lifestyle',
    format: 'PDF Guide',
    durationOrPages: '10 Pages • Meal Guide',
    description: 'Dietary guidelines rich in Omega-3s, antioxidants, and micronutrients designed to support neurogenesis during rehab.',
    prescribedCount: 195,
  },
];