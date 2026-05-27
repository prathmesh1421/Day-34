import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function ProfileScreen() {
  const [doctors, setDoctors] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);

  // Mock initial data
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = () => {
    const initial = [
      {
        id: "1",
        name: "Dr. Prathmesh Joshi",
        department: "Cardiology",
        experience: "8 Years",
        email: "prathmesh@hospital.com",
        phone: "+91 9876543210",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: "2",
        name: "Dr. Akash Patil",
        department: "Neurology",
        experience: "6 Years",
        email: "akash@hospital.com",
        phone: "+91 9876543211",
        image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
      },
      {
        id: "3",
        name: "Dr. Sanjay Kulkarni",
        department: "Orthopedics",
        experience: "10 Years",
        email: "sanjay@hospital.com",
        phone: "+91 9876543212",
        image: "https://cdn-icons-png.flaticon.com/512/921/921071.png",
      },
      {
        id: "4",
        name: "Dr. Priya Sharma",
        department: "Pediatrics",
        experience: "5 Years",
        email: "priya@hospital.com",
        phone: "+91 9876543213",
        image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
      },
    ];
    setDoctors(initial);
    setPage(1);
  };

  // Pull to Refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setTimeout(() => {
      loadDoctors();
      setRefreshing(false);
    }, 1000);
  }, []);

  // Infinite Scroll (Load More)
  const loadMore = useCallback(async () => {
    if (loadingMore) return;
    setLoadingMore(true);

    setTimeout(() => {
      const moreDoctors = [
        {
          id: Date.now().toString() + "1",
          name: `Dr. Rajesh Kumar ${page * 5 + 1}`,
          department: "General Medicine",
          experience: "12 Years",
          email: "rajesh@hospital.com",
          phone: "+91 9876543214",
          image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        },
        {
          id: Date.now().toString() + "2",
          name: `Dr. Anita Desai ${page * 5 + 2}`,
          department: "Gynecology",
          experience: "7 Years",
          email: "anita@hospital.com",
          phone: "+91 9876543215",
          image: "https://cdn-icons-png.flaticon.com/512/4140/4140048.png",
        },
      ];

      setDoctors((prev) => [...prev, ...moreDoctors]);
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 1000);
  }, [page, loadingMore]);

  // Actions
  const handleCall = (phone) => {
    Linking.openURL(`tel:${phone}`).catch(() =>
      Alert.alert("Error", "Unable to make call")
    );
  };

  const handleEmail = (email) => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert("Error", "Unable to send email")
    );
  };

  const handleProfilePress = (doctor) => {
    Alert.alert(
      doctor.name,
      `Department: ${doctor.department}\nExperience: ${doctor.experience}`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Call", onPress: () => handleCall(doctor.phone) },
        { text: "Email", onPress: () => handleEmail(doctor.email) },
      ]
    );
  };

  // Render Footer
  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#2E86DE" />
      </View>
    );
  };

  // Doctor Card
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => handleProfilePress(item)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.department}>🏥 {item.department}</Text>
        <Text style={styles.experience}>⭐ {item.experience} Experience</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => handleCall(item.phone)}
        >
          <Text style={styles.iconText}>📞</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => handleEmail(item.email)}
        >
          <Text style={styles.iconText}>✉️</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👨‍⚕️ Doctor Profiles</Text>

      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#2E86DE"]}
            tintColor="#2E86DE"
          />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        ListFooterComponent={renderFooter}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !refreshing ? (
            <Text style={styles.empty}>No doctors available</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    paddingTop: Platform.OS === "android" ? 35 : 45,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginLeft: 20,
    color: "#065f46",
  },

  listContent: {
    paddingBottom: 20,
    paddingHorizontal: 15,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#2E86DE",
  },

  infoContainer: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },

  department: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 2,
  },

  experience: {
    fontSize: 13,
    color: "#f59e0b",
    fontWeight: "600",
  },

  actionButtons: {
    flexDirection: "column",
    marginLeft: 10,
  },

  iconBtn: {
    backgroundColor: "#e0f2fe",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  iconText: {
    fontSize: 18,
  },

  footerLoader: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "#999",
    fontSize: 16,
  },
});
