import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import VehicleCard from './VehicleCard';

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

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const renderVehicleCard = ({ item }: { item: Vehicle }) => (
    <VehicleCard vehicle={item} />
  );

  return (
    <View style={styles.vehiclesContainer}>
      <Text style={styles.sectionTitle}>Featured Vehicles</Text>
      <FlatList
        data={vehicles}
        renderItem={renderVehicleCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  vehiclesContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 0,
    marginBottom: 12,
    color: '#1f2937',
  },
});

export default VehicleList;
