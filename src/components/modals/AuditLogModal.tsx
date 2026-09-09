import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Calendar,
  User,
  Activity,
  FileCheck,
  Lock,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { AuditLogEntry } from '../../types';
import { toCsv, downloadCsv } from '../../utils/csv';
import { formatDateTime } from '../../utils/format';

interface AuditLogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditLogModal: React.FC<AuditLogModalProps> = ({ isOpen, onClose }) => {
  const { auditLogs } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  if (!isOpen) return null;

  const filteredLogs = auditLogs.filter((entry) => {
    const matchesQuery =
      searchQuery.trim() === '' ||
      entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.userRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (entry.details && entry.details.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (entry.resourceType && entry.resourceType.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesQuery) return false;

    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'SECURITY' && (entry.action.includes('LOGIN') || entry.action.includes('LOGOUT') || entry.action.includes('PASSWORD'))) return true;
    if (selectedFilter === 'CLINICAL' && entry.action.includes('CLINICAL')) return true;
    if (selectedFilter === 'PATIENT' && entry.action.includes('PATIENT')) return true;
    if (selectedFilter === 'BILLING' && entry.action.includes('INVOICE')) return true;
    if (selectedFilter === 'APPOINTMENT' && entry.action.includes('APPOINTMENT')) return true;

    return true;
  });

  const getActionBadgeColor = (action: string) => {
    if (action.includes('SECURITY') || action.includes('PASSWORD')) {
      return 'bg-purple-100 text-purple-800 border-purple-200';
    }
    if (action.includes('CLINICAL')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (action.includes('INVOICE')) {
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
    if (action.includes('APPOINTMENT')) {
      return 'bg-amber-100 text-amber-800 border-amber-200';
    }
    if (action.includes('DELETED') || action.includes('CANCELLED')) {
      return 'bg-rose-100 text-rose-800 border-rose-200';
    }
    return 'bg-slate-100 text-slate-700 border-slate-200';
  };

  const handleExportCSV = () => {
    const csv = toCsv([
      ['ID', 'Timestamp', 'User Name', 'User Role', 'Action', 'Resource Type', 'Resource ID', 'Details'],
      ...filteredLogs.map((l) => [
        l.id,
        l.timestamp,
        l.userName,
        l.userRole,
        l.action,
        l.resourceType,
        l.resourceId || '',
        l.details || '',
      ]),
    ]);
    downloadCsv(`dentrix_audit_trail_${new Date().toISOString().split('T')[0]}.csv`, csv);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-primary-100 text-primary-700 border border-primary-200">
              <ShieldCheck size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">Security & Clinical Audit Trail</h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <Lock size={10} /> Immutable Log
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Regulatory compliance log for electronic records, staff access, and cryptographic integrity.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Toolbar: Search, Filters & Export */}
        <div className="p-4 border-b border-border bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 w-full sm:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search audit trail by user, action, diagnosis, or invoice..."
                className="w-full pl-9 pr-3.5 py-1.5 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-medium"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end flex-wrap">
            <div className="flex items-center bg-surface-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              {['ALL', 'SECURITY', 'CLINICAL', 'PATIENT', 'BILLING', 'APPOINTMENT'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedFilter(tab)}
                  className={`px-2.5 py-1 rounded-lg font-semibold text-[11px] transition-all ${
                    selectedFilter === tab
                      ? 'bg-white text-primary-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="flex items-center space-x-1.5 bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
              title="Download verified audit logs in CSV format"
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="border border-border rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-surface-50 text-slate-600 font-semibold border-b border-border uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5 px-3.5">Timestamp</th>
                  <th className="py-2.5 px-3.5">User & Role</th>
                  <th className="py-2.5 px-3.5">Action</th>
                  <th className="py-2.5 px-3.5">Resource</th>
                  <th className="py-2.5 px-3.5">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No audit events match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-surface-50/70 transition-colors">
                      <td className="py-2.5 px-3.5 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                        {formatDateTime(log.timestamp)}
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <div className="font-bold text-slate-900 text-xs">{log.userName}</div>
                        <span className="text-[10px] text-slate-500 font-medium">{log.userRole}</span>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span
                          className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${getActionBadgeColor(
                            log.action
                          )}`}
                        >
                          {log.action}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 whitespace-nowrap">
                        <span className="font-semibold text-slate-800 text-[11px] bg-slate-100 px-2 py-0.5 rounded">
                          {log.resourceType}
                        </span>
                      </td>
                      <td className="py-2.5 px-3.5 text-slate-700 text-[11px] leading-relaxed max-w-md">
                        {log.details || '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-border bg-surface-50 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2 font-medium">
            <FileCheck size={14} className="text-emerald-600" />
            <span>
              Showing <strong className="text-slate-800">{filteredLogs.length}</strong> recorded audit events
            </span>
          </div>
          <div className="text-[11px] text-slate-400">
            Dentrix Clinical ERP • Axiotronicx Security Compliance Suite
          </div>
        </div>
      </div>
    </div>
  );
};
