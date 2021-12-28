import React, { useCallback, useState } from "react";
import storage from "@react-native-firebase/storage";

import { useFocusEffect } from "@react-navigation/native";

type PhotoData = {
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
  return (
    <Container>
      <Header title="Comprovantes" />

      <Photo uri="" />

      <PhotoInfo>
        Informações da foto
      </PhotoInfo>

      <FlatList
        data={photosData}
        keyExtractor={item => item.name}
        renderItem={({ item }) => (
          <File
            data={item}
            onShow={() => { }}
            onDelete={() => { }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%', padding: 24 }}
      />
    </Container>
  );
}
