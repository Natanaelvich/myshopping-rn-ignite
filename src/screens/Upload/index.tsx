import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Photo } from "../../components/Photo";

import { Container, Content, Progress, Transferred } from "./styles";

export function Upload() {
  const [image, setImage] = useState("");
  const [progressUploaded, setProgressUploaded] = useState(0);
  const [bytesTransferred, setBytesTransferred] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  async function handlePickImage() {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status == "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          aspect: [4, 4],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result.uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleUploadImage() {
    const reference = storage().ref("black-t-shirt-sm.png");

    const task = reference.putFile(image);

    task.on("state_changed", (taskSnapshot) => {
      const progress =
        (taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100;

        setProgressUploaded(progress);

      setBytesTransferred(taskSnapshot.bytesTransferred);
      setTotalBytes(taskSnapshot.totalBytes);

      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });

    task.then(() => {
      console.log("Image uploaded to the bucket!");
    });
  }

  return (
    <Container>
      <Header title="Lista de compras" />

      <Content>
        <Photo uri={image} onPress={handlePickImage} />

        <Button title="Fazer upload" onPress={handleUploadImage} />

        <Progress>{progressUploaded}%</Progress>

        <Transferred>{bytesTransferred} de {totalBytes} bytes transferido</Transferred>
      </Content>
    </Container>
  );
}
