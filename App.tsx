import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from 'react-native';

export default function App() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vehicleCategories = [
    { id: 'all', name: 'All', count: 150 },
    { id: 'cars', name: 'Cars', count: 85 },
    { id: 'motorcycles', name: 'Bikes', count: 42 },
    { id: 'trucks', name: 'Trucks', count: 23 },
  ];

  const featuredVehicles = [
    {
      id: 1,
      name: 'BMW 3 Series',
      category: 'Luxury Sedan',
      price: 89,
      rating: 4.8,
      reviews: 124,
      image: require('./assets/bmw-3-series-sedan.png'),
      features: ['Automatic', 'GPS', 'Bluetooth'],
      location: 'Downtown',
    },
    {
      id: 2,
      name: 'Honda Civic',
      category: 'Compact Car',
      price: 45,
      rating: 4.6,
      reviews: 89,
      image: require('./assets/honda-civic-compact-car.png'),
      features: ['Manual', 'AC', 'USB'],
      location: 'Airport',
    },
    {
      id: 3,
      name: 'Yamaha MT-07',
      category: 'Sport Motorcycle',
      price: 35,
      rating: 4.9,
      reviews: 67,
      image: require('./assets/yamaha-mt-07.png'),
      features: ['Manual', 'Sport Mode'],
      location: 'City Center',
    },
  ];

  const renderVehicleCard = ({ item }) => (
    <View style={styles.vehicleCard}>
      <View style={styles.vehicleImageContainer}>
        <Image 
          source={item.image} 
          style={styles.vehicleImage}
          resizeMode="contain"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
        </View>
      </View>
      
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{item.name}</Text>
        <Text style={styles.vehicleCategory}>{item.category}</Text>
        
        <View style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureBadge}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.vehicleFooter}>
          <View>
            <Text style={styles.priceText}>${item.price}/day</Text>
            <Text style={styles.locationText}>📍 {item.location}</Text>
          </View>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.rentButtonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.selectedCategoryButton,
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && styles.selectedCategoryButtonText,
        ]}
      >
        {category.name} ({category.count})
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

  // ...existing code...

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vehicle Rental</Text>
        <Text style={styles.headerSubtitle}>Find your perfect ride</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search location..."
          value={searchLocation}
          onChangeText={setSearchLocation}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
            {vehicleCategories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* Featured Vehicles */}
        <View style={styles.vehiclesContainer}>
          <Text style={styles.sectionTitle}>Featured Vehicles</Text>
          <FlatList
            data={featuredVehicles}
            renderItem={renderVehicleCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#2563eb',
    padding: 20,
    paddingTop: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#bfdbfe',
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
  searchInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
    color: '#1f2937',
  },
  categoriesScroll: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  selectedCategoryButton: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  selectedCategoryButtonText: {
    color: 'white',
  },
  vehiclesContainer: {
    paddingHorizontal: 16,
  },
  vehicleCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  vehicleImageContainer: {
    position: 'relative',
    height: 160,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  vehicleInfo: {
    padding: 16,
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
    marginBottom: 12,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  featureBadge: {
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 12,
    color: '#2563eb',
    fontWeight: '500',
  },
  vehicleFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  locationText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  rentButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  rentButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});