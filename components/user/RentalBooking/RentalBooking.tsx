import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Modal,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Vehicle {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: any;
  features: string[];
  location: string;
  description?: string;
  specifications?: {
    engine: string;
    transmission: string;
    fuel: string;
    seats: number;
    year: number;
  };
}

interface RentalBookingProps {
  vehicle: Vehicle;
  onBack: () => void;
  onConfirmBooking: (bookingDetails: any) => void;
}

const RentalBooking: React.FC<RentalBookingProps> = ({ 
  vehicle, 
  onBack, 
  onConfirmBooking 
}) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Description, 2: Dates, 3: Summary
  const [pickupDate, setPickupDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000)); // Tomorrow
  const [showPickupPicker, setShowPickupPicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  const [pickupTime, setPickupTime] = useState(new Date());
  const [returnTime, setReturnTime] = useState(new Date());
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showReturnTimePicker, setShowReturnTimePicker] = useState(false);

  // Calculate number of days
  const calculateDays = () => {
    const timeDiff = returnDate.getTime() - pickupDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return Math.max(1, daysDiff);
  };

  // Calculate total amount
  const calculateTotal = () => {
    const days = calculateDays();
    const baseAmount = vehicle.price * days;
    const tax = baseAmount * 0.1; // 10% tax
    const serviceFee = 15; // Fixed service fee
    return {
      days,
      baseAmount,
      tax,
      serviceFee,
      total: baseAmount + tax + serviceFee
    };
  };

  const vehicleDescription = vehicle.description || 
    `Experience luxury and comfort with the ${vehicle.name}. This ${vehicle.category.toLowerCase()} offers exceptional performance and reliability for your journey. Perfect for both city driving and long-distance trips.`;

  const vehicleSpecs = vehicle.specifications || {
    engine: "2.0L Turbo",
    transmission: "Automatic",
    fuel: "Gasoline", 
    seats: 5,
    year: 2023
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleConfirmBooking = () => {
    const bookingDetails = {
      vehicle,
      pickupDate,
      returnDate,
      pickupTime,
      returnTime,
      ...calculateTotal()
    };
    
    Alert.alert(
      'Confirm Booking',
      `Book ${vehicle.name} for ${calculateTotal().days} days at $${calculateTotal().total.toFixed(2)}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            onConfirmBooking(bookingDetails);
            Alert.alert('Success', 'Your booking has been confirmed!');
            onBack();
          }
        }
      ]
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {[1, 2, 3].map((step) => (
        <View key={step} style={styles.stepContainer}>
          <View style={[
            styles.stepCircle,
            currentStep >= step ? styles.stepActive : styles.stepInactive
          ]}>
            <Text style={[
              styles.stepText,
              currentStep >= step ? styles.stepTextActive : styles.stepTextInactive
            ]}>
              {step}
            </Text>
          </View>
          <Text style={styles.stepLabel}>
            {step === 1 ? 'Details' : step === 2 ? 'Dates' : 'Summary'}
          </Text>
          {step < 3 && <View style={styles.stepLine} />}
        </View>
      ))}
    </View>
  );

  const renderVehicleDetails = () => (
    <ScrollView style={styles.content}>
      <View style={styles.vehicleHeader}>
        <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
        <View style={styles.vehicleInfo}>
          <Text style={styles.vehicleName}>{vehicle.name}</Text>
          <Text style={styles.vehicleCategory}>{vehicle.category}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.rating}>⭐ {vehicle.rating}</Text>
            <Text style={styles.reviews}>({vehicle.reviews} reviews)</Text>
          </View>
          <Text style={styles.price}>${vehicle.price}/day</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{vehicleDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresContainer}>
          {vehicle.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureText}>✓ {feature}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specifications</Text>
        <View style={styles.specsContainer}>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Engine:</Text>
            <Text style={styles.specValue}>{vehicleSpecs.engine}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Transmission:</Text>
            <Text style={styles.specValue}>{vehicleSpecs.transmission}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Fuel Type:</Text>
            <Text style={styles.specValue}>{vehicleSpecs.fuel}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Seats:</Text>
            <Text style={styles.specValue}>{vehicleSpecs.seats}</Text>
          </View>
          <View style={styles.specItem}>
            <Text style={styles.specLabel}>Year:</Text>
            <Text style={styles.specValue}>{vehicleSpecs.year}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );

  const renderDateSelection = () => (
    <ScrollView style={styles.content}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Rental Dates</Text>
        
        <View style={styles.dateContainer}>
          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Pickup Date & Time</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowPickupPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(pickupDate)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setShowPickupTimePicker(true)}
            >
              <Text style={styles.timeText}>{formatTime(pickupTime)}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.dateLabel}>Return Date & Time</Text>
            <TouchableOpacity 
              style={styles.dateButton}
              onPress={() => setShowReturnPicker(true)}
            >
              <Text style={styles.dateText}>{formatDate(returnDate)}</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.timeButton}
              onPress={() => setShowReturnTimePicker(true)}
            >
              <Text style={styles.timeText}>{formatTime(returnTime)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.durationContainer}>
          <Text style={styles.durationLabel}>Rental Duration</Text>
          <Text style={styles.durationText}>{calculateDays()} days</Text>
        </View>
      </View>

      {/* Date Pickers */}
      {showPickupPicker && (
        <DateTimePicker
          value={pickupDate}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate?: Date) => {
            setShowPickupPicker(false);
            if (selectedDate) setPickupDate(selectedDate);
          }}
          minimumDate={new Date()}
        />
      )}

      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          onChange={(event: any, selectedDate?: Date) => {
            setShowReturnPicker(false);
            if (selectedDate) setReturnDate(selectedDate);
          }}
          minimumDate={pickupDate}
        />
      )}

      {showPickupTimePicker && (
        <DateTimePicker
          value={pickupTime}
          mode="time"
          display="default"
          onChange={(event: any, selectedTime?: Date) => {
            setShowPickupTimePicker(false);
            if (selectedTime) setPickupTime(selectedTime);
          }}
        />
      )}

      {showReturnTimePicker && (
        <DateTimePicker
          value={returnTime}
          mode="time"
          display="default"
          onChange={(event: any, selectedTime?: Date) => {
            setShowReturnTimePicker(false);
            if (selectedTime) setReturnTime(selectedTime);
          }}
        />
      )}
    </ScrollView>
  );

  const renderSummary = () => {
    const total = calculateTotal();
    
    return (
      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Summary</Text>
          
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Image source={vehicle.image} style={styles.summaryImage} resizeMode="contain" />
              <View>
                <Text style={styles.summaryVehicleName}>{vehicle.name}</Text>
                <Text style={styles.summaryCategory}>{vehicle.category}</Text>
              </View>
            </View>

            <View style={styles.summaryDetails}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Pickup:</Text>
                <Text style={styles.summaryValue}>
                  {formatDate(pickupDate)} at {formatTime(pickupTime)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Return:</Text>
                <Text style={styles.summaryValue}>
                  {formatDate(returnDate)} at {formatTime(returnTime)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Duration:</Text>
                <Text style={styles.summaryValue}>{total.days} days</Text>
              </View>
            </View>
          </View>

          <View style={styles.costBreakdown}>
            <Text style={styles.costTitle}>Cost Breakdown</Text>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Base Rate ({total.days} days × ${vehicle.price})</Text>
              <Text style={styles.costValue}>${total.baseAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Tax (10%)</Text>
              <Text style={styles.costValue}>${total.tax.toFixed(2)}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Service Fee</Text>
              <Text style={styles.costValue}>${total.serviceFee.toFixed(2)}</Text>
            </View>
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>${total.total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Book Vehicle</Text>
      </View>

      {/* Step Indicator */}
      {renderStepIndicator()}

      {/* Content */}
      {currentStep === 1 && renderVehicleDetails()}
      {currentStep === 2 && renderDateSelection()}
      {currentStep === 3 && renderSummary()}

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        {currentStep > 1 && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(currentStep - 1)}
          >
            <Text style={styles.secondaryButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        
        {currentStep < 3 ? (
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => setCurrentStep(currentStep + 1)}
          >
            <Text style={styles.primaryButtonText}>
              {currentStep === 1 ? 'Select Dates' : 'Review Booking'}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.confirmButtonText}>Confirm Booking</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  placeholder: {
    width: 60,
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  stepContainer: {
    alignItems: 'center',
    flex: 1,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepActive: {
    backgroundColor: '#2563eb',
  },
  stepInactive: {
    backgroundColor: '#e5e7eb',
  },
  stepText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  stepTextActive: {
    color: 'white',
  },
  stepTextInactive: {
    color: '#6b7280',
  },
  stepLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  stepLine: {
    position: 'absolute',
    top: 16,
    left: '50%',
    width: '100%',
    height: 2,
    backgroundColor: '#e5e7eb',
    zIndex: -1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  vehicleHeader: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  vehicleImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  vehicleCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    fontSize: 14,
    marginRight: 8,
  },
  reviews: {
    fontSize: 12,
    color: '#6b7280',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#059669',
  },
  specsContainer: {
    gap: 12,
  },
  specItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  specLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  specValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  dateContainer: {
    gap: 20,
  },
  dateSection: {
    gap: 8,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  dateButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  dateText: {
    fontSize: 16,
    color: '#1f2937',
  },
  timeButton: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  timeText: {
    fontSize: 16,
    color: '#1f2937',
  },
  durationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    alignItems: 'center',
  },
  durationLabel: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  summaryCard: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    marginBottom: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  summaryImage: {
    width: 60,
    height: 50,
    borderRadius: 6,
    marginRight: 12,
  },
  summaryVehicleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  summaryCategory: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryDetails: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  costBreakdown: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 16,
  },
  costTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  costLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  costValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    gap: 12,
  },
  secondaryButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default RentalBooking;
