/**
 * Font Configuration for React Native
 *
 * This file centralizes font management for the mobile app. Follow these steps to set up fonts:
 *
 * 1. FONT FILE PLACEMENT:
 *    - Place font files (.ttf, .otf) in `~/assets/fonts/` directory
 *    - Use descriptive naming: FontFamily-weight.ttf (e.g., Manrope-regular.ttf)
 *    - Supported formats: .ttf, .otf
 *
 * 2. FONT REGISTRATION:
 *    - Add font entries to the FONTS object below
 *    - Use semantic keys (sans, serif, sans-bold, etc.)
 *    - Use require() to load font files (not import)
 *
 * 3. FONT LOADING:
 *    - Fonts are automatically loaded in `app/_layout.tsx` using Expo's `useFonts` hook
 *    - The layout file maps all FONTS entries to the useFonts configuration
 *    - SplashScreen is shown until fonts are loaded or error occurs
 *
 * 4. USAGE IN COMPONENTS:
 *    - Use the custom Text component from `~/components/ui/text.tsx`
 *    - Pass the font key via the `font` prop (with TypeScript support)
 *
 *    ```tsx
 *    import Text from '~/components/ui/text';
 *
 *    // Using different font weights
 *    <Text font="sans">Regular text</Text>
 *    <Text font="sans-medium">Medium weight text</Text>
 *    <Text font="sans-semibold">Semibold text</Text>
 *    <Text font="sans-bold">Bold text</Text>
 *    <Text font="serif">Serif text</Text>
 *    <Text font="serif-italic">Italic serif text</Text>
 *
 *    // With additional styling
 *    <Text font="sans-bold" style={{ color: 'blue', fontSize: 18 }}>
 *      Styled text
 *    </Text>
 *    ```
 *
 * 5. CUSTOM TEXT COMPONENT:
 *    - Located at `~/components/ui/text.tsx`
 *    - Extends React Native's Text component with font prop
 *    - Provides TypeScript autocomplete for available fonts
 *    - Automatically applies the correct fontFamily based on the font key
 *
 * 6. ADDING NEW FONTS:
 *    - Add font file to `~/assets/fonts/`
 *    - Add entry to FONTS object below
 *    - Font will be automatically loaded on app start
 *    - Use via custom Text component with new font key
 *
 * 7. TROUBLESHOOTING:
 *    - Check Metro bundler logs for font loading errors
 *    - Verify font files are properly bundled
 *    - Clear Metro cache: npx expo start --clear
 *    - Ensure font keys match exactly (case-sensitive)
 *    - Test on both iOS and Android devices
 */

export const FONTS = {
  sans: require("~/assets/fonts/Manrope-regular.ttf"),
  "sans-medium": require("~/assets/fonts/Manrope-medium.ttf"),
  "sans-semibold": require("~/assets/fonts/Manrope-semibold.ttf"),
  "sans-bold": require("~/assets/fonts/Manrope-bold.ttf"),
  serif: require("~/assets/fonts/InstrumentSerif-regular.ttf"),
  "serif-italic": require("~/assets/fonts/InstrumentSerif-regular_italic.ttf"),
};

export type FONT_KEY = keyof typeof FONTS;
