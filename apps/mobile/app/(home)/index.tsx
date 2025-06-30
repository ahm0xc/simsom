import React from "react";

import { View } from "react-native";

import { Button } from "~/components/ui/button";
import Text from "~/components/ui/text";
import useTheme from "~/hooks/use-theme";
import { api } from "~/trpc/client";

export default function HomeScreen() {
  const { data } = api.example.hello.useQuery({ text: "client" });
  const { toggleTheme, setTheme } = useTheme();

  return (
    <View className="flex-1 justify-center items-center">
      <Text font="sans" className="text-3xl">
        Home
      </Text>
      <Text font="serif" className="text-blue-500">
        Greeting:
        {data?.greeting}
      </Text>
      <Button onPress={toggleTheme} size="sm">
        <Text>Toggle Theme</Text>
      </Button>
      <Button onPress={() => setTheme("system")} variant="secondary" size="sm">
        <Text>System</Text>
      </Button>
    </View>
  );
}
