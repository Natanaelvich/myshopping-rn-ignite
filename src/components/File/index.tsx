import React, { useEffect, useState } from "react";
import storage from "@react-native-firebase/storage";

import { ButtonIcon } from "../ButtonIcon";
import {
  Container,
  Info,
  Name,
  Path,
  Options,
  Image,
  WrapperImage,
} from "./styles";

export type FileProps = {
  name: string;
  path: string;
};

type Props = {
  data: FileProps;
  onShow?: () => void;
  onDelete?: () => void;
};

export function File({ data, onShow, onDelete }: Props) {
  const [imageUrl, setImageUrl] = useState("");
  const [lasUpdate, setLasUpdate] = useState("");

  useEffect(() => {
    async function loadData() {
      const reference = storage().ref(data.path);

      const url = await reference.getDownloadURL();
      const metadata = await reference.getMetadata();

      setImageUrl(url);
      setLasUpdate(metadata.updated);
    }

    loadData();
  }, [data]);

  return (
    <Container>
      <WrapperImage>
        {!!imageUrl && <Image source={{ uri: imageUrl }} />}
      </WrapperImage>
      <Info>
        <Name>{data.name}</Name>
        <Path>{lasUpdate}</Path>
      </Info>

      <Options>
        <ButtonIcon icon="delete" color="alert" onPress={onDelete} />
      </Options>
    </Container>
  );
}
