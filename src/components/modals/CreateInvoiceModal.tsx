import React, { useState } from 'react';
import { X, FileText, User, DollarSign, Calendar, CreditCard, Sparkles, Percent, Receipt } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { InvoiceStatus, Invoice } from '../../types';
import { formatINR, todayISO, isoAfterDays } from '../../utils/format';

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated?: (invoice: Invoice) => void;
  initialPatientId?: string;
}

export const CreateInvoiceModal: React.FC<CreateInvoiceModalProps> = ({
  isOpen,
  onClose,
  onInvoiceCreated,
  initialPatientId,
}) => {
  const { patients, services, addInvoice } = useData();
  const { currentTenant } = useAuth();

  const [patientId, setPatientId] = useState(initialPatientId || (patients[0]?.id || ''));
  const [serviceName, setServiceName] = useState(services[0]?.name || 'Routine Dental Care & Consultation');
  const [subtotal, setSubtotal] = useState<number>(services[0]?.basePrice || 2500);

  // Discounts state
  const [discountType, setDiscountType] = useState<'flat' | 'percentage'>('percentage');
  const [discountValue, setDiscountValue] = useState<number>(0);

  // Tax (GST) state
  const [applyGst, setApplyGst] = useState<boolean>(false);

  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [date, setDate] = useState(todayISO);
  const [dueDate, setDueDate] = useState(() => isoAfterDays(15));
  const [status, setStatus] = useState<InvoiceStatus>('Pending');
  const [paymentMethod, setPaymentMethod] = useState<Invoice['paymentMethod']>('UPI / Bank');

  if (!isOpen) return null;

  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];

  // Calculate discount amount
  const discountAmount =
    discountType === 'percentage'
      ? Math.round((subtotal * discountValue) / 100)
      : Math.min(subtotal, discountValue);

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // Calculate GST: CGST 9% + SGST 9% (18% total)
  const cgstAmount = applyGst ? Math.round(taxableAmount * 0.09) : 0;
  const sgstAmount = applyGst ? Math.round(taxableAmount * 0.09) : 0;
  const taxAmount = cgstAmount + sgstAmount;

  // Final Net Payable
  const finalAmount = taxableAmount + taxAmount;
  const balance = Math.max(0, finalAmount - amountPaid);

  const handleAmountPaidChange = (paidVal: number) => {
    setAmountPaid(paidVal);
    if (paidVal >= finalAmount && finalAmount > 0) {
      setStatus('Paid');
    } else if (paidVal > 0) {
      setStatus('Pending');
    }
  };

  const handleServiceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sName = e.target.value;
    setServiceName(sName);
    const matchedService = services.find((s) => s.name === sName);
    if (matchedService) {
      setSubtotal(matchedService.basePrice);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    try {
      // invoiceNumber / patientName / balance are set server-side; kept here to
      // satisfy the Invoice shape.
      const newInvoice = await addInvoice({
        invoiceNumber: '',
        patientId: selectedPatient.id,
        patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
        serviceName,
        amount: finalAmount,
        amountPaid: Number(amountPaid),
        balance: Math.max(0, finalAmount - Number(amountPaid)),
        date,
        dueDate,
        status: Number(amountPaid) >= finalAmount ? 'Paid' : status,
        paymentMethod: Number(amountPaid) > 0 ? paymentMethod : undefined,
        subtotal,
        discountType: discountValue > 0 ? discountType : undefined,
        discountValue: discountValue > 0 ? discountValue : undefined,
        discountAmount: discountValue > 0 ? discountAmount : undefined,
        taxRatePercent: applyGst ? 18 : undefined,
        taxAmount: applyGst ? taxAmount : undefined,
        cgstAmount: applyGst ? cgstAmount : undefined,
        sgstAmount: applyGst ? sgstAmount : undefined,
      });

      if (onInvoiceCreated) {
        onInvoiceCreated(newInvoice);
      }
      onClose();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Failed to create invoice');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-border overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-primary-50 text-primary-700 rounded-2xl">
              <Receipt size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Generate Patient Invoice</h2>
              <p className="text-xs text-slate-500">
                Itemized dental procedure charges, discounts & GST tax calculation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
          {/* Patient Selection */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <User size={13} className="text-primary-600" />
              Billed Patient *
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              required
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} — {p.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Service / Procedure */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Dental Service / CDT Procedure *
            </label>
            <select
              value={serviceName}
              onChange={handleServiceSelect}
              className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              required
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  [{s.code}] {s.name} ({formatINR(s.basePrice)})
                </option>
              ))}
              <option value="Custom Procedure / Treatment">Custom Procedure / Treatment</option>
            </select>
          </div>

          {/* Subtotal Base Fee */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <DollarSign size={13} className="text-primary-600" />
              Procedure Base Fee (Subtotal ₹) *
            </label>
            <input
              type="text"
              value={subtotal}
              onChange={(e) => setSubtotal(Number(e.target.value.replace(/\D/g, '')) || 0)}
              className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            />
          </div>

          {/* Discounts Section */}
          <div className="p-3.5 bg-surface-50 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <Percent size={13} className="text-emerald-600" />
                Clinic Discount / Package
              </span>
              <div className="flex items-center bg-white rounded-lg border border-slate-200 p-0.5 text-[11px]">
                <button
                  type="button"
                  onClick={() => setDiscountType('percentage')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    discountType === 'percentage'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  % Percent
                </button>
                <button
                  type="button"
                  onClick={() => setDiscountType('flat')}
                  className={`px-2 py-0.5 rounded font-bold transition-all ${
                    discountType === 'flat'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ₹ Flat
                </button>
              </div>
            </div>

            {/* Quick preset chips */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { label: 'None (0%)', val: 0, type: 'percentage' as const },
                { label: 'Senior (10%)', val: 10, type: 'percentage' as const },
                { label: 'Family (15%)', val: 15, type: 'percentage' as const },
                { label: 'Courtesy (₹500)', val: 500, type: 'flat' as const },
              ].map((chip) => (
                <button
                  type="button"
                  key={chip.label}
                  onClick={() => {
                    setDiscountType(chip.type);
                    setDiscountValue(chip.val);
                  }}
                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-all ${
                    discountValue === chip.val && discountType === chip.type
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder={discountType === 'percentage' ? 'e.g. 10 (%)' : 'e.g. 500 (₹)'}
                value={discountValue || ''}
                onChange={(e) => setDiscountValue(Number(e.target.value.replace(/\D/g, '')) || 0)}
                className="w-28 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none"
              />
              {discountAmount > 0 && (
                <span className="text-emerald-700 font-bold text-xs">
                  - {formatINR(discountAmount)} discount applied
                </span>
              )}
            </div>
          </div>

          {/* GST Tax Calculation */}
          <div className="p-3.5 bg-surface-50 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-800 flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={applyGst}
                  onChange={(e) => setApplyGst(e.target.checked)}
                  className="rounded text-primary-600 focus:ring-primary-500 w-4 h-4 cursor-pointer"
                />
                <span>Apply GST (18% Institutional Billing)</span>
              </label>
              {applyGst && (
                <span className="font-bold text-slate-900 text-xs">+{formatINR(taxAmount)}</span>
              )}
            </div>
            {applyGst && (
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-white p-2 rounded-xl border border-slate-200">
                <div>CGST (9%): <strong className="text-slate-800">{formatINR(cgstAmount)}</strong></div>
                <div>SGST (9%): <strong className="text-slate-800">{formatINR(sgstAmount)}</strong></div>
              </div>
            )}
          </div>

          {/* Invoice Summary Box */}
          <div className="p-4 bg-primary-950 text-white rounded-2xl space-y-1.5 shadow-sm">
            <div className="flex justify-between text-slate-300">
              <span>Subtotal:</span>
              <span className="font-mono">{formatINR(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({discountType === 'percentage' ? `${discountValue}%` : 'Flat'}):</span>
                <span className="font-mono">- {formatINR(discountAmount)}</span>
              </div>
            )}
            {applyGst && (
              <div className="flex justify-between text-sky-300">
                <span>GST (18%):</span>
                <span className="font-mono">+ {formatINR(taxAmount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-white/20 flex justify-between text-base font-extrabold text-white">
              <span>Net Payable Amount:</span>
              <span className="font-mono text-primary-300">{formatINR(finalAmount)}</span>
            </div>
          </div>

          {/* Amount Paid Now */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Amount Paid Today (₹ INR)
              </label>
              <input
                type="text"
                value={amountPaid || ''}
                onChange={(e) => handleAmountPaidChange(Number(e.target.value.replace(/\D/g, '')) || 0)}
                placeholder="0"
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
              >
                <option value="UPI / Bank">UPI / QR Code</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Cash">Cash</option>
                <option value="Insurance">Insurance Pre-Auth</option>
              </select>
            </div>
          </div>

          {/* Balance calculation badge */}
          <div className="p-3 bg-surface-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Remaining Balance Due:</span>
            <span
              className={`font-mono font-extrabold text-sm ${
                balance > 0 ? 'text-rose-600' : 'text-emerald-600'
              }`}
            >
              {formatINR(balance)}
            </span>
          </div>

          {/* Date & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <Calendar size={13} className="text-primary-600" />
                Invoice Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Payment Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all cursor-pointer"
            >
              Issue Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};