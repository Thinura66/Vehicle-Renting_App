import React from "react";
import { View, Text } from "react-native";


export default function Button() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Button (mobile placeholder)</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center' as const,
  },
  text: {
    color: '#1e40af',
    fontWeight: 'bold' as const,
  },
};
