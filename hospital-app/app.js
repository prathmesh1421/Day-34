
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./src/navigation/AppNavigator";

// Keep splash screen visible
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepareApp() {
      try {
        // Load fonts, API calls, AsyncStorage, etc.

        await new Promise((resolve) =>
          setTimeout(resolve, 1000)
        );

      } catch (error) {
        console.log(error);
      } finally {
        setIsReady(true);

        // Hide splash screen
        await SplashScreen.hideAsync();
      }
    }

    prepareApp();
  }, []);

  // Prevent rendering before app is ready
  if (!isReady) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppNavigator />
    </GestureHandlerRootView>
  );
}
