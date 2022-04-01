import React, { useEffect, useState } from "react";
import { Alert, ScrollView } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";
import { useAuth } from "../../hooks/useAuth";
import { ContentSkeleton } from "../Skeleton";
import { MotiView } from "moti";

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
              documentSnapshot.docs.map((d) => ({
                id: d.id,
                description: d.data().description,
                quantity: d.data().quantity,
                done: d.data().done,
              }))
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

  async function handleDeleteProduct(data: { id: string; done: boolean }) {
    try {
      await firestore().collection("products").doc(data.id).delete();
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
