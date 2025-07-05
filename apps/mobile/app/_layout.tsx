import * as React from "react";

import { Platform, View } from "react-native";

import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import {
  DarkTheme,
  DefaultTheme,
  Theme,
  ThemeProvider,
} from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { useFonts } from "expo-font";
import { Slot, usePathname, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import AppScaleProvider from "~/components/providers/app-scale-provider";
import StatusbarBackdropFade from "~/components/statusbar-backdrop-fade";
import useTheme from "~/hooks/use-theme";
import { NAV_THEME } from "~/lib/constants";
import { FONTS } from "~/lib/fonts";
import "~/styles/globals.css";
import { TRPCProvider } from "~/trpc/provider";

// export { ErrorBoundary } from "expo-router";

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

SplashScreen.preventAutoHideAsync();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk publishable key");
}

const InitialLayout = () => {
  const [isProcessing, setIsProcessing] = React.useState(true);

  const { isSignedIn, isLoaded } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const publicRoutes = React.useMemo(() => ["/auth"], []);
  const authRoutes = React.useMemo(() => ["/auth"], []);

  React.useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn && authRoutes.includes(pathname)) {
      router.replace("/");
    }

    if (
      !isSignedIn &&
      !authRoutes.includes(pathname) &&
      !publicRoutes.includes(pathname)
    ) {
      router.replace("/auth");
    }

    setIsProcessing(false);
  }, [isSignedIn, isLoaded, pathname, router, publicRoutes]);

  if (isProcessing) {
    return null;
  }

  return <Slot />;
};

/**
 * Sets up the root layout for the app, providing authentication, theming, font loading, and global providers.
 *
 * Waits for custom fonts and color scheme to load before rendering the app content. Wraps the app with Clerk authentication, TRPC, and navigation theme providers, and manages the status bar and background styling.
 *
 * Returns `null` until fonts and color scheme are ready.
 */
export default function RootLayout() {
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);
  const hasMounted = React.useRef(false);

  const { isDarkTheme } = useTheme();
  const [fontsLoaded, fontError] = useFonts({
    ...Object.fromEntries(
      Object.entries(FONTS).map(([key, value]) => {
        return [key, value];
      })
    ),
  });

  React.useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!isColorSchemeLoaded) {
    return null;
  }

  const theme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <ThemeProvider value={theme}>
          <StatusBar style={isDarkTheme ? "light" : "dark"} />
          <StatusbarBackdropFade />
          <View
            className="flex-1"
            style={{ backgroundColor: theme.colors.background }}
          >
            <AppScaleProvider>
              <InitialLayout />
            </AppScaleProvider>
          </View>
          <PortalHost />
        </ThemeProvider>
      </TRPCProvider>
    </ClerkProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
