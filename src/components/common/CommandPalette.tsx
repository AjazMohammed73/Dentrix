import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  User,
  Calendar,
  Stethoscope,
  DollarSign,
  Plus,
  ArrowRight,
  Sparkles,
  Command,
  X,
  FileText,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { formatINR } from '../../utils/format';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPatient: (patientId: string) => void;
  onNavigate: (route: any) => void;
  onQuickBook: () => void;
  onOpenCreateInvoice?: () => void;
  onOpenAudit?: () => void;
}

interface PaletteItem {
  id: string;
  category: 'patient' | 'appointment' | 'procedure' | 'action';
  title: string;
  subtitle: string;
  badge?: string;
  action: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectPatient,
  onNavigate,
  onQuickBook,
  onOpenCreateInvoice,
  onOpenAudit,
}) => {
  const { patients, appointments, services } = useData();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Auto-focus on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Build Results List based on query
  const q = query.toLowerCase().trim();

  const items: PaletteItem[] = [];

  // Default Quick Actions
  if (!q || q.includes('book') || q.includes('apt') || q.includes('appoint')) {
    items.push({
      id: 'act_book',
      category: 'action',
      title: 'Book New Appointment',
      subtitle: 'Open operatory chair scheduling engine',
      badge: 'Action',
      action: () => {
        onClose();
        onQuickBook();
      },
    });
  }

  if (!q || q.includes('patient') || q.includes('add') || q.includes('create')) {
    items.push({
      id: 'act_patient',
      category: 'action',
      title: 'Patients Directory',
      subtitle: 'View, search, or add dental patients',
      badge: 'Navigate',
      action: () => {
        onClose();
        onNavigate('patients');
      },
    });
  }

  if (!q || q.includes('bill') || q.includes('invoice') || q.includes('pay') || q.includes('rev')) {
    items.push({
      id: 'act_revenue',
      category: 'action',
      title: 'Financials & Revenue Tracking',
      subtitle: 'Invoices, payments, and clinic revenue',
      badge: 'Navigate',
      action: () => {
        onClose();
        onNavigate('revenue');
      },
    });
  }

  if (!q || q.includes('service') || q.includes('fee') || q.includes('cdt') || q.includes('procedure')) {
    items.push({
      id: 'act_services',
      category: 'action',
      title: 'Dental Services & Fee Schedule',
      subtitle: 'CDT procedure codes and procedure pricing',
      badge: 'Navigate',
      action: () => {
        onClose();
        onNavigate('services');
      },
    });
  }

  // Patients Match
  if (q) {
    patients
      .filter(
        (p) =>
          `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
          p.phone.includes(q) ||
          p.email.toLowerCase().includes(q) ||
          p.medicalAlerts?.some((m) => m.toLowerCase().includes(q))
      )
      .slice(0, 5)
      .forEach((p) => {
        items.push({
          id: `pat_${p.id}`,
          category: 'patient',
          title: `${p.firstName} ${p.lastName}`,
          subtitle: `${p.phone} • DOB: ${p.dateOfBirth}${
            p.medicalAlerts && p.medicalAlerts.length > 0
              ? ` • ⚠️ ${p.medicalAlerts.join(', ')}`
              : ''
          }`,
          badge: 'Patient Chart',
          action: () => {
            onClose();
            onSelectPatient(p.id);
          },
        });
      });

    // Appointments Match
    appointments
      .filter(
        (a) =>
          a.patientName.toLowerCase().includes(q) ||
          a.doctorName.toLowerCase().includes(q) ||
          a.serviceName.toLowerCase().includes(q) ||
          a.procedureCode.toLowerCase().includes(q) ||
          a.operatoryChair.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .forEach((a) => {
        items.push({
          id: `apt_${a.id}`,
          category: 'appointment',
          title: `${a.patientName} — ${a.serviceName}`,
          subtitle: `${a.date} at ${a.startTime} • ${a.operatoryChair} (${a.doctorName})`,
          badge: a.status,
          action: () => {
            onClose();
            onSelectPatient(a.patientId);
          },
        });
      });

    // Procedures Match
    services
      .filter(
        (s) =>
          s.code.toLowerCase().includes(q) ||
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      )
      .slice(0, 4)
      .forEach((s) => {
        items.push({
          id: `srv_${s.id}`,
          category: 'procedure',
          title: `[${s.code}] ${s.name}`,
          subtitle: `${s.category} • Base Fee: ${formatINR(s.basePrice)} • ${s.durationMinutes} mins`,
          badge: 'CDT Fee',
          action: () => {
            onClose();
            onNavigate('services');
          },
        });
      });
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (items[selectedIndex]) {
        items[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  // Scroll active item into view
  useEffect(() => {
    const activeEl = listRef.current?.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const getCategoryIcon = (category: PaletteItem['category']) => {
    switch (category) {
      case 'patient':
        return <User size={15} className="text-primary-600" />;
      case 'appointment':
        return <Calendar size={15} className="text-indigo-600" />;
      case 'procedure':
        return <Stethoscope size={15} className="text-teal-600" />;
      case 'action':
        return <Sparkles size={15} className="text-amber-500" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Bar */}
        <div className="p-4 border-b border-border flex items-center gap-3 bg-surface-50">
          <Search size={18} className="text-primary-600 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search patients, CDT codes (e.g. D0120), appointments, or actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
            >
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-slate-500 rounded-lg border border-slate-200 shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-100 flex-1">
          {items.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No matching patients, appointments, or CDT procedures found for &ldquo;{query}&rdquo;.
            </div>
          ) : (
            items.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-2xl cursor-pointer flex items-center justify-between gap-3 transition-all ${
                    isSelected
                      ? 'bg-primary-50 border border-primary-200/80 shadow-xs'
                      : 'hover:bg-surface-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={`p-2 rounded-xl flex-shrink-0 ${
                        isSelected ? 'bg-white shadow-xs' : 'bg-surface-100'
                      }`}
                    >
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-slate-900 truncate flex items-center gap-2">
                        <span>{item.title}</span>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider ${
                              item.badge === 'In-Chair'
                                ? 'bg-rose-100 text-rose-700'
                                : item.badge === 'Scheduled'
                                ? 'bg-sky-100 text-sky-700'
                                : item.badge === 'Patient Chart'
                                ? 'bg-primary-100 text-primary-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <ArrowRight
                      size={14}
                      className={isSelected ? 'text-primary-600' : 'text-slate-300'}
                    />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2.5 bg-surface-50 border-t border-border flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">
                ↑
              </kbd>
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">
                ↓
              </kbd>{' '}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-mono font-bold">
                ↵
              </kbd>{' '}
              Select
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <Command size={12} />
            <span>Dentrix Omnibox Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
