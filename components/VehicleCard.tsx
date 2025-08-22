import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

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
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  return (
    <View style={styles.vehicleCard}>
      <View style={styles.vehicleImageContainer}>
        <Image 
          source={vehicle.image} 
          style={styles.vehicleImage}
          resizeMode="contain"
        />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingText}>⭐ {vehicle.rating}</Text>
        </View>
      </View>
      
      <View style={styles.vehicleInfo}>
        <Text style={styles.vehicleName}>{vehicle.name}</Text>
        <Text style={styles.vehicleCategory}>{vehicle.category}</Text>
        
        <View style={styles.featuresContainer}>
          {vehicle.features.map((feature, index) => (
            <View key={index} style={styles.featureBadge}>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.vehicleFooter}>
          <View>
            <Text style={styles.priceText}>${vehicle.price}/day</Text>
            <Text style={styles.locationText}>📍 {vehicle.location}</Text>
          </View>
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.rentButtonText}>Rent Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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

export default VehicleCard;
