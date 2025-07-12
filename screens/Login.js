import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { signIn } from "../services/firebaseAuth";
import { styles } from "../styles";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signIn(email, password);
    } catch (error) {
      console.log(error.message);
      alert("Login failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1616604248350-6038cc1af5e4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" }}
      style={[styles.container, { justifyContent: "center", alignItems: "center" }]}
      resizeMode="cover"
    >
      <View className="w-full p-5 rounded-lg bg-white/85 shadow-lg shadow-black/20">
        <Text className="text-[30px]  text-center mb-5 font-bold">Welcome To Event Buddy</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("RecoverPasswordScreen")}>
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
          <Text style={styles.link}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
