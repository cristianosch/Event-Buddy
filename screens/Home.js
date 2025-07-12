import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { database } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { styles } from "../styles";
import Search from "./Search"; 

export default function Home() {
  const { logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const successMessage = route.params?.successMessage;

  useEffect(() => {
    const unsubscribe = database
      .collection("events")
      .orderBy("datetime", "asc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(data);
      });

    return () => unsubscribe();
  }, []);

  const filteredEvents = events.filter((event) => {
    const query = searchTerm.toLowerCase();
    const title = event.title?.toLowerCase() || "";
    const location = event.location?.toLowerCase() || "";
    const date = event.datetime.toDate().toLocaleDateString("pt-BR");

    return (
      title.includes(query) ||
      location.includes(query) ||
      date.includes(query)
    );
  });

  const renderItem = ({ item }) => {
    const dateObj = item.datetime.toDate();
    const date = dateObj.toLocaleDateString("pt-BR");
    const time = dateObj.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EventDetails", { eventId: item.id })}
      >
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.date}>{`${date} ${time}`}</Text>
        <Text style={styles.text}>{item.location}</Text>
        <Text
          style={styles.link}
          onPress={() =>
            Linking.openURL(
              `https://www.google.com/maps?q=${item.latitude},${item.longitude}`
            )
          }
        >
          Ver no mapa
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {successMessage && (
        <View style={[styles.successContainer, { marginBottom: 10 }]}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      <Text style={styles.header}>Próximos eventos</Text>

      <Search value={searchTerm} onChangeText={setSearchTerm} />

      {filteredEvents.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          Nenhum evento encontrado.
        </Text>
      ) : (
        <FlatList
          data={filteredEvents.slice(0, 4)} 
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Events")}>
        <Text style={styles.buttonText}>Ver todos os eventos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-red-600 rounded-lg py-3 px-4 "
        onPress={logout}
      >
        <Text className="text-white text-center font-semibold">Sair da Conta</Text>
      </TouchableOpacity>
          </SafeAreaView>
    );
}
