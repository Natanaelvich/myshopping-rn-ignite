import React, { useState } from "react";
import auth from "@react-native-firebase/auth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { Alert } from "react-native";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleCreateAccountUser() {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        Alert.alert("E-mail ja está cadastrado!");

        return;
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("E-mail inválido!");

        return;
      }
      if (error.code === "auth/weak-password") {
        Alert.alert("A senha deve ter no minimo 6 digitos!");

        return;
      }

      Alert.alert('Falha ao criar conta');

    }
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input placeholder="e-mail" value={email} onChangeText={setEmail} />

      <Input
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
        keyboardType="email-address"
      />

      <Button title="Entrar" onPress={() => {}} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={() => {}} />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateAccountUser}
        />
      </Account>
    </Container>
  );
}
