import React, { useState } from 'react';
import { X, FileText, User, DollarSign, Calendar, CreditCard, Sparkles } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { InvoiceStatus, Invoice } from '../../types';
import { formatINR } from '../../utils/format';

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
  const [amount, setAmount] = useState<number>(services[0]?.basePrice || 2500);
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  });
  const [status, setStatus] = useState<InvoiceStatus>('Pending');
  const [paymentMethod, setPaymentMethod] = useState<Invoice['paymentMethod']>('Cash');

  if (!isOpen) return null;

  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];
  const balance = Math.max(0, amount - amountPaid);

  const handleAmountPaidChange = (paidVal: number) => {
    setAmountPaid(paidVal);
    if (paidVal >= amount && amount > 0) {
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
      setAmount(matchedService.basePrice);
      if (amountPaid > 0 && amountPaid >= matchedService.basePrice) {
        setStatus('Paid');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const invoiceNum = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInvoice = addInvoice({
      invoiceNumber: invoiceNum,
      patientId: selectedPatient.id,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      serviceName,
      amount: Number(amount),
      amountPaid: Number(amountPaid),
      balance: Math.max(0, Number(amount) - Number(amountPaid)),
      date,
      dueDate,
      status: Number(amountPaid) >= Number(amount) ? 'Paid' : status,
      paymentMethod: Number(amountPaid) > 0 ? paymentMethod : undefined,
    });

    if (onInvoiceCreated) {
      onInvoiceCreated(newInvoice);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-border overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-primary-50 text-primary-700 rounded-2xl">
              <FileText size={20} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Generate Patient Invoice</h2>
              <p className="text-xs text-slate-500">
                Clinic: <span className="font-semibold text-slate-700">{currentTenant?.name || 'Apex Dental'}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-surface-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Patient Selector */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <User size={13} className="text-primary-600" />
              Patient Name *
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              required
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} — {p.phone}
                </option>
              ))}
            </select>
          </div>

          {/* Procedure / Service */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Sparkles size={13} className="text-primary-600" />
              Dental Procedure / Service *
            </label>
            <select
              value={serviceName}
              onChange={handleServiceSelect}
              className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  [{s.code}] {s.name} ({formatINR(s.basePrice)})
                </option>
              ))}
              <option value="Custom Procedure / Treatment">Custom Procedure / Treatment</option>
            </select>
          </div>

          {/* Billed Amount & Amount Paid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <DollarSign size={13} className="text-primary-600" />
                Total Fee (₹ INR) *
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Amount Paid (₹ INR)
              </label>
              <input
                type="number"
                min="0"
                max={amount}
                step="50"
                value={amountPaid}
                onChange={(e) => handleAmountPaidChange(Number(e.target.value))}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-emerald-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Balance calculation badge */}
          <div className="p-3 bg-surface-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <span className="text-slate-600 font-semibold">Remaining Balance Due:</span>
            <span className={`font-mono font-extrabold text-sm ${balance > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
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
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Payment Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                required
              />
            </div>
          </div>

          {/* Status & Payment Method */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Invoice Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                <CreditCard size={13} className="text-primary-600" />
                Payment Method
              </label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as Invoice['paymentMethod'])}
                className="w-full bg-surface-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Cash">Cash</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Insurance">Insurance</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-surface-100 rounded-xl transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-extrabold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20 transition-all flex items-center gap-2"
            >
              <FileText size={14} />
              <span>Create Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};