import React, { useState } from 'react';
import { X, Calendar, Clock, User, Stethoscope, Armchair, DollarSign } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { OperatoryChair } from '../../types';
import { formatINR } from '../../utils/format';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate?: string;
  initialPatientId?: string;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  initialDate,
  initialPatientId,
}) => {
  const { patients, services, addAppointment } = useData();
  const { allUsers, currentTenant } = useAuth();

  const doctors = allUsers.filter(
    (u) =>
      (u.role === 'DOCTOR_ADMIN' || u.title.toLowerCase().includes('hygienist') || u.title.toLowerCase().includes('surgeon') || u.title.toLowerCase().includes('doctor')) &&
      (!u.tenantId || u.tenantId === currentTenant?.id)
  );

  const [patientId, setPatientId] = useState(initialPatientId || (patients[0]?.id || ''));
  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [date, setDate] = useState(initialDate || new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('10:00');
  const [operatoryChair, setOperatoryChair] = useState<OperatoryChair>('Chair 1 - Hygiene');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const selectedService = services.find((s) => s.id === serviceId) || services[0];
  const selectedPatient = patients.find((p) => p.id === patientId) || patients[0];
  const selectedDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !selectedService) return;

    // Calculate end time
    const [hours, mins] = startTime.split(':').map(Number);
    const endTotalMins = hours * 60 + mins + (selectedService?.durationMinutes || 45);
    const endHours = Math.floor(endTotalMins / 60);
    const endRemainingMins = endTotalMins % 60;
    const endTime = `${String(endHours).padStart(2, '0')}:${String(endRemainingMins).padStart(2, '0')}`;

    addAppointment({
      patientId: selectedPatient.id,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      patientPhone: selectedPatient.phone,
      doctorId: selectedDoctor ? selectedDoctor.id : 'doc_1',
      doctorName: selectedDoctor ? selectedDoctor.name : 'Dr. Sarah Vance, DDS',
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      procedureCode: selectedService.code,
      date,
      startTime,
      endTime,
      durationMinutes: selectedService.durationMinutes,
      operatoryChair,
      status: 'Scheduled',
      notes,
      fee: selectedService.basePrice,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-surface-50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Schedule New Appointment</h2>
            <p className="text-xs text-slate-500">
              Assign patient, procedure code, operatory chair, and provider.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-surface-200/60 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Patient Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User size={14} className="text-primary-600" /> Patient
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
              required
            >
              {patients.map((pat) => (
                <option key={pat.id} value={pat.id}>
                  {pat.firstName} {pat.lastName} — {pat.phone} ({pat.insurance.provider})
                </option>
              ))}
            </select>
          </div>

          {/* Procedure / Service Mapping */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Stethoscope size={14} className="text-primary-600" /> Dental Procedure (CDT Code)
            </label>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
              required
            >
              {services.map((srv) => (
                <option key={srv.id} value={srv.id}>
                  [{srv.code}] {srv.name} — {srv.durationMinutes}m (${srv.basePrice})
                </option>
              ))}
            </select>

            {/* Quick service details summary banner */}
            {selectedService && (
              <div className="mt-2 p-3 bg-primary-50/70 rounded-xl border border-primary-100 flex items-center justify-between text-xs text-primary-900">
                <span>
                  <strong>Category:</strong> {selectedService.category}
                </span>
                <span>
                  <strong>Standard Duration:</strong> {selectedService.durationMinutes} min
                </span>
                <span className="font-bold">
                  {formatINR(selectedService.basePrice)}
                </span>
              </div>
            )}
          </div>

          {/* Provider / Doctor Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Assigned Provider
            </label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
            >
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} ({doc.title})
                </option>
              ))}
            </select>
          </div>

          {/* Grid: Date, Time & Operatory Chair */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-500" /> Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Clock size={14} className="text-slate-500" /> Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Armchair size={14} className="text-slate-500" /> Operatory Chair
              </label>
              <select
                value={operatoryChair}
                onChange={(e) => setOperatoryChair(e.target.value as OperatoryChair)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              >
                <option value="Chair 1 - Hygiene">Chair 1 - Hygiene</option>
                <option value="Chair 2 - Surgery">Chair 2 - Surgery</option>
                <option value="Chair 3 - General">Chair 3 - General</option>
              </select>
            </div>
          </div>

          {/* Chief Complaint / Appointment Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Clinical Notes / Chief Complaint
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Sensitivity on upper left quadrant, routine cleaning..."
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600"
            />
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-surface-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25 transition-all"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
