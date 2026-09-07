import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Patient,
  Appointment,
  DentalService,
  ClinicalNote,
  Invoice,
  SystemHealth,
  AppointmentStatus,
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

  // Global lists (for Super Admin)
  allPatients: Patient[];
  allAppointments: Appointment[];
  allInvoices: Invoice[];

  // Mutations
  addPatient: (patientData: Omit<Patient, 'id' | 'createdAt' | 'tenantId'>) => Patient;
  updatePatient: (patient: Patient) => void;
  addAppointment: (appointmentData: Omit<Appointment, 'id' | 'tenantId'>) => Appointment;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  addClinicalNote: (noteData: Omit<ClinicalNote, 'id' | 'tenantId' | 'signedAt'>) => ClinicalNote;
  addService: (serviceData: Omit<DentalService, 'id' | 'tenantId'>) => DentalService;
  updateService: (service: DentalService) => void;
  toggleServiceActive: (id: string) => void;
  addInvoice: (invoiceData: Omit<Invoice, 'id' | 'tenantId'>) => Invoice;
  markInvoicePaid: (id: string, paymentMethod?: Invoice['paymentMethod']) => void;
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
    return newPatient;
  };

  const updatePatient = (updated: Patient) => {
    setAllPatients((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
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

    return newAppointment;
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus) => {
    setAllAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
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
    return newNote;
  };

  const addService = (serviceData: Omit<DentalService, 'id' | 'tenantId'>): DentalService => {
    const newService: DentalService = {
      ...serviceData,
      id: `srv_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllServices((prev) => [...prev, newService]);
    return newService;
  };

  const updateService = (updated: DentalService) => {
    setAllServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const toggleServiceActive = (id: string) => {
    setAllServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, isActive: !s.isActive } : s))
    );
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'tenantId'>): Invoice => {
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      tenantId: currentTenantId,
    };
    setAllInvoices((prev) => [newInvoice, ...prev]);
    return newInvoice;
  };

  const markInvoicePaid = (id: string, paymentMethod: Invoice['paymentMethod'] = 'Credit Card') => {
    setAllInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? {
              ...inv,
              amountPaid: inv.amount,
              balance: 0,
              status: 'Paid',
              paymentMethod,
            }
          : inv
      )
    );
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
        allPatients,
        allAppointments,
        allInvoices,
        addPatient,
        updatePatient,
        addAppointment,
        updateAppointmentStatus,
        addClinicalNote,
        addService,
        updateService,
        toggleServiceActive,
        addInvoice,
        markInvoicePaid,
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
