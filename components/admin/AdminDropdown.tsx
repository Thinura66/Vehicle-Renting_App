import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  Modal,
  Image,
} from 'react-native';
import { AdminPage } from './types';

const { width: screenWidth } = Dimensions.get('window');

interface AdminDropdownProps {
  currentPage: AdminPage;
  onNavigate: (page: AdminPage) => void;
  onLogout: () => void;
}

const AdminDropdown: React.FC<AdminDropdownProps> = ({
  currentPage,
  onNavigate,
  onLogout,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(-screenWidth));

  const handleLogout = () => {
    closeMenu();
    Alert.alert(
      'Admin Logout',
      'Are you sure you want to logout from admin panel?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: onLogout,
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 'dashboard' as AdminPage,
      title: 'Dashboard',
      icon: '📊',
      onPress: () => {
        closeMenu();
        onNavigate('dashboard');
      },
    },
    {
      id: 'vehicles' as AdminPage,
      title: 'Vehicle Management',
      icon: '🚗',
      onPress: () => {
        closeMenu();
        onNavigate('vehicles');
      },
    },
    {
      id: 'users' as AdminPage,
      title: 'User Management',
      icon: '👥',
      onPress: () => {
        closeMenu();
        onNavigate('users');
      },
    },
    {
      id: 'bookings' as AdminPage,
      title: 'Booking Management',
      icon: '📋',
      onPress: () => {
        closeMenu();
        onNavigate('bookings');
      },
    },
    {
      id: 'settings' as AdminPage,
      title: 'Settings',
      icon: '⚙️',
      onPress: () => {
        closeMenu();
        onNavigate('settings');
      },
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: '🚪',
      onPress: handleLogout,
    },
  ];

  const openMenu = () => {
    Animated.timing(slideAnimation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsVisible(true);
  };

  const closeMenu = () => {
    Animated.timing(slideAnimation, {
      toValue: -screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsVisible(false));
  };

  const handleBackdropPress = () => {
    closeMenu();
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Menu Button */}
      <TouchableOpacity 
        style={styles.menuButton} 
        onPress={openMenu}
        activeOpacity={0.7}
      >
        <View style={styles.hamburgerContainer}>
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
          <View style={styles.hamburgerLine} />
        </View>
      </TouchableOpacity>

      {/* Side Panel Modal */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {/* Transparent Backdrop for outside clicks */}
          <TouchableOpacity
            style={styles.transparentBackdrop}
            activeOpacity={1}
            onPress={handleBackdropPress}
          />
          
          {/* Side Panel */}
          <Animated.View
            style={[
              styles.sidePanel,
              {
                transform: [{ translateX: slideAnimation }],
              },
            ]}
          >
            {/* Panel Header */}
            <View style={styles.panelHeader}>
              <Text style={styles.headerTitle}>Admin Menu</Text>
            </View>

            {/* Menu Items */}
            <View style={styles.menuItemsContainer}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    currentPage === item.id && styles.activeMenuItem,
                    index === menuItems.length - 1 && styles.lastMenuItem,
                  ]}
                  onPress={item.onPress}
                >
                  <View style={[
                    styles.iconContainer,
                    { backgroundColor: currentPage === item.id ? '#2563eb20' : '#f3f4f620' }
                  ]}>
                    <Text style={styles.menuIcon}>{item.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.menuText,
                      currentPage === item.id && styles.activeMenuText,
                      item.id === 'logout' && styles.logoutText,
                    ]}
                  >
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  menuButton: {
    padding: 8,
  },
  hamburgerContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  hamburgerLine: {
    width: 24,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  modalContainer: {
    flex: 1,
  },
  transparentBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  sidePanel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  panelHeader: {
    backgroundColor: '#2563eb',
    paddingVertical: 50,
    paddingHorizontal: 20,
    paddingTop: 70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activeMenuItem: {
    backgroundColor: '#eff6ff',
  },
  lastMenuItem: {
    borderBottomWidth: 0,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
    flex: 1,
  },
  activeMenuText: {
    color: '#2563eb',
    fontWeight: 'bold',
  },
  logoutText: {
    color: '#dc2626',
    fontWeight: 'bold',
  },
});

export default AdminDropdown;
