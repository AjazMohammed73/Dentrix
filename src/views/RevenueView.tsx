import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Printer,
  Share2,
  Trash2,
  X,
  Building,
  ShieldCheck,
  Sparkles,
  Sliders,
  Edit,
  Clock,
  ArrowUpRight,
  Receipt,
  Users,
  Search,
  QrCode,
  Shield,
  FileCheck,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { InvoiceStatus, Invoice, PaymentInstallment, ClinicTenant, TenantSubscription } from '../types';
import { formatINR, todayISO } from '../utils/format';
import { toCsv, downloadCsv } from '../utils/csv';
import { AccessDeniedView } from './AccessDeniedView';
import { CreateInvoiceModal } from '../components/modals/CreateInvoiceModal';
import { InvoicePrintModal } from '../components/modals/InvoicePrintModal';
import { SaaSInvoiceModal } from '../components/modals/SaaSInvoiceModal';
import { UpiQrModal } from '../components/modals/UpiQrModal';
import { ClaimSettlementModal } from '../components/modals/ClaimSettlementModal';

interface RevenueViewProps {
  onNavigateHome?: () => void;
}

export const RevenueView: React.FC<RevenueViewProps> = ({ onNavigateHome }) => {
  const {
    invoices,
    appointments,
    markInvoicePaid,
    addInvoicePayment,
    deleteInvoice,
    updateInvoiceInsuranceClaim,
  } = useData();
  const { currentUser, currentTenant, allTenants, updateTenantSubscription } = useAuth();

  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
  const [superAdminTab, setSuperAdminTab] = useState<'subscriptions' | 'invoices'>('subscriptions');

  // Clinic sub-tabs: 'invoices' | 'insurance'
  const [clinicSubTab, setClinicSubTab] = useState<'invoices' | 'insurance'>('invoices');

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null);
  const [installmentAmount, setInstallmentAmount] = useState<number>(0);
  const [installmentMethod, setInstallmentMethod] = useState<PaymentInstallment['method']>('UPI / Bank');
  const [installmentNotes, setInstallmentNotes] = useState<string>('');

  // Dynamic UPI QR & Insurance Claim States
  const [upiQrModalInvoice, setUpiQrModalInvoice] = useState<Invoice | null>(null);
  const [upiQrCustomAmount, setUpiQrCustomAmount] = useState<number | undefined>(undefined);
  const [claimModalInvoice, setClaimModalInvoice] = useState<Invoice | null>(null);
  const [insuranceStatusFilter, setInsuranceStatusFilter] = useState<string>('All');
  const [insuranceSearchQuery, setInsuranceSearchQuery] = useState<string>('');
  const [newClaimPickerOpen, setNewClaimPickerOpen] = useState(false);

  // Super Admin Subscription States
  const [subSearchQuery, setSubSearchQuery] = useState('');
  const [subPlanFilter, setSubPlanFilter] = useState('All');
  const [subStatusFilter, setSubStatusFilter] = useState('All');
  const [selectedTenantForInvoice, setSelectedTenantForInvoice] = useState<ClinicTenant | null>(null);
  const [editingTenantSub, setEditingTenantSub] = useState<ClinicTenant | null>(null);
  const [subForm, setSubForm] = useState<TenantSubscription>({
    plan: 'Enterprise',
    status: 'Active',
    billingCycle: 'Annual',
    monthlyFee: 31999,
    chairLimit: 12,
    renewalDate: '2025-01-15',
    autoRenew: true,
  });

  const canViewRevenue =
    currentUser.permissions.canViewRevenue ||
    currentUser.role === 'DOCTOR_ADMIN' ||
    currentUser.role === 'SUPER_ADMIN';

  if (!canViewRevenue) {
    return (
      <AccessDeniedView
        attemptedRoute="revenue"
        requiredRoleOrPermission="Revenue Reports Permission (canViewRevenue) or Doctor Admin"
        onNavigateHome={onNavigateHome || (() => {})}
      />
    );
  }

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Daily calculations
  const todayStr = todayISO();
  const todaysAppointments = appointments.filter((a) => a.date === todayStr);
  const totalBilledToday = todaysAppointments.reduce((sum, a) => sum + a.fee, 0);

  const todaysInvoices = invoices.filter((i) => i.date === todayStr);
  const collectedToday = todaysInvoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amountPaid, 0);

  // Overall calculations
  const totalGrossBilled = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.amountPaid, 0);
  const totalPending = invoices
    .filter((i) => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.balance, 0);
  const collectionRate =
    totalGrossBilled > 0 ? Math.round((totalCollected / totalGrossBilled) * 100) : 100;

  // Last 6 calendar months, billed/collected computed from real invoices.
  const monthLabels = Array.from({ length: 6 }, (_, i) => {
    const d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() - (5 - i));
    return { key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, label: d.toLocaleString('en-US', { month: 'short' }) };
  });
  const monthlyData = monthLabels.map(({ key, label }, i) => {
    const inMonth = invoices.filter((inv) => inv.date?.startsWith(key));
    return {
      month: i === monthLabels.length - 1 ? `${label} (Current)` : label,
      billed: inMonth.reduce((sum, inv) => sum + inv.amount, 0),
      collected: inMonth.reduce((sum, inv) => sum + inv.amountPaid, 0),
    };
  });

  const maxMonthVal = Math.max(...monthlyData.map((m) => m.billed), 1);
  const currentMonthBilled = monthlyData[monthlyData.length - 1]?.billed ?? 0;
  const prevMonthBilled = monthlyData[monthlyData.length - 2]?.billed ?? 0;
  const monthGrowthPct = prevMonthBilled > 0
    ? Math.round(((currentMonthBilled - prevMonthBilled) / prevMonthBilled) * 1000) / 10
    : 0;

  // Service breakdown computed from real invoices, grouped by service name.
  const serviceColors = ['bg-primary-600', 'bg-indigo-600', 'bg-emerald-600', 'bg-amber-600', 'bg-sky-600', 'bg-rose-600'];
  const serviceTotals = new Map<string, number>();
  invoices.forEach((inv) => {
    serviceTotals.set(inv.serviceName, (serviceTotals.get(inv.serviceName) || 0) + inv.amount);
  });
  const serviceCategories = Array.from(serviceTotals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([category, amount], i) => ({
      category,
      amount,
      pct: totalGrossBilled > 0 ? Math.round((amount / totalGrossBilled) * 100) : 0,
      color: serviceColors[i % serviceColors.length],
    }));
  const leadingServiceCategory = serviceCategories[0]?.category ?? '—';

  const filteredInvoices = invoices.filter((i) => {
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      i.patientName.toLowerCase().includes(query) ||
      i.invoiceNumber.toLowerCase().includes(query) ||
      i.serviceName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const csv = toCsv([
      ['Invoice Number', 'Patient', 'Service', 'Amount', 'Amount Paid', 'Balance', 'Date', 'Status'],
      ...filteredInvoices.map((i) => [
        i.invoiceNumber,
        i.patientName,
        i.serviceName,
        i.amount,
        i.amountPaid,
        i.balance,
        i.date,
        i.status,
      ]),
    ]);
    downloadCsv(`Dentrix_Revenue_${currentTenant?.slug || 'clinic'}.csv`, csv);
  };

  // Insurance Claims Calculations & Filtering
  const insuranceInvoices = invoices.filter((i) => !!i.insuranceClaim);
  const filteredClaims = insuranceInvoices.filter((inv) => {
    const claim = inv.insuranceClaim!;
    const matchesStatus = insuranceStatusFilter === 'All' || claim.status === insuranceStatusFilter;
    const q = insuranceSearchQuery.toLowerCase();
    const matchesQuery =
      inv.patientName.toLowerCase().includes(q) ||
      inv.invoiceNumber.toLowerCase().includes(q) ||
      Boolean(claim.claimNumber && claim.claimNumber.toLowerCase().includes(q)) ||
      claim.payerName.toLowerCase().includes(q) ||
      (claim.policyNumber && claim.policyNumber.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  const totalClaimedValue = insuranceInvoices.reduce(
    (sum, i) => sum + (i.insuranceClaim?.claimedAmount || i.amount),
    0
  );
  const totalApprovedSettled = insuranceInvoices
    .filter(
      (i) =>
        i.insuranceClaim?.status === 'Approved' || i.insuranceClaim?.status === 'Settled'
    )
    .reduce((sum, i) => sum + (i.insuranceClaim?.approvedAmount || 0), 0);
  const pendingReviewCount = insuranceInvoices.filter(
    (i) =>
      i.insuranceClaim?.status === 'Submitted' ||
      i.insuranceClaim?.status === 'Under Review' ||
      i.insuranceClaim?.status === 'Draft'
  ).length;
  const rejectedClaimsCount = insuranceInvoices.filter(
    (i) => i.insuranceClaim?.status === 'Rejected'
  ).length;

  const exportInsuranceCSV = () => {
    const headers = [
      'Claim Number',
      'Invoice #',
      'Patient',
      'Payer / TPA',
      'Policy Number',
      'Pre-Auth #',
      'Claimed Amount',
      'Approved Amount',
      'Co-Pay',
      'Submission Date',
      'Settlement Date',
      'Status',
    ];
    const rows = filteredClaims.map((i) => {
      const c = i.insuranceClaim!;
      return [
        `"${c.claimNumber}"`,
        `"${i.invoiceNumber}"`,
        `"${i.patientName}"`,
        `"${c.payerName}"`,
        `"${c.policyNumber || ''}"`,
        `"${c.preAuthNumber || ''}"`,
        c.claimedAmount,
        c.approvedAmount || 0,
        c.coPayAmount || 0,
        c.submissionDate || '',
        c.settlementDate || '',
        c.status,
      ];
    });
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Dentrix_Insurance_Claims_${currentTenant?.slug || 'clinic'}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Super Admin SaaS Subscription Calculations
  const activeSubTenants = allTenants.filter((t) => t.status === 'active');
  const totalMRR = activeSubTenants.reduce(
    (sum, t) =>
      sum +
      (t.subscription?.monthlyFee ||
        (t.plan === 'Enterprise' ? 31999 : t.plan === 'Professional' ? 15999 : 7999)),
    0
  );
  const totalARR = totalMRR * 12;
  const arpu = activeSubTenants.length > 0 ? Math.round(totalMRR / activeSubTenants.length) : 0;
  const activeAnnualCount = allTenants.filter(
    (t) => t.subscription?.billingCycle === 'Annual'
  ).length;
  const activeMonthlyCount = allTenants.length - activeAnnualCount;

  const enterpriseCount = allTenants.filter(
    (t) => (t.subscription?.plan || t.plan) === 'Enterprise'
  ).length;
  const professionalCount = allTenants.filter(
    (t) => (t.subscription?.plan || t.plan) === 'Professional'
  ).length;
  const starterCount = allTenants.filter(
    (t) => (t.subscription?.plan || t.plan) === 'Starter'
  ).length;

  const saasMonthlyData = [
    { month: 'Apr', mrr: Math.round(totalMRR * 0.65) },
    { month: 'May', mrr: Math.round(totalMRR * 0.72) },
    { month: 'Jun', mrr: Math.round(totalMRR * 0.8) },
    { month: 'Jul', mrr: Math.round(totalMRR * 0.88) },
    { month: 'Aug', mrr: Math.round(totalMRR * 0.94) },
    { month: 'Sep (Current)', mrr: totalMRR },
  ];
  const maxSaasMonth = Math.max(...saasMonthlyData.map((m) => m.mrr), 1);

  const handleOpenEditSub = (tenant: ClinicTenant) => {
    setEditingTenantSub(tenant);
    setSubForm(
      tenant.subscription || {
        plan: tenant.plan || 'Professional',
        status: tenant.status === 'active' ? 'Active' : 'Past Due',
        billingCycle: 'Monthly',
        monthlyFee:
          tenant.plan === 'Enterprise' ? 31999 : tenant.plan === 'Professional' ? 15999 : 7999,
        chairLimit: tenant.plan === 'Enterprise' ? 12 : tenant.plan === 'Professional' ? 6 : 2,
        renewalDate: '2025-06-30',
        autoRenew: true,
      }
    );
  };

  const handleSaveSub = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTenantSub) return;
    updateTenantSubscription(editingTenantSub.id, subForm);
    setEditingTenantSub(null);
  };

  const filteredSubTenants = allTenants.filter((t) => {
    const sub = t.subscription;
    const currentPlan = sub?.plan || t.plan;
    const currentStatus = sub?.status || (t.status === 'active' ? 'Active' : 'Past Due');

    const matchesPlan = subPlanFilter === 'All' || currentPlan === subPlanFilter;
    const matchesStatus = subStatusFilter === 'All' || currentStatus === subStatusFilter;
    const q = subSearchQuery.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(q) ||
      t.doctorAdminName.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.address.toLowerCase().includes(q);

    return matchesPlan && matchesStatus && matchesSearch;
  });

  const exportSubscriptionsCSV = () => {
    const headers = [
      'Clinic Name',
      'Doctor Admin',
      'Email',
      'Phone',
      'Plan',
      'Chair Quota',
      'Billing Cycle',
      'Monthly Fee (INR)',
      'Renewal Date',
      'Auto-Renew',
      'Status',
    ];
    const rows = filteredSubTenants.map((t) => {
      const s = t.subscription;
      return [
        `"${t.name}"`,
        `"${t.doctorAdminName}"`,
        `"${t.email}"`,
        `"${t.phone}"`,
        s?.plan || t.plan,
        s?.chairLimit || (t.plan === 'Enterprise' ? 12 : 6),
        s?.billingCycle || 'Monthly',
        s?.monthlyFee || (t.plan === 'Enterprise' ? 31999 : 15999),
        s?.renewalDate || '2025-01-15',
        s?.autoRenew ? 'Enabled' : 'Disabled',
        s?.status || (t.status === 'active' ? 'Active' : 'Past Due'),
      ];
    });
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `Dentrix_Clinic_Subscriptions_${new Date().toISOString().split('T')[0]}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Super Admin Mode Switcher Banner */}
      {isSuperAdmin && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-5 rounded-3xl shadow-elevation-2 border border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 bg-primary-500/20 text-primary-400 rounded-2xl border border-primary-500/30">
              <Sparkles size={22} />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary-400">Super Admin View</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-slate-300">Axiotronicx Platform</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Switch between SaaS clinic recurring subscription revenue & clinic patient billing ledger
              </p>
            </div>
          </div>

          <div className="flex bg-slate-800/90 p-1.5 rounded-2xl border border-slate-700/80">
            <button
              onClick={() => setSuperAdminTab('subscriptions')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                superAdminTab === 'subscriptions'
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Building size={15} />
              <span>Clinic Subscriptions (SaaS Platform)</span>
            </button>
            <button
              onClick={() => setSuperAdminTab('invoices')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                superAdminTab === 'invoices'
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Receipt size={15} />
              <span>Clinic Patient Invoices (Network Audit)</span>
            </button>
          </div>
        </div>
      )}

      {isSuperAdmin && superAdminTab === 'subscriptions' ? (
        <>
          {/* SaaS Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
                <Building size={24} />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h1 className="text-xl font-bold text-slate-900">SaaS Subscription Revenue & Billing</h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Axiotronicx Dental Cloud
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Multi-tenant recurring revenue (MRR/ARR), clinic software licensing, and tax invoices
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={exportSubscriptionsCSV}
                className="flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
              >
                <Download size={16} />
                <span>Export Subscriptions CSV</span>
              </button>
            </div>
          </div>

          {/* 4 SaaS Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard
              title="Platform Monthly Recurring (MRR)"
              value={formatINR(totalMRR)}
              trend={{ value: '18.4%', isPositive: true }}
              subtitle={`Active collections across ${activeSubTenants.length} clinics`}
              icon={DollarSign}
              iconBgColor="bg-emerald-50"
              iconColor="text-emerald-600"
            />
            <StatCard
              title="Annual Run Rate (ARR)"
              value={formatINR(totalARR)}
              subtitle="Projected 12-month platform contract value"
              icon={Calendar}
              iconBgColor="bg-primary-50"
              iconColor="text-primary-600"
            />
            <StatCard
              title="Subscribed Clinic Accounts"
              value={`${allTenants.length}`}
              subtitle={`${enterpriseCount} Enterprise • ${professionalCount} Pro • ${starterCount} Starter`}
              icon={Building}
              iconBgColor="bg-sky-50"
              iconColor="text-sky-600"
            />
            <StatCard
              title="Average Revenue Per Account (ARPU)"
              value={`${formatINR(arpu)}/mo`}
              subtitle={`${activeAnnualCount} Annual billing • ${activeMonthlyCount} Monthly billing`}
              icon={CreditCard}
              iconBgColor="bg-purple-50"
              iconColor="text-purple-600"
            />
          </div>

          {/* SaaS Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* SaaS MRR Growth Chart */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    SaaS MRR Progression (Last 6 Months)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Axiotronicx dental platform subscription run rate & clinic renewals
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                  <TrendingUp size={14} />
                  <span>+18.4% YoY</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="flex items-end justify-between h-56 pt-6 pb-2 px-4 border-b border-border gap-4">
                {saasMonthlyData.map((d) => {
                  const mrrHeight = Math.max(Math.round((d.mrr / maxSaasMonth) * 100), 12);
                  return (
                    <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                      <div className="w-full flex items-end justify-center h-44">
                        <div
                          className="w-8 bg-gradient-to-t from-primary-700 to-primary-500 rounded-t-xl transition-all duration-300 group-hover:brightness-110 relative flex items-start justify-center pt-2"
                          style={{ height: `${mrrHeight}%` }}
                          title={`${d.month}: ${formatINR(d.mrr)}`}
                        >
                          <span className="text-[10px] font-bold text-white/90 hidden group-hover:block">
                            {Math.round(d.mrr / 1000)}k
                          </span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-slate-600 truncate max-w-[80px]">
                        {d.month}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
                <span>Healthy retention: 99.2% gross revenue renewal rate</span>
                <span className="font-bold text-slate-900">
                  Current MRR Run Rate: {formatINR(totalMRR)}
                </span>
              </div>
            </div>

            {/* Subscription Tier Breakdown */}
            <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  License Tiers & Quotas
                </h3>
                <p className="text-xs text-slate-500 mb-5">
                  Platform tier distribution across active clinics
                </p>

                <div className="space-y-4">
                  {/* Enterprise */}
                  <div className="p-3.5 bg-purple-50/60 rounded-2xl border border-purple-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-purple-900">Enterprise Plan (₹31,999/mo)</span>
                      <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded-lg">
                        {enterpriseCount} {enterpriseCount === 1 ? 'Clinic' : 'Clinics'}
                      </span>
                    </div>
                    <p className="text-[11px] text-purple-700">
                      Up to 12 Operatory Chairs • Multi-Branch • 24/7 Dedicated SLA
                    </p>
                  </div>

                  {/* Professional */}
                  <div className="p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-blue-900">Professional Plan (₹15,999/mo)</span>
                      <span className="text-blue-700 bg-blue-100 px-2 py-0.5 rounded-lg">
                        {professionalCount} {professionalCount === 1 ? 'Clinic' : 'Clinics'}
                      </span>
                    </div>
                    <p className="text-[11px] text-blue-700">
                      Up to 6 Operatory Chairs • Full Imaging EHR • Multi-Doctor
                    </p>
                  </div>

                  {/* Starter */}
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-slate-800">Starter Plan (₹7,999/mo)</span>
                      <span className="text-slate-600 bg-slate-200 px-2 py-0.5 rounded-lg">
                        {starterCount} {starterCount === 1 ? 'Clinic' : 'Clinics'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600">
                      Up to 2 Operatory Chairs • Solo Dental Practice • Basic Invoicing
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-slate-600 font-semibold">
                <span>Billing Frequency:</span>
                <span className="text-primary-700 font-bold">
                  {activeAnnualCount} Annual Prepaid • {activeMonthlyCount} Monthly
                </span>
              </div>
            </div>
          </div>

          {/* Clinic Subscription Ledger Table */}
          <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Clinic Subscription Billing Ledger
                </h2>
                <p className="text-xs text-slate-500">
                  Manage clinic plans, operatory quotas, recurring fees, and official Axiotronicx tax receipts
                </p>
              </div>

              {/* Filters & Search */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search clinic or doctor..."
                    value={subSearchQuery}
                    onChange={(e) => setSubSearchQuery(e.target.value)}
                    className="pl-9 pr-3.5 py-1.5 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600 w-48 sm:w-56"
                  />
                </div>

                {/* Plan Filter */}
                <div className="flex items-center gap-1 bg-surface-50 p-1 rounded-xl border border-border text-xs">
                  {['All', 'Enterprise', 'Professional', 'Starter'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setSubPlanFilter(p)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        subPlanFilter === p
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                {/* Status Filter */}
                <div className="flex items-center gap-1 bg-surface-50 p-1 rounded-xl border border-border text-xs">
                  {['All', 'Active', 'Past Due', 'Trial'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setSubStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        subStatusFilter === st
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                  <tr>
                    <th className="py-3 px-4">Clinic & Doctor</th>
                    <th className="py-3 px-4">Subscription Plan</th>
                    <th className="py-3 px-4">Chair Quota</th>
                    <th className="py-3 px-4">Billing Cycle & Fee</th>
                    <th className="py-3 px-4">Next Renewal</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSubTenants.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No clinic subscriptions found matching the filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredSubTenants.map((t) => {
                      const sub = t.subscription;
                      const plan = sub?.plan || t.plan;
                      const status = sub?.status || (t.status === 'active' ? 'Active' : 'Past Due');
                      const fee =
                        sub?.monthlyFee ||
                        (plan === 'Enterprise' ? 31999 : plan === 'Professional' ? 15999 : 7999);
                      const chairs = sub?.chairLimit || (plan === 'Enterprise' ? 12 : 6);
                      const cycle = sub?.billingCycle || 'Monthly';
                      const renewalDate = sub?.renewalDate || '2025-06-30';

                      return (
                        <tr key={t.id} className="hover:bg-surface-50/60">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{t.name}</div>
                            <div className="text-[11px] text-slate-500">
                              {t.doctorAdminName} • {t.email}
                            </div>
                            <div className="text-[10px] text-slate-400 truncate max-w-xs">
                              {t.address}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                                plan === 'Enterprise'
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : plan === 'Professional'
                                  ? 'bg-blue-100 text-blue-800 border border-blue-200'
                                  : 'bg-slate-100 text-slate-700 border border-slate-200'
                              }`}
                            >
                              {plan}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-800">{chairs} Chairs</div>
                            <div className="text-[10px] text-slate-400">Quota allotted</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-slate-900">{formatINR(fee)}</div>
                            <div className="text-[11px] text-slate-500">
                              {cycle} • {sub?.autoRenew ? 'Auto-renew on' : 'Manual'}
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-mono text-slate-700 font-semibold">{renewalDate}</div>
                            <div className="text-[10px] text-emerald-600 font-bold">Good Standing</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <Badge
                              variant={
                                status === 'Active'
                                  ? 'success'
                                  : status === 'Trial'
                                  ? 'warning'
                                  : 'danger'
                              }
                              dot
                            >
                              {status}
                            </Badge>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => handleOpenEditSub(t)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-surface-100 hover:bg-surface-200 text-slate-700 border border-border text-[11px] font-bold transition-all"
                                title="Manage Subscription & License Quota"
                              >
                                <Sliders size={13} />
                                <span>Manage</span>
                              </button>
                              <button
                                onClick={() => setSelectedTenantForInvoice(t)}
                                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200 text-[11px] font-bold transition-all shadow-sm"
                                title="Generate Axiotronicx Tax Receipt"
                              >
                                <Receipt size={13} />
                                <span>SaaS Invoice</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Clinic Header & Sub-Tab Navigation */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
                  <DollarSign size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-900">Financials & Revenue Tracking</h1>
                  <p className="text-xs text-slate-500">
                    Clinic: <span className="font-semibold text-slate-800">{currentTenant?.name}</span> • Real-time collections, billing ledger & claims
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {clinicSubTab === 'invoices' ? (
                  <>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
                    >
                      <Plus size={16} />
                      <span>Create Invoice</span>
                    </button>
                    <button
                      onClick={exportCSV}
                      className="flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
                    >
                      <Download size={16} />
                      <span>Export CSV</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setNewClaimPickerOpen(true)}
                      className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
                    >
                      <Plus size={16} />
                      <span>File Insurance Claim</span>
                    </button>
                    <button
                      onClick={exportInsuranceCSV}
                      className="flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
                    >
                      <Download size={16} />
                      <span>Export Claims CSV</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Sub-Tab Switcher Pills */}
            <div className="flex items-center space-x-2 bg-surface-50 p-1.5 rounded-2xl border border-border w-fit">
              <button
                onClick={() => setClinicSubTab('invoices')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  clinicSubTab === 'invoices'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Receipt size={15} />
                <span>Patient Invoices & Ledger</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-mono">
                  {invoices.length}
                </span>
              </button>
              <button
                onClick={() => setClinicSubTab('insurance')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  clinicSubTab === 'insurance'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <ShieldCheck size={15} />
                <span>Dental Insurance Claims</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-md text-[10px] bg-primary-50 text-primary-700 font-mono font-bold">
                  {insuranceInvoices.length}
                </span>
              </button>
            </div>
          </div>

          {clinicSubTab === 'invoices' ? (
            <>
              {/* Daily & Monthly Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Production Billed"
          value={formatINR(totalBilledToday)}
          subtitle={`${todaysAppointments.length} procedures today`}
          icon={Calendar}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          title="Total Collections Received"
          value={formatINR(totalCollected)}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending Accounts Receivable"
          value={formatINR(totalPending)}
          subtitle="Awaiting patient or insurance"
          icon={AlertCircle}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Overall Collection Rate"
          value={`${collectionRate}%`}
          subtitle="Target threshold: >95%"
          icon={CreditCard}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month-over-Month Revenue Growth */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Month-over-Month Clinical Revenue
              </h3>
              <p className="text-xs text-slate-500">Gross Billed vs Collected Collections</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-primary-600" />
                <span className="font-semibold text-slate-700">Gross Billed</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">Collected</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="flex items-end justify-between h-56 pt-6 pb-2 px-4 border-b border-border gap-4">
            {monthlyData.map((d) => {
              const billedHeight = Math.round((d.billed / maxMonthVal) * 100);
              const collectedHeight = Math.round((d.collected / maxMonthVal) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* Billed Bar */}
                    <div
                      className="w-5 bg-primary-600 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                      style={{ height: `${billedHeight}%` }}
                      title={`Billed: ${formatINR(d.billed)}`}
                    />
                    {/* Collected Bar */}
                    <div
                      className="w-5 bg-emerald-500 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                      style={{ height: `${collectedHeight}%` }}
                      title={`Collected: ${formatINR(d.collected)}`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 truncate max-w-[65px]">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Month-over-month growth: {monthGrowthPct >= 0 ? '+' : ''}{monthGrowthPct}%</span>
            <span className="font-bold text-slate-900">Current Month: {formatINR(currentMonthBilled)}</span>
          </div>
        </div>

        {/* Service-Level Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Production by Specialty
            </h3>
            <p className="text-xs text-slate-500 mb-5">CDT procedure categorization breakdown</p>

            <div className="space-y-4">
              {serviceCategories.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 truncate pr-2">{item.category}</span>
                    <span className="text-slate-900 font-bold">{formatINR(item.amount)}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>Leading Revenue Driver:</span>
            <span className="text-primary-700 font-bold">{leadingServiceCategory}</span>
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Patient Billing & Invoice Ledger</h2>
            <p className="text-xs text-slate-500">Track paid, pending, and overdue clinical charges</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-surface-50 p-1 rounded-2xl border border-border">
            {['All', 'Paid', 'Pending', 'Overdue'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Procedure / Service</th>
                <th className="py-3 px-4">Billed Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Outstanding</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Settlement</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-50/60">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{inv.patientName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{inv.serviceName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{formatINR(inv.amount)}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">{formatINR(inv.amountPaid)}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">{formatINR(inv.balance)}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{inv.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        inv.status === 'Paid'
                          ? 'success'
                          : inv.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      dot
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.status !== 'Paid' ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => {
                            setPaymentModalInvoice(inv);
                            setInstallmentAmount(inv.balance);
                            setInstallmentNotes('');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-bold shadow-sm transition-all whitespace-nowrap"
                          title="Record Installment or Partial Payment"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => {
                            setUpiQrModalInvoice(inv);
                            setUpiQrCustomAmount(inv.balance);
                          }}
                          className="px-2 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-[10px] font-bold transition-all flex items-center gap-1 whitespace-nowrap"
                          title="Generate Instant Dynamic UPI QR Code"
                        >
                          <QrCode size={12} />
                          <span>UPI QR</span>
                        </button>
                        <button
                          onClick={() => markInvoicePaid(inv.id, 'Credit Card')}
                          className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold transition-all whitespace-nowrap"
                          title="Clear Remaining Balance Fully"
                        >
                          Clear Full
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {inv.paymentMethod || 'Paid'}
                      </span>
                    )}
                    {inv.insuranceClaim && (
                      <div className="mt-1">
                        <button
                          onClick={() => setClaimModalInvoice(inv)}
                          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors"
                          title="View / Process Insurance Claim"
                        >
                          <Shield size={11} />
                          <span>Claim: {inv.insuranceClaim.status}</span>
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {/* Print Button */}
                      <button
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        className="p-1.5 text-slate-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Print / View Invoice"
                      >
                        <Printer size={15} />
                      </button>
                      {/* WhatsApp Share Button */}
                      <button
                        onClick={() => {
                          const msg =
                            `*🦷 DENTAL INVOICE RECEIPT*\n` +
                            `*Clinic:* ${currentTenant?.name || 'Apex Dental'}\n` +
                            `*Invoice No:* ${inv.invoiceNumber}\n` +
                            `*Patient:* ${inv.patientName}\n` +
                            `*Service:* ${inv.serviceName}\n` +
                            `*Total:* ${formatINR(inv.amount)}\n` +
                            `*Paid:* ${formatINR(inv.amountPaid)}\n` +
                            `*Balance Due:* ${formatINR(inv.balance)}\n` +
                            `*Status:* ${inv.status.toUpperCase()}\n` +
                            `Thank you! • _Powered by Axiotronicx.Inc_`;
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
                        }}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Share via WhatsApp"
                      >
                        <Share2 size={15} />
                      </button>
                      {/* Delete Invoice Button */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete invoice ${inv.invoiceNumber} for ${inv.patientName}?`)) {
                            deleteInvoice(inv.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    /* Dental Insurance Claims View */
    <div className="space-y-6">
      {/* 4 Insurance Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Claims Volume"
          value={formatINR(totalClaimedValue)}
          subtitle={`${insuranceInvoices.length} total insurance claims filed`}
          icon={Shield}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          title="Settled Reimbursements"
          value={formatINR(totalApprovedSettled)}
          trend={{ value: 'Cashless', isPositive: true }}
          subtitle="Direct TPA disbursements received"
          icon={CheckCircle2}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending TPA Adjudication"
          value={`${pendingReviewCount} Claims`}
          subtitle="Awaiting insurer pre-auth or final settlement"
          icon={Clock}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Disputed / Rejected Claims"
          value={`${rejectedClaimsCount} Claims`}
          subtitle="Requires claim resubmission / appeals"
          icon={ShieldAlert}
          iconBgColor="bg-rose-50"
          iconColor="text-rose-600"
        />
      </div>

      {/* Claims Ledger Container */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Dental Insurance Claims & TPA Settlement Ledger
            </h2>
            <p className="text-xs text-slate-500">
              Manage pre-authorizations, claim submissions, co-payments, and cashless settlements
            </p>
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1 bg-surface-50 p-1 rounded-2xl border border-border overflow-x-auto">
            {['All', 'Draft', 'Submitted', 'Under Review', 'Approved', 'Settled', 'Rejected'].map(
              (st) => (
                <button
                  key={st}
                  onClick={() => setInsuranceStatusFilter(st)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    insuranceStatusFilter === st
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {st}
                </button>
              )
            )}
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={insuranceSearchQuery}
              onChange={(e) => setInsuranceSearchQuery(e.target.value)}
              placeholder="Search by Claim #, Patient Name, Insurer (Star Health, Niva Bupa, etc.), Policy #..."
              className="w-full pl-9 pr-4 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-900 focus:outline-none focus:border-primary-600"
            />
          </div>
          <button
            onClick={() => setNewClaimPickerOpen(true)}
            className="flex items-center space-x-1.5 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
          >
            <Plus size={14} />
            <span>File Claim for Invoice</span>
          </button>
        </div>

        {/* Claims Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
              <tr>
                <th className="py-3 px-4">Claim #</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Procedure & Code</th>
                <th className="py-3 px-4">Insurance Payer / TPA</th>
                <th className="py-3 px-4">Policy / Pre-Auth #</th>
                <th className="py-3 px-4">Claimed Amt</th>
                <th className="py-3 px-4">Approved Amt</th>
                <th className="py-3 px-4">Patient Co-Pay</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredClaims.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-500">
                    <p className="font-semibold text-xs">No dental insurance claims found matching criteria.</p>
                    <p className="text-[11px] mt-1 text-slate-400">Click &quot;File Claim for Invoice&quot; to initialize a claim on any billed treatment.</p>
                  </td>
                </tr>
              ) : (
                filteredClaims.map((inv) => {
                  const c = inv.insuranceClaim!;
                  return (
                    <tr key={inv.id} className="hover:bg-surface-50/60">
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-slate-900 block">{c.claimNumber}</span>
                        <span className="text-[10px] text-slate-400 font-mono">Inv #{inv.invoiceNumber}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block">{inv.patientName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">ID: {inv.patientId}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-slate-800 font-medium block truncate max-w-[180px]">{inv.serviceName}</span>
                        {c.diagnosisCode && (
                          <span className="text-[10px] text-slate-500 font-mono">{c.diagnosisCode}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{c.payerName}</span>
                        {c.submissionDate && (
                          <span className="text-[10px] text-slate-400 font-mono">Submitted: {c.submissionDate}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className="text-slate-700 block">{c.policyNumber || '—'}</span>
                        {c.preAuthNumber && (
                          <span className="text-[10px] text-emerald-700 font-semibold block">Pre-Auth: {c.preAuthNumber}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 font-mono">
                        {formatINR(c.claimedAmount)}
                      </td>
                      <td className="py-3.5 px-4 font-bold font-mono">
                        {c.approvedAmount ? (
                          <span className="text-emerald-700">{formatINR(c.approvedAmount)}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 font-bold font-mono">
                        {c.coPayAmount ? (
                          <span className="text-indigo-700">{formatINR(c.coPayAmount)}</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            c.status === 'Settled' || c.status === 'Approved'
                              ? 'success'
                              : c.status === 'Under Review' || c.status === 'Submitted'
                              ? 'warning'
                              : c.status === 'Rejected'
                              ? 'danger'
                              : 'neutral'
                          }
                          dot
                        >
                          {c.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setClaimModalInvoice(inv)}
                            className="px-2.5 py-1 rounded-lg bg-primary-50 hover:bg-primary-100 text-primary-700 border border-primary-200 text-[11px] font-bold transition-all shadow-sm whitespace-nowrap"
                            title="Update Pre-Auth, Approval & Settlement Status"
                          >
                            Process Claim
                          </button>
                          <button
                            onClick={() => setSelectedInvoiceForPrint(inv)}
                            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-surface-100 rounded-lg transition-colors"
                            title="Print Official Tax Invoice"
                          >
                            <Printer size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}
</>
)}

      {/* Record Payment Installment Modal */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Record Payment Installment</h3>
                  <p className="text-[11px] text-slate-500">Invoice #{paymentModalInvoice.invoiceNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setPaymentModalInvoice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (installmentAmount <= 0) return;
                addInvoicePayment(paymentModalInvoice.id, {
                  amount: Number(installmentAmount),
                  method: installmentMethod,
                  notes: installmentNotes,
                });
                setPaymentModalInvoice(null);
              }}
              className="p-6 space-y-4"
            >
              {/* Patient & Financial Summary Card */}
              <div className="p-3.5 bg-surface-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-900">{paymentModalInvoice.patientName}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Total Procedure Fee:</span>
                  <span className="font-bold text-slate-900">{formatINR(paymentModalInvoice.amount)}</span>
                </div>
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Total Already Paid:</span>
                  <span className="font-bold">{formatINR(paymentModalInvoice.amountPaid)}</span>
                </div>
                <div className="flex justify-between font-bold text-rose-600 pt-1.5 border-t border-slate-200">
                  <span>Outstanding Balance:</span>
                  <span>{formatINR(paymentModalInvoice.balance)}</span>
                </div>
              </div>

              {/* Instant Counter Dynamic UPI QR Code Option */}
              <div className="p-3.5 bg-gradient-to-r from-indigo-50/80 to-purple-50/80 border border-indigo-100 rounded-2xl flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 bg-indigo-600 text-white rounded-xl shadow-sm">
                    <QrCode size={16} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Patient Paying at Counter?</p>
                    <p className="text-[10px] text-slate-500">Scan screen directly with GPay, PhonePe, Paytm</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setUpiQrModalInvoice(paymentModalInvoice);
                    setUpiQrCustomAmount(installmentAmount > 0 ? installmentAmount : paymentModalInvoice.balance);
                  }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  <QrCode size={13} />
                  <span>Show UPI QR</span>
                </button>
              </div>

              {/* Installment Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Installment Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                    ₹
                  </span>
                  <input
                    type="text"
                    required
                    value={installmentAmount || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setInstallmentAmount(val ? Number(val) : 0);
                    }}
                    className="w-full pl-8 pr-3.5 py-2 bg-surface-50 border border-border rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-primary-600 font-mono"
                    placeholder="Enter payment amount"
                  />
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setInstallmentAmount(paymentModalInvoice.balance)}
                    className="text-[10px] font-bold text-primary-700 hover:underline"
                  >
                    Pay Full (₹{paymentModalInvoice.balance.toLocaleString()})
                  </button>
                  {paymentModalInvoice.balance > 2000 && (
                    <button
                      type="button"
                      onClick={() => setInstallmentAmount(Math.round(paymentModalInvoice.balance / 2))}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Pay 50% (₹{Math.round(paymentModalInvoice.balance / 2).toLocaleString()})
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={installmentMethod}
                  onChange={(e) => setInstallmentMethod(e.target.value as PaymentInstallment['method'])}
                  className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="UPI / Bank">UPI / QR Code / Net Banking (GPay, PhonePe, NEFT)</option>
                  <option value="Credit Card">Credit Card (POS Terminal)</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash">Cash (Physical Counter)</option>
                  <option value="Insurance">Dental Insurance Settlement</option>
                </select>
              </div>

              {/* Transaction Reference / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Transaction Reference / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={installmentNotes}
                  onChange={(e) => setInstallmentNotes(e.target.value)}
                  placeholder="e.g. UPI Ref #90281203810, Cheque #00412"
                  className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentModalInvoice(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
                >
                  Record Payment Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Invoice Print & Preview Modal */}
      <InvoicePrintModal
        isOpen={!!selectedInvoiceForPrint}
        onClose={() => setSelectedInvoiceForPrint(null)}
        invoice={selectedInvoiceForPrint}
      />

      {/* SaaS Invoice Modal */}
      <SaaSInvoiceModal
        isOpen={!!selectedTenantForInvoice}
        onClose={() => setSelectedTenantForInvoice(null)}
        tenant={selectedTenantForInvoice}
      />

      {/* Dynamic UPI QR Modal */}
      <UpiQrModal
        isOpen={!!upiQrModalInvoice}
        onClose={() => {
          setUpiQrModalInvoice(null);
          setUpiQrCustomAmount(undefined);
        }}
        invoice={upiQrModalInvoice}
        customAmount={upiQrCustomAmount}
        onPaymentConfirmed={(amount: number, method: PaymentInstallment['method'], notes?: string) => {
          if (upiQrModalInvoice) {
            addInvoicePayment(upiQrModalInvoice.id, {
              amount,
              method,
              notes,
            });
            setUpiQrModalInvoice(null);
            setUpiQrCustomAmount(undefined);
            if (paymentModalInvoice && paymentModalInvoice.id === upiQrModalInvoice.id) {
              setPaymentModalInvoice(null);
            }
          }
        }}
      />

      {/* Insurance Claim Settlement Modal */}
      <ClaimSettlementModal
        isOpen={!!claimModalInvoice}
        onClose={() => setClaimModalInvoice(null)}
        invoice={claimModalInvoice}
        onSaveClaim={(claimUpdates) => {
          if (claimModalInvoice) {
            updateInvoiceInsuranceClaim(claimModalInvoice.id, claimUpdates);
            setClaimModalInvoice(null);
          }
        }}
      />

      {/* Attach Insurance Claim Modal */}
      {newClaimPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
                  <Shield size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Select Invoice to File Insurance Claim</h3>
                  <p className="text-[11px] text-slate-500">Attach cashless insurance or reimbursement pre-auth</p>
                </div>
              </div>
              <button
                onClick={() => setNewClaimPickerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
              {invoices.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">No invoices available.</p>
              ) : (
                invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 bg-surface-50 hover:bg-surface-100 rounded-2xl border border-border flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-slate-900">{inv.invoiceNumber}</span>
                        <span className="text-xs font-bold text-slate-800">• {inv.patientName}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{inv.serviceName}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Amount: {formatINR(inv.amount)} | Balance: {formatINR(inv.balance)}
                        {inv.insuranceClaim && (
                          <span className="ml-2 text-amber-700 font-bold font-sans">
                            (Existing Claim: {inv.insuranceClaim.claimNumber} • {inv.insuranceClaim.status})
                          </span>
                        )}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (!inv.insuranceClaim) {
                          updateInvoiceInsuranceClaim(inv.id, {
                            claimNumber: `CLM-${Date.now().toString().slice(-6)}`,
                            payerName: 'Star Health Insurance',
                            claimedAmount: inv.amount,
                            status: 'Draft',
                            submissionDate: new Date().toISOString().split('T')[0],
                          });
                        }
                        setNewClaimPickerOpen(false);
                        setClaimModalInvoice(inv);
                      }}
                      className="px-3 py-1.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm whitespace-nowrap"
                    >
                      {inv.insuranceClaim ? 'Manage Claim' : 'Create Claim'}
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="px-6 py-3 border-t border-border bg-surface-50 flex justify-end">
              <button
                onClick={() => setNewClaimPickerOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Admin Edit Subscription Modal */}
      {editingTenantSub && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-border shadow-elevation-4">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
                  <Sliders size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Manage Clinic Subscription</h3>
                  <p className="text-xs text-slate-500">
                    {editingTenantSub.name} • {editingTenantSub.doctorAdminName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingTenantSub(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-surface-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSub} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subscription Plan
                  </label>
                  <select
                    value={subForm.plan}
                    onChange={(e) => {
                      const newPlan = e.target.value as 'Starter' | 'Professional' | 'Enterprise';
                      setSubForm({
                        ...subForm,
                        plan: newPlan,
                        monthlyFee:
                          newPlan === 'Enterprise'
                            ? 31999
                            : newPlan === 'Professional'
                            ? 15999
                            : 7999,
                        chairLimit:
                          newPlan === 'Enterprise' ? 12 : newPlan === 'Professional' ? 6 : 2,
                      });
                    }}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                  >
                    <option value="Enterprise">Enterprise (₹31,999/mo)</option>
                    <option value="Professional">Professional (₹15,999/mo)</option>
                    <option value="Starter">Starter (₹7,999/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Account Status
                  </label>
                  <select
                    value={subForm.status}
                    onChange={(e) => setSubForm({ ...subForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                  >
                    <option value="Active">Active</option>
                    <option value="Past Due">Past Due</option>
                    <option value="Trial">Trial</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Monthly Fee (₹)
                  </label>
                  <input
                    type="text"
                    value={subForm.monthlyFee}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setSubForm({ ...subForm, monthlyFee: Number(val) });
                    }}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-border rounded-xl text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-primary-600"
                    placeholder="e.g. 15999"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Operatory Chair Quota
                  </label>
                  <input
                    type="text"
                    value={subForm.chairLimit}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setSubForm({ ...subForm, chairLimit: Number(val) });
                    }}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-border rounded-xl text-xs font-bold font-mono text-slate-900 focus:outline-none focus:border-primary-600"
                    placeholder="e.g. 6"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Billing Cycle
                  </label>
                  <select
                    value={subForm.billingCycle}
                    onChange={(e) => setSubForm({ ...subForm, billingCycle: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Annual">Annual (Prepaid)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Next Renewal Date
                  </label>
                  <input
                    type="date"
                    value={subForm.renewalDate}
                    onChange={(e) => setSubForm({ ...subForm, renewalDate: e.target.value })}
                    className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:border-primary-600"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center space-x-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={subForm.autoRenew}
                    onChange={(e) => setSubForm({ ...subForm, autoRenew: e.target.checked })}
                    className="w-4 h-4 rounded text-primary-600 border-border focus:ring-primary-500"
                  />
                  <span className="text-xs font-semibold text-slate-700">
                    Enable Auto-Renew via Registered Payment Method
                  </span>
                </label>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setEditingTenantSub(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
                >
                  Save Subscription Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
