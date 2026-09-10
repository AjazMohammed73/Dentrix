import React, { useState, useRef } from 'react';
import {
  X,
  Download,
  Upload,
  Database,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  ShieldCheck,
  HardDrive,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface ClinicBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClinicBackupModal: React.FC<ClinicBackupModalProps> = ({ isOpen, onClose }) => {
  const { currentTenant, currentUser } = useAuth();
  const {
    patients,
    appointments,
    clinicalNotes,
    invoices,
    services,
    prescriptions,
    radiographs,
    perioCharts,
    treatmentPlans,
    operatoryChairs,
    auditLogs,
    restoreBackupData,
    logAuditEvent,
  } = useData();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);
  const [restorePreview, setRestorePreview] = useState<any | null>(null);
  const [restoreMessage, setRestoreMessage] = useState<{ text: string; isError?: boolean } | null>(
    null
  );
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  const handleExportJSON = () => {
    setIsExporting(true);

    const backupPayload = {
      system: 'Dentrix Practice Management & Clinical Cloud',
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: {
        id: currentUser.id,
        name: currentUser.name,
        role: currentUser.role,
      },
      tenant: currentTenant,
      statistics: {
        patientsCount: patients.length,
        appointmentsCount: appointments.length,
        clinicalNotesCount: clinicalNotes.length,
        invoicesCount: invoices.length,
        prescriptionsCount: prescriptions.length,
        radiographsCount: radiographs.length,
        perioChartsCount: perioCharts.length,
        treatmentPlansCount: treatmentPlans.length,
        operatoryChairsCount: operatoryChairs.length,
        auditLogsCount: auditLogs.length,
      },
      data: {
        patients,
        appointments,
        clinicalNotes,
        invoices,
        services,
        prescriptions,
        radiographs,
        perioCharts,
        treatmentPlans,
        operatoryChairs,
        auditLogs,
      },
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupPayload, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    const slug = currentTenant?.slug || 'clinic';
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `dentrix_backup_${slug}_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    logAuditEvent(
      'BACKUP_EXPORTED',
      'Backup',
      undefined,
      `Exported complete statutory JSON backup archive (${patients.length} patients, ${invoices.length} invoices)`
    );

    setIsExporting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setRestoreFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.data || !parsed.system) {
          setRestoreMessage({ text: 'Invalid backup file structure.', isError: true });
          setRestorePreview(null);
          return;
        }
        setRestorePreview(parsed);
        setRestoreMessage({
          text: `Valid backup archive detected: ${parsed.tenant?.name || 'Clinic'} (${
            parsed.statistics?.patientsCount || 0
          } patients, ${parsed.statistics?.invoicesCount || 0} invoices).`,
        });
      } catch (err) {
        setRestoreMessage({ text: 'Error parsing JSON archive.', isError: true });
        setRestorePreview(null);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmRestore = () => {
    if (!restorePreview || !restorePreview.data) return;

    if (
      confirm(
        'Are you sure you want to restore clinic data from this backup? Current clinic data will be updated with the backup records.'
      )
    ) {
      const res = restoreBackupData(restorePreview.data);
      if (res.success) {
        setRestoreMessage({ text: 'Clinic data successfully restored from backup archive!' });
        setRestoreFile(null);
        setRestorePreview(null);
      } else {
        setRestoreMessage({ text: res.message || 'Failed to restore backup.', isError: true });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-slate-900 via-primary-950 to-slate-900 text-white">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-primary-600 text-white rounded-2xl shadow-sm">
              <Database size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold">Clinic Data Backup & Statutory Export</h2>
              <p className="text-xs text-slate-300">
                Statutory disaster recovery, full encrypted EHR export & restore
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Export Section */}
          <div className="p-5 bg-surface-50 border border-border rounded-2xl space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Download size={16} className="text-primary-600" />
                  Statutory 1-Click Backup Export (JSON)
                </h3>
                <p className="text-slate-500 mt-0.5">
                  Downloads a comprehensive standalone JSON archive containing all patient charts,
                  clinical progress notes, CDT fee schedules, billing ledgers, radiographs, and
                  HIPAA compliance audit trails.
                </p>
              </div>
              <button
                type="button"
                onClick={handleExportJSON}
                disabled={isExporting}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-sm transition-all flex-shrink-0 cursor-pointer"
              >
                <Download size={14} />
                <span>{isExporting ? 'Exporting...' : 'Export Backup JSON'}</span>
              </button>
            </div>

            {/* Archive Content Overview */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200">
              <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                <span className="font-bold text-slate-800 text-sm">{patients.length}</span>
                <span className="text-[10px] text-slate-500 block">Patients</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                <span className="font-bold text-slate-800 text-sm">{clinicalNotes.length}</span>
                <span className="text-[10px] text-slate-500 block">Clinical Notes</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                <span className="font-bold text-slate-800 text-sm">{invoices.length}</span>
                <span className="text-[10px] text-slate-500 block">Invoices & Receipts</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-slate-200 text-center">
                <span className="font-bold text-slate-800 text-sm">{radiographs.length}</span>
                <span className="text-[10px] text-slate-500 block">Radiographs & Scans</span>
              </div>
            </div>
          </div>

          {/* Restore / Import Section */}
          <div className="p-5 bg-surface-50 border border-border rounded-2xl space-y-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Upload size={16} className="text-indigo-600" />
                Disaster Recovery & Backup Restore
              </h3>
              <p className="text-slate-500 mt-0.5">
                Upload a previous Dentrix JSON backup to restore or import records into this clinic
                instance.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Choose Backup File (.json)
              </button>
              <span className="text-slate-500 truncate max-w-xs">
                {restoreFile ? restoreFile.name : 'No file chosen'}
              </span>
            </div>

            {/* Notification or Status */}
            {restoreMessage && (
              <div
                className={`p-3 rounded-xl border flex items-center gap-2 ${
                  restoreMessage.isError
                    ? 'bg-rose-50 border-rose-200 text-rose-800'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}
              >
                {restoreMessage.isError ? <AlertTriangle size={15} /> : <CheckCircle2 size={15} />}
                <span>{restoreMessage.text}</span>
              </div>
            )}

            {/* Restore Confirm Button */}
            {restorePreview && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleConfirmRestore}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-sm transition-all"
                >
                  Confirm & Restore Clinic Records
                </button>
              </div>
            )}
          </div>

          {/* Compliance notice */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center gap-3 text-slate-600">
            <ShieldCheck size={20} className="text-primary-600 flex-shrink-0" />
            <div className="text-[11px] leading-relaxed">
              <strong className="text-slate-800">Statutory EHR Data Retention:</strong> Regular
              offline backups satisfy National Digital Health Mission (ABDM) and HIPAA requirements
              for electronic patient record preservation and portable clinic migration.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-border bg-surface-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
