import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function Header({ title, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {onLogout && (
        <TouchableOpacity onPress={onLogout}>
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#2E86DE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  logout: {
    color: "#fff",
    fontSize: 16,
  },
});
