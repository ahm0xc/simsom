import React from "react";

import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { FONTS } from "~/lib/fonts";
import "~/styles/globals.css";
import { TRPCProvider } from "~/trpc/provider";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    ...Object.fromEntries(
      Object.entries(FONTS).map(([key, value]) => {
        return [key, value];
      })
    ),
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TRPCProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
