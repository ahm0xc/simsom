import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { scale } from "react-native-size-matters";

type Tab = {
  name: string;
  icon: (props: { color: string; size: number }) => React.ReactNode;
  label: string;
  hidden?: boolean;
};

const TABS: Tab[] = [
  {
    name: "index",
    icon: ({ color, size }) => (
      <Ionicons name="home" size={size} color={color} />
    ),
    label: "Home",
  },
  {
    name: "explore",
    icon: ({ color, size }) => (
      <Ionicons name="search" size={size} color={color} />
    ),
    label: "Explore",
  },
  {
    name: "chats/index",
    icon: ({ color, size }) => (
      <Ionicons name="chatbox" size={size} color={color} />
    ),
    label: "Message",
  },
  {
    name: "profile",
    icon: ({ color, size }) => (
      <Ionicons name="person" size={size} color={color} />
    ),
    label: "Profile",
  },
  {
    name: "hidden",
    icon: () => null,
    label: "Hidden",
    hidden: true,
  },
];

export default function HomeLayout() {
  return (
    <Tabs
      screenOptions={{
        animation: "fade",
        tabBarLabelPosition: "below-icon",
        tabBarItemStyle: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 90,
          borderTopWidth: 1,
          borderTopColor: "#e5e5e5",
        },
        tabBarActiveTintColor: "#8b5cf6",
        tabBarInactiveTintColor: "#525252",
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.label,
            tabBarIcon: ({ color }) => tab.icon({ color, size: scale(20) }),
            href: tab.hidden ? null : undefined,
          }}
        />
      ))}
    </Tabs>
  );
}
