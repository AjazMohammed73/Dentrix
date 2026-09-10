import React, { useState } from 'react';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  DollarSign,
  UserCheck,
  Settings2,
  Building2,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  LogOut,
} from 'lucide-react';
import { Tooth3D } from './Tooth3D';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { todayISO } from '../../utils/format';

export type NavRoute =
  | 'dashboard'
  | 'appointments'
  | 'patients'
  | 'revenue'
  | 'staff'
  | 'services'
  | 'tenants';

interface SidebarProps {
  currentRoute: NavRoute;
  onNavigate: (route: NavRoute) => void;
  onSignOut?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentRoute, onNavigate, onSignOut }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { currentUser, currentTenant, logout } = useAuth();
  const { appointments, patients } = useData();

  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';
  const isDoctor = currentUser.role === 'DOCTOR_ADMIN';
  const canViewRevenue = currentUser.permissions.canViewRevenue || isSuperAdmin;
  const canManageStaff = currentUser.permissions.canManageStaff || isDoctor || isSuperAdmin;
  const canManageServices = currentUser.permissions.canManageServices || isDoctor || isSuperAdmin;

  const todayStr = todayISO();
  const todayAptCount = appointments.filter((a) => a.date === todayStr).length;

  const navItems = [
    {
      id: 'dashboard' as NavRoute,
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      visible: true,
    },
    {
      id: 'appointments' as NavRoute,
      label: 'Appointments',
      icon: CalendarDays,
      badge: todayAptCount > 0 ? `${todayAptCount} Today` : null,
      badgeColor: 'bg-primary-100 text-primary-800',
      visible: !isSuperAdmin,
    },
    {
      id: 'patients' as NavRoute,
      label: 'Patients',
      icon: Users,
      badge: `${patients.length}`,
      badgeColor: 'bg-surface-200 text-slate-700',
      visible: !isSuperAdmin,
    },
    {
      id: 'revenue' as NavRoute,
      label: 'Revenue & Billing',
      icon: DollarSign,
      badge: null,
      visible: canViewRevenue,
    },
    {
      id: 'staff' as NavRoute,
      label: 'Staff Management',
      icon: UserCheck,
      badge: null,
      visible: canManageStaff && !isSuperAdmin,
    },
    {
      id: 'services' as NavRoute,
      label: 'Services Catalog',
      icon: Settings2,
      badge: null,
      visible: canManageServices && !isSuperAdmin,
    },
    {
      id: 'tenants' as NavRoute,
      label: 'Tenant Directory',
      icon: Building2,
      badge: 'Super Admin',
      badgeColor: 'bg-amber-100 text-amber-800 font-semibold',
      visible: isSuperAdmin,
    },
  ];

  return (
    <aside
      className={`relative flex flex-col bg-white border-r border-border transition-all duration-300 z-30 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header & 3D Tooth Brand */}
      <div className="h-20 py-2.5 flex items-center px-4 border-b border-border/80 justify-between overflow-hidden">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Tooth3D size={50} onClick={() => onNavigate('dashboard')} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 flex items-center gap-1.5">
                Dentrix
                <span className="text-[10px] uppercase font-bold tracking-widest bg-primary-50 text-primary-700 px-1.5 py-0.5 rounded border border-primary-200">
                  v2.0
                </span>
              </span>
              <span className="text-xs text-slate-500 truncate max-w-[140px]">
                {isSuperAdmin
                  ? 'Cloud Network Console'
                  : currentTenant?.name || 'Clinic Administration'}
              </span>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-surface-100 rounded-lg transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Tenant Indicator Chip */}
      {!isCollapsed && (
        <div className="px-4 py-2.5 mx-3 my-2 rounded-xl bg-surface-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span
              className={`w-2 h-2 rounded-full ${
                isSuperAdmin
                  ? 'bg-amber-500 animate-pulse'
                  : 'bg-clinical-success'
              }`}
            />
            <div className="flex flex-col truncate">
              <span className="text-[11px] font-semibold text-slate-700 truncate">
                {isSuperAdmin ? 'Global Multi-Tenant Root' : currentTenant?.name}
              </span>
              <span className="text-[10px] text-slate-600">
                {isSuperAdmin ? 'System Health: 99.98%' : `Plan: ${currentTenant?.plan || 'Active'}`}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <nav className="flex-1 py-3 px-3 space-y-1.5 overflow-y-auto">
        {navItems
          .filter((item) => item.visible)
          .map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center rounded-xl transition-all duration-200 group text-sm font-medium ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-surface-100'
                } ${isCollapsed ? 'justify-center p-3' : 'px-3.5 py-2.5 space-x-3'}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon
                  size={20}
                  className={`flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-500 group-hover:text-primary-600'
                  }`}
                />
                {!isCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
      </nav>

      {/* Staff Scoped Access Notice */}
      {!isCollapsed && currentUser.role === 'STAFF' && (
        <div className="mx-3 mb-2 p-2.5 bg-amber-50/80 rounded-xl border border-amber-200 text-amber-800 text-xs flex items-start space-x-2">
          <ShieldAlert size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="leading-snug">
            <span className="font-semibold block">Scoped Staff Role</span>
            Revenue & financial metrics restricted by Clinic Administrator.
          </div>
        </div>
      )}

      {/* Footer Profile Pill */}
      <div className="p-3 border-t border-border bg-surface-50/60">
        <div
          className={`flex items-center ${
            isCollapsed ? 'justify-center' : 'space-x-3'
          }`}
        >
          <div className="w-10 h-10 rounded-full bg-primary-100 border border-primary-200 text-primary-800 flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
            {currentUser.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser.name}
                </p>
                <button
                  onClick={() => {
                    logout();
                    if (onSignOut) onSignOut();
                  }}
                  className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Sign Out"
                >
                  <LogOut size={13} />
                </button>
              </div>
              <p className="text-[11px] text-slate-500 truncate">
                {currentUser.title}
              </p>
              <div className="mt-0.5 inline-block text-[10px] font-semibold px-1.5 py-0.2 rounded bg-primary-50 text-primary-700 border border-primary-200">
                {currentUser.role.replace('_', ' ')}
              </div>
            </div>
          )}
        </div>

        {/* Tagline */}
        {!isCollapsed && (
          <div className="mt-2.5 pt-2 border-t border-slate-200/60 text-center">
            <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400 hover:text-primary-700 transition-colors cursor-default">
              ⚡ Powered by Axiotronicx.Inc
            </span>
          </div>
        )}
      </div>
    </aside>
  );
};
