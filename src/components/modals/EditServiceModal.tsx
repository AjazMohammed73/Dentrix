import React, { useState, useEffect } from 'react';
import { X, Edit3, DollarSign, Clock, CheckCircle2, Archive } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ServiceCategory, DentalService } from '../../types';

interface EditServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: DentalService | null;
}

export const EditServiceModal: React.FC<EditServiceModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const { updateService } = useData();

  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Preventive');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [basePrice, setBasePrice] = useState(1000);
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (service) {
      setCode(service.code);
      setName(service.name);
      setCategory(service.category);
      setDurationMinutes(service.durationMinutes);
      setBasePrice(service.basePrice);
      setDescription(service.description);
      setIsActive(service.isActive);
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateService({
      ...service,
      code: code.trim().toUpperCase(),
      name: name.trim(),
      category,
      durationMinutes: Number(durationMinutes),
      basePrice: Number(basePrice),
      description: description.trim(),
      isActive,
    });
    onClose();
  };

  const categories: ServiceCategory[] = [
    'Preventive',
    'Restorative',
    'Endodontics',
    'Periodontics',
    'Oral Surgery',
    'Orthodontics',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
              <Edit3 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Edit Dental Procedure</h2>
              <p className="text-xs text-slate-500">
                Update CDT procedure code, clinical duration, and base fees.
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                CDT Procedure Code
              </label>
              <input
                type="text"
                required
                placeholder="e.g. D2391"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:border-primary-600 uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-medium"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Procedure Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Resin Composite - 1 Surface (Posterior)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock size={13} className="text-slate-500" /> Duration (Minutes)
              </label>
              <input
                type="number"
                min="5"
                step="5"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <DollarSign size={13} className="text-slate-500" /> Base Fee (₹ INR)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-mono font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Clinical Description & Diagnostic Scope
            </label>
            <textarea
              rows={3}
              placeholder="Detail surgical guidelines, required materials, or diagnostic indications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Procedure Status Toggle */}
          <div className="p-3 bg-surface-50 rounded-2xl border border-border flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {isActive ? (
                <CheckCircle2 size={16} className="text-emerald-600" />
              ) : (
                <Archive size={16} className="text-slate-400" />
              )}
              <div>
                <div className="text-xs font-bold text-slate-800">
                  {isActive ? 'Procedure is Active' : 'Procedure is Archived / Inactive'}
                </div>
                <div className="text-[10px] text-slate-500">
                  {isActive
                    ? 'Available in appointment booking and billing procedures'
                    : 'Hidden from quick selection in new appointments'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsActive(!isActive)}
              className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-200 text-slate-700 border-slate-300 hover:bg-slate-300'
              }`}
            >
              {isActive ? 'Active' : 'Archived'}
            </button>
          </div>

          {/* Action Buttons */}
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
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20 transition-all"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
