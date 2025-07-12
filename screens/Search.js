import React from "react";
import { View, TextInput } from "react-native";

export default function Search({ value, onChangeText }) {
  return (
    <View className="bg-white border border-gray-300 rounded-lg px-4 py-2 mb-4">
      <TextInput
        placeholder="Buscar por nome, local ou data exemplo mês 8"
        value={value}
        onChangeText={onChangeText}
        className="text-base text-gray-800"
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}
