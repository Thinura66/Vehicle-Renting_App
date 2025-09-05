import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AdminHeader from './AdminHeader';
import AdminDashboard from './AdminDashboard';
import VehicleManagement from './VehicleManagement';
import UserManagement from './UserManagement';

export type AdminPage = 'dashboard' | 'vehicles' | 'users' | 'bookings' | 'settings';

interface AdminProps {
  onLogout: () => void;
}

const Admin: React.FC<AdminProps> = ({ onLogout }) => {
  const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

  const handleLogout = () => {
    // You can add any cleanup logic here
    onLogout();
  };

  const handleNavigate = (page: AdminPage) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <AdminDashboard onLogout={handleLogout} />;
      case 'vehicles':
        return <VehicleManagement onBack={() => setCurrentPage('dashboard')} />;
      case 'users':
        return <UserManagement onBack={() => setCurrentPage('dashboard')} />;
      case 'bookings':
        // TODO: Implement BookingManagement component
        return <AdminDashboard onLogout={handleLogout} />;
      case 'settings':
        // TODO: Implement AdminSettings component
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return <AdminDashboard onLogout={handleLogout} />;
    }
  };

  return (
    <View style={styles.container}>
      <AdminHeader
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      <View style={styles.content}>
        {renderCurrentPage()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
});

export default Admin;
