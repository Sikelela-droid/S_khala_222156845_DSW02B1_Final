// screens/Booking.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";

export default function Booking({ route, navigation }) {
  const { hotel } = route.params;
  const [checkIn, setCheckIn] = useState(new Date());
  const [checkOut, setCheckOut] = useState(new Date());
  const [rooms, setRooms] = useState("1");
  const [showInPicker, setShowInPicker] = useState(false);
  const [showOutPicker, setShowOutPicker] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const calculateTotal = () => {
    const days =
      Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1);
    return hotel.price * days * parseInt(rooms || 1);
  };

  const handleBooking = () => {
    if (checkOut <= checkIn) {
      Alert.alert("Invalid Dates", "Check-out must be after check-in");
      return;
    }

    setConfirmed(true);
  };

  return (
    <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Booking at {hotel.name}</Text>

        <TouchableOpacity onPress={() => setShowInPicker(true)}>
          <Text style={styles.label}>Check-In Date</Text>
          <Text style={styles.dateText}>{checkIn.toDateString()}</Text>
        </TouchableOpacity>
        {showInPicker && (
          <DateTimePicker
            value={checkIn}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowInPicker(false);
              if (date) setCheckIn(date);
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShowOutPicker(true)}>
          <Text style={styles.label}>Check-Out Date</Text>
          <Text style={styles.dateText}>{checkOut.toDateString()}</Text>
        </TouchableOpacity>
        {showOutPicker && (
          <DateTimePicker
            value={checkOut}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowOutPicker(false);
              if (date) setCheckOut(date);
            }}
          />
        )}

        <Text style={styles.label}>Number of Rooms</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={rooms}
          onChangeText={setRooms}
        />

        <Text style={styles.totalText}>Total: R{calculateTotal()}</Text>

        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Confirm Booking</Text>
        </TouchableOpacity>

        {confirmed && (
          <View style={styles.confirmBox}>
            <Text style={styles.confirmTitle}>Booking Confirmed 🎉</Text>
            <Text style={styles.confirmText}>
              You have booked {hotel.name} from {checkIn.toDateString()} to{" "}
              {checkOut.toDateString()} ({rooms} room{rooms > 1 ? "s" : ""})
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  title: { color: COLORS.white, fontSize: 22, fontWeight: "700", marginBottom: 20 },
  label: { color: COLORS.white, marginTop: 15 },
  dateText: {
    backgroundColor: COLORS.accent,
    color: COLORS.textDark,
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  input: {
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    padding: 10,
    color: COLORS.textDark,
    marginTop: 5,
  },
  totalText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 16,
    marginVertical: 20,
  },
  button: {
    backgroundColor: COLORS.primaryLight,
    padding: 14,
    borderRadius: 15,
    alignItems: "center",
  },
  buttonText: { color: COLORS.white, fontWeight: "600", fontSize: 16 },
  confirmBox: {
    backgroundColor: COLORS.accent,
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
  },
  confirmTitle: { fontSize: 18, fontWeight: "700", color: COLORS.primaryDark },
  confirmText: { color: "#555", marginTop: 8 },
});
