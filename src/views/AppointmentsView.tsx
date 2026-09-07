import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Plus,
  Filter,
  Clock,
  User,
  Armchair,
  Stethoscope,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { OperatoryChair, AppointmentStatus, Appointment } from '../types';
import { formatINR } from '../utils/format';

interface AppointmentsViewProps {
  onBookAppointment: () => void;
  onSelectPatient: (patientId: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  onBookAppointment,
  onSelectPatient,
}) => {
  const { appointments, updateAppointmentStatus } = useData();

  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [selectedChair, setSelectedChair] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'day' | 'chairs' | 'list'>('chairs');

  const filteredAppointments = appointments.filter((a) => {
    const matchesDate = a.date === selectedDate;
    const matchesChair = selectedChair === 'All' || a.operatoryChair === selectedChair;
    return matchesDate && matchesChair;
  });

  const chairs: OperatoryChair[] = [
    'Chair 1 - Hygiene',
    'Chair 2 - Surgery',
    'Chair 3 - General',
  ];

  const timeSlots = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
  ];

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success" dot>Completed</Badge>;
      case 'In-Chair':
        return <Badge variant="danger" dot>In-Chair</Badge>;
      case 'Scheduled':
        return <Badge variant="info" dot>Scheduled</Badge>;
      case 'Cancelled':
        return <Badge variant="neutral">Cancelled</Badge>;
      case 'No-Show':
        return <Badge variant="warning">No-Show</Badge>;
    }
  };

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
            <CalendarIcon size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Appointment Scheduling Engine</h1>
            <p className="text-xs text-slate-500">
              Operatory chair assignment, doctor mapping, and patient flow.
            </p>
          </div>
        </div>

        {/* Date Navigator & Actions */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Date Picker Controls */}
          <div className="flex items-center bg-surface-50 border border-border rounded-2xl p-1">
            <button
              onClick={handlePrevDay}
              className="p-1.5 hover:bg-white rounded-xl text-slate-600 transition-colors"
              title="Previous Day"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={handleToday}
              className="px-3 py-1 text-xs font-bold text-primary-700 hover:bg-white rounded-xl transition-colors"
            >
              Today
            </button>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-xs font-semibold text-slate-800 px-2 border-none focus:outline-none cursor-pointer"
            />
            <button
              onClick={handleNextDay}
              className="p-1.5 hover:bg-white rounded-xl text-slate-600 transition-colors"
              title="Next Day"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-surface-100 p-1 rounded-2xl border border-border">
            <button
              onClick={() => setViewMode('chairs')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'chairs'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Chair Columns
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'day'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hourly Timeline
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              List View
            </button>
          </div>

          {/* Book Action */}
          <button
            onClick={onBookAppointment}
            className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all"
          >
            <Plus size={16} />
            <span>Book Appointment</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
          <Filter size={13} /> Filter Chair:
        </span>
        {['All', ...chairs].map((chairName) => (
          <button
            key={chairName}
            onClick={() => setSelectedChair(chairName)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
              selectedChair === chairName
                ? 'bg-primary-600 text-white shadow-sm'
                : 'bg-white border border-border text-slate-600 hover:bg-surface-100'
            }`}
          >
            {chairName}
          </button>
        ))}
      </div>

      {/* View 1: Operatory Chair Columns View */}
      {viewMode === 'chairs' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chairs
            .filter((c) => selectedChair === 'All' || selectedChair === c)
            .map((chair) => {
              const chairApts = appointments
                .filter((a) => a.date === selectedDate && a.operatoryChair === chair)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              return (
                <div
                  key={chair}
                  className="bg-white rounded-3xl border border-border p-5 shadow-elevation-1 flex flex-col min-h-[550px]"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-xl bg-primary-50 text-primary-600">
                        <Armchair size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{chair}</h3>
                        <span className="text-[11px] text-slate-500">
                          {chairApts.length} appointments scheduled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Appointments list */}
                  <div className="space-y-3.5 flex-1 overflow-y-auto pr-1">
                    {chairApts.length === 0 ? (
                      <div className="h-48 flex flex-col items-center justify-center text-center p-4 border border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                        <Armchair size={28} className="mb-2 text-slate-300" />
                        No appointments booked for this chair on {selectedDate}.
                      </div>
                    ) : (
                      chairApts.map((apt) => (
                        <div
                          key={apt.id}
                          className="bg-surface-50 hover:bg-primary-50/40 p-4 rounded-2xl border border-slate-200/80 transition-all space-y-2.5 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-mono text-xs font-extrabold text-primary-700 bg-white px-2.5 py-0.5 rounded-lg border border-primary-100 shadow-sm">
                              {apt.startTime} - {apt.endTime}
                            </span>
                            {getStatusBadge(apt.status)}
                          </div>

                          <div>
                            <button
                              onClick={() => onSelectPatient(apt.patientId)}
                              className="font-bold text-sm text-slate-900 hover:text-primary-700 text-left block transition-colors"
                            >
                              {apt.patientName}
                            </button>
                            <p className="text-xs text-slate-600 mt-0.5">
                              <span className="font-mono font-semibold text-slate-500">[{apt.procedureCode}]</span>{' '}
                              {apt.serviceName}
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                            <span className="truncate">Dr: {apt.doctorName}</span>
                            <span className="font-bold text-slate-800">{formatINR(apt.fee)}</span>
                          </div>

                          {/* Status changer buttons */}
                          <div className="flex items-center gap-1.5 pt-1">
                            {(['Scheduled', 'In-Chair', 'Completed'] as AppointmentStatus[]).map(
                              (st) => (
                                <button
                                  key={st}
                                  onClick={() => updateAppointmentStatus(apt.id, st)}
                                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition-all ${
                                    apt.status === st
                                      ? 'bg-slate-900 text-white border-slate-900'
                                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {st}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}

      {/* View 2: Hourly Timeline */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-3xl border border-border p-6 shadow-elevation-1 overflow-x-auto">
          <div className="min-w-[700px] divide-y divide-border">
            {timeSlots.map((time) => {
              const slots = appointments.filter(
                (a) => a.date === selectedDate && a.startTime.startsWith(time.split(':')[0])
              );
              return (
                <div key={time} className="py-3 flex items-start space-x-6">
                  <div className="w-16 flex-shrink-0 font-mono text-xs font-bold text-slate-500 pt-1">
                    {time}
                  </div>
                  <div className="flex-1 min-h-[44px] flex items-center flex-wrap gap-3">
                    {slots.length === 0 ? (
                      <span className="text-xs text-slate-300 italic">No appointments</span>
                    ) : (
                      slots.map((apt) => (
                        <div
                          key={apt.id}
                          className="bg-primary-50 border border-primary-200 px-3 py-2 rounded-xl text-xs flex items-center space-x-3 shadow-sm"
                        >
                          <span className="font-mono font-bold text-primary-800">
                            {apt.startTime}
                          </span>
                          <span
                            onClick={() => onSelectPatient(apt.patientId)}
                            className="font-bold text-slate-900 hover:underline cursor-pointer"
                          >
                            {apt.patientName}
                          </span>
                          <span className="text-slate-600 truncate max-w-[200px]">
                            {apt.serviceName}
                          </span>
                          <span className="text-slate-500 text-[11px] bg-white px-1.5 py-0.5 rounded border border-slate-200">
                            {apt.operatoryChair}
                          </span>
                          {getStatusBadge(apt.status)}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 3: List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-3xl border border-border p-6 shadow-elevation-1 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-y border-border">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Service / CDT</th>
                <th className="py-3 px-4">Operatory</th>
                <th className="py-3 px-4">Doctor</th>
                <th className="py-3 px-4">Fee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-surface-50/60">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {apt.startTime} - {apt.endTime}
                  </td>
                  <td
                    onClick={() => onSelectPatient(apt.patientId)}
                    className="py-3.5 px-4 font-bold text-primary-700 hover:underline cursor-pointer"
                  >
                    {apt.patientName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-700">
                    <span className="font-mono text-slate-500 mr-1">[{apt.procedureCode}]</span>
                    {apt.serviceName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600">{apt.operatoryChair}</td>
                  <td className="py-3.5 px-4 text-slate-600">{apt.doctorName}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{formatINR(apt.fee)}</td>
                  <td className="py-3.5 px-4">{getStatusBadge(apt.status)}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={apt.status}
                      onChange={(e) =>
                        updateAppointmentStatus(apt.id, e.target.value as AppointmentStatus)
                      }
                      className="bg-surface-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In-Chair">In-Chair</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="No-Show">No-Show</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
