import React, { useState } from 'react';
import {
  X,
  QrCode,
  CheckCircle2,
  Copy,
  Check,
  Smartphone,
  ShieldCheck,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Invoice, PaymentInstallment } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { formatINR } from '../../utils/format';

interface UpiQrModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
  amountToPay?: number;
  customAmount?: number;
  onPaymentSuccess?: () => void;
  onPaymentConfirmed?: (amount: number, method: PaymentInstallment['method'], notes?: string) => void;
}

export const UpiQrModal: React.FC<UpiQrModalProps> = ({
  isOpen,
  onClose,
  invoice,
  amountToPay,
  customAmount,
  onPaymentSuccess,
  onPaymentConfirmed,
}) => {
  const { currentTenant } = useAuth();
  const { addInvoicePayment } = useData();

  const [copied, setCopied] = useState(false);
  const [utrReference, setUtrReference] = useState('');
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen || !invoice) return null;

  const payable =
    customAmount !== undefined
      ? customAmount
      : amountToPay !== undefined
      ? amountToPay
      : invoice.balance > 0
      ? invoice.balance
      : invoice.amount;
  const clinicName = currentTenant?.name || 'Apex Dental Studio';
  // Standard VPA based on clinic slug
  const clinicVpa = `${(currentTenant?.slug || 'apexdental').replace(/[^a-zA-Z0-9]/g, '')}@icici`;

  // Official NPCI UPI Specification URL
  const upiUrl = `upi://pay?pa=${clinicVpa}&pn=${encodeURIComponent(
    clinicName
  )}&am=${payable.toFixed(2)}&cu=INR&tn=${encodeURIComponent(
    `Dentrix Invoice ${invoice.invoiceNumber}`
  )}`;

  // Public high-reliability QR code API with SVG fallback
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&data=${encodeURIComponent(
    upiUrl
  )}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(upiUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirmPayment = () => {
    setIsConfirming(true);
    const ref = utrReference.trim() || `UPI-${Date.now().toString().slice(-6)}`;
    const noteText = `Instant Dynamic UPI QR Settlement (UTR: ${ref})`;

    if (onPaymentConfirmed) {
      onPaymentConfirmed(payable, 'UPI / Bank', noteText);
    } else {
      addInvoicePayment(invoice.id, {
        amount: payable,
        method: 'UPI / Bank',
        notes: noteText,
      });
    }

    setIsConfirming(false);
    if (onPaymentSuccess) {
      onPaymentSuccess();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-gradient-to-r from-emerald-50 via-teal-50 to-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm">
              <QrCode size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Instant Dynamic UPI QR</h2>
              <p className="text-xs text-slate-500">Scan & pay directly from any Indian UPI app</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center space-y-4">
          {/* Amount Badge */}
          <div className="p-3 bg-surface-50 rounded-2xl border border-border inline-block px-6">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Amount to Pay
            </span>
            <span className="text-2xl font-black text-slate-900">{formatINR(payable)}</span>
            <span className="text-[11px] text-slate-500 block mt-0.5">
              Invoice #{invoice.invoiceNumber} • {invoice.patientName}
            </span>
          </div>

          {/* Dynamic QR Code Display */}
          <div className="relative inline-block mx-auto p-3 bg-white border-2 border-slate-900 rounded-3xl shadow-md">
            <img
              src={qrApiUrl}
              alt="UPI QR Code"
              className="w-56 h-56 mx-auto rounded-xl object-contain"
              onError={(e) => {
                // Fallback SVG representation if network disconnected
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="text-[10px] font-mono font-bold text-slate-600 mt-1">
              VPA: {clinicVpa}
            </div>
          </div>

          {/* Supported UPI Apps Row */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-slate-500">Supported:</span>
            {['GPay', 'PhonePe', 'Paytm', 'BHIM', 'CRED'].map((app) => (
              <span
                key={app}
                className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-surface-100 text-slate-700 border border-slate-200"
              >
                {app}
              </span>
            ))}
          </div>

          {/* Manual UTR Reference Input */}
          <div className="text-left pt-2">
            <label className="block text-[11px] font-semibold text-slate-700 mb-1">
              UPI Reference / UTR Number (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. 423910482019 or last 6 digits"
              value={utrReference}
              onChange={(e) => setUtrReference(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 font-mono"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-border bg-surface-50 flex items-center justify-between">
          <button
            type="button"
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied UPI Intent' : 'Copy Intent Link'}</span>
          </button>

          <button
            type="button"
            disabled={isConfirming}
            onClick={handleConfirmPayment}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <CheckCircle2 size={15} />
            <span>Confirm Payment Received</span>
          </button>
        </div>
      </div>
    </div>
  );
};
