import React, { useState } from 'react';
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Contrast,
  SunMedium,
  Download,
  Calendar,
  User,
  Tag,
  Eye,
} from 'lucide-react';
import { DentalRadiograph } from '../../types';

interface RadiographViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  radiograph: DentalRadiograph | null;
}

export const RadiographViewerModal: React.FC<RadiographViewerModalProps> = ({
  isOpen,
  onClose,
  radiograph,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isInverted, setIsInverted] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);

  if (!isOpen || !radiograph) return null;

  const handleZoomIn = () => setZoom((z) => Math.min(3, z + 0.25));
  const handleZoomOut = () => setZoom((z) => Math.max(0.75, z - 0.25));
  const handleReset = () => {
    setZoom(1);
    setIsInverted(false);
    setBrightness(100);
    setContrast(100);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = radiograph.imageUrl;
    link.download = `${radiograph.title.replace(/\s+/g, '_')}_${radiograph.dateTaken}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-slate-900 rounded-3xl max-w-5xl w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header Bar */}
        <div className="p-4 sm:px-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 text-white flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-slate-800 text-sky-400 rounded-xl border border-slate-700">
              <Eye size={18} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{radiograph.title}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  {radiograph.category}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Acquired on {radiograph.dateTaken} • By {radiograph.takenBy}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownload}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
              title="Download radiograph"
            >
              <Download size={16} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Center Viewer & Right Info Sidebar */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Main Radiograph Canvas Area */}
          <div className="flex-1 bg-black flex flex-col items-center justify-center relative p-4 overflow-hidden select-none">
            {/* Image display container */}
            <div className="w-full h-full flex items-center justify-center overflow-auto cursor-grab active:cursor-grabbing">
              <div
                style={{
                  transform: `scale(${zoom})`,
                  filter: `${isInverted ? 'invert(100%) hue-rotate(180deg)' : ''} brightness(${brightness}%) contrast(${contrast}%)`,
                  transition: 'transform 0.15s ease-out, filter 0.2s ease',
                }}
                className="max-w-full max-h-full flex items-center justify-center"
              >
                <img
                  src={radiograph.imageUrl}
                  alt={radiograph.title}
                  className="max-h-[62vh] object-contain rounded-lg shadow-2xl pointer-events-none"
                />
              </div>
            </div>

            {/* Float Controls Toolbar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-2xl border border-slate-700/80 shadow-2xl text-xs text-white">
              <button
                onClick={handleZoomOut}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom Out"
              >
                <ZoomOut size={16} />
              </button>
              <span className="font-mono text-[11px] px-1.5 font-bold text-slate-300">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Zoom In"
              >
                <ZoomIn size={16} />
              </button>
              <div className="w-px h-4 bg-slate-700 mx-1" />

              <button
                onClick={() => setIsInverted(!isInverted)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  isInverted
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Toggle Inverted Radiographic Film Mode"
              >
                <Contrast size={14} />
                <span>Invert</span>
              </button>

              <button
                onClick={() => setContrast((c) => (c === 100 ? 150 : 100))}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  contrast > 100
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
                title="Toggle High Contrast"
              >
                <SunMedium size={14} />
                <span>High Contrast</span>
              </button>

              <div className="w-px h-4 bg-slate-700 mx-1" />
              <button
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Reset View"
              >
                <RotateCcw size={15} />
              </button>
            </div>
          </div>

          {/* Right Clinical Interpretation Sidebar */}
          <div className="w-full md:w-80 bg-slate-900 border-t md:border-t-0 md:border-l border-slate-800 p-5 overflow-y-auto space-y-5 text-xs text-slate-300 flex-shrink-0">
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
                Diagnostic Findings & Report
              </h4>
              <p className="text-slate-300 leading-relaxed bg-slate-800/70 p-3.5 rounded-2xl border border-slate-700/80 whitespace-pre-wrap font-sans">
                {radiograph.findings}
              </p>
            </div>

            {radiograph.toothNumbers && radiograph.toothNumbers.length > 0 && (
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block mb-2">
                  Tagged Tooth Sites
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {radiograph.toothNumbers.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-xl bg-primary-500/20 text-primary-300 border border-primary-500/30 font-bold font-mono text-xs"
                    >
                      Tooth #{t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {radiograph.notes && (
              <div>
                <span className="font-bold text-white uppercase tracking-wider text-[11px] block mb-1">
                  Radiologist / Operatory Notes
                </span>
                <p className="text-slate-400 text-[11px] bg-slate-800/40 p-3 rounded-xl border border-slate-800">
                  {radiograph.notes}
                </p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center justify-between">
                <span>Modality:</span>
                <span className="font-semibold text-slate-200">Digital Dental Sensor</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Resolution:</span>
                <span className="font-mono text-slate-200">High-Res DICOM/Vector</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Verification:</span>
                <span className="text-emerald-400 font-semibold">Clinically Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
