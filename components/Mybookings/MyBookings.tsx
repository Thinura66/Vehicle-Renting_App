import { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Alert 
} from 'react-native';
import BookingCard from './BookingCard';
import { Booking } from './types';

interface MyBookingsProps {
  onBack?: () => void;
}

const MyBookings: React.FC<MyBookingsProps> = ({ onBack }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed' | 'cancelled'>('all');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - replace with actual API call
  const mockBookings: Booking[] = [
    {
      id: 'BK001',
      vehicleId: 1,
      vehicleName: 'BMW 3 Series',
      vehicleImage: require('../../assets/bmw-3-series-sedan.png'),
      vehicleCategory: 'Luxury Sedan',
      startDate: '2025-09-05',
      endDate: '2025-09-08',
      startTime: '10:00 AM',
      endTime: '6:00 PM',
      numberOfDays: 3,
      totalPrice: 267,
      status: 'confirmed',
      bookingDate: '2025-09-01',
      pickupLocation: 'Downtown',
      dropoffLocation: 'Downtown',
      features: ['Automatic', 'GPS', 'Bluetooth', 'AC'],
    },
    {
      id: 'BK002',
      vehicleId: 2,
      vehicleName: 'Honda Civic',
      vehicleImage: require('../../assets/honda-civic-compact-car.png'),
      vehicleCategory: 'Compact Car',
      startDate: '2025-09-10',
      endDate: '2025-09-12',
      startTime: '9:00 AM',
      endTime: '5:00 PM',
      numberOfDays: 2,
      totalPrice: 90,
      status: 'pending',
      bookingDate: '2025-09-02',
      pickupLocation: 'Airport',
      dropoffLocation: 'City Center',
      features: ['Manual', 'AC', 'USB'],
    },
    {
      id: 'BK003',
      vehicleId: 3,
      vehicleName: 'Yamaha MT-07',
      vehicleImage: require('../../assets/yamaha-mt-07.png'),
      vehicleCategory: 'Sport Motorcycle',
      startDate: '2025-08-28',
      endDate: '2025-08-30',
      startTime: '8:00 AM',
      endTime: '7:00 PM',
      numberOfDays: 2,
      totalPrice: 70,
      status: 'completed',
      bookingDate: '2025-08-25',
      pickupLocation: 'City Center',
      dropoffLocation: 'City Center',
      features: ['Manual', 'Sport Mode'],
    },
    {
      id: 'BK004',
      vehicleId: 1,
      vehicleName: 'BMW 3 Series',
      vehicleImage: require('../../assets/bmw-3-series-sedan.png'),
      vehicleCategory: 'Luxury Sedan',
      startDate: '2025-08-20',
      endDate: '2025-08-22',
      startTime: '11:00 AM',
      endTime: '4:00 PM',
      numberOfDays: 2,
      totalPrice: 178,
      status: 'cancelled',
      bookingDate: '2025-08-18',
      pickupLocation: 'Downtown',
      dropoffLocation: 'Airport',
      features: ['Automatic', 'GPS', 'Bluetooth'],
    },
  ];

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    // Simulate API call
    setTimeout(() => {
      setBookings(mockBookings);
      setRefreshing(false);
    }, 1000);
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadBookings();
  };

  const handleBookingPress = (booking: Booking) => {
    Alert.alert(
      'Booking Details',
      `Booking ID: ${booking.id}\nVehicle: ${booking.vehicleName}\nStatus: ${booking.status}`,
      [{ text: 'OK' }]
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: () => {
            setBookings(bookings.map(booking => 
              booking.id === bookingId 
                ? { ...booking, status: 'cancelled' as const }
                : booking
            ));
            Alert.alert('Success', 'Booking cancelled successfully');
          }
        }
      ]
    );
  };

  const getFilteredBookings = () => {
    if (activeTab === 'all') return bookings;
    if (activeTab === 'active') return bookings.filter(b => b.status === 'confirmed' || b.status === 'pending');
    return bookings.filter(b => b.status === activeTab);
  };

  const getTabCount = (tab: string) => {
    if (tab === 'all') return bookings.length;
    if (tab === 'active') return bookings.filter(b => b.status === 'confirmed' || b.status === 'pending').length;
    return bookings.filter(b => b.status === tab).length;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>My Bookings</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { key: 'all', label: 'All' },
            { key: 'active', label: 'Active' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' },
          ].map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                activeTab === tab.key && styles.activeTab,
              ]}
              onPress={() => setActiveTab(tab.key as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab.key && styles.activeTabText,
                ]}
              >
                {tab.label} ({getTabCount(tab.key)})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Bookings List */}
      <ScrollView
        style={styles.bookingsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {getFilteredBookings().length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>📅</Text>
            <Text style={styles.emptyStateTitle}>No bookings found</Text>
            <Text style={styles.emptyStateSubtitle}>
              You don't have any {activeTab === 'all' ? '' : activeTab} bookings yet.
            </Text>
          </View>
        ) : (
          getFilteredBookings().map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onPress={handleBookingPress}
              onCancel={handleCancelBooking}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#2563EB',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  placeholder: {
    width: 60,
  },
  tabContainer: {
    backgroundColor: 'white',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeTab: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activeTabText: {
    color: 'white',
  },
  bookingsList: {
    flex: 1,
    paddingTop: 8,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MyBookings;
