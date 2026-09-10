import React, { useState } from 'react';
import { X, Layers, Plus, Trash2, CheckCircle, IndianRupee } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { TreatmentPhase, TreatmentPlanItem, TreatmentPhaseType } from '../../types';
import { formatINR } from '../../utils/format';

interface AddTreatmentPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
  onSuccess?: () => void;
}

export const AddTreatmentPlanModal: React.FC<AddTreatmentPlanModalProps> = ({
  isOpen,
  onClose,
  patientId,
  patientName,
  onSuccess,
}) => {
  const { services, addTreatmentPlan } = useData();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [selectedPhase, setSelectedPhase] = useState<TreatmentPhaseType>(
    'Phase 1: Emergency & Pain Relief'
  );

  // Selected procedure from catalog
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const [customToothNumber, setCustomToothNumber] = useState('19');
  const [customFee, setCustomFee] = useState<string>(
    services[0] ? String(services[0].basePrice) : '2500'
  );
  const [itemPriority, setItemPriority] = useState<TreatmentPlanItem['priority']>('Standard');

  // Phases state
  const [phases, setPhases] = useState<TreatmentPhase[]>([
    {
      id: 'phase_1',
      phaseType: 'Phase 1: Emergency & Pain Relief',
      items: [],
    },
    {
      id: 'phase_2',
      phaseType: 'Phase 2: Disease Control & Endodontics',
      items: [],
    },
    {
      id: 'phase_3',
      phaseType: 'Phase 3: Prosthetics & Rehabilitation',
      items: [],
    },
    {
      id: 'phase_4',
      phaseType: 'Phase 4: Maintenance & Prevention',
      items: [],
    },
  ]);

  if (!isOpen) return null;

  const handleSelectServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const srv = services.find((s) => s.id === serviceId);
    if (srv) {
      setCustomFee(String(srv.basePrice));
    }
  };

  const handleAddItemToPhase = (e: React.FormEvent) => {
    e.preventDefault();
    const srv = services.find((s) => s.id === selectedServiceId);
    if (!srv) return;

    const toothNum = customToothNumber ? parseInt(customToothNumber.replace(/\D/g, ''), 10) : undefined;
    const newItem: TreatmentPlanItem = {
      id: `tpi_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      serviceCode: srv.code,
      procedureName: srv.name,
      toothNumber: isNaN(toothNum as number) ? undefined : toothNum,
      estimatedFee: Number(customFee) || srv.basePrice,
      status: 'Proposed',
      priority: itemPriority,
      notes: `${srv.category} procedure`,
    };

    setPhases((prev) =>
      prev.map((ph) => {
        if (ph.phaseType === selectedPhase) {
          return { ...ph, items: [...ph.items, newItem] };
        }
        return ph;
      })
    );
  };

  const handleRemoveItem = (phaseType: TreatmentPhaseType, itemId: string) => {
    setPhases((prev) =>
      prev.map((ph) => {
        if (ph.phaseType === phaseType) {
          return { ...ph, items: ph.items.filter((it) => it.id !== itemId) };
        }
        return ph;
      })
    );
  };

  // Grand total calculation
  const totalEstimatedFee = phases.reduce(
    (sum, ph) => sum + ph.items.reduce((s, it) => s + it.estimatedFee, 0),
    0
  );

  const handleSubmitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const activePhases = phases.filter((ph) => ph.items.length > 0);
    if (activePhases.length === 0) {
      alert('Please add at least one procedure to the treatment plan.');
      return;
    }

    addTreatmentPlan({
      patientId,
      title: title.trim() || `Treatment Plan - ${patientName}`,
      createdDate: new Date().toISOString().split('T')[0],
      createdBy: currentUser.name,
      phases: activePhases,
      totalEstimatedFee,
      acceptedFee: 0,
      status: 'Proposed' as any,
    })
      .then(() => {
        if (onSuccess) onSuccess();
        onClose();
      })
      .catch(() => undefined);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-border shadow-elevation-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
              <Layers size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Create Phased Treatment Plan
              </h3>
              <p className="text-xs text-slate-500">
                Patient: <span className="font-semibold text-slate-800">{patientName}</span> • Clinical Planner
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

        {/* Scrollable Plan Builder Content */}
        <div className="overflow-y-auto pr-1 space-y-5 flex-1">
          {/* Plan Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Treatment Plan Title / Diagnostic Goal
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Comprehensive Restorative & Endodontic Rehab (#19)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Add Procedure to Phase Form */}
          <div className="p-4 bg-surface-50 rounded-2xl border border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                + Add Procedure to Target Phase
              </span>
              <span className="text-[11px] font-bold text-primary-700">
                Catalog: {services.length} CDT Procedures
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Select Target Phase
                </label>
                <select
                  value={selectedPhase}
                  onChange={(e) => setSelectedPhase(e.target.value as TreatmentPhaseType)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="Phase 1: Emergency & Pain Relief">Phase 1: Emergency & Pain Relief</option>
                  <option value="Phase 2: Disease Control & Endodontics">Phase 2: Disease Control & Endodontics</option>
                  <option value="Phase 3: Prosthetics & Rehabilitation">Phase 3: Prosthetics & Rehabilitation</option>
                  <option value="Phase 4: Maintenance & Prevention">Phase 4: Maintenance & Prevention</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Procedure from Catalog
                </label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => handleSelectServiceChange(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code} - {s.name} ({formatINR(s.basePrice)})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Tooth # (1–32 Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 19"
                  value={customToothNumber}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCustomToothNumber(val);
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Estimated Fee (₹ INR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 6500"
                  value={customFee}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    setCustomFee(val);
                  }}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Priority
                </label>
                <select
                  value={itemPriority}
                  onChange={(e) => setItemPriority(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-white border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="Standard">Standard</option>
                  <option value="Elective">Elective</option>
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddItemToPhase}
              className="w-full py-2 bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus size={15} /> Add to {selectedPhase.split(':')[0]}
            </button>
          </div>

          {/* Current Phases Breakdown Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="text-xs font-bold text-slate-800">
                Plan Structure Preview
              </span>
              <div className="text-xs font-bold text-slate-900">
                Total Estimate: <span className="text-primary-700 font-mono text-sm">{formatINR(totalEstimatedFee)}</span>
              </div>
            </div>

            {phases.map((ph) => {
              const phaseSubtotal = ph.items.reduce((sum, it) => sum + it.estimatedFee, 0);
              return (
                <div
                  key={ph.id}
                  className="p-3.5 rounded-2xl border border-border space-y-2 bg-white"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {ph.phaseType}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600">
                      Subtotal: {formatINR(phaseSubtotal)}
                    </span>
                  </div>

                  {ph.items.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No procedures in this phase.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {ph.items.map((it) => (
                        <div
                          key={it.id}
                          className="flex items-center justify-between p-2 bg-surface-50 rounded-xl text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-primary-700 text-[11px]">
                              {it.serviceCode}
                            </span>
                            <span className="font-semibold text-slate-800">{it.procedureName}</span>
                            {it.toothNumber && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 bg-white rounded border border-slate-200">
                                #{it.toothNumber}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-slate-900">
                              {formatINR(it.estimatedFee)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(ph.phaseType, it.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex items-center justify-between flex-shrink-0 mt-2">
          <div className="text-xs text-slate-500">
            Total Procedures: {phases.reduce((sum, ph) => sum + ph.items.length, 0)}
          </div>
          <div className="flex items-center space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmitPlan}
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
            >
              Save Treatment Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
