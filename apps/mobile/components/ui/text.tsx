import React from "react";

import { Text as RNText, TextProps as RNTextProps } from "react-native";

import { FONT_KEY } from "~/lib/fonts";

/**
 * Custom Text Component with Font Support
 *
 * This component extends React Native's Text component to provide seamless font integration
 * with TypeScript support and automatic font family application.
 *
 * @example
 * ```tsx
 * import Text from '~/components/ui/text';
 *
 * // Basic usage with different fonts
 * <Text font="sans">Regular text</Text>
 * <Text font="sans-bold">Bold text</Text>
 * <Text font="serif">Serif text</Text>
 * <Text font="serif-italic">Italic serif text</Text>
 *
 * // With additional styling
 * <Text
 *   font="sans-semibold"
 *   style={{ color: '#333', fontSize: 18, lineHeight: 24 }}
 * >
 *   Styled text with custom font
 * </Text>
 *
 * // All React Native Text props are supported
 * <Text
 *   font="sans-medium"
 *   numberOfLines={2}
 *   ellipsizeMode="tail"
 *   onPress={() => console.log('Text pressed')}
 * >
 *   Interactive text with truncation
 * </Text>
 * ```
 */

/**
 * Props for the custom Text component
 *
 * Extends all React Native TextProps with an additional font prop for font selection
 */
export type TextProps = RNTextProps & {
  /**
   * Font key from the FONTS configuration
   *
   * Available options:
   * - 'sans' - Manrope Regular
   * - 'sans-medium' - Manrope Medium
   * - 'sans-semibold' - Manrope Semibold
   * - 'sans-bold' - Manrope Bold
   * - 'serif' - Instrument Serif Regular
   * - 'serif-italic' - Instrument Serif Italic
   *
   * @optional If not provided, uses system default font
   */
  font?: FONT_KEY;
};

/**
 * Custom Text Component
 *
 * A wrapper around React Native's Text component that provides:
 * - Type-safe font selection via the `font` prop
 * - Automatic font family application
 * - Full compatibility with React Native Text props
 * - Seamless integration with the app's font system
 *
 * The component automatically applies the correct fontFamily based on the font key,
 * while preserving all other styling and functionality from React Native's Text.
 *
 * @param font - Optional font key for font selection
 * @param style - Additional styles (merged with font family)
 * @param props - All other React Native Text props
 * @returns JSX.Element - Rendered text with applied font
 */
export default function Text({ font, style, ...props }: TextProps) {
  return <RNText {...props} style={[style, { fontFamily: font }]} />;
}
