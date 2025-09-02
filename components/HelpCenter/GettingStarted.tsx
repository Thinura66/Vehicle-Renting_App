import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

interface GettingStartedProps {
  onBack: () => void;
}

interface HelpTopic {
  id: string;
  title: string;
  icon: string;
  content: string[];
}

const GettingStarted: React.FC<GettingStartedProps> = ({ onBack }) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const helpTopics: HelpTopic[] = [
    {
      id: 'create-account',
      title: 'How to create an account',
      icon: '👤',
      content: [
        '1. Open the Rent Now app on your mobile device',
        '2. Tap on "Sign Up" or "Create Account" button',
        '3. Fill in your personal information:',
        '   • Full Name',
        '   • Email Address', 
        '   • Phone Number',
        '   • Create a strong password',
        '4. Verify your email address by clicking the link sent to your email',
        '5. Complete your profile by adding:',
        '   • Profile photo (optional)',
        '   • Address information',
        '   • Driver\'s license details',
        '6. Accept the Terms of Service and Privacy Policy',
        '7. Your account is now ready to use!',
        '',
        '📝 Note: You must be at least 18 years old and have a valid driver\'s license to create an account.'
      ]
    },
    {
      id: 'login-reset',
      title: 'How to log in / reset password',
      icon: '🔐',
      content: [
        '🔑 How to Log In:',
        '1. Open the Rent Now app',
        '2. Tap "Log In" on the welcome screen',
        '3. Enter your email and password',
        '4. Tap "Sign In" to access your account',
        '',
        '🔒 How to Reset Password:',
        '1. On the login screen, tap "Forgot Password?"',
        '2. Enter the email address associated with your account',
        '3. Check your email for a password reset link',
        '4. Click the link in the email (valid for 24 hours)',
        '5. Create a new strong password',
        '6. Confirm your new password',
        '7. You can now log in with your new password',
        '',
        '💡 Tips:',
        '• Use a strong password with at least 8 characters',
        '• Include uppercase, lowercase, numbers, and symbols',
        '• Don\'t share your password with anyone',
        '• If you don\'t receive the reset email, check your spam folder'
      ]
    },
    {
      id: 'update-profile',
      title: 'How to update profile details',
      icon: '✏️',
      content: [
        '📱 Updating Profile Information:',
        '1. Open the app and log in to your account',
        '2. Tap the menu icon (☰) in the top-left corner',
        '3. Select "Profile" to view your current details',
        '',
        '📸 Changing Profile Photo:',
        '• In Profile section, tap on your profile photo',
        '• Choose "Camera" to take a new photo',
        '• Choose "Gallery" to select from your photos',
        '• Choose "Remove Photo" to delete current photo',
        '',
        '⚙️ Updating Account Information:',
        '1. From the menu, select "Settings"',
        '2. Here you can update:',
        '   • Username',
        '   • Email address',
        '   • Phone number',
        '   • Password',
        '3. Tap on any field to edit it',
        '4. Enter your new information',
        '5. Tap "Save" to confirm changes',
        '',
        '📍 Additional Information:',
        '• Address and driver\'s license info can be updated in Settings',
        '• Email changes require verification',
        '• Some changes may require re-authentication for security'
      ]
    }
  ];

  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };

  const showContactSupport = () => {
    Alert.alert(
      'Contact Support',
      'Need more help? Contact our support team:\n\n📧 support@rentnow.com\n📞 +1 (555) 123-4567',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back to Help Center</Text>
      </TouchableOpacity>

      <Text style={styles.title}>🚀 Getting Started</Text>
      <Text style={styles.subtitle}>Everything you need to know to get started with Rent Now</Text>

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
                      line.startsWith('🔑') || line.startsWith('🔒') || line.startsWith('📱') || 
                      line.startsWith('📸') || line.startsWith('⚙️') || line.startsWith('📍') ? styles.sectionHeader :
                      line.startsWith('💡') ? styles.tipHeader :
                      line.startsWith('📝') ? styles.noteHeader :
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

        {/* Contact Support Section */}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Still need help?</Text>
          <TouchableOpacity style={styles.supportButton} onPress={showContactSupport}>
            <Text style={styles.supportButtonText}>📞 Contact Support</Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 Helpful Tips</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              🔒 Keep your account secure by using a strong password and never sharing your login credentials.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              📧 Make sure to verify your email address to receive important updates about your bookings.
            </Text>
          </View>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              📱 Enable push notifications to get real-time updates about your vehicle rentals.
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
  noteHeader: {
    fontWeight: 'bold',
    color: '#d97706',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  regularLine: {
    color: '#4b5563',
  },
  emptyLine: {
    height: 8,
  },
  supportSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
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
  },
  supportButton: {
    backgroundColor: '#2563eb',
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
    backgroundColor: '#f0f9ff',
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
});

export default GettingStarted;
