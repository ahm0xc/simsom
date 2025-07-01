import React from "react";

import { View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/ui/button";
import Text from "~/components/ui/text";
import useTheme from "~/hooks/use-theme";
import { api } from "~/trpc/client";

export default function ProfileScreen() {
  const { data } = api.example.hello.useQuery({ text: "client" });
  const { toggleTheme, setTheme } = useTheme();
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
      </View>
    </SafeAreaView>
  );
}
