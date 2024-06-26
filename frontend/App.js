import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

import LoadingScreen from "./screens/LoadingScreen";
import SurveyScreen from "./screens/SurveyScreen";
import HomeScreen from "./screens/HomeScreen";
import WelcomePage from "./screens/WelcomePage";
import ChatScreen from "./screens/ChatScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  useEffect(() => {
    async function checkFirstLaunch() {
      // Function to check if the app has launched before
      try {
        const value = await AsyncStorage.getItem("hasLaunched");
        if (value === null) {
          // If it is first launch then survey is given
          await AsyncStorage.setItem("hasLaunched", "true");
          setIsFirstLaunch(true);
        } else {
          setIsFirstLaunch(false);
        }
      } catch (error) {
        console.error("Error checking app launch status", error);
        setIsFirstLaunch(true); // Default to true if error occurs
      } finally {
        // Simulate a 2-second delay
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 2000 milliseconds = 2 seconds
      }
    }
    checkFirstLaunch();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <ImageBackground
      source={require("./assets/background.png")} // Replace with your local image path
      style={styles.backgroundImage}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isFirstLaunch ? "WelcomePage" : "HomeScreen"}
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        >
          <Stack.Screen name="WelcomePage" component={WelcomePage} />
          <Stack.Screen name="Survey" component={SurveyScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
