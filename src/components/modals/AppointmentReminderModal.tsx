import React, { useState } from 'react';
import {
  X,
  MessageSquare,
  Send,
  Copy,
  Check,
  Calendar,
  Clock,
  MapPin,
  Stethoscope,
  ExternalLink,
} from 'lucide-react';
import { Appointment } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface AppointmentReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
}

export const AppointmentReminderModal: React.FC<AppointmentReminderModalProps> = ({
  isOpen,
  onClose,
  appointment,
}) => {
  const { currentTenant } = useAuth();
  const [copied, setCopied] = useState(false);
  const [customNote, setCustomNote] = useState('');

  if (!isOpen || !appointment) return null;

  const clinicName = currentTenant?.name || 'Apex Dental Studio';
  const clinicAddress =
    currentTenant?.address || '742 Evergreen Terrace, Suite 300, Austin, TX';
  const clinicPhone = currentTenant?.phone || '(512) 555-0198';

  // Format phone number for WhatsApp: strip all non-numeric characters
  // If no country code, prepend '1' for US or '91' for India
  const rawPhone = appointment.patientPhone.replace(/\D/g, '');
  let waPhone = rawPhone;
  if (rawPhone.length === 10) {
    // If 10 digits, default to India (+91) if clinic is in India or USA (+1) otherwise
    waPhone = currentTenant?.address?.toLowerCase().includes('india') ? `91${rawPhone}` : `1${rawPhone}`;
  }

  // Pre-filled Reminder Message
  const reminderMessage = `Hello ${appointment.patientName},

This is a reminder from *${clinicName}* regarding your upcoming dental appointment:

📅 *Date:* ${appointment.date}
⏰ *Time:* ${appointment.startTime}
👨‍⚕️ *Doctor:* ${appointment.doctorName}
🦷 *Service:* ${appointment.serviceName}
📍 *Clinic Location:* ${clinicAddress}

${customNote ? `📝 *Note:* ${customNote}\n\n` : ''}Please reply *YES* to confirm or call us at ${clinicPhone} if you need to reschedule.

Thank you!
*${clinicName}*`;

  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(reminderMessage)}`;
  const smsUrl = `sms:${waPhone}?body=${encodeURIComponent(reminderMessage)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(reminderMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLaunchWhatsApp = () => {
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-border flex items-center justify-between bg-emerald-50">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-600 text-white rounded-2xl shadow-sm">
              <MessageSquare size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">WhatsApp & SMS Reminder</h2>
              <p className="text-xs text-slate-500">
                1-Click patient appointment confirmation message generator
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Patient Appointment Overview Strip */}
        <div className="px-6 py-3.5 bg-surface-50 border-b border-border flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-800">{appointment.patientName}</span>
            <span className="text-slate-500 ml-2 font-mono">{appointment.patientPhone}</span>
          </div>
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <Calendar size={13} className="text-primary-600" />
            <span>{appointment.date}</span>
            <span className="text-slate-400">•</span>
            <Clock size={13} className="text-primary-600" />
            <span>{appointment.startTime}</span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {/* Custom Message Note */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Add Custom Instructions / Notes (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Please arrive 10 mins early for vitals or fasting required..."
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Message Preview
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Text'}</span>
              </button>
            </div>
            <div className="p-4 bg-emerald-950 text-emerald-100 rounded-2xl font-mono text-[11px] leading-relaxed whitespace-pre-line border border-emerald-900 shadow-inner max-h-56 overflow-y-auto">
              {reminderMessage}
            </div>
          </div>

          {/* Destination Target Info */}
          <div className="p-3 bg-surface-50 rounded-xl border border-border flex items-center justify-between text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Target Recipient:
            </span>
            <span className="font-mono font-bold text-slate-800">
              +{waPhone} ({appointment.patientName})
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t border-border bg-surface-50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200/60 rounded-xl"
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            <a
              href={smsUrl}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300"
            >
              <span>Send via SMS</span>
            </a>
            <button
              onClick={handleLaunchWhatsApp}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
            >
              <Send size={14} />
              <span>Launch WhatsApp</span>
              <ExternalLink size={13} className="opacity-70" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
