import React from "react";

import { ScrollView, View } from "react-native";

import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "~/components/icon";
import { Button } from "~/components/ui/button";
import Image from "~/components/ui/image";

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 w-full">
      <ScrollView className="flex-1">
        <ProfileHeader />
      </ScrollView>
    </View>
  );
}

function ProfileHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleSettings = () => {
    router.push("/settings");
  };

  return (
    <View className="relative">
      <View aria-label="action-bar">
        <View
          style={{
            position: "absolute",
            left: 8,
            top: insets.top + 4,
            zIndex: 1,
            height: 40,
            width: 40,
            borderRadius: 40,
            overflow: "hidden",
          }}
        >
          <BlurView intensity={50} className="w-full h-full" tint="extraLight">
            <Button
              onPress={handleBack}
              className="rounded-full bg-transparent w-full h-full p-0"
            >
              <Icon name="chevron-left" color="#f5f5f5" size={26} />
            </Button>
          </BlurView>
        </View>
        <View
          style={{
            position: "absolute",
            right: 8,
            top: insets.top + 4,
            zIndex: 1,
            height: 40,
            width: 40,
            borderRadius: 40,
            overflow: "hidden",
          }}
        >
          <BlurView intensity={50} className="w-full h-full" tint="extraLight">
            <Button
              onPress={handleSettings}
              className="rounded-full bg-transparent w-full h-full p-0"
            >
              <Icon name="settings" color="#f5f5f5" size={26} />
            </Button>
          </BlurView>
        </View>
      </View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1497942304796-b8bc2cc898f3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8dmludGFnZXxlbnwwfDB8MHx8fDA%3D",
        }}
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
        }}
        contentFit="cover"
        aria-label="Profile Banner"
      />
      <View className="flex-row items-center justify-between px-4">
        <View>
          <View
            className="rounded-full h-fit w-fit border-2 border-primary p-0.5 bg-background"
            style={{ transform: [{ translateY: -50 }] }}
          >
            <Image
              source={{ uri: "https://github.com/ahm0xc.png" }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
}
