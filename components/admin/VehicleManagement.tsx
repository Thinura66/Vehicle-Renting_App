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
  Image,
} from 'react-native';
import { AdminVehicle } from './types';

interface VehicleManagementProps {
  onBack: () => void;
}

const VehicleManagement: React.FC<VehicleManagementProps> = ({ onBack }) => {
  const [vehicles, setVehicles] = useState<AdminVehicle[]>([
    {
      id: '1',
      name: 'BMW 3 Series Sedan',
      type: 'Sedan',
      category: 'car',
      brand: 'BMW',
      model: '3 Series',
      year: 2022,
      color: 'Black',
      licensePlate: 'ABC-1234',
      price: 45,
      priceUnit: 'hour',
      location: 'Downtown',
      features: ['GPS', 'Bluetooth', 'AC', 'Automatic'],
      availability: 'available',
      images: [''],
      description: 'Luxury sedan perfect for business trips',
      ownerId: 'admin',
      totalBookings: 45,
      rating: 4.8,
      createdDate: '2024-01-01',
      lastMaintenance: '2024-01-15',
    },
    {
      id: '2',
      name: 'Honda Civic Compact',
      type: 'Compact',
      category: 'car',
      brand: 'Honda',
      model: 'Civic',
      year: 2023,
      color: 'White',
      licensePlate: 'XYZ-5678',
      price: 35,
      priceUnit: 'hour',
      location: 'Airport',
      features: ['GPS', 'Bluetooth', 'AC'],
      availability: 'rented',
      images: [''],
      description: 'Economical and reliable compact car',
      ownerId: 'admin',
      totalBookings: 38,
      rating: 4.6,
      createdDate: '2024-01-01',
      lastMaintenance: '2024-01-10',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<AdminVehicle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const [formData, setFormData] = useState<Partial<AdminVehicle>>({
    name: '',
    type: '',
    category: 'car',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    licensePlate: '',
    price: 0,
    priceUnit: 'hour',
    location: '',
    features: [],
    availability: 'available',
    description: '',
  });

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      category: 'car',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      licensePlate: '',
      price: 0,
      priceUnit: 'hour',
      location: '',
      features: [],
      availability: 'available',
      description: '',
    });
  };

  const handleAddVehicle = () => {
    if (!formData.name || !formData.brand || !formData.model || !formData.licensePlate) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const newVehicle: AdminVehicle = {
      id: Date.now().toString(),
      name: formData.name!,
      type: formData.type!,
      category: formData.category!,
      brand: formData.brand!,
      model: formData.model!,
      year: formData.year!,
      color: formData.color!,
      licensePlate: formData.licensePlate!,
      price: formData.price!,
      priceUnit: formData.priceUnit!,
      location: formData.location!,
      features: formData.features!,
      availability: formData.availability!,
      images: [''],
      description: formData.description!,
      ownerId: 'admin',
      totalBookings: 0,
      rating: 0,
      createdDate: new Date().toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
    };

    setVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
    resetForm();
    Alert.alert('Success', 'Vehicle added successfully!');
  };

  const handleEditVehicle = () => {
    if (!editingVehicle || !formData.name || !formData.brand || !formData.model) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const updatedVehicles = vehicles.map(vehicle =>
      vehicle.id === editingVehicle.id
        ? { ...vehicle, ...formData }
        : vehicle
    );

    setVehicles(updatedVehicles);
    setEditingVehicle(null);
    resetForm();
    Alert.alert('Success', 'Vehicle updated successfully!');
  };

  const handleDeleteVehicle = (vehicleId: string) => {
    Alert.alert(
      'Delete Vehicle',
      'Are you sure you want to delete this vehicle?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setVehicles(vehicles.filter(v => v.id !== vehicleId));
            Alert.alert('Success', 'Vehicle deleted successfully!');
          },
        },
      ]
    );
  };

  const openEditModal = (vehicle: AdminVehicle) => {
    setEditingVehicle(vehicle);
    setFormData(vehicle);
    setShowAddModal(true);
  };

  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesSearch = vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vehicle.licensePlate.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || vehicle.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return '#10B981';
      case 'rented': return '#F59E0B';
      case 'maintenance': return '#EF4444';
      case 'out-of-service': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const renderVehicleForm = () => (
    <Modal visible={showAddModal} animationType="slide" presentationStyle="pageSheet">
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>
            {editingVehicle ? 'Edit Vehicle' : 'Add New Vehicle'}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setShowAddModal(false);
              setEditingVehicle(null);
              resetForm();
            }}
          >
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.modalContent}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Vehicle Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({...formData, name: text})}
              placeholder="Enter vehicle name"
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Brand *</Text>
              <TextInput
                style={styles.input}
                value={formData.brand}
                onChangeText={(text) => setFormData({...formData, brand: text})}
                placeholder="Brand"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Model *</Text>
              <TextInput
                style={styles.input}
                value={formData.model}
                onChangeText={(text) => setFormData({...formData, model: text})}
                placeholder="Model"
              />
            </View>
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Year</Text>
              <TextInput
                style={styles.input}
                value={formData.year?.toString()}
                onChangeText={(text) => setFormData({...formData, year: parseInt(text) || new Date().getFullYear()})}
                placeholder="Year"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Color</Text>
              <TextInput
                style={styles.input}
                value={formData.color}
                onChangeText={(text) => setFormData({...formData, color: text})}
                placeholder="Color"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>License Plate *</Text>
            <TextInput
              style={styles.input}
              value={formData.licensePlate}
              onChangeText={(text) => setFormData({...formData, licensePlate: text})}
              placeholder="ABC-1234"
            />
          </View>

          <View style={styles.formRow}>
            <View style={[styles.formGroup, { flex: 2, marginRight: 8 }]}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                style={styles.input}
                value={formData.price?.toString()}
                onChangeText={(text) => setFormData({...formData, price: parseFloat(text) || 0})}
                placeholder="0"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Per</Text>
              <View style={styles.pickerContainer}>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.priceUnit === 'hour' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, priceUnit: 'hour'})}
                >
                  <Text style={styles.pickerText}>Hour</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.pickerOption, formData.priceUnit === 'day' && styles.selectedOption]}
                  onPress={() => setFormData({...formData, priceUnit: 'day'})}
                >
                  <Text style={styles.pickerText}>Day</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={formData.location}
              onChangeText={(text) => setFormData({...formData, location: text})}
              placeholder="Location"
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({...formData, description: text})}
              placeholder="Vehicle description"
              multiline
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={editingVehicle ? handleEditVehicle : handleAddVehicle}
          >
            <Text style={styles.saveButtonText}>
              {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
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
        <Text style={styles.headerTitle}>Vehicle Management</Text>
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
          placeholder="Search vehicles..."
        />
        
        <View style={styles.filterContainer}>
          {['all', 'car', 'bike', 'scooter'].map((category) => (
            <TouchableOpacity
              key={category}
              style={[styles.filterButton, filterCategory === category && styles.activeFilterButton]}
              onPress={() => setFilterCategory(category)}
            >
              <Text style={[styles.filterText, filterCategory === category && styles.activeFilterText]}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Vehicle List */}
      <ScrollView style={styles.vehicleList} showsVerticalScrollIndicator={false}>
        {filteredVehicles.map((vehicle) => (
          <View key={vehicle.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleName}>{vehicle.name}</Text>
                <Text style={styles.vehicleDetails}>
                  {vehicle.brand} {vehicle.model} • {vehicle.year} • {vehicle.licensePlate}
                </Text>
                <View style={styles.statusContainer}>
                  <View style={[styles.statusDot, { backgroundColor: getAvailabilityColor(vehicle.availability) }]} />
                  <Text style={styles.statusText}>{vehicle.availability}</Text>
                </View>
              </View>
              <View style={styles.vehicleActions}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => openEditModal(vehicle)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteVehicle(vehicle.id)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.vehicleStats}>
              <Text style={styles.statText}>Price: ${vehicle.price}/{vehicle.priceUnit}</Text>
              <Text style={styles.statText}>Bookings: {vehicle.totalBookings}</Text>
              <Text style={styles.statText}>Rating: {vehicle.rating.toFixed(1)}★</Text>
              <Text style={styles.statText}>Location: {vehicle.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {renderVehicleForm()}
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#eff6ff',
    marginHorizontal: 4,
  },
  activeFilterButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  vehicleList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  vehicleCard: {
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
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
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
  vehicleDetails: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
    textTransform: 'capitalize',
  },
  vehicleActions: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  editButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
  },
  deleteButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  vehicleStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '500',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalCloseButton: {
    fontSize: 20,
    color: '#6b7280',
    fontWeight: 'bold',
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
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    overflow: 'hidden',
  },
  pickerOption: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  selectedOption: {
    backgroundColor: '#2563eb',
  },
  pickerText: {
    fontSize: 14,
    color: '#1f2937',
  },
  saveButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default VehicleManagement;
