import React, { useState } from 'react';
import { KeyRound, X, Eye, EyeOff, ShieldCheck, AlertCircle } from 'lucide-react';

interface ResetPasswordModalProps {
  userName: string;
  userTitle?: string;
  onClose: () => void;
  onConfirm: (password: string) => Promise<void> | void;
}

const MIN_LENGTH = 12;

export const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  userName,
  userTitle,
  onClose,
  onConfirm,
}) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const strength = password.length >= 16 ? 'strong' : password.length >= MIN_LENGTH ? 'ok' : 'weak';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < MIN_LENGTH) {
      setError(`Password must be at least ${MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError(null);
    setSubmitting(true);
    await onConfirm(password);
    setSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-r from-primary-950 via-slate-900 to-slate-800 text-white flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-white/10 border border-white/15 rounded-2xl">
              <KeyRound size={20} className="text-primary-300" />
            </div>
            <div>
              <h3 className="text-base font-bold">Reset Password</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {userName}
                {userTitle ? <span className="text-slate-400"> • {userTitle}</span> : null}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2 text-xs text-rose-800 font-medium">
              <AlertCircle size={15} className="text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">New Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`Minimum ${MIN_LENGTH} characters`}
                className="w-full pl-3.5 pr-10 py-2.5 text-sm bg-surface-50 border border-border rounded-xl focus:outline-none focus:border-primary-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      strength === 'strong'
                        ? 'w-full bg-emerald-500'
                        : strength === 'ok'
                        ? 'w-2/3 bg-amber-500'
                        : 'w-1/3 bg-rose-500'
                    }`}
                  />
                </div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wide ${
                    strength === 'strong' ? 'text-emerald-600' : strength === 'ok' ? 'text-amber-600' : 'text-rose-600'
                  }`}
                >
                  {strength}
                </span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type the new password"
              className="w-full px-3.5 py-2.5 text-sm bg-surface-50 border border-border rounded-xl focus:outline-none focus:border-primary-500"
            />
          </div>

          <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl flex items-start gap-2 text-[11px] text-sky-800">
            <ShieldCheck size={15} className="text-sky-600 flex-shrink-0 mt-0.5" />
            <span>This immediately invalidates all of {userName}'s existing sessions on every device.</span>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-60 rounded-xl shadow-md shadow-primary-600/25"
            >
              {submitting ? 'Resetting…' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
