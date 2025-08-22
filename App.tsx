import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import Categories from './components/Categories';
import VehicleList from './components/VehicleList';
import { Vehicle, Category } from './components/types';

export default function App() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const vehicleCategories: Category[] = [
    { id: 'all', name: 'All', count: 150 },
    { id: 'cars', name: 'Cars', count: 85 },
    { id: 'motorcycles', name: 'Bikes', count: 42 },
    { id: 'trucks', name: 'Trucks', count: 23 },
  ];

  const featuredVehicles: Vehicle[] = [
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

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Header />

      <SearchBar 
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
      />

      <ScrollView style={styles.content}>
        <Categories
          categories={vehicleCategories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <VehicleList vehicles={featuredVehicles} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
});