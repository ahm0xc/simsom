import React from "react";

import { TextInput, View } from "react-native";

import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/ui/button";
import Image from "~/components/ui/image";
import Text from "~/components/ui/text";
import useTheme from "~/hooks/use-theme";
import { api } from "~/trpc/client";

export default function HomeScreen() {
  const { data } = api.example.hello.useQuery({ text: "client" });
  const { toggleTheme, setTheme } = useTheme();

  return (
    <React.Fragment>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <SafeAreaView className="flex-1">
        <Header />
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
          <Button
            onPress={() => setTheme("system")}
            variant="secondary"
            size="sm"
          >
            <Text>System</Text>
          </Button>
          <TextInput placeholder="Enter your name" />
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}

function Header() {
  return (
    <View className="flex-row items-center justify-center px-4 py-2 h-12">
      <Image
        source={{
          dark: require("~/assets/images/logo-long-dark.webp"),
          light: require("~/assets/images/logo-long-light.webp"),
        }}
        style={{
          width: 150,
          height: 25,
          // backgroundColor: "orange",
        }}
        contentFit="contain"
      />
    </View>
  );
}
