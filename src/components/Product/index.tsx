import React from "react";
import firestore from "@react-native-firebase/firestore";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";
import { Alert } from "react-native";
import {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutRight,
} from "react-native-reanimated";

export type ProductProps = {
  id: string;
  description: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  async function handleToggleDoneProduct() {
    try {
      await firestore().collection("products").doc(data.id).update({
        done: !data.done,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  async function handleDeleteProduct() {
    try {
      await firestore().collection("products").doc(data.id).delete();
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  return (
    <Container
      entering={LightSpeedInLeft}
      layout={Layout.springify()}
      exiting={LightSpeedOutRight}
    >
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          onPress={handleToggleDoneProduct}
          icon={data.done ? "undo" : "check"}
        />

        <ButtonIcon onPress={handleDeleteProduct} icon="delete" color="alert" />
      </Options>
    </Container>
  );
}
