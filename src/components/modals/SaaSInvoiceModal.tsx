import React from 'react';
import { X, Printer, Download, Building, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { ClinicTenant } from '../../types';
import { formatINR } from '../../utils/format';

interface SaaSInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  tenant: ClinicTenant | null;
}

export const SaaSInvoiceModal: React.FC<SaaSInvoiceModalProps> = ({
  isOpen,
  onClose,
  tenant,
}) => {
  if (!isOpen || !tenant) return null;

  const sub = tenant.subscription || {
    plan: tenant.plan || 'Professional',
    status: 'Active',
    billingCycle: 'Monthly',
    monthlyFee: tenant.plan === 'Enterprise' ? 31999 : tenant.plan === 'Professional' ? 15999 : 7999,
    chairLimit: tenant.plan === 'Enterprise' ? 12 : tenant.plan === 'Professional' ? 6 : 2,
    renewalDate: '2025-01-15',
    autoRenew: true,
  };

  const invoiceNumber = `AXIO-SUB-${new Date().getFullYear()}-${tenant.slug.substring(0, 4).toUpperCase()}`;
  const invoiceDate = new Date().toISOString().split('T')[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Toolbar */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">SaaS Subscription Invoice</h2>
              <p className="text-[11px] text-slate-500">Invoice #{invoiceNumber}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Printer size={13} />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Invoice Body */}
        <div className="overflow-y-auto flex-1 p-6 bg-slate-50 flex justify-center">
          <div
            id="printable-saas-invoice"
            className="bg-white w-full p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5 text-xs text-slate-800"
          >
            {/* Header: Axiotronicx to Clinic */}
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <span className="font-black text-sm tracking-tight text-slate-900 block">
                  Axiotronicx.Inc
                </span>
                <span className="text-[10px] text-primary-700 font-bold block">
                  Dentrix SaaS Dental Cloud Platform
                </span>
                <p className="text-[11px] text-slate-500 mt-1">
                  Technology Park, Floor 8, Cyber City
                </p>
                <p className="text-[11px] text-slate-500">
                  GSTIN: 29AABCA9876Q1ZB • support@axiotronicx.com
                </p>
              </div>

              <div className="text-right">
                <div className="inline-block px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                  PAID IN FULL
                </div>
                <div className="font-mono text-[11px] font-bold text-slate-700 block">
                  {invoiceNumber}
                </div>
                <div className="text-[10px] text-slate-400">Date: {invoiceDate}</div>
              </div>
            </div>

            {/* Billed To */}
            <div className="grid grid-cols-2 gap-4 p-3 bg-surface-50 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Billed To (Subscriber Clinic):
                </span>
                <div className="font-bold text-slate-900 text-xs">{tenant.name}</div>
                <div className="text-slate-600 text-[11px]">Attn: {tenant.doctorAdminName}</div>
                <div className="text-slate-500 text-[11px]">{tenant.address}</div>
                <div className="text-slate-500 text-[11px]">{tenant.email}</div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Plan & Subscription Cycle:
                </span>
                <div className="font-bold text-primary-700 text-xs">
                  {sub.plan} Plan ({sub.chairLimit} Operatory Chairs)
                </div>
                <div className="text-slate-600 text-[11px]">Billing: {sub.billingCycle}</div>
                <div className="text-slate-600 text-[11px]">Next Renewal: {sub.renewalDate}</div>
                <div className="text-slate-500 text-[10px]">Auto-Renew: {sub.autoRenew ? 'Enabled' : 'Manual'}</div>
              </div>
            </div>

            {/* Itemized Charge */}
            <table className="w-full text-left border-collapse border border-slate-200 text-xs">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 border-r border-slate-200">Description</th>
                  <th className="py-2.5 px-3 border-r border-slate-200 text-center w-20">Cycle</th>
                  <th className="py-2.5 px-3 text-right w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3 border-r border-slate-200">
                    <div className="font-bold text-slate-900">
                      Dentrix Cloud Dental ERP — {sub.plan} Tier
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Multi-tenant clinical EHR, {sub.chairLimit}-chair scheduling, digital odontogram, HIPAA compliance audit trail, and multi-currency billing.
                    </div>
                  </td>
                  <td className="py-3 px-3 border-r border-slate-200 text-center font-medium">
                    {sub.billingCycle}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">
                    {formatINR(sub.monthlyFee)}
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Total Summary */}
            <div className="flex justify-end pt-1">
              <div className="w-56 space-y-1.5 p-3 bg-surface-50 rounded-xl border border-slate-200 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold">{formatINR(sub.monthlyFee)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18% B2B):</span>
                  <span className="font-mono">₹0 (Inclusive)</span>
                </div>
                <div className="flex justify-between font-black text-sm text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Paid:</span>
                  <span className="font-mono">{formatINR(sub.monthlyFee)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-slate-200 text-[10px] text-slate-400 flex items-center justify-between">
              <div>Electronic Tax Invoice generated by Axiotronicx.Inc • Valid without signature</div>
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle2 size={12} />
                <span>Verified Transaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
