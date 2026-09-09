import React, { useState } from 'react';
import {
  Calendar,
  Smile,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Armchair,
  Stethoscope,
  Users,
  Activity,
  Star,
  ChevronDown,
  X,
  Phone,
  Mail,
  Building,
  Check,
  LogIn,
} from 'lucide-react';
import { Tooth3D } from '../components/layout/Tooth3D';
import { useAuth } from '../context/AuthContext';

interface LandingPageViewProps {
  onLaunchApp: () => void;
  onOpenSignIn: () => void;
}

export const LandingPageView: React.FC<LandingPageViewProps> = ({ onLaunchApp, onOpenSignIn }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const [activeFeatureTab, setActiveFeatureTab] = useState<'scheduling' | 'odontogram' | 'billing' | 'admin'>('scheduling');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [demoForm, setDemoForm] = useState({
    clinicName: '',
    doctorName: '',
    email: '',
    phone: '',
    chairCount: '3-5 Chairs',
  });

  const handleDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDemoSubmitted(true);
    setTimeout(() => {
      setDemoSubmitted(false);
      setIsDemoModalOpen(false);
    }, 2500);
  };

  const faqs = [
    {
      q: 'How is each clinic’s patient data kept separate from other clinics?',
      a: 'Every clinical record, appointment and invoice is tagged with a tenant_id, and the API filters every read and write to the signed-in user’s clinic — cross-clinic access is not possible through the application. Role-based access control (Super Admin, Doctor Admin, Staff) further limits what each user can see, and administrative actions are written to an append-only audit trail.',
    },
    {
      q: 'Can front desk receptionists schedule visits without seeing clinic revenue and financial metrics?',
      a: 'Yes! Dentrix provides role-based access control (RBAC). Doctor Admins can toggle individual permissions for staff members, ensuring receptionists can manage chairs and check-ins while financial reports remain strictly restricted.',
    },
    {
      q: 'Does Dentrix include official ADA CDT procedure codes pre-configured?',
      a: 'Yes. Dentrix comes pre-loaded with standard CDT dental procedure codes (D0120, D1110, D2391, D2740, D3330, etc.), complete with clinical durations and customizable fee schedules.',
    },
    {
      q: 'Can our clinic upgrade or add more operatory chairs as our practice expands?',
      a: 'Absolutely. Super Admin subscription management allows clinics to dynamically scale between Starter (1–2 chairs), Professional (3–6 chairs), and Enterprise (multi-location) tiers with zero downtime.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-primary-100 selection:text-primary-800">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-primary-900 via-primary-800 to-slate-900 text-white text-[11px] font-semibold py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles size={14} className="text-amber-400 animate-pulse" />
        <span>Dentrix v2.0 Enterprise Release — The Next-Generation Practice OS.</span>
        <span className="hidden sm:inline text-primary-200">| Powered by Axiotronicx.Inc</span>
      </div>

      {/* Navigation Bar (Petpooja style) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onLaunchApp}>
            <div className="flex-shrink-0">
              <Tooth3D size={48} onClick={onLaunchApp} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">Dentrix</span>
                <span className="text-[10px] font-extrabold uppercase bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded border border-primary-200">
                  OS
                </span>
              </div>
              <span className="text-[10px] font-bold tracking-wider text-slate-400 block uppercase">
                Powered by Axiotronicx.Inc
              </span>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold text-slate-600">
            <a href="#features" className="hover:text-primary-600 transition-colors">Features</a>
            <a href="#odontogram" className="hover:text-primary-600 transition-colors">3D Odontogram</a>
            <a href="#pricing" className="hover:text-primary-600 transition-colors">Pricing & Plans</a>
            <a href="#reviews" className="hover:text-primary-600 transition-colors">Doctor Reviews</a>
            <a href="#faq" className="hover:text-primary-600 transition-colors">FAQ</a>
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 border border-slate-200 hover:bg-surface-100 transition-all"
            >
              <Calendar size={14} />
              <span>Book a Demo</span>
            </button>

            {!isAuthenticated ? (
              <button
                onClick={onOpenSignIn}
                className="flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-200 transition-all shadow-sm"
              >
                <LogIn size={14} />
                <span>Sign In</span>
              </button>
            ) : (
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface-100 border border-slate-200 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700 truncate max-w-[120px]">{currentUser.name}</span>
              </div>
            )}

            <button
              onClick={onLaunchApp}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-2xl text-xs font-extrabold shadow-md shadow-primary-600/25 hover:shadow-glow-royal transition-all active:scale-95"
            >
              <span>{isAuthenticated ? 'Open Workspace' : 'Launch Clinic App'}</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION (Petpooja Reference Layout) */}
      <section className="relative overflow-hidden pt-12 pb-20 bg-gradient-to-b from-primary-50/40 via-white to-white border-b border-border">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-primary-300/20 to-sky-200/20 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Top Tagline Badge with prominent 3D Tooth */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-md border border-primary-200/80 pl-2 pr-5 py-1.5 rounded-full shadow-md shadow-primary-500/10 hover:border-primary-400 transition-all cursor-pointer group" onClick={onLaunchApp}>
              <Tooth3D size={40} />
              <div className="text-left">
                <span className="text-[11px] font-extrabold text-primary-800 tracking-wide block">
                  Next-Gen 3D Dental Suite
                </span>
                <span className="text-[10px] text-slate-500 font-semibold block">
                  ⚡ Powered by Axiotronicx.Inc • Click to Test-Drive
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              Simplify Dental Operations, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-700 via-primary-600 to-sky-600">
                Elevate Patient Smiles.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              The all-in-one dental practice administration platform. Built for modern dental clinics to orchestrate operatory chairs, chart with 3D odontograms, automate CDT fee schedules, and streamline multi-tenant clinical operations.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-sm shadow-xl shadow-primary-600/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Live Platform</span>
                <ArrowRight size={18} />
              </button>

              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-surface-50 text-slate-800 font-bold text-sm border border-slate-300 shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Calendar size={17} className="text-primary-600" />
                <span>Schedule Clinic Demo</span>
              </button>
            </div>
          </div>

          {/* Interactive Live Preview Mockup Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-200/80 to-slate-300/40 shadow-2xl border border-slate-200">
            <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
              {/* App Mockup Top Bar */}
              <div className="h-10 bg-surface-50 border-b border-border px-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="text-[11px] font-mono text-slate-400 pl-3">
                    apex-dental.dentrix.io/dashboard
                  </span>
                </div>
                <div className="text-[10px] font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-100">
                  Powered by Axiotronicx.Inc
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-5 bg-[#F8F9FA]">
                {/* Chair 1 */}
                <div className="bg-white p-4 rounded-2xl border border-border shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Chair 1 - Hygiene</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                      IN-CHAIR
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">Eleanor Rigby</p>
                  <p className="text-[11px] text-slate-500">[D1110] Adult Prophylaxis</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-border">
                    <span>09:00 - 09:45</span>
                    <span className="font-bold text-emerald-600">₹1,200 Paid</span>
                  </div>
                </div>

                {/* Chair 2 */}
                <div className="bg-white p-4 rounded-2xl border border-border shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Chair 2 - Surgery</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      SCHEDULED
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">David Holloway</p>
                  <p className="text-[11px] text-slate-500">[D2391] Resin Composite #19</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-border">
                    <span>10:00 - 11:00</span>
                    <span className="font-bold text-slate-900">₹2,000 Fee</span>
                  </div>
                </div>

                {/* Chair 3 */}
                <div className="bg-white p-4 rounded-2xl border border-border shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Chair 3 - General</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      CHAIR VACANT
                    </span>
                  </div>
                  <p className="text-xs font-extrabold text-slate-800">Next: Mateo Vasquez</p>
                  <p className="text-[11px] text-slate-500">[D3330] Molar Endodontics</p>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 border-t border-border">
                    <span>13:30 - 15:00</span>
                    <span className="font-bold text-primary-700">₹6,500 Fee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STATS STRIP (Petpooja style) */}
      <section className="bg-slate-900 text-white py-12 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">5,000+</div>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
              Dental Practices Onboarded
            </p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-sky-400 tracking-tight">99.98%</div>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
              Zero-Downtime Cloud SLA
            </p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 tracking-tight">1.2M+</div>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
              Appointments Scheduled
            </p>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-rose-400 tracking-tight">4.9 ★</div>
            <p className="text-xs text-slate-400 mt-1 font-semibold uppercase tracking-wider">
              Doctor Satisfaction Score
            </p>
          </div>
        </div>
      </section>

      {/* CORE FEATURES TABS (Petpooja POS Feature Breakdown) */}
      <section id="features" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-3 py-1 rounded-full border border-primary-200">
            Engineered For Dental Clinics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything Your Clinic Needs, Nothing You Don't
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            From operatory chair management to universal tooth charting and financial ledgers.
          </p>
        </div>

        {/* Feature Tabs Selector */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {[
            { id: 'scheduling', label: 'Operatory Chair Scheduling', icon: Armchair },
            { id: 'odontogram', label: '32-Tooth Digital Odontogram', icon: Smile },
            { id: 'billing', label: 'Automated CDT Billing', icon: DollarSign },
            { id: 'admin', label: 'Super Admin Multi-Tenancy', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFeatureTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFeatureTab(tab.id as any)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25 scale-105'
                    : 'bg-surface-100 text-slate-600 hover:bg-surface-200 hover:text-slate-900'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Feature Tab Details */}
        <div className="bg-surface-50 rounded-3xl border border-border p-8 lg:p-12">
          {activeFeatureTab === 'scheduling' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-800 text-xs font-bold px-3 py-1 rounded-full">
                  <Armchair size={14} /> Multi-Chair Scheduling Engine
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Zero Double-Bookings. Seamless Operatory Flow.
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Allocate patients to designated operatory chairs (`Chair 1 - Hygiene`, `Chair 2 - Surgery`, `Chair 3 - General`). Track live statuses in real-time (`In-Chair`, `Scheduled`, `Completed`), linked directly to standard ADA CDT procedure times.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Color-coded operatory chair columns and hourly timeline views
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Automatic duration calculation mapped to procedure codes
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Quick status updates and instant pending invoice generation
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-elevation-2 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Live Operatory Chair Board
                </span>
                <div className="space-y-2">
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">Chair 1 - Hygiene</span>
                      <span className="text-[11px] text-slate-500">Eleanor Rigby • D1110 Cleaning</span>
                    </div>
                    <span className="text-[10px] font-bold bg-white text-rose-700 px-2 py-0.5 rounded border border-rose-300">
                      IN-CHAIR
                    </span>
                  </div>
                  <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900">Chair 2 - Surgery</span>
                      <span className="text-[11px] text-slate-500">David Holloway • D2391 Composite</span>
                    </div>
                    <span className="text-[10px] font-bold bg-white text-sky-700 px-2 py-0.5 rounded border border-sky-300">
                      SCHEDULED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'odontogram' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center" id="odontogram">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">
                  <Smile size={14} /> Universal Tooth Odontogram
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Interactive 32-Tooth Digital Charting & Doctor Notes
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Provide dental surgeons with an intuitive 32-tooth interactive visual chart (Upper Maxillary #1–#16, Lower Mandibular #32–#17). Record vital signs, local anesthetics, and append electronically signed, locked clinical notes.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Interactive universal tooth mapping with condition flags
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Chronological clinical progress notes with electronic doctor signatures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Vital signs monitoring (Blood Pressure & Pulse tracking)
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-elevation-2 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                  Dental Chart Preview
                </span>
                <div className="grid grid-cols-8 gap-1.5 text-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <div key={n} className="p-1.5 bg-surface-50 border rounded-lg text-[10px] font-mono font-bold">
                      #{n}
                    </div>
                  ))}
                </div>
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
                  <span className="font-bold">Tooth #19 Restored:</span> D2391 Resin Composite. Margin intact, zero nocturnal pain.
                </div>
              </div>
            </div>
          )}

          {activeFeatureTab === 'billing' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 text-xs font-bold px-3 py-1 rounded-full">
                  <DollarSign size={14} /> Automated Financials
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Instant ADA CDT Invoicing & Payment Settlements
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Automatically map clinical procedures to patient invoices. Monitor daily billed production, track collections received, and export financial summaries to CSV with 1 click.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Month-over-month revenue growth tracking and specialty earnings
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Invoice ledger with Paid, Pending, and Overdue statuses
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    One-click export to CSV for clinic accounting
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-elevation-2 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>Today's Production Billed</span>
                  <span className="text-lg font-black text-primary-700">₹21,400</span>
                </div>
                <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full w-[84%]" />
                </div>
                <span className="text-[11px] text-slate-500 block">84% Collected • ₹3,300 Pending Insurance</span>
              </div>
            </div>
          )}

          {activeFeatureTab === 'admin' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full">
                  <ShieldCheck size={14} /> Super Admin Governance
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Multi-Tenant Cloud Control & Subscription Management
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Super Admin console to onboard clinics, assign Doctor Admins, govern clinic services, monitor database connection pools, and manage subscription quotas across the network.
                </p>
                <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Assign and reassign designated Doctor Admins for each clinic
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Manage clinic subscription plans (Starter, Professional, Enterprise)
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                    Global user directory with granular permission scoping
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border shadow-elevation-2 space-y-3">
                <span className="text-xs font-bold text-slate-900 block">Active Subscriptions</span>
                <div className="flex items-center justify-between text-xs p-3 bg-surface-50 rounded-xl border">
                  <span className="font-semibold">Apex Dental Studio</span>
                  <span className="font-bold text-emerald-700">₹31,999/mo (Enterprise)</span>
                </div>
                <div className="flex items-center justify-between text-xs p-3 bg-surface-50 rounded-xl border">
                  <span className="font-semibold">Radiant Smile Dental</span>
                  <span className="font-bold text-primary-700">₹15,999/mo (Professional)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* PRICING PLANS (Petpooja style) */}
      <section id="pricing" className="py-20 bg-surface-50 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary-700 bg-primary-100 px-3 py-1 rounded-full">
              Transparent Practice Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Simple, Scalable Subscriptions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              No hidden hardware costs. Switch plans anytime with Super Admin management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col justify-between hover:shadow-elevation-2 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Solo / Starter</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Starter Clinic</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹7,999</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Perfect for single-doctor boutique dental practices.</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Up to 2 Operatory Chairs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Master Patient Directory
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Calendar Scheduling Engine
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Standard CDT Fee Catalog
                  </li>
                </ul>
              </div>

              <button
                onClick={onLaunchApp}
                className="mt-8 w-full py-3 rounded-2xl bg-surface-100 hover:bg-surface-200 text-slate-800 text-xs font-extrabold transition-all"
              >
                Choose Starter
              </button>
            </div>

            {/* Professional Plan (Popular) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary-600 shadow-xl flex flex-col justify-between relative scale-105">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                Most Popular
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-600">Growing Practice</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Professional</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹15,999</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">Comprehensive practice operating system for 3–6 chairs.</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Up to 6 Operatory Chairs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> 32-Tooth Digital Odontogram
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Signed Doctor Progress Notes
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Revenue Analytics & CSV Export
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Staff Management & Permissions
                  </li>
                </ul>
              </div>

              <button
                onClick={onLaunchApp}
                className="mt-8 w-full py-3 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-extrabold shadow-md shadow-primary-600/30 transition-all"
              >
                Choose Professional
              </button>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-3xl p-8 border border-border shadow-sm flex flex-col justify-between hover:shadow-elevation-2 transition-all">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Multi-Location</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Enterprise</h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-black text-slate-900">₹31,999</span>
                  <span className="text-xs text-slate-500">/month</span>
                </div>
                <p className="text-xs text-slate-500 mt-2">For multi-clinic networks and dental hospital franchises.</p>

                <ul className="mt-6 space-y-3 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Unlimited Operatory Chairs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Dedicated Database Schema
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> Super Admin Global Governance
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-primary-600" /> 24/7 Dedicated Account Manager
                  </li>
                </ul>
              </div>

              <button
                onClick={onLaunchApp}
                className="mt-8 w-full py-3 rounded-2xl bg-surface-100 hover:bg-surface-200 text-slate-800 text-xs font-extrabold transition-all"
              >
                Choose Enterprise
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR REVIEWS & TESTIMONIALS */}
      <section id="reviews" className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Dentist Testimonials
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Top Dental Clinicians
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "Dentrix transformed how we run Apex Dental. The 3D odontogram and quick chair status updates allow our hygienists and assistants to sync without running across hallways."
            </p>
            <div className="pt-2 border-t border-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs">
                SV
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Dr. Sarah Vance, DDS</span>
                <span className="text-[11px] text-slate-500">Lead Surgeon, Apex Dental Studio</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The ability to scope staff permissions so front desk staff can book visits without accessing confidential revenue reports is exactly what a modern dental clinic needs."
            </p>
            <div className="pt-2 border-t border-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                JM
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Dr. Julian Martinez, DMD</span>
                <span className="text-[11px] text-slate-500">Owner, Radiant Smile Clinic</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-border shadow-sm space-y-4">
            <div className="flex items-center space-x-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-relaxed italic">
              "The Super Admin console makes multi-clinic management trivial. Provisioning a new clinic with assigned Doctor Admins and customized CDT fee schedules takes less than 60 seconds."
            </p>
            <div className="pt-2 border-t border-border flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                AP
              </div>
              <div>
                <span className="font-bold text-xs text-slate-900 block">Arthur Pendelton</span>
                <span className="text-[11px] text-slate-500">Super Admin, Cloud Network</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION (Petpooja style) */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-6 border-t border-border">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-surface-50 border border-border rounded-2xl overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 hover:text-primary-700"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${
                    openFaqIndex === idx ? 'rotate-180 text-primary-600' : 'text-slate-400'
                  }`}
                />
              </button>
              {openFaqIndex === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-primary-600 text-white py-16 text-center px-6">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest bg-white/20 px-3 py-1 rounded-full">
            Ready to modernise your dental practice?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Start Managing Your Practice in Minutes.
          </h2>
          <p className="text-xs sm:text-sm text-primary-100 max-w-xl mx-auto">
            Experience the real-time chair calendar, 3D tooth odontogram, and multi-tenant cloud console right now.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-white text-primary-700 font-extrabold text-sm shadow-xl hover:bg-surface-100 transition-all"
            >
              Launch Live Application
            </button>
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary-700 hover:bg-primary-800 text-white font-bold text-sm border border-primary-500 transition-all"
            >
              Book 1-on-1 Practice Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <span className="text-xl font-black">Dentrix</span>
              <span className="text-[10px] uppercase font-bold bg-primary-900 text-primary-300 px-1.5 py-0.5 rounded">
                v2.0
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Next-generation cloud administration platform for high-volume dental surgeries, clinics, and hospital networks.
            </p>
            <p className="mt-3 font-bold text-amber-400 text-[11px]">
              Powered by Axiotronicx.Inc
            </p>
          </div>

          <div>
            <span className="font-bold text-sm block mb-3 text-slate-200">Clinical Solutions</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white">Operatory Chair Scheduling</a></li>
              <li><a href="#odontogram" className="hover:text-white">Digital Tooth Odontogram</a></li>
              <li><a href="#features" className="hover:text-white">Doctor Clinical Progress Notes</a></li>
              <li><a href="#features" className="hover:text-white">CDT Procedure Billing</a></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm block mb-3 text-slate-200">Administration</span>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#features" className="hover:text-white">Super Admin Cloud Console</a></li>
              <li><a href="#pricing" className="hover:text-white">Subscription Management</a></li>
              <li><a href="#features" className="hover:text-white">Staff RBAC & Scoped Access</a></li>
              <li><a href="#faq" className="hover:text-white">Tenant Isolation & RBAC</a></li>
            </ul>
          </div>

          <div>
            <span className="font-bold text-sm block mb-3 text-slate-200">Contact & Support</span>
            <p className="text-slate-400">24/7 Practice Concierge</p>
            <p className="text-slate-300 font-mono mt-1">support@dentrix.axiotronicx.io</p>
            <p className="text-slate-400 mt-2">1-800-DENTRIX-OS</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <span>© 2026 Dentrix Platform. All rights reserved.</span>
          <span className="font-bold text-slate-400">
            Designed & Engineered by Axiotronicx.Inc
          </span>
        </div>
      </footer>

      {/* BOOK A FREE DEMO MODAL */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-base font-bold text-slate-900">Schedule Practice Demo</h3>
                <p className="text-xs text-slate-500">Live 1-on-1 walkthrough of Dentrix</p>
              </div>
              <button
                onClick={() => setIsDemoModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X size={18} />
              </button>
            </div>

            {demoSubmitted ? (
              <div className="p-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <h4 className="text-base font-bold text-slate-900">Demo Scheduled!</h4>
                <p className="text-xs text-slate-600">
                  Our clinical specialist will reach out to <strong>{demoForm.email}</strong> within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={handleDemoSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinic Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Metro Dental Specialists"
                    value={demoForm.clinicName}
                    onChange={(e) => setDemoForm({ ...demoForm, clinicName: e.target.value })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Doctor / Admin Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Robert Vance, DDS"
                    value={demoForm.doctorName}
                    onChange={(e) => setDemoForm({ ...demoForm, doctorName: e.target.value })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Work Email</label>
                    <input
                      type="email"
                      required
                      placeholder="dr.vance@clinic.com"
                      value={demoForm.email}
                      onChange={(e) => setDemoForm({ ...demoForm, email: e.target.value })}
                      className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="(512) 555-0199"
                      value={demoForm.phone}
                      onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                      className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Operatory Chair Count</label>
                  <select
                    value={demoForm.chairCount}
                    onChange={(e) => setDemoForm({ ...demoForm, chairCount: e.target.value })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="1-2 Chairs">1–2 Chairs</option>
                    <option value="3-5 Chairs">3–5 Chairs</option>
                    <option value="6-10 Chairs">6–10 Chairs</option>
                    <option value="10+ Multi-Location">10+ Multi-Location Network</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-md shadow-primary-600/25 transition-all"
                  >
                    Confirm Live Demo
                  </button>
                </div>

                <p className="text-[10px] text-slate-400 text-center">
                  ⚡ Powered by Axiotronicx.Inc • No credit card required.
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
