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

      Alert.alert("Falha ao criar conta");
    }
  }

  async function handleSignin() {
    try {
      if (!email || !password) {
        Alert.alert("Digite seu emal e senha!");
        return;
      }
      
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        Alert.alert("Usuário ou senha incorretos!");
        return;
      }
      if (error.code === "auth/invalid-email") {
        Alert.alert("E-mail inválido!");

        return;
      }

      Alert.alert("Falha ao realizar signin");
    }
  }

  async function handleSendMailResetPassword() {
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert("E-mail enviado para redefinir senha");
    } catch (error) {
      Alert.alert("Falha ao enviar e-mail de redefinição de senha");
    }
  }
  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <Input
        placeholder="senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button title="Entrar" onPress={handleSignin} />

      <Account>
        <ButtonText
          title="Recuperar senha"
          onPress={handleSendMailResetPassword}
        />
        <ButtonText
          title="Criar minha conta"
          onPress={handleCreateAccountUser}
        />
      </Account>
    </Container>
  );
}
