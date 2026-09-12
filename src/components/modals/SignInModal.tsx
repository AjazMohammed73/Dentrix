import React, { useState } from 'react';
import { Mail, Lock, LogIn, ShieldAlert, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Tooth3D } from '../layout/Tooth3DLazy';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithCredentials } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const result = await loginWithCredentials(email, password);
      if (result.success) {
        onClose();
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(result.error || 'Failed to sign in. Please verify your credentials.');
      }
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Authentication error.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-surface-50 to-white">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
              <Tooth3D size={46} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black text-slate-900 tracking-tight">Dentrix Sign In</h2>
                <span className="text-[10px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200">
                  Secure Portal
                </span>
              </div>
              <p className="text-xs text-slate-500">Role-based dental practice access</p>
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
                  autoComplete="username"
                  placeholder="you@clinic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl pl-10 pr-16 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-100"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-bold text-slate-400 hover:text-slate-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white rounded-2xl text-xs font-extrabold shadow-md shadow-primary-600/25 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>Signing in…</span>
              ) : (
                <>
                  <LogIn size={16} />
                  <span>Sign In to Clinical Workspace</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-surface-50 border-t border-border flex items-center justify-between text-[11px] text-slate-500">
          <span>Encrypted session · role-based access</span>
          <span className="font-bold text-slate-600">Axiotronicx.Inc</span>
        </div>
      </div>
    </div>
  );
};
