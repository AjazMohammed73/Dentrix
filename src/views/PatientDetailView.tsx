import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  FileText,
  DollarSign,
  AlertTriangle,
  HeartPulse,
  Shield,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Plus,
  Stethoscope,
  Smile,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { AddClinicalNoteModal } from '../components/modals/AddClinicalNoteModal';
import { formatINR, formatINRCurrency } from '../utils/format';

interface PatientDetailViewProps {
  patientId: string;
  onBack: () => void;
  onBookAppointment: (patientId: string) => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patientId,
  onBack,
  onBookAppointment,
}) => {
  const { patients, clinicalNotes, appointments, invoices } = useData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'notes' | 'chart' | 'appointments' | 'billing'>('notes');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(19);

  const patient = patients.find((p) => p.id === patientId) || patients[0];
  if (!patient) {
    return <div className="p-8">Patient not found.</div>;
  }

  const patientNotes = clinicalNotes
    .filter((n) => n.patientId === patient.id)
    .sort((a, b) => b.signedAt.localeCompare(a.signedAt));

  const patientAppointments = appointments
    .filter((a) => a.patientId === patient.id)
    .sort((a, b) => b.date.localeCompare(a.date));

  const patientInvoices = invoices.filter((i) => i.patientId === patient.id);

  const canWriteNotes = currentUser.permissions.canWriteDoctorNotes || currentUser.role === 'DOCTOR_ADMIN';
  const canViewRevenue = currentUser.permissions.canViewRevenue || currentUser.role === 'DOCTOR_ADMIN' || currentUser.role === 'SUPER_ADMIN';

  // Teeth 1 to 32
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1); // 1-16
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i); // 32-17

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back button & Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-2xl border border-border transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => onBookAppointment(patient.id)}
            className="flex items-center space-x-1.5 bg-white hover:bg-surface-50 text-slate-800 border border-border px-4 py-2 rounded-2xl text-xs font-bold shadow-sm transition-all"
          >
            <Calendar size={15} />
            <span>Schedule Visit</span>
          </button>
          {canWriteNotes && (
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/25 transition-all"
            >
              <Plus size={15} />
              <span>Add Clinical Note</span>
            </button>
          )}
        </div>
      </div>

      {/* Patient Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary-600 to-primary-400 text-white font-black text-2xl flex items-center justify-center shadow-md flex-shrink-0">
              {patient.firstName[0]}
              {patient.lastName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  {patient.firstName} {patient.lastName}
                </h1>
                <Badge variant={patient.status === 'Active' ? 'success' : 'neutral'} dot>
                  {patient.status}
                </Badge>
                <span className="text-xs font-mono bg-surface-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                  ID: {patient.id}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500 mt-1.5 flex-wrap">
                <span>DOB: {patient.dateOfBirth}</span>
                <span>Gender: {patient.gender}</span>
                <span className="flex items-center gap-1">
                  <Phone size={12} className="text-slate-400" /> {patient.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail size={12} className="text-slate-400" /> {patient.email}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Balance & Insurance pills */}
          <div className="flex items-center gap-3">
            {canViewRevenue && (
              <div className="p-3 bg-surface-50 border border-border rounded-2xl text-right">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  Account Balance
                </span>
                <span
                  className={`text-lg font-black ${
                    patient.balance > 0 ? 'text-rose-600' : 'text-emerald-600'
                  }`}
                >
                  {formatINR(patient.balance)}
                </span>
              </div>
            )}

            <div className="p-3 bg-primary-50/60 border border-primary-100 rounded-2xl max-w-[200px]">
              <span className="text-[10px] uppercase font-bold text-primary-700 block flex items-center gap-1">
                <Shield size={11} /> {patient.insurance.provider}
              </span>
              <span className="text-xs font-mono font-semibold text-slate-800 truncate block">
                {patient.insurance.policyNumber}
              </span>
            </div>
          </div>
        </div>

        {/* Critical Alerts Banner */}
        {patient.medicalAlerts.length > 0 && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center space-x-3 text-rose-800 text-xs animate-pulse">
            <AlertTriangle size={18} className="text-rose-600 flex-shrink-0" />
            <div className="flex-1">
              <span className="font-bold mr-2">CRITICAL MEDICAL ALERTS:</span>
              <div className="inline-flex flex-wrap gap-1.5 align-middle">
                {patient.medicalAlerts.map((alert) => (
                  <span
                    key={alert}
                    className="bg-white text-rose-700 font-bold px-2 py-0.5 rounded-md border border-rose-300 shadow-sm"
                  >
                    ⚠️ {alert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center space-x-2 border-b border-border">
        {[
          { id: 'notes', label: 'Doctor Clinical Notes', icon: FileText, count: patientNotes.length, visible: true },
          { id: 'chart', label: 'Odontogram / Dental Chart', icon: Smile, visible: true },
          { id: 'appointments', label: 'Visit History', icon: Calendar, count: patientAppointments.length, visible: true },
          { id: 'billing', label: 'Billing & Invoices', icon: DollarSign, count: patientInvoices.length, visible: canViewRevenue },
        ]
          .filter((t) => t.visible)
          .map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs font-bold transition-all border-b-2 ${
                isActive
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-primary-100 text-primary-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Clinical Notes */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope size={16} className="text-primary-600" />
              Chronological Clinical Progress Notes ({patientNotes.length})
            </h3>
            {canWriteNotes && (
              <button
                onClick={() => setIsAddNoteModalOpen(true)}
                className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <Plus size={14} /> New Progress Note
              </button>
            )}
          </div>

          {patientNotes.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-border text-slate-400 text-xs">
              No clinical notes recorded yet for this patient.
            </div>
          ) : (
            patientNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4"
              >
                {/* Note Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold bg-primary-50 text-primary-700 px-2.5 py-1 rounded-xl border border-primary-200">
                      {note.date}
                    </span>
                    <span className="text-xs font-bold text-slate-900">
                      {note.procedureName}
                    </span>
                    {note.toothNumber && (
                      <span className="text-[11px] font-semibold text-slate-500 bg-surface-100 px-2 py-0.5 rounded-lg">
                        {note.toothNumber}
                      </span>
                    )}
                  </div>

                  {note.vitals && (
                    <div className="flex items-center gap-3 text-xs text-sky-800 bg-sky-50 px-3 py-1 rounded-xl border border-sky-100">
                      <HeartPulse size={14} className="text-sky-600" />
                      <span>BP: {note.vitals.bloodPressure || 'N/A'}</span>
                      <span>Pulse: {note.vitals.pulseRate || 'N/A'}</span>
                    </div>
                  )}
                </div>

                {/* Diagnosis */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Diagnosis & Clinical Findings
                  </h4>
                  <p className="text-xs font-semibold text-slate-800 bg-surface-50 p-2.5 rounded-xl border border-slate-200/60">
                    {note.diagnosis}
                  </p>
                </div>

                {/* Detailed Operative Narrative */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Operative Narrative & Clinical Protocol
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-mono bg-surface-50/50 p-3.5 rounded-xl border border-slate-200/60 whitespace-pre-wrap">
                    {note.notes}
                  </p>
                </div>

                {/* Treatment plan recommendation */}
                {note.treatmentPlanSummary && (
                  <div className="text-xs text-primary-900 bg-primary-50/50 p-3 rounded-xl border border-primary-100">
                    <span className="font-bold">Next Steps & Treatment Plan: </span>
                    {note.treatmentPlanSummary}
                  </div>
                )}

                {/* Electronic Doctor Signature */}
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5 text-emerald-700">
                    <CheckCircle2 size={15} />
                    <span className="font-semibold">Electronically Signed & Locked</span>
                  </div>
                  <div className="font-mono text-slate-700">
                    {note.doctorSignature} • {note.signedAt}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Odontogram Dental Chart */}
      {activeTab === 'chart' && (
        <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Universal Dental Odontogram</h3>
            <p className="text-xs text-slate-500">
              Interactive 32-tooth dental arch chart. Click any tooth to review specific restorations and history.
            </p>
          </div>

          {/* Upper Arch */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Maxillary Arch (Upper #1 – #16)
            </span>
            <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
              {upperTeeth.map((num) => {
                const isSelected = selectedTooth === num;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTooth(num)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                        : 'bg-surface-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">#{num}</span>
                    <span className="text-sm">🦷</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lower Arch */}
          <div className="space-y-2 pt-4 border-t border-border">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block text-center">
              Mandibular Arch (Lower #32 – #17)
            </span>
            <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5">
              {lowerTeeth.map((num) => {
                const isSelected = selectedTooth === num;
                const hasRestoration = num === 19;
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTooth(num)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                        : hasRestoration
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-surface-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">#{num}</span>
                    <span className="text-sm">🦷</span>
                    {hasRestoration && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Tooth Info */}
          {selectedTooth && (
            <div className="p-4 bg-surface-50 rounded-2xl border border-border flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-900">
                  Tooth #{selectedTooth} Selected
                </span>
                <p className="text-xs text-slate-600 mt-0.5">
                  {selectedTooth === 19
                    ? 'Restored with D2391 Resin Composite (Occlusal). Margin stable, no sensitivity.'
                    : 'Healthy dentition; no active caries or existing restorations recorded.'}
                </p>
              </div>
              {canWriteNotes && (
                <button
                  onClick={() => setIsAddNoteModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700"
                >
                  Document Tooth #{selectedTooth}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Appointments */}
      {activeTab === 'appointments' && (
        <div className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">All Scheduled & Past Visits</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Procedure</th>
                  <th className="py-3 px-4">Provider</th>
                  <th className="py-3 px-4">Operatory</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {patientAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-surface-50">
                    <td className="py-3 px-4 font-bold text-slate-900">{apt.date}</td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      {apt.startTime} - {apt.endTime}
                    </td>
                    <td className="py-3 px-4 text-slate-800">
                      [{apt.procedureCode}] {apt.serviceName}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{apt.doctorName}</td>
                    <td className="py-3 px-4 text-slate-600">{apt.operatoryChair}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          apt.status === 'Completed'
                            ? 'success'
                            : apt.status === 'In-Chair'
                            ? 'danger'
                            : 'info'
                        }
                        dot
                      >
                        {apt.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Billing */}
      {activeTab === 'billing' && (
        <div className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Invoices & Financial Ledger</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
                <tr>
                  <th className="py-3 px-4">Invoice #</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Paid</th>
                  <th className="py-3 px-4">Balance</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {patientInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-surface-50">
                    <td className="py-3 px-4 font-mono font-bold text-slate-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3 px-4 text-slate-800">{inv.serviceName}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{formatINR(inv.amount)}</td>
                    <td className="py-3 px-4 text-emerald-600 font-semibold">{formatINR(inv.amountPaid)}</td>
                    <td className="py-3 px-4 font-bold text-rose-600">{formatINR(inv.balance)}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          inv.status === 'Paid'
                            ? 'success'
                            : inv.status === 'Pending'
                            ? 'warning'
                            : 'danger'
                        }
                        dot
                      >
                        {inv.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Clinical Note Modal */}
      <AddClinicalNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        patient={patient}
      />
    </div>
  );
};
