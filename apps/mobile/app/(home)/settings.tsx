import React from "react";

import { View } from "react-native";

import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/ui/button";
import Text from "~/components/ui/text";
import useTheme from "~/hooks/use-theme";
import { api } from "~/trpc/client";

/**
 * Displays the settings screen with theme controls, a greeting message, navigation, and user sign-out functionality.
 *
 * Provides options to toggle the app theme, set the theme to system default, view a personalized greeting, navigate to the home screen, and sign out of the user account.
 */
export default function SettingsScreen() {
  const { data } = api.example.hello.useQuery({ text: "client" });
  const { toggleTheme, setTheme } = useTheme();
  const { signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1">
      <View className="justify-center items-center">
        <Text font="sans" className="text-3xl">
          Profiles Page
        </Text>
        <Text font="serif" className="text-blue-500">
          Greeting:
          {data?.greeting}
        </Text>
        <Button onPress={toggleTheme} size="sm">
          <Text>Toggle Theme</Text>
        </Button>
        <Button
          onPress={() => setTheme("system")}
          variant="secondary"
          size="sm"
        >
          <Text>System</Text>
        </Button>
        <Link href="/">
          <Text>Home</Text>
        </Link>
        <Button onPress={() => signOut()}>
          <Text>Sign Out</Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
