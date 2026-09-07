import React, { useState } from 'react';
import {
  UserCheck,
  UserPlus,
  Check,
  X,
  Trash2,
  AlertTriangle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserPermissions } from '../types';
import { AccessDeniedView } from './AccessDeniedView';

interface StaffViewProps {
  onOpenAddStaff: () => void;
  onNavigateHome?: () => void;
}

export const StaffView: React.FC<StaffViewProps> = ({ onOpenAddStaff, onNavigateHome }) => {
  const {
    allUsers,
    currentTenant,
    currentUser,
    updateUserPermissions,
    toggleStaffStatus,
    deleteStaffMember,
  } = useAuth();

  const canManageStaff =
    currentUser.permissions.canManageStaff ||
    currentUser.role === 'DOCTOR_ADMIN' ||
    currentUser.role === 'SUPER_ADMIN';

  if (!canManageStaff) {
    return (
      <AccessDeniedView
        attemptedRoute="staff"
        requiredRoleOrPermission="Staff Administration Privilege (canManageStaff) or Doctor Admin"
        onNavigateHome={onNavigateHome || (() => {})}
      />
    );
  }

  const [staffToDelete, setStaffToDelete] = useState<{ id: string; name: string } | null>(null);

  // Filter staff belonging to current tenant
  const tenantStaff = allUsers.filter(
    (u) => u.tenantId === currentTenant?.id && u.role !== 'SUPER_ADMIN'
  );

  const permissionKeys: { key: keyof UserPermissions; label: string }[] = [
    { key: 'canManageAppointments', label: 'Appointments' },
    { key: 'canManagePatients', label: 'Patients' },
    { key: 'canWriteDoctorNotes', label: 'Doctor Notes' },
    { key: 'canViewRevenue', label: 'Revenue Reports' },
    { key: 'canManageServices', label: 'Services Catalog' },
    { key: 'canManageStaff', label: 'Staff Admin' },
  ];

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-border shadow-elevation-1">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-primary-50 text-primary-700 rounded-2xl">
            <UserCheck size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Clinic Staff Management</h1>
            <p className="text-xs text-slate-500">
              Manage providers, hygienists, front desk coordinators, and role scopes for {currentTenant?.name}.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenAddStaff}
          className="flex items-center space-x-1.5 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-2xl text-xs font-bold shadow-md shadow-primary-600/20 transition-all"
        >
          <UserPlus size={16} />
          <span>Invite Clinic Staff</span>
        </button>
      </div>

      {/* Staff Table with Granular Permission Toggles */}
      <div className="bg-white rounded-3xl border border-border shadow-elevation-1 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-slate-600 bg-surface-50 uppercase tracking-wider font-semibold border-b border-border">
              <tr>
                <th className="py-3.5 px-5">Staff Member</th>
                <th className="py-3.5 px-5">Role & Title</th>
                <th className="py-3.5 px-5">Contact Details</th>
                <th className="py-3.5 px-5 text-center" colSpan={6}>
                  Permissions Matrix (Click to Toggle)
                </th>
                <th className="py-3.5 px-5 text-right">Status</th>
              </tr>
              <tr className="border-t border-slate-200/70 text-[10px] text-slate-400 bg-surface-50/50">
                <th colSpan={3}></th>
                {permissionKeys.map((p) => (
                  <th key={p.key} className="py-1 px-2 text-center truncate max-w-[80px]">
                    {p.label}
                  </th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tenantStaff.map((staff) => {
                const isDoctor = staff.role === 'DOCTOR_ADMIN';
                return (
                  <tr key={staff.id} className="hover:bg-surface-50/60">
                    <td className="py-4 px-5">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs shadow-sm">
                          {staff.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .substring(0, 2)}
                        </div>
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">
                            {staff.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            Joined {staff.joinedAt}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <span className="font-semibold text-slate-800 block">{staff.title}</span>
                      <span
                        className={`inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isDoctor
                            ? 'bg-primary-100 text-primary-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {staff.role.replace('_', ' ')}
                      </span>
                    </td>

                    <td className="py-4 px-5 space-y-0.5">
                      <div className="text-slate-800 font-medium">{staff.email}</div>
                      <div className="text-slate-400 text-[11px]">{staff.phone || '—'}</div>
                    </td>

                    {/* Permissions Checkbox / Button Matrix */}
                    {permissionKeys.map((p) => {
                      const hasPerm = staff.permissions[p.key];
                      return (
                        <td key={p.key} className="py-4 px-2 text-center">
                          <button
                            disabled={isDoctor} // Doctor owner always keeps all privileges
                            onClick={() =>
                              updateUserPermissions(staff.id, {
                                [p.key]: !hasPerm,
                              })
                            }
                            className={`w-6 h-6 rounded-lg mx-auto inline-flex items-center justify-center transition-all ${
                              hasPerm
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-sm'
                                : 'bg-slate-100 text-slate-300 border border-slate-200 hover:border-slate-400'
                            } ${isDoctor ? 'cursor-not-allowed opacity-80' : 'cursor-pointer hover:scale-110'}`}
                            title={
                              isDoctor
                                ? 'Doctor Admin holds mandatory platform rights'
                                : `Toggle ${p.label}`
                            }
                          >
                            {hasPerm ? <Check size={14} strokeWidth={3} /> : <X size={12} />}
                          </button>
                        </td>
                      );
                    })}

                    <td className="py-4 px-5 text-right space-x-2">
                      <button
                        onClick={() => toggleStaffStatus(staff.id)}
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border transition-all ${
                          staff.status === 'active'
                            ? 'bg-white text-slate-700 border-slate-200 hover:bg-surface-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                      >
                        {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      {/* Delete Staff Button (Doctor Admin & Super Admin) */}
                      {!isDoctor && (
                        <button
                          onClick={() => setStaffToDelete({ id: staff.id, name: staff.name })}
                          className="text-[11px] font-bold p-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 hover:border-rose-300 transition-all inline-flex items-center"
                          title="Delete staff member"
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {staffToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-border p-6 space-y-4">
            <div className="flex items-center space-x-3 text-rose-600">
              <div className="p-2.5 bg-rose-50 rounded-2xl border border-rose-100">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Delete Clinic Staff</h3>
                <p className="text-xs text-slate-500">Permanent action</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to permanently delete <strong>{staffToDelete.name}</strong> from {currentTenant?.name}? Their access credentials and scheduling permissions will be revoked immediately.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setStaffToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteStaffMember(staffToDelete.id);
                  setStaffToDelete(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md shadow-rose-600/25"
              >
                Yes, Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
