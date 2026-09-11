import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Appointment,
  AppointmentStatus,
  AuditAction,
  AuditLogEntry,
  ClinicalNote,
  DentalService,
  Invoice,
  Patient,
  PaymentInstallment,
  DentalPrescription,
  DentalRadiograph,
  PeriodontalChart,
  PatientTreatmentPlan,
  TreatmentPlanItem,
  OperatoryChairConfig,
  OperatoryChairType,
  SystemHealth,
} from '../types';
import { ApiError, api } from '../lib/api';
import { isoAfterDays } from '../utils/format';
import { useAuth } from './AuthContext';

// Standard chairs handed to a clinic that hasn't customised its operatories yet.
const DEFAULT_OPERATORY_CHAIRS: Omit<OperatoryChairConfig, 'tenantId'>[] = [
  { id: 'chair_default_1', name: 'Chair 1 - Hygiene', chairType: 'Hygiene', isActive: true, color: 'sky' },
  { id: 'chair_default_2', name: 'Chair 2 - Surgery', chairType: 'Surgery', isActive: true, color: 'rose' },
  { id: 'chair_default_3', name: 'Chair 3 - General', chairType: 'General', isActive: true, color: 'emerald' },
];

// Decorative infra telemetry — there is no `/system-health` endpoint (see CONTEXT.md).
const STATIC_SYSTEM_HEALTH: SystemHealth = {
  databasePools: { active: 14, idle: 36, max: 100 },
  storageUsedGb: 28.4,
  storageTotalGb: 250,
  uptimePercent: 99.98,
  activeTenantsCount: 2,
  totalAppointmentsToday: 0,
};

interface BookAppointmentInput {
  patientId: string;
  serviceId: string;
  doctorId: string;
  date: string;
  startTime: string;
  operatoryChair: string;
  notes?: string;
  allowOverride?: boolean;
}

interface InvoiceInput {
  patientId: string;
  serviceName: string;
  amount: number;
  amountPaid: number;
  date: string;
  dueDate: string;
  status: Invoice['status'];
  paymentMethod?: Invoice['paymentMethod'];
}

interface DataContextType {
  patients: Patient[];
  appointments: Appointment[];
  services: DentalService[];
  allServices: DentalService[];
  clinicalNotes: ClinicalNote[];
  invoices: Invoice[];
  auditLogs: AuditLogEntry[];
  systemHealth: SystemHealth;
  loading: boolean;
  refreshAll: () => Promise<void>;

  prescriptions: DentalPrescription[];
  radiographs: DentalRadiograph[];
  perioCharts: PeriodontalChart[];
  treatmentPlans: PatientTreatmentPlan[];
  operatoryChairs: OperatoryChairConfig[];

  // Global lists (for Super Admin / Backups)
  allPatients: Patient[];
  allAppointments: Appointment[];
  allInvoices: Invoice[];
  allClinicalNotes: ClinicalNote[];
  allOperatoryChairs: OperatoryChairConfig[];
  allPrescriptions: DentalPrescription[];
  allRadiographs: DentalRadiograph[];
  allPerioCharts: PeriodontalChart[];
  allTreatmentPlans: PatientTreatmentPlan[];

  addPatient: (data: Omit<Patient, 'id' | 'createdAt' | 'tenantId'>) => Promise<void>;
  updatePatient: (patient: Patient) => Promise<void>;
  addAppointment: (data: BookAppointmentInput) => Promise<void>;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  addClinicalNote: (data: Omit<ClinicalNote, 'id' | 'tenantId' | 'signedAt'>) => Promise<void>;
  addService: (data: Omit<DentalService, 'id' | 'tenantId'>) => Promise<void>;
  updateService: (service: DentalService) => Promise<void>;
  toggleServiceActive: (id: string) => Promise<void>;
  addInvoice: (data: Omit<Invoice, 'id' | 'tenantId'>) => Promise<Invoice>;
  addInvoicePayment: (
    invoiceId: string,
    payment: { amount: number; method: PaymentInstallment['method']; notes?: string },
  ) => Promise<void>;
  markInvoicePaid: (id: string, paymentMethod?: Invoice['paymentMethod']) => Promise<void>;
  deleteInvoice: (id: string) => Promise<void>;
  checkAppointmentConflict: (
    date: string,
    startTime: string,
    endTime: string,
    operatoryChair: string,
    doctorId: string,
    excludeAppointmentId?: string,
  ) => {
    hasConflict: boolean;
    chairConflict?: Appointment;
    doctorConflict?: Appointment;
  };

  // Clinical Suite Actions
  addPrescription: (
    data: Omit<DentalPrescription, 'id' | 'createdAt' | 'tenantId'>,
  ) => Promise<DentalPrescription>;
  deletePrescription: (id: string) => Promise<void>;
  addRadiograph: (data: Omit<DentalRadiograph, 'id' | 'tenantId'>) => Promise<DentalRadiograph>;
  deleteRadiograph: (id: string) => Promise<void>;
  savePerioChart: (
    chart: Omit<PeriodontalChart, 'id' | 'tenantId'> & { id?: string },
  ) => Promise<PeriodontalChart>;
  addTreatmentPlan: (
    data: Omit<PatientTreatmentPlan, 'id' | 'tenantId'>,
  ) => Promise<PatientTreatmentPlan>;
  updateTreatmentPlanItemStatus: (
    planId: string,
    phaseId: string,
    itemId: string,
    status: TreatmentPlanItem['status'],
  ) => Promise<void>;
  acceptTreatmentPlan: (planId: string) => Promise<void>;

  // Operatory Chair & Waiting Room Actions
  addOperatoryChair: (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string,
  ) => Promise<{ success: boolean; message?: string; chair?: OperatoryChairConfig }>;
  updateOperatoryChair: (id: string, updates: Partial<OperatoryChairConfig>) => Promise<void>;
  deleteOperatoryChair: (id: string) => Promise<{ success: boolean; message?: string }>;
  markPatientArrived: (appointmentId: string) => void;
  assignChairAndSeat: (appointmentId: string, operatoryChair: string) => void;

  // Insurance Claims & Data Backup
  updateInvoiceInsuranceClaim: (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>,
  ) => Promise<void>;
  restoreBackupData: (backupData: any) => { success: boolean; message?: string };
  logAuditEvent: (
    action: AuditAction,
    resourceType: AuditLogEntry['resourceType'],
    resourceId?: string,
    details?: string,
  ) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

type Query = Record<string, string | number | undefined>;

// Everything the app filters/searches client-side, so pull a generous page (the API
// caps at 1000). Server-side ?q / paged UI is the follow-up if a clinic exceeds this.
const PAGE = 1000;

const safeList = async <T,>(path: string, query?: Query): Promise<T[]> => {
  try {
    return await api<T[]>(path, { query: { limit: PAGE, ...query } });
  } catch (e) {
    // 403 => this role legitimately can't see this list; treat as empty.
    // Anything else (5xx, network, CORS) is a real failure — surface it.
    if (e instanceof ApiError && e.status === 403) return [];
    throw e;
  }
};

const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentTenant } = useAuth();
  const currentTenantId = currentTenant?.id || currentUser?.tenantId || 'tenant_apex';
  const isSuperAdmin = currentUser?.role === 'SUPER_ADMIN';

  const canRevenue =
    currentUser?.role === 'SUPER_ADMIN' ||
    currentUser?.role === 'DOCTOR_ADMIN' ||
    currentUser?.permissions?.canViewRevenue;
  const canAudit = currentUser?.role === 'SUPER_ADMIN' || currentUser?.role === 'DOCTOR_ADMIN';

  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<DentalService[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Clinical suite & chair config — API-backed, tenant-scoped server-side.
  const [prescriptions, setPrescriptions] = useState<DentalPrescription[]>([]);
  const [radiographs, setRadiographs] = useState<DentalRadiograph[]>([]);
  const [perioCharts, setPerioCharts] = useState<PeriodontalChart[]>([]);
  const [treatmentPlans, setTreatmentPlans] = useState<PatientTreatmentPlan[]>([]);
  const [serverChairs, setServerChairs] = useState<OperatoryChairConfig[]>([]);

  // A brand-new clinic has no chairs configured yet; hand it a standard set (bound to
  // the live tenant) so the booking dropdown isn't empty until it customises them
  // via ManageChairs, which persists real rows and makes this fallback stop firing.
  const operatoryChairs =
    serverChairs.length > 0
      ? serverChairs
      : DEFAULT_OPERATORY_CHAIRS.map((c) => ({ ...c, tenantId: currentTenantId }));

  // Loaders
  const loadPatients = useCallback(() => safeList<Patient>('/patients').then(setPatients), []);
  const loadServices = useCallback(() => safeList<DentalService>('/services').then(setServices), []);
  const loadAppointments = useCallback(
    () =>
      // a ~8-month window around today rather than all history
      safeList<Appointment>('/appointments', {
        from: isoAfterDays(-120),
        to: isoAfterDays(120),
      }).then(setAppointments),
    [],
  );
  const loadNotes = useCallback(
    () => safeList<ClinicalNote>('/clinical-notes').then(setClinicalNotes),
    [],
  );
  const loadInvoices = useCallback(
    () => (canRevenue ? safeList<Invoice>('/invoices') : Promise.resolve([])).then(setInvoices),
    [canRevenue],
  );
  const loadAudit = useCallback(
    () => (canAudit ? safeList<AuditLogEntry>('/audit-logs') : Promise.resolve([])).then(setAuditLogs),
    [canAudit],
  );
  const loadPrescriptions = useCallback(
    () => safeList<DentalPrescription>('/prescriptions').then(setPrescriptions),
    [],
  );
  const loadRadiographs = useCallback(
    () => safeList<DentalRadiograph>('/radiographs').then(setRadiographs),
    [],
  );
  const loadPerioCharts = useCallback(
    () => safeList<PeriodontalChart>('/perio-charts').then(setPerioCharts),
    [],
  );
  const loadTreatmentPlans = useCallback(
    () => safeList<PatientTreatmentPlan>('/treatment-plans').then(setTreatmentPlans),
    [],
  );
  const loadChairs = useCallback(
    () => safeList<OperatoryChairConfig>('/operatory-chairs').then(setServerChairs),
    [],
  );

  const refreshAll = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadPatients(),
        loadServices(),
        loadAppointments(),
        loadNotes(),
        loadInvoices(),
        loadAudit(),
        loadPrescriptions(),
        loadRadiographs(),
        loadPerioCharts(),
        loadTreatmentPlans(),
        loadChairs(),
      ]);
    } catch (e) {
      window.alert(
        e instanceof Error
          ? `Couldn't load clinic data: ${e.message}. Check your connection and reload.`
          : "Couldn't load clinic data. Check your connection and reload.",
      );
    } finally {
      setLoading(false);
    }
  }, [
    loadPatients,
    loadServices,
    loadAppointments,
    loadNotes,
    loadInvoices,
    loadAudit,
    loadPrescriptions,
    loadRadiographs,
    loadPerioCharts,
    loadTreatmentPlans,
    loadChairs,
  ]);

  useEffect(() => {
    void refreshAll();
  }, [refreshAll]);

  const guard = async (fn: () => Promise<void>): Promise<void> => {
    try {
      await fn();
    } catch (e) {
      window.alert(e instanceof Error ? e.message : 'Request failed');
    }
  };

  const logAuditEvent = (
    action: AuditAction,
    resourceType: AuditLogEntry['resourceType'],
    resourceId?: string,
    details?: string,
  ) => {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      tenantId: currentTenantId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: currentUser?.id || null,
      userName: currentUser?.name || 'System',
      userRole: currentUser?.role || '',
      action,
      resourceType,
      resourceId,
      details: details || '',
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  // --- patients ---
  const addPatient = (data: Omit<Patient, 'id' | 'createdAt' | 'tenantId'>) =>
    guard(async () => {
      await api('/patients', { method: 'POST', body: data });
      await loadPatients();
    });

  const updatePatient = (patient: Patient) =>
    guard(async () => {
      const { id, tenantId, createdAt, ...rest } = patient;
      void tenantId;
      void createdAt;
      await api(`/patients/${id}`, { method: 'PATCH', body: rest });
      await loadPatients();
    });

  // --- appointments ---
  const addAppointment = (data: BookAppointmentInput) =>
    guard(async () => {
      await api('/appointments', {
        method: 'POST',
        body: {
          patientId: data.patientId,
          serviceId: data.serviceId,
          doctorId: data.doctorId,
          date: data.date,
          startTime: data.startTime,
          operatoryChair: data.operatoryChair,
          notes: data.notes ?? '',
          allowOverride: data.allowOverride ?? false,
        },
      });
      await Promise.all([loadAppointments(), loadInvoices(), loadPatients()]);
    });

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) =>
    guard(async () => {
      await api(`/appointments/${id}`, { method: 'PATCH', body: { status } });
      await Promise.all([loadAppointments(), loadInvoices(), loadPatients()]);
    });

  const deleteAppointment = (id: string) =>
    guard(async () => {
      await api(`/appointments/${id}`, { method: 'DELETE' });
      await Promise.all([loadAppointments(), loadInvoices(), loadPatients()]);
    });

  // --- clinical notes ---
  const addClinicalNote = (data: Omit<ClinicalNote, 'id' | 'tenantId' | 'signedAt'>) =>
    guard(async () => {
      await api('/clinical-notes', { method: 'POST', body: data });
      await loadNotes();
    });

  // --- services ---
  const addService = (data: Omit<DentalService, 'id' | 'tenantId'>) =>
    guard(async () => {
      await api('/services', { method: 'POST', body: data });
      await loadServices();
    });

  const updateService = (service: DentalService) =>
    guard(async () => {
      const { id, tenantId, ...rest } = service;
      void tenantId;
      await api(`/services/${id}`, { method: 'PATCH', body: rest });
      await loadServices();
    });

  const toggleServiceActive = (id: string) =>
    guard(async () => {
      const svc = services.find((s) => s.id === id);
      await api(`/services/${id}`, {
        method: 'PATCH',
        body: { isActive: !(svc?.isActive ?? true) },
      });
      await loadServices();
    });

  // --- invoices ---
  const addInvoice = async (data: Omit<Invoice, 'id' | 'tenantId'>): Promise<Invoice> => {
    const payload: InvoiceInput = {
      patientId: data.patientId,
      serviceName: data.serviceName,
      amount: data.amount,
      amountPaid: data.amountPaid,
      date: data.date,
      dueDate: data.dueDate,
      status: data.status,
      paymentMethod: data.paymentMethod,
    };
    const created = await api<Invoice>('/invoices', { method: 'POST', body: payload });
    await Promise.all([loadInvoices(), loadPatients()]);
    return created;
  };

  const addInvoicePayment = (
    invoiceId: string,
    payment: { amount: number; method: PaymentInstallment['method']; notes?: string },
  ) =>
    guard(async () => {
      await api(`/invoices/${invoiceId}/payments`, {
        method: 'POST',
        body: {
          amount: payment.amount,
          method: payment.method,
          notes: payment.notes ?? '',
        },
      });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  const markInvoicePaid = (id: string, paymentMethod?: Invoice['paymentMethod']) =>
    guard(async () => {
      await api(`/invoices/${id}/mark-paid`, {
        method: 'POST',
        body: { paymentMethod },
      });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  const deleteInvoice = (id: string) =>
    guard(async () => {
      await api(`/invoices/${id}`, { method: 'DELETE' });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  const checkAppointmentConflict = (
    date: string,
    startTime: string,
    endTime: string,
    operatoryChair: string,
    doctorId: string,
    excludeAppointmentId?: string,
  ) => {
    const ns = toMinutes(startTime);
    const ne = toMinutes(endTime);
    let chairConflict: Appointment | undefined;
    let doctorConflict: Appointment | undefined;

    for (const apt of appointments) {
      if (apt.date !== date) continue;
      if (apt.status === 'Cancelled' || apt.status === 'No-Show') continue;
      if (excludeAppointmentId && apt.id === excludeAppointmentId) continue;
      const overlaps = Math.max(ns, toMinutes(apt.startTime)) < Math.min(ne, toMinutes(apt.endTime));
      if (!overlaps) continue;
      if (apt.operatoryChair === operatoryChair && !chairConflict) chairConflict = apt;
      if (apt.doctorId === doctorId && !doctorConflict) doctorConflict = apt;
    }

    return {
      hasConflict: Boolean(chairConflict || doctorConflict),
      chairConflict,
      doctorConflict,
    };
  };

  // Clinical Suite Actions — API-backed (server audits + scopes each write).
  // The `add*` helpers alert on failure and rethrow so the calling modal can skip its
  // success path; `delete*` go through `guard` (alert, no rethrow).
  const _mutate = async <T,>(run: () => Promise<T>, fail: string): Promise<T> => {
    try {
      return await run();
    } catch (err) {
      window.alert(err instanceof ApiError ? String(err.detail) : fail);
      throw err;
    }
  };

  const addPrescription = (
    data: Omit<DentalPrescription, 'id' | 'createdAt' | 'tenantId'>,
  ): Promise<DentalPrescription> =>
    _mutate(async () => {
      const created = await api<DentalPrescription>('/prescriptions', { method: 'POST', body: data });
      await loadPrescriptions();
      return created;
    }, 'Failed to save the prescription.');

  const deletePrescription = async (id: string) => {
    await guard(async () => {
      await api(`/prescriptions/${id}`, { method: 'DELETE' });
      await loadPrescriptions();
    });
  };

  const addRadiograph = (
    data: Omit<DentalRadiograph, 'id' | 'tenantId'>,
  ): Promise<DentalRadiograph> =>
    _mutate(async () => {
      const created = await api<DentalRadiograph>('/radiographs', { method: 'POST', body: data });
      await loadRadiographs();
      return created;
    }, 'Failed to save the radiograph.');

  const deleteRadiograph = async (id: string) => {
    await guard(async () => {
      await api(`/radiographs/${id}`, { method: 'DELETE' });
      await loadRadiographs();
    });
  };

  const savePerioChart = (
    chart: Omit<PeriodontalChart, 'id' | 'tenantId'> & { id?: string },
  ): Promise<PeriodontalChart> =>
    _mutate(async () => {
      const { id, tenantId: _t, ...body } = chart as PeriodontalChart;
      const saved = id
        ? await api<PeriodontalChart>(`/perio-charts/${id}`, { method: 'PATCH', body })
        : await api<PeriodontalChart>('/perio-charts', { method: 'POST', body });
      await loadPerioCharts();
      return saved;
    }, 'Failed to save the periodontal chart.');

  const addTreatmentPlan = (
    data: Omit<PatientTreatmentPlan, 'id' | 'tenantId'>,
  ): Promise<PatientTreatmentPlan> =>
    _mutate(async () => {
      const created = await api<PatientTreatmentPlan>('/treatment-plans', { method: 'POST', body: data });
      await loadTreatmentPlans();
      return created;
    }, 'Failed to save the treatment plan.');

  const _acceptedFee = (phases: PatientTreatmentPlan['phases'], counted: TreatmentPlanItem['status'][]) =>
    phases.reduce(
      (sum, ph) => sum + ph.items.filter((it) => counted.includes(it.status)).reduce((s, it) => s + it.estimatedFee, 0),
      0,
    );

  const updateTreatmentPlanItemStatus = async (
    planId: string,
    phaseId: string,
    itemId: string,
    status: TreatmentPlanItem['status'],
  ) => {
    const plan = treatmentPlans.find((p) => p.id === planId);
    if (!plan) return;
    const phases = plan.phases.map((phase) =>
      phase.id !== phaseId
        ? phase
        : { ...phase, items: phase.items.map((it) => (it.id === itemId ? { ...it, status } : it)) },
    );
    const acceptedFee = _acceptedFee(phases, ['Accepted', 'In-Progress', 'Completed']);
    await guard(async () => {
      await api(`/treatment-plans/${planId}`, { method: 'PATCH', body: { phases, acceptedFee } });
      await loadTreatmentPlans();
    });
  };

  const acceptTreatmentPlan = async (planId: string) => {
    const plan = treatmentPlans.find((p) => p.id === planId);
    if (!plan) return;
    const phases = plan.phases.map((ph) => ({
      ...ph,
      items: ph.items.map((it) => ({
        ...it,
        status: (it.status === 'Proposed' ? 'Accepted' : it.status) as TreatmentPlanItem['status'],
      })),
    }));
    const acceptedFee = _acceptedFee(phases, ['Accepted', 'In-Progress', 'Completed']);
    await guard(async () => {
      await api(`/treatment-plans/${planId}`, {
        method: 'PATCH',
        body: {
          status: 'Accepted',
          patientAcceptedDate: new Date().toISOString().split('T')[0],
          phases,
          acceptedFee,
        },
      });
      await loadTreatmentPlans();
    });
  };

  // Waiting Room Queue Actions
  const markPatientArrived = (appointmentId: string) => {
    void updateAppointmentStatus(appointmentId, 'Arrived');
    logAuditEvent(
      'PATIENT_CHECKED_IN',
      'Appointment',
      appointmentId,
      'Patient arrived at reception and checked in',
    );
  };

  const assignChairAndSeat = (appointmentId: string, operatoryChair: string) => {
    guard(async () => {
      await api(`/appointments/${appointmentId}`, {
        method: 'PATCH',
        body: { status: 'In-Chair' },
      });
      await loadAppointments();
      logAuditEvent(
        'PATIENT_SEATED',
        'Appointment',
        appointmentId,
        `Patient seated in ${operatoryChair}`,
      );
    });
  };

  // Operatory Chair Scaling & Configuration — persisted via /operatory-chairs.
  const _chairColor = (t: OperatoryChairType) =>
    t === 'Hygiene' ? 'sky' : t === 'Surgery' ? 'rose' : t === 'Orthodontics' ? 'indigo' : 'emerald';

  const addOperatoryChair = async (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string,
  ): Promise<{ success: boolean; message?: string; chair?: OperatoryChairConfig }> => {
    const currentLimit = currentTenant?.subscription?.chairLimit || 6;
    if (operatoryChairs.filter((c) => c.isActive).length >= currentLimit) {
      return {
        success: false,
        message: `Plan chair quota (${currentLimit} chairs) reached for ${currentTenant?.name || 'clinic'}. Please upgrade subscription plan to activate more chairs.`,
      };
    }
    try {
      const chair = await api<OperatoryChairConfig>('/operatory-chairs', {
        method: 'POST',
        body: { name: name.trim(), chairType, roomNumber: roomNumber?.trim(), isActive: true, color: _chairColor(chairType) },
      });
      await loadChairs();
      return { success: true, chair };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? String(err.detail) : 'Failed to add chair.' };
    }
  };

  const updateOperatoryChair = async (id: string, updates: Partial<OperatoryChairConfig>) => {
    if (id.startsWith('chair_default_')) return; // fallback placeholder, not a real row
    await guard(async () => {
      await api(`/operatory-chairs/${id}`, { method: 'PATCH', body: updates });
      await loadChairs();
    });
  };

  const deleteOperatoryChair = async (
    id: string,
  ): Promise<{ success: boolean; message?: string }> => {
    if (id.startsWith('chair_default_')) {
      return {
        success: false,
        message: 'This is a starter chair template, not a saved one yet. Add your own operatory chairs first, then remove any of these placeholders.',
      };
    }
    const chair = operatoryChairs.find((c) => c.id === id);
    if (!chair) return { success: false, message: 'Chair not found.' };
    const inChairApt = appointments.find(
      (a) => a.operatoryChair === chair.name && a.status === 'In-Chair',
    );
    if (inChairApt) {
      return {
        success: false,
        message: `Cannot delete ${chair.name} because patient ${inChairApt.patientName} is currently in-chair.`,
      };
    }
    try {
      await api(`/operatory-chairs/${id}`, { method: 'DELETE' });
      await loadChairs();
      return { success: true };
    } catch (err) {
      return { success: false, message: err instanceof ApiError ? String(err.detail) : 'Failed to remove chair.' };
    }
  };

  // Insurance Claims
  const updateInvoiceInsuranceClaim = async (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>,
  ) => {
    const target = invoices.find((i) => i.id === invoiceId);
    if (!target) return;
    const currentClaim = target.insuranceClaim || {
      claimId: `clm_${Date.now()}`,
      claimNumber: `CLM-${Date.now().toString().slice(-6)}`,
      payerName: 'Primary Insurance',
      policyNumber: '',
      status: 'Draft' as const,
      claimedAmount: target.amount,
      notes: '',
    };
    const updatedClaim = { ...currentClaim, ...claimData };
    // optimistic; server is source of truth on reload
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === invoiceId ? { ...inv, insuranceClaim: updatedClaim } : inv)),
    );
    try {
      await api(`/invoices/${invoiceId}`, { method: 'PATCH', body: { insuranceClaim: updatedClaim } });
      await loadInvoices();
    } catch (err) {
      window.alert(err instanceof ApiError ? err.detail : 'Failed to save the insurance claim.');
      await loadInvoices();
    }
  };

  // Backup restore — export still works; bulk restore is disabled now that clinical
  // records live on the server (a real restore path needs a server bulk-import endpoint).
  const restoreBackupData = (_backupData: any): { success: boolean; message?: string } => ({
    success: false,
    message:
      'Restore from file is disabled — clinical records now sync to the server. Export remains available for your own archives.',
  });

  return (
    <DataContext.Provider
      value={{
        patients,
        appointments,
        services,
        allServices: services,
        clinicalNotes,
        invoices,
        auditLogs,
        systemHealth: STATIC_SYSTEM_HEALTH,
        loading,
        refreshAll,

        prescriptions,
        radiographs,
        perioCharts,
        treatmentPlans,
        operatoryChairs,

        // Global lists / Backups (server already tenant-scopes these)
        allPatients: patients,
        allAppointments: appointments,
        allInvoices: invoices,
        allClinicalNotes: clinicalNotes,
        allOperatoryChairs: operatoryChairs,
        allPrescriptions: prescriptions,
        allRadiographs: radiographs,
        allPerioCharts: perioCharts,
        allTreatmentPlans: treatmentPlans,

        addPatient,
        updatePatient,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        addClinicalNote,
        addService,
        updateService,
        toggleServiceActive,
        addInvoice,
        addInvoicePayment,
        markInvoicePaid,
        deleteInvoice,
        checkAppointmentConflict,

        addPrescription,
        deletePrescription,
        addRadiograph,
        deleteRadiograph,
        savePerioChart,
        addTreatmentPlan,
        updateTreatmentPlanItemStatus,
        acceptTreatmentPlan,
        addOperatoryChair,
        updateOperatoryChair,
        deleteOperatoryChair,
        markPatientArrived,
        assignChairAndSeat,
        updateInvoiceInsuranceClaim,
        restoreBackupData,
        logAuditEvent,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within a DataProvider');
  return ctx;
};
