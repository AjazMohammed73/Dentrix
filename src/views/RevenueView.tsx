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
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { InvoiceStatus } from '../types';

export const RevenueView: React.FC = () => {
  const { invoices, appointments, markInvoicePaid } = useData();
  const { currentUser, currentTenant } = useAuth();

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

  // Monthly breakdown mock data for chart
  const monthlyData = [
    { month: 'Apr', billed: 14200, collected: 13800 },
    { month: 'May', billed: 16500, collected: 15900 },
    { month: 'Jun', billed: 18900, collected: 17400 },
    { month: 'Jul', billed: 21300, collected: 20100 },
    { month: 'Aug', billed: 24800, collected: 23200 },
    { month: 'Sep (Current)', billed: 27400, collected: 25100 },
  ];

  const maxMonthVal = Math.max(...monthlyData.map((m) => m.billed));

  // Service breakdown
  const serviceCategories = [
    { category: 'Restorative (Crowns & Fillings)', amount: 12400, pct: 45, color: 'bg-primary-600' },
    { category: 'Endodontics (Root Canals)', amount: 6200, pct: 23, color: 'bg-indigo-600' },
    { category: 'Preventive & Hygiene Cleanings', amount: 4800, pct: 18, color: 'bg-emerald-600' },
    { category: 'Periodontics & Scaling', amount: 2400, pct: 9, color: 'bg-amber-600' },
    { category: 'Oral Surgery & Consultations', amount: 1600, pct: 5, color: 'bg-sky-600' },
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
    const headers = ['Invoice Number', 'Patient', 'Service', 'Amount', 'Amount Paid', 'Balance', 'Date', 'Status'];
    const rows = filteredInvoices.map((i) => [
      i.invoiceNumber,
      `"${i.patientName}"`,
      `"${i.serviceName}"`,
      i.amount,
      i.amountPaid,
      i.balance,
      i.date,
      i.status,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Dentrix_Revenue_${currentTenant?.slug || 'clinic'}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 bg-surface-50 hover:bg-surface-100 text-slate-700 border border-border px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm"
        >
          <Download size={16} />
          <span>Export Financials (CSV)</span>
        </button>
      </div>

      {/* Daily & Monthly Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Today's Production Billed"
          value={`$${totalBilledToday.toLocaleString()}`}
          subtitle={`${todaysAppointments.length} procedures today`}
          icon={Calendar}
          iconBgColor="bg-primary-50"
          iconColor="text-primary-600"
        />
        <StatCard
          title="Total Collections Received"
          value={`$${totalCollected.toLocaleString()}`}
          trend={{ value: '14.2%', isPositive: true }}
          icon={TrendingUp}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Pending Accounts Receivable"
          value={`$${totalPending.toLocaleString()}`}
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
                      title={`Billed: $${d.billed}`}
                    />
                    {/* Collected Bar */}
                    <div
                      className="w-5 bg-emerald-500 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                      style={{ height: `${collectedHeight}%` }}
                      title={`Collected: $${d.collected}`}
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
            <span className="font-bold text-slate-900">Current Month: $27,400</span>
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
                    <span className="text-slate-900 font-bold">${item.amount.toLocaleString()}</span>
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
                <th className="py-3 px-4 text-right">Settlement</th>
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
                  <td className="py-3.5 px-4 font-bold text-slate-900">${inv.amount}</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-semibold">${inv.amountPaid}</td>
                  <td className="py-3.5 px-4 font-bold text-rose-600">${inv.balance}</td>
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
                  <td className="py-3.5 px-4 text-right">
                    {inv.status !== 'Paid' ? (
                      <button
                        onClick={() => markInvoicePaid(inv.id, 'Credit Card')}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-sm transition-all"
                      >
                        Mark Paid
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-emerald-700 flex items-center justify-end gap-1">
                        <CheckCircle2 size={13} /> {inv.paymentMethod || 'Paid'}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
