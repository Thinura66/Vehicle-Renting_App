import React from "react";
import { View, Text } from "react-native";


export default function AlertDialog() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AlertDialog (mobile placeholder)</Text>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#fde68a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center' as const,
  },
  text: {
    color: '#92400e',
    fontWeight: 'bold' as const,
  },
};
