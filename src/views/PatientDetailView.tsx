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
  Pill,
  Eye,
  Layers,
  Activity,
  Printer,
  Upload,
  Trash2,
  Sparkles,
  Droplet,
  ExternalLink,
  Receipt,
  FileSpreadsheet,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { AddClinicalNoteModal } from '../components/modals/AddClinicalNoteModal';
import { AddPrescriptionModal } from '../components/modals/AddPrescriptionModal';
import { PrescriptionPrintModal } from '../components/modals/PrescriptionPrintModal';
import { RadiographViewerModal } from '../components/modals/RadiographViewerModal';
import { UploadRadiographModal } from '../components/modals/UploadRadiographModal';
import { AddTreatmentPlanModal } from '../components/modals/AddTreatmentPlanModal';
import {
  DentalPrescription,
  DentalRadiograph,
  PeriodontalChart,
  PatientTreatmentPlan,
  TreatmentPhaseType,
  RadiographCategory,
} from '../types';
import { formatINR, formatINRCurrency } from '../utils/format';

interface PatientDetailViewProps {
  patientId: string;
  onBack: () => void;
  onBookAppointment: (patientId: string) => void;
  onOpenCreateInvoice?: (patientId: string) => void;
}

export const PatientDetailView: React.FC<PatientDetailViewProps> = ({
  patientId,
  onBack,
  onBookAppointment,
  onOpenCreateInvoice,
}) => {
  const {
    patients,
    clinicalNotes,
    appointments,
    invoices,
    prescriptions,
    radiographs,
    perioCharts,
    treatmentPlans,
    deletePrescription,
    deleteRadiograph,
    savePerioChart,
    updateTreatmentPlanItemStatus,
    acceptTreatmentPlan,
  } = useData();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<
    'notes' | 'chart' | 'perio' | 'treatment' | 'imaging' | 'prescriptions' | 'appointments' | 'billing'
  >('notes');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedTooth, setSelectedTooth] = useState<number | null>(19);

  // New Clinical Suite Modals State
  const [isAddPrescriptionOpen, setIsAddPrescriptionOpen] = useState(false);
  const [printingPrescription, setPrintingPrescription] = useState<DentalPrescription | null>(null);
  const [isUploadRadiographOpen, setIsUploadRadiographOpen] = useState(false);
  const [viewingRadiograph, setViewingRadiograph] = useState<DentalRadiograph | null>(null);
  const [isAddTreatmentPlanOpen, setIsAddTreatmentPlanOpen] = useState(false);
  const [radiographFilter, setRadiographFilter] = useState<string>('All');
  const [selectedPerioTooth, setSelectedPerioTooth] = useState<number>(19);

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

  const patientPrescriptions = prescriptions
    .filter((p) => p.patientId === patient.id)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const patientRadiographs = radiographs
    .filter((r) => r.patientId === patient.id)
    .sort((a, b) => b.dateTaken.localeCompare(a.dateTaken));

  const patientPerioChart = perioCharts.find((pc) => pc.patientId === patient.id);

  const patientTreatmentPlans = treatmentPlans
    .filter((tp) => tp.patientId === patient.id)
    .sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  // Local working state for interactive periodontal probing chart
  const [workingPerio, setWorkingPerio] = useState<PeriodontalChart | null>(null);

  React.useEffect(() => {
    if (patientPerioChart) {
      setWorkingPerio(patientPerioChart);
    } else {
      const defaultTeeth: Record<number, any> = {};
      for (let n = 1; n <= 32; n++) {
        defaultTeeth[n] = {
          toothNumber: n,
          buccal: {
            distal: { depth: 2, bop: false },
            middle: { depth: 2, bop: false },
            mesial: { depth: 2, bop: false },
          },
          lingual: {
            distal: { depth: 2, bop: false },
            middle: { depth: 2, bop: false },
            mesial: { depth: 2, bop: false },
          },
          furcation: 'None',
          mobility: '0',
        };
      }
      setWorkingPerio({
        id: `perio_${patient.id}`,
        tenantId: patient.tenantId,
        patientId: patient.id,
        examDate: new Date().toISOString().split('T')[0],
        examinedBy: currentUser.name,
        teeth: defaultTeeth,
        summaryNotes: 'Routine periodontal evaluation; sulcus depths within normal parameters.',
      });
    }
  }, [patient.id, patientPerioChart, currentUser.name]);

  const canWriteNotes = currentUser.permissions.canWriteDoctorNotes || currentUser.role === 'DOCTOR_ADMIN';
  const canViewRevenue = currentUser.permissions.canViewRevenue || currentUser.role === 'DOCTOR_ADMIN' || currentUser.role === 'SUPER_ADMIN';

  // Teeth 1 to 32
  const upperTeeth = Array.from({ length: 16 }, (_, i) => i + 1); // 1-16
  const lowerTeeth = Array.from({ length: 16 }, (_, i) => 32 - i); // 32-17

  // Dynamic Odontogram: Derive tooth conditions from clinical progress notes
  const getToothStatus = (num: number) => {
    // Check if any clinical note references this tooth number
    const matchingNotes = patientNotes.filter((n) => {
      if (n.toothNumbers && n.toothNumbers.includes(num)) return true;
      if (!n.toothNumber) return false;
      const parsedNum = n.toothNumber.match(/#(\d+)/);
      return parsedNum && parseInt(parsedNum[1], 10) === num;
    });

    if (matchingNotes.length === 0) {
      // Default initial condition if tooth #19
      if (num === 19) {
        return {
          condition: 'Restored' as const,
          label: 'Composite Resin Restoration',
          notes: 'Restored with D2391 Resin Composite (Occlusal). Margin stable, no sensitivity.',
          surfaces: ['O'] as string[],
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
          dotColor: 'bg-amber-500',
        };
      }
      return {
        condition: 'Healthy' as const,
        label: 'Healthy Dentition',
        notes: 'Healthy natural dentition; no active caries or existing restorations recorded.',
        surfaces: undefined as string[] | undefined,
        badgeColor: 'bg-surface-100 text-slate-700 border-slate-200',
        dotColor: 'bg-emerald-500',
      };
    }

    // Most recent note
    const latest = matchingNotes[0];
    const proc = latest.procedureName.toLowerCase();
    const diag = latest.diagnosis.toLowerCase();
    const surfaces = latest.toothSurfaces;

    if (proc.includes('crown') || diag.includes('crown')) {
      return {
        condition: 'Crown' as const,
        label: 'Prosthetic Crown',
        notes: `Treated with ${latest.procedureName} on ${latest.date}. Diagnostic finding: ${latest.diagnosis}`,
        surfaces,
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        dotColor: 'bg-purple-600',
      };
    } else if (proc.includes('canal') || proc.includes('endodontic') || diag.includes('pulp')) {
      return {
        condition: 'Endodontic' as const,
        label: 'Endodontic Therapy',
        notes: `Treated with ${latest.procedureName} on ${latest.date}. Diagnostic finding: ${latest.diagnosis}`,
        surfaces,
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        dotColor: 'bg-rose-600',
      };
    } else if (proc.includes('extraction') || diag.includes('missing')) {
      return {
        condition: 'Missing' as const,
        label: 'Missing / Extracted',
        notes: `Extracted or missing as of ${latest.date}. Note: ${latest.diagnosis}`,
        surfaces,
        badgeColor: 'bg-slate-200 text-slate-700 border-slate-300',
        dotColor: 'bg-slate-500',
      };
    } else if (diag.includes('caries') || diag.includes('decay')) {
      return {
        condition: 'Caries' as const,
        label: 'Active Caries / Decay',
        notes: `Active finding: ${latest.diagnosis} (${latest.date}). Recommended: ${latest.treatmentPlanSummary || 'Restorative filling'}`,
        surfaces,
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-400',
        dotColor: 'bg-amber-600',
      };
    }

    return {
      condition: 'Restored' as const,
      label: latest.procedureName,
      notes: `Restoration / treatment performed on ${latest.date}: ${latest.procedureName}. Finding: ${latest.diagnosis}`,
      surfaces,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      dotColor: 'bg-blue-600',
    };
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Back button & Action Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-white px-3.5 py-2 rounded-2xl border border-border transition-all shadow-sm"
        >
          <ArrowLeft size={16} />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center space-x-3">
          {onOpenCreateInvoice && (
            <button
              onClick={() => onOpenCreateInvoice(patient.id)}
              className="flex items-center space-x-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3.5 py-2 rounded-2xl text-xs font-bold shadow-sm transition-all"
              title="Generate Invoice for this patient"
            >
              <DollarSign size={15} className="text-emerald-700" />
              <span>Create Invoice</span>
            </button>
          )}
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
      <div className="flex items-center space-x-2 border-b border-border overflow-x-auto">
        {[
          { id: 'notes', label: 'Doctor Clinical Notes', icon: FileText, count: patientNotes.length, visible: true },
          { id: 'chart', label: 'Odontogram', icon: Smile, visible: true },
          { id: 'perio', label: 'Periodontal Chart', icon: Activity, visible: true },
          { id: 'treatment', label: 'Treatment Plans', icon: Layers, count: patientTreatmentPlans.length, visible: true },
          { id: 'imaging', label: 'Imaging & X-Rays', icon: Eye, count: patientRadiographs.length, visible: true },
          { id: 'prescriptions', label: 'e-Rx Prescriptions', icon: Pill, count: patientPrescriptions.length, visible: true },
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
                    {note.toothSurfaces && note.toothSurfaces.length > 0 && (
                      <span className="text-[11px] font-mono font-bold text-primary-700 bg-primary-100/70 border border-primary-300 px-2 py-0.5 rounded-lg">
                        Surfaces: {note.toothSurfaces.join('')}
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
                const status = getToothStatus(num);
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTooth(num)}
                    title={`Tooth #${num}: ${status.label}`}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                        : `${status.badgeColor} hover:brightness-95`
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">#{num}</span>
                    <span className="text-sm">🦷</span>
                    {status.condition !== 'Healthy' && (
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} mt-0.5`} />
                    )}
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
                const status = getToothStatus(num);
                return (
                  <button
                    key={num}
                    onClick={() => setSelectedTooth(num)}
                    title={`Tooth #${num}: ${status.label}`}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-105'
                        : `${status.badgeColor} hover:brightness-95`
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold">#{num}</span>
                    <span className="text-sm">🦷</span>
                    {status.condition !== 'Healthy' && (
                      <span className={`w-1.5 h-1.5 rounded-full ${status.dotColor} mt-0.5`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Odontogram Legend */}
          <div className="flex items-center justify-center gap-4 text-[11px] font-medium text-slate-500 pt-2 border-t border-border/60 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Healthy</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Restored / Composite</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
              <span>Crown / Prosthetic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
              <span>Endodontic (Root Canal)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span>Missing / Extracted</span>
            </div>
          </div>

          {/* Selected Tooth Info */}
          {selectedTooth && (() => {
            const status = getToothStatus(selectedTooth);
            return (
              <div className="p-4 bg-surface-50 rounded-2xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm text-slate-900">
                      Tooth #{selectedTooth} Selected
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${status.badgeColor}`}>
                      {status.label}
                    </span>
                    {status.surfaces && status.surfaces.length > 0 && (
                      <span className="text-[10px] font-mono font-bold text-primary-700 bg-primary-100 border border-primary-200 px-2 py-0.5 rounded-md">
                        Surfaces: {status.surfaces.join('')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {status.notes}
                  </p>
                </div>
                {canWriteNotes && (
                  <button
                    onClick={() => setIsAddNoteModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-primary-600 text-white text-xs font-bold hover:bg-primary-700 shadow-sm transition-all whitespace-nowrap"
                  >
                    Document Tooth #{selectedTooth}
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab: Periodontal Chart */}
      {activeTab === 'perio' && workingPerio && (
        <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Periodontal Probing Examination</h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Universal UNC-15 Probing
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Exam Date: <span className="font-semibold text-slate-700">{workingPerio.examDate}</span> • Examiner: {workingPerio.examinedBy}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => {
                  savePerioChart(workingPerio);
                  alert('Periodontal probing examination saved successfully!');
                }}
                className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
              >
                <CheckCircle2 size={14} />
                <span>Save Periodontal Exam</span>
              </button>
            </div>
          </div>

          {/* Periodontal Risk & Diagnostic Stats */}
          {(() => {
            const teethList = Object.values(workingPerio.teeth || {});
            let totalSites = 0;
            let bopCount = 0;
            let mildPockets = 0; // 4-5mm
            let deepPockets = 0; // >=6mm

            teethList.forEach((t) => {
              if (t.isMissing) return;
              const sites = [
                t.buccal.distal,
                t.buccal.middle,
                t.buccal.mesial,
                t.lingual.distal,
                t.lingual.middle,
                t.lingual.mesial,
              ];
              sites.forEach((s) => {
                totalSites++;
                if (s.bop) bopCount++;
                if (s.depth >= 6) deepPockets++;
                else if (s.depth >= 4) mildPockets++;
              });
            });

            const bopPercent = totalSites > 0 ? Math.round((bopCount / totalSites) * 100) : 0;
            const riskLevel =
              deepPockets > 4 || bopPercent > 25
                ? 'High Risk (Severe Periodontitis)'
                : mildPockets > 4 || bopPercent > 10
                ? 'Moderate Risk (Gingivitis / Mild Periodontitis)'
                : 'Low Risk (Periodontal Health)';

            return (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-surface-50 rounded-2xl border border-border">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Bleeding on Probing (BOP)</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold font-mono text-slate-900">{bopPercent}%</span>
                    <span className="text-[10px] text-rose-600 font-bold">({bopCount} sites)</span>
                  </div>
                </div>

                <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200">
                  <span className="text-[10px] uppercase font-bold text-amber-800 block">Pockets 4–5 mm</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold font-mono text-amber-900">{mildPockets}</span>
                    <span className="text-[10px] text-amber-700 font-semibold">Mild-to-Mod Pockets</span>
                  </div>
                </div>

                <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-200">
                  <span className="text-[10px] uppercase font-bold text-rose-800 block">Deep Pockets ≥ 6 mm</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xl font-bold font-mono text-rose-900">{deepPockets}</span>
                    <span className="text-[10px] text-rose-700 font-bold">Bone Loss Indicated</span>
                  </div>
                </div>

                <div className="p-3.5 bg-primary-50/50 rounded-2xl border border-primary-200">
                  <span className="text-[10px] uppercase font-bold text-primary-800 block">Periodontal Risk</span>
                  <span className="text-xs font-bold text-primary-900 mt-1.5 block truncate">
                    {riskLevel}
                  </span>
                </div>
              </div>
            );
          })()}

          {/* Color Legend */}
          <div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-600 bg-surface-50 p-2.5 rounded-xl border border-border">
            <span className="font-bold text-slate-700">Sulcus Depth Legend:</span>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-slate-100 border border-slate-300 text-center font-mono font-bold text-[10px] text-slate-700">
                1-3
              </span>
              <span>Healthy Sulcus</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-amber-200 border border-amber-400 text-center font-mono font-bold text-[10px] text-amber-950">
                4-5
              </span>
              <span>Pocketing (Gingivitis/Bone Loss)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded bg-rose-200 border border-rose-400 text-center font-mono font-bold text-[10px] text-rose-950">
                6+
              </span>
              <span>Deep Periodontitis</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs">🩸</span>
              <span>Bleeding on Probing (BOP)</span>
            </div>
          </div>

          {/* Maxillary Upper Arch (1-16) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
              Maxillary Arch (Upper #1 – #16) • Buccal (Top) / Lingual (Bottom)
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[700px]">
                {upperTeeth.map((num) => {
                  const t = workingPerio.teeth[num] || {
                    toothNumber: num,
                    buccal: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
                    lingual: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
                  };
                  const isSelected = selectedPerioTooth === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedPerioTooth(num)}
                      className={`flex-1 p-1.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                        isSelected
                          ? 'border-primary-600 ring-2 ring-primary-400/40 bg-primary-50/30'
                          : 'border-border bg-white hover:border-slate-400'
                      }`}
                    >
                      {/* Buccal 3 depths */}
                      <div className="flex justify-between w-full gap-0.5 text-[10px] font-mono">
                        {[t.buccal.distal, t.buccal.middle, t.buccal.mesial].map((s, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded py-0.5 ${
                              s.depth >= 6
                                ? 'bg-rose-200 text-rose-950 font-bold'
                                : s.depth >= 4
                                ? 'bg-amber-200 text-amber-950 font-bold'
                                : 'bg-slate-50 text-slate-600'
                            }`}
                          >
                            {s.depth}
                            {s.bop && <span className="text-[8px] text-rose-600">🩸</span>}
                          </span>
                        ))}
                      </div>

                      {/* Tooth Number */}
                      <div className="py-1 font-bold text-xs text-slate-800">#{num}</div>

                      {/* Lingual 3 depths */}
                      <div className="flex justify-between w-full gap-0.5 text-[10px] font-mono">
                        {[t.lingual.distal, t.lingual.middle, t.lingual.mesial].map((s, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded py-0.5 ${
                              s.depth >= 6
                                ? 'bg-rose-200 text-rose-950 font-bold'
                                : s.depth >= 4
                                ? 'bg-amber-200 text-amber-950 font-bold'
                                : 'bg-slate-50 text-slate-600'
                            }`}
                          >
                            {s.depth}
                            {s.bop && <span className="text-[8px] text-rose-600">🩸</span>}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mandibular Lower Arch (32-17) */}
          <div className="space-y-1.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">
              Mandibular Arch (Lower #32 – #17) • Buccal (Top) / Lingual (Bottom)
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="flex gap-1.5 min-w-[700px]">
                {lowerTeeth.map((num) => {
                  const t = workingPerio.teeth[num] || {
                    toothNumber: num,
                    buccal: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
                    lingual: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
                  };
                  const isSelected = selectedPerioTooth === num;
                  return (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedPerioTooth(num)}
                      className={`flex-1 p-1.5 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
                        isSelected
                          ? 'border-primary-600 ring-2 ring-primary-400/40 bg-primary-50/30'
                          : 'border-border bg-white hover:border-slate-400'
                      }`}
                    >
                      {/* Buccal 3 depths */}
                      <div className="flex justify-between w-full gap-0.5 text-[10px] font-mono">
                        {[t.buccal.distal, t.buccal.middle, t.buccal.mesial].map((s, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded py-0.5 ${
                              s.depth >= 6
                                ? 'bg-rose-200 text-rose-950 font-bold'
                                : s.depth >= 4
                                ? 'bg-amber-200 text-amber-950 font-bold'
                                : 'bg-slate-50 text-slate-600'
                            }`}
                          >
                            {s.depth}
                            {s.bop && <span className="text-[8px] text-rose-600">🩸</span>}
                          </span>
                        ))}
                      </div>

                      {/* Tooth Number */}
                      <div className="py-1 font-bold text-xs text-slate-800">#{num}</div>

                      {/* Lingual 3 depths */}
                      <div className="flex justify-between w-full gap-0.5 text-[10px] font-mono">
                        {[t.lingual.distal, t.lingual.middle, t.lingual.mesial].map((s, i) => (
                          <span
                            key={i}
                            className={`flex-1 rounded py-0.5 ${
                              s.depth >= 6
                                ? 'bg-rose-200 text-rose-950 font-bold'
                                : s.depth >= 4
                                ? 'bg-amber-200 text-amber-950 font-bold'
                                : 'bg-slate-50 text-slate-600'
                            }`}
                          >
                            {s.depth}
                            {s.bop && <span className="text-[8px] text-rose-600">🩸</span>}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tooth Probing Inspector Pad for selected tooth */}
          {(() => {
            const t = workingPerio.teeth[selectedPerioTooth] || {
              toothNumber: selectedPerioTooth,
              buccal: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
              lingual: { distal: { depth: 2, bop: false }, middle: { depth: 2, bop: false }, mesial: { depth: 2, bop: false } },
              furcation: 'None',
              mobility: '0',
            };

            const updateSite = (
              surface: 'buccal' | 'lingual',
              pos: 'distal' | 'middle' | 'mesial',
              val: Partial<{ depth: number; bop: boolean }>
            ) => {
              setWorkingPerio((prev) => {
                if (!prev) return prev;
                const prevTooth = prev.teeth[selectedPerioTooth] || t;
                const updatedTooth = {
                  ...prevTooth,
                  [surface]: {
                    ...prevTooth[surface],
                    [pos]: { ...prevTooth[surface][pos], ...val },
                  },
                };
                return {
                  ...prev,
                  teeth: { ...prev.teeth, [selectedPerioTooth]: updatedTooth },
                };
              });
            };

            return (
              <div className="p-5 bg-surface-50 rounded-2xl border border-border space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900 text-sm">
                      Tooth #{selectedPerioTooth} Detailed 6-Point Probing Editor
                    </span>
                    <span className="text-[11px] text-slate-500">
                      (Click 🩸 to toggle Bleeding on Probing)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 font-semibold">Furcation:</span>
                      <select
                        value={t.furcation || 'None'}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setWorkingPerio((prev) => {
                            if (!prev) return prev;
                            const prevTooth = prev.teeth[selectedPerioTooth] || t;
                            return {
                              ...prev,
                              teeth: { ...prev.teeth, [selectedPerioTooth]: { ...prevTooth, furcation: val } },
                            };
                          });
                        }}
                        className="px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold"
                      >
                        <option value="None">None</option>
                        <option value="Class I">Class I</option>
                        <option value="Class II">Class II</option>
                        <option value="Class III">Class III</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-slate-600 font-semibold">Mobility:</span>
                      <select
                        value={t.mobility || '0'}
                        onChange={(e) => {
                          const val = e.target.value as any;
                          setWorkingPerio((prev) => {
                            if (!prev) return prev;
                            const prevTooth = prev.teeth[selectedPerioTooth] || t;
                            return {
                              ...prev,
                              teeth: { ...prev.teeth, [selectedPerioTooth]: { ...prevTooth, mobility: val } },
                            };
                          });
                        }}
                        className="px-2 py-1 bg-white border border-border rounded-lg text-xs font-semibold"
                      >
                        <option value="0">0 (Normal)</option>
                        <option value="I">Class I (&lt;1mm)</option>
                        <option value="II">Class II (1-2mm)</option>
                        <option value="III">Class III (&gt;2mm)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Buccal Sites */}
                  <div className="p-3 bg-white rounded-xl border border-border space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                      Buccal / Facial Sites
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { pos: 'distal' as const, label: 'Distobuccal (DB)' },
                        { pos: 'middle' as const, label: 'Midbuccal (B)' },
                        { pos: 'mesial' as const, label: 'Mesiobuccal (MB)' },
                      ].map(({ pos, label }) => {
                        const site = t.buccal[pos];
                        return (
                          <div key={pos} className="p-2 bg-surface-50 rounded-lg border border-slate-200 text-center space-y-1">
                            <span className="text-[10px] text-slate-500 font-semibold block">{label}</span>
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="text"
                                value={site.depth}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  updateSite('buccal', pos, { depth: Number(val) || 1 });
                                }}
                                className="w-10 text-center font-mono font-bold text-xs py-1 bg-white border border-border rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => updateSite('buccal', pos, { bop: !site.bop })}
                                className={`px-1.5 py-1 rounded text-xs transition-colors ${
                                  site.bop ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400 hover:text-rose-600'
                                }`}
                                title="Toggle Bleeding on Probing"
                              >
                                🩸
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Lingual Sites */}
                  <div className="p-3 bg-white rounded-xl border border-border space-y-2">
                    <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                      Lingual / Palatal Sites
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { pos: 'distal' as const, label: 'Distolingual (DL)' },
                        { pos: 'middle' as const, label: 'Midlingual (L)' },
                        { pos: 'mesial' as const, label: 'Mesiolingual (ML)' },
                      ].map(({ pos, label }) => {
                        const site = t.lingual[pos];
                        return (
                          <div key={pos} className="p-2 bg-surface-50 rounded-lg border border-slate-200 text-center space-y-1">
                            <span className="text-[10px] text-slate-500 font-semibold block">{label}</span>
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="text"
                                value={site.depth}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  updateSite('lingual', pos, { depth: Number(val) || 1 });
                                }}
                                className="w-10 text-center font-mono font-bold text-xs py-1 bg-white border border-border rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => updateSite('lingual', pos, { bop: !site.bop })}
                                className={`px-1.5 py-1 rounded text-xs transition-colors ${
                                  site.bop ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400 hover:text-rose-600'
                                }`}
                                title="Toggle Bleeding on Probing"
                              >
                                🩸
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab: Multi-Phase Treatment Planning */}
      {activeTab === 'treatment' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers size={18} className="text-primary-600" />
                Multi-Phase Dental Treatment Plans ({patientTreatmentPlans.length})
              </h3>
              <p className="text-xs text-slate-500">
                Phase 1 (Emergency) • Phase 2 (Disease Control) • Phase 3 (Rehabilitation)
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddTreatmentPlanOpen(true)}
              className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
            >
              <Plus size={14} />
              <span>New Treatment Plan</span>
            </button>
          </div>

          {patientTreatmentPlans.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-border text-slate-400 text-xs">
              No treatment plans drafted yet for {patient.firstName}. Click "New Treatment Plan" to structure phased clinical care.
            </div>
          ) : (
            patientTreatmentPlans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-5"
              >
                {/* Plan Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-slate-900">{plan.title}</h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          plan.status === 'Accepted'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : plan.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800 border border-blue-300'
                            : 'bg-amber-100 text-amber-800 border border-amber-300'
                        }`}
                      >
                        {plan.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Created on {plan.createdDate} by {plan.createdBy}
                      {plan.patientAcceptedDate && ` • Accepted on ${plan.patientAcceptedDate}`}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {(plan.status === 'Presented' || plan.status === 'Draft') && (
                      <button
                        type="button"
                        onClick={() => acceptTreatmentPlan(plan.id)}
                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        <CheckCircle2 size={14} />
                        <span>Accept Plan (Patient Consent)</span>
                      </button>
                    )}

                    {onOpenCreateInvoice && canViewRevenue && (
                      <button
                        type="button"
                        onClick={() => onOpenCreateInvoice(patient.id)}
                        className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-surface-100 hover:bg-surface-200 text-slate-700 border border-border text-xs font-bold transition-all"
                        title="Convert accepted procedures to invoice"
                      >
                        <Receipt size={14} />
                        <span>Create Invoice</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Financial Summary Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-surface-50 rounded-2xl border border-border text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Total Estimated Cost</span>
                    <span className="text-base font-bold font-mono text-slate-900">
                      {formatINR(plan.totalEstimatedFee)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Patient Accepted Value</span>
                    <span className="text-base font-bold font-mono text-emerald-700">
                      {formatINR(plan.acceptedFee)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Pending / Optional Work</span>
                    <span className="text-base font-bold font-mono text-slate-600">
                      {formatINR(Math.max(0, plan.totalEstimatedFee - plan.acceptedFee))}
                    </span>
                  </div>
                </div>

                {/* Phase Cards */}
                <div className="space-y-4">
                  {plan.phases.map((ph) => (
                    <div
                      key={ph.id}
                      className="p-4 rounded-2xl border border-border bg-surface-50/50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-border/80 pb-2">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-primary-600" />
                          {ph.phaseType}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700">
                          Subtotal: {formatINR(ph.items.reduce((s, it) => s + it.estimatedFee, 0))}
                        </span>
                      </div>

                      <div className="space-y-2">
                        {ph.items.map((it) => (
                          <div
                            key={it.id}
                            className="p-3 bg-white rounded-xl border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-primary-700">
                                  {it.serviceCode}
                                </span>
                                <span className="font-bold text-slate-900">{it.procedureName}</span>
                                {it.toothNumber && (
                                  <span className="px-2 py-0.5 rounded bg-primary-50 text-primary-700 border border-primary-200 font-mono text-[10px] font-bold">
                                    Tooth #{it.toothNumber}
                                  </span>
                                )}
                                <span
                                  className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                    it.priority === 'Urgent'
                                      ? 'bg-rose-100 text-rose-800'
                                      : it.priority === 'Standard'
                                      ? 'bg-blue-100 text-blue-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {it.priority}
                                </span>
                              </div>
                              {it.notes && (
                                <p className="text-[11px] text-slate-500">{it.notes}</p>
                              )}
                            </div>

                            <div className="flex items-center justify-between sm:justify-end gap-3 flex-shrink-0">
                              <span className="font-bold font-mono text-slate-900 text-xs">
                                {formatINR(it.estimatedFee)}
                              </span>

                              <select
                                value={it.status}
                                onChange={(e) =>
                                  updateTreatmentPlanItemStatus(
                                    plan.id,
                                    ph.id,
                                    it.id,
                                    e.target.value as any
                                  )
                                }
                                className={`px-2.5 py-1 rounded-xl text-xs font-semibold border ${
                                  it.status === 'Completed'
                                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                    : it.status === 'Accepted'
                                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                                    : it.status === 'In-Progress'
                                    ? 'bg-amber-50 text-amber-800 border-amber-300'
                                    : 'bg-slate-50 text-slate-700 border-slate-300'
                                }`}
                              >
                                <option value="Proposed">Proposed</option>
                                <option value="Accepted">Accepted</option>
                                <option value="In-Progress">In-Progress</option>
                                <option value="Completed">Completed</option>
                                <option value="Declined">Declined</option>
                              </select>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Radiographs & Imaging Gallery */}
      {activeTab === 'imaging' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Eye size={18} className="text-primary-600" />
                Radiographs, Scans & Clinical Imaging ({patientRadiographs.length})
              </h3>
              <p className="text-xs text-slate-500">
                IOPA periapical sensors, bitewing surveys, OPG panoramic films, and intraoral photos
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsUploadRadiographOpen(true)}
              className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
            >
              <Upload size={14} />
              <span>Upload Scan / Photo</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-border w-fit text-xs">
            {['All', 'IOPA (Periapical)', 'Bitewing', 'OPG (Panoramic)', 'Intraoral Photo'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setRadiographFilter(cat)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  radiographFilter === cat
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Radiographs Grid */}
          {(() => {
            const filteredRads = patientRadiographs.filter(
              (r) => radiographFilter === 'All' || r.category === radiographFilter
            );

            if (filteredRads.length === 0) {
              return (
                <div className="bg-white rounded-3xl p-10 text-center border border-border text-slate-400 text-xs">
                  No radiographs found matching the selected filter.
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredRads.map((rad) => (
                  <div
                    key={rad.id}
                    className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden flex flex-col justify-between group hover:border-slate-400 transition-all"
                  >
                    <div>
                      {/* Radiograph Thumbnail Area */}
                      <div
                        onClick={() => setViewingRadiograph(rad)}
                        className="bg-slate-950 h-48 flex items-center justify-center relative cursor-pointer group-hover:brightness-105 transition-all overflow-hidden p-2"
                      >
                        <img
                          src={rad.imageUrl}
                          alt={rad.title}
                          className="max-h-full object-contain rounded-lg"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/80 text-white backdrop-blur-sm border border-slate-700">
                            {rad.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-primary-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="px-3 py-1.5 rounded-xl bg-slate-900/90 text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                            <Eye size={14} /> Open Viewer
                          </span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-4 space-y-2 text-xs">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-bold text-slate-900 text-xs line-clamp-1">{rad.title}</h4>
                          <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">
                            {rad.dateTaken}
                          </span>
                        </div>

                        {rad.toothNumbers && rad.toothNumbers.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {rad.toothNumbers.map((num) => (
                              <span
                                key={num}
                                className="px-2 py-0.5 rounded-md bg-primary-50 text-primary-700 font-mono font-bold text-[10px] border border-primary-200"
                              >
                                Tooth #{num}
                              </span>
                            ))}
                          </div>
                        )}

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {rad.findings}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-surface-50 text-xs">
                      <span className="text-[10px] text-slate-400 truncate">By {rad.takenBy}</span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setViewingRadiograph(rad)}
                          className="text-xs font-bold text-primary-600 hover:text-primary-700 hover:underline"
                        >
                          Diagnostic View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Delete radiograph ${rad.title}?`)) {
                              deleteRadiograph(rad.id);
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors"
                          title="Delete radiograph"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab: Digital Prescriptions (e-Rx) */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Pill size={18} className="text-primary-600" />
                Digital Dental Prescriptions (e-Rx) ({patientPrescriptions.length})
              </h3>
              <p className="text-xs text-slate-500">
                Structured dental medication schedules with official half-A4 printable slips
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsAddPrescriptionOpen(true)}
              className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
            >
              <Plus size={14} />
              <span>New Prescription</span>
            </button>
          </div>

          {patientPrescriptions.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 text-center border border-border text-slate-400 text-xs">
              No prescriptions issued yet for {patient.firstName}. Click "New Prescription" to prescribe structured medications.
            </div>
          ) : (
            patientPrescriptions.map((rx) => (
              <div
                key={rx.id}
                className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4"
              >
                {/* Rx Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-border">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-bold bg-primary-50 text-primary-700 px-2.5 py-1 rounded-xl border border-primary-200">
                      Rx #{rx.id.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">{rx.date}</span>
                    <span className="text-xs font-bold text-slate-900">
                      By {rx.doctorName}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono bg-surface-100 px-2 py-0.5 rounded-lg">
                      {rx.doctorRegistrationNumber || 'DCI Reg #29481-A'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPrintingPrescription(rx)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      <Printer size={13} />
                      <span>Print Slip (Half-A4)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm(`Delete prescription ${rx.id}?`)) {
                          deletePrescription(rx.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete prescription"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">
                    Indication / Diagnosis:
                  </span>
                  <span className="font-semibold text-slate-800 bg-surface-50 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    {rx.diagnosis}
                  </span>
                </div>

                {/* Medications Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-50 text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-y border-border">
                      <tr>
                        <th className="py-2.5 px-3 w-8">#</th>
                        <th className="py-2.5 px-3">Medication Name & Strength</th>
                        <th className="py-2.5 px-3">Regimen</th>
                        <th className="py-2.5 px-3">Duration</th>
                        <th className="py-2.5 px-3">Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {rx.items.map((it, idx) => (
                        <tr key={it.id} className="hover:bg-surface-50/50">
                          <td className="py-2.5 px-3 font-mono font-bold text-slate-400">
                            {idx + 1}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold text-slate-900 block">{it.drugName}</span>
                            <span className="text-[10px] font-mono text-slate-500 font-semibold">
                              Strength: {it.dosage}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="font-semibold text-primary-700 block">{it.frequency}</span>
                            <span className="text-[10px] text-slate-500 italic">{it.timing}</span>
                          </td>
                          <td className="py-2.5 px-3 font-bold font-mono text-slate-800">
                            {it.durationDays} Days
                          </td>
                          <td className="py-2.5 px-3 text-[11px] text-slate-600">
                            {it.instructions || 'As advised.'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Special Advice */}
                {rx.notes && (
                  <div className="p-3 bg-surface-50 rounded-xl border border-slate-200/70 text-xs text-slate-600 space-y-0.5">
                    <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px] block">
                      Physician Dietary & Operatory Advice:
                    </span>
                    <p className="leading-relaxed">{rx.notes}</p>
                  </div>
                )}
              </div>
            ))
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

      {/* Modals */}
      <AddClinicalNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        patient={patient}
      />
      <AddPrescriptionModal
        isOpen={isAddPrescriptionOpen}
        onClose={() => setIsAddPrescriptionOpen(false)}
        patientId={patient.id}
        patientName={`${patient.firstName} ${patient.lastName}`}
        patientAllergies={patient.medicalAlerts}
      />
      <PrescriptionPrintModal
        isOpen={!!printingPrescription}
        onClose={() => setPrintingPrescription(null)}
        prescription={printingPrescription}
      />
      <RadiographViewerModal
        isOpen={!!viewingRadiograph}
        onClose={() => setViewingRadiograph(null)}
        radiograph={viewingRadiograph}
      />
      <UploadRadiographModal
        isOpen={isUploadRadiographOpen}
        onClose={() => setIsUploadRadiographOpen(false)}
        patientId={patient.id}
        patientName={`${patient.firstName} ${patient.lastName}`}
      />
      <AddTreatmentPlanModal
        isOpen={isAddTreatmentPlanOpen}
        onClose={() => setIsAddTreatmentPlanOpen(false)}
        patientId={patient.id}
        patientName={`${patient.firstName} ${patient.lastName}`}
      />
    </div>
  );
};
