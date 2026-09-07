import React, { useState } from 'react';
import { X, UserPlus, HeartPulse, Shield } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({ isOpen, onClose }) => {
  const { addPatient } = useData();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '1990-01-01',
    gender: 'Female' as 'Male' | 'Female' | 'Other',
    address: '',
    insuranceProvider: 'Delta Dental Premier',
    policyNumber: '',
    groupNumber: '',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: 'Spouse',
    selectedAlerts: [] as string[],
    balance: 0,
  });

  const commonAlerts = [
    'Penicillin Allergy',
    'Latex Sensitivity',
    'Hypertension',
    'Diabetes Type II',
    'Pre-Medication Required (Amoxicillin)',
    'Anticoagulant Therapy (Warfarin)',
    'Asthma',
    'Pregnancy (2nd Trimester)',
  ];

  if (!isOpen) return null;

  const toggleAlert = (alert: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAlerts: prev.selectedAlerts.includes(alert)
        ? prev.selectedAlerts.filter((a) => a !== alert)
        : [...prev.selectedAlerts, alert],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPatient({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      address: formData.address,
      insurance: {
        provider: formData.insuranceProvider,
        policyNumber: formData.policyNumber || `POL-${Math.floor(100000 + Math.random() * 900000)}`,
        groupNumber: formData.groupNumber || 'GRP-101',
      },
      emergencyContact: {
        name: formData.emergencyName,
        phone: formData.emergencyPhone,
        relationship: formData.emergencyRelationship,
      },
      medicalAlerts: formData.selectedAlerts,
      balance: formData.balance,
      status: 'Active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">New Patient Registration</h2>
              <p className="text-xs text-slate-500">
                Register clinical demographics, insurance coverage, and medical alerts.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Demographics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-3 flex items-center gap-1.5">
              General Demographics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">First Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Last Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vance"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="(512) 555-0100"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="patient@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  placeholder="Street address, city, state, zip"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-3 flex items-center gap-1.5">
              <Shield size={14} /> Insurance Provider Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Insurance Carrier</label>
                <input
                  type="text"
                  placeholder="e.g. Delta Dental / Cigna"
                  value={formData.insuranceProvider}
                  onChange={(e) => setFormData({ ...formData, insuranceProvider: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Policy / Member ID</label>
                <input
                  type="text"
                  placeholder="POL-99210"
                  value={formData.policyNumber}
                  onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Group Number</label>
                <input
                  type="text"
                  placeholder="GRP-402"
                  value={formData.groupNumber}
                  onChange={(e) => setFormData({ ...formData, groupNumber: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Medical Alerts */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-2 flex items-center gap-1.5">
              <HeartPulse size={14} /> Critical Medical Alerts & Allergies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {commonAlerts.map((alert) => {
                const isSelected = formData.selectedAlerts.includes(alert);
                return (
                  <button
                    type="button"
                    key={alert}
                    onClick={() => toggleAlert(alert)}
                    className={`text-left p-2 rounded-xl text-[11px] font-semibold border transition-all ${
                      isSelected
                        ? 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                        : 'bg-surface-50 border-border text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '} {alert}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              Emergency Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  placeholder="Full name"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  placeholder="(512) 555-0199"
                  value={formData.emergencyPhone}
                  onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Relationship</label>
                <input
                  type="text"
                  placeholder="Spouse / Parent"
                  value={formData.emergencyRelationship}
                  onChange={(e) => setFormData({ ...formData, emergencyRelationship: e.target.value })}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-border flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25"
            >
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
