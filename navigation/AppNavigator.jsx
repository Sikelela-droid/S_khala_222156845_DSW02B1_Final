// navigation/AppNavigator.jsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Onboarding
import Onboarding1 from "../screens/Onboarding/Onboarding_1";
import Onboarding2 from "../screens/Onboarding/Onboarding_2";
import Onboarding3 from "../screens/Onboarding/Onboarding_3";

// Auth
import SignIn from "../screens/Auth/Login";
import SignUp from "../screens/Auth/SignUp";
import ForgotPassword from "../screens/Auth/ForgotPassword";

// Main
import Explore from "../screens/Explore";
import HotelDetails from "../screens/HotelDetails";
import Booking from "../screens/Booking";
import Profile from "../screens/Profile";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const OnboardingStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Onboarding1" component={Onboarding1} />
    <Stack.Screen name="Onboarding2" component={Onboarding2} />
    <Stack.Screen name="Onboarding3" component={Onboarding3} />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn" component={SignIn} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: "#6A0DAD",
      tabBarInactiveTintColor: "gray",
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "Explore") iconName = "home-outline";
        else if (route.name === "Profile") iconName = "person-outline";
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Explore" component={Explore} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default function AppNavigator({ user, showOnboarding }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <Stack.Screen name="OnboardingStack" component={OnboardingStack} />
      ) : user ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="HotelDetails" component={HotelDetails} />
          <Stack.Screen name="Booking" component={Booking} />
        </>
      ) : (
        <Stack.Screen name="AuthStack" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
