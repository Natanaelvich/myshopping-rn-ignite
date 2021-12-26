import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";
import { Alert } from "react-native";

export function FormBox() {
  const [description, setDescription] = useState("");
  const [quantiry, setQuantiry] = useState(0);

  async function handleCreateProduct() {
    try {
      const productRef = await firestore()
        .collection("products")
        .add({ description, quantiry, done: false });

      const product = await productRef.get();

      console.log(product.data());
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
        onChangeText={(value) => setQuantiry(Number(value))}
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
