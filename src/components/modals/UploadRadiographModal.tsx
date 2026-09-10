import React, { useState } from 'react';
import { X, Upload, Image, FileText, CheckCircle2 } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { RadiographCategory } from '../../types';

interface UploadRadiographModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientId: string;
  patientName: string;
  onUploadSuccess?: () => void;
}

export const UploadRadiographModal: React.FC<UploadRadiographModalProps> = ({
  isOpen,
  onClose,
  patientId,
  patientName,
  onUploadSuccess,
}) => {
  const { addRadiograph } = useData();
  const { currentUser } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RadiographCategory>('IOPA (Periapical)');
  const [toothNumbersInput, setToothNumbersInput] = useState('19');
  const [findings, setFindings] = useState('');
  const [notes, setNotes] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Security check: Only allow safe raster image MIME types (JPEG, PNG, WebP)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setFileError('Invalid file format. Only JPEG, PNG, and WebP images are allowed.');
      return;
    }

    // Size limit: 5MB to prevent browser memory & localStorage exhaustion
    const maxSizeBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setFileError('Image exceeds the 5MB size limit. Please compress the file before uploading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    // Parse tooth numbers
    const parsedTeeth = toothNumbersInput
      .split(/[\s,]+/)
      .map((t) => parseInt(t.replace(/\D/g, ''), 10))
      .filter((n) => !isNaN(n) && n >= 1 && n <= 32);

    // Fallback sample image if user didn't upload a file
    const defaultPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#0f172a"/>
  <text x="30" y="45" fill="#64748b" font-family="monospace" font-size="14" font-weight="bold">${category.toUpperCase()} • APEX DENTAL</text>
  <ellipse cx="300" cy="300" rx="120" ry="160" fill="#cbd5e1" opacity="0.8"/>
  <ellipse cx="300" cy="300" rx="40" ry="80" fill="#1e293b"/>
  <text x="260" y="310" fill="#94a3b8" font-family="sans-serif" font-size="14">TOOTH</text>
</svg>
`)}`;

    addRadiograph({
      patientId,
      title: title.trim(),
      category,
      dateTaken: new Date().toISOString().split('T')[0],
      toothNumbers: parsedTeeth.length > 0 ? parsedTeeth : undefined,
      imageUrl: previewUrl || defaultPlaceholder,
      findings: findings.trim() || 'No active radiolucency detected; normal bone architecture.',
      takenBy: currentUser.name,
      notes: notes.trim(),
    });

    if (onUploadSuccess) onUploadSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-border shadow-elevation-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
              <Upload size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Upload Patient Radiograph / Scan</h3>
              <p className="text-xs text-slate-500">
                Patient: <span className="font-semibold text-slate-800">{patientName}</span>
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

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto pr-1 space-y-4 flex-1">
          {/* File Upload Drop Area */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Radiograph File / Clinical Photo
            </label>
            <label className="border-2 border-dashed border-slate-300 hover:border-primary-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors bg-surface-50 hover:bg-primary-50/30">
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
              />
              {previewUrl ? (
                <div className="flex items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-16 h-16 object-cover rounded-xl border border-border shadow-sm"
                  />
                  <div className="text-left">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      Image Loaded
                    </span>
                    <span className="text-[11px] text-slate-500">Click to replace file</span>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-1">
                  <Image size={24} className="mx-auto text-slate-400" />
                  <span className="text-xs font-bold text-slate-700 block">
                    Choose image or drag and drop
                  </span>
                  <span className="text-[10px] text-slate-400">
                    JPEG, PNG, or WebP up to 5MB
                  </span>
                </div>
              )}
            </label>
            {fileError && (
              <p className="text-xs font-semibold text-rose-600 mt-1.5 flex items-center gap-1">
                <span>⚠️</span> {fileError}
              </p>
            )}
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Scan Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. IOPA Tooth #19"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Imaging Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RadiographCategory)}
                className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
              >
                <option value="IOPA (Periapical)">IOPA (Periapical)</option>
                <option value="Bitewing">Bitewing</option>
                <option value="OPG (Panoramic)">OPG (Panoramic)</option>
                <option value="CBCT 3D">CBCT 3D</option>
                <option value="Intraoral Photo">Intraoral Photo</option>
                <option value="Cephalometric">Cephalometric</option>
              </select>
            </div>
          </div>

          {/* Tooth Numbers */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Associated Tooth Numbers (Universal 1–32)
            </label>
            <input
              type="text"
              placeholder="e.g. 19 or 14, 15, 16"
              value={toothNumbersInput}
              onChange={(e) => setToothNumbersInput(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 font-mono"
            />
          </div>

          {/* Diagnostic Findings */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Radiographic Interpretation & Diagnostic Findings
            </label>
            <textarea
              rows={3}
              required
              placeholder="Describe radiolucency/radiopacity, bone level, lamina dura, apical pathology, or root anatomy..."
              value={findings}
              onChange={(e) => setFindings(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600 resize-none"
            />
          </div>

          {/* Internal Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Operatory Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Schick 33 Sensor, 70kVp exposure, re-exposure required"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary-600"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-border flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
            >
              Save to Imaging Gallery
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
