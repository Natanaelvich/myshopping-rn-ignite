import React from "react";
import firestore from "@react-native-firebase/firestore";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";

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
    await firestore().collection("products").doc(data.id).update({
      done: !data.done,
    });
  }

  async function handleDeleteProduct() {
    await firestore().collection("products").doc(data.id).delete()
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.description}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options >
        <ButtonIcon onPress={handleToggleDoneProduct} icon={data.done ? "undo" : "check"} />

        <ButtonIcon onPress={handleDeleteProduct} icon="delete" color="alert" />
      </Options>
    </Container>
  );
}
