import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { NavRoute } from '../components/layout/Sidebar';

interface AccessDeniedViewProps {
  attemptedRoute: string;
  requiredRoleOrPermission: string;
  onNavigateHome: () => void;
}

export const AccessDeniedView: React.FC<AccessDeniedViewProps> = ({
  attemptedRoute,
  requiredRoleOrPermission,
  onNavigateHome,
}) => {
  const { currentUser, currentTenant } = useAuth();

  return (
    <div className="p-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6 animate-fadeIn">
      {/* Icon Shield */}
      <div className="w-20 h-20 rounded-3xl bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/10">
        <ShieldAlert size={42} />
      </div>

      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-900 text-xs font-bold px-3 py-1 rounded-full border border-rose-300">
          <Lock size={12} /> RBAC Access Segregation Enforced
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Permission Restricted View
        </h1>
        <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
          Your current authenticated profile does not possess the authorized privilege required to view the{' '}
          <span className="font-mono font-bold text-slate-900">/{attemptedRoute}</span> clinical module.
        </p>
      </div>

      {/* Access Diagnostics Card */}
      <div className="w-full bg-white rounded-3xl p-6 border border-border shadow-elevation-1 text-left space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Security Context Diagnostic
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 bg-surface-50 rounded-2xl border border-border">
            <span className="text-[11px] text-slate-500 block font-semibold">Active User Account</span>
            <span className="font-bold text-slate-900 text-sm">{currentUser.name}</span>
            <span className="text-[11px] text-slate-400 block font-mono">{currentUser.email}</span>
          </div>

          <div className="p-3 bg-surface-50 rounded-2xl border border-border">
            <span className="text-[11px] text-slate-500 block font-semibold">Assigned Role Scope</span>
            <span className="font-bold text-primary-700 text-sm">
              {currentUser.role.replace('_', ' ')}
            </span>
            <span className="text-[11px] text-slate-400 block">{currentTenant?.name || 'Platform Level'}</span>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <span className="font-bold block">Privilege Requirement:</span>
          <p>
            This section requires <strong className="text-amber-950 font-mono">{requiredRoleOrPermission}</strong>.
            Financial and administrative permissions are governed by the designated Doctor Admin or Platform Super Admin.
          </p>
        </div>
      </div>

      {/* Return Button */}
      <button
        onClick={onNavigateHome}
        className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all"
      >
        <ArrowLeft size={16} />
        <span>Return to Authorized Dashboard</span>
      </button>

      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
        Dentrix Security & RBAC Engine • Axiotronicx.Inc
      </span>
    </div>
  );
};
