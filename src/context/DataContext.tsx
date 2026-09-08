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
} from '../types';
import {
  initialPatients,
  initialServices,
  initialClinicalNotes,
  getInitialAppointments,
  initialInvoices,
  initialSystemHealth,
} from '../data/mockData';
import { useAuth } from './AuthContext';

interface DataContextType {
  // Scoped lists
  patients: Patient[];
  appointments: Appointment[];
  services: DentalService[];
  clinicalNotes: ClinicalNote[];
  invoices: Invoice[];
  systemHealth: SystemHealth;
  auditLogs: AuditLogEntry[];

  // Global lists (for Super Admin)
  allPatients: Patient[];
  allAppointments: Appointment[];
  allInvoices: Invoice[];
  allServices: DentalService[];

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

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('dentrix_patients', JSON.stringify(allPatients));
  }, [allPatients]);

  useEffect(() => {
    localStorage.setItem('dentrix_appointments', JSON.stringify(allAppointments));
  }, [allAppointments]);

  useEffect(() => {
    localStorage.setItem('dentrix_services', JSON.stringify(allServices));
  }, [allServices]);

  useEffect(() => {
    localStorage.setItem('dentrix_clinical_notes', JSON.stringify(allClinicalNotes));
  }, [allClinicalNotes]);

  useEffect(() => {
    localStorage.setItem('dentrix_invoices', JSON.stringify(allInvoices));
  }, [allInvoices]);

  useEffect(() => {
    localStorage.setItem('dentrix_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('dentrix_system_health', JSON.stringify(systemHealth));
  }, [systemHealth]);

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
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      tenantId: currentTenantId,
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
    const paymentAmount = Math.max(0, payment.amount);

    setAllInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          targetPatientId = inv.patientId;
          const currentPaid = inv.amountPaid || 0;
          const newAmountPaid = currentPaid + paymentAmount;
          const newBalance = Math.max(0, inv.amount - newAmountPaid);
          const newInstallment: PaymentInstallment = {
            id: `pay_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
            amount: paymentAmount,
            date: new Date().toISOString().split('T')[0],
            method: payment.method,
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

    // Synchronize Patient Balance: reduce balance by paymentAmount
    if (paymentAmount > 0 && targetPatientId) {
      setAllPatients((prev) =>
        prev.map((p) =>
          p.id === targetPatientId
            ? { ...p, balance: Math.max(0, (p.balance || 0) - paymentAmount) }
            : p
        )
      );
    }

    logAuditEvent(
      'PAYMENT_RECORDED',
      'Invoice',
      invoiceId,
      `Recorded payment installment of ₹${paymentAmount.toLocaleString()} via ${payment.method}`
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
        allPatients,
        allAppointments,
        allInvoices,
        allServices,
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
