import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoginHeader: React.FC = () => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/Logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appTitle}>Rent Now</Text>
      <Text style={styles.appSubtitle}>Welcome back! Please sign in to continue</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2563EB',
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default LoginHeader;
