import React from "react";

import { Animated } from "react-native";

import { useAppScaleStore } from "~/hooks/use-app-scale";

export default function AppScaleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { animatedScale } = useAppScaleStore();

  return (
    <Animated.View
      style={[{ flex: 1 }, { transform: [{ scale: animatedScale }] }]}
    >
      {children}
    </Animated.View>
  );
}
