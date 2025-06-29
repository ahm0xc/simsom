import { Stack } from "expo-router";

import "~/styles/globals.css";
import { TRPCProvider } from "~/trpc/provider";

export default function RootLayout() {
  return (
    <TRPCProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </TRPCProvider>
  );
}
