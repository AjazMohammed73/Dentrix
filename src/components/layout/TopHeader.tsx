import React, { useState } from 'react';
import {
  Bell,
  Search,
  Plus,
  Building,
  ShieldCheck,
  Globe,
  Sparkles,
  LogOut,
  FileText,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AuditLogModal } from '../modals/AuditLogModal';

interface TopHeaderProps {
  onQuickBook: () => void;
  onOpenCreateInvoice?: () => void;
  onViewLandingPage?: () => void;
  onSignOut?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  onQuickBook,
  onOpenCreateInvoice,
  onViewLandingPage,
  onSignOut,
}) => {
  const { currentUser, currentTenant, logout } = useAuth();

  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
  const canViewAudit = currentUser.role === 'DOCTOR_ADMIN' || currentUser.role === 'SUPER_ADMIN';
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-border px-6 flex items-center justify-between z-20 sticky top-0 shadow-sm">
      {/* Left: Clinic identity & search */}
      <div className="flex items-center space-x-4 flex-1 max-w-xl">
        {isSuperAdmin ? (
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200/80 rounded-xl px-3 py-1.5 text-xs font-bold text-amber-900 shadow-sm">
            <Sparkles size={14} className="text-amber-600 flex-shrink-0" />
            <span>Platform Root Console</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2 bg-surface-50 border border-slate-200/90 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm">
            <Building size={14} className="text-primary-600 flex-shrink-0" />
            <span className="truncate max-w-[200px]">{currentTenant?.name || 'Clinic'}</span>
          </div>
        )}

        {/* Global search */}
        <div className="relative flex-1 hidden md:block">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search patients by name, phone, or CDT code..."
            className="w-full bg-surface-50 border border-border/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center space-x-3">
        {/* Create Invoice (Staff and Doctors) */}
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

        {/* Quick Book Appointment */}
        {!isSuperAdmin && (
          <button
            onClick={onQuickBook}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md shadow-primary-600/20 transition-all"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Book Appointment</span>
          </button>
        )}

        {/* Landing Page */}
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

        {/* Sign Out */}
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

        {/* Audit Trail */}
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

      <AuditLogModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
      />
    </header>
  );
};
