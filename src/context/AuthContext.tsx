import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, ClinicTenant, UserRole, UserPermissions } from '../types';
import { initialTenants, initialUsers } from '../data/mockData';
import { verifyPassword } from '../utils/crypto';

interface AuthContextType {
  currentUser: User;
  currentTenant: ClinicTenant | null;
  allTenants: ClinicTenant[];
  allUsers: User[];
  isAuthenticated: boolean;
  loginWithEmail: (email: string) => { success: boolean; error?: string };
  loginWithCredentials: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchRole: (role: UserRole, tenantId?: string) => void;
  switchTenant: (tenantId: string) => void;
  updateUserPermissions: (userId: string, permissions: Partial<UserPermissions>) => void;
  addTenant: (tenant: ClinicTenant, doctorUser: User) => void;
  toggleTenantStatus: (tenantId: string) => void;
  addStaffMember: (user: Omit<User, 'id' | 'joinedAt'>) => void;
  toggleStaffStatus: (userId: string) => void;
  deleteStaffMember: (userId: string) => void;
  updateUser: (userId: string, data: Partial<User>) => void;
  deleteUserGlobal: (userId: string) => void;
  assignDoctorAdmin: (tenantId: string, doctorUserId: string) => void;
  updateTenantSubscription: (tenantId: string, subscription: ClinicTenant['subscription']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [allTenants, setAllTenants] = useState<ClinicTenant[]>(() => {
    const saved = localStorage.getItem('dentrix_tenants');
    return saved ? JSON.parse(saved) : initialTenants;
  });

  const [allUsers, setAllUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('dentrix_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const authState = localStorage.getItem('dentrix_is_authenticated');
    return authState !== null ? JSON.parse(authState) : true;
  });

  // Default to Doctor Admin of Apex Dental
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const savedUser = localStorage.getItem('dentrix_active_user');
    if (savedUser) {
      return JSON.parse(savedUser);
    }
    return initialUsers.find((u) => u.id === 'user_apex_doctor') || initialUsers[1];
  });

  useEffect(() => {
    localStorage.setItem('dentrix_tenants', JSON.stringify(allTenants));
  }, [allTenants]);

  useEffect(() => {
    localStorage.setItem('dentrix_users', JSON.stringify(allUsers));
  }, [allUsers]);

  useEffect(() => {
    localStorage.setItem('dentrix_active_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dentrix_is_authenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  const currentTenant = allTenants.find((t) => t.id === currentUser.tenantId) || null;

  const loginWithCredentials = async (email: string, password?: string): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return {
        success: false,
        error: `No account found associated with "${email}". Please verify the email address or select a demo account.`,
      };
    }

    if (foundUser.status === 'suspended') {
      return {
        success: false,
        error: `Account for ${foundUser.name} is currently suspended. Please contact your Clinic Administrator.`,
      };
    }

    // Verify Password if provided
    if (password !== undefined && password.trim().length > 0) {
      const isValid = await verifyPassword(password, foundUser.passwordHash, foundUser.salt);
      if (!isValid) {
        return {
          success: false,
          error: `Incorrect password for ${foundUser.name}. For demo testing, default password is "Password123!".`,
        };
      }
    }

    setCurrentUser(foundUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const loginWithEmail = (email: string): { success: boolean; error?: string } => {
    const cleanEmail = email.trim().toLowerCase();
    const foundUser = allUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      return {
        success: false,
        error: `No account found associated with "${email}". Please verify the email address or use one of the demo credentials below.`,
      };
    }

    if (foundUser.status === 'suspended') {
      return {
        success: false,
        error: `Account for ${foundUser.name} is currently suspended. Please contact a Clinic Administrator or Super Admin.`,
      };
    }

    setCurrentUser(foundUser);
    setIsAuthenticated(true);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const switchRole = (role: UserRole, targetTenantId?: string) => {
    const targetTenant = targetTenantId || currentUser.tenantId || 'tenant_apex';
    if (role === 'SUPER_ADMIN') {
      const superUser = allUsers.find((u) => u.role === 'SUPER_ADMIN') || initialUsers[0];
      setCurrentUser(superUser);
    } else if (role === 'DOCTOR_ADMIN') {
      const doc =
        allUsers.find((u) => u.role === 'DOCTOR_ADMIN' && u.tenantId === targetTenant) ||
        allUsers.find((u) => u.role === 'DOCTOR_ADMIN') ||
        initialUsers[1];
      setCurrentUser(doc);
    } else {
      // Staff
      const staff =
        allUsers.find((u) => u.role === 'STAFF' && u.tenantId === targetTenant) ||
        allUsers.find((u) => u.role === 'STAFF') ||
        initialUsers[2];
      setCurrentUser(staff);
    }
  };

  const switchTenant = (tenantId: string) => {
    if (currentUser.role === 'SUPER_ADMIN') {
      return; // Super Admin operates globally
    }
    const userInTenant = allUsers.find((u) => u.tenantId === tenantId && u.role === currentUser.role);
    if (userInTenant) {
      setCurrentUser(userInTenant);
    } else {
      // Find any user in that tenant
      const anyUser = allUsers.find((u) => u.tenantId === tenantId);
      if (anyUser) {
        setCurrentUser(anyUser);
      }
    }
  };

  const updateUserPermissions = (userId: string, updatedPermissions: Partial<UserPermissions>) => {
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              permissions: { ...u.permissions, ...updatedPermissions },
            }
          : u
      )
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, ...updatedPermissions },
      }));
    }
  };

  const addTenant = (newTenant: ClinicTenant, doctorUser: User) => {
    setAllTenants((prev) => [newTenant, ...prev]);
    setAllUsers((prev) => [...prev, doctorUser]);
  };

  const toggleTenantStatus = (tenantId: string) => {
    setAllTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? { ...t, status: t.status === 'active' ? 'suspended' : 'active' }
          : t
      )
    );
  };

  const addStaffMember = (userData: Omit<User, 'id' | 'joinedAt'>) => {
    const newUser: User = {
      ...userData,
      id: `user_staff_${Date.now()}`,
      joinedAt: new Date().toISOString().split('T')[0],
    };
    setAllUsers((prev) => [...prev, newUser]);
  };

  const toggleStaffStatus = (userId: string) => {
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' }
          : u
      )
    );
  };

  const deleteStaffMember = (userId: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const updateUser = (userId: string, data: Partial<User>) => {
    setAllUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...data } : u))
    );
    if (currentUser.id === userId) {
      setCurrentUser((prev) => ({ ...prev, ...data }));
    }
  };

  const deleteUserGlobal = (userId: string) => {
    setAllUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const assignDoctorAdmin = (tenantId: string, doctorUserId: string) => {
    const targetUser = allUsers.find((u) => u.id === doctorUserId);
    if (!targetUser) return;

    // Update clinic tenant record
    setAllTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? {
              ...t,
              doctorAdminName: targetUser.name,
              doctorAdminEmail: targetUser.email,
            }
          : t
      )
    );

    // Promote user to DOCTOR_ADMIN with full permissions for that clinic
    setAllUsers((prev) =>
      prev.map((u) =>
        u.id === doctorUserId
          ? {
              ...u,
              tenantId,
              role: 'DOCTOR_ADMIN',
              title: u.title.includes('Doctor') || u.title.includes('DDS') || u.title.includes('DMD') ? u.title : `${u.title} (Doctor Admin)`,
              permissions: {
                canManageAppointments: true,
                canManagePatients: true,
                canWriteDoctorNotes: true,
                canViewRevenue: true,
                canManageServices: true,
                canManageStaff: true,
              },
            }
          : u
      )
    );
  };

  const updateTenantSubscription = (
    tenantId: string,
    subscription: ClinicTenant['subscription']
  ) => {
    setAllTenants((prev) =>
      prev.map((t) =>
        t.id === tenantId
          ? {
              ...t,
              plan: subscription.plan,
              subscription,
            }
          : t
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentTenant,
        allTenants,
        allUsers,
        isAuthenticated,
        loginWithEmail,
        loginWithCredentials,
        logout,
        switchRole,
        switchTenant,
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
