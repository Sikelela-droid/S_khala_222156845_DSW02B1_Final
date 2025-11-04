// screens/Profile.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { signOut, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase";
import { COLORS } from "../constants/colors";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";


export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [bookings, setBookings] = useState([
    {
      id: 1,
      hotel: "Royal Palm Hotel",
      dates: "10 – 12 Nov 2025",
    },
    {
      id: 2,
      hotel: "Ocean View Resort",
      dates: "15 – 18 Dec 2025",
    },
  ]);

  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Fetch user info
    const docRef = doc(db, "users", user.uid);
    const unsubscribeUser = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        setUser({ ...user, ...snap.data() });
      }
    });

  // Fetch bookings in real time
    const bookingsRef = collection(db, "users", user.uid, "bookings");
    const unsubscribeBookings = onSnapshot(bookingsRef, (snapshot) => {
      const fetchedBookings = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        dates: `${new Date(doc.data().checkIn).toDateString()} – ${new Date(
          doc.data().checkOut
        ).toDateString()}`,
      }));
      setBookings(fetchedBookings);
    });

    return () => {
      unsubscribeUser();
      unsubscribeBookings();
    };
  }, []);


  const handleUpdate = async () => {
    if (!newName) {
      Alert.alert("Error", "Please enter a name");
      return;
    }
    try {
      await updateProfile(auth.currentUser, { displayName: newName });

      // Update Firestore as well
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, { name: newName });

      setUser({ ...auth.currentUser, displayName: newName });
      setEditModal(false);
      Alert.alert("Success", "Profile updated!");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace("AuthStack");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  const renderBooking = ({ item }) => (
    <View style={styles.bookingCard}>
      <Text style={styles.hotel}>{item.hotel}</Text>
      <Text style={styles.dates}>{item.dates}</Text>
    </View>
  );

  return (
    <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {user ? (
        <View style={styles.card}>
          <Text style={styles.name}>{user.displayName || "Guest User"}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <TouchableOpacity style={styles.editButton} onPress={() => setEditModal(true)}>
            <Text style={styles.editText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>My Bookings</Text>
          <FlatList
            data={bookings}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderBooking}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListEmptyComponent={
              <Text style={{ color: "#555", textAlign: "center", marginTop: 10 }}>
                No bookings yet.
              </Text>
            }
          />
        </View>
      ) : (
        <Text style={{ color: COLORS.white, marginTop: 50, textAlign: "center" }}>
          Loading user info...
        </Text>
      )}

      {/* Edit Profile Modal */}
      <Modal visible={editModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput
              placeholder="Enter new name"
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setEditModal(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginTop: 50, marginBottom: 20 },
  title: { color: COLORS.white, fontSize: 28, fontWeight: "700" },
  card: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  name: { fontSize: 22, fontWeight: "700", color: COLORS.primaryDark },
  email: { color: "#555", marginBottom: 20 },
  editButton: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  editText: { color: COLORS.white, fontWeight: "600" },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  logoutText: { color: COLORS.primary, fontWeight: "700" },
  sectionTitle: {
    color: COLORS.primaryDark,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  bookingCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  hotel: { color: COLORS.primaryDark, fontWeight: "700" },
  dates: { color: "#555" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContent: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    padding: 25,
    width: "85%",
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "700", color: COLORS.primaryDark, marginBottom: 10 },
  input: {
    backgroundColor: "#fff",
    width: "100%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    alignItems: "center",
  },
  saveText: { color: COLORS.white, fontWeight: "600" },
  cancelText: { color: "#777", marginTop: 10 },
});
