import type React from "react"
import { useState } from "react"
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { StatusBar } from "expo-status-bar"
import type { AdminStats } from "./types"

interface AdminDashboardProps {
  onLogout: () => void
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  // Mock admin statistics - in real app, this would come from API
  const [adminStats] = useState<AdminStats>({
    totalUsers: 1247,
    totalVehicles: 89,
    totalBookings: 2341,
    activeBookings: 23,
    pendingBookings: 7,
    totalRevenue: 145670,
    monthlyRevenue: 23450,
    topVehicles: [
      { id: "1", name: "BMW 3 Series", bookings: 45 },
      { id: "2", name: "Honda Civic", bookings: 38 },
      { id: "3", name: "Yamaha MT-07", bookings: 32 },
    ],
    recentUsers: [
      {
        id: "1",
        username: "John Doe",
        email: "john@example.com",
        phoneNumber: "+1234567890",
        address: "123 Main St",
        role: "user",
        profilePhoto: "",
        joinDate: "2024-01-15",
        status: "active",
        totalBookings: 5,
        lastLogin: "2024-01-20",
      },
    ],
    recentBookings: [
      {
        id: "1",
        userId: "user1",
        vehicleId: "vehicle1",
        startDate: "2024-01-25",
        endDate: "2024-01-27",
        totalAmount: 250,
        status: "confirmed",
        paymentStatus: "paid",
        createdDate: "2024-01-20",
        notes: "Business trip",
      },
    ],
  })

  const renderDashboardContent = () => {
    return (
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Welcome Header */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Welcome back, Admin</Text>
          <Text style={styles.welcomeSubtitle}>Here's what's happening with your platform today</Text>
        </View>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Overview</Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statCard, styles.primaryCard]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>👥</Text>
              </View>
              <Text style={styles.statNumber}>{adminStats.totalUsers.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Total Users</Text>
              <Text style={styles.statGrowth}>+12% this month</Text>
            </View>

            <View style={[styles.statCard, styles.successCard]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>🚗</Text>
              </View>
              <Text style={styles.statNumber}>{adminStats.totalVehicles}</Text>
              <Text style={styles.statLabel}>Vehicles</Text>
              <Text style={styles.statGrowth}>+5% this month</Text>
            </View>

            <View style={[styles.statCard, styles.warningCard]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>📋</Text>
              </View>
              <Text style={styles.statNumber}>{adminStats.totalBookings.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
              <Text style={styles.statGrowth}>+18% this month</Text>
            </View>

            <View style={[styles.statCard, styles.infoCard]}>
              <View style={styles.statIconContainer}>
                <Text style={styles.statIcon}>💰</Text>
              </View>
              <Text style={styles.statNumber}>${adminStats.totalRevenue.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
              <Text style={styles.statGrowth}>+22% this month</Text>
            </View>
          </View>
        </View>

        {/* Active Operations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Active Operations</Text>

          <View style={styles.operationsContainer}>
            <View style={styles.operationCard}>
              <View style={styles.operationHeader}>
                <Text style={styles.operationIcon}>⚡</Text>
                <View>
                  <Text style={styles.operationNumber}>{adminStats.activeBookings}</Text>
                  <Text style={styles.operationLabel}>Active Bookings</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.operationButton}>
                <Text style={styles.operationButtonText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.operationCard}>
              <View style={styles.operationHeader}>
                <Text style={styles.operationIcon}>⏳</Text>
                <View>
                  <Text style={styles.operationNumber}>{adminStats.pendingBookings}</Text>
                  <Text style={styles.operationLabel}>Pending Approvals</Text>
                </View>
              </View>
              <TouchableOpacity style={[styles.operationButton, styles.urgentButton]}>
                <Text style={styles.operationButtonText}>Review Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert("Add Vehicle", "Use the Vehicles tab to add new vehicles")}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>🚗</Text>
              </View>
              <Text style={styles.actionTitle}>Add Vehicle</Text>
              <Text style={styles.actionSubtitle}>Register new vehicle</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert("Add User", "Use the Users tab to add new users")}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>👤</Text>
              </View>
              <Text style={styles.actionTitle}>Add User</Text>
              <Text style={styles.actionSubtitle}>Create new account</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert("Bookings", "Bookings management coming soon")}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📋</Text>
              </View>
              <Text style={styles.actionTitle}>Bookings</Text>
              <Text style={styles.actionSubtitle}>Manage bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => Alert.alert("Analytics", "Analytics dashboard coming soon")}
            >
              <View style={styles.actionIconContainer}>
                <Text style={styles.actionIcon}>📊</Text>
              </View>
              <Text style={styles.actionTitle}>Analytics</Text>
              <Text style={styles.actionSubtitle}>View reports</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityIcon}>👋</Text>
              <Text style={styles.activityTitle}>New Users</Text>
            </View>
            {adminStats.recentUsers.map((user, index) => (
              <View key={user.id} style={styles.activityItem}>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>{user.username}</Text>
                  <Text style={styles.activityDate}>Joined {new Date(user.joinDate).toLocaleDateString()}</Text>
                </View>
                <View style={[styles.statusBadge, styles.activeBadge]}>
                  <Text style={styles.statusText}>{user.status}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityIcon}>💼</Text>
              <Text style={styles.activityTitle}>Recent Bookings</Text>
            </View>
            {adminStats.recentBookings.map((booking, index) => (
              <View key={booking.id} style={styles.activityItem}>
                <View style={styles.activityContent}>
                  <Text style={styles.activityText}>${booking.totalAmount}</Text>
                  <Text style={styles.activityDate}>{new Date(booking.startDate).toLocaleDateString()}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    booking.status === "confirmed" ? styles.confirmedBadge : styles.pendingBadge,
                  ]}
                >
                  <Text style={styles.statusText}>{booking.status}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Search Bar - matching user UI */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchPlaceholder}>🔍 Search admin functions...</Text>
        </View>
      </View>
      
      {renderDashboardContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  searchContainer: {
    flexDirection: 'row',
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInputContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcomeSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 20,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  statCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
  },
  primaryCard: {
    backgroundColor: "#2563eb",
  },
  successCard: {
    backgroundColor: "#10b981",
  },
  warningCard: {
    backgroundColor: "#f59e0b",
  },
  infoCard: {
    backgroundColor: "#8b5cf6",
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginBottom: 4,
  },
  statGrowth: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    textAlign: "center",
  },
  operationsContainer: {
    gap: 12,
  },
  operationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  operationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  operationIcon: {
    fontSize: 24,
  },
  operationNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
  },
  operationLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  operationButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  urgentButton: {
    backgroundColor: "#dc2626",
  },
  operationButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  actionCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },
  actionSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 16,
  },
  activityCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  activityIcon: {
    fontSize: 20,
  },
  activityTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
  },
  activityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: "#1f2937",
    fontWeight: "500",
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: "#6b7280",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  activeBadge: {
    backgroundColor: "#dcfce7",
  },
  confirmedBadge: {
    backgroundColor: "#dcfce7",
  },
  pendingBadge: {
    backgroundColor: "#fef3c7",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
    color: "#059669",
  },
})

export default AdminDashboard
