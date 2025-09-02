import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface ProfileData {
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  profilePhoto: string;
}

interface ProfileProps {
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onBack }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '+1 234 567 8900',
    address: '123 Main Street, City, State, 12345',
    profilePhoto: '',
  });

  const handlePhotoChange = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => {
            Alert.alert('Camera', 'Camera functionality would be implemented here');
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            Alert.alert('Gallery', 'Gallery functionality would be implemented here');
          },
        },
        {
          text: 'Remove Photo',
          style: 'destructive',
          onPress: () => {
            setProfileData({...profileData, profilePhoto: ''});
            Alert.alert('Success', 'Profile photo removed');
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity style={styles.photoContainer} onPress={handlePhotoChange}>
            {profileData.profilePhoto ? (
              <Image source={{ uri: profileData.profilePhoto }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.placeholderPhoto}>
                <Text style={styles.placeholderText}>📷</Text>
                <Text style={styles.placeholderSubtext}>Tap to add photo</Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.editPhotoButton} onPress={handlePhotoChange}>
            <Text style={styles.editPhotoText}>✏️ Edit Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Information */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          
          {/* Username */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Username</Text>
            <Text style={styles.value}>{profileData.username}</Text>
          </View>

          {/* Email */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profileData.email}</Text>
          </View>

          {/* Phone Number */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>{profileData.phoneNumber}</Text>
          </View>

          {/* Address */}
          <View style={styles.infoItem}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>{profileData.address}</Text>
          </View>
        </View>

        {/* Edit Notice */}
        <View style={styles.noticeSection}>
          <Text style={styles.noticeText}>
            💡 To edit your profile details (username, email, phone, address), please go to Settings section.
          </Text>
        </View>

        {/* Account Statistics */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Account Statistics</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Completed Trips</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Years Member</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#374151',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#3B82F6',
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: 30,
    marginBottom: 4,
  },
  placeholderSubtext: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  editPhotoButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  editPhotoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#1F2937',
    fontWeight: '500',
  },
  noticeSection: {
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  noticeText: {
    fontSize: 14,
    color: '#1E40AF',
    lineHeight: 20,
  },
  statsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default Profile;
