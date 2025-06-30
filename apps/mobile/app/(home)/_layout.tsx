import { Tabs } from "expo-router";
import { scale } from "react-native-size-matters";

import Icon from "~/components/icon";

type Tab = {
  name: string;
  icon: (props: { color: string; size: number }) => React.ReactNode;
  label: string;
  hidden?: boolean;
};

const TABS: Tab[] = [
  {
    name: "index",
    icon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
    label: "Home",
  },
  {
    name: "explore",
    icon: ({ color, size }) => (
      <Icon name="compass" color={color} size={size} />
    ),
    label: "Explore",
  },
  {
    name: "chats/index",
    icon: ({ color, size }) => <Icon name="chat" color={color} size={size} />,
    label: "Message",
  },
  {
    name: "profile",
    icon: ({ color, size }) => <Icon name="user" color={color} size={size} />,
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
          height: 90,
          borderTopWidth: 1,
        },
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
