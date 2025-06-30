import React from "react";

import { Text as RNText, TextProps as RNTextProps } from "react-native";

import * as Slot from "@rn-primitives/slot";

import { FONT_KEY } from "~/lib/fonts";
import { cn } from "~/lib/utils";

export const TextClassContext = React.createContext<string | undefined>(
  undefined
);

export type TextProps = RNTextProps & {
  font?: FONT_KEY;
  asChild?: boolean;
};

export default function Text({
  font,
  style,
  className,
  asChild = false,
  ...props
}: TextProps) {
  const Component = asChild ? Slot.Text : RNText;
  const textClass = React.useContext(TextClassContext);

  return (
    <Component
      {...props}
      className={cn("text-base text-foreground", textClass, className)}
      style={[style, { fontFamily: font }]}
    />
  );
}
