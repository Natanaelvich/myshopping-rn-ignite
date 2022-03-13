import React from "react";
import { MotiView } from "moti";
import { Skeleton } from "moti/skeleton";

const Spacer = ({ height = 16 }) => <MotiView style={{ height }} />;

export const ContentSkeleton = () => {
  return (
    <MotiView
      transition={{
        type: "timing",
      }}
      style={{
        flex: 1,
        paddingHorizontal : 24
      }}
    >
      <Skeleton colorMode={"light"} width={"100%"} height={100} />
      <Spacer height={16} />
      <Skeleton colorMode={"light"} width={"100%"} height={100} />
      <Spacer height={16} />
      <Skeleton colorMode={"light"} width={"100%"} height={100}/>
    </MotiView>
  );
};
