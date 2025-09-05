import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { AdminUser } from './types';

interface UserManagementProps {
  onBack: () => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ onBack }) => {
  const [users, setUsers] = useState<AdminUser[]>([
    {
      id: '1',
      username: 'John Doe',
      email: 'john.doe@email.com',
      phoneNumber: '+1 (555) 123-4567',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      totalBookings: 12,
      address: '123 Main St, New York, NY 10001',
      profilePhoto: '',
    },
    {
      id: '2',
      username: 'Jane Smith',
      email: 'jane.smith@email.com',
      phoneNumber: '+1 (555) 987-6543',
      role: 'user',
      status: 'active',
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      totalBookings: 8,
      address: '456 Oak Ave, Los Angeles, CA 90210',
      profilePhoto: '',
    },
    {
      id: '3',
      username: 'Admin User',
      email: 'admin@rentals.com',
      phoneNumber: '+1 (555) 000-0000',
      role: 'admin',
      status: 'active',
      joinDate: '2024-01-01',
      lastLogin: '2024-01-21',
      totalBookings: 0,
      address: 'Admin Office',
      profilePhoto: '',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [formData, setFormData] = useState<Partial<AdminUser>>({
    username: '',
    email: '',
    phoneNumber: '',
    role: 'user',
    status: 'active',
    address: '',
    profilePhoto: '',
  });

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      phoneNumber: '',
      role: 'user',
      status: 'active',
      address: '',
      profilePhoto: '',
    });
  };

  const handleAddUser = () => {
    if (!formData.username || !formData.email || !formData.phoneNumber) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // Check if email already exists
    if (users.some(user => user.email === formData.email)) {
      Alert.alert('Error', 'Email already exists');
      return;
    }

    const newUser: AdminUser = {
      id: Date.now().toString(),
      username: formData.username!,
      email: formData.email!,
      phoneNumber: formData.phoneNumber!,
      role: formData.role!,
      status: formData.status!,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: '',
      totalBookings: 0,
      address: formData.address || '',
      profilePhoto: formData.profilePhoto || '',
    };

    setUsers([...users, newUser]);
    setShowAddModal(false);
    resetForm();
    Alert.alert('Success', 'User added successfully!');
  };

  const handleEditUser = () => {
    if (!editingUser || !formData.username || !formData.email || !formData.phoneNumber) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    // Check if email already exists (excluding current user)
    if (users.some(user => user.email === formData.email && user.id !== editingUser.id)) {
      Alert.alert('Error', 'Email already exists');
      return;
    }

    const updatedUsers = users.map(user =>
      user.id === editingUser.id
        ? { ...user, ...formData }
        : user
    );

    setUsers(updatedUsers);
    setEditingUser(null);
    resetForm();
    Alert.alert('Success', 'User updated successfully!');
  };

  const handleDeleteUser = (userId: string) => {
    const user = users.find(u => u.id === userId);
    if (user?.role === 'admin') {
      Alert.alert('Error', 'Cannot delete admin users');
      return;
    }

    Alert.alert(
      'Delete User',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setUsers(users.filter(u => u.id !== userId));
            Alert.alert('Success', 'User deleted successfully!');
          },
        },
      ]
    );
  };

  const handleStatusChange = (userId: string, newStatus: 'active' | 'suspended') => {
    const user = users.find(u => u.id === userId);
    if (user?.role === 'admin') {
      Alert.alert('Error', 'Cannot change admin user status');
      return;
    }

    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
    Alert.alert('Success', `User ${newStatus === 'active' ? 'activated' : 'suspended'} successfully!`);
  };

  const openEditModal = (user: AdminUser) => {
    setEditingUser(user);
    setFormData(user);
    setShowAddModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.phoneNumber.includes(searchQuery);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10B981';
      case 'suspended': return '#EF4444';
      case 'inactive': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const renderUserForm = () => (
    <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {editingUser ? 'Edit User' : 'Add New User'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowAddModal(false);
              setEditingUser(null);
              resetForm();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={(text) => setFormData({...formData, username: text})}
              placeholder="Enter full name"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({...formData, email: text})}
              placeholder="user@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.phoneNumber}
              onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
              placeholder="+1 (555) 123-4567"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.address}
              onChangeText={(text) => setFormData({...formData, address: text})}
              placeholder="Enter address"
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Role</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.role === 'user' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, role: 'user'})}
                >
                  <Text style={styles.pickerText}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.role === 'admin' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, role: 'admin'})}
                >
                  <Text style={styles.pickerText}>Admin</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Status</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.status === 'active' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, status: 'active'})}
                >
                  <Text style={styles.pickerText}>Active</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.status === 'suspended' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, status: 'suspended'})}
                >
                  <Text style={styles.pickerText}>Suspended</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={editingUser ? handleEditUser : handleAddUser}
          >
            <Text style={styles.saveButtonText}>
              {editingUser ? 'Update User' : 'Add User'}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>User Management</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setShowAddModal(true)}>
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchSection}>
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search users..."
        />
        
        <View style={styles.filterRow}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Role:</Text>
            <View style={styles.filterContainer}>
              {['all', 'user', 'admin'].map((role) => (
                <TouchableOpacity
                  key={role}
                  style={[styles.filterButton, filterRole === role && styles.activeFilterButton]}
                  onPress={() => setFilterRole(role)}
                >
                  <Text style={[styles.filterText, filterRole === role && styles.activeFilterText]}>
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Status:</Text>
            <View style={styles.filterContainer}>
              {['all', 'active', 'suspended'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[styles.filterButton, filterStatus === status && styles.activeFilterButton]}
                  onPress={() => setFilterStatus(status)}
                >
                  <Text style={[styles.filterText, filterStatus === status && styles.activeFilterText]}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>

      {/* User List */}
      <ScrollView style={styles.userList} showsVerticalScrollIndicator={false}>
        {filteredUsers.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userHeader}>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.username}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <Text style={styles.userPhone}>{user.phoneNumber}</Text>
                <View style={styles.userBadges}>
                  <View style={[styles.badge, { backgroundColor: getStatusColor(user.status) }]}>
                    <Text style={styles.badgeText}>{user.status}</Text>
                  </View>
                  <View style={[styles.badge, { backgroundColor: user.role === 'admin' ? '#8B5CF6' : '#6B7280' }]}>
                    <Text style={styles.badgeText}>{user.role}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.userActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(user)}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                {user.role !== 'admin' && (
                  <>
                    <TouchableOpacity
                      style={[styles.statusButton, user.status === 'active' ? styles.suspendButton : styles.activateButton]}
                      onPress={() => handleStatusChange(user.id, user.status === 'active' ? 'suspended' : 'active')}
                    >
                      <Text style={styles.statusButtonText}>
                        {user.status === 'active' ? 'Suspend' : 'Activate'}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => handleDeleteUser(user.id)}
                    >
                      <Text style={styles.deleteButtonText}>Delete</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
            
            <View style={styles.userStats}>
              <Text style={styles.statText}>Joined: {user.joinDate}</Text>
              <Text style={styles.statText}>Last Login: {user.lastLogin || 'Never'}</Text>
              <Text style={styles.statText}>Bookings: {user.totalBookings}</Text>
              <Text style={styles.statText}>Status: {user.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {renderUserForm()}
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
  addButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  searchSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 4,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  filterRow: {
    flexDirection: 'column',
    gap: 8,
  },
  filterGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6b7280',
    marginRight: 8,
    width: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    minWidth: 60,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  activeFilterButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  userList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  userCard: {
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
  userHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  userPhone: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  userBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  userActions: {
    alignItems: 'flex-end',
  },
  editButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  editButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statusButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  suspendButton: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fbbf24',
  },
  activateButton: {
    backgroundColor: '#d1fae5',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  statusButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  deleteButtonText: {
    fontSize: 14,
    color: '#dc2626',
    fontWeight: 'bold',
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  cancelText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '600',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  selectedOption: {
    backgroundColor: '#3B82F6',
  },
  pickerText: {
    fontSize: 14,
    color: '#374151',
  },
  verificationContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  verificationOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  selectedVerification: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  verificationText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedVerificationText: {
    color: '#FFFFFF',
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserManagement;
