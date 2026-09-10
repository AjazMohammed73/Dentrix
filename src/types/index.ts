export type UserRole = 'SUPER_ADMIN' | 'DOCTOR_ADMIN' | 'STAFF';

export interface UserPermissions {
  canManageAppointments: boolean;
  canManagePatients: boolean;
  canWriteDoctorNotes: boolean;
  canViewRevenue: boolean;
  canManageServices: boolean;
  canManageStaff: boolean;
}

export interface TenantSubscription {
  plan: 'Starter' | 'Professional' | 'Enterprise';
  status: 'Active' | 'Trial' | 'Past Due' | 'Cancelled';
  billingCycle: 'Monthly' | 'Annual';
  monthlyFee: number;
  chairLimit: number;
  renewalDate: string;
  autoRenew: boolean;
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
  subscription: TenantSubscription;
  createdAt: string;
}

export type ToothCondition =
  | 'Healthy'
  | 'Restored'
  | 'Caries'
  | 'Crown'
  | 'Missing'
  | 'Endodontic';

export interface ToothRecord {
  toothNumber: number;
  condition: ToothCondition;
  surface?: string;
  notes?: string;
  dateUpdated?: string;
}

export interface User {
  id: string;
  tenantId: string | null; // null for Super Admin
  name: string;
  email: string;
  role: UserRole;
  title: string;
  passwordHash?: string;
  salt?: string;
  phone?: string;
  avatar?: string;
  permissions: UserPermissions;
  status: 'active' | 'inactive' | 'suspended';
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

export type ToothSurface = 'M' | 'O' | 'D' | 'F' | 'L' | 'B' | 'I';

export interface ClinicalNote {
  id: string;
  tenantId: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  toothNumber?: string;
  toothNumbers?: number[]; // Multi-tooth support
  toothSurfaces?: ToothSurface[]; // Mesial, Occlusal, Distal, Facial/Buccal, Lingual, Incisal
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

export type OperatoryChairType =
  | 'General'
  | 'Hygiene'
  | 'Surgery'
  | 'Orthodontics'
  | 'Pediatric'
  | 'Implant';

export interface OperatoryChairConfig {
  id: string;
  tenantId: string;
  name: string;
  roomNumber?: string;
  chairType: OperatoryChairType;
  isActive: boolean;
  color?: string;
}

export type AppointmentStatus =
  | 'Scheduled'
  | 'Arrived'
  | 'In-Chair'
  | 'Delayed'
  | 'Completed'
  | 'Cancelled'
  | 'No-Show';

export type OperatoryChair = string;

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
  arrivedAt?: string; // ISO timestamp when patient arrived at reception
  inChairAt?: string; // ISO timestamp when seated in chair
  completedAt?: string; // ISO timestamp when appointment completed
}

export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue';

export interface PaymentInstallment {
  id: string;
  receiptNumber?: string;
  date: string;
  amount: number;
  method: 'Credit Card' | 'Insurance' | 'Cash' | 'Debit Card' | 'UPI / Bank';
  collectedBy?: string;
  recordedBy?: string;
  notes?: string;
}

export type InsuranceClaimStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Settled'
  | 'Rejected';

export interface InsuranceClaim {
  id: string;
  tenantId: string;
  invoiceId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  payerName: string;
  claimNumber?: string;
  policyNumber?: string;
  preAuthNumber?: string;
  claimedAmount: number;
  approvedAmount?: number;
  patientCoPay?: number;
  coPayAmount?: number;
  status: InsuranceClaimStatus;
  submittedDate?: string;
  submissionDate?: string;
  settledDate?: string;
  settlementDate?: string;
  diagnosisCode?: string;
  denialReason?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  tenantId: string;
  invoiceNumber: string;
  patientId: string;
  patientName: string;
  appointmentId?: string;
  serviceName: string;
  amount: number; // Final net payable amount
  amountPaid: number;
  balance: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
  paymentMethod?: 'Credit Card' | 'Insurance' | 'Cash' | 'Debit Card' | 'UPI / Bank';
  installments?: PaymentInstallment[];

  // Discounts & Itemized Taxes
  subtotal?: number;
  discountType?: 'flat' | 'percentage';
  discountValue?: number;
  discountAmount?: number;
  taxRatePercent?: number; // e.g. 18 for GST
  taxAmount?: number;
  cgstAmount?: number; // 9%
  sgstAmount?: number; // 9%

  // Dental Insurance Claim
  insuranceClaim?: {
    claimId: string;
    claimNumber?: string;
    status: InsuranceClaimStatus;
    payerName: string;
    policyNumber?: string;
    preAuthNumber?: string;
    claimedAmount: number;
    approvedAmount?: number;
    patientCoPay?: number;
    coPayAmount?: number;
    submittedDate?: string;
    submissionDate?: string;
    settledDate?: string;
    settlementDate?: string;
    diagnosisCode?: string;
    denialReason?: string;
    notes?: string;
  };
}

export type AuditAction =
  | 'SECURITY_LOGIN'
  | 'SECURITY_LOGOUT'
  | 'PATIENT_VIEWED'
  | 'PATIENT_CREATED'
  | 'PATIENT_UPDATED'
  | 'APPOINTMENT_SCHEDULED'
  | 'APPOINTMENT_STATUS_CHANGED'
  | 'APPOINTMENT_OVERRIDDEN'
  | 'APPOINTMENT_DELETED'
  | 'NOTE_SIGNED'
  | 'INVOICE_CREATED'
  | 'PAYMENT_RECORDED'
  | 'INVOICE_DELETED'
  | 'SERVICE_CREATED'
  | 'SERVICE_UPDATED'
  | 'PRESCRIPTION_CREATED'
  | 'PRESCRIPTION_DELETED'
  | 'RADIOGRAPH_UPLOADED'
  | 'RADIOGRAPH_DELETED'
  | 'PERIO_CHART_UPDATED'
  | 'TREATMENT_PLAN_CREATED'
  | 'TREATMENT_PLAN_UPDATED'
  | 'CHAIR_CREATED'
  | 'CHAIR_UPDATED'
  | 'CHAIR_DELETED'
  | 'PATIENT_CHECKED_IN'
  | 'PATIENT_SEATED'
  | 'CLAIM_SUBMITTED'
  | 'CLAIM_SETTLED'
  | 'BACKUP_EXPORTED'
  | 'BACKUP_RESTORED';

export interface AuditLogEntry {
  id: string;
  tenantId: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: AuditAction;
  resourceType:
    | 'Patient'
    | 'Appointment'
    | 'ClinicalNote'
    | 'Invoice'
    | 'Security'
    | 'Service'
    | 'Prescription'
    | 'Radiograph'
    | 'PerioChart'
    | 'TreatmentPlan'
    | 'Chair'
    | 'Claim'
    | 'Backup';
  resourceId?: string;
  details: string;
  ipAddress?: string;
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

// ---------------------------------------------------------------------------
// Clinical Suite Types (e-Rx, Imaging, Perio Probing, Treatment Planning)
// ---------------------------------------------------------------------------

export interface PrescriptionItem {
  id: string;
  drugName: string;
  dosage: string;
  frequency: 'OD (Once Daily)' | 'BD (Twice Daily)' | 'TDS (Thrice Daily)' | 'QDS (4x Daily)' | 'SOS (As Needed)' | string;
  durationDays: number;
  timing: 'After Food' | 'Before Food' | 'With Food' | 'Anytime';
  instructions?: string;
}

export interface DentalPrescription {
  id: string;
  tenantId: string;
  patientId: string;
  patientName: string;
  patientAge?: number;
  patientGender?: string;
  doctorId: string;
  doctorName: string;
  doctorRegistrationNumber?: string;
  date: string; // YYYY-MM-DD
  diagnosis: string;
  items: PrescriptionItem[];
  notes?: string;
  createdAt: string;
}

export type RadiographCategory =
  | 'IOPA (Periapical)'
  | 'Bitewing'
  | 'OPG (Panoramic)'
  | 'CBCT 3D'
  | 'Intraoral Photo'
  | 'Cephalometric';

export interface DentalRadiograph {
  id: string;
  tenantId: string;
  patientId: string;
  title: string;
  category: RadiographCategory;
  dateTaken: string;
  toothNumbers?: number[];
  imageUrl: string;
  findings: string;
  takenBy: string;
  notes?: string;
}

export interface PerioSiteMeasurement {
  depth: number; // in mm, e.g. 1 to 12
  bop: boolean; // Bleeding on Probing
}

export interface PerioToothRecord {
  toothNumber: number;
  buccal: {
    distal: PerioSiteMeasurement;
    middle: PerioSiteMeasurement;
    mesial: PerioSiteMeasurement;
  };
  lingual: {
    distal: PerioSiteMeasurement;
    middle: PerioSiteMeasurement;
    mesial: PerioSiteMeasurement;
  };
  furcation?: 'None' | 'Class I' | 'Class II' | 'Class III';
  mobility?: '0' | 'I' | 'II' | 'III';
  isMissing?: boolean;
}

export interface PeriodontalChart {
  id: string;
  tenantId: string;
  patientId: string;
  examDate: string;
  examinedBy: string;
  teeth: Record<number, PerioToothRecord>;
  summaryNotes?: string;
}

export type TreatmentPhaseType =
  | 'Phase 1: Emergency & Pain Relief'
  | 'Phase 2: Disease Control & Endodontics'
  | 'Phase 3: Prosthetics & Rehabilitation'
  | 'Phase 4: Maintenance & Prevention';

export interface TreatmentPlanItem {
  id: string;
  serviceCode: string;
  procedureName: string;
  toothNumber?: number;
  estimatedFee: number;
  status: 'Proposed' | 'Accepted' | 'In-Progress' | 'Completed' | 'Declined';
  priority: 'Urgent' | 'Standard' | 'Elective';
  notes?: string;
}

export interface TreatmentPhase {
  id: string;
  phaseType: TreatmentPhaseType;
  items: TreatmentPlanItem[];
}

export interface PatientTreatmentPlan {
  id: string;
  tenantId: string;
  patientId: string;
  title: string;
  createdDate: string;
  createdBy: string;
  phases: TreatmentPhase[];
  totalEstimatedFee: number;
  acceptedFee: number;
  status: 'Draft' | 'Presented' | 'Accepted' | 'Completed';
  patientAcceptedDate?: string;
}

