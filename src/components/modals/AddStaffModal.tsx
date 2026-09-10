import React, { useState } from 'react';
import { X, UserPlus, Shield, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserPermissions } from '../../types';

type StaffRole = 'STAFF' | 'DOCTOR_ADMIN';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddStaffModal: React.FC<AddStaffModalProps> = ({ isOpen, onClose }) => {
  const { addStaffMember, currentTenant } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [title, setTitle] = useState('Front Desk Receptionist');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<StaffRole>('STAFF');
  const [permissions, setPermissions] = useState<UserPermissions>({
    canManageAppointments: true,
    canManagePatients: true,
    canWriteDoctorNotes: false,
    canViewRevenue: false, // Default false for staff
    canManageServices: false,
    canManageStaff: false,
  });

  if (!isOpen) return null;

  const togglePermission = (key: keyof UserPermissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleRoleChange = (newRole: StaffRole) => {
    setRole(newRole);
    if (newRole === 'DOCTOR_ADMIN') {
      setPermissions({
        canManageAppointments: true,
        canManagePatients: true,
        canWriteDoctorNotes: true,
        canViewRevenue: true,
        canManageServices: true,
        canManageStaff: true,
      });
      setTitle('Associate Dental Surgeon');
    } else {
      setPermissions({
        canManageAppointments: true,
        canManagePatients: true,
        canWriteDoctorNotes: false,
        canViewRevenue: false,
        canManageServices: false,
        canManageStaff: false,
      });
      setTitle('Front Desk Receptionist');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStaffMember({
      tenantId: currentTenant?.id,
      name: name.trim(),
      email: email.trim(),
      role,
      title: title.trim(),
      phone: phone.trim(),
      permissions,
      password,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-primary-100 text-primary-700">
              <UserPlus size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Invite Clinic Staff Member</h2>
              <p className="text-xs text-slate-500">
                Clinic: <span className="font-semibold text-slate-800">{currentTenant?.name}</span>
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jessica Miller"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Work Email</label>
              <input
                type="email"
                required
                placeholder="jessica@clinic.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinic Role</label>
              <select
                value={role}
                onChange={(e) => handleRoleChange(e.target.value as StaffRole)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              >
                <option value="STAFF">Staff (Scoped)</option>
                <option value="DOCTOR_ADMIN">Doctor Admin (Full Rights)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Dental Assistant"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="(512) 555-0144"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Temporary Password</label>
              <input
                type="text"
                required
                minLength={12}
                placeholder="min. 12 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-mono"
              />
            </div>
          </div>

          {/* Granular Permission Toggles */}
          <div className="pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Shield size={14} className="text-primary-600" /> Permission Scope
            </label>
            <div className="space-y-2 bg-surface-50 p-3.5 rounded-2xl border border-border">
              {(
                [
                  { key: 'canManageAppointments', label: 'Manage Appointments (Book, Edit, Cancel)' },
                  { key: 'canManagePatients', label: 'Access & Edit Patient Demographics' },
                  { key: 'canWriteDoctorNotes', label: 'Sign & Append Clinical Doctor Notes' },
                  { key: 'canViewRevenue', label: 'View Financial & Revenue Reports' },
                  { key: 'canManageServices', label: 'Configure Dental Services & Pricing' },
                  { key: 'canManageStaff', label: 'Invite & Manage Other Staff Members' },
                ] as const
              ).map(({ key, label }) => {
                const isChecked = permissions[key];
                return (
                  <label
                    key={key}
                    className="flex items-center justify-between text-xs text-slate-700 cursor-pointer select-none py-1 hover:text-slate-900"
                  >
                    <span>{label}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePermission(key)}
                      className="w-4 h-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500 cursor-pointer"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-border flex items-center justify-end space-x-3">
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
              Send Staff Invite
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
