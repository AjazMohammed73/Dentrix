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
import {
  initialPrescriptions,
  initialRadiographs,
  initialPerioCharts,
  initialTreatmentPlans,
  initialOperatoryChairs,
} from '../data/mockData';
import { ApiError, api } from '../lib/api';
import { useAuth } from './AuthContext';
import { safeStorageSet } from '../utils/storage';

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
  addPrescription: (data: Omit<DentalPrescription, 'id' | 'createdAt' | 'tenantId'>) => DentalPrescription;
  deletePrescription: (id: string) => void;
  addRadiograph: (data: Omit<DentalRadiograph, 'id' | 'tenantId'>) => DentalRadiograph;
  deleteRadiograph: (id: string) => void;
  savePerioChart: (chart: Omit<PeriodontalChart, 'id' | 'tenantId'> & { id?: string }) => PeriodontalChart;
  addTreatmentPlan: (data: Omit<PatientTreatmentPlan, 'id' | 'tenantId'>) => PatientTreatmentPlan;
  updateTreatmentPlanItemStatus: (
    planId: string,
    phaseId: string,
    itemId: string,
    status: TreatmentPlanItem['status'],
  ) => void;
  acceptTreatmentPlan: (planId: string) => void;

  // Operatory Chair & Waiting Room Actions
  addOperatoryChair: (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string,
  ) => { success: boolean; message?: string; chair?: OperatoryChairConfig };
  updateOperatoryChair: (id: string, updates: Partial<OperatoryChairConfig>) => void;
  deleteOperatoryChair: (id: string) => { success: boolean; message?: string };
  markPatientArrived: (appointmentId: string) => void;
  assignChairAndSeat: (appointmentId: string, operatoryChair: string) => void;

  // Insurance Claims & Data Backup
  updateInvoiceInsuranceClaim: (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>,
  ) => void;
  restoreBackupData: (backupData: any) => { success: boolean; message?: string };
  logAuditEvent: (
    action: AuditAction,
    resourceType: AuditLogEntry['resourceType'],
    resourceId?: string,
    details?: string,
  ) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const safeList = async <T,>(path: string): Promise<T[]> => {
  try {
    return await api<T[]>(path);
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

  // Local/persisted states for clinical suite & chair config
  const [allPrescriptions, setAllPrescriptions] = useState<DentalPrescription[]>(() => {
    const saved = localStorage.getItem('dentrix_prescriptions');
    return saved ? JSON.parse(saved) : initialPrescriptions;
  });

  const [allRadiographs, setAllRadiographs] = useState<DentalRadiograph[]>(() => {
    const saved = localStorage.getItem('dentrix_radiographs');
    return saved ? JSON.parse(saved) : initialRadiographs;
  });

  const [allPerioCharts, setAllPerioCharts] = useState<PeriodontalChart[]>(() => {
    const saved = localStorage.getItem('dentrix_perio_charts');
    return saved ? JSON.parse(saved) : initialPerioCharts;
  });

  const [allTreatmentPlans, setAllTreatmentPlans] = useState<PatientTreatmentPlan[]>(() => {
    const saved = localStorage.getItem('dentrix_treatment_plans');
    return saved ? JSON.parse(saved) : initialTreatmentPlans;
  });

  const [allOperatoryChairs, setAllOperatoryChairs] = useState<OperatoryChairConfig[]>(() => {
    const saved = localStorage.getItem('dentrix_operatory_chairs');
    return saved ? JSON.parse(saved) : initialOperatoryChairs;
  });

  // Sync to local storage
  useEffect(() => {
    safeStorageSet('dentrix_prescriptions', allPrescriptions, 'prescriptions');
  }, [allPrescriptions]);

  useEffect(() => {
    safeStorageSet('dentrix_radiographs', allRadiographs, 'radiographs');
  }, [allRadiographs]);

  useEffect(() => {
    safeStorageSet('dentrix_perio_charts', allPerioCharts, 'perio_charts');
  }, [allPerioCharts]);

  useEffect(() => {
    safeStorageSet('dentrix_treatment_plans', allTreatmentPlans, 'treatment_plans');
  }, [allTreatmentPlans]);

  useEffect(() => {
    safeStorageSet('dentrix_operatory_chairs', allOperatoryChairs, 'operatory_chairs');
  }, [allOperatoryChairs]);

  // Scoped views
  const prescriptions = isSuperAdmin
    ? allPrescriptions
    : allPrescriptions.filter((p) => p.tenantId === currentTenantId);

  const radiographs = isSuperAdmin
    ? allRadiographs
    : allRadiographs.filter((r) => r.tenantId === currentTenantId);

  const perioCharts = isSuperAdmin
    ? allPerioCharts
    : allPerioCharts.filter((pc) => pc.tenantId === currentTenantId);

  const treatmentPlans = isSuperAdmin
    ? allTreatmentPlans
    : allTreatmentPlans.filter((tp) => tp.tenantId === currentTenantId);

  const operatoryChairs = isSuperAdmin
    ? allOperatoryChairs
    : allOperatoryChairs.filter((oc) => oc.tenantId === currentTenantId);

  // Loaders
  const loadPatients = useCallback(() => safeList<Patient>('/patients').then(setPatients), []);
  const loadServices = useCallback(() => safeList<DentalService>('/services').then(setServices), []);
  const loadAppointments = useCallback(
    () => safeList<Appointment>('/appointments').then(setAppointments),
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
  }, [loadPatients, loadServices, loadAppointments, loadNotes, loadInvoices, loadAudit]);

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

  // Clinical Suite Actions
  const addPrescription = (
    data: Omit<DentalPrescription, 'id' | 'createdAt' | 'tenantId'>,
  ): DentalPrescription => {
    const newRx: DentalPrescription = {
      ...data,
      id: `rx_${Date.now()}`,
      tenantId: currentTenantId,
      createdAt: new Date().toISOString(),
    };
    setAllPrescriptions((prev) => [newRx, ...prev]);
    logAuditEvent(
      'PRESCRIPTION_CREATED',
      'Prescription',
      newRx.id,
      `Issued e-Rx for ${newRx.patientName} (${newRx.items.length} prescribed items)`,
    );
    return newRx;
  };

  const deletePrescription = (id: string) => {
    setAllPrescriptions((prev) => prev.filter((p) => p.id !== id));
    logAuditEvent('PRESCRIPTION_DELETED', 'Prescription', id, 'Deleted prescription record');
  };

  const addRadiograph = (
    data: Omit<DentalRadiograph, 'id' | 'tenantId'>,
  ): DentalRadiograph => {
    const newRad: DentalRadiograph = {
      ...data,
      id: `rad_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllRadiographs((prev) => [newRad, ...prev]);
    logAuditEvent(
      'RADIOGRAPH_UPLOADED',
      'Radiograph',
      newRad.id,
      `Uploaded ${newRad.category}: ${newRad.title}`,
    );
    return newRad;
  };

  const deleteRadiograph = (id: string) => {
    setAllRadiographs((prev) => prev.filter((r) => r.id !== id));
    logAuditEvent('RADIOGRAPH_DELETED', 'Radiograph', id, 'Deleted radiograph record');
  };

  const savePerioChart = (
    chart: Omit<PeriodontalChart, 'id' | 'tenantId'> & { id?: string },
  ): PeriodontalChart => {
    const chartId = chart.id || `perio_${Date.now()}`;
    const newChart: PeriodontalChart = {
      ...chart,
      id: chartId,
      tenantId: currentTenantId,
    };
    setAllPerioCharts((prev) => {
      const exists = prev.some((c) => c.id === chartId);
      if (exists) {
        return prev.map((c) => (c.id === chartId ? newChart : c));
      }
      return [newChart, ...prev];
    });
    logAuditEvent(
      'PERIO_CHART_UPDATED',
      'PerioChart',
      chartId,
      `Updated periodontal probing exam on ${newChart.examDate}`,
    );
    return newChart;
  };

  const addTreatmentPlan = (
    data: Omit<PatientTreatmentPlan, 'id' | 'tenantId'>,
  ): PatientTreatmentPlan => {
    const newPlan: PatientTreatmentPlan = {
      ...data,
      id: `tp_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllTreatmentPlans((prev) => [newPlan, ...prev]);
    logAuditEvent(
      'TREATMENT_PLAN_CREATED',
      'TreatmentPlan',
      newPlan.id,
      `Created treatment plan: ${newPlan.title}`,
    );
    return newPlan;
  };

  const updateTreatmentPlanItemStatus = (
    planId: string,
    phaseId: string,
    itemId: string,
    status: TreatmentPlanItem['status'],
  ) => {
    setAllTreatmentPlans((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId) return plan;
        const updatedPhases = plan.phases.map((phase) => {
          if (phase.id !== phaseId) return phase;
          const updatedItems = phase.items.map((item) => {
            if (item.id !== itemId) return item;
            return { ...item, status };
          });
          return { ...phase, items: updatedItems };
        });

        const acceptedFee = updatedPhases.reduce(
          (sum, ph) =>
            sum +
            ph.items
              .filter(
                (it) =>
                  it.status === 'Accepted' ||
                  it.status === 'In-Progress' ||
                  it.status === 'Completed',
              )
              .reduce((s, it) => s + it.estimatedFee, 0),
          0,
        );

        return { ...plan, phases: updatedPhases, acceptedFee };
      }),
    );
    logAuditEvent('TREATMENT_PLAN_UPDATED', 'TreatmentPlan', planId, `Updated procedure status to ${status}`);
  };

  const acceptTreatmentPlan = (planId: string) => {
    setAllTreatmentPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedPhases = plan.phases.map((ph) => ({
            ...ph,
            items: ph.items.map((it) => ({
              ...it,
              status: (it.status === 'Proposed' ? 'Accepted' : it.status) as TreatmentPlanItem['status'],
            })),
          }));
          const acceptedFee = updatedPhases.reduce(
            (sum, ph) =>
              sum +
              ph.items
                .filter((it) => it.status !== 'Declined' && it.status !== 'Proposed')
                .reduce((s, it) => s + it.estimatedFee, 0),
            0,
          );
          return {
            ...plan,
            status: 'Accepted' as const,
            patientAcceptedDate: new Date().toISOString().split('T')[0],
            phases: updatedPhases,
            acceptedFee,
          };
        }
        return plan;
      }),
    );
    logAuditEvent('TREATMENT_PLAN_UPDATED', 'TreatmentPlan', planId, 'Patient accepted clinical treatment plan');
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

  // Operatory Chair Scaling & Configuration
  const addOperatoryChair = (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string,
  ): { success: boolean; message?: string; chair?: OperatoryChairConfig } => {
    const currentLimit = currentTenant?.subscription?.chairLimit || 6;
    const activeChairs = operatoryChairs.filter((c) => c.isActive);

    if (activeChairs.length >= currentLimit) {
      return {
        success: false,
        message: `Plan chair quota (${currentLimit} chairs) reached for ${currentTenant?.name || 'clinic'}. Please upgrade subscription plan to activate more chairs.`,
      };
    }

    const newChair: OperatoryChairConfig = {
      id: `chair_${Date.now()}`,
      tenantId: currentTenantId,
      name: name.trim(),
      roomNumber: roomNumber?.trim(),
      chairType,
      isActive: true,
      color:
        chairType === 'Hygiene'
          ? 'sky'
          : chairType === 'Surgery'
          ? 'rose'
          : chairType === 'Orthodontics'
          ? 'indigo'
          : 'emerald',
    };

    setAllOperatoryChairs((prev) => [...prev, newChair]);
    logAuditEvent(
      'CHAIR_CREATED',
      'Chair',
      newChair.id,
      `Configured new operatory [${newChair.name}] (${chairType}, ${roomNumber || 'No room'})`,
    );
    return { success: true, chair: newChair };
  };

  const updateOperatoryChair = (id: string, updates: Partial<OperatoryChairConfig>) => {
    setAllOperatoryChairs((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updated = { ...c, ...updates };
          logAuditEvent('CHAIR_UPDATED', 'Chair', id, `Updated operatory [${updated.name}]`);
          return updated;
        }
        return c;
      }),
    );
  };

  const deleteOperatoryChair = (id: string): { success: boolean; message?: string } => {
    const chair = allOperatoryChairs.find((c) => c.id === id);
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

    setAllOperatoryChairs((prev) => prev.filter((c) => c.id !== id));
    logAuditEvent('CHAIR_DELETED', 'Chair', id, `Removed operatory chair [${chair.name}]`);
    return { success: true };
  };

  // Insurance Claims
  const updateInvoiceInsuranceClaim = (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>,
  ) => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const currentClaim = inv.insuranceClaim || {
            claimId: `clm_${Date.now()}`,
            claimNumber: `CLM-${Date.now().toString().slice(-6)}`,
            payerName: 'Primary Insurance',
            policyNumber: '',
            status: 'Draft' as const,
            claimedAmount: inv.amount,
            notes: '',
          };
          const updatedClaim = { ...currentClaim, ...claimData };
          const updatedInvoice = { ...inv, insuranceClaim: updatedClaim };
          logAuditEvent(
            'CLAIM_SUBMITTED',
            'Claim',
            invoiceId,
            `Updated insurance claim for invoice ${inv.invoiceNumber} (${updatedClaim.status})`,
          );
          return updatedInvoice;
        }
        return inv;
      }),
    );
  };

  // Backup restore
  const restoreBackupData = (backupData: any): { success: boolean; message?: string } => {
    try {
      if (!backupData || typeof backupData !== 'object') {
        return { success: false, message: 'Invalid backup file payload format.' };
      }
      const targetClinicId = currentTenantId;

      if (backupData.prescriptions && Array.isArray(backupData.prescriptions)) {
        setAllPrescriptions((prev) => [
          ...prev.filter((p) => p.tenantId !== targetClinicId),
          ...backupData.prescriptions.map((p: any) => ({ ...p, tenantId: targetClinicId })),
        ]);
      }
      if (backupData.radiographs && Array.isArray(backupData.radiographs)) {
        setAllRadiographs((prev) => [
          ...prev.filter((r) => r.tenantId !== targetClinicId),
          ...backupData.radiographs.map((r: any) => ({ ...r, tenantId: targetClinicId })),
        ]);
      }
      if (backupData.perioCharts && Array.isArray(backupData.perioCharts)) {
        setAllPerioCharts((prev) => [
          ...prev.filter((pc) => pc.tenantId !== targetClinicId),
          ...backupData.perioCharts.map((pc: any) => ({ ...pc, tenantId: targetClinicId })),
        ]);
      }
      if (backupData.treatmentPlans && Array.isArray(backupData.treatmentPlans)) {
        setAllTreatmentPlans((prev) => [
          ...prev.filter((tp) => tp.tenantId !== targetClinicId),
          ...backupData.treatmentPlans.map((tp: any) => ({ ...tp, tenantId: targetClinicId })),
        ]);
      }
      if (backupData.operatoryChairs && Array.isArray(backupData.operatoryChairs)) {
        setAllOperatoryChairs((prev) => [
          ...prev.filter((ch) => ch.tenantId !== targetClinicId),
          ...backupData.operatoryChairs.map((ch: any) => ({ ...ch, tenantId: targetClinicId })),
        ]);
      }

      logAuditEvent(
        'BACKUP_RESTORED',
        'Backup',
        undefined,
        `Successfully restored clinic data archive for tenant ${targetClinicId}`,
      );
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err?.message || 'Failed restoring backup.' };
    }
  };

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

        // Global lists / Backups
        allPatients: patients,
        allAppointments: appointments,
        allInvoices: invoices,
        allClinicalNotes: clinicalNotes,
        allOperatoryChairs,
        allPrescriptions,
        allRadiographs,
        allPerioCharts,
        allTreatmentPlans,

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
