import React, { useState, useEffect } from 'react';
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
  Trash2,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  Users,
  Check,
  Phone,
} from 'lucide-react';
import { Badge } from '../components/common/Badge';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { OperatoryChair, AppointmentStatus, Appointment } from '../types';
import { formatINR, todayISO, shiftISO } from '../utils/format';
import { ManageChairsModal } from '../components/modals/ManageChairsModal';
import { AppointmentReminderModal } from '../components/modals/AppointmentReminderModal';

interface AppointmentsViewProps {
  onBookAppointment: () => void;
  onSelectPatient: (patientId: string) => void;
}

export const AppointmentsView: React.FC<AppointmentsViewProps> = ({
  onBookAppointment,
  onSelectPatient,
}) => {
  const {
    appointments,
    updateAppointmentStatus,
    deleteAppointment,
    operatoryChairs,
    markPatientArrived,
    assignChairAndSeat,
  } = useData();
  const { currentTenant } = useAuth();

  const [selectedDate, setSelectedDate] = useState(todayISO);
  const [selectedChair, setSelectedChair] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'chairs' | 'day' | 'list' | 'queue'>('chairs');
  const [appointmentToDelete, setAppointmentToDelete] = useState<Appointment | null>(null);

  // Modals state
  const [isManageChairsOpen, setIsManageChairsOpen] = useState(false);
  const [reminderAppointment, setReminderAppointment] = useState<Appointment | null>(null);

  // Real-time ticker for elapsed waiting minutes (ticks every 30s)
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter active chairs from data context
  const activeChairs = operatoryChairs.filter((c) => c.isActive);
  const chairNames =
    activeChairs.length > 0
      ? activeChairs.map((c) => c.name)
      : ['Chair 1 - Hygiene', 'Chair 2 - Surgery', 'Chair 3 - General'];

  const filteredAppointments = appointments.filter((a) => {
    const matchesDate = a.date === selectedDate;
    const matchesChair = selectedChair === 'All' || a.operatoryChair === selectedChair;
    return matchesDate && matchesChair;
  });

  // Calculate Waiting Room queue count for selected date
  const waitingPatients = appointments.filter(
    (a) => a.date === selectedDate && a.status === 'Arrived'
  );
  const inChairPatients = appointments.filter(
    (a) => a.date === selectedDate && a.status === 'In-Chair'
  );

  const getElapsedMinutes = (arrivedAt?: string) => {
    if (!arrivedAt) return 0;
    const diffMs = now - new Date(arrivedAt).getTime();
    return Math.max(0, Math.floor(diffMs / 60000));
  };

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

  const handlePrevDay = () => setSelectedDate((d) => shiftISO(d, -1));
  const handleNextDay = () => setSelectedDate((d) => shiftISO(d, 1));

  const handleToday = () => {
    setSelectedDate(todayISO());
  };

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Completed':
        return <Badge variant="success" dot>Completed</Badge>;
      case 'In-Chair':
        return <Badge variant="danger" dot>In-Chair</Badge>;
      case 'Arrived':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 border border-amber-300 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            In Waiting Room
          </span>
        );
      case 'Scheduled':
        return <Badge variant="info" dot>Scheduled</Badge>;
      case 'Delayed':
        return (
          <Badge variant="warning" dot className="bg-amber-100 text-amber-900 border-amber-300">
            Delayed
          </Badge>
        );
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
              Operatory chair assignment, live reception queue, and patient reminders.
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
              onClick={() => setViewMode('queue')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === 'queue'
                  ? 'bg-white text-primary-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Waiting Room</span>
              {waitingPatients.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-extrabold bg-amber-500 text-white animate-pulse">
                  {waitingPatients.length}
                </span>
              )}
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

          {/* Manage Operatory Chairs */}
          <button
            onClick={() => setIsManageChairsOpen(true)}
            className="flex items-center space-x-1.5 bg-surface-100 hover:bg-surface-200 text-slate-700 px-3.5 py-2 rounded-2xl text-xs font-bold border border-border transition-all shadow-xs"
            title="Configure Operatory Suites & Scale Cap"
          >
            <Armchair size={14} className="text-primary-600" />
            <span>
              Operatories ({activeChairs.length}/{currentTenant?.subscription?.chairLimit || 6})
            </span>
          </button>

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

      {/* Filter Chips (when in Chairs or List view) */}
      {viewMode !== 'queue' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-1">
            <Filter size={13} /> Filter Chair:
          </span>
          {['All', ...chairNames].map((chairName) => (
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
      )}

      {/* VIEW 1: Operatory Chair Columns View */}
      {viewMode === 'chairs' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {chairNames
            .filter((c) => selectedChair === 'All' || selectedChair === c)
            .map((chair) => {
              const chairApts = appointments
                .filter((a) => a.date === selectedDate && a.operatoryChair === chair)
                .sort((a, b) => a.startTime.localeCompare(b.startTime));

              const isOccupied = chairApts.some((a) => a.status === 'In-Chair');

              return (
                <div
                  key={chair}
                  className={`bg-white rounded-3xl border p-5 shadow-elevation-1 flex flex-col min-h-[550px] transition-all ${
                    isOccupied ? 'border-primary-300 ring-1 ring-primary-100' : 'border-border'
                  }`}
                >
                  {/* Chair Header */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                    <div className="flex items-center space-x-2.5">
                      <div
                        className={`p-2 rounded-xl ${
                          isOccupied
                            ? 'bg-rose-100 text-rose-700'
                            : 'bg-primary-50 text-primary-600'
                        }`}
                      >
                        <Armchair size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{chair}</h3>
                        <span className="text-[11px] text-slate-500">
                          {chairApts.length} appointments scheduled
                        </span>
                      </div>
                    </div>
                    <div>
                      {isOccupied ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
                          IN-CHAIR
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          VACANT
                        </span>
                      )}
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
                          className={`p-4 rounded-2xl border transition-all space-y-2.5 shadow-sm ${
                            apt.status === 'In-Chair'
                              ? 'bg-rose-50/50 border-rose-200'
                              : apt.status === 'Arrived'
                              ? 'bg-amber-50/60 border-amber-200'
                              : 'bg-surface-50 hover:bg-primary-50/40 border-slate-200/80'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-mono text-xs font-extrabold text-primary-700 bg-white px-2.5 py-0.5 rounded-lg border border-primary-100 shadow-xs">
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
                            <div className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                              <Stethoscope size={13} className="text-slate-400" />
                              <span className="font-mono font-bold text-slate-500 mr-1">
                                [{apt.procedureCode}]
                              </span>
                              <span>{apt.serviceName}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                              <User size={13} />
                              <span>{apt.doctorName}</span>
                            </div>
                            <div className="font-bold text-slate-900">{formatINR(apt.fee)}</div>
                          </div>

                          {/* Quick Workflow Action Bar */}
                          <div className="pt-1.5 flex items-center justify-between border-t border-slate-200/40">
                            {/* WhatsApp reminder */}
                            <button
                              type="button"
                              onClick={() => setReminderAppointment(apt)}
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-lg transition-colors"
                              title="Send WhatsApp / SMS Confirmation"
                            >
                              <MessageSquare size={12} />
                              <span>WhatsApp</span>
                            </button>

                            {/* Check In / Seating quick buttons */}
                            {apt.status === 'Scheduled' && (
                              <button
                                type="button"
                                onClick={() => markPatientArrived(apt.id)}
                                className="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-lg transition-colors"
                              >
                                Mark Arrived
                              </button>
                            )}

                            {apt.status === 'Arrived' && (
                              <button
                                type="button"
                                onClick={() => assignChairAndSeat(apt.id, apt.operatoryChair)}
                                className="text-[11px] font-bold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-lg transition-colors"
                              >
                                Seat in Chair
                              </button>
                            )}

                            {apt.status === 'In-Chair' && (
                              <button
                                type="button"
                                onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-lg transition-colors"
                              >
                                Complete Procedure
                              </button>
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

      {/* VIEW 2: Patient Waiting Room Queue */}
      {viewMode === 'queue' && (
        <div className="space-y-6 animate-fade-in">
          {/* Waiting Room Metric Header */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-border shadow-elevation-1 flex items-center space-x-4">
              <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                <Users size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {waitingPatients.length}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Patients Currently in Reception
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-border shadow-elevation-1 flex items-center space-x-4">
              <div className="p-3 bg-rose-100 text-rose-700 rounded-2xl">
                <Armchair size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {inChairPatients.length}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Patients Currently In-Chair
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-border shadow-elevation-1 flex items-center space-x-4">
              <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                <CheckCircle size={24} />
              </div>
              <div>
                <div className="text-2xl font-extrabold text-slate-900">
                  {chairNames.length - inChairPatients.length} / {chairNames.length}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  Operatory Chairs Available Now
                </div>
              </div>
            </div>
          </div>

          {/* Overdue Warning Notification if any wait > 15m */}
          {waitingPatients.some((a) => getElapsedMinutes(a.arrivedAt) > 15) && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-3xl flex items-center gap-3 text-xs text-rose-900 font-medium">
              <AlertTriangle size={18} className="text-rose-600 flex-shrink-0 animate-bounce" />
              <div>
                <strong className="font-bold">Wait Time Alert:</strong> One or more patients have
                been waiting in the reception for over 15 minutes. Please assign an available
                operatory chair to minimize clinic wait times.
              </div>
            </div>
          )}

          {/* Waiting Room Queue Cards */}
          <div className="bg-white rounded-3xl border border-border p-6 shadow-elevation-1 space-y-4">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Live Reception & Arrival Queue ({selectedDate})
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time elapsed wait timers and 1-click operatory chair seating
                </p>
              </div>
            </div>

            {waitingPatients.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                <Users size={32} className="mx-auto mb-2 text-slate-300" />
                No patients currently waiting in reception for {selectedDate}.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {waitingPatients.map((apt) => {
                  const elapsed = getElapsedMinutes(apt.arrivedAt);
                  const isOverdue = elapsed > 15;

                  return (
                    <div
                      key={apt.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        isOverdue
                          ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200 shadow-sm'
                          : 'bg-amber-50/40 border-amber-200 shadow-xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <button
                            onClick={() => onSelectPatient(apt.patientId)}
                            className="font-bold text-base text-slate-900 hover:text-primary-700 text-left transition-colors"
                          >
                            {apt.patientName}
                          </button>
                          <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <Phone size={11} />
                            <span>{apt.patientPhone}</span>
                          </div>
                        </div>

                        {/* Live Elapsed Timer Badge */}
                        <div
                          className={`px-3 py-1 rounded-xl text-xs font-bold flex items-center gap-1.5 ${
                            isOverdue
                              ? 'bg-rose-600 text-white animate-pulse shadow-sm'
                              : 'bg-amber-200/90 text-amber-900'
                          }`}
                        >
                          <Clock size={13} />
                          <span>{elapsed}m waiting</span>
                          {isOverdue && <span className="text-[10px] font-black">(! &gt;15m)</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs bg-white/80 p-3 rounded-xl border border-slate-200/60">
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                            Procedure
                          </span>
                          <span className="font-bold text-slate-800 truncate block">
                            {apt.serviceName}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                            Assigned Doctor
                          </span>
                          <span className="font-bold text-slate-800 truncate block">
                            {apt.doctorName}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                            Scheduled Time
                          </span>
                          <span className="font-mono font-bold text-slate-700">
                            {apt.startTime} - {apt.endTime}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                            Planned Chair
                          </span>
                          <span className="font-semibold text-slate-700">{apt.operatoryChair}</span>
                        </div>
                      </div>

                      {/* 1-Click Chair Seating Bar */}
                      <div className="pt-2 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <button
                          type="button"
                          onClick={() => setReminderAppointment(apt)}
                          className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
                        >
                          <MessageSquare size={13} />
                          <span>Send WhatsApp</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          <label className="text-[11px] font-bold text-slate-600">Seat in:</label>
                          <select
                            defaultValue={apt.operatoryChair}
                            id={`chair-select-${apt.id}`}
                            className="bg-white border border-slate-300 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-primary-500"
                          >
                            {chairNames.map((c) => (
                              <option key={c} value={c}>
                                {c}
                              </option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              const sel = document.getElementById(
                                `chair-select-${apt.id}`
                              ) as HTMLSelectElement;
                              const chosenChair = sel ? sel.value : apt.operatoryChair;
                              assignChairAndSeat(apt.id, chosenChair);
                            }}
                            className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1"
                          >
                            <Armchair size={13} />
                            <span>Seat Patient</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Upcoming Scheduled Patients (Ready for Reception Check-In) */}
            <div className="pt-6 border-t border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Scheduled Appointments Ready for Check-In ({selectedDate})
              </h4>
              <div className="divide-y divide-border border border-border rounded-2xl overflow-hidden">
                {filteredAppointments
                  .filter((a) => a.status === 'Scheduled')
                  .map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3.5 bg-surface-50 hover:bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-primary-700 bg-white px-2 py-1 rounded-lg border border-slate-200">
                          {apt.startTime}
                        </span>
                        <div>
                          <button
                            onClick={() => onSelectPatient(apt.patientId)}
                            className="font-bold text-slate-900 hover:underline"
                          >
                            {apt.patientName}
                          </button>
                          <span className="text-slate-500 ml-2">
                            • {apt.serviceName} ({apt.operatoryChair})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReminderAppointment(apt)}
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg border border-slate-200"
                          title="WhatsApp Reminder"
                        >
                          <MessageSquare size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => markPatientArrived(apt.id)}
                          className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl shadow-xs transition-all"
                        >
                          Check In Patient
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: Hourly Timeline View */}
      {viewMode === 'day' && (
        <div className="bg-white rounded-3xl border border-border p-6 shadow-elevation-1 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="text-sm font-bold text-slate-900">
              Operatory Timeline Schedule ({selectedDate})
            </h3>
            <span className="text-xs text-slate-500">
              {filteredAppointments.length} Total Bookings
            </span>
          </div>

          <div className="divide-y divide-border">
            {timeSlots.map((slot) => {
              const slotApts = filteredAppointments.filter((a) => a.startTime.startsWith(slot));

              return (
                <div key={slot} className="py-3 flex items-start gap-4">
                  <span className="font-mono font-bold text-xs text-slate-500 w-16 pt-1">
                    {slot}
                  </span>
                  <div className="flex-1 space-y-2">
                    {slotApts.length === 0 ? (
                      <span className="text-xs text-slate-300 italic block py-1">Vacant Operatory</span>
                    ) : (
                      slotApts.map((apt) => (
                        <div
                          key={apt.id}
                          className="p-3 bg-surface-50 hover:bg-primary-50/40 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-mono font-bold text-primary-700">
                              {apt.startTime} - {apt.endTime}
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
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setReminderAppointment(apt)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                              title="WhatsApp Reminder"
                            >
                              <MessageSquare size={14} />
                            </button>
                            <span className="font-bold text-slate-900">{formatINR(apt.fee)}</span>
                          </div>
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

      {/* VIEW 4: List View */}
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
                <th className="py-3 px-4 text-right">Actions</th>
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
                      className="bg-surface-50 border border-slate-200 rounded-lg px-2 py-1 text-[11px] font-semibold text-slate-700 cursor-pointer"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Arrived">Arrived (Waiting)</option>
                      <option value="In-Chair">In-Chair</option>
                      <option value="Delayed">Delayed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="No-Show">No-Show</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => setReminderAppointment(apt)}
                        className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                        title="Send WhatsApp / SMS Reminder"
                      >
                        <MessageSquare size={15} />
                      </button>
                      <button
                        onClick={() => setAppointmentToDelete(apt)}
                        className="p-1.5 text-slate-400 hover:text-clinical-danger hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Appointment"
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
      )}

      {/* Delete Confirmation Modal */}
      {appointmentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-border space-y-4">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="p-2.5 bg-amber-50 rounded-2xl">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-base font-bold text-slate-900">Cancel Appointment?</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to remove the booking for{' '}
              <strong className="text-slate-900">{appointmentToDelete.patientName}</strong> on{' '}
              <strong className="text-slate-900">{appointmentToDelete.date}</strong> at{' '}
              <strong className="text-slate-900">{appointmentToDelete.startTime}</strong>?
            </p>
            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setAppointmentToDelete(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-surface-100 transition-colors"
              >
                Keep Appointment
              </button>
              <button
                onClick={() => {
                  deleteAppointment(appointmentToDelete.id);
                  setAppointmentToDelete(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-clinical-danger hover:bg-rose-700 text-white transition-colors"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Operatory Chairs Configuration Modal */}
      <ManageChairsModal
        isOpen={isManageChairsOpen}
        onClose={() => setIsManageChairsOpen(false)}
      />

      {/* WhatsApp & SMS Reminder Modal */}
      <AppointmentReminderModal
        isOpen={!!reminderAppointment}
        onClose={() => setReminderAppointment(null)}
        appointment={reminderAppointment}
      />
    </div>
  );
};
