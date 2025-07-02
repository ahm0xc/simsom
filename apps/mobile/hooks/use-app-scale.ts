import { Animated } from "react-native";

import { create } from "zustand";

export type AppScaleStore = {
  scale: number;
  animatedScale: Animated.Value;
  setScale: (scale: number, duration?: number) => void;
  resetScale: (duration?: number) => void;
  scaleDown: (targetScale?: number, duration?: number) => void;
};

export const useAppScaleStore = create<AppScaleStore>((set, get) => {
  const animatedScale = new Animated.Value(1);

  return {
    scale: 1,
    animatedScale,
    setScale: (scale: number, duration = 300) => {
      const { animatedScale } = get();

      Animated.timing(animatedScale, {
        toValue: scale,
        duration,
        useNativeDriver: true,
      }).start();

      set({ scale });
    },
    resetScale: (duration = 300) => {
      const { animatedScale } = get();

      Animated.timing(animatedScale, {
        toValue: 1,
        duration,
        useNativeDriver: true,
      }).start();

      set({ scale: 1 });
    },
    scaleDown: (targetScale = 0.95, duration = 300) => {
      const { animatedScale } = get();

      Animated.timing(animatedScale, {
        toValue: targetScale,
        duration,
        useNativeDriver: true,
      }).start();

      set({ scale: targetScale });
    },
  };
});
