import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface LoginFooterProps {
  onSignUp: () => void;
}

const LoginFooter: React.FC<LoginFooterProps> = ({ onSignUp }) => {
  return (
    <View style={styles.signUpContainer}>
      <Text style={styles.signUpText}>Don't have an account? </Text>
      <TouchableOpacity onPress={onSignUp}>
        <Text style={styles.signUpLink}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signUpLink: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: 'bold',
  },
});

export default LoginFooter;
