import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ClinicTenant, User, UserPermissions } from '../types';
import { ApiError, api, getToken, setToken } from '../lib/api';

interface StaffInput {
  name: string;
  email: string;
  title: string;
  phone?: string;
  role: 'STAFF' | 'DOCTOR_ADMIN';
  permissions: UserPermissions;
  password: string;
  tenantId?: string; // honoured only for Super Admin; clinic users are forced to their own
}

interface TenantInput {
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  plan: ClinicTenant['plan'];
  doctorName: string;
  doctorEmail: string;
  doctorPassword: string;
}

interface AuthContextType {
  currentUser: User;
  currentTenant: ClinicTenant | null;
  allTenants: ClinicTenant[];
  allUsers: User[];
  isAuthenticated: boolean;
  loading: boolean;
  loginWithCredentials: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refresh: () => Promise<void>;
  updateUserPermissions: (userId: string, permissions: Partial<UserPermissions>) => Promise<void>;
  addTenant: (data: TenantInput) => Promise<void>;
  toggleTenantStatus: (tenantId: string) => Promise<void>;
  addStaffMember: (input: StaffInput) => Promise<void>;
  toggleStaffStatus: (userId: string) => Promise<void>;
  deleteStaffMember: (userId: string) => Promise<void>;
  updateUser: (userId: string, data: Partial<User>) => Promise<void>;
  deleteUserGlobal: (userId: string) => Promise<void>;
  assignDoctorAdmin: (tenantId: string, doctorUserId: string) => Promise<void>;
  updateTenantSubscription: (tenantId: string, subscription: ClinicTenant['subscription']) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const canListUsers = (u: User | null): boolean =>
  !!u && (u.role === 'SUPER_ADMIN' || u.role === 'DOCTOR_ADMIN' || u.permissions.canManageStaff);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [allTenants, setAllTenants] = useState<ClinicTenant[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTenants = useCallback(async () => {
    setAllTenants(await api<ClinicTenant[]>('/tenants'));
  }, []);

  const loadUsers = useCallback(async (u: User | null) => {
    setAllUsers(canListUsers(u) ? await api<User[]>('/users') : []);
  }, []);

  const hydrate = useCallback(
    async (u: User) => {
      setCurrentUser(u);
      await Promise.all([loadTenants(), loadUsers(u)]);
    },
    [loadTenants, loadUsers],
  );

  const clearSession = useCallback(() => {
    setToken(null);
    setCurrentUser(null);
    setAllUsers([]);
    setAllTenants([]);
  }, []);

  useEffect(() => {
    const onUnauthorized = () => clearSession();
    window.addEventListener('dentrix:unauthorized', onUnauthorized);
    return () => window.removeEventListener('dentrix:unauthorized', onUnauthorized);
  }, [clearSession]);

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        await hydrate(await api<User>('/auth/me'));
      } catch {
        setToken(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [hydrate]);

  const loginWithCredentials = async (email: string, password?: string) => {
    try {
      const res = await api<{ accessToken: string; user: User }>('/auth/login', {
        method: 'POST',
        body: { email, password: password ?? '' },
      });
      setToken(res.accessToken);
      await hydrate(res.user);
      return { success: true };
    } catch (e) {
      return {
        success: false,
        error: e instanceof ApiError ? e.message : 'Sign in failed. Please try again.',
      };
    }
  };

  const logout = () => clearSession();

  const refresh = useCallback(async () => {
    if (currentUser) await hydrate(await api<User>('/auth/me'));
  }, [currentUser, hydrate]);

  // --- users / tenants mutations (StaffView, SuperAdminView, admin modals) ---
  const guard = async (fn: () => Promise<void>): Promise<void> => {
    try {
      await fn();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : 'Request failed');
    }
  };

  const updateUserPermissions = (userId: string, permissions: Partial<UserPermissions>) =>
    guard(async () => {
      await api(`/users/${userId}`, { method: 'PATCH', body: { permissions } });
      await loadUsers(currentUser);
    });

  const updateUser = (userId: string, data: Partial<User>) =>
    guard(async () => {
      await api(`/users/${userId}`, { method: 'PATCH', body: data });
      await loadUsers(currentUser);
    });

  const toggleStaffStatus = (userId: string) =>
    guard(async () => {
      const u = allUsers.find((x) => x.id === userId);
      await api(`/users/${userId}`, {
        method: 'PATCH',
        body: { status: u?.status === 'active' ? 'inactive' : 'active' },
      });
      await loadUsers(currentUser);
    });

  const deleteStaffMember = (userId: string) =>
    guard(async () => {
      await api(`/users/${userId}`, { method: 'DELETE' });
      await loadUsers(currentUser);
    });

  const deleteUserGlobal = deleteStaffMember;

  const addStaffMember = (input: StaffInput) =>
    guard(async () => {
      await api('/users', { method: 'POST', body: input });
      await loadUsers(currentUser);
    });

  const addTenant = (data: TenantInput) =>
    guard(async () => {
      await api('/tenants', { method: 'POST', body: data });
      await loadTenants();
    });

  const toggleTenantStatus = (tenantId: string) =>
    guard(async () => {
      const t = allTenants.find((x) => x.id === tenantId);
      await api(`/tenants/${tenantId}`, {
        method: 'PATCH',
        body: { status: t?.status === 'active' ? 'suspended' : 'active' },
      });
      await loadTenants();
    });

  const updateTenantSubscription = (tenantId: string, subscription: ClinicTenant['subscription']) =>
    guard(async () => {
      await api(`/tenants/${tenantId}`, { method: 'PATCH', body: { subscription } });
      await loadTenants();
    });

  const assignDoctorAdmin = (tenantId: string, doctorUserId: string) =>
    guard(async () => {
      await api(`/tenants/${tenantId}/assign-doctor-admin`, {
        method: 'POST',
        body: { userId: doctorUserId },
      });
      await Promise.all([loadTenants(), loadUsers(currentUser)]);
    });

  const currentTenant = allTenants.find((t) => t.id === currentUser?.tenantId) ?? null;

  return (
    <AuthContext.Provider
      value={{
        // App.tsx only renders consumers of this context once `isAuthenticated`,
        // so `currentUser` is always a real User where it's read.
        currentUser: currentUser as User,
        currentTenant,
        allTenants,
        allUsers,
        isAuthenticated: currentUser !== null,
        loading,
        loginWithCredentials,
        logout,
        refresh,
        updateUserPermissions,
        addTenant,
        toggleTenantStatus,
        addStaffMember,
        toggleStaffStatus,
        deleteStaffMember,
        updateUser,
        deleteUserGlobal,
        assignDoctorAdmin,
        updateTenantSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};
