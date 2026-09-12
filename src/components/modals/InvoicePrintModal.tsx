import React from 'react';
import { X, Printer, Share2, FileText, FileDown } from 'lucide-react';
import { Invoice } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { formatINR } from '../../utils/format';
import { shareOrDownloadInvoicePdf } from '../../utils/invoicePdf';

interface InvoicePrintModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: Invoice | null;
}

export const InvoicePrintModal: React.FC<InvoicePrintModalProps> = ({
  isOpen,
  onClose,
  invoice,
}) => {
  const { currentTenant } = useAuth();

  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const clinicName = currentTenant?.name || 'Apex Dental Clinic';
    const message = 
      `*DENTAL INVOICE RECEIPT*\n` +
      `Clinic: ${clinicName}\n` +
      `Invoice No: ${invoice.invoiceNumber}\n` +
      `Date: ${invoice.date}\n` +
      `--------------------------------\n` +
      `Patient: ${invoice.patientName}\n` +
      `Service / Procedure: ${invoice.serviceName}\n` +
      `--------------------------------\n` +
      `Total Billed: ${formatINR(invoice.amount)}\n` +
      `Amount Paid: ${formatINR(invoice.amountPaid)}\n` +
      `Balance Due: ${formatINR(invoice.balance)}\n` +
      `Status: ${invoice.status.toUpperCase()}\n` +
      (invoice.paymentMethod ? `Payment Method: ${invoice.paymentMethod}\n` : '') +
      `--------------------------------\n` +
      `Thank you for trusting us with your dental health!\n` +
      `Powered by Axiotronicx.Inc`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://api.whatsapp.com/send?text=${encodedMessage}`, '_blank', 'noopener,noreferrer');
  };

  const handleSharePdf = () => {
    void shareOrDownloadInvoicePdf(invoice, currentTenant || {});
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Print-specific style overrides to strictly enforce half A4 / A5 and only black font */}
      <style>{`
        @media print {
          @page {
            size: A5 portrait;
            margin: 10mm;
          }
          body * {
            visibility: hidden;
          }
          #printable-invoice-container, #printable-invoice-container * {
            visibility: visible;
          }
          #printable-invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            max-width: 148mm !important;
            padding: 0 !important;
            margin: 0 !important;
            color: #000000 !important;
            background: #ffffff !important;
            font-family: Arial, Helvetica, sans-serif !important;
            font-size: 11px !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          .print-border-black {
            border-color: #000000 !important;
          }
          .print-text-black {
            color: #000000 !important;
          }
          .print-bg-white {
            background-color: #ffffff !important;
          }
        }
      `}</style>

      <div className="bg-white max-w-xl w-full rounded-2xl shadow-2xl border border-black/20 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50 no-print">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-black text-white rounded-lg">
              <FileText size={16} />
            </div>
            <div>
              <h2 className="text-xs font-bold text-black uppercase tracking-wider">
                Invoice #{invoice.invoiceNumber}
              </h2>
              <span className="text-[10px] text-slate-500">Half A4 (A5) Monochrome Print Format</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSharePdf}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-black text-black hover:bg-black hover:text-white text-xs font-bold transition-all"
              title="Share or save invoice as PDF"
            >
              <FileDown size={13} />
              <span>Share PDF</span>
            </button>
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-black text-black hover:bg-black hover:text-white text-xs font-bold transition-all"
              title="Share via WhatsApp"
            >
              <Share2 size={13} />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-4 py-1.5 rounded-lg bg-black hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-sm"
            >
              <Printer size={13} />
              <span>Print (Half A4)</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-500 hover:text-black hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Printable Document Body: Scaled exactly for Half A4 (148mm × 210mm) and ONLY Black Font / Lines */}
        <div className="overflow-y-auto flex-1 p-6 bg-slate-100 flex justify-center">
          <div
            id="printable-invoice-container"
            className="bg-white text-black w-full max-w-[148mm] min-h-[190mm] p-6 border border-black shadow-sm font-sans flex flex-col justify-between"
            style={{ color: '#000000' }}
          >
            <div className="space-y-4">
              {/* Clinic & Invoice Title Header */}
              <div className="flex items-start justify-between border-b-2 border-black pb-4">
                <div>
                  <h1 className="text-xl font-black uppercase tracking-tight text-black">
                    {currentTenant?.name || 'Apex Dental Clinic'}
                  </h1>
                  <p className="text-[11px] text-black font-medium mt-0.5">
                    {currentTenant?.address || '104 Medical Enclave, Suite 300'}
                  </p>
                  <p className="text-[11px] text-black">
                    Phone: {currentTenant?.phone || '+91 98765 43210'} | Email: {currentTenant?.email || 'billing@apexdental.com'}
                  </p>
                </div>

                <div className="text-right">
                  <div className="border border-black px-2 py-0.5 text-[11px] font-black uppercase tracking-widest inline-block text-black mb-1">
                    TAX INVOICE
                  </div>
                  <p className="text-[11px] font-bold text-black font-mono">
                    Inv #: {invoice.invoiceNumber}
                  </p>
                  <p className="text-[10px] text-black">Date: {invoice.date}</p>
                  <p className="text-[10px] text-black">Due Date: {invoice.dueDate}</p>
                </div>
              </div>

              {/* Patient & Billing Information Box */}
              <div className="border border-black p-3 text-[11px] grid grid-cols-2 gap-4">
                <div>
                  <span className="font-bold text-[10px] uppercase tracking-wider block text-black">
                    Patient Details:
                  </span>
                  <p className="font-bold text-xs text-black uppercase mt-0.5">{invoice.patientName}</p>
                  <p className="text-black text-[10px]">Patient ID: {invoice.patientId}</p>
                </div>

                <div className="text-right">
                  <span className="font-bold text-[10px] uppercase tracking-wider block text-black">
                    Payment Status:
                  </span>
                  <p className="font-black text-xs text-black uppercase mt-0.5">{invoice.status}</p>
                  {invoice.paymentMethod && (
                    <p className="text-black text-[10px]">Method: {invoice.paymentMethod}</p>
                  )}
                </div>
              </div>

              {/* Itemized Services Table */}
              <table className="w-full text-left text-[11px] border-collapse border border-black">
                <thead>
                  <tr className="border-b border-black bg-white text-black font-bold uppercase text-[10px]">
                    <th className="py-2 px-2.5 border-r border-black">Procedure / Service Description</th>
                    <th className="py-2 px-2 text-center border-r border-black w-12">Qty</th>
                    <th className="py-2 px-2.5 text-right border-r border-black w-24">Rate</th>
                    <th className="py-2 px-2.5 text-right w-24">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-black text-black">
                    <td className="py-2.5 px-2.5 border-r border-black font-medium">
                      <div className="font-bold uppercase text-[11px]">{invoice.serviceName}</div>
                      <span className="text-[10px]">Clinical Operative Procedure & Consultation</span>
                      {invoice.insuranceClaim && (
                        <div className="mt-1 inline-block border border-black px-1.5 py-0.5 text-[9px] font-mono font-bold">
                          Claim #{invoice.insuranceClaim.claimNumber} • {invoice.insuranceClaim.payerName} ({invoice.insuranceClaim.status.toUpperCase()})
                        </div>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-center border-r border-black font-mono">1</td>
                    <td className="py-2.5 px-2.5 text-right border-r border-black font-mono">{formatINR(invoice.subtotal || invoice.amount)}</td>
                    <td className="py-2.5 px-2.5 text-right font-mono font-bold">{formatINR(invoice.subtotal || invoice.amount)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Total Calculation Summary */}
              <div className="flex justify-end pt-1">
                <div className="w-64 border border-black text-[11px]">
                  <div className="flex justify-between px-2.5 py-1 border-b border-black text-black">
                    <span>Base Subtotal:</span>
                    <span className="font-mono font-bold">{formatINR(invoice.subtotal || invoice.amount)}</span>
                  </div>
                  {Boolean(invoice.discountAmount && invoice.discountAmount > 0) && (
                    <div className="flex justify-between px-2.5 py-1 border-b border-black text-black">
                      <span>Discount ({invoice.discountType === 'percentage' ? `${invoice.discountValue}%` : 'Flat'}):</span>
                      <span className="font-mono">(-) {formatINR(invoice.discountAmount || 0)}</span>
                    </div>
                  )}
                  {Boolean(invoice.taxAmount && invoice.taxAmount > 0) ? (
                    <>
                      <div className="flex justify-between px-2.5 py-0.5 border-b border-black text-black text-[10px]">
                        <span>CGST ({(invoice.taxRatePercent || 18) / 2}%):</span>
                        <span className="font-mono">+{formatINR(invoice.cgstAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between px-2.5 py-0.5 border-b border-black text-black text-[10px]">
                        <span>SGST ({(invoice.taxRatePercent || 18) / 2}%):</span>
                        <span className="font-mono">+{formatINR(invoice.sgstAmount || 0)}</span>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-between px-2.5 py-1 border-b border-black text-black">
                      <span>Healthcare GST:</span>
                      <span className="font-mono">₹0 (Exempt)</span>
                    </div>
                  )}
                  <div className="flex justify-between px-2.5 py-1.5 border-b border-black text-black font-black text-xs">
                    <span>Total Payable:</span>
                    <span className="font-mono">{formatINR(invoice.amount)}</span>
                  </div>
                  {Boolean(invoice.insuranceClaim && invoice.insuranceClaim.approvedAmount) && (
                    <div className="flex justify-between px-2.5 py-1 border-b border-black text-black">
                      <span>Insurance Approved:</span>
                      <span className="font-mono">(-) {formatINR(invoice.insuranceClaim?.approvedAmount || 0)}</span>
                    </div>
                  )}
                  <div className="flex justify-between px-2.5 py-1 border-b border-black text-black">
                    <span>Amount Paid:</span>
                    <span className="font-mono">(-) {formatINR(invoice.amountPaid)}</span>
                  </div>
                  <div className="flex justify-between px-2.5 py-1.5 text-black font-black text-xs bg-white">
                    <span>Balance Due:</span>
                    <span className="font-mono">{formatINR(invoice.balance)}</span>
                  </div>
                </div>
              </div>

              {/* Payment Installments & Receipts Breakdown */}
              {invoice.installments && invoice.installments.length > 0 && (
                <div className="pt-2">
                  <span className="font-bold text-[10px] uppercase tracking-wider block text-black mb-1">
                    Recorded Payment Receipts:
                  </span>
                  <table className="w-full text-left text-[10px] border-collapse border border-black">
                    <thead>
                      <tr className="border-b border-black text-black font-bold uppercase text-[9px]">
                        <th className="py-1 px-2 border-r border-black">Date</th>
                        <th className="py-1 px-2 border-r border-black">Method</th>
                        <th className="py-1 px-2 border-r border-black">Recorded By</th>
                        <th className="py-1 px-2 text-right">Amount Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoice.installments.map((inst) => (
                        <tr key={inst.id} className="border-b border-black">
                          <td className="py-1 px-2 border-r border-black font-mono">{inst.date}</td>
                          <td className="py-1 px-2 border-r border-black">{inst.method}</td>
                          <td className="py-1 px-2 border-r border-black">{inst.recordedBy}</td>
                          <td className="py-1 px-2 text-right font-mono font-bold">{formatINR(inst.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Terms & Footer Signature */}
            <div className="pt-6 border-t border-black space-y-4 text-[10px] text-black">
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-bold uppercase text-[10px]">Terms & Conditions:</p>
                  <p>1. Payment is due as per agreed clinical terms.</p>
                  <p>2. Computer generated tax invoice valid without physical seal.</p>
                </div>
                <div className="text-center w-40 border-t border-black pt-1">
                  <span className="block font-bold text-[10px] uppercase">Authorized Signatory</span>
                  <span className="block text-[9px]">{currentTenant?.name || 'Apex Dental'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-black pt-2 text-[9px]">
                <span>Dentrix Dental Practice OS • Electronic Clinical Ledger</span>
                <span className="font-bold">Powered by Axiotronicx.Inc</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
