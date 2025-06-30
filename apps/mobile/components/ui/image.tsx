import React from "react";

import { ImageSourcePropType } from "react-native";

import { Image as ExpoImage } from "expo-image";

import useTheme from "~/hooks/use-theme";

export type ImageProps = {
  source: ImageSource;
} & React.ComponentProps<typeof ExpoImage>;

export type ImageSource =
  | ImageSourcePropType
  | {
      light: ImageSourcePropType;
      dark: ImageSourcePropType;
    };

export default function Image({ source, ...props }: ImageProps) {
  const { theme } = useTheme();
  const resolvedSource =
    typeof source === "object" && "light" in source
      ? theme === "dark"
        ? source.dark
        : source.light
      : source;

  return <ExpoImage source={resolvedSource} {...props} />;
}
