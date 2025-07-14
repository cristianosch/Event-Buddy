import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/Login";
import SignupScreen from "./screens/Signup";
import RecoverPassScreen from "./screens/Recovery";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MainTabsNavigator from "./navigators/MainTabsNavigator";
import "./global.css"
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";


const Stack = createStackNavigator();

function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
        ) : (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
            <Stack.Screen name="RecoverPasswordScreen" component={RecoverPassScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      BebasNeue: require("./assets/fonts/BebasNeue-Regular.ttf"),
      UbuntuExtraLightItalic: require("./assets/fonts/UbuntuSans-ExtraLightItalic.ttf"),
      UbuntuCondensedMedium: require("./assets/fonts/UbuntuSans_Condensed-Medium.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) return <AppLoading />;
  
  return (    
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>   
  );
}
