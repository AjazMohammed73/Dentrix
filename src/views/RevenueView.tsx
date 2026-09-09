import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  CreditCard,
  Download,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileSpreadsheet,
  Plus,
  Printer,
  Share2,
  Trash2,
  X,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { InvoiceStatus, Invoice, PaymentInstallment } from '../types';
import { formatINR } from '../utils/format';
import { toCsv, downloadCsv } from '../utils/csv';
import { AccessDeniedView } from './AccessDeniedView';
import { CreateInvoiceModal } from '../components/modals/CreateInvoiceModal';
import { InvoicePrintModal } from '../components/modals/InvoicePrintModal';

interface RevenueViewProps {
  onNavigateHome?: () => void;
}

export const RevenueView: React.FC<RevenueViewProps> = ({ onNavigateHome }) => {
  const { invoices, appointments, markInvoicePaid, addInvoicePayment, deleteInvoice } = useData();
  const { currentUser, currentTenant } = useAuth();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoiceForPrint, setSelectedInvoiceForPrint] = useState<Invoice | null>(null);
  const [paymentModalInvoice, setPaymentModalInvoice] = useState<Invoice | null>(null);
  const [installmentAmount, setInstallmentAmount] = useState<number>(0);
  const [installmentMethod, setInstallmentMethod] = useState<PaymentInstallment['method']>('UPI / Bank');
  const [installmentNotes, setInstallmentNotes] = useState<string>('');

  const canViewRevenue =
    currentUser.permissions.canViewRevenue ||
    currentUser.role === 'DOCTOR_ADMIN' ||
    currentUser.role === 'SUPER_ADMIN';

  if (!canViewRevenue) {
    return (
      <AccessDeniedView
        attemptedRoute="revenue"
        requiredRoleOrPermission="Revenue Reports Permission (canViewRevenue) or Doctor Admin"
        onNavigateHome={onNavigateHome || (() => {})}
      />
    );
  }

  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Daily calculations
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysAppointments = appointments.filter((a) => a.date === todayStr);
  const totalBilledToday = todaysAppointments.reduce((sum, a) => sum + a.fee, 0);

  const todaysInvoices = invoices.filter((i) => i.date === todayStr);
  const collectedToday = todaysInvoices
    .filter((i) => i.status === 'Paid')
    .reduce((sum, i) => sum + i.amountPaid, 0);

  // Overall calculations
  const totalGrossBilled = invoices.reduce((sum, i) => sum + i.amount, 0);
  const totalCollected = invoices.reduce((sum, i) => sum + i.amountPaid, 0);
  const totalPending = invoices
    .filter((i) => i.status !== 'Paid')
    .reduce((sum, i) => sum + i.balance, 0);
  const collectionRate =
    totalGrossBilled > 0 ? Math.round((totalCollected / totalGrossBilled) * 100) : 100;

  // Monthly breakdown mock data for chart (in INR)
  const monthlyData = [
    { month: 'Apr', billed: 142000, collected: 138000 },
    { month: 'May', billed: 165000, collected: 159000 },
    { month: 'Jun', billed: 189000, collected: 174000 },
    { month: 'Jul', billed: 213000, collected: 201000 },
    { month: 'Aug', billed: 248000, collected: 232000 },
    { month: 'Sep (Current)', billed: 274000, collected: 251000 },
  ];

  const maxMonthVal = Math.max(...monthlyData.map((m) => m.billed));

  // Service breakdown (in INR)
  const serviceCategories = [
    { category: 'Restorative (Crowns & Fillings)', amount: 124000, pct: 45, color: 'bg-primary-600' },
    { category: 'Endodontics (Root Canals)', amount: 62000, pct: 23, color: 'bg-indigo-600' },
    { category: 'Preventive & Hygiene Cleanings', amount: 48000, pct: 18, color: 'bg-emerald-600' },
    { category: 'Periodontics & Scaling', amount: 24000, pct: 9, color: 'bg-amber-600' },
    { category: 'Oral Surgery & Consultations', amount: 16000, pct: 5, color: 'bg-sky-600' },
  ];

  const filteredInvoices = invoices.filter((i) => {
    const matchesStatus = statusFilter === 'All' || i.status === statusFilter;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      i.patientName.toLowerCase().includes(query) ||
      i.invoiceNumber.toLowerCase().includes(query) ||
      i.serviceName.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const csv = toCsv([
      ['Invoice Number', 'Patient', 'Service', 'Amount', 'Amount Paid', 'Balance', 'Date', 'Status'],
      ...filteredInvoices.map((i) => [
        i.invoiceNumber,
        i.patientName,
        i.serviceName,
        i.amount,
        i.amountPaid,
        i.balance,
        i.date,
        i.status,
      ]),
    ]);
    downloadCsv(`Dentrix_Revenue_${currentTenant?.slug || 'clinic'}.csv`, csv);
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
            <DollarSign size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Financials & Revenue Tracking</h1>
            <p className="text-xs text-slate-500">
              Clinic: <span className="font-semibold text-slate-800">{currentTenant?.name}</span> • Real-time collections and ledger
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-md shadow-primary-600/20"
          >
            <Plus size={16} />
            <span>Create Invoice</span>
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
          >
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Daily & Monthly Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Production Billed"
          value={formatINR(totalBilledToday)}
          subtitle={`${todaysAppointments.length} procedures today`}
          icon={Calendar}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          title="Total Collections Received"
          value={formatINR(totalCollected)}
          trend={{ value: '14.2%', isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending Accounts Receivable"
          value={formatINR(totalPending)}
          subtitle="Awaiting patient or insurance"
          icon={AlertCircle}
          iconBgColor="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Overall Collection Rate"
          value={`${collectionRate}%`}
          subtitle="Target threshold: >95%"
          icon={CreditCard}
          iconBgColor="bg-sky-50"
          iconColor="text-sky-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Month-over-Month Revenue Growth */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Month-over-Month Clinical Revenue
              </h3>
              <p className="text-xs text-slate-500">Gross Billed vs Collected Collections</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-primary-600" />
                <span className="font-semibold text-slate-700">Gross Billed</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-semibold text-slate-700">Collected</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Visualization */}
          <div className="flex items-end justify-between h-56 pt-6 pb-2 px-4 border-b border-border gap-4">
            {monthlyData.map((d) => {
              const billedHeight = Math.round((d.billed / maxMonthVal) * 100);
              const collectedHeight = Math.round((d.collected / maxMonthVal) * 100);
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    {/* Billed Bar */}
                    <div
                      className="w-5 bg-primary-600 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                      style={{ height: `${billedHeight}%` }}
                      title={`Billed: ${formatINR(d.billed)}`}
                    />
                    {/* Collected Bar */}
                    <div
                      className="w-5 bg-emerald-500 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                      style={{ height: `${collectedHeight}%` }}
                      title={`Collected: ${formatINR(d.collected)}`}
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 truncate max-w-[65px]">
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="pt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Average monthly growth: +9.6%</span>
            <span className="font-bold text-slate-900">Current Month: {formatINR(274000)}</span>
          </div>
        </div>

        {/* Service-Level Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 mb-1">
              Production by Specialty
            </h3>
            <p className="text-xs text-slate-500 mb-5">CDT procedure categorization breakdown</p>

            <div className="space-y-4">
              {serviceCategories.map((item) => (
                <div key={item.category} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-slate-700 truncate pr-2">{item.category}</span>
                    <span className="text-slate-900 font-bold">{formatINR(item.amount)}</span>
                  </div>
                  <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span>Leading Revenue Driver:</span>
            <span className="text-primary-700 font-bold">Crown & Restorative</span>
          </div>
        </div>
      </div>

      {/* Invoice Ledger Table */}
      <div className="bg-white rounded-3xl p-6 border border-border shadow-elevation-1 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-slate-900">Patient Billing & Invoice Ledger</h2>
            <p className="text-xs text-slate-500">Track paid, pending, and overdue clinical charges</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-surface-50 p-1 rounded-2xl border border-border">
            {['All', 'Paid', 'Pending', 'Overdue'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Procedure / Service</th>
                <th className="py-3 px-4">Billed Amount</th>
                <th className="py-3 px-4">Paid</th>
                <th className="py-3 px-4">Outstanding</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Settlement</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-surface-50/60">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">{inv.patientName}</td>
                  <td className="py-3.5 px-4 text-slate-600">{inv.serviceName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{formatINR(inv.amount)}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">{formatINR(inv.amountPaid)}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">{formatINR(inv.balance)}</td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono">{inv.date}</td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        inv.status === 'Paid'
                          ? 'success'
                          : inv.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      dot
                    >
                      {inv.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4">
                    {inv.status !== 'Paid' ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => {
                            setPaymentModalInvoice(inv);
                            setInstallmentAmount(inv.balance);
                            setInstallmentNotes('');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-primary-600 hover:bg-primary-700 text-white text-[11px] font-bold shadow-sm transition-all whitespace-nowrap"
                          title="Record Installment or Partial Payment"
                        >
                          Pay
                        </button>
                        <button
                          onClick={() => markInvoicePaid(inv.id, 'Credit Card')}
                          className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold transition-all whitespace-nowrap"
                          title="Clear Remaining Balance Fully"
                        >
                          Clear Full
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 size={13} /> {inv.paymentMethod || 'Paid'}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-1">
                      {/* Print Button */}
                      <button
                        onClick={() => setSelectedInvoiceForPrint(inv)}
                        className="p-1.5 text-slate-500 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
                        title="Print / View Invoice"
                      >
                        <Printer size={15} />
                      </button>
                      {/* WhatsApp Share Button */}
                      <button
                        onClick={() => {
                          const msg =
                            `*🦷 DENTAL INVOICE RECEIPT*\n` +
                            `*Clinic:* ${currentTenant?.name || 'Apex Dental'}\n` +
                            `*Invoice No:* ${inv.invoiceNumber}\n` +
                            `*Patient:* ${inv.patientName}\n` +
                            `*Service:* ${inv.serviceName}\n` +
                            `*Total:* ${formatINR(inv.amount)}\n` +
                            `*Paid:* ${formatINR(inv.amountPaid)}\n` +
                            `*Balance Due:* ${formatINR(inv.balance)}\n` +
                            `*Status:* ${inv.status.toUpperCase()}\n` +
                            `Thank you! • _Powered by Axiotronicx.Inc_`;
                          window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
                        }}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Share via WhatsApp"
                      >
                        <Share2 size={15} />
                      </button>
                      {/* Delete Invoice Button */}
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete invoice ${inv.invoiceNumber} for ${inv.patientName}?`)) {
                            deleteInvoice(inv.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Payment Installment Modal */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
                  <CreditCard size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Record Payment Installment</h3>
                  <p className="text-[11px] text-slate-500">Invoice #{paymentModalInvoice.invoiceNumber}</p>
                </div>
              </div>
              <button
                onClick={() => setPaymentModalInvoice(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (installmentAmount <= 0) return;
                addInvoicePayment(paymentModalInvoice.id, {
                  amount: Number(installmentAmount),
                  method: installmentMethod,
                  notes: installmentNotes,
                });
                setPaymentModalInvoice(null);
              }}
              className="p-6 space-y-4"
            >
              {/* Patient & Financial Summary Card */}
              <div className="p-3.5 bg-surface-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-900">{paymentModalInvoice.patientName}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span className="text-slate-500">Total Procedure Fee:</span>
                  <span className="font-bold text-slate-900">{formatINR(paymentModalInvoice.amount)}</span>
                </div>
                <div className="flex justify-between font-medium text-emerald-600">
                  <span>Total Already Paid:</span>
                  <span className="font-bold">{formatINR(paymentModalInvoice.amountPaid)}</span>
                </div>
                <div className="flex justify-between font-bold text-rose-600 pt-1.5 border-t border-slate-200">
                  <span>Outstanding Balance:</span>
                  <span>{formatINR(paymentModalInvoice.balance)}</span>
                </div>
              </div>

              {/* Installment Amount */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Installment Amount (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-xs">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    max={paymentModalInvoice.balance}
                    required
                    value={installmentAmount}
                    onChange={(e) => setInstallmentAmount(Number(e.target.value))}
                    className="w-full pl-8 pr-3.5 py-2 bg-surface-50 border border-border rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-primary-600 font-mono"
                  />
                </div>
                <div className="flex gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => setInstallmentAmount(paymentModalInvoice.balance)}
                    className="text-[10px] font-bold text-primary-700 hover:underline"
                  >
                    Pay Full (₹{paymentModalInvoice.balance.toLocaleString()})
                  </button>
                  {paymentModalInvoice.balance > 2000 && (
                    <button
                      type="button"
                      onClick={() => setInstallmentAmount(Math.round(paymentModalInvoice.balance / 2))}
                      className="text-[10px] font-bold text-slate-600 hover:underline"
                    >
                      Pay 50% (₹{Math.round(paymentModalInvoice.balance / 2).toLocaleString()})
                    </button>
                  )}
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Method
                </label>
                <select
                  value={installmentMethod}
                  onChange={(e) => setInstallmentMethod(e.target.value as PaymentInstallment['method'])}
                  className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="UPI / Bank">UPI / QR Code / Net Banking (GPay, PhonePe, NEFT)</option>
                  <option value="Credit Card">Credit Card (POS Terminal)</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash">Cash (Physical Counter)</option>
                  <option value="Insurance">Dental Insurance Settlement</option>
                </select>
              </div>

              {/* Transaction Reference / Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Transaction Reference / Notes (Optional)
                </label>
                <input
                  type="text"
                  value={installmentNotes}
                  onChange={(e) => setInstallmentNotes(e.target.value)}
                  placeholder="e.g. UPI Ref #90281203810, Cheque #00412"
                  className="w-full px-3.5 py-2 bg-surface-50 border border-border rounded-xl text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-border flex items-center justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentModalInvoice(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/20"
                >
                  Record Payment Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {/* Invoice Print & Preview Modal */}
      <InvoicePrintModal
        isOpen={!!selectedInvoiceForPrint}
        onClose={() => setSelectedInvoiceForPrint(null)}
        invoice={selectedInvoiceForPrint}
      />
    </div>
  );
};
