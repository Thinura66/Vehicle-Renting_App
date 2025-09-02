import React, { useState } from 'react';
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
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}

const Profile: React.FC<ProfileProps> = ({ onBack, profileData, setProfileData }) => {

  const handlePhotoChange = () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { 
          text: 'Camera', 
          onPress: () => {
            console.log('Camera selected');
            Alert.alert('Info', 'Camera functionality will be implemented with image picker');
          } 
        },
        { 
          text: 'Gallery', 
          onPress: () => {
            console.log('Gallery selected');
            Alert.alert('Info', 'Gallery functionality will be implemented with image picker');
          } 
        },
        { 
          text: 'Remove Photo', 
          onPress: () => {
            setProfileData({...profileData, profilePhoto: ''});
            Alert.alert('Success', 'Profile photo removed');
          },
          style: 'destructive'
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity 
            style={styles.photoContainer}
            onPress={handlePhotoChange}
          >
            {profileData.profilePhoto ? (
              <Image source={{ uri: profileData.profilePhoto }} style={styles.profilePhoto} />
            ) : (
              <View style={styles.placeholderPhoto}>
                <Text style={styles.placeholderText}>👤</Text>
              </View>
            )}
            <View style={styles.photoOverlay}>
              <Text style={styles.photoOverlayText}>📷</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{profileData.username}</Text>
          <Text style={styles.photoHint}>Tap to change photo</Text>
        </View>

        {/* Profile Information Display */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>👤 Username</Text>
              <Text style={styles.infoValue}>{profileData.username}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📧 Email</Text>
              <Text style={styles.infoValue}>{profileData.email}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📞 Phone</Text>
              <Text style={styles.infoValue}>{profileData.phoneNumber}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>📍 Address</Text>
              <Text style={styles.infoValue}>{profileData.address}</Text>
            </View>
          </View>

          <View style={styles.noticeCard}>
            <Text style={styles.noticeText}>
              ℹ️ To update your username, email, or phone number, please go to Settings from the menu.
            </Text>
          </View>
        </View>

        {/* Account Stats */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Account Statistics</Text>
          
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Total Bookings</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>2</Text>
              <Text style={styles.statLabel}>Active Rentals</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>4.8</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityItem}>
              <Text style={styles.activityDate}>Dec 15, 2024</Text>
              <Text style={styles.activityText}>Completed rental - BMW 3 Series</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={styles.activityDate}>Dec 10, 2024</Text>
              <Text style={styles.activityText}>Started rental - Honda Civic</Text>
            </View>
            
            <View style={styles.activityItem}>
              <Text style={styles.activityDate}>Dec 5, 2024</Text>
              <Text style={styles.activityText}>Profile photo updated</Text>
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
  backButton: {
    padding: 8,
  },
  backButtonText: {
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
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  photoSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'white',
    borderRadius: 12,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholderPhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
    color: '#9ca3af',
  },
  photoOverlay: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563eb',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'white',
  },
  photoOverlayText: {
    fontSize: 16,
    color: 'white',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  photoHint: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoSection: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '400',
    flex: 1,
    textAlign: 'right',
  },
  noticeCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
  },
  noticeText: {
    fontSize: 14,
    color: '#1e40af',
    lineHeight: 20,
  },
  statsSection: {
    marginTop: 24,
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  activitySection: {
    marginTop: 24,
    marginBottom: 32,
  },
  activityCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  activityDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  activityText: {
    fontSize: 14,
    color: '#1f2937',
  },
});

export default Profile;