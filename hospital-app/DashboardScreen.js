import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen({ navigation }) {
  const services = [
    {
      title: "Emergency Care",
      icon: "🚑",
      desc: "24/7 Emergency Support",
    },
    {
      title: "OPD Services",
      icon: "🩺",
      desc: "Specialist Consultation",
    },
    {
      title: "Pharmacy",
      icon: "💊",
      desc: "Medicines Available",
    },
    {
      title: "Laboratory",
      icon: "🧪",
      desc: "Fast Test Reports",
    },
    {
      title: "ICU Support",
      icon: "❤️",
      desc: "Critical Care Unit",
    },
    // {
    //   title: "Appointments",
    //   icon: "📅",
    //   desc: "Easy Booking System",
    // },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome Doctor 👋</Text>
        <Text style={styles.title}>Hospital Dashboard</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>120+</Text>
          <Text style={styles.statsText}>Patients</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>15</Text>
          <Text style={styles.statsText}>Doctors</Text>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsNumber}>24/7</Text>
          <Text style={styles.statsText}>Support</Text>
        </View>
      </View>

      {/* Services */}
      <Text style={styles.sectionTitle}>Hospital Services</Text>

      <View style={styles.grid}>
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.cardIcon}>{item.icon}</Text>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardText}>{item.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Patients")}
      >
        <Text style={styles.actionEmoji}>👨‍⚕️</Text>

        <View>
          <Text style={styles.actionTitle}>View Patients</Text>
          <Text style={styles.actionSubtitle}>
            Check all patient records
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.actionEmoji}>👤</Text>

        <View>
          <Text style={styles.actionTitle}>Doctor Profile</Text>
          <Text style={styles.actionSubtitle}>Manage your account</Text>
        </View>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.actionCard}
        onPress={() => navigation.navigate("Appointments")}
      >
        <Text style={styles.actionEmoji}>📅</Text>

        <View>
          <Text style={styles.actionTitle}>Appointments</Text>
          <Text style={styles.actionSubtitle}>Book appointments</Text>
        </View>
      </TouchableOpacity> */}

      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
  },

  header: {
    backgroundColor: "#065f46",
    padding: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  welcome: {
    color: "#d1fae5",
    fontSize: 18,
    marginBottom: 5,
  },

  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -30,
  },

  statsCard: {
    backgroundColor: "#fff",
    width: "31%",
    padding: 18,
    borderRadius: 18,
    alignItems: "center",
    elevation: 5,
  },

  statsNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#065f46",
  },

  statsText: {
    color: "#64748b",
    marginTop: 5,
    fontSize: 12,
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
    marginTop: 30,
    marginBottom: 18,
    paddingHorizontal: 20,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 18,
    elevation: 4,
  },

  cardIcon: {
    fontSize: 34,
    marginBottom: 12,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },

  cardText: {
    color: "#64748b",
    fontSize: 14,
  },

  actionCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },

  actionEmoji: {
    fontSize: 30,
    marginRight: 18,
  },

  actionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
  },

  actionSubtitle: {
    color: "#64748b",
    marginTop: 4,
  },
});
