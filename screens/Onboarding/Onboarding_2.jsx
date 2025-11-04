import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../../constants/colors";

const { width, height } = Dimensions.get("window");

export default function Onboarding2({ navigation }) {
  return (
    <LinearGradient colors={[COLORS.primary, COLORS.primaryLight]} style={styles.container}>
      <Image
        source={require("../../assets/Materials/01-Onboarding Page/Onboarding 2.png")}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.card}>
        <Text style={styles.title}>Book with Confidence</Text>
        <Text style={styles.subtitle}>
          Secure your next adventure with safe, seamless, and fast hotel booking.
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Onboarding3")}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width,
    height: height * 0.65,
  },
  card: {
    backgroundColor: COLORS.accent,
    width: "90%",
    borderRadius: 25,
    padding: 25,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  subtitle: {
    color: "#555",
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
});
