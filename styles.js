// styles.js
import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 20,
  },
  centeredContainer: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  backgroundColor: "#fff",
},
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  link: {
    color: "#6200ee",
    fontWeight: "500",
    marginTop: 8,
  },
  section: {
    marginTop: 16,
    alignItems: "center",
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  description: {
    fontSize: 15,
    color: "#444",
    marginTop: 8,
  },
  mapLink: {
    color: "blue",
    marginTop: 10,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  list: {
    padding: 16,
  },
  participantsText: {
  textAlign: "center",
  fontSize: 16,
  marginVertical: 10,
},
successContainer: {
  backgroundColor: "#d4edda",
  padding: 10,
  borderRadius: 5,
  borderColor: "#c3e6cb",
  borderWidth: 1,
},

successText: {
  color: "#155724",
  textAlign: "center",
  fontWeight: "bold",
},
});
