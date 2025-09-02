import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface DropdownMenuProps {
  onProfile?: () => void;
  onSettings?: () => void;
  onMyBookings?: () => void;
  onHelpCenter?: () => void;
  onLogout?: () => void;
  onHome?: () => void;
  showLogout?: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onProfile,
  onSettings,
  onMyBookings,
  onHelpCenter,
  onLogout,
  onHome,
  showLogout = false,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuPress = () => {
    setDropdownVisible(true);
  };

  const handleMenuItemPress = (action: () => void) => {
    setDropdownVisible(false);
    action();
  };

  return (
    <>
      {/* Menu Button */}
      <TouchableOpacity onPress={handleMenuPress} style={styles.menuButton}>
        <View style={styles.hamburger}>
          <View style={styles.line} />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={dropdownVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setDropdownVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownContainer}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(onHome || (() => console.log('Home pressed')))}
            >
              <Text style={styles.menuItemText}>🏠 Home</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(onProfile || (() => console.log('Profile pressed')))}
            >
              <Text style={styles.menuItemText}>👤 Profileeee</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(onMyBookings || (() => console.log('My Bookings pressed')))}
            >
              <Text style={styles.menuItemText}>📋 My Bookings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(onSettings || (() => console.log('Settings pressed')))}
            >
              <Text style={styles.menuItemText}>⚙️ Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(onHelpCenter || (() => console.log('Help Center pressed')))}
            >
              <Text style={styles.menuItemText}>❓ Help Center</Text>
            </TouchableOpacity>
            
            {showLogout && (
              <TouchableOpacity 
                style={[styles.menuItem, styles.logoutItem]}
                onPress={() => handleMenuItemPress(onLogout || (() => console.log('Logout pressed')))}
              >
                <Text style={[styles.menuItemText, styles.logoutText]}>🚪 Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    padding: 8,
  },
  hamburger: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  line: {
    height: 3,
    backgroundColor: 'white',
    borderRadius: 1.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  dropdownContainer: {
    backgroundColor: 'white',
    marginTop: 100,
    marginLeft: 20,
    borderRadius: 8,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1f2937',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#dc2626',
  },
});

export default DropdownMenu;
