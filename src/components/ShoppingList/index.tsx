import React, { useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";
import { useAuth } from "../../hooks/useAuth";
import { ContentSkeleton } from "../Skeleton";
import { MotiView } from "moti";

export function ShoppingList() {
  const { user } = useAuth();

  const [products, setProducts] = useState<ProductProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const subscriber = firestore()
      .collection("products")
      .where("author", "==", user?.uid)
      .onSnapshot(
        (documentSnapshot) => {
          setProducts(
            documentSnapshot.docs.map((d) => ({
              id: d.id,
              description: d.data().description,
              quantity: d.data().quantity,
              done: d.data().done,
            }))
          );

          setLoading(false);
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
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Product
            data={item}
            handleToggleDoneProduct={() => handleToggleDoneProduct(item)}
            handleDeleteProduct={() => handleDeleteProduct(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={styles.content}
      />
    </MotiView>
  );
}
