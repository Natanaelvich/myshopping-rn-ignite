import React, { memo } from "react";
import { Placeholder, PlaceholderLine, ShineOverlay } from "rn-placeholder";
import { PlaceholderProps } from "rn-placeholder/lib/Placeholder";

type Props = PlaceholderProps;

export const ContentSkeleton = memo(function (props: Props) {
  return (
    <Placeholder
      Animation={ShineOverlay}

      style={[
        {
          padding: 24,
        },
        props.style,
      ]}
    >
      <PlaceholderLine height={100} noMargin style={{marginBottom : 12, borderRadius : 5}} />
      <PlaceholderLine height={100} noMargin style={{marginBottom : 12, borderRadius : 5}} />
      <PlaceholderLine height={100} noMargin style={{marginBottom : 12, borderRadius : 5}} />
    </Placeholder>
  );
});
