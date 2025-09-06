import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Booking } from './types';

interface BookingCardProps {
  booking: Booking;
  onPress?: (booking: Booking) => void;
  onCancel?: (bookingId: string) => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onPress, onCancel }) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { color: '#059669', backgroundColor: '#D1FAE5' };
      case 'pending':
        return { color: '#D97706', backgroundColor: '#FEF3C7' };
      case 'cancelled':
        return { color: '#DC2626', backgroundColor: '#FEE2E2' };
      case 'completed':
        return { color: '#6B7280', backgroundColor: '#F3F4F6' };
      case 'active':
        return { color: '#2563EB', backgroundColor: '#DBEAFE' };
      default:
        return { color: '#6B7280', backgroundColor: '#F3F4F6' };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => onPress?.(booking)}
      activeOpacity={0.7}
    >
      {/* Vehicle Image and Basic Info */}
      <View style={styles.header}>
        <Image source={booking.vehicleImage} style={styles.vehicleImage} />
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{booking.vehicleName}</Text>
          <Text style={styles.vehicleCategory}>{booking.vehicleCategory}</Text>
          <View style={[styles.statusBadge, getStatusStyle(booking.status)]}>
            <Text style={[styles.statusText, { color: getStatusStyle(booking.status).color }]}>
              {booking.status.toUpperCase()}
            </Text>
          </View>
        </View>
        <Text style={styles.totalPrice}>${booking.totalPrice}</Text>
      </View>

      {/* Booking Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>📅 Start Date</Text>
            <Text style={styles.detailValue}>{formatDate(booking.startDate)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>📅 End Date</Text>
            <Text style={styles.detailValue}>{formatDate(booking.endDate)}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>🕐 Start Time</Text>
            <Text style={styles.detailValue}>{formatTime(booking.startTime)}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>🕐 End Time</Text>
            <Text style={styles.detailValue}>{formatTime(booking.endTime)}</Text>
          </View>
        </View>

        <View style={styles.detailRow}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>📆 Booking Days</Text>
            <Text style={styles.detailValue}>{booking.numberOfDays} days</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>📍 Pickup Location</Text>
            <Text style={styles.detailValue}>{booking.pickupLocation}</Text>
          </View>
        </View>
      </View>

      {/* Features */}
      <View style={styles.features}>
        <Text style={styles.featuresLabel}>Features:</Text>
        <View style={styles.featuresList}>
          {booking.features.map((feature, index) => (
            <View key={index} style={styles.featureTag}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Action Buttons */}
      {booking.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={() => onCancel?.(booking.id)}
          >
            <Text style={styles.cancelButtonText}>Cancel Booking</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  vehicleImage: {
    width: 80,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  vehicleCategory: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563EB',
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  features: {
    marginBottom: 16,
  },
  featuresLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  featuresList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureTag: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#374151',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelButtonText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default BookingCard;
