import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { auth } from "../firebaseConfig";
import { styles } from "../styles";

export default function Recuperacao({ navigation }) {
  const [email, setEmail] = useState("");

  const recuperarSenha = () => {
    if (email.trim() === "") {
      Alert.alert("Erro!", "Digite o email da conta.");
      return;
    }

    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Sucesso", "Email de recuperação enviado!");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Erro!", "Não foi possível enviar o email.");
      });
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
        <Text className="text-lg font-semibold text-center mb-4">Recuperar Senha</Text>

        <Text className="mb-1 text-gray-600" style={styles.label}>
          Digite o Email da conta:
        </Text>
        <TextInput
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TouchableOpacity className="mt-5" style={styles.button} onPress={recuperarSenha}>
          <Text style={styles.buttonText}>Recuperar</Text>
        </TouchableOpacity>

        {/* Link de login abaixo do botão */}
        <View className="mt-4 items-center">
          <Text className="text-gray-700 mb-2">Quer tentar entrar novamente?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text className="text-blue-600 underline">Aceder</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Link Sign up abaixo do card */}
      <TouchableOpacity
        className="mt-4"
        onPress={() => navigation.navigate("SignupScreen")}
      >
        <Text className="text-white underline font-semibold">
          Não está registrado? Crie uma conta
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
