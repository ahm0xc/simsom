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
    usesAppleSignIn: true,
    supportsTablet: true,
    bundleIdentifier: appConfig.native.bundleIdentifier,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    package: appConfig.native.bundleIdentifier,
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
    "expo-secure-store",
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
  extra: {
    eas: {
      projectId: "39e65e18-381a-498e-a1c2-b13d1f704b90",
    },
  },
});
