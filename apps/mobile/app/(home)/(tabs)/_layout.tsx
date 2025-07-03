import React from "react";

import { Pressable } from "react-native";

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
    name: "profile/index",
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

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
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
        tabBarHideOnKeyboard: true,
        tabBarVisibilityAnimationConfig: {
          hide: {
            animation: "spring",
          },
          show: {
            animation: "spring",
          },
        },
        tabBarButton: (props) => <CustomTabButton {...props} />,
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

const CustomTabButton = React.forwardRef<any, any>((props, ref) => {
  const { children, ...restProps } = props;
  return (
    <Pressable
      ref={ref}
      {...restProps}
      android_ripple={{ color: "transparent" }}
      style={({ pressed }) => [props.style, pressed && { opacity: 0.7 }]}
    >
      {children}
    </Pressable>
  );
});
