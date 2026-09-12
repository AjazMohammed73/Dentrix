import { Invoice } from '../types';
import { formatINR } from './format';

interface ClinicInfo {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}

// Builds a compact A5 tax-invoice PDF client-side — no server, no external API.
// jsPDF is dynamically imported so its (fairly large) code only loads when a PDF is
// actually requested, not on every page load.
export async function buildInvoicePdf(invoice: Invoice, clinic: ClinicInfo): Promise<Blob> {
  const { default: jsPDF } = await import('jspdf');
  const doc = new jsPDF({ unit: 'mm', format: 'a5' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 10;
  let y = 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(clinic.name || 'Apex Dental Clinic', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  y += 5;
  doc.text(clinic.address || '', margin, y);
  y += 4;
  doc.text(`Phone: ${clinic.phone || '—'}  |  Email: ${clinic.email || '—'}`, margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('TAX INVOICE', pageWidth - margin, 14, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Inv #: ${invoice.invoiceNumber}`, pageWidth - margin, 19, { align: 'right' });
  doc.text(`Date: ${invoice.date}`, pageWidth - margin, 23, { align: 'right' });
  doc.text(`Due: ${invoice.dueDate}`, pageWidth - margin, 27, { align: 'right' });

  y += 8;
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('Patient:', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.patientName, margin + 18, y);
  doc.setFont('helvetica', 'bold');
  doc.text('Status:', pageWidth - margin - 30, y);
  doc.setFont('helvetica', 'normal');
  doc.text(invoice.status.toUpperCase(), pageWidth - margin, y, { align: 'right' });

  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('Service / Procedure', margin, y);
  doc.text('Amount', pageWidth - margin, y, { align: 'right' });
  y += 2;
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(invoice.serviceName, pageWidth - margin * 2 - 25);
  doc.text(lines, margin, y);
  doc.text(formatINR(invoice.subtotal ?? invoice.amount), pageWidth - margin, y, { align: 'right' });
  y += lines.length * 4 + 4;
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  const row = (label: string, value: string, bold = false) => {
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.text(label, pageWidth - margin - 45, y);
    doc.text(value, pageWidth - margin, y, { align: 'right' });
    y += 5;
  };

  if (invoice.discountAmount) {
    row(
      `Discount (${invoice.discountType === 'percentage' ? `${invoice.discountValue}%` : 'Flat'}):`,
      `- ${formatINR(invoice.discountAmount)}`,
    );
  }
  if (invoice.taxAmount) {
    row('GST:', `+ ${formatINR(invoice.taxAmount)}`);
  }
  row('Total Payable:', formatINR(invoice.amount), true);
  row('Amount Paid:', `- ${formatINR(invoice.amountPaid)}`);
  row('Balance Due:', formatINR(invoice.balance), true);

  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7);
  doc.text('Computer generated tax invoice. Thank you for trusting us with your dental health.', margin, y);
  doc.text('Powered by Axiotronicx.Inc', pageWidth - margin, y, { align: 'right' });

  return doc.output('blob');
}

// Shares the PDF straight to the patient via the OS share sheet (WhatsApp/Files/etc.) when
// supported; otherwise just downloads it so it can be attached manually. No server involved.
export async function shareOrDownloadInvoicePdf(invoice: Invoice, clinic: ClinicInfo): Promise<void> {
  const blob = await buildInvoicePdf(invoice, clinic);
  const fileName = `Invoice-${invoice.invoiceNumber}.pdf`;
  const file = new File([blob], fileName, { type: 'application/pdf' });

  const nav = navigator as Navigator & { canShare?: (data?: ShareData) => boolean };
  if (nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({
        files: [file],
        title: `Invoice ${invoice.invoiceNumber}`,
        text: `Dental invoice for ${invoice.patientName} — ${formatINR(invoice.amount)}`,
      });
      return;
    } catch {
      // user cancelled the share sheet — fall through to download so they still get the file
    }
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
