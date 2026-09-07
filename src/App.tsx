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

// Modals
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { AddPatientModal } from './components/modals/AddPatientModal';
import { AddServiceModal } from './components/modals/AddServiceModal';
import { AddStaffModal } from './components/modals/AddStaffModal';
import { OnboardTenantModal } from './components/modals/OnboardTenantModal';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentRoute, setCurrentRoute] = useState<NavRoute>('dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  // Modals state
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookModalPatientId, setBookModalPatientId] = useState<string | undefined>(undefined);
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [isOnboardTenantOpen, setIsOnboardTenantOpen] = useState(false);

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

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] text-slate-800">
      {/* Persistent Left Sidebar */}
      <Sidebar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <TopHeader onQuickBook={handleQuickBook} />

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Patient Detail Sub-route */}
          {selectedPatientId ? (
            <PatientDetailView
              patientId={selectedPatientId}
              onBack={() => setSelectedPatientId(null)}
              onBookAppointment={handleBookForPatient}
            />
          ) : (
            <>
              {currentRoute === 'dashboard' && (
                <DashboardView
                  onNavigate={handleNavigate}
                  onBookAppointment={handleQuickBook}
                  onSelectPatient={handleSelectPatient}
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
                />
              )}

              {currentRoute === 'revenue' && <RevenueView />}

              {currentRoute === 'staff' && (
                <StaffView onOpenAddStaff={() => setIsAddStaffOpen(true)} />
              )}

              {currentRoute === 'services' && (
                <ServicesView onOpenAddService={() => setIsAddServiceOpen(true)} />
              )}

              {currentRoute === 'tenants' && (
                <SuperAdminView onOpenOnboardModal={() => setIsOnboardTenantOpen(true)} />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Modals */}
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
