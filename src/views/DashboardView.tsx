import React, { useState } from 'react';
import {
  CalendarDays,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  Armchair,
  Stethoscope,
  Building2,
  Database,
  HardDrive,
  Activity,
  ArrowRight,
  FileText,
  MessageSquare,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { NavRoute } from '../components/layout/Sidebar';
import { AppointmentStatus, Appointment } from '../types';
import { formatINR, todayISO } from '../utils/format';
import { AppointmentReminderModal } from '../components/modals/AppointmentReminderModal';

interface DashboardViewProps {
  onNavigate: (route: NavRoute) => void;
  onBookAppointment: () => void;
  onSelectPatient: (patientId: string) => void;
  onOpenCreateInvoice?: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onBookAppointment,
  onSelectPatient,
  onOpenCreateInvoice,
}) => {
  const { currentUser, currentTenant, allTenants } = useAuth();
  const {
    appointments,
    patients,
    invoices,
    systemHealth,
    updateAppointmentStatus,
    operatoryChairs,
  } = useData();
  const [reminderAppointment, setReminderAppointment] = useState<Appointment | null>(null);

  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
  const canViewRevenue = currentUser.permissions.canViewRevenue || isSuperAdmin;

  const todayStr = todayISO();
  const todaysAppointments = appointments.filter((a) => a.date === todayStr);

  // Financial calculations
  const totalBilledToday = todaysAppointments.reduce((sum, a) => sum + a.fee, 0);
  const paidInvoices = invoices.filter((i) => i.status === 'Paid');
  const totalCollectedMonth = paidInvoices.reduce((sum, i) => sum + i.amountPaid, 0);
  const totalPendingBalance = invoices
    .filter((i) => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.balance, 0);

  // Operatory Chair Statuses from Dynamic Context
  const activeChairsList = operatoryChairs.filter((c) => c.isActive);
  const chairs = (
    activeChairsList.length > 0
      ? activeChairsList
      : [
          { id: '1', name: 'Chair 1 - Hygiene', chairType: 'Hygiene' as const },
          { id: '2', name: 'Chair 2 - Surgery', chairType: 'Surgery' as const },
          { id: '3', name: 'Chair 3 - General', chairType: 'General' as const },
        ]
  ).map((c) => ({
    name: c.name,
    currentApt: todaysAppointments.find(
      (a) => a.operatoryChair === c.name && a.status === 'In-Chair'
    ),
    nextApt: todaysAppointments.find(
      (a) => a.operatoryChair === c.name && (a.status === 'Scheduled' || a.status === 'Arrived')
    ),
  }));

  const waitingToday = todaysAppointments.filter((a) => a.status === 'Arrived');

  if (isSuperAdmin) {
    return (
      <div className="p-8 space-y-8 max-w-7xl mx-auto">
        {/* Super Admin Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-800 to-primary-950 text-white p-7 rounded-3xl shadow-elevation-3">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-amber-500/30">
              <Activity size={13} className="animate-pulse" /> Multi-Tenant System Root
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Super Admin Global Console</h1>
            <p className="text-xs text-slate-300 mt-1">
              Overseeing tenant database partitions, connection pooling, and infrastructure health.
            </p>
          </div>
          <button
            onClick={() => onNavigate('tenants')}
            className="self-start md:self-auto bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-2xl text-xs font-bold shadow-glow-royal transition-all flex items-center gap-2"
          >
            <Building2 size={16} /> Manage Clinic Tenants
          </button>
        </div>

        {/* Global Infrastructure Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <StatCard
            title="Active Clinic Tenants"
            value={allTenants.filter((t) => t.status === 'active').length}
            subtitle={`${allTenants.length} Total Provisioned`}
            icon={Building2}
            iconBgColor="bg-amber-50"
            iconColor="text-amber-700"
          />
          <StatCard
            title="Database Connection Pools"
            value={`${systemHealth.databasePools.active}/${systemHealth.databasePools.max}`}
            subtitle={`${systemHealth.databasePools.idle} Idle connections`}
            icon={Database}
            iconBgColor="bg-sky-50"
            iconColor="text-sky-700"
          />
          <StatCard
            title="Cloud Storage Footprint"
            value={`${systemHealth.storageUsedGb} GB`}
            subtitle={`of ${systemHealth.storageTotalGb} GB Allocated`}
            icon={HardDrive}
            iconBgColor="bg-indigo-50"
            iconColor="text-indigo-700"
          />
          <StatCard
            title="Platform Uptime SLA"
            value={`${systemHealth.uptimePercent}%`}
            subtitle="All services operational"
            icon={Activity}
            iconBgColor="bg-emerald-50"
            iconColor="text-emerald-700"
          />
        </div>

        {/* Tenants List Preview */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-base font-bold text-slate-900">Provisioned Dental Tenants</h2>
              <p className="text-xs text-slate-500">Logical schema partitions and Doctor Owners</p>
            </div>
            <button
              onClick={() => onNavigate('tenants')}
              className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              View Full Directory <ArrowRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3 px-4">Clinic Name</th>
                  <th className="py-3 px-4">Subdomain / Tenant ID</th>
                  <th className="py-3 px-4">Doctor Owner</th>
                  <th className="py-3 px-4">Storage</th>
                  <th className="py-3 px-4">Plan</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {allTenants.map((tenant) => (
                  <tr key={tenant.id} className="hover:bg-surface-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{tenant.name}</td>
                    <td className="py-3.5 px-4 font-mono text-primary-700">{tenant.slug}.dentrix.io</td>
                    <td className="py-3.5 px-4 text-slate-700">{tenant.doctorAdminName}</td>
                    <td className="py-3.5 px-4 text-slate-600">{tenant.storageMb} MB</td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {tenant.plan}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={tenant.status === 'active' ? 'success' : 'danger'} dot>
                        {tenant.status.toUpperCase()}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Doctor Admin & Staff Dashboard View
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Clinic Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-clinical-success animate-pulse" />
            <span className="text-xs font-bold text-primary-700 uppercase tracking-wider">
              {currentTenant?.name} — Clinical Operations
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            Welcome back, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            • {todaysAppointments.length} appointments scheduled today
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onOpenCreateInvoice && (
            <button
              onClick={onOpenCreateInvoice}
              className="px-4 py-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-xs font-bold text-emerald-800 transition-colors flex items-center gap-1.5 shadow-sm"
              title="Generate Patient Invoice"
            >
              <FileText size={15} className="text-emerald-700" />
              <span>Create Invoice</span>
            </button>
          )}
          <button
            onClick={() => onNavigate('appointments')}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-surface-100 transition-colors"
          >
            Open Calendar
          </button>
          <button
            onClick={onBookAppointment}
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold shadow-md shadow-primary-600/20 transition-all flex items-center gap-1.5"
          >
            + Book Appointment
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Appointments"
          value={todaysAppointments.length}
          subtitle={`${todaysAppointments.filter((a) => a.status === 'Completed').length} completed so far`}
          icon={CalendarDays}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
          onClick={() => onNavigate('appointments')}
        />
        <StatCard
          title="Active Patients"
          value={patients.length}
          trend={{ value: '12%', isPositive: true }}
          icon={Users}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
          onClick={() => onNavigate('patients')}
        />
        {canViewRevenue ? (
          <>
            <StatCard
              title="Today's Billed Production"
              value={formatINR(totalBilledToday)}
              subtitle="Mapped from CDT service fees"
              icon={DollarSign}
              iconBgColor="bg-sky-50"
              iconColor="text-sky-600"
              onClick={() => onNavigate('revenue')}
            />
            <StatCard
              title="Monthly Collections"
              value={formatINR(totalCollectedMonth)}
              subtitle={`Pending balance: ${formatINR(totalPendingBalance)}`}
              trend={{ value: '8.4%', isPositive: true }}
              icon={TrendingUp}
              iconBgColor="bg-amber-50"
              iconColor="text-amber-600"
              onClick={() => onNavigate('revenue')}
            />
          </>
        ) : null}
      </div>

      {/* Real-time Operatory Chair Monitoring */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Armchair size={18} className="text-primary-600" />
            Live Operatory Chair Status
          </h2>
          <span className="text-xs text-slate-600 font-medium">Real-time operatory flow</span>
        </div>

        {waitingToday.length > 0 && (
          <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs animate-fade-in shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>
                {waitingToday.length} patient{waitingToday.length > 1 ? 's' : ''} currently waiting
                in reception
              </span>
            </div>
            <button
              onClick={() => onNavigate('appointments')}
              className="font-bold text-amber-800 hover:text-amber-950 underline flex items-center gap-1"
            >
              <span>Manage Waiting Room Queue</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {chairs.map((chair) => (
            <div
              key={chair.name}
              className="bg-white rounded-3xl p-5 border border-border shadow-elevation-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-sm text-slate-900">{chair.name}</span>
                  <Badge variant={chair.currentApt ? 'danger' : 'success'} dot>
                    {chair.currentApt ? 'IN-CHAIR' : 'CHAIR VACANT'}
                  </Badge>
                </div>

                {chair.currentApt ? (
                  <div className="p-3.5 bg-rose-50/70 border border-rose-100 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">
                        {chair.currentApt.patientName}
                      </span>
                      <span className="text-[11px] font-mono font-semibold text-rose-700 bg-white px-2 py-0.5 rounded border border-rose-200">
                        {chair.currentApt.startTime} - {chair.currentApt.endTime}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      {chair.currentApt.serviceName} ({chair.currentApt.procedureCode})
                    </p>
                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[11px] text-slate-600">
                        Provider: {chair.currentApt.doctorName}
                      </span>
                      <button
                        onClick={() => updateAppointmentStatus(chair.currentApt!.id, 'Completed')}
                        className="text-[11px] font-bold text-emerald-700 bg-white hover:bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 transition-colors shadow-sm"
                      >
                        Mark Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-surface-50 border border-dashed border-slate-200 rounded-2xl text-center text-xs text-slate-600">
                    No patient currently in operatory chair.
                  </div>
                )}
              </div>

              {/* Next upcoming patient */}
              <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs">
                <span className="text-slate-600">Next Patient:</span>
                {chair.nextApt ? (
                  <span className="font-semibold text-primary-700 truncate max-w-[170px]">
                    {chair.nextApt.startTime} — {chair.nextApt.patientName}
                  </span>
                ) : (
                  <span className="text-slate-600 italic">No scheduled patients</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule Table */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Today's Appointment Schedule</h2>
            <p className="text-xs text-slate-500">Live clinical appointments for {todayStr}</p>
          </div>
          <button
            onClick={() => onNavigate('appointments')}
            className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
          >
            Full Calendar View <ArrowRight size={14} />
          </button>
        </div>

        {todaysAppointments.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No appointments scheduled for today. Click "Book Appointment" to schedule.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Dental Procedure</th>
                  <th className="py-3 px-4">Operatory</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {todaysAppointments.map((apt) => {
                  const getBadgeVariant = (st: AppointmentStatus) => {
                    switch (st) {
                      case 'Completed':
                        return 'success';
                      case 'In-Chair':
                        return 'danger';
                      case 'Scheduled':
                        return 'info';
                      case 'Delayed':
                        return 'warning';
                      default:
                        return 'neutral';
                    }
                  };

                  return (
                    <tr key={apt.id} className="hover:bg-surface-50/60">
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {apt.startTime} - {apt.endTime}
                      </td>
                      <td className="py-3 px-4 font-bold text-primary-700 hover:underline cursor-pointer"
                        onClick={() => onSelectPatient(apt.patientId)}
                      >
                        {apt.patientName}
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        <span className="font-mono text-slate-500 mr-1">[{apt.procedureCode}]</span>
                        {apt.serviceName}
                      </td>
                      <td className="py-3 px-4 text-slate-600">{apt.operatoryChair}</td>
                      <td className="py-3 px-4 text-slate-600">{apt.doctorName}</td>
                      <td className="py-3 px-4">
                        <Badge variant={getBadgeVariant(apt.status)} dot>
                          {apt.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReminderAppointment(apt)}
                            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors border border-slate-200"
                            title="Send WhatsApp Confirmation"
                          >
                            <MessageSquare size={14} />
                          </button>
                          <select
                            value={apt.status}
                            onChange={(e) =>
                              updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)
                            }
                            className="bg-surface-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 focus:outline-none cursor-pointer"
                          >
                            <option value="Scheduled">Scheduled</option>
                            <option value="Arrived">Arrived (Waiting)</option>
                            <option value="In-Chair">In-Chair</option>
                            <option value="Delayed">Delayed</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="No-Show">No-Show</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Appointment Reminder Modal */}
      <AppointmentReminderModal
        isOpen={!!reminderAppointment}
        onClose={() => setReminderAppointment(null)}
        appointment={reminderAppointment}
      />
    </div>
  );
};
