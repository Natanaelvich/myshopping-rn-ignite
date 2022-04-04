import React, { useCallback, useState } from "react";
import { FlatList } from "react-native";
import storage from "@react-native-firebase/storage";

import { Container } from "./styles";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";
import { File } from "../../components/File";
import { useFocusEffect } from "@react-navigation/native";

export type PhotoData = {
  id: string;
  name: string;
  path: string;
};

export function Receipts() {
  const [photosData, setPhotosData] = useState<PhotoData[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function getPhotosData() {
        const reference = storage().ref("images");

        const result = await reference.list();

        const _photosData = result.items.map((i) => ({
          id: i.name,
          name: i.name,
          path: i.fullPath,
        }));

        setPhotosData(_photosData);
      }
      getPhotosData();
    }, [])
  );

  async function handleDeletePhoto(photo: PhotoData) {
    const reference = storage().ref(photo.path);

    await reference.delete();

    setPhotosData((oldPhotosData) =>
      oldPhotosData.filter((p) => p.id !== photo.id)
    );
  }

  async function handleViewPhoto(photo: PhotoData) {
    const reference = storage().ref(photo.path);
  }

  return (
    <Container>
      <Header title="Comprovantes" />

      <FlatList
        data={photosData}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => handleViewPhoto(item)}
            onDelete={() => handleDeletePhoto(item)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", padding: 24 }}
      />
    </Container>
  );
}
