import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  Appointment,
  AppointmentStatus,
  AuditLogEntry,
  ClinicalNote,
  DentalService,
  Invoice,
  Patient,
  PaymentInstallment,
  SystemHealth,
} from '../types';
import { api } from '../lib/api';
import { useAuth } from './AuthContext';

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
  ) => { hasConflict: boolean; chairConflict?: Appointment; doctorConflict?: Appointment };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const safeList = async <T,>(path: string): Promise<T[]> => {
  try {
    return await api<T[]>(path);
  } catch {
    return [];
  }
};

const toMinutes = (t: string): number => {
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const canRevenue =
    currentUser.role === 'SUPER_ADMIN' ||
    currentUser.role === 'DOCTOR_ADMIN' ||
    currentUser.permissions.canViewRevenue;
  const canAudit = currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'DOCTOR_ADMIN';

  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [services, setServices] = useState<DentalService[]>([]);
  const [clinicalNotes, setClinicalNotes] = useState<ClinicalNote[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>([]);
  const [loading, setLoading] = useState(true);

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
    await Promise.all([
      loadPatients(),
      loadServices(),
      loadAppointments(),
      loadNotes(),
      loadInvoices(),
      loadAudit(),
    ]);
    setLoading(false);
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
      // booking also creates the pending invoice server-side and moves the balance
      await Promise.all([loadAppointments(), loadInvoices(), loadPatients()]);
    });

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) =>
    guard(async () => {
      await api(`/appointments/${id}`, { method: 'PATCH', body: { status } });
      await loadAppointments();
    });

  const deleteAppointment = (id: string) =>
    guard(async () => {
      await api(`/appointments/${id}`, { method: 'DELETE' });
      await loadAppointments();
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
        body: { amount: payment.amount, method: payment.method, notes: payment.notes },
      });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  const markInvoicePaid = (id: string, paymentMethod?: Invoice['paymentMethod']) =>
    guard(async () => {
      await api(`/invoices/${id}/mark-paid`, {
        method: 'POST',
        query: { method: paymentMethod ?? 'Credit Card' },
      });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  const deleteInvoice = (id: string) =>
    guard(async () => {
      await api(`/invoices/${id}`, { method: 'DELETE' });
      await Promise.all([loadInvoices(), loadPatients()]);
    });

  // --- conflict check: pure, over the in-memory (already tenant-scoped) list.
  //     The server re-checks authoritatively on POST /appointments.
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

    return { hasConflict: Boolean(chairConflict || doctorConflict), chairConflict, doctorConflict };
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
