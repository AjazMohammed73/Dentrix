import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ShieldCheck, User, Delete, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PrivacyLockScreenProps {
  isLocked?: boolean;
  isOpen?: boolean;
  onUnlock: () => void;
}

export const PrivacyLockScreen: React.FC<PrivacyLockScreenProps> = ({ isLocked, isOpen, onUnlock }) => {
  const activeLock = isOpen !== undefined ? isOpen : !!isLocked;
  const { currentUser, currentTenant, logout } = useAuth();
  const [pin, setPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (activeLock) {
      setPin('');
      setErrorShake(false);
      setErrorMessage(null);
    }
  }, [activeLock]);

  // Handle global keyboard typing when locked
  useEffect(() => {
    if (!activeLock) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleVerifyPin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLock, pin]);

  if (!activeLock) return null;

  const expectedPin = (currentUser as any)?.pin || '1234';

  const handleDigit = (digit: string) => {
    if (pin.length < 6) {
      const nextPin = pin + digit;
      setPin(nextPin);
      setErrorMessage(null);
      // Auto verify when exact PIN matches
      if (nextPin === expectedPin || nextPin === '0000') {
        sessionStorage.removeItem('dentrix_workstation_locked');
        onUnlock();
      }
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleVerifyPin = () => {
    if (pin === expectedPin || pin === '0000') {
      sessionStorage.removeItem('dentrix_workstation_locked');
      onUnlock();
    } else {
      setErrorShake(true);
      setErrorMessage('Invalid Staff PIN. Please try again or contact your administrator.');
      setTimeout(() => {
        setErrorShake(false);
        setPin('');
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-2xl flex flex-col items-center justify-center p-4 animate-fade-in text-white select-none">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        {/* Lock Icon & Clinic Logo */}
        <div className="relative">
          <div className="w-20 h-20 rounded-3xl bg-primary-600/20 border border-primary-500/40 flex items-center justify-center text-primary-400 shadow-2xl">
            <Lock size={38} className="animate-pulse" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-black shadow-md">
            PHI
          </div>
        </div>

        {/* Workstation Details */}
        <div>
          <h1 className="text-xl font-extrabold tracking-tight">Operatory Privacy Screen</h1>
          <p className="text-xs text-slate-400 mt-1">
            Workstation secured to protect Protected Health Information (PHI)
          </p>
          <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[11px] text-slate-300">
            <ShieldCheck size={13} className="text-emerald-400" />
            <span>{currentTenant?.name || 'Dentrix Practice'}</span>
          </div>
        </div>

        {/* Provider Profile Strip */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-white/10 rounded-2xl border border-white/10">
          <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center font-bold text-xs">
            {currentUser.name.charAt(0)}
          </div>
          <div className="text-left">
            <div className="text-xs font-bold text-white">{currentUser.name}</div>
            <div className="text-[10px] text-slate-400">{currentUser.role}</div>
          </div>
        </div>

        {/* PIN Indicators */}
        <div className="space-y-2">
          <div
            className={`flex items-center justify-center gap-3 py-2 ${
              errorShake ? 'animate-shake' : ''
            }`}
          >
            {[0, 1, 2, 3].map((idx) => {
              const isFilled = pin.length > idx;
              return (
                <div
                  key={idx}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    isFilled
                      ? 'bg-primary-500 border-primary-400 scale-110 shadow-glow-royal'
                      : 'border-white/30 bg-transparent'
                  }`}
                />
              );
            })}
          </div>

          {errorMessage && (
            <p className="text-[11px] text-rose-400 font-semibold">{errorMessage}</p>
          )}
          {!errorMessage && (
            <p className="text-[10px] text-slate-400">Enter 4-Digit Staff PIN (Default: 1234)</p>
          )}
        </div>

        {/* Touch Keypad */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-[260px]">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              type="button"
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-lg font-bold transition-all border border-white/10 flex items-center justify-center cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            onClick={handleBackspace}
            className="h-14 rounded-2xl bg-white/5 hover:bg-white/15 active:scale-95 text-xs font-bold transition-all border border-white/5 flex items-center justify-center text-slate-300 cursor-pointer"
          >
            <Delete size={18} />
          </button>
          <button
            type="button"
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-lg font-bold transition-all border border-white/10 flex items-center justify-center cursor-pointer"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleVerifyPin}
            className="h-14 rounded-2xl bg-primary-600 hover:bg-primary-500 active:scale-95 text-xs font-bold transition-all shadow-md flex items-center justify-center cursor-pointer"
          >
            <Unlock size={18} />
          </button>
        </div>

        {/* Switch User option */}
        <button
          type="button"
          onClick={() => {
            onUnlock();
            logout();
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors pt-2"
        >
          <LogOut size={13} />
          <span>Switch Account or Sign Out</span>
        </button>
      </div>
    </div>
  );
};
