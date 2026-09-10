import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Building,
  FileText,
  DollarSign,
  AlertTriangle,
  Calendar,
} from 'lucide-react';
import { Invoice, InsuranceClaimStatus } from '../../types';
import { useData } from '../../context/DataContext';
import { formatINR } from '../../utils/format';

interface ClaimSettlementModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  onSaveClaim?: (claimUpdates: Partial<NonNullable<Invoice['insuranceClaim']>>) => void;
}

export const ClaimSettlementModal: React.FC<ClaimSettlementModalProps> = ({
  isOpen,
  onClose,
  invoice,
  onSaveClaim,
}) => {
  const { updateInvoiceInsuranceClaim, addInvoicePayment } = useData();

  const [status, setStatus] = useState<InsuranceClaimStatus>('Draft');
  const [payerName, setPayerName] = useState('Star Health Insurance');
  const [policyNumber, setPolicyNumber] = useState('');
  const [preAuthNumber, setPreAuthNumber] = useState('');
  const [claimedAmount, setClaimedAmount] = useState<number>(0);
  const [approvedAmount, setApprovedAmount] = useState<number>(0);
  const [denialReason, setDenialReason] = useState('');
  const [settledDate, setSettledDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (invoice) {
      const c = invoice.insuranceClaim;
      setStatus(c?.status || 'Draft');
      setPayerName(c?.payerName || 'Star Health Insurance');
      setPolicyNumber(c?.policyNumber || `POL-${Math.floor(100000 + Math.random() * 900000)}`);
      setPreAuthNumber(c?.preAuthNumber || `PA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
      setClaimedAmount(c?.claimedAmount || invoice.amount);
      setApprovedAmount(c?.approvedAmount || Math.round(invoice.amount * 0.85));
      setDenialReason(c?.denialReason || '');
      setSettledDate(c?.settledDate || new Date().toISOString().split('T')[0]);
      setNotes(c?.notes || '');
    }
  }, [invoice]);

  if (!isOpen || !invoice) return null;

  const coPay = Math.max(0, claimedAmount - approvedAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updates = {
      status,
      payerName,
      policyNumber,
      preAuthNumber,
      claimedAmount: Number(claimedAmount),
      approvedAmount: status === 'Settled' || status === 'Approved' ? Number(approvedAmount) : 0,
      patientCoPay: coPay,
      settledDate: status === 'Settled' ? settledDate : undefined,
      denialReason: status === 'Rejected' ? denialReason : undefined,
      notes,
    };

    updateInvoiceInsuranceClaim(invoice.id, updates);
    if (onSaveClaim) {
      onSaveClaim(updates);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-blue-50 via-indigo-50 to-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-600 text-white rounded-2xl shadow-sm">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Dental Insurance Claim Manager</h2>
              <p className="text-xs text-slate-500">
                Pre-authorization, claims adjudication, and settlement tracking
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

        {/* Invoice Summary Strip */}
        <div className="px-6 py-3 bg-surface-50 border-b border-border flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800">{invoice.patientName}</span>
            <span className="text-slate-500 ml-2 font-mono">Invoice #{invoice.invoiceNumber}</span>
          </div>
          <div className="font-bold text-slate-900">
            Invoice Total: {formatINR(invoice.amount)}
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Status Selector */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Claim Status</label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
              {(
                ['Draft', 'Submitted', 'Under Review', 'Approved', 'Settled', 'Rejected'] as InsuranceClaimStatus[]
              ).map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => setStatus(st)}
                  className={`py-2 px-1 rounded-xl text-[11px] font-bold border transition-all ${
                    status === st
                      ? st === 'Settled'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : st === 'Rejected'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                        : st === 'Approved'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-primary-600 text-white border-primary-600 shadow-sm'
                      : 'bg-white text-slate-600 border-border hover:bg-surface-50'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Payer Name */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Insurance Payer / TPA
              </label>
              <select
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-primary-600 cursor-pointer"
              >
                <option value="Star Health Insurance">Star Health & Allied Insurance</option>
                <option value="HDFC ERGO Health">HDFC ERGO General Insurance</option>
                <option value="Care Health Insurance">Care Health Insurance</option>
                <option value="ICICI Lombard">ICICI Lombard Health Care</option>
                <option value="Niva Bupa Health">Niva Bupa Health Insurance</option>
                <option value="Delta Dental">Delta Dental Premier</option>
                <option value="Cigna Dental">Cigna Dental Care</option>
                <option value="MetLife Dental">MetLife Dental Coverage</option>
                <option value="Other / Corporate Direct">Other Corporate / TPA</option>
              </select>
            </div>

            {/* Policy Number */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Policy / Member ID</label>
              <input
                type="text"
                value={policyNumber}
                onChange={(e) => setPolicyNumber(e.target.value)}
                placeholder="e.g. POL-9482014"
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-primary-600 font-mono"
              />
            </div>

            {/* Pre-Authorization Reference */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Pre-Auth Approval Reference
              </label>
              <input
                type="text"
                value={preAuthNumber}
                onChange={(e) => setPreAuthNumber(e.target.value)}
                placeholder="e.g. PA-2026-8910"
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-primary-600 font-mono"
              />
            </div>

            {/* Claimed Amount */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Claimed Amount (₹)</label>
              <input
                type="text"
                value={claimedAmount}
                onChange={(e) => setClaimedAmount(Number(e.target.value.replace(/\D/g, '')) || 0)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-primary-600 font-bold"
              />
            </div>
          </div>

          {/* Settlement / Approval Details */}
          {(status === 'Approved' || status === 'Settled') && (
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl space-y-3 animate-fade-in">
              <span className="text-xs font-bold text-emerald-900 block">
                Settlement & Co-Pay Calculation
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-emerald-900 mb-1">
                    Approved Amount by Insurer (₹)
                  </label>
                  <input
                    type="text"
                    value={approvedAmount}
                    onChange={(e) =>
                      setApprovedAmount(Number(e.target.value.replace(/\D/g, '')) || 0)
                    }
                    className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-slate-900 font-extrabold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-emerald-900 mb-1">
                    Patient Out-of-Pocket Co-Pay (₹)
                  </label>
                  <div className="w-full bg-white/70 border border-emerald-200 rounded-xl px-3 py-2 text-slate-700 font-bold font-mono">
                    {formatINR(coPay)}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Denial Reason if Rejected */}
          {status === 'Rejected' && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 animate-fade-in">
              <label className="block font-bold text-rose-900">Insurer Denial Reason</label>
              <input
                type="text"
                value={denialReason}
                onChange={(e) => setDenialReason(e.target.value)}
                placeholder="e.g. Waiting period not completed for endodontic services, pre-existing condition..."
                className="w-full bg-white border border-rose-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none"
                required
              />
            </div>
          )}

          {/* Clinical Notes */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Claim Audit Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Attached IOPA X-ray, pre-op clinical photos, and signed estimate sheet."
              className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
            />
          </div>

          {/* Footer */}
          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
            >
              Save Claim Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
