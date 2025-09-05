import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, SafeAreaView, Alert } from 'react-native';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import VehicleList from './components/VehicleList';
import Login from './components/login/login';
import Profile from './components/Profile/Profile';
import Settings from './components/Settings/Settings';
import { MyBookings } from './components/Mybookings';
import { RentalBooking } from './components/RentalBooking';
import HelpCenter from './components/HelpCenter/HelpCenter';
import Admin from './components/admin/Admin';
import { Vehicle, Category } from './components/types';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'profile', 'bookings', 'rental', etc.
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vehicleCategories: Category[] = [
    { id: 'all', name: 'All', count: 150 },
    { id: 'cars', name: 'Cars', count: 85 },
    { id: 'motorcycles', name: 'Bikes', count: 42 },
    { id: 'trucks', name: 'Trucks', count: 23 },
  ];

  const featuredVehicles: Vehicle[] = [
    {
      id: 1,
      name: 'BMW 3 Series',
      category: 'Luxury Sedan',
      price: 89,
      rating: 4.8,
      reviews: 124,
      image: require('./assets/bmw-3-series-sedan.png'),
      features: ['Automatic', 'GPS', 'Bluetooth', 'Leather Seats', 'Sunroof'],
      location: 'Downtown',
      description: 'Experience luxury and performance with the BMW 3 Series. This premium sedan offers exceptional comfort, advanced technology, and dynamic driving experience perfect for business trips and city exploration.',
      specifications: {
        engine: '2.0L TwinPower Turbo',
        transmission: 'Automatic',
        fuel: 'Gasoline',
        seats: 5,
        year: 2023
      }
    },
    {
      id: 2,
      name: 'Honda Civic',
      category: 'Compact Car',
      price: 45,
      rating: 4.6,
      reviews: 89,
      image: require('./assets/honda-civic-compact-car.png'),
      features: ['Manual', 'AC', 'USB', 'Backup Camera', 'Cruise Control'],
      location: 'Airport',
      description: 'The Honda Civic offers reliable performance and fuel efficiency. Perfect for daily commuting and weekend trips with modern features and comfortable interior.',
      specifications: {
        engine: '1.5L Turbo',
        transmission: 'Manual',
        fuel: 'Gasoline',
        seats: 5,
        year: 2023
      }
    },
    {
      id: 3,
      name: 'Yamaha MT-07',
      category: 'Sport Motorcycle',
      price: 35,
      rating: 4.9,
      reviews: 67,
      image: require('./assets/yamaha-mt-07.png'),
      features: ['Manual', 'Sport Mode', 'ABS', 'LED Lights'],
      location: 'City Center',
      description: 'The Yamaha MT-07 delivers thrilling performance with its crossplane crankshaft engine. Perfect for riders seeking excitement and agility on city streets and winding roads.',
      specifications: {
        engine: '689cc Parallel Twin',
        transmission: '6-speed Manual',
        fuel: 'Gasoline',
        seats: 2,
        year: 2023
      }
    },
  ];

  const handleLogin = (email: string, password: string) => {
    // Check for admin credentials
    if (email === 'admin@rentals.com' && password === 'admin123') {
      console.log('Admin login successful');
      Alert.alert('Success', 'Admin login successful!');
      setIsAdmin(true);
      setIsLoggedIn(true);
      return;
    }
    
    // Regular user login
    console.log('User login attempt:', email);
    Alert.alert('Success', 'Login successful!');
    setIsAdmin(false);
    setIsLoggedIn(true);
  };

  const handleSignUp = () => {
    Alert.alert('Sign Up', 'Sign up functionality would be implemented here');
  };

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Password reset functionality would be implemented here');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage('home');
    Alert.alert('Logged Out', 'You have been successfully logged out');
  };

  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentPage('home');
    Alert.alert('Admin Logout', 'You have been logged out from admin panel');
  };

  const handleProfile = () => {
    setCurrentPage('profile');
  };

  const handleSettings = () => {
    setCurrentPage('settings');
  };

  const handleMyBookings = () => {
    setCurrentPage('bookings');
  };

  const handleHelpCenter = () => {
    setCurrentPage('help');
  };

  const handleHome = () => {
    // Reset any filters and show home view
    setSearchLocation('');
    setSelectedCategory('all');
    setCurrentPage('home');
    console.log('Redirected to home page');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedVehicle(null);
  };

  const handleRentNow = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setCurrentPage('rental');
  };

  const handleConfirmBooking = (bookingDetails: any) => {
    // Here you would typically save the booking to your backend
    console.log('Booking confirmed:', bookingDetails);
    // You could also add the booking to a local state or context
  };

  // Show login page if user is not logged in
  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onForgotPassword={handleForgotPassword}
      />
    );
  }

  // Show admin interface if admin is logged in
  if (isAdmin) {
    return <Admin onLogout={handleAdminLogout} />;
  }

  // Show main app if user is logged in
  if (currentPage === 'profile') {
    return <Profile onBack={handleBackToHome} />;
  }

  if (currentPage === 'bookings') {
    return <MyBookings onBack={handleBackToHome} />;
  }

  if (currentPage === 'help') {
    return <HelpCenter onBack={handleBackToHome} />;
  }

  if (currentPage === 'settings') {
    return <Settings onBack={handleBackToHome} />;
  }

  if (currentPage === 'rental' && selectedVehicle) {
    return (
      <RentalBooking 
        vehicle={selectedVehicle}
        onBack={handleBackToHome}
        onConfirmBooking={handleConfirmBooking}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Header 
        showLogout={true} 
        onLogout={handleLogout}
        onProfile={handleProfile}
        onSettings={handleSettings}
        onMyBookings={handleMyBookings}
        onHelpCenter={handleHelpCenter}
        onHome={handleHome}
      />

      <SearchBar 
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <ScrollView style={styles.content}>
        <Categories
          categories={vehicleCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <VehicleList vehicles={featuredVehicles} onRentNow={handleRentNow} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});