import React, { useState } from 'react';
import {
  Building2,
  Plus,
  Database,
  HardDrive,
  Activity,
  ShieldCheck,
  Search,
  ExternalLink,
  Power,
  RefreshCw,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

interface SuperAdminViewProps {
  onOpenOnboardModal: () => void;
}

export const SuperAdminView: React.FC<SuperAdminViewProps> = ({ onOpenOnboardModal }) => {
  const { allTenants, toggleTenantStatus } = useAuth();
  const { systemHealth, allAppointments, allPatients } = useData();

  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenants = allTenants.filter((t) => {
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.slug.toLowerCase().includes(q) ||
      t.doctorAdminName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-amber-50 text-amber-700 rounded-2xl">
            <Building2 size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Multi-Tenant Platform Console</h1>
            <p className="text-xs text-slate-500">
              Provision clinic database partitions, assign doctor owners, and oversee system health.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenOnboardModal}
          className="flex items-center space-x-1.5 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-amber-600/20 transition-all"
        >
          <Plus size={16} />
          <span>Provision New Clinic Tenant</span>
        </button>
      </div>

      {/* Global Cloud Infrastructure Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Total Provisioned Clinics"
          value={allTenants.length}
          subtitle={`${allTenants.filter((t) => t.status === 'active').length} Active tenants`}
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
          title="Platform Storage Usage"
          value={`${systemHealth.storageUsedGb} GB`}
          subtitle="PostgreSQL logical partitions"
          icon={HardDrive}
          iconBgColor="bg-indigo-50"
          iconColor="text-indigo-700"
        />
        <StatCard
          title="Platform High Availability"
          value={`${systemHealth.uptimePercent}%`}
          subtitle="Zero-downtime SLA"
          icon={Activity}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-700"
        />
      </div>

      {/* Tenant Directory Section */}
      <div className="bg-white rounded-3xl border border-border shadow-elevation-1 p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Clinic Tenant Directory</h2>
            <p className="text-xs text-slate-500">
              Live multi-tenant partitions with isolated database storage quotas
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by clinic name or doctor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-2xl pl-9 pr-3.5 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
              <tr>
                <th className="py-3.5 px-4">Clinic Organization</th>
                <th className="py-3.5 px-4">Subdomain / Tenant ID</th>
                <th className="py-3.5 px-4">Doctor Admin</th>
                <th className="py-3.5 px-4">Storage Allocation</th>
                <th className="py-3.5 px-4">Subscription Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Lifecycle Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="hover:bg-surface-50/60">
                  <td className="py-4 px-4">
                    <span className="font-bold text-sm text-slate-900 block">
                      {tenant.name}
                    </span>
                    <span className="text-[11px] text-slate-400">{tenant.address}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-primary-700 bg-primary-50 px-2 py-0.5 rounded-lg border border-primary-100">
                      {tenant.slug}.dentrix.io
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      ID: {tenant.id}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-semibold text-slate-800 block">
                      {tenant.doctorAdminName}
                    </span>
                    <span className="text-[11px] text-slate-400">{tenant.doctorAdminEmail}</span>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-mono text-slate-700 font-semibold block">
                      {tenant.storageMb} MB
                    </span>
                    <div className="w-24 h-1.5 bg-surface-200 rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full bg-primary-600 rounded-full"
                        style={{ width: `${Math.min(100, (tenant.storageMb / 2000) * 100)}%` }}
                      />
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-bold text-[11px] px-2.5 py-0.5 rounded-full bg-surface-100 text-slate-700 border border-slate-200">
                      {tenant.plan}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    <Badge variant={tenant.status === 'active' ? 'success' : 'danger'} dot>
                      {tenant.status.toUpperCase()}
                    </Badge>
                  </td>

                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleTenantStatus(tenant.id)}
                      className={`text-[11px] font-bold px-3 py-1 rounded-xl border transition-all ${
                        tenant.status === 'active'
                          ? 'bg-white text-rose-600 border-rose-200 hover:bg-rose-50'
                          : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                      }`}
                    >
                      {tenant.status === 'active' ? 'Suspend Tenant' : 'Activate Tenant'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
