import React, { useState } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Phone,
  Mail,
  Shield,
  AlertTriangle,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';

interface PatientsViewProps {
  onSelectPatient: (patientId: string) => void;
  onOpenAddPatient: () => void;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  onSelectPatient,
  onOpenAddPatient,
}) => {
  const { patients } = useData();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterAlertsOnly, setFilterAlertsOnly] = useState(false);

  const filteredPatients = patients.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      p.firstName.toLowerCase().includes(query) ||
      p.lastName.toLowerCase().includes(query) ||
      p.phone.includes(query) ||
      p.insurance.provider.toLowerCase().includes(query);

    const matchesAlert = !filterAlertsOnly || p.medicalAlerts.length > 0;
    return matchesSearch && matchesAlert;
  });

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
            <Users size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Master Patient Directory</h1>
            <p className="text-xs text-slate-500">
              Manage clinical demographics, insurance policies, and clinical medical histories.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddPatient}
          className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all"
        >
          <UserPlus size={16} />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative flex-1 w-full max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, phone, or insurance provider..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-border rounded-2xl pl-10 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterAlertsOnly(!filterAlertsOnly)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-2xl text-xs font-semibold border transition-all ${
              filterAlertsOnly
                ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                : 'bg-white border-border text-slate-600 hover:bg-surface-50'
            }`}
          >
            <AlertTriangle size={14} className={filterAlertsOnly ? 'text-rose-600' : 'text-slate-400'} />
            <span>High Risk / Medical Alerts ({patients.filter((p) => p.medicalAlerts.length > 0).length})</span>
          </button>
        </div>
      </div>

      {/* Patient Cards / Table */}
      <div className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="py-3.5 px-5">Patient Name</th>
                <th className="py-3.5 px-5">Contact Details</th>
                <th className="py-3.5 px-5">Insurance Coverage</th>
                <th className="py-3.5 px-5">Medical Alerts & Risk</th>
                <th className="py-3.5 px-5">Account Balance</th>
                <th className="py-3.5 px-5">Last Visit</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredPatients.map((patient) => (
                <tr
                  key={patient.id}
                  onClick={() => onSelectPatient(patient.id)}
                  className="hover:bg-primary-50/30 cursor-pointer transition-colors group"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs shadow-sm">
                        {patient.firstName[0]}
                        {patient.lastName[0]}
                      </div>
                      <div>
                        <span className="font-bold text-sm text-slate-900 group-hover:text-primary-600 transition-colors">
                          {patient.firstName} {patient.lastName}
                        </span>
                        <p className="text-[11px] text-slate-500">
                          DOB: {patient.dateOfBirth} ({patient.gender})
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-5 text-slate-600 space-y-0.5">
                    <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
                      <Phone size={12} className="text-slate-400" />
                      <span>{patient.phone}</span>
                    </div>
                    <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 truncate max-w-[170px]">
                      <Mail size={12} className="text-slate-400" />
                      <span className="truncate">{patient.email}</span>
                    </div>
                  </td>

                  <td className="py-4 px-5">
                    <div className="flex items-center space-x-1.5 font-medium text-slate-800">
                      <Shield size={13} className="text-primary-600 flex-shrink-0" />
                      <span className="truncate">{patient.insurance.provider}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 block">
                      ID: {patient.insurance.policyNumber}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    {patient.medicalAlerts.length > 0 ? (
                      <div className="flex flex-wrap gap-1 max-w-[200px]">
                        {patient.medicalAlerts.map((alert) => (
                          <span
                            key={alert}
                            className="bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-bold px-2 py-0.5 rounded-full"
                          >
                            {alert}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">No active alerts</span>
                    )}
                  </td>

                  <td className="py-4 px-5 font-semibold">
                    {patient.balance > 0 ? (
                      <span className="text-rose-600 font-bold">${patient.balance} Due</span>
                    ) : (
                      <span className="text-emerald-600 font-semibold">$0.00 (Current)</span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-slate-500 font-mono text-[11px]">
                    {patient.lastVisit || 'First Visit'}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <div className="inline-flex items-center text-primary-600 group-hover:translate-x-1 transition-transform">
                      <span className="text-xs font-bold mr-1">Chart</span>
                      <ChevronRight size={16} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
