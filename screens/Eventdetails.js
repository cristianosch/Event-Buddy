import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { database } from "../firebaseConfig";
import { styles } from "../styles";
import { useAuth } from "../context/AuthContext";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function EventDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useAuth();
  const { eventId } = route.params;

  const [event, setEvent] = useState(null);
  const [favorited, setFavorited] = useState(false);
  const [participating, setParticipating] = useState(false);
  const [participantsCount, setParticipantsCount] = useState(0);

  // Check for events updates
  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, "events", eventId), (docSnap) => {
      if (docSnap.exists()) {
        setEvent(docSnap.data());
        setParticipantsCount(docSnap.data().participants?.length || 0);
      }
    });

    return () => unsubscribe();
  }, [eventId]);

  // Check for favorites and User participation
  useEffect(() => {
    if (!user) return;

    const userRef = doc(database, "users", user.uid);

    const checkStatus = async () => {
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        setFavorited(userData.favorites?.includes(eventId));
        setParticipating(userData.participations?.includes(eventId) || false);
      }
    };

    checkStatus();
  }, [user, eventId]);

  const toggleFavorito = async () => {
    const userRef = doc(database, "users", user.uid);

    try {
      if (favorited) {
        await updateDoc(userRef, {
          favorites: arrayRemove(eventId),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(eventId),
        });
      }
      setFavorited(!favorited);
    } catch (error) {
      console.log("Erro ao atualizar favoritos:", error);
    }
  };

  const toggleParticipating = async () => {
    const userRef = doc(database, "users", user.uid);
    const eventRef = doc(database, "events", eventId);

    try {
      if (participating) {
        await updateDoc(userRef, {
          participations: arrayRemove(eventId),
        });
        await updateDoc(eventRef, {
          participants: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(userRef, {
          participations: arrayUnion(eventId),
        });
        await updateDoc(eventRef, {
          participants: arrayUnion(user.uid),
        });
      }
      setParticipating(!participating);
    } catch (error) {
      console.log("Erro ao atualizar participação:", error);
    }
  };

  if (!event) {
    return (
      <View style={styles.container}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  const dateObj = event.datetime.toDate();
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const { latitude, longitude, name: locationName } = event.location;

  return (
    <ScrollView style={styles.container}>
      {/* Heart image */}
      <View className="relative">
        <Image source={{ uri: event.imageUrl }} style={styles.image} />
        <View className="absolute right-4 top-4 z-10">
          <TouchableOpacity onPress={toggleFavorito}>
            <Ionicons
              name={favorited ? "heart" : "heart-outline"}
              size={30}
              color={favorited ? "red" : "gray"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text className="text-center text-[25px] font-bold mt-2 mb-2">
        {event.title}
      </Text>

      <View className="bg-blue-50 mb-8 rounded-lg">
        <View className="flex-row justify-between items-center px-2 my-2 p-2">
          <Text className="font-bold text-[16px]">{`${date} ${time}`}</Text>
          <Text className="font-bold text-[16px] text-red-500" style={styles.participantsText}>
            Participantes: {participantsCount}
          </Text>
        </View>
        <Text className="p-2 text-center" style={styles.eventDescription}>
          {event.description}
        </Text>
      </View>

      {/* Location name */}
        <Text className="p-1 text-center text-[15px] font-bold" >
          {event.location}
        </Text>     


        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 px-4 mb-4"
          onPress={() => Linking.openURL(`https://www.google.com/maps?q=${event.latitude},${event.longitude}`)}
        >
          <Text className="text-white text-center font-semibold">Ver no mapa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-red-600 rounded-lg py-3 px-4 my-2 mb-5"
          onPress={toggleParticipating}
        >
          <Text className="text-white text-center font-semibold ">
            {participating ? "Cancelar Participação" : "Participar do Evento"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-blue-500 rounded-lg py-3 px-4 mb-5"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-white text-center font-semibold">Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    );
}
