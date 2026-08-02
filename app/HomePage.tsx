'use client'
import React from 'react';
import { FadeIn } from '../components/animations/FadeIn';
import { StaggerContainer } from '../components/animations/StaggerContainer';
import { TestimonialCarousel } from '../components/ui/TestimonialCarousel';
import { RehabCentreCard } from '../components/ui/RehabCentreCard';
import { CoordinatorCard } from '../components/ui/CoordinatorCard';
import { FAQAccordion } from '../components/ui/FAQAccordion';
import { HeroParallaxMedia } from '../components/ui/HeroParallaxMedia';
import {
  Sparkles,
  ShieldCheck,
  ArrowRight,
  HeartHandshake,
  Users,
  Building2,
  CheckCircle2,
  Clock,
  PhoneCall,
  Activity,
  Award,
  Lock,
  KeyRound,
  LayoutDashboard,
} from 'lucide-react';
import { CARE_COORDINATORS, FAQS, REHAB_CENTRES, STATS } from '@/lib/data/mockData';
import { useRouter } from 'next/navigation';

export const HomePage: React.FC = () => {
  const router = useRouter();
  const [activeModal, setActiveModal] = React.useState<string | null>(null);

  function openModal(type: string): void {
    setActiveModal(type);
  }

  function closeModal(): void {
    setActiveModal(null);
  }

  return (
    <div className="space-y-24 md:space-y-32 pb-20 transition-colors duration-300">
      {/* 1. Parallax Hero Section with Auto-Playing Background Video */}
      <HeroParallaxMedia
        mediaType="video"
        videoUrl="https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patients-arm-42934-large.mp4"
        badgeText="Accredited Healthcare & Rehabilitation Network"
        title={
          <span>
            Finding the right path <br />
            to recovery <span className="text-teal-400">starts here.</span>
          </span>
        }
        subtitle="RehabConnect helps individuals and families connect with professional rehabilitation support, compassionate Care Coordinators, and verified rehabilitation centres."
        primaryCtaText="Start Confidential Assessment"
        onPrimaryCtaClick={() => openModal('assessment')}
        secondaryCtaText="Explore Partner Facilities"
        onSecondaryCtaClick={() => router.push('/rehabilitation-centres')}
      />

      {/* Interactive Quick Tools Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => router.push('/referral-portal')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-teal-500/40 transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 group-hover:scale-105 transition-transform">
                <KeyRound className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  Referral Verification Portal
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track or verify a digital referral code (REF-XXXX) instantly.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
          </button>

          <button
            onClick={() => router.push('/portal-dashboard')}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl hover:border-teal-500/40 transition-all text-left flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/20 group-hover:scale-105 transition-transform">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                  System Architecture Preview
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Explore Patient, Coordinator, Rehab, and Admin views.
                </p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-500 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </section>

      {/* 2. Trust / Credibility Marquee & Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-6 md:p-8 shadow-sm text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
              Verified Partnerships & Clinical Standards Compliance
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center">
              {[
                { label: 'JCI Accredited Network', icon: Award },
                { label: 'Ministry of Health Standards', icon: ShieldCheck },
                { label: 'Encrypted Tele-Consults', icon: Lock },
                { label: '24/7 Care Coordinator Dispatch', icon: PhoneCall },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-center justify-center gap-2.5 text-slate-700 dark:text-slate-300 font-heading font-semibold text-sm">
                    <IconComponent className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 3. Problem & Solution Split Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Problem Card */}
          <FadeIn direction="right">
            <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-10 relative overflow-hidden shadow-xl border border-slate-800">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold mb-4 border border-rose-500/30">
                <span>The Challenge</span>
              </div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-white mb-4">
                Navigating rehabilitation alone can feel overwhelming.
              </h2>

              <ul className="space-y-3.5 text-sm text-slate-300">
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">✕</div>
                  <span>Unverified facilities making misleading recovery promises online.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">✕</div>
                  <span>Unclear pricing and hidden facility fees causing financial stress.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">✕</div>
                  <span>Fragmented communication between hospital discharge and rehab admission.</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          {/* Solution Card */}
          <FadeIn direction="left">
            <div className="rounded-3xl bg-gradient-to-br from-teal-900 via-teal-950 to-slate-900 text-white p-8 md:p-10 relative overflow-hidden shadow-xl border border-teal-500/30">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The RehabConnect Solution</span>
              </div>

              <h2 className="font-heading font-bold text-2xl md:text-3xl tracking-tight text-white mb-4">
                Structured clinical guidance every step of the way.
              </h2>

              <ul className="space-y-3.5 text-sm text-teal-100">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Dedicated Care Coordinators managing clinical evaluation & family support.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Transparent, audited rehab options verified for accreditation and safety.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <span>Seamless referral tracking ensuring zero delays in patient care transfer.</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 4. Animated How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-semibold">
              <Clock className="w-4 h-4" />
              <span>Simple 5-Step Recovery Pathway</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight mt-2">
              How RehabConnect works for you
            </h2>
            <p className="text-base text-slate-600 dark:text-slate-300">
              A transparent, human-guided pathway designed to eliminate confusion and deliver peace of mind.
            </p>
          </FadeIn>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            {
              step: '01',
              title: 'Tell Us Your Need',
              desc: 'Complete a brief 2-minute confidential assessment quiz online or via phone.',
            },
            {
              step: '02',
              title: 'Clinical Review',
              desc: 'A dedicated Care Coordinator reviews medical history and placement goals.',
            },
            {
              step: '03',
              title: 'Care Lead Match',
              desc: 'Meet your assigned Care Coordinator via encrypted video or telephone consultation.',
            },
            {
              step: '04',
              title: 'Verified Placement',
              desc: 'Receive tailored, transparent recommendations for accredited rehab centres.',
            },
            {
              step: '05',
              title: 'Recovery & Aftercare',
              desc: 'Begin admission with continuous coordinator advocacy throughout your journey.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group"
            >
              <div className="font-heading font-extrabold text-3xl text-teal-600 dark:text-teal-400 opacity-40 group-hover:opacity-100 transition-opacity">
                {item.step}
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-3 mb-2">
                {item.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </StaggerContainer>
      </section>

      {/* 5. Emotional Storytelling Image Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[480px] flex items-center shadow-2xl border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600"
              alt="Family receiving supportive healthcare guidance"
              className="absolute inset-0 w-full h-full object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />

            <div className="relative z-10 max-w-2xl p-8 md:p-14 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
                <Users className="w-3.5 h-3.5" />
                <span>Family Centered Compassion</span>
              </div>

              <h2 className="font-heading font-extrabold text-3xl md:text-4xl leading-tight">
                "When my brother needed help, RehabConnect gave us clarity when we had none."
              </h2>

              <p className="text-base text-slate-300 leading-relaxed">
                We believe healthcare navigation shouldn’t be a bureaucratic obstacle course. Our platform is built around real human care coordinators who treat your family with the dignity and empathy you deserve.
              </p>

              <div>
                <button
                  onClick={() => router.push('/for-families')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm shadow-lg transition-all"
                >
                  <span>Read Family Support Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 6. Featured Care Coordinators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
              <Users className="w-4 h-4" />
              <span>Independent Patient Advocates</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Meet Our Senior Care Lead Team
            </h2>
          </div>
          <button
            onClick={() => router.push('/care-coordinators')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <span>View All Coordinators</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARE_COORDINATORS.map((coord) => (
            <CoordinatorCard key={coord.id} coordinator={coord} />
          ))}
        </StaggerContainer>
      </section>

      {/* 7. Verified Rehabilitation Centres Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200/80 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
              <Building2 className="w-4 h-4" />
              <span>Audited Facilities</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
              Verified Partner Rehabilitation Facilities
            </h2>
          </div>
          <button
            onClick={() => router.push('/rehabilitation-centres')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            <span>Browse All Centres</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REHAB_CENTRES.slice(0, 3).map((centre) => (
            <RehabCentreCard key={centre.id} centre={centre} />
          ))}
        </StaggerContainer>
      </section>

      {/* 8. Interactive Testimonial Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TestimonialCarousel />
      </section>

      {/* 9. Platform Statistics Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 border border-slate-800 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <h3 className="font-heading font-bold text-2xl md:text-3xl">Impact in Numbers</h3>
              <p className="text-xs text-slate-400 mt-2">
                Demonstrating transparent clinical excellence across every referral.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {STATS.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <div className="font-heading font-extrabold text-3xl md:text-4xl text-teal-400">{stat.value}</div>
                  <div className="font-bold text-sm text-white">{stat.label}</div>
                  <div className="text-[11px] text-slate-400">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 10. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Have questions about how RehabConnect assists you or your family? We have clear answers.
          </p>
        </div>
        <FAQAccordion items={FAQS.slice(0, 5)} allowSearch={false} />
        <div className="text-center pt-2">
          <button
            onClick={() => router.push('/faq')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
          >
            View Full FAQ Center →
          </button>
        </div>
      </section>
    </div>
  );
};
