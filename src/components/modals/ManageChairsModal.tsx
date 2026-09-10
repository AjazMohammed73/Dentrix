import React, { useState } from 'react';
import {
  X,
  Armchair,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { OperatoryChairConfig, OperatoryChairType } from '../../types';

interface ManageChairsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ManageChairsModal: React.FC<ManageChairsModalProps> = ({ isOpen, onClose }) => {
  const { currentTenant } = useAuth();
  const { operatoryChairs, addOperatoryChair, updateOperatoryChair, deleteOperatoryChair, appointments } =
    useData();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRoom, setEditRoom] = useState('');
  const [editType, setEditType] = useState<OperatoryChairType>('General');

  // New Chair Form State
  const [isAdding, setIsAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newType, setNewType] = useState<OperatoryChairType>('General');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const quotaLimit = currentTenant?.subscription?.chairLimit || 6;
  const activeChairsCount = operatoryChairs.filter((c) => c.isActive).length;
  const isQuotaReached = activeChairsCount >= quotaLimit;

  const handleStartEdit = (chair: OperatoryChairConfig) => {
    setEditingId(chair.id);
    setEditName(chair.name);
    setEditRoom(chair.roomNumber || '');
    setEditType(chair.chairType);
    setErrorMessage(null);
  };

  const handleSaveEdit = (id: string) => {
    if (!editName.trim()) {
      setErrorMessage('Operatory name cannot be empty.');
      return;
    }
    updateOperatoryChair(id, {
      name: editName.trim(),
      roomNumber: editRoom.trim() || undefined,
      chairType: editType,
    });
    setEditingId(null);
    setErrorMessage(null);
  };

  const handleAddChair = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      setErrorMessage('Please enter an operatory chair name.');
      return;
    }

    const res = await addOperatoryChair(newName.trim(), newType, newRoom.trim() || undefined);
    if (!res.success) {
      setErrorMessage(res.message || 'Failed to add operatory chair.');
      return;
    }

    setNewName('');
    setNewRoom('');
    setNewType('General');
    setIsAdding(false);
    setErrorMessage(null);
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      const res = await deleteOperatoryChair(id);
      if (!res.success) {
        setErrorMessage(res.message || 'Could not delete chair.');
      } else {
        setErrorMessage(null);
      }
    }
  };

  const getChairTypeBadge = (type: OperatoryChairType) => {
    switch (type) {
      case 'Hygiene':
        return 'bg-sky-50 text-sky-700 border-sky-200';
      case 'Surgery':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Orthodontics':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Pediatric':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Implant':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      default:
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-primary-100 text-primary-700 rounded-2xl">
              <Armchair size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Operatory Chairs & Scaling</h2>
              <p className="text-xs text-slate-500">
                Configure clinic operatory suites, chair naming, and subscription quotas
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Plan Quota Banner */}
        <div className="px-6 py-4 bg-gradient-to-r from-primary-950 via-slate-900 to-slate-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-primary-300">
              <Sparkles size={14} />
              <span>{currentTenant?.name || 'Clinic'} Subscription Tier</span>
            </div>
            <div className="text-base font-bold mt-0.5">
              {currentTenant?.plan || 'Enterprise'} Plan •{' '}
              <span className="text-primary-400">{quotaLimit} Chairs Licensed</span>
            </div>
          </div>
          <div className="bg-white/10 border border-white/15 px-4 py-2 rounded-2xl flex items-center gap-3">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-slate-300">Active Utilization</div>
              <div className="text-sm font-extrabold text-white">
                {activeChairsCount} / {quotaLimit} Chairs
              </div>
            </div>
            <div className="w-24 bg-white/20 h-2.5 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${
                  activeChairsCount >= quotaLimit ? 'bg-amber-400' : 'bg-emerald-400'
                }`}
                style={{ width: `${Math.min(100, (activeChairsCount / quotaLimit) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Error / Alert notification */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-2.5 text-xs text-rose-800 font-medium">
            <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Chairs List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Configured Operatories ({operatoryChairs.length})
              </span>
              {!isAdding && (
                <button
                  onClick={() => setIsAdding(true)}
                  disabled={isQuotaReached}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                    isQuotaReached
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/20'
                  }`}
                  title={
                    isQuotaReached
                      ? `Quota of ${quotaLimit} chairs reached for your tier`
                      : 'Add Operatory Chair'
                  }
                >
                  <Plus size={14} />
                  <span>Add Operatory</span>
                </button>
              )}
            </div>

            {/* Add Operatory Inline Form */}
            {isAdding && (
              <form
                onSubmit={handleAddChair}
                className="p-4 bg-primary-50/60 border border-primary-200 rounded-2xl space-y-3 animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-primary-900 flex items-center gap-1.5">
                    <Plus size={14} /> New Operatory Chair Configuration
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="text-xs text-slate-500 hover:text-slate-800"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Operatory / Chair Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Operatory 1 - Dr. Sharma"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-xl focus:outline-none focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Specialty / Operatory Type
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as OperatoryChairType)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-xl focus:outline-none focus:border-primary-500 cursor-pointer"
                    >
                      <option value="General">General Dentistry</option>
                      <option value="Hygiene">Hygiene / Prophylaxis</option>
                      <option value="Surgery">Oral Surgery</option>
                      <option value="Orthodontics">Orthodontics</option>
                      <option value="Pediatric">Pediatric Dental</option>
                      <option value="Implant">Implantology Suite</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                      Room / Bay Number
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bay 104, Suite B"
                      value={newRoom}
                      onChange={(e) => setNewRoom(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-border rounded-xl focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-bold rounded-xl shadow-sm"
                  >
                    Save Operatory
                  </button>
                </div>
              </form>
            )}

            {/* Operatories Table / Cards */}
            <div className="space-y-2.5">
              {operatoryChairs.map((chair) => {
                const isEditing = editingId === chair.id;
                const activeApt = appointments.find(
                  (a) => a.operatoryChair === chair.name && a.status === 'In-Chair'
                );

                if (isEditing) {
                  return (
                    <div
                      key={chair.id}
                      className="p-3.5 bg-white border-2 border-primary-500 rounded-2xl shadow-sm space-y-3"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Chair Name
                          </label>
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-surface-50 border border-border rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Specialty
                          </label>
                          <select
                            value={editType}
                            onChange={(e) => setEditType(e.target.value as OperatoryChairType)}
                            className="w-full px-3 py-1.5 text-xs bg-surface-50 border border-border rounded-xl"
                          >
                            <option value="General">General</option>
                            <option value="Hygiene">Hygiene</option>
                            <option value="Surgery">Surgery</option>
                            <option value="Orthodontics">Orthodontics</option>
                            <option value="Pediatric">Pediatric</option>
                            <option value="Implant">Implant</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                            Room / Bay
                          </label>
                          <input
                            type="text"
                            value={editRoom}
                            onChange={(e) => setEditRoom(e.target.value)}
                            className="w-full px-3 py-1.5 text-xs bg-surface-50 border border-border rounded-xl"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveEdit(chair.id)}
                          className="flex items-center gap-1 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl"
                        >
                          <Check size={14} />
                          <span>Save Changes</span>
                        </button>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={chair.id}
                    className={`p-4 bg-surface-50 hover:bg-white border rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${
                      chair.isActive ? 'border-border' : 'border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center space-x-3.5">
                      <div
                        className={`p-2.5 rounded-xl border ${
                          chair.isActive
                            ? 'bg-white border-slate-200 text-primary-700'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        <Armchair size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-slate-900">{chair.name}</span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getChairTypeBadge(
                              chair.chairType
                            )}`}
                          >
                            {chair.chairType}
                          </span>
                          {chair.roomNumber && (
                            <span className="text-[11px] text-slate-500 font-mono">
                              ({chair.roomNumber})
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                          {activeApt ? (
                            <span className="text-rose-600 font-semibold flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                              Occupied by {activeApt.patientName} ({activeApt.serviceName})
                            </span>
                          ) : (
                            <span className="text-emerald-600 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Vacant / Ready for Seating
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      {/* Active Status Toggle */}
                      <button
                        type="button"
                        onClick={() => updateOperatoryChair(chair.id, { isActive: !chair.isActive })}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold border transition-all ${
                          chair.isActive
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {chair.isActive ? 'Active' : 'Inactive'}
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => handleStartEdit(chair)}
                        className="p-1.5 text-slate-500 hover:text-primary-700 hover:bg-white rounded-xl border border-transparent hover:border-border transition-all"
                        title="Rename or Edit Operatory"
                      >
                        <Edit2 size={15} />
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(chair.id, chair.name)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl border border-transparent hover:border-rose-200 transition-all"
                        title="Remove Operatory"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Scaling Information Tip */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5 text-xs text-slate-600">
            <div className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-primary-600" />
              Dynamic Operatory Quota Rules
            </div>
            <p className="text-[11px] leading-relaxed">
              Operatory chair caps automatically scale with your subscription tier:
              <strong className="text-slate-800"> Starter (2 Chairs)</strong>,
              <strong className="text-slate-800"> Professional (6 Chairs)</strong>, and
              <strong className="text-slate-800"> Enterprise (12 Chairs)</strong>. Super Admins can
              dynamically upgrade or adjust operatory caps in the Platform Root Console with zero downtime.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
