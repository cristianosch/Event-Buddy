import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { signUp } from "../services/firebaseAuth";
import { styles } from "../styles";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      navigation.navigate("HomeScreen", {
        screen: "HomeScreen",
        successMessage: "Conta criada com sucesso!",
      });
    } catch (error) {
      console.log(error.message);
      Alert.alert("Erro", "Falha ao criar conta. Verifique os dados.");
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1616604248350-6038cc1af5e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      }}
      style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      resizeMode="cover"
    >
      <View className="bg-white p-6 rounded-xl shadow-md w-full max-w-[400px] mx-4">
        <Text className="text-lg font-semibold text-center mb-4">Criar Conta</Text>

        <Text className="mb-1 text-gray-600" style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="seu@email.com"
        />

        <Text className="mb-1 text-gray-600" style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="********"
        />

        <TouchableOpacity className="mt-5" style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>

      {/* Link para Login abaixo do card */}
      <TouchableOpacity className="mt-4" onPress={() => navigation.navigate("LoginScreen")}>
        <Text className="text-white underline font-semibold">
          Já tem conta? Aceder
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
