// screens/Explore.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";

export default function Explore({ navigation }) {
  const [hotels, setHotels] = useState([
    {
      id: "1",
      name: "Royal Palm Hotel",
      location: "Sandton, Johannesburg",
      rating: 4.8,
      price: 1200,
      image: require("../assets/Materials/06-Explore Page/image-13.png"),
    },
    {
      id: "2",
      name: "Ocean View Resort",
      location: "Durban Beachfront",
      rating: 4.6,
      price: 950,
      image: require("../assets/Materials/06-Explore Page/image-4.png"),
    },
    {
      id: "3",
      name: "Mountain Peak Lodge",
      location: "Drakensberg",
      rating: 4.9,
      price: 1750,
      image: require("../assets/Materials/06-Explore Page/rectangle 783.png"),
    },
  ]);

  const [sortBy, setSortBy] = useState("rating");
  const [search, setSearch] = useState("");

  // Sorting logic
  const sortedHotels = [...hotels].sort((a, b) =>
    sortBy === "price" ? a.price - b.price : b.rating - a.rating
  );

  // Filter by search term
  const filteredHotels = sortedHotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderHotel = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("HotelDetails", { hotel: item })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.location}>{item.location}</Text>
        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
        <Text style={styles.price}>R{item.price} / night</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={[COLORS.primaryDark, COLORS.primary]} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore Hotels</Text>
        <Text style={styles.subtitle}>Find your next stay</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search hotels..."
            placeholderTextColor="#aaa"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.filterRow}>
          <Text style={styles.filterText}>Sort by:</Text>
          <TouchableOpacity
            style={[styles.filterButton, sortBy === "rating" && styles.activeFilter]}
            onPress={() => setSortBy("rating")}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortBy === "rating" && styles.activeFilterText,
              ]}
            >
              Rating
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, sortBy === "price" && styles.activeFilter]}
            onPress={() => setSortBy("price")}
          >
            <Text
              style={[
                styles.filterButtonText,
                sortBy === "price" && styles.activeFilterText,
              ]}
            >
              Price
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredHotels}
        keyExtractor={(item) => item.id}
        renderItem={renderHotel}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 15, paddingTop: 50 },
  header: { marginBottom: 20 },
  title: { color: COLORS.white, fontSize: 28, fontWeight: "700" },
  subtitle: { color: COLORS.white, opacity: 0.8, marginBottom: 20 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 15,
  },
  searchInput: { flex: 1, fontSize: 15, color: "#333" },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterText: { color: COLORS.white, marginRight: 10, fontWeight: "600" },
  filterButton: {
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  filterButtonText: { color: COLORS.white },
  activeFilter: { backgroundColor: COLORS.white },
  activeFilterText: { color: COLORS.primary },
  card: {
    backgroundColor: COLORS.accent,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  image: { width: "100%", height: 180 },
  info: { padding: 15 },
  name: { fontSize: 18, fontWeight: "700", color: COLORS.primaryDark },
  location: { color: "#555", marginBottom: 5 },
  row: { flexDirection: "row", alignItems: "center" },
  rating: { marginLeft: 5, color: "#333" },
  price: { marginTop: 8, color: COLORS.primary, fontWeight: "700" },
});
