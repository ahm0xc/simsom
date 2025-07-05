import React from "react";

import { ActivityIndicator, View } from "react-native";

import { useOAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { Button } from "~/components/ui/button";
import Image from "~/components/ui/image";
import Text from "~/components/ui/text";
import useTheme from "~/hooks/use-theme";

WebBrowser.maybeCompleteAuthSession();

/**
 * Displays the animated login screen with app branding, a background image, welcome text, and OAuth sign-in buttons for Google and Apple.
 *
 * Animates the entrance of the logo, image, title, and authentication buttons in a staggered sequence. Integrates OAuth authentication using Clerk and Expo, and preloads the web browser for a smoother sign-in experience.
 *
 * @returns The rendered login screen React element.
 */
export default function AuthScreen() {
  const logoOpacity = useSharedValue(0);
  const logoTranslateY = useSharedValue(-20);

  const imageOpacity = useSharedValue(0);
  const imageScale = useSharedValue(0.9);

  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);

  const googleButtonOpacity = useSharedValue(0);
  const googleButtonTranslateY = useSharedValue(30);

  const appleButtonOpacity = useSharedValue(0);
  const appleButtonTranslateY = useSharedValue(30);

  useWarmUpBrowser();

  React.useEffect(() => {
    logoOpacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });
    logoTranslateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.out(Easing.cubic),
    });

    imageOpacity.value = withDelay(
      200,
      withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );
    imageScale.value = withDelay(
      200,
      withTiming(1, { duration: 1000, easing: Easing.out(Easing.cubic) })
    );

    titleOpacity.value = withDelay(
      600,
      withTiming(1, { duration: 800, easing: Easing.out(Easing.cubic) })
    );
    titleTranslateY.value = withDelay(
      600,
      withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) })
    );

    // Staggered button animations
    googleButtonOpacity.value = withDelay(
      1000,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
    googleButtonTranslateY.value = withDelay(
      1000,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
    );

    appleButtonOpacity.value = withDelay(
      1200,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
    appleButtonTranslateY.value = withDelay(
      1200,
      withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) })
    );
  }, []);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ translateY: logoTranslateY.value }],
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
    transform: [{ scale: imageScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const googleButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: googleButtonOpacity.value,
    transform: [{ translateY: googleButtonTranslateY.value }],
  }));

  const appleButtonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: appleButtonOpacity.value,
    transform: [{ translateY: appleButtonTranslateY.value }],
  }));

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-6 justify-between">
        <Animated.View
          style={logoAnimatedStyle}
          className="items-center pt-8 flex-row gap-2 justify-center"
        >
          <Image
            source={require("../../assets/images/icon.png")}
            style={{ width: 48, height: 48, borderRadius: 16 }}
            contentFit="contain"
          />
        </Animated.View>

        <View className="flex-1 relative justify-end p-2">
          <Animated.View
            style={imageAnimatedStyle}
            className="w-full aspect-[580/694] h-auto mb-10 rounded-3xl overflow-hidden"
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1706174131367-bb0e7e1212a5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJlbWl1bXxlbnwwfHwwfHx8MA%3D%3D",
              }}
              style={{ width: "100%", height: "100%" }}
              contentFit="cover"
            />
          </Animated.View>
        </View>

        {/* Welcome Text and Authentication Buttons at bottom */}
        <View className="pb-8">
          <Animated.View
            style={titleAnimatedStyle}
            className="items-center mb-12"
          >
            <Text className="text-3xl font-bold text-center">
              Welcome to{" "}
              <Text className="text-primary text-3xl font-bold">
                {Constants.expoConfig?.name}
              </Text>
            </Text>
          </Animated.View>

          <View className="space-y-4 flex-col gap-2">
            <OAuthButton
              iconName="logo-google"
              label="Continue with Google"
              provider="google"
              isPrimary
              animatedStyle={googleButtonAnimatedStyle}
            />

            <OAuthButton
              iconName="logo-apple"
              label="Continue with Apple"
              provider="apple"
              animatedStyle={appleButtonAnimatedStyle}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Preloads the browser for Android devices to reduce authentication load time
    // See: https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      // Cleanup: closes browser when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

interface OAuthButtonProps {
  iconName: keyof typeof Ionicons.glyphMap;
  label: string;
  provider: "google" | "apple";
  isPrimary?: boolean;
  animatedStyle?: ReturnType<typeof useAnimatedStyle>;
}
const getStrategy = (provider: OAuthButtonProps["provider"]) => {
  if (provider === "google") {
    return "oauth_google";
  } else if (provider === "apple") {
    return "oauth_apple";
  }
  return "oauth_google";
};

/**
 * Renders an animated OAuth sign-in button for a specified provider.
 *
 * Displays a button with an icon and label, handles the OAuth authentication flow for the given provider, and shows a loading indicator during authentication. The button's appearance adapts to the app's theme and can be styled as primary or outlined.
 *
 * @param iconName - The name of the icon to display on the button.
 * @param label - The text label for the button.
 * @param provider - The OAuth provider ("google" or "apple").
 * @param isPrimary - Whether the button uses the primary style.
 * @param animatedStyle - Optional animated style for the button container.
 */
function OAuthButton({
  iconName,
  label,
  provider,
  isPrimary = false,
  animatedStyle,
}: OAuthButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const { isDarkTheme } = useTheme();

  const { startOAuthFlow } = useOAuth({
    strategy: getStrategy(provider),
  });
  const { user } = useUser();

  const handleSignIn = React.useCallback(async () => {
    const authStartTime = Date.now();

    try {
      setIsLoading(true);

      const scheme = Constants.expoConfig?.scheme as string | undefined;

      if (!scheme) {
        throw new Error("No app scheme found");
      }

      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/", {
          scheme,
        }),
      });

      if (createdSessionId) {
        console.log("Session created", createdSessionId);
        setActive!({ session: createdSessionId });
        await user?.reload();

        const authDuration = Date.now() - authStartTime;
        console.log("Auth duration", authDuration);
      } else {
      }
    } catch (err) {
      console.error(err);
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  }, [startOAuthFlow, user]);

  return (
    <Animated.View style={animatedStyle as any}>
      <Button
        onPress={handleSignIn}
        disabled={isLoading}
        className="flex-row items-center justify-center rounded-full !h-14 gap-2"
        variant={isPrimary ? "default" : "outline"}
      >
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={
              isPrimary
                ? isDarkTheme
                  ? "black"
                  : "white"
                : isDarkTheme
                  ? "white"
                  : "black"
            }
          />
        ) : (
          // TODO: fix inconsistency
          <>
            <Ionicons
              name={iconName}
              size={20}
              color={
                isPrimary
                  ? isDarkTheme
                    ? "black"
                    : "white"
                  : isDarkTheme
                    ? "white"
                    : "black"
              }
            />
            <Text className="font-semibold text-base">{label}</Text>
          </>
        )}
      </Button>
    </Animated.View>
  );
}
