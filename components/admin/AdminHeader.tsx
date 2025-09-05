import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { AdminPage } from './types';
import AdminDropdown from './AdminDropdown';

interface AdminHeaderProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ currentPage, onNavigate, onLogout }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'dashboard':
        return 'Admin Dashboard';
      case 'vehicles':
        return 'Vehicle Management';
      case 'users':
        return 'User Management';
      case 'bookings':
        return 'Booking Management';
      case 'settings':
        return 'Admin Settings';
      default:
        return 'Admin Panel';
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Dropdown Menu on the left */}
        <AdminDropdown
          currentPage={currentPage}
          onNavigate={onNavigate}
          onLogout={onLogout}
        />
        
        {/* Title in center */}
        <View style={styles.centerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Admin Panel</Text>
            <Text style={styles.headerSubtitle}>{getPageTitle()}</Text>
          </View>
        </View>

        {/* Logo at right corner */}
        <Image 
          source={require('../../assets/Logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 40,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 50,
    height: 50,
  },
  headerText: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
  },
});

export default AdminHeader;
