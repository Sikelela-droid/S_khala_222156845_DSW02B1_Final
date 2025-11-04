import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase";
import AppNavigator from "./navigation/AppNavigator";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const testDB = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      console.log("Firestore connection OK:", snapshot.size);
    };
    testDB();

    const init = async () => {
      const seen = await AsyncStorage.getItem("hasSeenOnboarding");
      if (!seen) setShowOnboarding(true);

      const unsub = onAuthStateChanged(auth, async (usr) => {
        setUser(usr);
        if (usr) await AsyncStorage.setItem("userToken", usr.uid);
        else await AsyncStorage.removeItem("userToken");
        setLoading(false);
      });
      return unsub;
    };
    init();
  }, []);

  const handleFinishOnboarding = () => setShowOnboarding(false);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6A0DAD" />
      </View>
    );

  return (
    <NavigationContainer>
      <AppNavigator
        user={user}
        showOnboarding={showOnboarding}
        onFinishOnboarding={handleFinishOnboarding} 
      />
    </NavigationContainer>
  );
}
