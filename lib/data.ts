import { ChallengeCampaign, FAQItem, Professional, ResourceArticle, ServiceItem } from "@/types/type";

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
