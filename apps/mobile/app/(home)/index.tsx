import { View } from "react-native";

import Text from "~/components/ui/text";
import { api } from "~/trpc/client";

export default function HomeScreen() {
  const { data } = api.example.hello.useQuery({ text: "client" });

  return (
    <View className="flex-1 justify-center items-center">
      <Text font="sans" className="text-red-500 text-3xl">
        Home
      </Text>
      <Text font="serif" className="text-blue-500">
        Greeting:
        {data?.greeting}
      </Text>
    </View>
  );
}
