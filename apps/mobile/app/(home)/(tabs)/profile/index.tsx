import React from "react";

import { Linking, Pressable, ScrollView, View } from "react-native";

import { useUser } from "@clerk/clerk-expo";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "~/components/icon";
import { Button } from "~/components/ui/button";
import Image from "~/components/ui/image";
import Text from "~/components/ui/text";

export default function ProfileScreen() {
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
  const { user } = useUser();

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
              <Icon name="chevron-left" color="#f5f5f5" size={24} />
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
          <BlurView intensity={50} className="w-full h-full" tint="light">
            <Button
              onPress={handleSettings}
              className="rounded-full bg-transparent w-full h-full p-0"
            >
              <Icon name="settings" color="#f5f5f5" size={22} />
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
      <View className="flex-row justify-end px-4 items-start relative">
        <View className="absolute left-2">
          <View
            className="rounded-full h-fit w-fit border-2 border-primary p-0.5 bg-background"
            style={{ transform: [{ translateY: -50 }] }}
          >
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            />
          </View>
        </View>
        <View className="gap-2" style={{ transform: [{ translateY: -20 }] }}>
          <View className="w-fit bg-background p-0.5 rounded-full border-2 border-primary">
            <Button className="rounded-full">
              <Text>Follow</Text>
            </Button>
          </View>
          <View className="flex-row items-center gap-4">
            <Text font="sans-semibold" className="text-sm">
              9 Following
            </Text>
            <Text font="sans-semibold" className="text-sm">
              10.8k Followers
            </Text>
          </View>
        </View>
      </View>
      <View className="px-4 mt-4">
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl font-semibold">{user?.fullName}</Text>
          <Icon name="verified-badge" size={20} />
        </View>
        <Text className="text-sm text-muted-foreground">@ahm0xc</Text>
        <Text className="text-base font-medium mt-4">
          I teach, push and inspire people to code and build things beyond the
          screen.
        </Text>
      </View>
      <View className="px-4 mt-6 gap-3">
        <View className="flex-row gap-2">
          <Icon name="globe" size={18} color="darkgray" darkColor="gray" />
          <Pressable onPress={() => Linking.openURL("https://ahm0xc.me")}>
            <Text className="font-medium text-sm text-muted-foreground">
              ahm0xc.me
            </Text>
          </Pressable>
        </View>
        <View className="flex-row gap-2">
          <Icon name="calendar" size={18} color="darkgray" darkColor="gray" />
          <Text className="text-sm text-muted-foreground">
            Joined July 2024
          </Text>
        </View>
        <View className="flex-row gap-2">
          <Icon name="location" size={18} color="darkgray" darkColor="gray" />
          <Text className="text-sm text-muted-foreground">Bangladesh</Text>
        </View>
      </View>
    </View>
  );
}
