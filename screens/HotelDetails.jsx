// screens/HotelDetails.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";

export default function HotelDetails({ route, navigation }) {
  const { hotel } = route.params;
  const [reviews, setReviews] = useState([
    { id: 1, name: "Thabo", rating: 5, text: "Amazing experience and friendly staff!" },
    { id: 2, name: "Anele", rating: 4, text: "Clean rooms and great location!" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);

  const handleAddReview = () => {
    if (!reviewText || reviewRating === 0) {
      Alert.alert("Error", "Please add both a rating and comment.");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: "You",
      rating: reviewRating,
      text: reviewText,
    };
    setReviews([newReview, ...reviews]);
    setShowModal(false);
    setReviewText("");
    setReviewRating(0);
  };

  return (
    <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={hotel.image} style={styles.image} resizeMode="cover" />

        <View style={styles.info}>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.location}>{hotel.location}</Text>

          <View style={styles.row}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <Text style={styles.rating}>{hotel.rating}</Text>
            <Text style={styles.price}> · R{hotel.price}/night</Text>
          </View>

          <Text style={styles.description}>
            Experience luxury at {hotel.name}, located in the heart of {hotel.location}. Enjoy
            world-class amenities, stunning views, and excellent service.
          </Text>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={() => navigation.navigate("Booking", { hotel })}
          >
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>

          <View style={styles.reviewsSection}>
            <Text style={styles.reviewTitle}>Reviews</Text>
            {reviews.length === 0 ? (
              <Text style={{ color: "#888" }}>No reviews yet.</Text>
            ) : (
              reviews.map((item) => (
                <View key={item.id} style={styles.reviewCard}>
                  <View style={styles.row}>
                    <Ionicons name="person-circle" size={24} color={COLORS.primaryDark} />
                    <Text style={styles.reviewer}>{item.name}</Text>
                    <Ionicons name="star" size={16} color="#FFD700" style={{ marginLeft: 6 }} />
                    <Text style={styles.reviewer}>{item.rating}</Text>
                  </View>
                  <Text style={styles.reviewText}>{item.text}</Text>
                </View>
              ))
            )}

            <TouchableOpacity style={styles.addReviewButton} onPress={() => setShowModal(true)}>
              <Text style={styles.addReviewText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Review Modal */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Write a Review</Text>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setReviewRating(star)}>
                  <Ionicons
                    name={star <= reviewRating ? "star" : "star-outline"}
                    size={28}
                    color="#FFD700"
                    style={{ marginHorizontal: 3 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.input}
              placeholder="Write your experience..."
              multiline
              value={reviewText}
              onChangeText={setReviewText}
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleAddReview}>
              <Text style={styles.modalButtonText}>Submit Review</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancel}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: "100%", height: 250, borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  info: { padding: 20, backgroundColor: COLORS.accent, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  name: { fontSize: 22, fontWeight: "700", color: COLORS.primaryDark },
  location: { color: "#555", marginBottom: 10 },
  row: { flexDirection: "row", alignItems: "center" },
  rating: { marginLeft: 4, fontWeight: "600", color: "#333" },
  price: { color: COLORS.primary, fontWeight: "600", marginLeft: 5 },
  description: { marginTop: 10, color: "#333", lineHeight: 22 },
  bookButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  bookText: { color: COLORS.white, fontWeight: "600", fontSize: 16 },
  reviewsSection: { marginTop: 25 },
  reviewTitle: { fontSize: 20, fontWeight: "700", color: COLORS.primaryDark, marginBottom: 10 },
  reviewCard: { backgroundColor: "#fff", padding: 12, borderRadius: 12, marginBottom: 10 },
  reviewer: { fontWeight: "600", color: COLORS.primaryDark },
  reviewText: { marginTop: 5, color: "#555" },
  addReviewButton: {
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  addReviewText: { color: COLORS.white, fontWeight: "600" },
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
  ratingRow: { flexDirection: "row", marginVertical: 10 },
  input: {
    width: "100%",
    minHeight: 80,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  modalButtonText: { color: COLORS.white, fontWeight: "600" },
  cancel: { color: "#777", marginTop: 10 },
});
