import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import { MOCK_CLINICAL_RESOURCES, MOCK_PATIENTS } from '../../data/mockData';
import { ClinicalResource } from '../../types';
import {
  BookOpen,
  Search,
  Filter,
  Download,
  Share2,
  PlusCircle,
  FileText,
  Video,
  CheckCircle2,
  Sparkles,
  Stethoscope,
  Send,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CoordinatorResourcesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [resources, setResources] = useState<ClinicalResource[]>(MOCK_CLINICAL_RESOURCES);
  const [prescribeTarget, setPrescribeTarget] = useState<ClinicalResource | null>(null);
  const [selectedPatientId, setSelectedPatientId] = useState<string>(MOCK_PATIENTS[0].id);
  const [prescribeSuccess, setPrescribeSuccess] = useState(false);

  const categories = ['All', 'Neuro-Rehab', 'Addiction Recovery', 'Tele-Physiotherapy', 'Cognitive Wellness', 'Nutrition & Lifestyle'];

  const filteredResources = resources.filter((res) => {
    const matchCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchSearch = res.title.toLowerCase().includes(search.toLowerCase()) ||
      res.description.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleConfirmPrescribe = () => {
    setPrescribeSuccess(true);
    setTimeout(() => {
      setPrescribeSuccess(false);
      setPrescribeTarget(null);
    }, 1500);
  };

  return (
    <DashboardShell
      title="Clinical Care Resources & Protocols"
      description="Prescribe digital rehabilitation guides, evidence-based video routines, and worksheets to online patients."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Resources' }]}
    >
      <div className="space-y-6">
        {/* TOP TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-base sm:text-lg text-[var(--foreground)]">
                Digital Recovery Library ({resources.length} Protocols)
              </h2>
              <span className="text-xs text-[var(--foreground-muted)]">
                100% Online Prescribable Materials
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search protocol, condition..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none w-48 sm:w-60"
              />
            </div>
          </div>
        </div>

        {/* CATEGORY PILL FILTER */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-[var(--gold)] text-black shadow-sm'
                  : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* RESOURCE CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] shadow-md hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider bg-[var(--background-tertiary)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-[var(--foreground-subtle)] font-medium">
                    {res.format}
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                  {res.title}
                </h3>

                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-3">
                  {res.description}
                </p>

                <div className="pt-2 flex items-center justify-between text-[11px] text-[var(--foreground-subtle)] border-t border-[var(--border)]">
                  <span>{res.durationOrPages}</span>
                  <span className="text-[var(--gold)] font-medium">
                    {res.prescribedCount} Patients Prescribed
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setPrescribeTarget(res)}
                  className="flex-1 py-2.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Prescribe to Patient</span>
                </button>
                <button
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                  title="Preview Document"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PRESCRIBE MODAL */}
      <AnimatePresence>
        {prescribeTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--background-secondary)] rounded-3xl border border-[var(--border)] p-6 max-w-md w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                    Prescribe Clinical Protocol
                  </h3>
                </div>
                <button
                  onClick={() => setPrescribeTarget(null)}
                  className="text-xs text-[var(--foreground-muted)] hover:text-white"
                >
                  ✕
                </button>
              </div>

              {prescribeSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-400">Protocol Dispatched!</h4>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    {prescribeTarget.title} has been assigned to the patient's recovery portal.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-1">
                    <span className="text-[10px] font-bold text-[var(--gold)] uppercase">
                      {prescribeTarget.category}
                    </span>
                    <h4 className="font-semibold text-xs text-[var(--foreground)]">
                      {prescribeTarget.title}
                    </h4>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[var(--foreground)]">
                      Select Online Patient:
                    </label>
                    <select
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                      className="w-full p-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                    >
                      {MOCK_PATIENTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} — {p.condition}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={handleConfirmPrescribe}
                    className="w-full py-2.5 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm & Prescribe Protocol</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
};
