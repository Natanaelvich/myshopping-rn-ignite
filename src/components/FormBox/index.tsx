import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import { Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export function FormBox() {
  const { user } = useAuth();

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);

  async function handleCreateProduct() {
    try {
      await firestore().collection("products").add({
        description,
        quantity,
        done: false,
        author: user?.uid,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    } catch (error: any) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  return (
    <Container>
      <Input
        onChangeText={setDescription}
        placeholder="Nome do produto"
        size="medium"
      />

      <Input
        onChangeText={(value) => setQuantity(Number(value))}
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleCreateProduct}
      />
    </Container>
  );
}
