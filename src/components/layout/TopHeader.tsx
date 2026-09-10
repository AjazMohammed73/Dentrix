import React, { useState, useEffect } from 'react';
import {
  Bell,
  Search,
  Plus,
  Building,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Globe,
  Sparkles,
  LucideIcon,
  LogOut,
  FileText,
  Lock,
  Database,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { AuditLogModal } from '../modals/AuditLogModal';
import { CommandPalette } from '../common/CommandPalette';

interface TopHeaderProps {
  onQuickBook: () => void;
  onOpenCreateInvoice?: () => void;
  onViewLandingPage?: () => void;
  onSignOut?: () => void;
  onSelectPatient?: (patientId: string) => void;
  onNavigate?: (route: any) => void;
  onLockWorkstation?: () => void;
  onOpenBackup?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onQuickBook,
  onOpenCreateInvoice,
  onViewLandingPage,
  onSignOut,
  onSelectPatient = () => {},
  onNavigate = () => {},
  onLockWorkstation,
  onOpenBackup,
}) => {
  const {
    currentUser,
    currentTenant,
    allTenants,
    switchRole,
    switchTenant,
    logout,
  } = useAuth();

  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
  const canViewAudit = currentUser.role === 'DOCTOR_ADMIN' || currentUser.role === 'SUPER_ADMIN';
  const canManageBackup = currentUser.role === 'DOCTOR_ADMIN' || currentUser.role === 'SUPER_ADMIN';
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const roles: { role: UserRole; label: string; icon: LucideIcon }[] = [
    { role: 'SUPER_ADMIN', label: 'Super Admin', icon: ShieldCheck },
    { role: 'DOCTOR_ADMIN', label: 'Doctor Admin', icon: Stethoscope },
    { role: 'STAFF', label: 'Staff (Front Desk)', icon: UserCog },
  ];

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between z-20 sticky top-0 shadow-sm">
      {/* Left: Search & Clinic selector */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        {/* Tenant selector dropdown if not Super Admin */}
        {!isSuperAdmin ? (
          <div className="relative flex items-center">
            <div className="flex items-center space-x-2 bg-surface-50 border border-slate-200/90 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
              <Building size={14} className="text-primary-600 flex-shrink-0" />
              <select
                aria-label="Select Clinic Tenant"
                value={currentTenant?.id || ''}
                onChange={(e) => switchTenant(e.target.value)}
                className="bg-transparent border-none focus:outline-none cursor-pointer pr-2 text-slate-800 font-medium"
              >
                {allTenants.map((t) => (
                  <option key={t.id} value={t.id} disabled={t.status === 'suspended'}>
                    {t.name} {t.status === 'suspended' ? '(Suspended)' : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm">
            <Sparkles size={14} className="text-amber-600 flex-shrink-0" />
            <span>Platform Root Console</span>
          </div>
        )}

        {/* Global search Omnibox Trigger */}
        <div className="relative flex-1 hidden md:block">
          <button
            type="button"
            onClick={() => setIsCommandPaletteOpen(true)}
            className="w-full bg-surface-50 hover:bg-surface-100 border border-border/80 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-400 flex items-center justify-between transition-all group cursor-pointer shadow-2xs"
          >
            <div className="flex items-center">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-primary-600 transition-colors" />
              <span className="text-slate-500 font-medium truncate">
                Search patients, CDT codes, appointments...
              </span>
            </div>
            <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-500 rounded border border-slate-200 shadow-2xs">
              Ctrl K
            </kbd>
          </button>
        </div>
      </div>

      {/* Center/Right: Interactive Role Switcher & Actions */}
      <div className="flex items-center space-x-3">
        {/* Role Switcher Pill Bar */}
        <div className="hidden lg:flex items-center bg-surface-100 p-1 rounded-xl border border-border/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2">
            Simulate Role:
          </span>
          {roles.map(({ role, label, icon: Icon }) => {
            const isCurrent = currentUser.role === role;
            return (
              <button
                key={role}
                onClick={() => switchRole(role)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'bg-white text-primary-700 shadow-sm border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon size={14} className={isCurrent ? 'text-primary-600' : 'text-slate-400'} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Create Invoice button (Available to Staff and Doctors, without revenue page access) */}
        {!isSuperAdmin && onOpenCreateInvoice && (
          <button
            onClick={onOpenCreateInvoice}
            className="flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 active:scale-95 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Create Patient Invoice"
          >
            <FileText size={14} className="text-emerald-700" />
            <span className="hidden sm:inline">Create Invoice</span>
          </button>
        )}

        {/* Quick Book Appointment button (Doctor or Staff) */}
        {!isSuperAdmin && (
          <button
            onClick={onQuickBook}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-primary-600/20 transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Book Appointment</span>
          </button>
        )}

        {/* Landing Page Trigger */}
        {onViewLandingPage && (
          <button
            onClick={onViewLandingPage}
            className="flex items-center space-x-1.5 bg-surface-100 hover:bg-surface-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-border transition-colors"
            title="View Public Landing Page"
          >
            <Globe size={14} className="text-primary-600" />
            <span className="hidden sm:inline">Landing Page</span>
          </button>
        )}

        {/* Powered by Axiotronicx Tag */}
        <div className="hidden xl:flex items-center px-2 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          Powered by Axiotronicx.Inc
        </div>

        {/* Sign Out Trigger */}
        <button
          onClick={() => {
            logout();
            if (onSignOut) onSignOut();
          }}
          className="flex items-center space-x-1 text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border border-transparent hover:border-rose-200"
          title="Sign Out"
        >
          <LogOut size={15} />
          <span className="hidden md:inline">Sign Out</span>
        </button>

        {/* Backup & Disaster Recovery Center - Guarded for Admins */}
        {onOpenBackup && canManageBackup && (
          <button
            onClick={onOpenBackup}
            className="flex items-center space-x-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Clinic Statutory Data Backup & Disaster Recovery"
          >
            <Database size={14} className="text-sky-700" />
            <span className="hidden sm:inline">Backup</span>
          </button>
        )}

        {/* Lock Workstation (Privacy Screen) */}
        {onLockWorkstation && (
          <button
            onClick={onLockWorkstation}
            className="flex items-center space-x-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Lock Chairside Terminal (HIPAA PHI Privacy Lock)"
          >
            <Lock size={14} className="text-slate-600" />
            <span className="hidden sm:inline">Lock</span>
          </button>
        )}

        {/* Audit Trail Trigger */}
        {canViewAudit && (
          <button
            onClick={() => setIsAuditModalOpen(true)}
            className="flex items-center space-x-1.5 bg-purple-50 hover:bg-purple-100 text-purple-800 border border-purple-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Open HIPAA & Security Audit Trail"
          >
            <ShieldCheck size={14} className="text-purple-700" />
            <span className="hidden sm:inline">Audit Trail</span>
          </button>
        )}

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-surface-100 rounded-xl transition-colors relative"
            title="Notifications"
          >
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-clinical-danger animate-pulse" />
          </button>
        </div>
      </div>

      {/* Audit Log Modal */}
      <AuditLogModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />

      {/* Global Command Palette Omnibox */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectPatient={onSelectPatient}
        onNavigate={onNavigate}
        onQuickBook={onQuickBook}
        onOpenCreateInvoice={onOpenCreateInvoice}
        onOpenAudit={() => setIsAuditModalOpen(true)}
      />
    </header>
  );
};
