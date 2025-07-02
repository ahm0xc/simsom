import React from "react";

import { ScrollView, TouchableOpacity, View } from "react-native";

import Animated, { FadeIn } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icon from "~/components/icon";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import Image from "~/components/ui/image";
import { Input } from "~/components/ui/input";
import Text from "~/components/ui/text";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1">
      <ScrollView className="flex-1" style={{ paddingTop: insets.top }}>
        <Header />
        <View className="flex-1 p-4">
          <PostCreateSection />
          <View className="mt-8 gap-4">
            <PostCard
              user={{
                name: "Saif Ahmed",
                image: "https://github.com/ahm0xc.png?size=200",
                username: "ahm0xc",
              }}
              content="This is a post"
              likes={10}
              comments={5}
              shares={2}
            />
            <PostCard
              user={{
                name: "Abid Hossain",
                image: "https://github.com/knockabid.png?size=200",
                username: "knockabid",
              }}
              content="Yalala, I'm a bullshit artist"
              likes={10}
              comments={5}
              shares={0}
            />
            <PostCard
              user={{
                name: "Google",
                image: "https://github.com/google.png?size=200",
                username: "google",
              }}
              content="Google is a search engine"
              likes={10}
              comments={0}
              shares={0}
            />
            <PostCard
              user={{
                name: "App Store",
                image: "https://github.com/apple.png?size=200",
                username: "app-store",
              }}
              content="App Store is a store for apps"
              likes={10}
              comments={0}
              shares={0}
            />
          </View>
        </View>
      </ScrollView>
    </View>
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

function PostCreateSection() {
  const [content, setContent] = React.useState("");

  return (
    <Card className="p-4">
      <View className="flex-row items-start gap-2">
        <Image
          source={{
            uri: "https://github.com/ahm0xc.png?size=200",
          }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
          }}
          contentFit="cover"
        />
        <Input
          className="text-lg font-medium flex-1 bg-transparent border-transparent max-h-[200px]"
          value={content}
          onChangeText={setContent}
          placeholder="What's on your mind?"
          autoGrow
        />
      </View>
      <View className="mt-6 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-900/30 rounded-full p-2 h-9 items-center flex-row gap-2 pr-3">
            <Icon name="image" size={20} color="#22c55e" />
            <Text className="text-[13px] text-green-500 font-semibold">
              Image
            </Text>
          </View>
          <View className="bg-blue-100 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-900/30 rounded-full p-2 h-9 items-center flex-row gap-2 pr-3">
            <Icon name="video" size={18} color="#3b82f6" />
            <Text className="text-[13px] text-blue-500 font-semibold">
              Video
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Button
            size="sm"
            className="flex-row items-center gap-2 rounded-full"
            disabled={content.trim().length === 0}
          >
            <Icon name="sent" size={18} color="#000" />
            <Text className="text-[13px] font-semibold">Post</Text>
          </Button>
        </View>
      </View>
    </Card>
  );
}

interface PostCardProps {
  user: {
    name: string;
    image: string;
    username: string;
  };
  content: string;
  likes: number;
  comments: number;
  shares: number;
}

function PostCard({ user, content, likes, comments, shares }: PostCardProps) {
  const insets = useSafeAreaInsets();

  return (
    <Card className="p-4">
      <View className="flex-row items-start justify-between gap-2">
        <View className="flex-row items-center gap-2">
          <Image
            source={{
              uri: user.image,
            }}
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              borderWidth: 0.5,
              borderColor: "gray",
            }}
            contentFit="cover"
          />
          <View>
            <View className="flex-row gap-2 items-center">
              <Text className="text-base font-semibold">{user.name}</Text>
              <Text className="text-sm text-muted-foreground">
                @{user.username}
              </Text>
            </View>
            <Text className="text-sm text-muted-foreground">a day ago</Text>
          </View>
        </View>
        <View>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <TouchableOpacity className="h-8 w-8 flex items-center justify-center rounded-full">
                <Icon name="more-horizontal-circle" size={20} color="#666" />
              </TouchableOpacity>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 native:w-72" insets={insets}>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Text>Edit</Text>
                </DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <Text>Invite users</Text>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent>
                    <Animated.View entering={FadeIn.duration(200)}>
                      <DropdownMenuItem>
                        <Text>Email</Text>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Text>Message</Text>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Text>More...</Text>
                      </DropdownMenuItem>
                    </Animated.View>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <Text>API</Text>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive">
                <Text>Delete</Text>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-base font-medium">{content}</Text>
      </View>
      <View className="flex-row items-center gap-4 mt-4">
        <TouchableOpacity className="h-8 flex flex-row gap-1 items-center justify-center rounded-full">
          <Icon name="favorite" size={18} fill="#f43f5e" color="#f43f5e" />
          {likes > 0 && (
            <Text className="text-base text-rose-500">{likes}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity className="h-8 flex flex-row gap-1 items-center justify-center rounded-full">
          <Icon name="comment" size={18} color="#22c55e" />
          {comments > 0 && (
            <Text className="text-base text-green-500">{comments}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity className="h-8 flex flex-row gap-1 items-center justify-center rounded-full">
          <Icon name="sent" size={18} color="#0ea5e9" />
          {shares > 0 && (
            <Text className="text-base text-sky-500">{shares}</Text>
          )}
        </TouchableOpacity>
      </View>
    </Card>
  );
}
