import React, { useState } from 'react';
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

// Modals
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { AddPatientModal } from './components/modals/AddPatientModal';
import { AddServiceModal } from './components/modals/AddServiceModal';
import { AddStaffModal } from './components/modals/AddStaffModal';
import { OnboardTenantModal } from './components/modals/OnboardTenantModal';
import { SignInModal } from './components/modals/SignInModal';
import { CreateInvoiceModal } from './components/modals/CreateInvoiceModal';
import { InvoicePrintModal } from './components/modals/InvoicePrintModal';
import { Invoice } from './types';

const AppContent: React.FC = () => {
  const { currentUser, isAuthenticated } = useAuth();
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

  if (showLandingPage) {
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
      </div>

      {/* Global Modals */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSuccess={() => setIsSignInOpen(false)}
      />
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
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
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </AuthProvider>
  );
};

export default App;
