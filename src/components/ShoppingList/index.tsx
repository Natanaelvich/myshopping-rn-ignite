import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";
import Snackbar from "react-native-snackbar";
import { MotiView } from "moti";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";
import { useAuth } from "../../hooks/useAuth";
import { ContentSkeleton } from "../Skeleton";

export function ShoppingList() {
  const { user } = useAuth();

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const subscriber = firestore()
      .collection("products")
      .where("author", "==", user?.uid)
      .onSnapshot(
        (documentSnapshot) => {
          setTimeout(() => {
            setProducts(
              documentSnapshot.docs
                .map((d) => ({
                  id: d.id,
                  description: d.data().description,
                  quantity: d.data().quantity,
                  done: d.data().done,
                  deleted: d.data().deleted,
                }))
                .filter((d) => {
                  if (d.deleted === undefined || d.deleted === false) {
                    return true;
                  }

                  if (d.deleted) {
                    return false;
                  }
                })
            );
          }, 700);

          setTimeout(() => {
            setLoading(false);
          }, 500);
        },
        (error) => {
          setLoading(false);
          Alert.alert(error.message);
        }
      );

    return () => subscriber();
  }, []);

  async function handleToggleDoneProduct(data: { id: string; done: boolean }) {
    try {
      await firestore().collection("products").doc(data.id).update({
        done: !data.done,
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  async function changeProductToNotDeleted(idProduct: string) {
    await firestore().collection("products").doc(idProduct).update({
      deleted: false,
    });
  }

  async function handleDeleteProduct(data: { id: string; done: boolean }) {
    try {
      await firestore().collection("products").doc(data.id).update({
        deleted: true,
      });

      Snackbar.show({
        text: "Deletado com sucesso",
        duration: Snackbar.LENGTH_SHORT,
        action: {
          text: "DESFAZER",
          textColor: "green",
          onPress: () => changeProductToNotDeleted(data.id),
        },
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  if (loading) {
    return <ContentSkeleton />;
  }
  return (
    <MotiView
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ScrollView contentContainerStyle={styles.list}>
        {products.map((p) => (
          <Product
            key={p.id}
            data={p}
            handleToggleDoneProduct={() => handleToggleDoneProduct(p)}
            handleDeleteProduct={() => handleDeleteProduct(p)}
          />
        ))}
      </ScrollView>
    </MotiView>
  );
}
