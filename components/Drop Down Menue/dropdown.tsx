import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Animated,
  Dimensions,
  StatusBar,
  Modal,
  Image,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface DropdownMenuItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
}

interface DropdownMenuProps {
  onProfile: () => void;
  onSettings: () => void;
  onMyBookings: () => void;
  onHelpCenter: () => void;
  onLogout: () => void;
  onHome: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  onProfile,
  onSettings,
  onMyBookings,
  onHelpCenter,
  onLogout,
  onHome,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(-screenWidth));

  const handleLogout = () => {
    closeMenu();
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
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

  const menuItems: DropdownMenuItem[] = [
    {
      id: 'profile',
      title: 'Profile',
      icon: '👤',
      color: '#2563EB',
      onPress: () => {
        closeMenu();
        onProfile();
      },
    },
    {
      id: 'settings',
      title: 'Settings',
      icon: '⚙️',
      color: '#059669',
      onPress: () => {
        closeMenu();
        onSettings();
      },
    },
    {
      id: 'bookings',
      title: 'My Bookings',
      icon: '📋',
      color: '#DC2626',
      onPress: () => {
        closeMenu();
        onMyBookings();
      },
    },
    {
      id: 'help',
      title: 'Help Center',
      icon: '❓',
      color: '#7C3AED',
      onPress: () => {
        closeMenu();
        onHelpCenter();
      },
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: '🚪',
      color: '#DC2626',
      onPress: handleLogout,
    },
  ];

  const openMenu = () => {
    // Start slide animation only
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
    onHome(); // Redirect to home page
  };

  return (
    <View style={styles.container}>
      {/* Enhanced Hamburger Menu Button */}
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

      {/* Side Panel Modal - Rendered above all content */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
      >
        <View style={styles.modalContainer}>
          {/* Light Backdrop to show background content clearly */}
          <TouchableOpacity
            style={styles.fullScreenBackdrop}
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
            <Text style={styles.headerTitle}>Menu</Text>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItemsContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.menuItem,
                  index === menuItems.length - 1 && styles.lastMenuItem,
                ]}
                onPress={item.onPress}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                  <Text style={[styles.menuIcon, { color: item.color }]}>{item.icon}</Text>
                </View>
                <Text
                  style={[
                    styles.menuText,
                    item.id === 'logout' && styles.logoutText,
                  ]}
                >
                  {item.title}
                </Text>
                <Text style={styles.arrowIcon}>›</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Panel Footer with Logo */}
          <View style={styles.panelFooter}>
            <View style={styles.logoContainer}>
              <Image 
                source={require('../../assets/Logo.png')} 
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.logoTitle}>RentNow</Text>
            </View>
          </View>
        </Animated.View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // No z-index needed since Modal handles layering
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hamburgerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    backgroundColor: 'white',
    marginVertical: 2,
    borderRadius: 1,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fullScreenBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  sidePanel: {
    width: screenWidth * 0.65,
    height: screenHeight,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 200,
  },
  panelHeader: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 40,
    backgroundColor: '#2563EB',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  menuItemsContainer: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  lastMenuItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    marginTop: 20,
    backgroundColor: '#FEF2F2',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuIcon: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuText: {
    flex: 1,
    fontSize: 18,
    color: '#374151',
    fontWeight: '500',
  },
  logoutText: {
    color: '#DC2626',
    fontWeight: '600',
  },
  arrowIcon: {
    fontSize: 20,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  panelFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
    marginTop: 8,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
});

export default DropdownMenu;
