import React, { useState } from 'react';
import { X, FileText, Stethoscope, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Patient } from '../../types';

interface AddClinicalNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient;
}

export const AddClinicalNoteModal: React.FC<AddClinicalNoteModalProps> = ({
  isOpen,
  onClose,
  patient,
}) => {
  const { addClinicalNote, services } = useData();
  const { currentUser } = useAuth();

  const [toothNumber, setToothNumber] = useState('#19 (Mandibular Left First Molar)');
  const [procedureName, setProcedureName] = useState(services[0]?.name || 'Periodic Oral Evaluation');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [bloodPressure, setBloodPressure] = useState('120/80 mmHg');
  const [pulseRate, setPulseRate] = useState('72 bpm');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClinicalNote({
      patientId: patient.id,
      doctorId: currentUser.id,
      doctorName: currentUser.name,
      date: new Date().toISOString().split('T')[0],
      toothNumber,
      procedureName,
      diagnosis: diagnosis || 'Clinical assessment and preventive intervention',
      notes,
      treatmentPlanSummary: treatmentPlan,
      vitals: {
        bloodPressure,
        pulseRate,
      },
      doctorSignature: `${currentUser.name} (License verified)`,
    });
    onClose();
  };

  const toothOptions = [
    'Full Mouth / Preventive',
    '#1 (Maxillary Right 3rd Molar)',
    '#2 (Maxillary Right 2nd Molar)',
    '#3 (Maxillary Right 1st Molar)',
    '#8 (Maxillary Right Central Incisor)',
    '#9 (Maxillary Left Central Incisor)',
    '#14 (Maxillary Left 1st Molar)',
    '#19 (Mandibular Left 1st Molar)',
    '#20 (Mandibular Left 2nd Premolar)',
    '#24 (Mandibular Left Central Incisor)',
    '#25 (Mandibular Right Central Incisor)',
    '#30 (Mandibular Right 1st Molar)',
    '#31 (Mandibular Right 2nd Molar)',
    '#32 (Mandibular Right 3rd Molar)',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add Clinical Doctor Note</h2>
              <p className="text-xs text-slate-500">
                Patient: <span className="font-semibold text-slate-800">{patient.firstName} {patient.lastName}</span>
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Vitals row */}
          <div className="p-3.5 bg-sky-50/60 rounded-2xl border border-sky-100 grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-sky-900 mb-1">
                Blood Pressure
              </label>
              <input
                type="text"
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="120/80 mmHg"
                className="w-full bg-white border border-sky-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-sky-900 mb-1">
                Pulse / Heart Rate
              </label>
              <input
                type="text"
                value={pulseRate}
                onChange={(e) => setPulseRate(e.target.value)}
                placeholder="72 bpm"
                className="w-full bg-white border border-sky-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Tooth Selection & Procedure */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tooth Location / Arch
              </label>
              <select
                value={toothNumber}
                onChange={(e) => setToothNumber(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              >
                {toothOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Clinical Procedure
              </label>
              <select
                value={procedureName}
                onChange={(e) => setProcedureName(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              >
                {services.map((s) => (
                  <option key={s.id} value={`${s.name} (${s.code})`}>
                    [{s.code}] {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Diagnosis */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Clinical Diagnosis & Assessment
            </label>
            <input
              type="text"
              required
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Recurrent secondary caries on distal margin, Class II restoration failure..."
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Clinical Procedure Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Operative Notes & Anesthesia Protocol
            </label>
            <textarea
              rows={4}
              required
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Detail local anesthetic delivered (agent, epi concentration, carpules), isolation method, caries excavation, bonding system, restorative material, occlusion verification, and patient post-op tolerance..."
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 font-mono"
            />
          </div>

          {/* Next Treatment Plan Summary */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Next Visit / Treatment Plan Recommendations
            </label>
            <input
              type="text"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="e.g. Follow up in 2 weeks for core build-up and crown prep on tooth #19."
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Signature Preview */}
          <div className="p-3 bg-surface-50 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-emerald-700">
              <CheckCircle2 size={16} />
              <span className="font-semibold">Electronic Doctor Signature Verification</span>
            </div>
            <span className="font-mono text-slate-700 font-bold">{currentUser.name}</span>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-border flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25"
            >
              Sign & Lock Clinical Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
