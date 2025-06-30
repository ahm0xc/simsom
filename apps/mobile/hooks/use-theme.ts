import { useColorScheme as useNativewindColorScheme } from "nativewind";

export default function useTheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } =
    useNativewindColorScheme();

  return {
    theme: colorScheme ?? "dark",
    isDarkTheme: colorScheme === "dark",
    setTheme: setColorScheme,
    toggleTheme: toggleColorScheme,
  };
}
