import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import LogoutButton from './LogoutButton';

interface HeaderProps {
  showLogout?: boolean;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ showLogout = false, onLogout }) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image 
          source={require('../assets/Logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>Rent Now</Text>
          <Text style={styles.headerSubtitle}>Find your perfect ride</Text>
        </View>
        {showLogout && onLogout && (
          <LogoutButton onLogout={onLogout} />
        )}
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
  },
  logo: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  headerText: {
    flex: 1,
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

export default Header;
