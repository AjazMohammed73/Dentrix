import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldAlert, Sparkles, X, Check, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Tooth3D } from '../layout/Tooth3D';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithEmail, allUsers } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = loginWithEmail(email);
      setIsLoading(false);

      if (result.success) {
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(result.error || 'Failed to sign in. Please check your email.');
      }
    }, 400);
  };

  const handleQuickSelect = (userEmail: string) => {
    setEmail(userEmail);
    setErrorMessage(null);
  };

  const demoAccounts = [
    {
      role: 'Super Admin',
      name: 'Arthur Pendelton',
      email: 'superadmin@dentrixplatform.io',
      badge: 'Platform Root',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    },
    {
      role: 'Doctor Admin',
      name: 'Dr. Sarah Vance, DDS',
      email: 'dr.vance@apexdental.com',
      badge: 'Apex Dental Owner',
      badgeColor: 'bg-primary-100 text-primary-800 border-primary-200',
    },
    {
      role: 'Front Desk Staff',
      name: 'Emma Robinson',
      email: 'emma.reception@apexdental.com',
      badge: 'Scoped (No Revenue)',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      role: 'Dental Hygienist',
      name: 'Marcus Lee, RDH',
      email: 'marcus.hygiene@apexdental.com',
      badge: 'Scoped (Clinical Notes)',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-surface-50 to-white">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
              <Tooth3D size={38} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 tracking-tight">Dentrix Sign In</h2>
                <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">
                  Secure Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">
                ⚡ Powered by Axiotronicx.Inc • Role-based dental access
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-surface-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-800 animate-fadeIn">
              <ShieldAlert size={16} className="text-rose-600 flex-shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Email Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Staff or Doctor Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="e.g. dr.vance@apexdental.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">Security Password</label>
                <span className="text-[11px] text-primary-600 font-semibold cursor-pointer hover:underline">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-primary-600/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Authenticating credentials...</span>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Sign In to Clinical Workspace</span>
                </>
              )}
            </button>
          </form>

          {/* Quick-switch Demo Accounts for fast evaluation */}
          <div className="pt-4 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">
                Demo Accounts for RBAC Testing:
              </span>
              <span className="text-[10px] text-slate-400 font-semibold">Click to fill</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {demoAccounts.map((acc) => {
                const isSelected = email.toLowerCase() === acc.email.toLowerCase();
                return (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleQuickSelect(acc.email)}
                    className={`text-left p-3 rounded-2xl border transition-all ${
                      isSelected
                        ? 'border-primary-600 bg-primary-50/70 shadow-sm ring-1 ring-primary-600'
                        : 'border-border bg-surface-50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-900">{acc.role}</span>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${acc.badgeColor}`}
                      >
                        {acc.badge}
                      </span>
                    </div>
                    <p className="text-[11px] font-medium text-slate-600 mt-1 truncate">{acc.name}</p>
                    <p className="text-[10px] font-mono text-slate-400 truncate">{acc.email}</p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-50 border-t border-border flex items-center justify-between text-[11px] text-slate-500">
          <span>End-to-end encrypted RBAC session</span>
          <span className="font-bold text-slate-600">Axiotronicx.Inc</span>
        </div>
      </div>
    </div>
  );
};
