import {
  ClinicTenant,
  User,
  Patient,
  ClinicalNote,
  DentalService,
  Appointment,
  Invoice,
  SystemHealth,
  DentalPrescription,
  DentalRadiograph,
  PerioToothRecord,
  PeriodontalChart,
  PatientTreatmentPlan,
  OperatoryChairConfig,
} from '../types';

export const initialTenants: ClinicTenant[] = [
  {
    id: 'tenant_apex',
    name: 'Apex Dental Studio',
    slug: 'apex-dental',
    address: '742 Evergreen Terrace, Suite 300, Austin, TX',
    phone: '(512) 555-0198',
    email: 'contact@apexdental.com',
    status: 'active',
    doctorAdminName: 'Dr. Sarah Vance, DDS',
    doctorAdminEmail: 'dr.vance@apexdental.com',
    storageMb: 1420,
    plan: 'Enterprise',
    subscription: {
      plan: 'Enterprise',
      status: 'Active',
      billingCycle: 'Annual',
      monthlyFee: 31999,
      chairLimit: 12,
      renewalDate: '2025-01-15',
      autoRenew: true,
    },
    createdAt: '2024-01-15',
  },
  {
    id: 'tenant_radiant',
    name: 'Radiant Smile Dental',
    slug: 'radiant-smile',
    address: '1204 Pine Crest Blvd, Denver, CO',
    phone: '(303) 555-4821',
    email: 'admin@radiantsmile.com',
    status: 'active',
    doctorAdminName: 'Dr. Julian Martinez, DMD',
    doctorAdminEmail: 'dr.martinez@radiantsmile.com',
    storageMb: 890,
    plan: 'Professional',
    subscription: {
      plan: 'Professional',
      status: 'Active',
      billingCycle: 'Monthly',
      monthlyFee: 15999,
      chairLimit: 6,
      renewalDate: '2024-10-20',
      autoRenew: true,
    },
    createdAt: '2024-03-20',
  },
];

export const initialUsers: User[] = [
  {
    id: 'user_super_admin',
    tenantId: null,
    name: 'Arthur Pendelton',
    email: 'superadmin@dentrixplatform.io',
    role: 'SUPER_ADMIN',
    title: 'Platform Infrastructure Lead',
    permissions: {
      canManageAppointments: true,
      canManagePatients: true,
      canWriteDoctorNotes: true,
      canViewRevenue: true,
      canManageServices: true,
      canManageStaff: true,
    },
    status: 'active',
    joinedAt: '2023-11-01',
  },
  {
    id: 'user_apex_doctor',
    tenantId: 'tenant_apex',
    name: 'Dr. Sarah Vance, DDS',
    email: 'dr.vance@apexdental.com',
    role: 'DOCTOR_ADMIN',
    title: 'Lead Dental Surgeon & Clinic Owner',
    phone: '(512) 555-0199',
    permissions: {
      canManageAppointments: true,
      canManagePatients: true,
      canWriteDoctorNotes: true,
      canViewRevenue: true,
      canManageServices: true,
      canManageStaff: true,
    },
    status: 'active',
    joinedAt: '2024-01-15',
  },
  {
    id: 'user_apex_receptionist',
    tenantId: 'tenant_apex',
    name: 'Emma Robinson',
    email: 'emma.reception@apexdental.com',
    role: 'STAFF',
    title: 'Lead Front Desk Coordinator',
    phone: '(512) 555-0177',
    permissions: {
      canManageAppointments: true,
      canManagePatients: true,
      canWriteDoctorNotes: false,
      canViewRevenue: false, // Scoped: restricted from revenue reports
      canManageServices: false,
      canManageStaff: false,
    },
    status: 'active',
    joinedAt: '2024-02-01',
  },
  {
    id: 'user_apex_hygienist',
    tenantId: 'tenant_apex',
    name: 'Marcus Lee, RDH',
    email: 'marcus.hygiene@apexdental.com',
    role: 'STAFF',
    title: 'Registered Dental Hygienist',
    phone: '(512) 555-0164',
    permissions: {
      canManageAppointments: true,
      canManagePatients: true,
      canWriteDoctorNotes: true,
      canViewRevenue: false,
      canManageServices: false,
      canManageStaff: false,
    },
    status: 'active',
    joinedAt: '2024-02-15',
  },
  {
    id: 'user_radiant_doctor',
    tenantId: 'tenant_radiant',
    name: 'Dr. Julian Martinez, DMD',
    email: 'dr.martinez@radiantsmile.com',
    role: 'DOCTOR_ADMIN',
    title: 'Doctor Owner & Cosmetic Specialist',
    phone: '(303) 555-4822',
    permissions: {
      canManageAppointments: true,
      canManagePatients: true,
      canWriteDoctorNotes: true,
      canViewRevenue: true,
      canManageServices: true,
      canManageStaff: true,
    },
    status: 'active',
    joinedAt: '2024-03-20',
  },
];

export const initialServices: DentalService[] = [
  {
    id: 'srv_1',
    tenantId: 'tenant_apex',
    code: 'D0120',
    name: 'Periodic Oral Evaluation',
    category: 'Preventive',
    durationMinutes: 30,
    basePrice: 500,
    description: 'Comprehensive evaluation established patient including cancer screening and soft tissue assessment.',
    isActive: true,
  },
  {
    id: 'srv_2',
    tenantId: 'tenant_apex',
    code: 'D1110',
    name: 'Prophylaxis (Adult Cleaning)',
    category: 'Preventive',
    durationMinutes: 45,
    basePrice: 1200,
    description: 'Removal of plaque, calculus, and stains from tooth structures in the permanent and transitional dentition.',
    isActive: true,
  },
  {
    id: 'srv_3',
    tenantId: 'tenant_apex',
    code: 'D2391',
    name: 'Resin Composite - 1 Surface (Posterior)',
    category: 'Restorative',
    durationMinutes: 60,
    basePrice: 2000,
    description: 'Direct tooth-colored light-cured composite resin filling on one tooth surface.',
    isActive: true,
  },
  {
    id: 'srv_4',
    tenantId: 'tenant_apex',
    code: 'D2740',
    name: 'Porcelain/Ceramic Crown',
    category: 'Restorative',
    durationMinutes: 90,
    basePrice: 8500,
    description: 'Full-coverage all-ceramic high translucent crown custom fabricated for posterior or anterior tooth.',
    isActive: true,
  },
  {
    id: 'srv_5',
    tenantId: 'tenant_apex',
    code: 'D3330',
    name: 'Molar Endodontic Therapy (Root Canal)',
    category: 'Endodontics',
    durationMinutes: 90,
    basePrice: 6500,
    description: 'Complete mechanical and chemical debridement and gutta-percha obturation of molar pulp canal system.',
    isActive: true,
  },
  {
    id: 'srv_6',
    tenantId: 'tenant_apex',
    code: 'D7140',
    name: 'Extraction of Erupted Tooth',
    category: 'Oral Surgery',
    durationMinutes: 45,
    basePrice: 1500,
    description: 'Simple surgical extraction of exposed tooth or residual root with local anesthesia.',
    isActive: true,
  },
  {
    id: 'srv_7',
    tenantId: 'tenant_apex',
    code: 'D4341',
    name: 'Periodontal Scaling & Root Planing (per quad)',
    category: 'Periodontics',
    durationMinutes: 60,
    basePrice: 3000,
    description: 'Deep therapeutic root instrumentation for active pocket reduction and biofilm elimination.',
    isActive: true,
  },
  {
    id: 'srv_8',
    tenantId: 'tenant_apex',
    code: 'D8080',
    name: 'Comprehensive Orthodontic Consultation & Scan',
    category: 'Orthodontics',
    durationMinutes: 45,
    basePrice: 2500,
    description: 'Full 3D intraoral digital scan and clear aligner treatment simulation.',
    isActive: true,
  },
];

export const initialPatients: Patient[] = [
  {
    id: 'pat_1',
    tenantId: 'tenant_apex',
    firstName: 'Eleanor',
    lastName: 'Rigby',
    email: 'eleanor.rigby@gmail.com',
    phone: '(512) 839-4412',
    dateOfBirth: '1988-06-14',
    gender: 'Female',
    address: '4502 South Congress Ave, Austin, TX',
    insurance: {
      provider: 'Delta Dental Premier',
      policyNumber: 'DEL-8839210',
      groupNumber: 'GRP-9901',
    },
    emergencyContact: {
      name: 'Thomas Rigby',
      phone: '(512) 839-4413',
      relationship: 'Spouse',
    },
    medicalAlerts: ['Penicillin Allergy', 'Mitral Valve Prolapse'],
    balance: 0,
    lastVisit: '2024-09-01',
    nextVisit: '2024-09-08',
    status: 'Active',
    createdAt: '2023-05-12',
  },
  {
    id: 'pat_2',
    tenantId: 'tenant_apex',
    firstName: 'David',
    lastName: 'Holloway',
    email: 'dholloway@austintech.io',
    phone: '(512) 991-3044',
    dateOfBirth: '1976-11-23',
    gender: 'Male',
    address: '1802 Barton Springs Rd, Austin, TX',
    insurance: {
      provider: 'MetLife Dental Preferred',
      policyNumber: 'MET-4410294',
      groupNumber: 'TECH-400',
    },
    emergencyContact: {
      name: 'Sarah Holloway',
      phone: '(512) 991-3045',
      relationship: 'Wife',
    },
    medicalAlerts: ['Hypertension (Lisinopril 10mg)'],
    balance: 2000,
    lastVisit: '2024-08-15',
    nextVisit: '2024-09-08',
    status: 'Active',
    createdAt: '2023-08-19',
  },
  {
    id: 'pat_3',
    tenantId: 'tenant_apex',
    firstName: 'Chloe',
    lastName: 'Kowalski',
    email: 'chloe.k@outlook.com',
    phone: '(512) 420-9118',
    dateOfBirth: '1995-03-08',
    gender: 'Female',
    address: '908 East 6th Street, Austin, TX',
    insurance: {
      provider: 'Cigna Dental Health',
      policyNumber: 'CIG-1002934',
      groupNumber: 'CIG-882',
    },
    emergencyContact: {
      name: 'Jan Kowalski',
      phone: '(512) 420-9119',
      relationship: 'Father',
    },
    medicalAlerts: ['Latex Sensitivity'],
    balance: 0,
    lastVisit: '2024-07-22',
    nextVisit: '2024-09-09',
    status: 'Active',
    createdAt: '2024-01-10',
  },
  {
    id: 'pat_4',
    tenantId: 'tenant_apex',
    firstName: 'Mateo',
    lastName: 'Vasquez',
    email: 'mateo.v@gmail.com',
    phone: '(512) 774-8219',
    dateOfBirth: '1991-09-30',
    gender: 'Male',
    address: '3200 Guadalupe St, Austin, TX',
    insurance: {
      provider: 'Guardian DentalGuard',
      policyNumber: 'GDG-551042',
      groupNumber: 'AUSTIN-01',
    },
    emergencyContact: {
      name: 'Carmen Vasquez',
      phone: '(512) 774-8220',
      relationship: 'Mother',
    },
    medicalAlerts: [],
    balance: 4500,
    lastVisit: '2024-06-10',
    nextVisit: '2024-09-08',
    status: 'Active',
    createdAt: '2024-02-05',
  },
  {
    id: 'pat_5',
    tenantId: 'tenant_apex',
    firstName: 'Aria',
    lastName: 'Montgomery',
    email: 'aria.m@rosewood.net',
    phone: '(512) 662-3901',
    dateOfBirth: '2001-12-05',
    gender: 'Female',
    address: '1410 Manor Rd, Austin, TX',
    insurance: {
      provider: 'Aetna Dental PPO',
      policyNumber: 'AET-994812',
      groupNumber: 'GRP-22',
    },
    emergencyContact: {
      name: 'Byron Montgomery',
      phone: '(512) 662-3902',
      relationship: 'Father',
    },
    medicalAlerts: ['Asthma (Albuterol PRN)'],
    balance: 0,
    lastVisit: '2024-08-28',
    nextVisit: '2024-09-10',
    status: 'Active',
    createdAt: '2024-04-12',
  },
];

export const initialClinicalNotes: ClinicalNote[] = [
  {
    id: 'note_1',
    tenantId: 'tenant_apex',
    patientId: 'pat_2',
    doctorId: 'user_apex_doctor',
    doctorName: 'Dr. Sarah Vance, DDS',
    date: '2024-08-15',
    toothNumber: '#19 (Mandibular Left First Molar)',
    procedureName: 'Resin Composite - 1 Surface (D2391)',
    diagnosis: 'Recurrent occlusal decay under fractured amalgam margin.',
    notes: 'Administered 1 carpule Septocaine 4% with 1:100,000 epi via IAN block. Achieved profound anesthesia. Placed rubber dam isolation. Excavated active caries using #4 round carbide bur. Etched for 15 sec with 37% phosphoric acid, Prime&Bond applied and cured. Placed Filtek Supreme A2 composite in 2mm increments. Finished with fine diamonds and Enhance polishing cups. Occlusion checked with 40um articulating paper in centric and lateral excursions — clear.',
    treatmentPlanSummary: 'Recommend ceramic crown (#19) if lingual cusp shows future micro-fracture.',
    vitals: {
      bloodPressure: '124/82 mmHg',
      pulseRate: '72 bpm',
    },
    doctorSignature: 'Dr. Sarah Vance, DDS (License #TX-48921)',
    signedAt: '2024-08-15 14:35',
  },
  {
    id: 'note_2',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    doctorId: 'user_apex_doctor',
    doctorName: 'Dr. Sarah Vance, DDS',
    date: '2024-09-01',
    toothNumber: 'Full Mouth / Preventive',
    procedureName: 'Periodic Evaluation & Prophylaxis (D0120 & D1110)',
    diagnosis: 'Generalized mild marginal gingivitis; no active carious lesions detected.',
    notes: 'Full mouth periodontal charting completed by Marcus RDH. Pockets range 2-3mm with isolated 4mm mesial of #30 with bleeding upon probing. Supra-gingival calculus removed using ultrasonic scaler and hand curettes. Polished with fine mint prophy paste. Fluoride varnish applied. Reviewed Bass brushing technique and daily interdental flossing.',
    treatmentPlanSummary: '6-month recall routine maintenance scheduled.',
    vitals: {
      bloodPressure: '116/74 mmHg',
      pulseRate: '68 bpm',
    },
    doctorSignature: 'Dr. Sarah Vance, DDS (License #TX-48921)',
    signedAt: '2024-09-01 11:15',
  },
];

export const getInitialAppointments = (): Appointment[] => {
  const today = new Date().toISOString().split('T')[0];
  return [
    {
      id: 'apt_1',
      tenantId: 'tenant_apex',
      patientId: 'pat_1',
      patientName: 'Eleanor Rigby',
      patientPhone: '(512) 839-4412',
      doctorId: 'user_apex_doctor',
      doctorName: 'Dr. Sarah Vance, DDS',
      serviceId: 'srv_2',
      serviceName: 'Prophylaxis (Adult Cleaning)',
      procedureCode: 'D1110',
      date: today,
      startTime: '09:00',
      endTime: '09:45',
      durationMinutes: 45,
      operatoryChair: 'Chair 1 - Hygiene',
      status: 'In-Chair',
      notes: 'Patient arrived early. Mentioned sensitivity on lower right.',
      fee: 1200,
      arrivedAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      inChairAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: 'apt_2',
      tenantId: 'tenant_apex',
      patientId: 'pat_2',
      patientName: 'David Holloway',
      patientPhone: '(512) 991-3044',
      doctorId: 'user_apex_doctor',
      doctorName: 'Dr. Sarah Vance, DDS',
      serviceId: 'srv_3',
      serviceName: 'Resin Composite - 1 Surface',
      procedureCode: 'D2391',
      date: today,
      startTime: '10:00',
      endTime: '11:00',
      durationMinutes: 60,
      operatoryChair: 'Chair 2 - Surgery',
      status: 'Arrived',
      notes: 'Follow-up for tooth #19 restoration check.',
      fee: 2000,
      arrivedAt: new Date(Date.now() - 19 * 60 * 1000).toISOString(),
    },
    {
      id: 'apt_3',
      tenantId: 'tenant_apex',
      patientId: 'pat_4',
      patientName: 'Mateo Vasquez',
      patientPhone: '(512) 774-8219',
      doctorId: 'user_apex_doctor',
      doctorName: 'Dr. Sarah Vance, DDS',
      serviceId: 'srv_5',
      serviceName: 'Molar Endodontic Therapy',
      procedureCode: 'D3330',
      date: today,
      startTime: '13:30',
      endTime: '15:00',
      durationMinutes: 90,
      operatoryChair: 'Chair 2 - Surgery',
      status: 'Scheduled',
      notes: 'Severe nocturnal throbbing pain on tooth #30.',
      fee: 6500,
    },
    {
      id: 'apt_4',
      tenantId: 'tenant_apex',
      patientId: 'pat_3',
      patientName: 'Chloe Kowalski',
      patientPhone: '(512) 420-9118',
      doctorId: 'user_apex_doctor',
      doctorName: 'Dr. Sarah Vance, DDS',
      serviceId: 'srv_8',
      serviceName: 'Comprehensive Orthodontic Consultation',
      procedureCode: 'D8080',
      date: today,
      startTime: '15:30',
      endTime: '16:15',
      durationMinutes: 45,
      operatoryChair: 'Chair 3 - General',
      status: 'Scheduled',
      notes: 'Interested in clear aligner therapy for anterior crowding.',
      fee: 2500,
    },
    {
      id: 'apt_5',
      tenantId: 'tenant_apex',
      patientId: 'pat_5',
      patientName: 'Aria Montgomery',
      patientPhone: '(512) 662-3901',
      doctorId: 'user_apex_doctor',
      doctorName: 'Dr. Sarah Vance, DDS',
      serviceId: 'srv_1',
      serviceName: 'Periodic Oral Evaluation',
      procedureCode: 'D0120',
      date: today,
      startTime: '11:15',
      endTime: '11:45',
      durationMinutes: 30,
      operatoryChair: 'Chair 1 - Hygiene',
      status: 'Completed',
      notes: 'Clean checkup, no new issues.',
      fee: 500,
    },
  ];
};

export const initialInvoices: Invoice[] = [
  {
    id: 'inv_101',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00101',
    patientId: 'pat_5',
    patientName: 'Aria Montgomery',
    serviceName: 'Periodic Oral Evaluation (D0120)',
    subtotal: 500,
    amount: 500,
    amountPaid: 500,
    balance: 0,
    date: '2024-09-07',
    dueDate: '2024-09-07',
    status: 'Paid',
    paymentMethod: 'UPI / Bank',
    installments: [
      {
        id: 'inst_1',
        amount: 500,
        date: '2024-09-07',
        method: 'UPI / Bank',
        recordedBy: 'Dr. Sarah Vance, DDS',
        notes: 'UPI Ref: 429188201290 (GPay)',
      },
    ],
  },
  {
    id: 'inv_102',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00102',
    patientId: 'pat_2',
    patientName: 'David Holloway',
    serviceName: 'Resin Composite 1 Surface (D2391)',
    subtotal: 2000,
    amount: 2000,
    amountPaid: 0,
    balance: 2000,
    date: '2024-09-07',
    dueDate: '2024-09-21',
    status: 'Pending',
    insuranceClaim: {
      claimId: 'claim_102',
      claimNumber: 'CLM-784012',
      payerName: 'Niva Bupa Health Insurance',
      policyNumber: 'NB-IND-88192-X',
      claimedAmount: 2000,
      approvedAmount: 1600,
      coPayAmount: 400,
      submissionDate: '2024-09-08',
      status: 'Under Review',
      diagnosisCode: 'K02.1 Dental Caries',
      preAuthNumber: 'PA-NB-9041',
      notes: 'Pre-auth requested for posterior resin restoration.',
    },
  },
  {
    id: 'inv_103',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00103',
    patientId: 'pat_4',
    patientName: 'Mateo Vasquez',
    serviceName: 'Periodontal Scaling & Planing (D4341)',
    subtotal: 6667,
    discountType: 'percentage',
    discountValue: 10,
    discountAmount: 667,
    amount: 6000,
    amountPaid: 1500,
    balance: 4500,
    date: '2024-08-25',
    dueDate: '2024-09-05',
    status: 'Overdue',
    paymentMethod: 'Debit Card',
    installments: [
      {
        id: 'inst_2',
        amount: 1500,
        date: '2024-08-25',
        method: 'Debit Card',
        recordedBy: 'Front Desk',
        notes: 'Initial booking deposit',
      },
    ],
  },
  {
    id: 'inv_104',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00104',
    patientId: 'pat_1',
    patientName: 'Eleanor Rigby',
    serviceName: 'Prophylaxis & Oral Exam (D1110 & D0120)',
    subtotal: 1700,
    amount: 1700,
    amountPaid: 1700,
    balance: 0,
    date: '2024-09-01',
    dueDate: '2024-09-01',
    status: 'Paid',
    paymentMethod: 'Insurance',
    insuranceClaim: {
      claimId: 'claim_104',
      claimNumber: 'CLM-330198',
      payerName: 'Star Health Insurance',
      policyNumber: 'SH-POL-88219',
      claimedAmount: 1700,
      approvedAmount: 1400,
      coPayAmount: 300,
      submissionDate: '2024-09-01',
      settlementDate: '2024-09-03',
      status: 'Settled',
      diagnosisCode: 'Z01.20 Dental Exam',
      preAuthNumber: 'PA-99201',
      notes: 'Cashless claim settled via TPA direct NEFT transfer.',
    },
    installments: [
      {
        id: 'inst_3',
        amount: 300,
        date: '2024-09-01',
        method: 'UPI / Bank',
        recordedBy: 'Front Desk',
        notes: 'Patient Co-Pay via UPI',
      },
      {
        id: 'inst_4',
        amount: 1400,
        date: '2024-09-03',
        method: 'Insurance',
        recordedBy: 'Accounts Dept',
        notes: 'Star Health TPA settlement NEFT',
      },
    ],
  },
  {
    id: 'inv_105',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00105',
    patientId: 'pat_3',
    patientName: 'Chloe Kowalski',
    serviceName: 'Porcelain Ceramic Crown (D2740)',
    subtotal: 7203,
    taxRatePercent: 18,
    taxAmount: 1297,
    cgstAmount: 648,
    sgstAmount: 649,
    amount: 8500,
    amountPaid: 8500,
    balance: 0,
    date: '2024-08-18',
    dueDate: '2024-08-18',
    status: 'Paid',
    paymentMethod: 'Credit Card',
  },
  {
    id: 'inv_106',
    tenantId: 'tenant_apex',
    invoiceNumber: 'INV-2024-00106',
    patientId: 'pat_2',
    patientName: 'David Holloway',
    serviceName: 'Endodontic Therapy - Molar (D3330)',
    subtotal: 8000,
    amount: 8000,
    amountPaid: 2000,
    balance: 6000,
    date: '2024-09-09',
    dueDate: '2024-09-23',
    status: 'Pending',
    insuranceClaim: {
      claimId: 'claim_106',
      claimNumber: 'CLM-902154',
      payerName: 'HDFC ERGO Health',
      policyNumber: 'HE-DNT-440192',
      claimedAmount: 8000,
      submissionDate: '2024-09-09',
      status: 'Submitted',
      diagnosisCode: 'K04.0 Irreversible Pulpitis',
      notes: 'Submitted with diagnostic IOPA x-rays.',
    },
    installments: [
      {
        id: 'inst_5',
        amount: 2000,
        date: '2024-09-09',
        method: 'UPI / Bank',
        recordedBy: 'Front Desk',
        notes: 'Initial deposit via UPI',
      },
    ],
  },
];

export const initialSystemHealth: SystemHealth = {
  databasePools: {
    active: 14,
    idle: 36,
    max: 100,
  },
  storageUsedGb: 28.4,
  storageTotalGb: 250.0,
  uptimePercent: 99.98,
  activeTenantsCount: 2,
  totalAppointmentsToday: 5,
};

// ---------------------------------------------------------------------------
// Initial Clinical Suite Data (e-Rx, Imaging, Perio Charts, Treatment Plans)
// ---------------------------------------------------------------------------

export const initialPrescriptions: DentalPrescription[] = [
  {
    id: 'rx_101',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    patientName: 'Eleanor Rigby',
    patientAge: 36,
    patientGender: 'Female',
    doctorId: 'user_apex_doctor',
    doctorName: 'Dr. Sarah Vance, DDS',
    doctorRegistrationNumber: 'DCI Reg #29481-A',
    date: '2024-09-01',
    diagnosis: 'Acute Irreversible Pulpitis & Apical Periodontitis (Tooth #19)',
    items: [
      {
        id: 'med_1',
        drugName: 'Clindamycin Capsules',
        dosage: '300 mg',
        frequency: 'TDS (Thrice Daily)',
        durationDays: 5,
        timing: 'After Food',
        instructions: 'Take 1 capsule every 8 hours with a full glass of water. Complete entire 5-day course (Patient allergic to Penicillin).',
      },
      {
        id: 'med_2',
        drugName: 'Ibuprofen + Paracetamol (Combiflam)',
        dosage: '400 mg + 325 mg',
        frequency: 'TDS (Thrice Daily)',
        durationDays: 3,
        timing: 'After Food',
        instructions: 'Take 1 tablet after meals for acute pain and inflammation. Do not take on an empty stomach.',
      },
      {
        id: 'med_3',
        drugName: 'Chlorhexidine Gluconate Mouthwash (Hexidine)',
        dosage: '0.2% w/v',
        frequency: 'BD (Twice Daily)',
        durationDays: 7,
        timing: 'After Food',
        instructions: 'Swish 10ml undiluted for 60 seconds after brushing, morning and night. Do not rinse with water or eat for 30 minutes.',
      },
    ],
    notes: 'Patient advised to report immediately if swelling increases or difficulty in swallowing occurs. Follow-up scheduled in 5 days for canal obturation.',
    createdAt: '2024-09-01T11:45:00Z',
  },
  {
    id: 'rx_102',
    tenantId: 'tenant_apex',
    patientId: 'pat_2',
    patientName: 'David Holloway',
    patientAge: 48,
    patientGender: 'Male',
    doctorId: 'user_apex_doctor',
    doctorName: 'Dr. Sarah Vance, DDS',
    doctorRegistrationNumber: 'DCI Reg #29481-A',
    date: '2024-08-15',
    diagnosis: 'Surgical Extraction Socket Healing & Generalized Chronic Periodontitis',
    items: [
      {
        id: 'med_4',
        drugName: 'Amoxicillin + Potassium Clavulanate (Augmentin / Clavam)',
        dosage: '625 mg',
        frequency: 'BD (Twice Daily)',
        durationDays: 5,
        timing: 'After Food',
        instructions: 'Take 1 tablet every 12 hours after meals. Complete full 5 days.',
      },
      {
        id: 'med_5',
        drugName: 'Ketorolac Tromethamine (Ketorol-DT)',
        dosage: '10 mg',
        frequency: 'SOS (As Needed)',
        durationDays: 2,
        timing: 'After Food',
        instructions: 'Disperse 1 tablet in 15ml water if severe post-extraction throbbing pain occurs (max 40mg/day).',
      },
      {
        id: 'med_6',
        drugName: 'Warm Saline Rinses',
        dosage: 'Half tsp salt in warm water',
        frequency: 'QDS (4x Daily)',
        durationDays: 7,
        timing: 'After Food',
        instructions: 'Start gentle warm saline rinses 24 hours after surgery. Avoid spitting or sucking on a straw.',
      },
    ],
    notes: 'Maintain blood pressure monitoring (Patient on Lisinopril). Suture removal in 7 days.',
    createdAt: '2024-08-15T15:30:00Z',
  },
];

// Sample Medical Radiographs (clean SVG data URLs)
const sampleIOPASvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <radialGradient id="xrayGlow" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#020617"/>
    </radialGradient>
    <filter id="boneNoise">
      <feTurbulence type="fractalNoise" baseFrequency="0.08" numOctaves="4" result="noise"/>
      <feColorMatrix type="matrix" values="0.1 0 0 0 0.1  0 0.1 0 0 0.1  0 0 0.1 0 0.1  0 0 0 0.25 0"/>
      <feComposite in2="SourceGraphic" in="gl" operator="in"/>
    </filter>
  </defs>
  <rect width="600" height="600" fill="url(#xrayGlow)"/>
  <text x="30" y="45" fill="#64748b" font-family="monospace" font-size="14" font-weight="bold">IOPA #19 • 70kVp 7mA 0.16s • APEX DENTAL</text>
  <text x="30" y="70" fill="#475569" font-family="monospace" font-size="12">EXP: 2024-09-01 • SENSOR: SCHICK 33</text>
  
  <!-- Alveolar Bone Trabeculae Structure -->
  <path d="M 0 320 Q 150 310 300 330 T 600 320 L 600 600 L 0 600 Z" fill="#334155" opacity="0.6"/>
  <ellipse cx="300" cy="460" rx="260" ry="120" fill="#1e293b" opacity="0.5"/>

  <!-- Mandibular Molar Tooth #19 -->
  <!-- Mesial Root -->
  <path d="M 230 310 C 220 370, 200 450, 230 500 C 245 480, 260 410, 265 320 Z" fill="#cbd5e1" opacity="0.9"/>
  <!-- Distal Root -->
  <path d="M 335 320 C 340 400, 360 470, 380 495 C 390 470, 385 390, 370 310 Z" fill="#cbd5e1" opacity="0.9"/>
  
  <!-- Pulp Canals (Radiolucent dark streaks) -->
  <path d="M 245 320 Q 235 400 240 480" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M 355 320 Q 365 400 375 480" stroke="#0f172a" stroke-width="4" fill="none" stroke-linecap="round"/>
  
  <!-- Tooth Crown with Enamel Cap -->
  <path d="M 200 310 C 190 260, 210 200, 250 180 C 270 190, 290 190, 300 185 C 320 180, 370 180, 400 210 C 410 250, 410 290, 400 310 C 370 325, 230 325, 200 310 Z" fill="#f1f5f9"/>
  
  <!-- Central Pulp Chamber -->
  <path d="M 270 270 C 265 240, 335 240, 330 270 C 330 290, 270 290, 270 270 Z" fill="#1e293b"/>
  
  <!-- Caries Lesion (Distal radiolucency) -->
  <ellipse cx="380" cy="225" rx="20" ry="15" fill="#1e293b" opacity="0.85"/>
  <circle cx="380" cy="225" r="8" fill="#090d16" opacity="0.9"/>

  <!-- Periapical Radiolucency (Apical pathology at distal root tip) -->
  <ellipse cx="385" cy="505" rx="24" ry="18" fill="#0f172a" opacity="0.75"/>
  
  <!-- Clinical Indicator Overlay -->
  <circle cx="380" cy="225" r="26" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4 2" fill="none"/>
  <line x1="410" y1="225" x2="490" y2="190" stroke="#f59e0b" stroke-width="1.5"/>
  <text x="500" y="195" fill="#f59e0b" font-family="sans-serif" font-size="12" font-weight="bold">Distal Caries</text>
  
  <circle cx="385" cy="505" r="24" stroke="#ef4444" stroke-width="2" stroke-dasharray="4 2" fill="none"/>
  <line x1="415" y1="505" x2="480" y2="525" stroke="#ef4444" stroke-width="1.5"/>
  <text x="490" y="530" fill="#ef4444" font-family="sans-serif" font-size="12" font-weight="bold">Apical Periodontitis</text>
</svg>
`)}`;

const sampleBitewingSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <rect width="600" height="600" fill="#0b1120"/>
  <text x="30" y="45" fill="#64748b" font-family="monospace" font-size="14" font-weight="bold">LEFT BITEWING • PREMOLAR / MOLAR INTERPROXIMAL</text>
  <text x="30" y="70" fill="#475569" font-family="monospace" font-size="12">CRESTAL BONE HEIGHT: NORMAL • NO FURCATION DEFECTS</text>
  
  <!-- Maxillary Teeth (Upper) -->
  <path d="M 120 180 C 130 250, 200 250, 210 180 Z" fill="#e2e8f0"/>
  <path d="M 230 170 C 240 260, 340 260, 350 170 Z" fill="#f8fafc"/>
  <path d="M 370 170 C 380 260, 480 260, 490 170 Z" fill="#f8fafc"/>
  
  <!-- Occlusal Plane Gap -->
  <line x1="80" y1="290" x2="520" y2="290" stroke="#020617" stroke-width="12"/>

  <!-- Mandibular Teeth (Lower) -->
  <path d="M 120 400 C 130 330, 200 330, 210 400 Z" fill="#e2e8f0"/>
  <path d="M 230 410 C 240 320, 340 320, 350 410 Z" fill="#f8fafc"/>
  <path d="M 370 410 C 380 320, 480 320, 490 410 Z" fill="#f8fafc"/>

  <!-- Crestal Bone Lines -->
  <line x1="100" y1="210" x2="500" y2="210" stroke="#475569" stroke-width="2" stroke-dasharray="3 3"/>
  <line x1="100" y1="370" x2="500" y2="370" stroke="#475569" stroke-width="2" stroke-dasharray="3 3"/>
  <text x="100" y="360" fill="#94a3b8" font-family="sans-serif" font-size="11">Crestal Bone Level (1.2mm from CEJ)</text>
</svg>
`)}`;

const sampleOPGSvg = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#050811"/>
  <text x="30" y="35" fill="#64748b" font-family="monospace" font-size="14" font-weight="bold">ORTHOPANTOMOGRAM (OPG PANORAMIC) • FULL ARCH</text>
  <text x="30" y="55" fill="#475569" font-family="monospace" font-size="11">TMJ CONDYLES BILATERALLY SYMMETRIC • MAXILLARY SINUSES CLEAR</text>
  
  <!-- Mandibular Lower Arch Silhouette -->
  <path d="M 80 180 C 150 350, 350 410, 400 410 C 450 410, 650 350, 720 180 C 700 150, 670 200, 640 280 C 580 340, 450 360, 400 360 C 350 360, 220 340, 160 280 C 130 200, 100 150, 80 180 Z" fill="#334155" opacity="0.6"/>
  
  <!-- Stylized Panoramic Teeth Rows -->
  <path d="M 120 220 Q 400 280 680 220" stroke="#f1f5f9" stroke-width="28" stroke-linecap="round" fill="none" opacity="0.85"/>
  <path d="M 140 270 Q 400 320 660 270" stroke="#cbd5e1" stroke-width="26" stroke-linecap="round" fill="none" opacity="0.85"/>
  
  <!-- Impacted 3rd Molar (#32) Mesioangular -->
  <ellipse cx="675" cy="275" rx="16" ry="12" fill="#ef4444" opacity="0.7"/>
  <text x="610" y="320" fill="#f87171" font-family="sans-serif" font-size="11" font-weight="bold">Impaction #32</text>
</svg>
`)}`;

export const initialRadiographs: DentalRadiograph[] = [
  {
    id: 'rad_101',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    title: 'IOPA Tooth #19 (Mandibular Left First Molar)',
    category: 'IOPA (Periapical)',
    dateTaken: '2024-09-01',
    toothNumbers: [19],
    imageUrl: sampleIOPASvg,
    findings: 'Deep coronal radiolucency on distal aspect extending into middle third of dentin and contacting pulp chamber. Periodontal ligament space widened at distal apex with circumscribed periapical radiolucency (~3mm), consistent with symptomatic apical periodontitis.',
    takenBy: 'Marcus Lee, RDH',
    notes: 'High-resolution digital phosphor plate scan. Patient experienced mild percussion sensitivity.',
  },
  {
    id: 'rad_102',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    title: 'Bilateral Posterior Bitewing Survey',
    category: 'Bitewing',
    dateTaken: '2024-08-20',
    toothNumbers: [18, 19, 20, 29, 30, 31],
    imageUrl: sampleBitewingSvg,
    findings: 'Alveolar crestal bone height within normal biological limits (<1.5mm from cementoenamel junction). No active furcation radiolucencies. Interproximal enamel demineralization confirmed on tooth #19 distal.',
    takenBy: 'Dr. Sarah Vance, DDS',
    notes: 'Routine 12-month recall bitewing series.',
  },
  {
    id: 'rad_103',
    tenantId: 'tenant_apex',
    patientId: 'pat_2',
    title: 'Full Mouth Orthopantomogram (OPG)',
    category: 'OPG (Panoramic)',
    dateTaken: '2024-08-15',
    toothNumbers: [1, 16, 17, 32],
    imageUrl: sampleOPGSvg,
    findings: 'Bilateral impacted mandibular third molars: Tooth #32 shows mesioangular impaction contacting distal root trunk of #31. Generalized horizontal bone loss of 2-3mm across maxillary and mandibular posterior segments.',
    takenBy: 'Dr. Sarah Vance, DDS',
    notes: 'Pre-operative panoramic radiograph for surgical extractions.',
  },
];

// ---------------------------------------------------------------------------
// Periodontal Probing Initial Data
// ---------------------------------------------------------------------------

const generatePerioTeeth = (isPeriodontitisPatient: boolean): Record<number, PerioToothRecord> => {
  const teeth: Record<number, PerioToothRecord> = {};
  for (let num = 1; num <= 32; num++) {
    const isSpecial = num === 19 || num === 30 || num === 31 || num === 14;
    const baseDepth = isPeriodontitisPatient ? (isSpecial ? 5 : 3) : (num === 19 ? 4 : 2);
    teeth[num] = {
      toothNumber: num,
      buccal: {
        distal: { depth: baseDepth + (isSpecial ? 1 : 0), bop: isSpecial },
        middle: { depth: Math.max(1, baseDepth - 1), bop: false },
        mesial: { depth: baseDepth, bop: isSpecial && isPeriodontitisPatient },
      },
      lingual: {
        distal: { depth: baseDepth + (isSpecial ? 1 : 0), bop: isSpecial },
        middle: { depth: Math.max(1, baseDepth - 1), bop: false },
        mesial: { depth: baseDepth, bop: false },
      },
      furcation: isSpecial && isPeriodontitisPatient ? 'Class I' : 'None',
      mobility: isSpecial && isPeriodontitisPatient ? 'I' : '0',
    };
  }
  return teeth;
};

export const initialPerioCharts: PeriodontalChart[] = [
  {
    id: 'perio_101',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    examDate: '2024-08-20',
    examinedBy: 'Marcus Lee, RDH',
    teeth: generatePerioTeeth(false),
    summaryNotes: 'Generalized healthy periodontal tissue with 2-3mm sulcus depths. Localized 4-5mm pocket on distal and disto-lingual of tooth #19 with positive Bleeding on Probing (BOP) adjacent to caries lesion. Recommended ultrasonic scaling and subgingival debridement.',
  },
  {
    id: 'perio_102',
    tenantId: 'tenant_apex',
    patientId: 'pat_2',
    examDate: '2024-08-15',
    examinedBy: 'Dr. Sarah Vance, DDS',
    teeth: generatePerioTeeth(true),
    summaryNotes: 'Moderate Chronic Generalized Periodontitis (Stage II, Grade B). Probing depths ranging 4-6mm in molar regions with 32% bleeding on probing. Furcation involvement Class I on mandibular first molars. Quadrant scaling and root planing indicated.',
  },
];

// ---------------------------------------------------------------------------
// Multi-Phase Treatment Plans Initial Data
// ---------------------------------------------------------------------------

export const initialTreatmentPlans: PatientTreatmentPlan[] = [
  {
    id: 'tp_101',
    tenantId: 'tenant_apex',
    patientId: 'pat_1',
    title: 'Endodontic & Full-Crown Rehabilitation Plan (#19)',
    createdDate: '2024-09-01',
    createdBy: 'Dr. Sarah Vance, DDS',
    totalEstimatedFee: 21200,
    acceptedFee: 10200,
    status: 'Accepted',
    patientAcceptedDate: '2024-09-01',
    phases: [
      {
        id: 'phase_1',
        phaseType: 'Phase 1: Emergency & Pain Relief',
        items: [
          {
            id: 'item_1',
            serviceCode: 'D9110',
            procedureName: 'Palliative (Emergency) Dental Treatment',
            toothNumber: 19,
            estimatedFee: 2500,
            status: 'Completed',
            priority: 'Urgent',
            notes: 'Occlusal reduction, pulpal extirpation, and calcium hydroxide dressing.',
          },
        ],
      },
      {
        id: 'phase_2',
        phaseType: 'Phase 2: Disease Control & Endodontics',
        items: [
          {
            id: 'item_2',
            serviceCode: 'D3330',
            procedureName: 'Endodontic Therapy - Molar Tooth (Root Canal)',
            toothNumber: 19,
            estimatedFee: 6500,
            status: 'In-Progress',
            priority: 'Standard',
            notes: 'Bio-mechanical preparation and warm vertical gutta-percha obturation.',
          },
          {
            id: 'item_3',
            serviceCode: 'D1110',
            procedureName: 'Prophylaxis (Full Mouth Ultrasonic Scaling)',
            estimatedFee: 1200,
            status: 'Accepted',
            priority: 'Standard',
            notes: 'Plaque and supragingival calculus debridement.',
          },
        ],
      },
      {
        id: 'phase_3',
        phaseType: 'Phase 3: Prosthetics & Rehabilitation',
        items: [
          {
            id: 'item_4',
            serviceCode: 'D2950',
            procedureName: 'Core Buildup with Composite Resin & Dual-Cure Post',
            toothNumber: 19,
            estimatedFee: 2500,
            status: 'Proposed',
            priority: 'Standard',
            notes: 'Provide retention for coronal prosthetic crown.',
          },
          {
            id: 'item_5',
            serviceCode: 'D2740',
            procedureName: 'Monolithic Zirconia / Porcelain Ceramic Crown',
            toothNumber: 19,
            estimatedFee: 8500,
            status: 'Proposed',
            priority: 'Elective',
            notes: 'High-strength anatomical crown with custom shade match A2.',
          },
        ],
      },
    ],
  },
];

export const initialOperatoryChairs: OperatoryChairConfig[] = [
  // Apex Dental Studio (Enterprise - 12 Chairs Limit)
  {
    id: 'chair_apex_1',
    tenantId: 'tenant_apex',
    name: 'Chair 1 - Hygiene',
    roomNumber: 'Bay 101',
    chairType: 'Hygiene',
    isActive: true,
    color: 'sky',
  },
  {
    id: 'chair_apex_2',
    tenantId: 'tenant_apex',
    name: 'Chair 2 - Surgery',
    roomNumber: 'OR 102',
    chairType: 'Surgery',
    isActive: true,
    color: 'rose',
  },
  {
    id: 'chair_apex_3',
    tenantId: 'tenant_apex',
    name: 'Chair 3 - General',
    roomNumber: 'Operatory 103',
    chairType: 'General',
    isActive: true,
    color: 'emerald',
  },
  {
    id: 'chair_apex_4',
    tenantId: 'tenant_apex',
    name: 'Operatory 4 - Orthodontics',
    roomNumber: 'Suite 104',
    chairType: 'Orthodontics',
    isActive: true,
    color: 'indigo',
  },

  // Oasis Dental Spa (Professional - 6 Chairs Limit)
  {
    id: 'chair_oasis_1',
    tenantId: 'tenant_oasis',
    name: 'Chair 1 - General',
    roomNumber: 'Room 201',
    chairType: 'General',
    isActive: true,
    color: 'teal',
  },
  {
    id: 'chair_oasis_2',
    tenantId: 'tenant_oasis',
    name: 'Chair 2 - Hygiene',
    roomNumber: 'Room 202',
    chairType: 'Hygiene',
    isActive: true,
    color: 'sky',
  },

  // Bluewater Family Dental (Starter - 2 Chairs Limit)
  {
    id: 'chair_blue_1',
    tenantId: 'tenant_bluewater',
    name: 'Chair 1 - General',
    roomNumber: 'Op A',
    chairType: 'General',
    isActive: true,
    color: 'blue',
  },
  {
    id: 'chair_blue_2',
    tenantId: 'tenant_bluewater',
    name: 'Chair 2 - Surgery',
    roomNumber: 'Op B',
    chairType: 'Surgery',
    isActive: true,
    color: 'amber',
  },
];

