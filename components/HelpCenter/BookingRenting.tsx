import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

interface BookingRentingProps {
  onBack: () => void;
}

interface HelpTopic {
  id: string;
  title: string;
  icon: string;
  content: string[];
}

const BookingRenting: React.FC<BookingRentingProps> = ({ onBack }) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const helpTopics: HelpTopic[] = [
    {
      id: 'browse-vehicles',
      title: 'How to browse available vehicles',
      icon: '🔍',
      content: [
        '🚗 Finding Your Perfect Vehicle:',
        '1. Open the Rent Now app and log in',
        '2. On the main screen, you\'ll see featured vehicles',
        '3. Use the search bar to find specific vehicles',
        '',
        '🔧 Filter Options:',
        '• Tap the filter icon to access sorting options',
        '• Filter by vehicle type:',
        '  - Cars (Sedan, SUV, Hatchback)',
        '  - Motorcycles',
        '  - Bicycles',
        '• Filter by price range using the price slider',
        '• Filter by availability dates',
        '• Filter by location/distance from you',
        '',
        '📱 Browse Categories:',
        '• Tap on category buttons (Cars, Bikes, etc.)',
        '• Each category shows vehicles of that type',
        '• Scroll through the list to see all options',
        '',
        '🗺️ Map View:',
        '• Switch to map view to see vehicle locations',
        '• Tap on map pins to see vehicle details',
        '• Find vehicles closest to your location',
        '',
        '💡 Pro Tips:',
        '• Save your favorite vehicles for quick access',
        '• Check vehicle ratings and reviews',
        '• Look for special deals and discounts'
      ]
    },
    {
      id: 'vehicle-details',
      title: 'How to check vehicle details (features, price per km, availability)',
      icon: '📋',
      content: [
        '🔍 Viewing Vehicle Details:',
        '1. Tap on any vehicle card from the browse screen',
        '2. This opens the detailed vehicle information page',
        '',
        '🚙 Vehicle Information Includes:',
        '• High-quality photos (swipe to see all images)',
        '• Vehicle make, model, and year',
        '• Seating capacity and fuel type',
        '• Transmission type (Manual/Automatic)',
        '• Air conditioning and other features',
        '',
        '💰 Pricing Information:',
        '• Base price per kilometer or per hour',
        '• Daily/weekly rental rates if applicable',
        '• Additional fees (insurance, fuel, etc.)',
        '• Security deposit amount',
        '• Total estimated cost calculator',
        '',
        '📅 Availability Check:',
        '• Real-time availability status',
        '• Calendar view showing available dates',
        '• Available time slots for pickup',
        '• Pickup and drop-off locations',
        '',
        '⭐ Reviews & Ratings:',
        '• Overall vehicle rating (1-5 stars)',
        '• User reviews and comments',
        '• Owner response to feedback',
        '• Number of successful rentals',
        '',
        '📍 Location & Pickup:',
        '• Exact pickup location on map',
        '• Distance from your current location',
        '• Pickup instructions from owner',
        '• Nearby landmarks and directions'
      ]
    },
    {
      id: 'book-rent',
      title: 'How to book/rent a vehicle',
      icon: '📅',
      content: [
        '🎯 Starting Your Booking:',
        '1. Find your desired vehicle using browse or search',
        '2. Tap on the vehicle to view full details',
        '3. Check availability for your desired dates',
        '4. Tap "Book Now" or "Rent Now" button',
        '',
        '📅 Select Rental Period:',
        '• Choose your pickup date and time',
        '• Select return date and time',
        '• Minimum rental duration may apply',
        '• Confirm the total rental period',
        '',
        '📍 Pickup & Return Location:',
        '• Confirm pickup location (usually owner\'s location)',
        '• Choose return location (same or different)',
        '• Add any special pickup instructions',
        '• Verify location accessibility',
        '',
        '💳 Payment Process:',
        '1. Review booking summary and total cost',
        '2. Apply any promo codes or discounts',
        '3. Choose your payment method:',
        '   • Credit/Debit Card',
        '   • Digital Wallet',
        '   • Bank Transfer',
        '4. Pay security deposit (refundable)',
        '5. Complete payment for rental period',
        '',
        '📋 Required Documents:',
        '• Valid driver\'s license (photo upload)',
        '• Government-issued ID',
        '• Proof of insurance (if required)',
        '• Emergency contact information',
        '',
        '✅ Booking Confirmation:',
        '• Receive booking confirmation email/SMS',
        '• Get owner contact information',
        '• Access pickup instructions',
        '• Add to your "My Bookings" section',
        '',
        '📱 Before Pickup:',
        '• Contact owner 1-2 hours before pickup',
        '• Confirm exact meeting location',
        '• Bring required documents',
        '• Install any required apps (if vehicle has smart features)'
      ]
    },
    {
      id: 'cancel-booking',
      title: 'How to cancel a booking',
      icon: '❌',
      content: [
        '📱 Accessing Your Bookings:',
        '1. Open the Rent Now app',
        '2. Tap the menu icon (☰)',
        '3. Select "My Bookings"',
        '4. Find the booking you want to cancel',
        '',
        '🚫 Cancellation Process:',
        '1. Tap on the booking you wish to cancel',
        '2. Scroll down to find "Cancel Booking" button',
        '3. Select your reason for cancellation:',
        '   • Change of plans',
        '   • Found another vehicle',
        '   • Emergency situation',
        '   • Vehicle no longer needed',
        '4. Confirm cancellation by tapping "Yes, Cancel"',
        '',
        '⏰ Cancellation Policy:',
        '• Free cancellation up to 24 hours before pickup',
        '• 50% refund for cancellations 12-24 hours before',
        '• 25% refund for cancellations 6-12 hours before',
        '• No refund for cancellations less than 6 hours before',
        '• Emergency cancellations may have different terms',
        '',
        '💰 Refund Information:',
        '• Refunds are processed within 3-5 business days',
        '• Security deposit refunded separately',
        '• Cancellation fees (if any) are deducted',
        '• Refund goes back to original payment method',
        '',
        '📧 After Cancellation:',
        '• Receive cancellation confirmation email',
        '• Owner is automatically notified',
        '• Booking status changes to "Cancelled"',
        '• You can rebook the same vehicle later',
        '',
        '🆘 Emergency Cancellation:',
        '• For genuine emergencies, contact support immediately',
        '• Medical emergencies may qualify for full refund',
        '• Provide documentation if requested',
        '• Support team will review case individually',
        '',
        '💡 Tips to Avoid Cancellation Fees:',
        '• Plan your trips carefully before booking',
        '• Check weather and traffic conditions',
        '• Confirm your schedule before payment',
        '• Contact owner first to discuss any issues'
      ]
    }
  ];

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const showContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need help with booking or cancellation?\n\n📧 support@rentnow.com\n📞 +1 (555) 123-4567\n💬 Live Chat: Available 24/7',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Help Center</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🚗 Booking & Renting</Text>
      <Text style={styles.subtitle}>Complete guide to browsing, booking, and managing your vehicle rentals</Text>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {helpTopics.map((topic) => (
          <View key={topic.id} style={styles.topicContainer}>
            <TouchableOpacity
              style={styles.topicHeader}
              onPress={() => toggleTopic(topic.id)}
            >
              <View style={styles.topicInfo}>
                <Text style={styles.topicIcon}>{topic.icon}</Text>
                <Text style={styles.topicTitle}>{topic.title}</Text>
              </View>
              <Text style={[
                styles.expandIcon,
                { transform: [{ rotate: expandedTopic === topic.id ? '90deg' : '0deg' }] }
              ]}>
                ›
              </Text>
            </TouchableOpacity>

            {expandedTopic === topic.id && (
              <View style={styles.topicContent}>
                {topic.content.map((line, index) => (
                  <Text
                    key={index}
                    style={[
                      styles.contentLine,
                      line.startsWith('🚗') || line.startsWith('🔧') || line.startsWith('📱') || 
                      line.startsWith('🗺️') || line.startsWith('🔍') || line.startsWith('🚙') ||
                      line.startsWith('💰') || line.startsWith('📅') || line.startsWith('⭐') ||
                      line.startsWith('📍') || line.startsWith('🎯') || line.startsWith('💳') ||
                      line.startsWith('📋') || line.startsWith('✅') || line.startsWith('📱') ||
                      line.startsWith('🚫') || line.startsWith('⏰') || line.startsWith('📧') ||
                      line.startsWith('🆘') ? styles.sectionHeader :
                      line.startsWith('💡') ? styles.tipHeader :
                      line === '' ? styles.emptyLine : styles.regularLine
                    ]}
                  >
                    {line}
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Important Policies Section */}
        <View style={styles.policiesSection}>
          <Text style={styles.policiesTitle}>📋 Important Policies</Text>
          
          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>🚗 Vehicle Inspection</Text>
            <Text style={styles.policyText}>
              Always inspect the vehicle before and after use. Report any damages immediately to avoid disputes.
            </Text>
          </View>

          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>⏰ Late Returns</Text>
            <Text style={styles.policyText}>
              Late returns may incur additional charges. Contact the owner if you anticipate being late.
            </Text>
          </View>

          <View style={styles.policyCard}>
            <Text style={styles.policyTitle}>⛽ Fuel Policy</Text>
            <Text style={styles.policyText}>
              Return the vehicle with the same fuel level as pickup, unless otherwise agreed with the owner.
            </Text>
          </View>
        </View>

        {/* Contact Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Need assistance with booking?</Text>
          <TouchableOpacity style={styles.supportButton} onPress={showContactSupport}>
            <Text style={styles.supportButtonText}>🎧 Get Help Now</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>⚡ Quick Tips</Text>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              📅 Book in advance during peak seasons and holidays for better availability and prices.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              📍 Choose pickup locations that are convenient and easy to find to avoid delays.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              💬 Communicate with vehicle owners proactively to ensure a smooth rental experience.
            </Text>
          </View>
          
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              📸 Take photos of the vehicle before and after use to protect yourself from damage claims.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  topicContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  topicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  topicIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  topicTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    flex: 1,
  },
  expandIcon: {
    fontSize: 18,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  topicContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  contentLine: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  sectionHeader: {
    fontWeight: 'bold',
    color: '#2563eb',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 4,
  },
  tipHeader: {
    fontWeight: 'bold',
    color: '#059669',
    fontSize: 15,
    marginTop: 8,
    marginBottom: 4,
  },
  regularLine: {
    color: '#4b5563',
  },
  emptyLine: {
    height: 8,
  },
  policiesSection: {
    marginTop: 8,
    marginBottom: 16,
  },
  policiesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  policyCard: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#d97706',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  policyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#92400e',
    marginBottom: 4,
  },
  policyText: {
    fontSize: 13,
    color: '#92400e',
    lineHeight: 18,
  },
  supportSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  supportButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  supportButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  tipsSection: {
    marginBottom: 32,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  tipCard: {
    backgroundColor: '#ecfdf5',
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#047857',
    lineHeight: 20,
  },
});

export default BookingRenting;
