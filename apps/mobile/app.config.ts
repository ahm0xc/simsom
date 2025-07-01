import { ConfigContext, ExpoConfig } from "expo/config";

import appConfig from "@repo/config/app.json";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: appConfig.native.name,
  slug: appConfig.native.slug,
  version: appConfig.native.version,
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: appConfig.native.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
      },
    ],
    "expo-web-browser",
    "expo-font",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
});
