import React from "react";

import { Stack } from "expo-router";

/**
 * Defines the authentication stack layout with the header hidden.
 *
 * Renders a navigation stack containing the "auth" screen, with the header disabled for all screens in this stack.
 */
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="auth" />
    </Stack>
  );
}
