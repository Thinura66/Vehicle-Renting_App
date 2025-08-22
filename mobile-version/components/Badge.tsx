import React from "react";
import { View, Text } from "react-native";


export default function Badge() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Badge (mobile placeholder)</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#bbf7d0',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center' as const,
  },
  text: {
    color: '#166534',
    fontWeight: 'bold' as const,
  },
};
