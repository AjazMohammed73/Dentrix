import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Database,
  HardDrive,
  Activity,
  Search,
  Users,
  ShieldCheck,
  Stethoscope,
  DollarSign,
  Settings2,
  CheckCircle,
  XCircle,
  Edit,
  Trash2,
  Sparkles,
  Calendar,
  AlertTriangle,
  KeyRound,
  UserCog,
  Mail,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { formatINR } from '../utils/format';
import { ClinicTenant, User, UserRole, TenantSubscription } from '../types';
import { AccessDeniedView } from './AccessDeniedView';
import { ResetPasswordModal } from '../components/modals/ResetPasswordModal';

interface SuperAdminViewProps {
  onOpenOnboardModal: () => void;
  onNavigateHome?: () => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onOpenOnboardModal, onNavigateHome }) => {
  const {
    allTenants,
    allUsers,
    currentUser,
    toggleTenantStatus,
    updateUser,
    resetStaffPassword,
    deleteUserGlobal,
    assignDoctorAdmin,
    updateTenantSubscription,
  } = useAuth();
  const { systemHealth, allServices, toggleServiceActive } = useData();

  const [resetPasswordTarget, setResetPasswordTarget] = useState<User | null>(null);
  const handleConfirmResetPassword = async (password: string) => {
    if (!resetPasswordTarget) return;
    await resetStaffPassword(resetPasswordTarget.id, password);
    setResetPasswordTarget(null);
  };

  if (currentUser.role !== 'SUPER_ADMIN') {
    return (
      <AccessDeniedView
        attemptedRoute="tenants"
        requiredRoleOrPermission="Super Admin Root Privilege (SUPER_ADMIN)"
        onNavigateHome={onNavigateHome || (() => {})}
      />
    );
  }

  // Tab State
  const [activeTab, setActiveTab] = useState<'tenants' | 'users' | 'assign-doctor' | 'services'>('tenants');
  const [searchQuery, setSearchQuery] = useState('');
  const [clinicFilter, setClinicFilter] = useState<string>('All');
  const [rosterTab, setRosterTab] = useState<'doctors' | 'staff'>('doctors');

  // Modal State for Subscription Editing
  const [editingTenant, setEditingTenant] = useState<ClinicTenant | null>(null);
  const [subFormData, setSubFormData] = useState<TenantSubscription>({
    plan: 'Professional',
    status: 'Active',
    billingCycle: 'Monthly',
    monthlyFee: 199,
    chairLimit: 6,
    renewalDate: '2025-01-01',
    autoRenew: true,
  });

  // Modal State for Assigning Doctor Admin
  const [assigningTenant, setAssigningTenant] = useState<ClinicTenant | null>(null);
  const [selectedDoctorUserId, setSelectedDoctorUserId] = useState<string>('');

  // Calculations for Subscription Analytics
  const totalMRR = allTenants
    .filter((t) => t.status === 'active')
    .reduce((sum, t) => sum + (t.subscription?.monthlyFee || (t.plan === 'Enterprise' ? 399 : t.plan === 'Professional' ? 199 : 99)), 0);

  const totalARR = totalMRR * 12;

  // Handlers for Subscriptions
  const handleOpenEditSubscription = (tenant: ClinicTenant) => {
    setEditingTenant(tenant);
    setSubFormData(
      tenant.subscription || {
        plan: tenant.plan || 'Professional',
        status: tenant.status === 'active' ? 'Active' : 'Past Due',
        billingCycle: 'Monthly',
        monthlyFee: tenant.plan === 'Enterprise' ? 399 : tenant.plan === 'Professional' ? 199 : 99,
        chairLimit: tenant.plan === 'Enterprise' ? 12 : tenant.plan === 'Professional' ? 6 : 2,
        renewalDate: '2025-06-30',
        autoRenew: true,
      }
    );
  };

  const handleSaveSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTenant) return;
    updateTenantSubscription(editingTenant.id, subFormData);
    setEditingTenant(null);
  };

  // Handlers for Doctor Admin Assignment
  const handleOpenAssignDoctor = (tenant: ClinicTenant) => {
    setAssigningTenant(tenant);
    // Find current doctor user id if matches
    const currentDoc = allUsers.find(
      (u) => u.email === tenant.doctorAdminEmail || (u.tenantId === tenant.id && u.role === 'DOCTOR_ADMIN')
    );
    setSelectedDoctorUserId(currentDoc?.id || allUsers.find((u) => u.role === 'DOCTOR_ADMIN')?.id || allUsers[0]?.id || '');
  };

  const handleConfirmAssignDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assigningTenant || !selectedDoctorUserId) return;
    assignDoctorAdmin(assigningTenant.id, selectedDoctorUserId);
    setAssigningTenant(null);
  };

  // Filtered Lists
  const filteredTenants = allTenants.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.doctorAdminName.toLowerCase().includes(q)
    );
  });

  const filteredUsers = allUsers.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.title.toLowerCase().includes(q);
    const matchesClinic =
      clinicFilter === 'All'
        ? true
        : clinicFilter === 'platform'
        ? u.tenantId === null
        : u.tenantId === clinicFilter;
    return matchesSearch && matchesClinic;
  });

  // Services for Super Admin control
  const selectedClinicForServices = clinicFilter === 'All' || clinicFilter === 'platform' ? allTenants[0]?.id || 'tenant_apex' : clinicFilter;
  const clinicServices = allServices.filter((s) => s.tenantId === selectedClinicForServices);

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
            <Building2 size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Multi-Tenant Platform Console</h1>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded border border-amber-300">
                Super Admin Root
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Manage clinic subscriptions, oversee cross-platform user permissions, assign Doctor Admins, and govern services.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenOnboardModal}
          className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
        >
          <Plus size={16} />
          <span>Provision New Clinic</span>
        </button>
      </div>

      {/* Global Cloud Infrastructure Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Subscription MRR"
          value={formatINR(totalMRR)}
          subtitle={`Annual Run Rate: ${formatINR(totalARR)}`}
          icon={DollarSign}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Active Clinic Tenants"
          value={allTenants.filter((t) => t.status === 'active').length}
          subtitle={`${allTenants.length} Total Provisioned`}
          icon={Building2}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-700"
        />
        <StatCard
          title="DB Connection Pools"
          value={`${systemHealth.databasePools.active}/${systemHealth.databasePools.max}`}
          subtitle={`${systemHealth.databasePools.idle} Idle pools ready`}
          icon={Database}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-700"
        />
        <StatCard
          title="Platform High Availability"
          value={`${systemHealth.uptimePercent}%`}
          subtitle="Zero-downtime SLA"
          icon={Activity}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-700"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 border-b border-border bg-white px-6 pt-3 rounded-t-3xl border-t border-x">
        {[
          { id: 'tenants', label: 'Clinics & Subscriptions', icon: Building2, count: allTenants.length },
          { id: 'users', label: 'Global User Access', icon: Users, count: allUsers.length },
          { id: 'assign-doctor', label: 'Doctor Admin Assignment', icon: Stethoscope },
          { id: 'services', label: 'Clinic Services Control', icon: Settings2, count: allServices.length },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
                isActive
                  ? 'border-amber-600 text-amber-700'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLINICS & SUBSCRIPTIONS */}
      {activeTab === 'tenants' && (
        <div className="bg-white rounded-b-3xl border-b border-x border-border shadow-elevation-1 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Clinic Tenants & Subscriptions</h2>
              <p className="text-xs text-slate-500">
                Manage monthly/annual SaaS tier plans, chair allocations, and tenant activation
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by clinic name or doctor..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-2xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3.5 px-4">Clinic Organization</th>
                  <th className="py-3.5 px-4">Doctor Admin</th>
                  <th className="py-3.5 px-4">Subscription Plan</th>
                  <th className="py-3.5 px-4">Monthly Fee</th>
                  <th className="py-3.5 px-4">Chair Quota</th>
                  <th className="py-3.5 px-4">Next Renewal</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Subscription Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredTenants.map((tenant) => {
                  const sub = tenant.subscription || {
                    plan: tenant.plan,
                    status: tenant.status === 'active' ? 'Active' : 'Past Due',
                    billingCycle: 'Monthly',
                    monthlyFee: tenant.plan === 'Enterprise' ? 31999 : tenant.plan === 'Professional' ? 15999 : 7999,
                    chairLimit: tenant.plan === 'Enterprise' ? 12 : tenant.plan === 'Professional' ? 6 : 2,
                    renewalDate: '2025-06-30',
                    autoRenew: true,
                  };

                  return (
                    <tr key={tenant.id} className="hover:bg-surface-50/60">
                      <td className="py-4 px-4">
                        <span className="font-bold text-sm text-slate-900 block">
                          {tenant.name}
                        </span>
                        <span className="text-[11px] font-mono text-primary-700">
                          {tenant.slug}.dentrix.io
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800 block">
                          {tenant.doctorAdminName}
                        </span>
                        <span className="text-[11px] text-slate-400">{tenant.doctorAdminEmail}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-bold text-[11px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                          {sub.plan} ({sub.billingCycle})
                        </span>
                      </td>

                      <td className="py-4 px-4 font-black text-slate-900 text-sm">
                        {formatINR(sub.monthlyFee)}/mo
                      </td>

                      <td className="py-4 px-4 font-semibold text-slate-700">
                        {sub.chairLimit} Chairs
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-600">
                        {sub.renewalDate}
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant={sub.status === 'Active' ? 'success' : sub.status === 'Trial' ? 'info' : 'danger'} dot>
                          {sub.status}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditSubscription(tenant)}
                          className="text-[11px] font-bold px-2.5 py-1 rounded-xl border border-border bg-white text-slate-700 hover:bg-surface-100 transition-all inline-flex items-center gap-1"
                        >
                          <Edit size={12} /> Manage Plan
                        </button>
                        <button
                          onClick={() => toggleTenantStatus(tenant.id)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                            tenant.status === 'active'
                              ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {tenant.status === 'active' ? 'Suspend' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL USER ACCESS */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-b-3xl border-b border-x border-border shadow-elevation-1 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Platform Global User Directory</h2>
              <p className="text-xs text-slate-500">
                Oversee role permissions, activate/suspend accounts, or revoke platform access
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Filter by Clinic */}
              <select
                value={clinicFilter}
                onChange={(e) => setClinicFilter(e.target.value)}
                className="bg-surface-50 border border-border rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800"
              >
                <option value="All">All Clinics</option>
                <option value="platform">Super Admin (Platform)</option>
                {allTenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>

              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
          </div>

          {clinicFilter !== 'All' && clinicFilter !== 'platform' ? (
            (() => {
              const clinic = allTenants.find((t) => t.id === clinicFilter);
              const clinicUsers = filteredUsers.filter((u) => u.tenantId === clinicFilter);
              const doctors = clinicUsers.filter((u) => u.role === 'DOCTOR_ADMIN');
              const staff = clinicUsers.filter((u) => u.role === 'STAFF');
              const roster = rosterTab === 'doctors' ? doctors : staff;

              const initials = (name: string) =>
                name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

              return (
                <div className="space-y-4">
                  {/* Clinic Identity Banner */}
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-white rounded-2xl border border-amber-200">
                    <div className="p-2.5 bg-amber-100 text-amber-700 rounded-2xl">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <span className="font-extrabold text-sm text-slate-900 block">{clinic?.name}</span>
                      <span className="text-[11px] text-slate-500 font-mono">{clinic?.slug}.dentrix.io</span>
                    </div>
                  </div>

                  {/* Doctors / Staff Sub-tabs */}
                  <div className="flex items-center gap-2 bg-surface-50 p-1.5 rounded-2xl border border-border w-fit">
                    <button
                      onClick={() => setRosterTab('doctors')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        rosterTab === 'doctors'
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <Stethoscope size={15} />
                      <span>Doctors</span>
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-primary-50 text-primary-700 font-mono font-bold">
                        {doctors.length}
                      </span>
                    </button>
                    <button
                      onClick={() => setRosterTab('staff')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        rosterTab === 'staff'
                          ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      <UserCog size={15} />
                      <span>Staff</span>
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-slate-100 text-slate-700 font-mono font-bold">
                        {staff.length}
                      </span>
                    </button>
                  </div>

                  {/* Roster Cards */}
                  {roster.length === 0 ? (
                    <div className="py-10 text-center text-xs text-slate-400 bg-surface-50 rounded-2xl border border-dashed border-slate-200">
                      No {rosterTab} found for this clinic{searchQuery ? ' matching your search' : ''}.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {roster.map((user) => (
                        <div
                          key={user.id}
                          className="p-4 bg-white border border-border rounded-2xl flex items-center justify-between gap-3 hover:shadow-elevation-1 transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`w-11 h-11 rounded-2xl font-bold flex items-center justify-center text-sm flex-shrink-0 ${
                                user.role === 'DOCTOR_ADMIN'
                                  ? 'bg-primary-100 text-primary-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {initials(user.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900 truncate">{user.name}</span>
                                <Badge variant={user.status === 'active' ? 'success' : 'danger'} dot>
                                  {user.status}
                                </Badge>
                              </div>
                              <div className="text-[11px] text-slate-500 truncate">{user.title}</div>
                              <div className="text-[11px] text-slate-400 flex items-center gap-1 truncate">
                                <Mail size={11} className="flex-shrink-0" />
                                {user.email}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => setResetPasswordTarget(user)}
                              className="p-2 text-slate-500 hover:text-primary-700 hover:bg-primary-50 rounded-xl border border-transparent hover:border-primary-200 transition-all"
                              title="Reset password"
                            >
                              <KeyRound size={15} />
                            </button>
                            <button
                              onClick={() =>
                                updateUser(user.id, { status: user.status === 'active' ? 'inactive' : 'active' })
                              }
                              className="p-2 text-slate-500 hover:text-amber-700 hover:bg-amber-50 rounded-xl border border-transparent hover:border-amber-200 transition-all"
                              title={user.status === 'active' ? 'Suspend account' : 'Reactivate account'}
                            >
                              {user.status === 'active' ? <XCircle size={15} /> : <CheckCircle size={15} />}
                            </button>
                            <button
                              onClick={() => deleteUserGlobal(user.id)}
                              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-all"
                              title="Delete account"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()
          ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3.5 px-4">User Details</th>
                  <th className="py-3.5 px-4">Clinic Tenant</th>
                  <th className="py-3.5 px-4">Current Role</th>
                  <th className="py-3.5 px-4">Change Role</th>
                  <th className="py-3.5 px-4">Account Status</th>
                  <th className="py-3.5 px-4 text-right">Access Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredUsers.map((user) => {
                  const userTenant = allTenants.find((t) => t.id === user.tenantId);
                  return (
                    <tr key={user.id} className="hover:bg-surface-50/60">
                      <td className="py-4 px-4">
                        <span className="font-bold text-sm text-slate-900 block">
                          {user.name}
                        </span>
                        <span className="text-[11px] text-slate-500">{user.email} • {user.title}</span>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800">
                          {userTenant ? userTenant.name : 'Super Admin Root'}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            user.role === 'SUPER_ADMIN'
                              ? 'warning'
                              : user.role === 'DOCTOR_ADMIN'
                              ? 'primary'
                              : 'neutral'
                          }
                        >
                          {user.role.replace('_', ' ')}
                        </Badge>
                      </td>

                      <td className="py-4 px-4">
                        <select
                          value={user.role}
                          onChange={(e) =>
                            updateUser(user.id, { role: e.target.value as UserRole })
                          }
                          className="bg-surface-50 border border-border rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700"
                        >
                          <option value="STAFF">Staff (Scoped)</option>
                          <option value="DOCTOR_ADMIN">Doctor Admin (Full Rights)</option>
                          <option value="SUPER_ADMIN">Super Admin (Platform)</option>
                        </select>
                      </td>

                      <td className="py-4 px-4">
                        <Badge variant={user.status === 'active' ? 'success' : 'danger'} dot>
                          {user.status}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-right space-x-2">
                        <button
                          onClick={() =>
                            updateUser(user.id, {
                              status: user.status === 'active' ? 'inactive' : 'active',
                            })
                          }
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                            user.status === 'active'
                              ? 'bg-white text-slate-700 border-slate-200 hover:bg-surface-100'
                              : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          }`}
                        >
                          {user.status === 'active' ? 'Suspend' : 'Reactivate'}
                        </button>

                        <button
                          onClick={() => setResetPasswordTarget(user)}
                          className="text-[11px] font-bold p-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-surface-100 transition-all inline-flex items-center"
                          title="Reset password"
                        >
                          <KeyRound size={13} />
                        </button>

                        <button
                          onClick={() => deleteUserGlobal(user.id)}
                          className="text-[11px] font-bold p-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 transition-all inline-flex items-center"
                          title="Revoke and delete user account"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          )}
        </div>
      )}

      {/* TAB 3: ASSIGN DOCTOR ADMIN */}
      {activeTab === 'assign-doctor' && (
        <div className="bg-white rounded-b-3xl border-b border-x border-border shadow-elevation-1 p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">Clinic Doctor Admin Assignments</h2>
            <p className="text-xs text-slate-500">
              Select or reassign the designated Doctor Admin (Tenant Owner) for each dental clinic.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {allTenants.map((tenant) => (
              <div
                key={tenant.id}
                className="bg-surface-50 rounded-3xl p-6 border border-border flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-base text-slate-900">{tenant.name}</span>
                    <Badge variant={tenant.status === 'active' ? 'success' : 'neutral'} dot>
                      {tenant.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">{tenant.slug}.dentrix.io</p>

                  <div className="mt-4 p-4 bg-white rounded-2xl border border-border/80 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Currently Assigned Doctor Admin
                    </span>
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
                        <Stethoscope size={20} />
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 block">
                          {tenant.doctorAdminName}
                        </span>
                        <span className="text-xs text-slate-500">{tenant.doctorAdminEmail}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleOpenAssignDoctor(tenant)}
                  className="w-full py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-2xl shadow-md shadow-primary-600/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <Stethoscope size={15} />
                  <span>Assign / Change Doctor Admin</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CLINIC SERVICES CONTROL */}
      {activeTab === 'services' && (
        <div className="bg-white rounded-b-3xl border-b border-x border-border shadow-elevation-1 p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Clinic Dental Services Control</h2>
              <p className="text-xs text-slate-500">
                Super Admin governance to activate or deactivate dental procedures per clinic tenant
              </p>
            </div>

            {/* Select Clinic */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Select Clinic:</span>
              <select
                value={selectedClinicForServices}
                onChange={(e) => setClinicFilter(e.target.value)}
                className="bg-surface-50 border border-border rounded-xl px-3.5 py-1.5 text-xs font-bold text-primary-800"
              >
                {allTenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3.5 px-4">CDT Code</th>
                  <th className="py-3.5 px-4">Procedure Name</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Standard Duration</th>
                  <th className="py-3.5 px-4">Base Fee</th>
                  <th className="py-3.5 px-4">Platform Status</th>
                  <th className="py-3.5 px-4 text-right">Super Admin Toggle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clinicServices.map((service) => (
                  <tr key={service.id} className="hover:bg-surface-50/60">
                    <td className="py-4 px-4 font-mono font-bold text-primary-700 text-sm">
                      {service.code}
                    </td>
                    <td className="py-4 px-4 font-semibold text-slate-900">
                      {service.name}
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-100 text-slate-700 font-semibold border border-slate-200">
                        {service.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-slate-600">{service.durationMinutes} mins</td>
                    <td className="py-4 px-4 font-bold text-slate-900">{formatINR(service.basePrice)}</td>
                    <td className="py-4 px-4">
                      <Badge variant={service.isActive ? 'success' : 'neutral'} dot>
                        {service.isActive ? 'Active' : 'Deactivated'}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => toggleServiceActive(service.id)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition-all ${
                          service.isActive
                            ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {service.isActive ? 'Deactivate Service' : 'Activate Service'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: EDIT SUBSCRIPTION */}
      {editingTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
              <div>
                <h3 className="text-base font-bold text-slate-900">Manage Clinic Subscription</h3>
                <p className="text-xs text-slate-500">Clinic: {editingTenant.name}</p>
              </div>
              <button
                onClick={() => setEditingTenant(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSubscription} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
                  <select
                    value={subFormData.plan}
                    onChange={(e) =>
                      setSubFormData({
                        ...subFormData,
                        plan: e.target.value as any,
                        monthlyFee: e.target.value === 'Starter' ? 7999 : e.target.value === 'Professional' ? 15999 : 31999,
                        chairLimit: e.target.value === 'Starter' ? 2 : e.target.value === 'Professional' ? 6 : 15,
                      })
                    }
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 font-bold text-slate-800"
                  >
                    <option value="Starter">Starter (₹7,999/mo)</option>
                    <option value="Professional">Professional (₹15,999/mo)</option>
                    <option value="Enterprise">Enterprise (₹31,999/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Subscription Status</label>
                  <select
                    value={subFormData.status}
                    onChange={(e) => setSubFormData({ ...subFormData, status: e.target.value as any })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 font-bold text-slate-800"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial Period</option>
                    <option value="Past Due">Past Due</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Billing Cycle</label>
                  <select
                    value={subFormData.billingCycle}
                    onChange={(e) => setSubFormData({ ...subFormData, billingCycle: e.target.value as any })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                  >
                    <option value="Monthly">Monthly Recurring</option>
                    <option value="Annual">Annual Pre-paid (15% discount)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Monthly Billed Fee (₹ INR)</label>
                  <input
                    type="number"
                    value={subFormData.monthlyFee}
                    onChange={(e) => setSubFormData({ ...subFormData, monthlyFee: Number(e.target.value) })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 font-bold text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Operatory Chair Quota</label>
                  <input
                    type="number"
                    value={subFormData.chairLimit}
                    onChange={(e) => setSubFormData({ ...subFormData, chairLimit: Number(e.target.value) })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 font-bold text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Next Renewal Date</label>
                  <input
                    type="date"
                    value={subFormData.renewalDate}
                    onChange={(e) => setSubFormData({ ...subFormData, renewalDate: e.target.value })}
                    className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingTenant(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/20"
                >
                  Save Subscription Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ASSIGN DOCTOR ADMIN */}
      {assigningTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-primary-100 text-primary-700 rounded-xl">
                  <Stethoscope size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Assign Clinic Doctor Admin</h3>
                  <p className="text-xs text-slate-500">{assigningTenant.name}</p>
                </div>
              </div>
              <button
                onClick={() => setAssigningTenant(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAssignDoctor} className="p-6 space-y-4 text-xs">
              <p className="text-slate-600">
                Select a doctor or clinical user to assign as the official Doctor Admin for <strong>{assigningTenant.name}</strong>. This user will automatically receive full tenant ownership rights.
              </p>

              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">
                  Select Doctor User
                </label>
                <select
                  value={selectedDoctorUserId}
                  onChange={(e) => setSelectedDoctorUserId(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2.5 text-xs font-bold text-slate-800"
                  required
                >
                  {allUsers.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.email} ({u.role.replace('_', ' ')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setAssigningTenant(null)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: RESET PASSWORD */}
      {resetPasswordTarget && (
        <ResetPasswordModal
          userName={resetPasswordTarget.name}
          userTitle={resetPasswordTarget.title}
          onClose={() => setResetPasswordTarget(null)}
          onConfirm={handleConfirmResetPassword}
        />
      )}
    </div>
  );
};
