// src/screens/PatientsScreen.js

import React, {
  useState,
  useEffect,
  useCallback,
} from "react";

import {
  View,
  Text,
 StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  Alert,
} from "react-native";

import {
  GestureHandlerRootView,
} from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import AsyncStorage from "@react-native-async-storage/async-storage";

// ======================================================
// DUMMY API FUNCTIONS
// ======================================================

// GET PATIENTS
const getPatientsApi = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1",
          name: "Rahul Sharma",
          disease: "Fever",
        },
        {
          id: "2",
          name: "Priya Mehta",
          disease: "Diabetes",
        },
        {
          id: "3",
          name: "Amit Shah",
          disease: "Flu",
        },
        {
          id: "4",
          name: "Sneha Joshi",
          disease: "Cold",
        },
      ]);
    }, 1000);
  });
};

// ADD PATIENT
const addPatientApi = async (
  patientData
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        patient: {
          id: Date.now().toString(),
          ...patientData,
        },
      });
    }, 1000);
  });
};

// DELETE PATIENT
const deletePatientApi = async (
  patientId
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        deletedId: patientId,
      });
    }, 1000);
  });
};

// LOAD MORE
const loadMorePatientsApi = async (
  page
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const morePatients = Array.from({
        length: 5,
      }).map((_, i) => ({
        id: Date.now().toString() + i,
        name: `Patient ${page * 5 + i + 1}`,
        disease: "General Checkup",
      }));

      resolve(morePatients);
    }, 1000);
  });
};

// ======================================================
// MAIN SCREEN
// ======================================================

export default function PatientsScreen({
  navigation,
}) {
  const [patients, setPatients] =
    useState([]);

  const [name, setName] = useState("");

  const [disease, setDisease] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [loadingMore, setLoadingMore] =
    useState(false);

  const [page, setPage] = useState(1);

  // ======================================================
  // INITIAL LOAD
  // ======================================================

  const loadPatients = async () => {
    try {
      setLoading(true);

      const data =
        await getPatientsApi();

      console.log(
        "PATIENT DATA =>",
        data
      );

      setPatients(data);

      setPage(1);
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to load patients"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  // ======================================================
  // ADD PATIENT
  // ======================================================

  const handleAdd = async () => {
    if (
      !name.trim() ||
      !disease.trim()
    ) {
      Alert.alert(
        "Validation",
        "Please enter patient name and disease"
      );

      return;
    }

    try {
      const response =
        await addPatientApi({
          name: name.trim(),
          disease: disease.trim(),
        });

      setPatients((prev) => [
        response.patient,
        ...prev,
      ]);

      setName("");
      setDisease("");

      Alert.alert(
        "Success",
        "Patient added successfully"
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to add patient"
      );
    }
  };

  // ======================================================
  // DELETE PATIENT
  // ======================================================

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Patient",
      "Are you sure you want to delete this patient?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              await deletePatientApi(id);

              setPatients((prev) =>
                prev.filter(
                  (item) =>
                    item.id !== id
                )
              );

              Alert.alert(
                "Deleted",
                "Patient removed successfully"
              );
            } catch (error) {
              console.log(error);

              Alert.alert(
                "Error",
                "Delete failed"
              );
            }
          },
        },
      ]
    );
  };

  // ======================================================
  // REFRESH
  // ======================================================

  const handleRefresh =
    useCallback(async () => {
      try {
        setRefreshing(true);

        const data =
          await getPatientsApi();

        console.log(
          "REFRESH DATA =>",
          data
        );

        setPatients(data);
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Refresh failed"
        );
      } finally {
        setRefreshing(false);
      }
    }, []);

  // ======================================================
  // LOAD MORE
  // ======================================================

  const handleLoadMore =
    useCallback(async () => {
      if (loadingMore) return;

      try {
        setLoadingMore(true);

        const moreData =
          await loadMorePatientsApi(
            page
          );

        console.log(
          "LOAD MORE =>",
          moreData
        );

        setPatients((prev) => [
          ...prev,
          ...moreData,
        ]);

        setPage((prev) => prev + 1);
      } catch (error) {
        console.log(error);

        Alert.alert(
          "Error",
          "Unable to load more patients"
        );
      } finally {
        setLoadingMore(false);
      }
    }, [page, loadingMore]);

  // ======================================================
  // LOGOUT
  // ======================================================

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem(
        "token"
      );

      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Login",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ======================================================
  // FOOTER
  // ======================================================

  const renderFooter = () => {
    if (!loadingMore) return null;

    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator
          size="small"
          color="#065f46"
        />
      </View>
    );
  };

  // ======================================================
  // RIGHT SWIPE ACTION
  // ======================================================

  const renderRightActions = (
    id
  ) => {
    return (
      <TouchableOpacity
        style={styles.deleteBox}
        onPress={() =>
          handleDelete(id)
        }
      >
        <Text style={styles.deleteText}>
          🗑️ Delete
        </Text>
      </TouchableOpacity>
    );
  };

  // ======================================================
  // CARD ITEM
  // ======================================================

  const renderItem = ({ item }) => {
    return (
      <Swipeable
        renderRightActions={() =>
          renderRightActions(item.id)
        }
      >
        <View style={styles.card}>
          <View
            style={styles.cardContent}
          >
            <Text style={styles.name}>
              {item.name}
            </Text>

            <Text
              style={styles.disease}
            >
              {item.disease}
            </Text>
          </View>
        </View>
      </Swipeable>
    );
  };

  // ======================================================
  // LOADING SCREEN
  // ======================================================

  if (loading) {
    return (
      <View
        style={
          styles.loaderContainer
        }
      >
        <ActivityIndicator
          size="large"
          color="#065f46"
        />

        <Text
          style={{
            marginTop: 10,
          }}
        >
          Loading Patients...
        </Text>
      </View>
    );
  }

  // ======================================================
  // MAIN UI
  // ======================================================

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={styles.container}
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Text
            style={
              styles.headerTitle
            }
          >
            Patients
          </Text>

          <TouchableOpacity
            onPress={
              handleLogout
            }
          >
            <Text
              style={
                styles.logoutText
              }
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {/* FORM */}

        <View style={styles.form}>
          <TextInput
            placeholder="Patient Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Disease / Condition"
            value={disease}
            onChangeText={setDisease}
            style={styles.input}
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAdd}
          >
            <Text
              style={
                styles.btnText
              }
            >
              + Add Patient
            </Text>
          </TouchableOpacity>
        </View>

        {/* LIST */}

        <FlatList
          data={patients}
          keyExtractor={(item) =>
            item.id
          }
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                handleRefresh
              }
              colors={[
                "#065f46",
              ]}
              tintColor="#065f46"
            />
          }
          onEndReached={
            handleLoadMore
          }
          onEndReachedThreshold={
            0.3
          }
          ListFooterComponent={
            renderFooter
          }
          contentContainerStyle={
            styles.listContent
          }
          showsVerticalScrollIndicator={
            false
          }
          ListEmptyComponent={
            <Text
              style={
                styles.empty
              }
            >
              No patients found
            </Text>
          }
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "row",
    justifyContent:
      "space-between",

    alignItems: "center",

    backgroundColor: "#065f46",

    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

  logoutText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  form: {
    backgroundColor: "#fff",

    margin: 15,
    marginBottom: 5,

    padding: 15,

    borderRadius: 12,

    elevation: 3,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",

    borderRadius: 8,

    padding: 12,

    marginBottom: 10,

    fontSize: 16,

    backgroundColor: "#fafafa",
  },

  addBtn: {
    backgroundColor: "#065f46",

    padding: 14,

    borderRadius: 8,

    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: "#fff",

    marginHorizontal: 15,
    marginVertical: 6,

    padding: 16,

    borderRadius: 10,

    elevation: 2,
  },

  cardContent: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    alignItems: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111",

    flex: 1,
  },

  disease: {
    fontSize: 14,
    color: "#555",

    backgroundColor: "#e8f4fd",

    paddingHorizontal: 10,
    paddingVertical: 4,

    borderRadius: 12,
  },

  deleteBox: {
    backgroundColor: "#ef4444",

    justifyContent: "center",
    alignItems: "center",

    width: 100,

    marginVertical: 6,
    marginRight: 15,

    borderRadius: 10,
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  footerLoader: {
    marginTop: 10,
    marginBottom: 10,

    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,

    color: "#999",

    fontSize: 16,
  },
});
