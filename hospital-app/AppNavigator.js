import React, { useState, useEffect } from "react";
import { View, Text } from "react-native"; // ⭐ ADD THIS
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import PatientsScreen from "../screens/PatientsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// ✅ Tabs
function MainTabs({ setIsLoggedIn }) {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      
      <Tab.Screen name="Dashboard">
        {(props) => (
          <DashboardScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Patients">
        {(props) => (
          <PatientsScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Tab.Screen>

      <Tab.Screen name="Profile">
        {(props) => (
          <ProfileScreen {...props} setIsLoggedIn={setIsLoggedIn} />
        )}
      </Tab.Screen>

    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    } catch (e) {
      console.log("Error reading token", e);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: show custom loader instead of null
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18 }}>Loading App...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Main">
            {(props) => (
              <MainTabs {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
