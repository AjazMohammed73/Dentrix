import React, { useState } from 'react';
import { X, Building2, UserCheck, Database } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface OnboardTenantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Plan = 'Starter' | 'Professional' | 'Enterprise';

export const OnboardTenantModal: React.FC<OnboardTenantModalProps> = ({ isOpen, onClose }) => {
  const { addTenant } = useAuth();

  const [clinicName, setClinicName] = useState('');
  const [slug, setSlug] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<Plan>('Professional');
  const [doctorName, setDoctorName] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');

  if (!isOpen) return null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setClinicName(val);
    setSlug(
      val
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 30),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTenant({
      name: clinicName.trim(),
      slug: slug.trim() || 'clinic',
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim(),
      plan,
      doctorName: doctorName.trim(),
      doctorEmail: doctorEmail.trim(),
      doctorPassword,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface-50">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-amber-100 text-amber-800">
              <Building2 size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Provision New Dental Tenant</h2>
              <p className="text-xs text-slate-500">
                Allocate database schema partitioning &amp; establish Doctor Admin credentials.
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
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Clinic Organization Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinic Legal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cedar Valley Smiles"
                  value={clinicName}
                  onChange={handleNameChange}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tenant URI Subdomain Slug
                </label>
                <div className="flex items-center bg-surface-50 border border-border rounded-xl px-3 py-2 text-xs">
                  <input
                    type="text"
                    required
                    pattern="[a-z0-9-]+"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="bg-transparent text-primary-700 font-mono font-bold focus:outline-none w-full"
                  />
                  <span className="text-slate-400">.dentrix.io</span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinic Physical Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street, City, State, ZIP"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Main Clinic Phone
                </label>
                <input
                  type="tel"
                  required
                  placeholder="(512) 555-0100"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Clinic Email
                </label>
                <input
                  type="email"
                  placeholder="contact@clinic.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Billing &amp; Tier Plan
                </label>
                <select
                  value={plan}
                  onChange={(e) => setPlan(e.target.value as Plan)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                >
                  <option value="Starter">Starter (1-2 Chairs)</option>
                  <option value="Professional">Professional (3-6 Chairs)</option>
                  <option value="Enterprise">Enterprise (Multi-Location)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Doctor Owner Credentials */}
          <div className="pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <UserCheck size={14} className="text-primary-600" /> Tenant Owner (Doctor Admin)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Emily Chen, DDS"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Doctor Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="dr.chen@clinic.com"
                  value={doctorEmail}
                  onChange={(e) => setDoctorEmail(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Temporary Doctor Admin Password
                </label>
                <input
                  type="text"
                  required
                  minLength={12}
                  placeholder="min. 12 characters — share securely with the doctor"
                  value={doctorPassword}
                  onChange={(e) => setDoctorPassword(e.target.value)}
                  className="w-full bg-surface-50 border border-border rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:border-primary-600 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Partitioning Notice */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center space-x-2 text-xs text-amber-900">
            <Database size={16} className="text-amber-700 flex-shrink-0" />
            <span>
              Provisions an isolated tenant partition scoped by tenant_id across all clinical records.
            </span>
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
              className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-md shadow-amber-600/25"
            >
              Provision Tenant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
