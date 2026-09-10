import React from 'react';
import { X, Printer, Pill, ShieldCheck } from 'lucide-react';
import { DentalPrescription } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface PrescriptionPrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: DentalPrescription | null;
}

export const PrescriptionPrintModal: React.FC<PrescriptionPrintModalProps> = ({
  isOpen,
  onClose,
  prescription,
}) => {
  const { currentTenant } = useAuth();

  if (!isOpen || !prescription) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn print:p-0 print:bg-white">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-border shadow-elevation-4 max-h-[92vh] flex flex-col print:shadow-none print:border-none print:max-h-none print:w-full print:p-4">
        {/* Screen Top Bar (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-border mb-4 print:hidden flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-primary-50 text-primary-700 rounded-xl">
              <Pill size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Official Prescription Slip</h3>
              <p className="text-[11px] text-slate-500">
                Print or export high-contrast half-A4 medical slip
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm"
            >
              <Printer size={14} />
              <span>Print Slip</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-surface-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Printable Half-A4 Slip Document */}
        <div className="overflow-y-auto flex-1 print:overflow-visible">
          <div className="p-6 sm:p-8 border-2 border-slate-900 rounded-2xl bg-white text-slate-950 font-sans space-y-6 print:border-2 print:border-black print:p-6 print:rounded-none">
            {/* Header: Clinic Letterhead */}
            <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
              <div>
                <h1 className="text-xl font-black uppercase tracking-tight text-slate-900">
                  {currentTenant?.name || 'Apex Dental Studio'}
                </h1>
                <p className="text-xs font-semibold text-slate-700 mt-0.5">
                  Advanced Dental Surgery & Implant Center
                </p>
                <p className="text-[11px] text-slate-600 mt-1 max-w-sm">
                  {currentTenant?.address || '742 Evergreen Terrace, Suite 300, Austin, TX'}
                </p>
                <p className="text-[11px] text-slate-600">
                  Tel: {currentTenant?.phone || '(512) 555-0198'} • Email: {currentTenant?.email || 'contact@apexdental.com'}
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block px-3 py-1 bg-slate-900 text-white font-mono font-bold text-xs rounded print:bg-black">
                  Rx ID: #{prescription.id.toUpperCase()}
                </div>
                <div className="mt-2 text-xs font-bold text-slate-900">
                  {prescription.doctorName}
                </div>
                <div className="text-[11px] font-mono text-slate-600">
                  {prescription.doctorRegistrationNumber || 'DCI Reg #29481-A'}
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  Dental Surgeon & Consultant
                </div>
              </div>
            </div>

            {/* Patient Demographics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-300 text-xs print:bg-transparent print:border-slate-400">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Patient Name</span>
                <span className="font-bold text-slate-900 text-sm">{prescription.patientName}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Age / Gender</span>
                <span className="font-semibold text-slate-800">
                  {prescription.patientAge ? `${prescription.patientAge} Yrs` : 'Adult'} • {prescription.patientGender || 'Female'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Date Prescribed</span>
                <span className="font-mono font-semibold text-slate-800">{prescription.date}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Prescription Status</span>
                <span className="font-bold text-emerald-700">Valid & Verified</span>
              </div>
            </div>

            {/* Diagnosis Banner */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                Diagnosis:
              </span>
              <span className="font-bold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300 print:border-slate-400">
                {prescription.diagnosis}
              </span>
            </div>

            {/* Classical ℞ Emblem & Medications Table */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="font-serif font-black text-3xl text-slate-900 italic">℞</span>
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Medication Schedule
                </span>
              </div>

              <table className="w-full text-left text-xs border border-slate-900">
                <thead className="bg-slate-900 text-white font-bold uppercase text-[10px] tracking-wider print:bg-black">
                  <tr>
                    <th className="py-2.5 px-3 w-8">#</th>
                    <th className="py-2.5 px-3">Medication & Strength</th>
                    <th className="py-2.5 px-3">Dosage / Regimen</th>
                    <th className="py-2.5 px-3">Duration</th>
                    <th className="py-2.5 px-3">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300">
                  {prescription.items.map((med, index) => (
                    <tr key={med.id} className="align-top">
                      <td className="py-2.5 px-3 font-mono font-bold text-slate-500">
                        {index + 1}.
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{med.drugName}</div>
                        <div className="text-[10px] font-mono text-slate-600 font-semibold">
                          Strength: {med.dosage}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-900">
                        <div>{med.frequency}</div>
                        <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded bg-slate-100 border border-slate-300 font-mono text-slate-700">
                          {med.timing}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 font-bold text-slate-900 font-mono">
                        {med.durationDays} Days
                      </td>
                      <td className="py-2.5 px-3 text-[11px] text-slate-700 max-w-xs">
                        {med.instructions || 'Take as directed by doctor.'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Doctor Advice / Dietary Instructions */}
            {prescription.notes && (
              <div className="p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs space-y-1 print:bg-transparent print:border-slate-400">
                <span className="font-bold uppercase tracking-wider text-slate-600 text-[10px] block">
                  Physician Advice & Dietary Instructions:
                </span>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {prescription.notes}
                </p>
              </div>
            )}

            {/* Signature & Seal Footer */}
            <div className="pt-6 border-t-2 border-slate-900 flex justify-between items-end">
              <div className="space-y-1 text-[10px] text-slate-500 max-w-xs">
                <div className="flex items-center gap-1 font-bold text-slate-800">
                  <ShieldCheck size={13} className="text-emerald-700" />
                  <span>Verified Electronic Dental Prescription</span>
                </div>
                <p>
                  This prescription is generated under Digital Clinical Governance regulations.
                  Please consult the clinic for refills or persistent discomfort.
                </p>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic font-bold text-sm text-slate-800 mb-2">
                  Dr. Sarah Vance, DDS
                </div>
                <div className="w-48 border-b border-slate-900 ml-auto" />
                <div className="text-xs font-bold text-slate-900">Authorized Signature & Seal</div>
                <div className="text-[10px] font-mono text-slate-600">
                  {prescription.doctorRegistrationNumber || 'DCI Reg #29481-A'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
