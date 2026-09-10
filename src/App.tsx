import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Sidebar, NavRoute } from './components/layout/Sidebar';
import { TopHeader } from './components/layout/TopHeader';

// Views
import { DashboardView } from './views/DashboardView';
import { AppointmentsView } from './views/AppointmentsView';
import { PatientsView } from './views/PatientsView';
import { PatientDetailView } from './views/PatientDetailView';
import { RevenueView } from './views/RevenueView';
import { StaffView } from './views/StaffView';
import { ServicesView } from './views/ServicesView';
import { SuperAdminView } from './views/SuperAdminView';
import { LandingPageView } from './views/LandingPageView';

// Modals & Common Components
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { AddPatientModal } from './components/modals/AddPatientModal';
import { AddServiceModal } from './components/modals/AddServiceModal';
import { AddStaffModal } from './components/modals/AddStaffModal';
import { OnboardTenantModal } from './components/modals/OnboardTenantModal';
import { SignInModal } from './components/modals/SignInModal';
import { CreateInvoiceModal } from './components/modals/CreateInvoiceModal';
import { InvoicePrintModal } from './components/modals/InvoicePrintModal';
import { ClinicBackupModal } from './components/modals/ClinicBackupModal';
import { PrivacyLockScreen } from './components/common/PrivacyLockScreen';
import { StorageMonitor } from './components/common/StorageMonitor';
import { Invoice } from './types';

const AppContent: React.FC = () => {
  const { currentUser, currentTenant, isAuthenticated, loading } = useAuth();
  const [showLandingPage, setShowLandingPage] = useState<boolean>(true);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookModalPatientId, setBookModalPatientId] = useState<string | undefined>(undefined);
  const [isCreateInvoiceOpen, setIsCreateInvoiceOpen] = useState(false);
  const [createInvoicePatientId, setCreateInvoicePatientId] = useState<string | undefined>(undefined);
  const [createdInvoiceForPrint, setCreatedInvoiceForPrint] = useState<Invoice | null>(null);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isOnboardTenantOpen, setIsOnboardTenantOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isWorkstationLocked, setIsWorkstationLocked] = useState<boolean>(() => {
    return sessionStorage.getItem('dentrix_workstation_locked') === 'true';
  });

  const handleLockWorkstation = () => {
    sessionStorage.setItem('dentrix_workstation_locked', 'true');
    setIsWorkstationLocked(true);
  };

  const handleUnlockWorkstation = () => {
    sessionStorage.removeItem('dentrix_workstation_locked');
    setIsWorkstationLocked(false);
  };

  // 5-Minute Inactivity Auto-Lock for Chairside PHI Protection
  useEffect(() => {
    if (!isAuthenticated || showLandingPage || isWorkstationLocked) return;

    let timeoutId: any;
    const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

    const resetInactivityTimer = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        handleLockWorkstation();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const trackedEvents = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];
    trackedEvents.forEach((evt) =>
      window.addEventListener(evt, resetInactivityTimer, { passive: true })
    );
    resetInactivityTimer();

    return () => {
      clearTimeout(timeoutId);
      trackedEvents.forEach((evt) =>
        window.removeEventListener(evt, resetInactivityTimer)
      );
    };
  }, [isAuthenticated, showLandingPage, isWorkstationLocked]);

  const handleOpenCreateInvoice = (patientId?: string) => {
    setCreateInvoicePatientId(patientId);
    setIsCreateInvoiceOpen(true);
  };

  const handleSelectPatient = (patientId: string) => {
    setSelectedPatientId(patientId);
  };

  const handleBookForPatient = (patientId: string) => {
    setBookModalPatientId(patientId);
    setIsBookModalOpen(true);
  };

  const handleQuickBook = () => {
    setBookModalPatientId(undefined);
    setIsBookModalOpen(true);
  };

  const handleNavigate = (route: NavRoute) => {
    setCurrentRoute(route);
    setSelectedPatientId(null);
  };

  const handleLaunchApp = () => {
    if (!isAuthenticated) {
      setIsSignInOpen(true);
    } else {
      setShowLandingPage(false);
    }
  };

  const handleSignOut = () => {
    setShowLandingPage(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#F8F9FA] text-slate-500 text-sm font-semibold">
        Loading Dentrix…
      </div>
    );
  }

  if (showLandingPage || !isAuthenticated) {
    return (
      <>
        <LandingPageView
          onLaunchApp={handleLaunchApp}
          onOpenSignIn={() => setIsSignInOpen(true)}
        />
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
          onSuccess={() => {
            setIsSignInOpen(false);
            setShowLandingPage(false);
          }}
        />
      </>
    );
  }

  return (
    <DataProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-slate-800">
        {/* Persistent Left Sidebar */}
        <Sidebar
          currentRoute={currentRoute}
          onNavigate={handleNavigate}
          onSignOut={handleSignOut}
        />

        {/* Main Container */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <TopHeader
            onQuickBook={handleQuickBook}
            onOpenCreateInvoice={() => handleOpenCreateInvoice()}
            onViewLandingPage={() => setShowLandingPage(true)}
            onSignOut={handleSignOut}
          />

          {/* Dynamic Route Content */}
          <main className="flex-1 overflow-y-auto">
            {/* Patient Detail Sub-route */}
            {selectedPatientId ? (
              <PatientDetailView
                patientId={selectedPatientId}
                onBack={() => setSelectedPatientId(null)}
                onBookAppointment={handleBookForPatient}
                onOpenCreateInvoice={handleOpenCreateInvoice}
              />
            ) : (
              <>
                {currentRoute === 'dashboard' && (
                  <DashboardView
                    onNavigate={handleNavigate}
                    onBookAppointment={handleQuickBook}
                    onSelectPatient={handleSelectPatient}
                    onOpenCreateInvoice={() => handleOpenCreateInvoice()}
                  />
                )}

                {currentRoute === 'appointments' && (
                  <AppointmentsView
                    onBookAppointment={handleQuickBook}
                    onSelectPatient={handleSelectPatient}
                  />
                )}

                {currentRoute === 'patients' && (
                  <PatientsView
                    onSelectPatient={handleSelectPatient}
                    onOpenAddPatient={() => setIsAddPatientOpen(true)}
                    onOpenCreateInvoice={handleOpenCreateInvoice}
                  />
                )}

                {currentRoute === 'revenue' && (
                  <RevenueView onNavigateHome={() => handleNavigate('dashboard')} />
                )}

                {currentRoute === 'staff' && (
                  <StaffView
                    onOpenAddStaff={() => setIsAddStaffOpen(true)}
                    onNavigateHome={() => handleNavigate('dashboard')}
                  />
                )}

                {currentRoute === 'services' && (
                  <ServicesView
                    onOpenAddService={() => setIsAddServiceOpen(true)}
                    onNavigateHome={() => handleNavigate('dashboard')}
                  />
                )}

                {currentRoute === 'tenants' && (
                  <SuperAdminView
                    onOpenOnboardModal={() => setIsOnboardTenantOpen(true)}
                    onNavigateHome={() => handleNavigate('dashboard')}
                  />
                )}
              </>
            )}
          </main>

          {/* Clinic Status & Storage Telemetry Footer */}
          <footer className="h-7 bg-white border-t border-border px-4 flex items-center justify-between text-[11px] text-slate-500 z-10 flex-shrink-0 select-none">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-slate-700">Dentrix Clinical OS</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-slate-600">{currentTenant?.name || 'Apex Dental'}</span>
              <span className="text-slate-300">•</span>
              <span className="hidden sm:inline text-emerald-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                IndexedDB Mirror Active
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <StorageMonitor onOpenBackupCenter={() => setIsBackupModalOpen(true)} />
              <span className="text-slate-300 hidden md:inline">•</span>
              <button
                onClick={handleLockWorkstation}
                className="text-slate-500 hover:text-slate-900 transition-colors font-semibold hidden md:inline"
                title="Lock Operatory Workstation"
              >
                Lock Terminal (PIN: 1234)
              </button>
            </div>
          </footer>
        </div>

        {/* Global Modals */}
        <SignInModal
          isOpen={isSignInOpen}
          onClose={() => setIsSignInOpen(false)}
          onSuccess={() => setIsSignInOpen(false)}
        />
        <BookAppointmentModal
          isOpen={isBookModalOpen}
          onClose={() => {
            setIsBookModalOpen(false);
            setBookModalPatientId(undefined);
          }}
          initialPatientId={bookModalPatientId}
        />

        <AddPatientModal
          isOpen={isAddPatientOpen}
          onClose={() => setIsAddPatientOpen(false)}
        />

        <AddServiceModal
          isOpen={isAddServiceOpen}
          onClose={() => setIsAddServiceOpen(false)}
        />

        <AddStaffModal
          isOpen={isAddStaffOpen}
          onClose={() => setIsAddStaffOpen(false)}
        />

        <OnboardTenantModal
          isOpen={isOnboardTenantOpen}
          onClose={() => setIsOnboardTenantOpen(false)}
        />

        <CreateInvoiceModal
          isOpen={isCreateInvoiceOpen}
          onClose={() => {
            setIsCreateInvoiceOpen(false);
            setCreateInvoicePatientId(undefined);
          }}
          initialPatientId={createInvoicePatientId}
          onInvoiceCreated={(invoice) => {
            setCreatedInvoiceForPrint(invoice);
          }}
        />

        <InvoicePrintModal
          isOpen={!!createdInvoiceForPrint}
          onClose={() => setCreatedInvoiceForPrint(null)}
          invoice={createdInvoiceForPrint}
        />

        {/* Clinic Statutory Data Backup & Disaster Recovery Modal */}
        <ClinicBackupModal
          isOpen={isBackupModalOpen}
          onClose={() => setIsBackupModalOpen(false)}
        />

        {/* Operatory Privacy Screen Auto / Manual Lock Overlay */}
        <PrivacyLockScreen
          isOpen={isWorkstationLocked}
          onUnlock={handleUnlockWorkstation}
        />
      </div>
    </DataProvider>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
