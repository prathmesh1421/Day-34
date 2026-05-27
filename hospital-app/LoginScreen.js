import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";

export default function LoginScreen({ navigation }) {

  const handleLogin = () => {
    navigation.replace("Main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#065f46" />

      <View style={styles.card}>
        <Text style={styles.logo}>🏥</Text>

        <Text style={styles.title}>Hospital Login</Text>

        <Text style={styles.subtitle}>Welcome Back Doctor</Text>

        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          placeholder="Enter Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login 🚀</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#065f46",
    padding: 20,
  },

  card: {
    width: Platform.OS === "web" ? 420 : "100%",
    backgroundColor: "#ffffff",
    padding: 30,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 10,
  },

  logo: {
    fontSize: 70,
    textAlign: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#065f46",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#64748b",
    marginBottom: 35,
  },

  input: {
    backgroundColor: "#f8fafc",
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
  },

  button: {
    backgroundColor: "#065f46",
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#065f46",
    shadowOpacity: 0.4,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
