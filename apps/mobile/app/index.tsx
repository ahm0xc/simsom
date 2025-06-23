import { Text, View } from "react-native";

import { api } from "~/trpc/client";

export default function Index() {
  const { data } = api.example.hello.useQuery({ text: "client" });

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-500">
        Edit app/index.tsx to edit this screen.
      </Text>
      <Text className="text-blue-500">
        Greeting:
        {data?.greeting}
      </Text>
    </View>
  );
}
