import React from "react";

import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import useTheme from "~/hooks/use-theme";

export default function StatusbarBackdropFade() {
  const { top } = useSafeAreaInsets();
  const { isDarkTheme } = useTheme();

  return (
    <LinearGradient
      colors={isDarkTheme ? ["black", "#0000"] : ["white", "#fff0"]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: top,
        zIndex: 20,
      }}
    />
  );
}
