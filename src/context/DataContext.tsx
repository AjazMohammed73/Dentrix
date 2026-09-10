import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Appointment,
  DentalService,
  ClinicalNote,
  Invoice,
  SystemHealth,
  AppointmentStatus,
  AuditAction,
  AuditLogEntry,
  PaymentInstallment,
  DentalPrescription,
  DentalRadiograph,
  PeriodontalChart,
  PatientTreatmentPlan,
  TreatmentPlanItem,
  OperatoryChairConfig,
  OperatoryChairType,
} from '../types';
import {
  initialPatients,
  initialServices,
  initialClinicalNotes,
  getInitialAppointments,
  initialInvoices,
  initialSystemHealth,
  initialPrescriptions,
  initialRadiographs,
  initialPerioCharts,
  initialTreatmentPlans,
  initialOperatoryChairs,
} from '../data/mockData';
import { useAuth } from './AuthContext';
import { safeStorageSet } from '../utils/storage';

interface DataContextType {
  // Scoped lists
  patients: Patient[];
  appointments: Appointment[];
  services: DentalService[];
  clinicalNotes: ClinicalNote[];
  invoices: Invoice[];
  systemHealth: SystemHealth;
  auditLogs: AuditLogEntry[];
  prescriptions: DentalPrescription[];
  radiographs: DentalRadiograph[];
  perioCharts: PeriodontalChart[];
  treatmentPlans: PatientTreatmentPlan[];
  operatoryChairs: OperatoryChairConfig[];

  // Global lists (for Super Admin)
  allPatients: Patient[];
  allAppointments: Appointment[];
  allInvoices: Invoice[];
  allOperatoryChairs: OperatoryChairConfig[];
  allServices: DentalService[];
  allPrescriptions: DentalPrescription[];
  allRadiographs: DentalRadiograph[];
  allPerioCharts: PeriodontalChart[];
  allTreatmentPlans: PatientTreatmentPlan[];

  // Mutations
  addPatient: (patientData: Omit<Patient, 'id' | 'createdAt' | 'tenantId'>) => Patient;
  updatePatient: (patient: Patient) => void;
  addAppointment: (appointmentData: Omit<Appointment, 'id' | 'tenantId'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  deleteAppointment: (id: string) => void;
  addClinicalNote: (noteData: Omit<ClinicalNote, 'id' | 'tenantId' | 'signedAt'>) => ClinicalNote;
  addService: (serviceData: Omit<DentalService, 'id' | 'tenantId'>) => DentalService;
  updateService: (service: DentalService) => void;
  toggleServiceActive: (id: string) => void;
  addInvoice: (invoiceData: Omit<Invoice, 'id' | 'tenantId'>) => Invoice;
  addInvoicePayment: (
    invoiceId: string,
    payment: {
      amount: number;
      method: PaymentInstallment['method'];
      notes?: string;
    }
  ) => void;
  markInvoicePaid: (id: string, paymentMethod?: Invoice['paymentMethod']) => void;
  deleteInvoice: (id: string) => void;
  logAuditEvent: (
    action: AuditAction,
    resourceType: AuditLogEntry['resourceType'],
    resourceId?: string,
    details?: string
  ) => void;
  checkAppointmentConflict: (
    date: string,
    startTime: string,
    endTime: string,
    operatoryChair: string,
    doctorId: string,
    excludeAppointmentId?: string
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
    status: TreatmentPlanItem['status']
  ) => void;
  acceptTreatmentPlan: (planId: string) => void;

  // Operatory Chair & Waiting Room Actions
  addOperatoryChair: (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string
  ) => { success: boolean; message?: string; chair?: OperatoryChairConfig };
  updateOperatoryChair: (id: string, updates: Partial<OperatoryChairConfig>) => void;
  deleteOperatoryChair: (id: string) => { success: boolean; message?: string };
  markPatientArrived: (appointmentId: string) => void;
  assignChairAndSeat: (appointmentId: string, operatoryChair: string) => void;

  // Insurance Claims & Data Backup
  updateInvoiceInsuranceClaim: (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>
  ) => void;
  restoreBackupData: (backupData: any) => { success: boolean; message?: string };
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, currentTenant } = useAuth();
  const currentTenantId = currentTenant?.id || 'tenant_apex';

  const [allPatients, setAllPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem('dentrix_patients');
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [allAppointments, setAllAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('dentrix_appointments');
    return saved ? JSON.parse(saved) : getInitialAppointments();
  });

  const [allServices, setAllServices] = useState<DentalService[]>(() => {
    const saved = localStorage.getItem('dentrix_services');
    return saved ? JSON.parse(saved) : initialServices;
  });

  const [allClinicalNotes, setAllClinicalNotes] = useState<ClinicalNote[]>(() => {
    const saved = localStorage.getItem('dentrix_clinical_notes');
    return saved ? JSON.parse(saved) : initialClinicalNotes;
  });

  const [allInvoices, setAllInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem('dentrix_invoices');
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('dentrix_audit_logs');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'audit_init_1',
        tenantId: 'tenant_apex',
        timestamp: new Date(Date.now() - 3600000).toISOString().replace('T', ' ').substring(0, 19),
        userId: 'user_apex_doctor',
        userName: 'Dr. Sarah Vance, DDS',
        userRole: 'DOCTOR_ADMIN',
        action: 'SECURITY_LOGIN',
        resourceType: 'Security',
        details: 'Verified clinic access with SHA-256 license credential.',
      },
      {
        id: 'audit_init_2',
        tenantId: 'tenant_apex',
        timestamp: new Date(Date.now() - 1800000).toISOString().replace('T', ' ').substring(0, 19),
        userId: 'user_apex_doctor',
        userName: 'Dr. Sarah Vance, DDS',
        userRole: 'DOCTOR_ADMIN',
        action: 'PATIENT_VIEWED',
        resourceType: 'Patient',
        resourceId: 'pat_1',
        details: 'Accessed electronic health record and odontogram for Eleanor Vance.',
      },
    ];
  });

  const [systemHealth, setSystemHealth] = useState<SystemHealth>(() => {
    const saved = localStorage.getItem('dentrix_system_health');
    return saved ? JSON.parse(saved) : initialSystemHealth;
  });

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

  // Sync to LocalStorage & IndexedDB
  useEffect(() => {
    safeStorageSet('dentrix_patients', allPatients, 'patients');
  }, [allPatients]);

  useEffect(() => {
    safeStorageSet('dentrix_appointments', allAppointments, 'appointments');
  }, [allAppointments]);

  useEffect(() => {
    safeStorageSet('dentrix_services', allServices);
  }, [allServices]);

  useEffect(() => {
    safeStorageSet('dentrix_clinical_notes', allClinicalNotes, 'clinical_notes');
  }, [allClinicalNotes]);

  useEffect(() => {
    safeStorageSet('dentrix_invoices', allInvoices, 'invoices');
  }, [allInvoices]);

  useEffect(() => {
    safeStorageSet('dentrix_audit_logs', auditLogs, 'audit_logs');
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dentrix_system_health', JSON.stringify(systemHealth));
  }, [systemHealth]);

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

  // Logical Partitioning / Scoping by Tenant
  const isSuperAdmin = currentUser.role === 'SUPER_ADMIN';

  const patients = isSuperAdmin
    ? allPatients
    : allPatients.filter((p) => p.tenantId === currentTenantId);

  const appointments = isSuperAdmin
    ? allAppointments
    : allAppointments.filter((a) => a.tenantId === currentTenantId);

  const services = isSuperAdmin
    ? allServices
    : allServices.filter((s) => s.tenantId === currentTenantId);

  const clinicalNotes = isSuperAdmin
    ? allClinicalNotes
    : allClinicalNotes.filter((c) => c.tenantId === currentTenantId);

  const invoices = isSuperAdmin
    ? allInvoices
    : allInvoices.filter((i) => i.tenantId === currentTenantId);

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

  // Actions
  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'tenantId'>): Patient => {
    const newPatient: Patient = {
      ...patientData,
      id: `pat_${Date.now()}`,
      tenantId: currentTenantId,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setAllPatients((prev) => [newPatient, ...prev]);
    logAuditEvent('PATIENT_CREATED', 'Patient', newPatient.id, `Created electronic profile for ${newPatient.firstName} ${newPatient.lastName}`);
    return newPatient;
  };

  const updatePatient = (updated: Patient) => {
    setAllPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    logAuditEvent('PATIENT_UPDATED', 'Patient', updated.id, `Updated electronic health record for ${updated.firstName} ${updated.lastName}`);
  };

  const addAppointment = (
    appointmentData: Omit<Appointment, 'id' | 'tenantId'>
  ): Appointment => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: `apt_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllAppointments((prev) => [newAppointment, ...prev]);

    // Also auto-generate a pending invoice for this appointment
    const newInvoice: Invoice = {
      id: `inv_${Date.now()}`,
      tenantId: currentTenantId,
      invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      patientId: newAppointment.patientId,
      patientName: newAppointment.patientName,
      appointmentId: newAppointment.id,
      serviceName: `${newAppointment.serviceName} (${newAppointment.procedureCode})`,
      amount: newAppointment.fee,
      amountPaid: 0,
      balance: newAppointment.fee,
      date: newAppointment.date,
      dueDate: newAppointment.date,
      status: 'Pending',
    };
    setAllInvoices((prev) => [newInvoice, ...prev]);

    logAuditEvent('APPOINTMENT_SCHEDULED', 'Appointment', newAppointment.id, `Booked ${newAppointment.serviceName} on ${newAppointment.date} at ${newAppointment.startTime}`);
    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAllAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAllAppointments((prev) => prev.filter((a) => a.id !== id));
    logAuditEvent('APPOINTMENT_DELETED', 'Appointment', id, `Appointment cancelled.`);
  };

  const addClinicalNote = (
    noteData: Omit<ClinicalNote, 'id' | 'tenantId' | 'signedAt'>
  ): ClinicalNote => {
    const newNote: ClinicalNote = {
      ...noteData,
      id: `note_${Date.now()}`,
      tenantId: currentTenantId,
      signedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setAllClinicalNotes((prev) => [newNote, ...prev]);
    logAuditEvent(
      'NOTE_SIGNED',
      'ClinicalNote',
      newNote.id,
      `Clinical Note (${newNote.procedureName}) digitally signed for patient ${newNote.patientId}${newNote.toothNumber ? ` on Tooth #${newNote.toothNumber}` : ''}`
    );
    return newNote;
  };

  const addService = (serviceData: Omit<DentalService, 'id' | 'tenantId'>): DentalService => {
    const newService: DentalService = {
      ...serviceData,
      id: `srv_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllServices((prev) => [...prev, newService]);
    logAuditEvent('SERVICE_CREATED', 'Service', newService.id, `Registered new dental procedure [${newService.code}] ${newService.name} (Fee: ₹${newService.basePrice.toLocaleString()})`);
    return newService;
  };

  const updateService = (updated: DentalService) => {
    setAllServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
    logAuditEvent('SERVICE_UPDATED', 'Service', updated.id, `Updated procedure [${updated.code}] ${updated.name} (Fee: ₹${updated.basePrice.toLocaleString()}, Duration: ${updated.durationMinutes}m)`);
  };

  const toggleServiceActive = (id: string) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const checkAppointmentConflict = (
    date: string,
    startTime: string,
    endTime: string,
    operatoryChair: string,
    doctorId: string,
    excludeAppointmentId?: string
  ) => {
    // Convert HH:mm to minutes from midnight
    const toMins = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = toMins(startTime);
    const newEnd = toMins(endTime);

    const relevantAppointments = allAppointments.filter(
      (a) =>
        a.date === date &&
        a.status !== 'Cancelled' &&
        a.status !== 'No-Show' &&
        (!excludeAppointmentId || a.id !== excludeAppointmentId) &&
        (isSuperAdmin || a.tenantId === currentTenantId)
    );

    let chairConflict: Appointment | undefined;
    let doctorConflict: Appointment | undefined;

    for (const apt of relevantAppointments) {
      const aptStart = toMins(apt.startTime);
      const aptEnd = toMins(apt.endTime);

      // Overlap condition: max(start1, start2) < min(end1, end2)
      const overlaps = Math.max(newStart, aptStart) < Math.min(newEnd, aptEnd);

      if (overlaps) {
        if (apt.operatoryChair === operatoryChair && !chairConflict) {
          chairConflict = apt;
        }
        if (apt.doctorId === doctorId && !doctorConflict) {
          doctorConflict = apt;
        }
      }
    }

    return {
      hasConflict: Boolean(chairConflict || doctorConflict),
      chairConflict,
      doctorConflict,
    };
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'tenantId'>): Invoice => {
    // Generate initial installment if invoice was created with an immediate payment/deposit
    const initialInstallments: PaymentInstallment[] =
      invoiceData.installments && invoiceData.installments.length > 0
        ? invoiceData.installments
        : invoiceData.amountPaid > 0
        ? [
            {
              id: `pay_${Date.now()}_init`,
              amount: invoiceData.amountPaid,
              date: invoiceData.date || new Date().toISOString().split('T')[0],
              method: (invoiceData.paymentMethod || 'Cash') as PaymentInstallment['method'],
              receiptNumber: `RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
              notes: 'Initial Payment / Deposit at Invoice Generation',
              recordedBy: currentUser.name,
            },
          ]
        : [];

    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      tenantId: currentTenantId,
      installments: initialInstallments,
    };
    setAllInvoices((prev) => [newInvoice, ...prev]);

    // Synchronize Patient Balance: add unpaid balance to patient
    if (newInvoice.balance > 0) {
      setAllPatients((prev) =>
        prev.map((p) =>
          p.id === newInvoice.patientId
            ? { ...p, balance: (p.balance || 0) + newInvoice.balance }
            : p
        )
      );
    }

    logAuditEvent('INVOICE_CREATED', 'Invoice', newInvoice.id, `Generated invoice ${newInvoice.invoiceNumber} for ₹${newInvoice.amount.toLocaleString()} (${newInvoice.patientName})`);
    return newInvoice;
  };

  const addInvoicePayment = (
    invoiceId: string,
    payment: {
      amount: number;
      method: PaymentInstallment['method'];
      notes?: string;
    }
  ) => {
    let targetPatientId = '';
    let appliedPayment = 0;

    setAllInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          targetPatientId = inv.patientId;
          const currentPaid = inv.amountPaid || 0;
          const remainingBalance = Math.max(0, inv.amount - currentPaid);

          // Prevent overpayments: clamp payment to remaining balance
          appliedPayment = Math.min(Math.max(0, payment.amount), remainingBalance);
          if (appliedPayment <= 0) return inv;

          const newAmountPaid = currentPaid + appliedPayment;
          const newBalance = Math.max(0, inv.amount - newAmountPaid);
          const newInstallment: PaymentInstallment = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            amount: appliedPayment,
            date: new Date().toISOString().split('T')[0],
            method: payment.method,
            receiptNumber: `RCP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            notes: payment.notes,
            recordedBy: currentUser.name,
          };
          const updatedInstallments = [...(inv.installments || []), newInstallment];

          return {
            ...inv,
            amountPaid: newAmountPaid,
            balance: newBalance,
            status: (newBalance === 0 ? 'Paid' : 'Pending') as Invoice['status'],
            paymentMethod: payment.method,
            installments: updatedInstallments,
          };
        }
        return inv;
      })
    );

    // Synchronize Patient Balance: reduce balance by actual applied payment
    if (appliedPayment > 0 && targetPatientId) {
      setAllPatients((prev) =>
        prev.map((p) =>
          p.id === targetPatientId
            ? { ...p, balance: Math.max(0, (p.balance || 0) - appliedPayment) }
            : p
        )
      );
    }

    logAuditEvent(
      'PAYMENT_RECORDED',
      'Invoice',
      invoiceId,
      `Recorded payment installment of ₹${appliedPayment.toLocaleString()} via ${payment.method}`
    );
  };

  const markInvoicePaid = (id: string, paymentMethod: Invoice['paymentMethod'] = 'Credit Card') => {
    let paidAmount = 0;
    let pId = '';

    setAllInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === id) {
          paidAmount = inv.balance;
          pId = inv.patientId;
          const newInstallment: PaymentInstallment = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            amount: paidAmount,
            date: new Date().toISOString().split('T')[0],
            method: paymentMethod || 'Credit Card',
            notes: 'Full payment balance cleared',
            recordedBy: currentUser.name,
          };
          return {
            ...inv,
            amountPaid: inv.amount,
            balance: 0,
            status: 'Paid',
            paymentMethod,
            installments: [...(inv.installments || []), newInstallment],
          };
        }
        return inv;
      })
    );

    // Synchronize Patient Balance: reduce balance by paid amount
    if (paidAmount > 0 && pId) {
      setAllPatients((prev) =>
        prev.map((p) =>
          p.id === pId ? { ...p, balance: Math.max(0, (p.balance || 0) - paidAmount) } : p
        )
      );
    }

    logAuditEvent('PAYMENT_RECORDED', 'Invoice', id, `Settled invoice fully (₹${paidAmount.toLocaleString()}) via ${paymentMethod}`);
  };

  const deleteInvoice = (id: string) => {
    const toDelete = allInvoices.find((i) => i.id === id);
    setAllInvoices((prev) => prev.filter((inv) => inv.id !== id));
    logAuditEvent('INVOICE_DELETED', 'Invoice', id, 'Deleted invoice record.');

    // If invoice had an unpaid balance, deduct it from patient's balance
    if (toDelete && toDelete.balance > 0) {
      setAllPatients((prev) =>
        prev.map((p) =>
          p.id === toDelete.patientId
            ? { ...p, balance: Math.max(0, (p.balance || 0) - toDelete.balance) }
            : p
        )
      );
    }
  };

  const logAuditEvent = (
    action: AuditAction,
    resourceType: AuditLogEntry['resourceType'],
    resourceId?: string,
    details?: string
  ) => {
    const entry: AuditLogEntry = {
      id: `audit_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      tenantId: currentTenantId,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      userId: currentUser.id,
      userName: currentUser.name,
      userRole: currentUser.role,
      action,
      resourceType,
      resourceId,
      details: details || '',
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  const addPrescription = (
    data: Omit<DentalPrescription, 'id' | 'createdAt' | 'tenantId'>
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
      `Issued e-Rx for ${newRx.patientName} (${newRx.items.length} prescribed items)`
    );
    return newRx;
  };

  const deletePrescription = (id: string) => {
    setAllPrescriptions((prev) => prev.filter((p) => p.id !== id));
    logAuditEvent('PRESCRIPTION_DELETED', 'Prescription', id, 'Deleted prescription record');
  };

  const addRadiograph = (
    data: Omit<DentalRadiograph, 'id' | 'tenantId'>
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
      `Uploaded ${newRad.category}: ${newRad.title}`
    );
    return newRad;
  };

  const deleteRadiograph = (id: string) => {
    setAllRadiographs((prev) => prev.filter((r) => r.id !== id));
    logAuditEvent('RADIOGRAPH_DELETED', 'Radiograph', id, 'Deleted radiograph record');
  };

  const savePerioChart = (
    chart: Omit<PeriodontalChart, 'id' | 'tenantId'> & { id?: string }
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
      `Updated periodontal probing exam on ${newChart.examDate}`
    );
    return newChart;
  };

  const addTreatmentPlan = (
    data: Omit<PatientTreatmentPlan, 'id' | 'tenantId'>
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
      `Created treatment plan: ${newPlan.title}`
    );
    return newPlan;
  };

  const updateTreatmentPlanItemStatus = (
    planId: string,
    phaseId: string,
    itemId: string,
    status: TreatmentPlanItem['status']
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

        // Recalculate acceptedFee
        const acceptedFee = updatedPhases.reduce(
          (sum, ph) =>
            sum +
            ph.items
              .filter(
                (it) =>
                  it.status === 'Accepted' ||
                  it.status === 'In-Progress' ||
                  it.status === 'Completed'
              )
              .reduce((s, it) => s + it.estimatedFee, 0),
          0
        );

        return { ...plan, phases: updatedPhases, acceptedFee };
      })
    );
    logAuditEvent('TREATMENT_PLAN_UPDATED', 'TreatmentPlan', planId, `Updated procedure status to ${status}`);
  };

  const acceptTreatmentPlan = (planId: string) => {
    setAllTreatmentPlans((prev) =>
      prev.map((plan) => {
        if (plan.id !== planId) return plan;
        const updatedPhases = plan.phases.map((phase) => ({
          ...phase,
          items: phase.items.map((it) =>
            it.status === 'Proposed' ? { ...it, status: 'Accepted' as const } : it
          ),
        }));
        return {
          ...plan,
          phases: updatedPhases,
          status: 'Accepted' as const,
          patientAcceptedDate: new Date().toISOString().split('T')[0],
          acceptedFee: plan.totalEstimatedFee,
        };
      })
    );
    logAuditEvent('TREATMENT_PLAN_UPDATED', 'TreatmentPlan', planId, 'Patient accepted multi-phase treatment plan');
  };

  // Waiting Room Queue Actions
  const markPatientArrived = (appointmentId: string) => {
    const nowIso = new Date().toISOString();
    setAllAppointments((prev) =>
      prev.map((a) => {
        if (a.id === appointmentId) {
          logAuditEvent(
            'PATIENT_CHECKED_IN',
            'Appointment',
            appointmentId,
            `Patient ${a.patientName} arrived at reception for ${a.serviceName} with ${a.doctorName}`
          );
          return {
            ...a,
            status: 'Arrived' as const,
            arrivedAt: nowIso,
          };
        }
        return a;
      })
    );
  };

  const assignChairAndSeat = (appointmentId: string, operatoryChair: string) => {
    const nowIso = new Date().toISOString();
    setAllAppointments((prev) =>
      prev.map((a) => {
        if (a.id === appointmentId) {
          logAuditEvent(
            'PATIENT_SEATED',
            'Appointment',
            appointmentId,
            `Patient ${a.patientName} seated in ${operatoryChair} for ${a.serviceName}`
          );
          return {
            ...a,
            status: 'In-Chair' as const,
            operatoryChair,
            inChairAt: nowIso,
          };
        }
        return a;
      })
    );
  };

  // Operatory Chair Scaling & Configuration
  const addOperatoryChair = (
    name: string,
    chairType: OperatoryChairType,
    roomNumber?: string
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
      `Configured new operatory [${newChair.name}] (${chairType}, ${roomNumber || 'No room'})`
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
      })
    );
  };

  const deleteOperatoryChair = (id: string): { success: boolean; message?: string } => {
    const chair = allOperatoryChairs.find((c) => c.id === id);
    if (!chair) return { success: false, message: 'Chair not found.' };

    const inChairApt = appointments.find(
      (a) => a.operatoryChair === chair.name && a.status === 'In-Chair'
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

  // Insurance Claims & Backup Restore Actions
  const updateInvoiceInsuranceClaim = (
    invoiceId: string,
    claimData: Partial<NonNullable<Invoice['insuranceClaim']>>
  ) => {
    setAllInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const currentClaim = inv.insuranceClaim || {
            claimId: `CLM-${Date.now().toString().slice(-6)}`,
            status: 'Draft' as const,
            payerName: 'Star Health Insurance',
            claimedAmount: inv.amount,
          };
          const updatedClaim = { ...currentClaim, ...claimData };

          if (claimData.status === 'Settled' && claimData.approvedAmount) {
            logAuditEvent(
              'CLAIM_SETTLED',
              'Claim',
              updatedClaim.claimId,
              `Insurance claim settled: ₹${claimData.approvedAmount.toLocaleString()} approved by ${updatedClaim.payerName}`
            );
          } else if (claimData.status === 'Submitted') {
            logAuditEvent(
              'CLAIM_SUBMITTED',
              'Claim',
              updatedClaim.claimId,
              `Submitted claim of ₹${updatedClaim.claimedAmount.toLocaleString()} to ${updatedClaim.payerName}`
            );
          }

          return {
            ...inv,
            insuranceClaim: updatedClaim,
          };
        }
        return inv;
      })
    );
  };

  const restoreBackupData = (backupData: any): { success: boolean; message?: string } => {
    try {
      const targetClinicId = currentTenantId;
      if (!targetClinicId) {
        return { success: false, message: 'No active clinic selected for restoration.' };
      }

      // 1. Isolate Patients: Replace only records for this clinic tenant
      if (backupData.patients && Array.isArray(backupData.patients)) {
        setAllPatients((prev) => [
          ...prev.filter((p) => p.tenantId !== targetClinicId),
          ...backupData.patients.map((p: any) => ({ ...p, tenantId: targetClinicId })),
        ]);
      }

      // 2. Isolate Appointments
      if (backupData.appointments && Array.isArray(backupData.appointments)) {
        setAllAppointments((prev) => [
          ...prev.filter((apt) => apt.tenantId !== targetClinicId),
          ...backupData.appointments.map((apt: any) => ({ ...apt, tenantId: targetClinicId })),
        ]);
      }

      // 3. Isolate Clinical Notes
      if (backupData.clinicalNotes && Array.isArray(backupData.clinicalNotes)) {
        setAllClinicalNotes((prev) => [
          ...prev.filter((cn) => cn.tenantId !== targetClinicId),
          ...backupData.clinicalNotes.map((cn: any) => ({ ...cn, tenantId: targetClinicId })),
        ]);
      }

      // 4. Isolate Invoices
      if (backupData.invoices && Array.isArray(backupData.invoices)) {
        setAllInvoices((prev) => [
          ...prev.filter((inv) => inv.tenantId !== targetClinicId),
          ...backupData.invoices.map((inv: any) => ({ ...inv, tenantId: targetClinicId })),
        ]);
      }

      // 5. Isolate Prescriptions
      if (backupData.prescriptions && Array.isArray(backupData.prescriptions)) {
        setAllPrescriptions((prev) => [
          ...prev.filter((pr) => pr.tenantId !== targetClinicId),
          ...backupData.prescriptions.map((pr: any) => ({ ...pr, tenantId: targetClinicId })),
        ]);
      }

      // 6. Isolate Radiographs
      if (backupData.radiographs && Array.isArray(backupData.radiographs)) {
        setAllRadiographs((prev) => [
          ...prev.filter((rg) => rg.tenantId !== targetClinicId),
          ...backupData.radiographs.map((rg: any) => ({ ...rg, tenantId: targetClinicId })),
        ]);
      }

      // 7. Isolate Perio Charts
      if (backupData.perioCharts && Array.isArray(backupData.perioCharts)) {
        setAllPerioCharts((prev) => [
          ...prev.filter((pc) => pc.tenantId !== targetClinicId),
          ...backupData.perioCharts.map((pc: any) => ({ ...pc, tenantId: targetClinicId })),
        ]);
      }

      // 8. Isolate Treatment Plans
      if (backupData.treatmentPlans && Array.isArray(backupData.treatmentPlans)) {
        setAllTreatmentPlans((prev) => [
          ...prev.filter((tp) => tp.tenantId !== targetClinicId),
          ...backupData.treatmentPlans.map((tp: any) => ({ ...tp, tenantId: targetClinicId })),
        ]);
      }

      // 9. Isolate Operatory Chairs
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
        `Successfully restored clinic data archive for tenant ${targetClinicId}`
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
        clinicalNotes,
        invoices,
        systemHealth,
        auditLogs: isSuperAdmin ? auditLogs : auditLogs.filter((a) => a.tenantId === currentTenantId),
        prescriptions,
        radiographs,
        perioCharts,
        treatmentPlans,
        operatoryChairs,
        allPatients,
        allAppointments,
        allInvoices,
        allServices,
        allPrescriptions,
        allRadiographs,
        allPerioCharts,
        allTreatmentPlans,
        allOperatoryChairs,
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
        logAuditEvent,
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
