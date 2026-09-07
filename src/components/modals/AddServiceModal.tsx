import React, { useState } from 'react';
import { X, Sparkles, DollarSign, Clock } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { ServiceCategory } from '../../types';

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddServiceModal: React.FC<AddServiceModalProps> = ({ isOpen, onClose }) => {
  const { addService } = useData();

  const [code, setCode] = useState('D');
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ServiceCategory>('Preventive');
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [basePrice, setBasePrice] = useState(1500);
  const [description, setDescription] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addService({
      code: code.trim().toUpperCase(),
      name: name.trim(),
      category,
      durationMinutes,
      basePrice,
      description: description.trim(),
      isActive: true,
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
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Add Dental Procedure</h2>
              <p className="text-xs text-slate-500">
                Register ADA CDT code, standard clinical duration, and base fee.
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
                placeholder="e.g. D2392"
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
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
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
              placeholder="e.g. Resin Composite - 2 Surfaces (Posterior)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Clock size={13} className="text-slate-500" /> Duration (Minutes)
              </label>
              <input
                type="number"
                min="15"
                step="15"
                required
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <DollarSign size={13} className="text-slate-500" /> Base Price (₹ INR)
              </label>
              <input
                type="number"
                min="0"
                step="5"
                required
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Clinical Description
            </label>
            <textarea
              rows={2}
              placeholder="Brief description of clinical indications..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
            />
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
              Add to Catalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
