import { View, Text, Image, StyleSheet } from 'react-native';
import LogoutButton from './LogoutButton';
import DropdownMenu from './Drop Down Menue/dropdown';

interface HeaderProps {
  showLogout?: boolean;
  onLogout?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onMyBookings?: () => void;
  onHelpCenter?: () => void;
  onHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  showLogout = false, 
  onLogout,
  onProfile,
  onSettings,
  onMyBookings,
  onHelpCenter,
  onHome,
}) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {/* Dropdown Menu on the left */}
        <DropdownMenu
          onProfile={onProfile || (() => console.log('Profile pressed'))}
          onSettings={onSettings || (() => console.log('Settings pressed'))}
          onMyBookings={onMyBookings || (() => console.log('My Bookings pressed'))}
          onHelpCenter={onHelpCenter || (() => console.log('Help Center pressed'))}
          onLogout={onLogout || (() => console.log('Logout pressed'))}
          onHome={onHome || (() => console.log('Home pressed'))}
        />
        
        {/* Title in center */}
        <View style={styles.centerContent}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Rent Now</Text>
            <Text style={styles.headerSubtitle}>Find your perfect ride</Text>
          </View>
        </View>

        {/* Logo at right corner */}
        <Image 
          source={require('../assets/Logo.png')} 
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

export default Header;
