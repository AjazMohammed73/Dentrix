import React, { useState } from 'react';
import { X, Pill, Plus, Trash2, Sparkles, AlertCircle } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { PrescriptionItem } from '../../types';

interface AddPrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
  patientAllergies?: string[];
  onPrescriptionCreated?: (prescriptionId: string) => void;
}

interface DrugPreset {
  label: string;
  drugName: string;
  dosage: string;
  frequency: string;
  durationDays: number;
  timing: PrescriptionItem['timing'];
  instructions: string;
}

const COMMON_DENTAL_PRESETS: DrugPreset[] = [
  {
    label: 'Amoxicillin 500mg',
    drugName: 'Amoxicillin Capsules',
    dosage: '500 mg',
    frequency: 'TDS (Thrice Daily)',
    durationDays: 5,
    timing: 'After Food',
    instructions: 'Take 1 capsule every 8 hours with full glass of water. Complete 5 days.',
  },
  {
    label: 'Clavam 625mg',
    drugName: 'Amoxicillin + Clavulanate (Augmentin/Clavam)',
    dosage: '625 mg',
    frequency: 'BD (Twice Daily)',
    durationDays: 5,
    timing: 'After Food',
    instructions: 'Take 1 tablet every 12 hours after meals. Complete entire course.',
  },
  {
    label: 'Clindamycin 300mg (Penicillin Allergy)',
    drugName: 'Clindamycin Hydrochloride',
    dosage: '300 mg',
    frequency: 'TDS (Thrice Daily)',
    durationDays: 5,
    timing: 'After Food',
    instructions: 'For penicillin-allergic patients. Take with plenty of water. Do not lie down for 30 min.',
  },
  {
    label: 'Combiflam (Pain/Swelling)',
    drugName: 'Ibuprofen + Paracetamol (Combiflam)',
    dosage: '400 mg + 325 mg',
    frequency: 'TDS (Thrice Daily)',
    durationDays: 3,
    timing: 'After Food',
    instructions: 'Take after meals for pain and inflammation. Do not take on empty stomach.',
  },
  {
    label: 'Ketorol-DT (Severe Pain)',
    drugName: 'Ketorolac Tromethamine (Ketorol-DT)',
    dosage: '10 mg',
    frequency: 'SOS (As Needed)',
    durationDays: 2,
    timing: 'After Food',
    instructions: 'Disperse in 15ml water if severe breakthrough pain occurs. Max 40mg/day.',
  },
  {
    label: 'Metronidazole 400mg (Anaerobic)',
    drugName: 'Metronidazole Tablets',
    dosage: '400 mg',
    frequency: 'TDS (Thrice Daily)',
    durationDays: 5,
    timing: 'After Food',
    instructions: 'For periodontal or necrotizing infection. Strictly avoid alcohol during treatment.',
  },
  {
    label: 'Hexidine Mouthwash 0.2%',
    drugName: 'Chlorhexidine Gluconate 0.2% w/v',
    dosage: '10 ml',
    frequency: 'BD (Twice Daily)',
    durationDays: 14,
    timing: 'After Food',
    instructions: 'Rinse undiluted 10ml for 60 seconds after brushing. Do not swallow or rinse with water for 30m.',
  },
];

export const AddPrescriptionModal: React.FC<AddPrescriptionModalProps> = ({
  isOpen,
  onClose,
  patientId,
  patientName,
  patientAllergies = [],
  onPrescriptionCreated,
}) => {
  const { addPrescription } = useData();
  const { currentUser } = useAuth();

  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<PrescriptionItem[]>([
    {
      id: `item_${Date.now()}_1`,
      drugName: 'Ibuprofen + Paracetamol (Combiflam)',
      dosage: '400 mg + 325 mg',
      frequency: 'TDS (Thrice Daily)',
      durationDays: 3,
      timing: 'After Food',
      instructions: 'Take 1 tablet after meals for acute dental pain.',
    },
  ]);

  // Current new item form state
  const [currentDrugName, setCurrentDrugName] = useState('');
  const [currentDosage, setCurrentDosage] = useState('');
  const [currentFrequency, setCurrentFrequency] = useState('TDS (Thrice Daily)');
  const [currentDuration, setCurrentDuration] = useState('5');
  const [currentTiming, setCurrentTiming] = useState<PrescriptionItem['timing']>('After Food');
  const [currentInstructions, setCurrentInstructions] = useState('');

  if (!isOpen) return null;

  const handleApplyPreset = (preset: DrugPreset) => {
    // Allergy warning
    const isPenicillinDrug =
      preset.drugName.toLowerCase().includes('amoxicillin') ||
      preset.drugName.toLowerCase().includes('clavam') ||
      preset.drugName.toLowerCase().includes('augmentin');
    const hasPenicillinAllergy = patientAllergies.some((a) =>
      a.toLowerCase().includes('penicillin')
    );

    if (isPenicillinDrug && hasPenicillinAllergy) {
      if (
        !window.confirm(
          `WARNING: ${patientName} has a documented Penicillin Allergy! Are you sure you want to add ${preset.drugName}?`
        )
      ) {
        return;
      }
    }

    const newItem: PrescriptionItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      drugName: preset.drugName,
      dosage: preset.dosage,
      frequency: preset.frequency,
      durationDays: preset.durationDays,
      timing: preset.timing,
      instructions: preset.instructions,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDrugName.trim()) return;

    const newItem: PrescriptionItem = {
      id: `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      drugName: currentDrugName.trim(),
      dosage: currentDosage.trim() || '1 tab',
      frequency: currentFrequency,
      durationDays: Number(currentDuration) || 5,
      timing: currentTiming,
      instructions: currentInstructions.trim(),
    };

    setItems((prev) => [...prev, newItem]);
    setCurrentDrugName('');
    setCurrentDosage('');
    setCurrentInstructions('');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert('Please add at least one medication to the prescription.');
      return;
    }

    try {
      const newRx = await addPrescription({
        patientId,
        patientName,
        doctorId: currentUser.id,
        doctorName: currentUser.name,
        doctorRegistrationNumber: 'DCI Reg #29481-A',
        date: new Date().toISOString().split('T')[0],
        diagnosis: diagnosis.trim() || 'Acute Odontogenic Condition',
        items,
        notes: notes.trim(),
      });
      if (onPrescriptionCreated) {
        onPrescriptionCreated(newRx.id);
      }
      onClose();
    } catch {
      /* addPrescription already alerted; keep the modal open */
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-border shadow-elevation-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
              <Pill size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">Issue Dental e-Prescription</h3>
                <span className="font-serif font-black text-primary-700 text-sm italic">℞</span>
              </div>
              <p className="text-xs text-slate-500">
                Patient: <span className="font-semibold text-slate-800">{patientName}</span> • Prescriber: {currentUser.name}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-surface-100 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Allergy Alert Pill if present */}
        {patientAllergies.length > 0 && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 flex-shrink-0">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            <div>
              <span className="font-bold">Documented Allergies: </span>
              <span>{patientAllergies.join(', ')}</span>
            </div>
          </div>
        )}

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-5 flex-1">
          {/* Clinical Diagnosis */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Clinical Diagnosis / Indication
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Acute Periapical Abscess #19, Post-Surgical Extraction, Deep Dentinal Caries"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Quick Presets Bar */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
              <Sparkles size={14} className="text-primary-600" />
              <span>1-Click Dental Medication Presets</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_DENTAL_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleApplyPreset(p)}
                  className="px-2.5 py-1 rounded-xl bg-surface-100 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300 text-slate-700 border border-border text-[11px] font-semibold transition-all"
                >
                  + {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Prescribed Medications Table */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Prescribed Drug Schedule ({items.length})
              </span>
            </div>

            {items.length === 0 ? (
              <div className="p-6 text-center bg-surface-50 rounded-2xl border border-dashed border-border text-slate-400 text-xs">
                No medications added yet. Click a preset above or add a custom drug below.
              </div>
            ) : (
              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div
                    key={it.id}
                    className="p-3.5 bg-surface-50 rounded-2xl border border-border flex items-start justify-between gap-3 text-xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-primary-100 text-primary-700 font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-900 flex items-center gap-2">
                          <span>{it.drugName}</span>
                          <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-mono text-slate-700">
                            {it.dosage}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 flex items-center gap-2">
                          <span className="font-semibold text-primary-700">{it.frequency}</span>
                          <span>•</span>
                          <span>{it.durationDays} Days</span>
                          <span>•</span>
                          <span className="italic text-slate-500">{it.timing}</span>
                        </div>
                        {it.instructions && (
                          <p className="text-[11px] text-slate-500 mt-1">{it.instructions}</p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(it.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove drug"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add Custom Drug Form Section */}
          <div className="p-4 bg-primary-50/40 rounded-2xl border border-primary-100/80 space-y-3">
            <span className="text-xs font-bold text-primary-900 block">
              + Add Custom Medication
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="sm:col-span-2">
                <input
                  type="text"
                  placeholder="Drug Name (e.g. Paracetamol, Doxycycline)"
                  value={currentDrugName}
                  onChange={(e) => setCurrentDrugName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Dosage (e.g. 500mg, 10ml)"
                  value={currentDosage}
                  onChange={(e) => setCurrentDosage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <select
                  value={currentFrequency}
                  onChange={(e) => setCurrentFrequency(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="OD (Once Daily)">OD (Once Daily)</option>
                  <option value="BD (Twice Daily)">BD (Twice Daily)</option>
                  <option value="TDS (Thrice Daily)">TDS (Thrice Daily)</option>
                  <option value="QDS (4x Daily)">QDS (4x Daily)</option>
                  <option value="SOS (As Needed)">SOS (As Needed)</option>
                </select>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Duration Days"
                  value={currentDuration}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCurrentDuration(val);
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <select
                  value={currentTiming}
                  onChange={(e) => setCurrentTiming(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="After Food">After Food</option>
                  <option value="Before Food">Before Food</option>
                  <option value="With Food">With Food</option>
                  <option value="Anytime">Anytime</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Specific instructions (e.g. swallow whole, rinse with warm water)"
                value={currentInstructions}
                onChange={(e) => setCurrentInstructions(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
              />
              <button
                type="button"
                onClick={handleAddItem}
                disabled={!currentDrugName.trim()}
                className="px-3 py-1.5 bg-primary-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm hover:bg-primary-700 transition-all flex items-center gap-1"
              >
                <Plus size={14} /> Add
              </button>
            </div>
          </div>

          {/* Doctor Special Advice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Doctor Special Advice & Warning (Optional)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Soft diet for 3 days; cold compress on left cheek; report if fever exceeds 101°F."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-end space-x-2.5 flex-shrink-0 mt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
          >
            Issue Prescription
          </button>
        </div>
      </div>
    </div>
  );
};
