import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Import components
const GettingStarted = require('./GettingStarted').default;
const BookingRenting = require('./BookingRenting').default;

interface HelpCenterProps {
  onBack: () => void;
}

interface HelpSection {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const helpSections: HelpSection[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: '🚀',
      description: 'Account creation, login, profile management'
    },
    {
      id: 'booking-renting',
      title: 'Booking & Renting',
      icon: '🚗',
      description: 'Vehicle browsing, booking, and cancellation'
    },
    {
      id: 'support',
      title: 'Support & Contact',
      icon: '📞',
      description: 'Get help from our support team'
    }
  ];

  const filteredSections = helpSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return <GettingStarted onBack={() => setActiveSection(null)} />;
      case 'booking-renting':
        return <BookingRenting onBack={() => setActiveSection(null)} />;
      case 'support':
        return (
          <View style={styles.sectionContent}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={() => setActiveSection(null)}
            >
              <Text style={styles.backButtonText}>← Back to Help Center</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>📞 Support & Contact</Text>
            <View style={styles.contactInfo}>
              <Text style={styles.contactTitle}>Contact Us</Text>
              <Text style={styles.contactText}>📧 Email: support@rentnow.com</Text>
              <Text style={styles.contactText}>📞 Phone: +1 (555) 123-4567</Text>
              <Text style={styles.contactText}>💬 Live Chat: Available 24/7</Text>
              <Text style={styles.contactText}>🕒 Business Hours: Mon-Fri 9AM-6PM</Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.mainContent}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Search help topics..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Help Sections */}
            <View style={styles.sectionsContainer}>
              <Text style={styles.sectionsTitle}>How can we help you?</Text>
              
              {filteredSections.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  style={styles.sectionCard}
                  onPress={() => setActiveSection(section.id)}
                >
                  <View style={styles.sectionHeader}>
                    <Text style={styles.sectionIcon}>{section.icon}</Text>
                    <View style={styles.sectionInfo}>
                      <Text style={styles.sectionCardTitle}>{section.title}</Text>
                      <Text style={styles.sectionDescription}>{section.description}</Text>
                    </View>
                    <Text style={styles.chevron}>›</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {/* Quick Help */}
            <View style={styles.quickHelpContainer}>
              <Text style={styles.quickHelpTitle}>Quick Help</Text>
              
              <TouchableOpacity style={styles.quickHelpItem}>
                <Text style={styles.quickHelpIcon}>❓</Text>
                <Text style={styles.quickHelpText}>Frequently Asked Questions</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickHelpItem}>
                <Text style={styles.quickHelpIcon}>📖</Text>
                <Text style={styles.quickHelpText}>User Guide & Tutorials</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.quickHelpItem}>
                <Text style={styles.quickHelpIcon}>🆘</Text>
                <Text style={styles.quickHelpText}>Emergency Support</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerBackButton} onPress={onBack}>
          <Text style={styles.headerBackButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Help Center</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {renderContent()}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerBackButton: {
    padding: 8,
  },
  headerBackButtonText: {
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
  scrollContainer: {
    flex: 1,
  },
  mainContent: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 12,
    color: '#6b7280',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  sectionsContainer: {
    marginBottom: 24,
  },
  sectionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  sectionInfo: {
    flex: 1,
  },
  sectionCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  chevron: {
    fontSize: 20,
    color: '#9ca3af',
    fontWeight: 'bold',
  },
  quickHelpContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  quickHelpTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  quickHelpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  quickHelpIcon: {
    fontSize: 20,
    marginRight: 16,
  },
  quickHelpText: {
    fontSize: 16,
    color: '#1f2937',
  },
  sectionContent: {
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
  },
  contactInfo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  contactText: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 24,
  },
});

export default HelpCenter;
