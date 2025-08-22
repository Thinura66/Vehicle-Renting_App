import React from "react";
import { View, Text, StyleSheet, ViewProps, TextProps } from "react-native";

// Alert container
export function Alert({ style, children, ...props }: ViewProps) {
  return (
    <View style={[styles.alert, style]} accessibilityRole="alert" {...props}>
      {children}
    </View>
  );
}

// Alert title
export function AlertTitle({ style, children, ...props }: TextProps) {
  return (
    <Text style={[styles.title, style]} {...props}>
      {children}
    </Text>
  );
}

// Alert description
export function AlertDescription({ style, children, ...props }: TextProps) {
  return (
    <Text style={[styles.description, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  alert: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    flexDirection: 'column',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
    color: '#111',
  },
  description: {
    color: '#6b7280',
    fontSize: 14,
  },
});
