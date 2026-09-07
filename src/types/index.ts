export type UserRole = 'SUPER_ADMIN' | 'DOCTOR_ADMIN' | 'STAFF';

export interface UserPermissions {
  canManageAppointments: boolean;
  canManagePatients: boolean;
  canWriteDoctorNotes: boolean;
  canViewRevenue: boolean;
  canManageServices: boolean;
  canManageStaff: boolean;
}

export interface ClinicTenant {
  id: string;
  name: string;
  slug: string;
  address: string;
  phone: string;
  email: string;
  status: 'active' | 'suspended';
  doctorAdminName: string;
  doctorAdminEmail: string;
  storageMb: number;
  plan: 'Starter' | 'Professional' | 'Enterprise';
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string | null; // null for Super Admin
  name: string;
  email: string;
  role: UserRole;
  title: string;
  phone?: string;
  avatar?: string;
  permissions: UserPermissions;
  status: 'active' | 'inactive';
  joinedAt: string;
}

export interface Patient {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  insurance: {
    provider: string;
    policyNumber: string;
    groupNumber: string;
  };
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalAlerts: string[];
  balance: number;
  lastVisit?: string;
  nextVisit?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
}

export interface ClinicalNote {
  id: string;
  tenantId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  toothNumber?: string;
  procedureName: string;
  diagnosis: string;
  notes: string;
  treatmentPlanSummary?: string;
  vitals?: {
    bloodPressure?: string;
    pulseRate?: string;
  };
  doctorSignature: string;
  signedAt: string;
}

export type ServiceCategory =
  | 'Preventive'
  | 'Restorative'
  | 'Endodontics'
  | 'Periodontics'
  | 'Oral Surgery'
  | 'Orthodontics';

export interface DentalService {
  id: string;
  tenantId: string;
  code: string; // e.g. D0120, D1110, D2391, D3330
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  basePrice: number;
  description: string;
  isActive: boolean;
}

export type AppointmentStatus =
  | 'Scheduled'
  | 'In-Chair'
  | 'Completed'
  | 'Cancelled'
  | 'No-Show';

export type OperatoryChair =
  | 'Chair 1 - Hygiene'
  | 'Chair 2 - Surgery'
  | 'Chair 3 - General';

export interface Appointment {
  id: string;
  tenantId: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  doctorId: string;
  doctorName: string;
  serviceId: string;
  serviceName: string;
  procedureCode: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  durationMinutes: number;
  operatoryChair: OperatoryChair;
  status: AppointmentStatus;
  notes?: string;
  fee: number;
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  serviceName: string;
  amount: number;
  amountPaid: number;
  balance: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod?: 'Credit Card' | 'Insurance' | 'Cash' | 'Debit Card';
}

export interface SystemHealth {
  databasePools: {
    active: number;
    idle: number;
    max: number;
  };
  storageUsedGb: number;
  storageTotalGb: number;
  uptimePercent: number;
  activeTenantsCount: number;
  totalAppointmentsToday: number;
}
