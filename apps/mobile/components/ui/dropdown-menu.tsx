import * as React from "react";

import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextProps,
  View,
  type ViewStyle,
} from "react-native";

import * as DropdownMenuPrimitive from "@rn-primitives/dropdown-menu";
import { BlurView } from "expo-blur";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import Icon from "~/components/icon";
import { TextClassContext } from "~/components/ui/text";
import { cn } from "~/lib/utils";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: DropdownMenuPrimitive.SubTriggerProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubTriggerRef>;
  className?: string;
  inset?: boolean;
  children?: React.ReactNode;
}) {
  const { open } = DropdownMenuPrimitive.useSubContext();

  const IconComponent =
    Platform.OS === "web" ? (
      <Icon
        name="chevron-right"
        size={18}
        className="ml-auto text-foreground"
      />
    ) : open ? (
      <Icon
        name="chevron-up"
        size={18}
        color="darkgray"
        darkColor="lightgray"
        className="ml-auto"
      />
    ) : (
      <Icon
        name="chevron-down"
        size={18}
        color="darkgray"
        darkColor="lightgray"
        className="ml-auto"
      />
    );
  return (
    <TextClassContext.Provider
      value={cn(
        "select-none text-sm native:text-lg",
        open && "native:text-accent-foreground"
      )}
    >
      <DropdownMenuPrimitive.SubTrigger
        className={cn(
          "flex flex-row web:cursor-default web:select-none gap-2 items-center web:focus:bg-accent web:hover:bg-accent active:bg-accent rounded-xl px-4 py-1.5 native:py-2 web:outline-none",
          open && "bg-accent",
          inset && "pl-8",
          className
        )}
        {...props}
      >
        {children}
        {IconComponent}
      </DropdownMenuPrimitive.SubTrigger>
    </TextClassContext.Provider>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: DropdownMenuPrimitive.SubContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SubContentRef>;
}) {
  const { open } = DropdownMenuPrimitive.useSubContext();
  return (
    <DropdownMenuPrimitive.SubContent
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-3xl border border-border mt-1 bg-subpopover p-1 shadow-md shadow-foreground/5 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        open
          ? "web:animate-in web:fade-in-0 web:zoom-in-95"
          : "web:animate-out web:fade-out-0 web:zoom-out",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: DropdownMenuPrimitive.ContentProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ContentRef>;
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
}) {
  const { open } = DropdownMenuPrimitive.useRootContext();

  // Animation values for native platforms
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.95);
  const blurIntensity = useSharedValue(0);

  // Animate when open state changes
  React.useEffect(() => {
    if (Platform.OS !== "web") {
      if (open) {
        opacity.value = withTiming(1, { duration: 200 });
        scale.value = withSpring(1, {
          damping: 20,
          stiffness: 300,
        });
        blurIntensity.value = withTiming(20, { duration: 300 });
      } else {
        opacity.value = withTiming(0, { duration: 150 });
        scale.value = withTiming(0.95, { duration: 150 });
        blurIntensity.value = withTiming(0, { duration: 150 });
      }
    }
  }, [open, opacity, scale, blurIntensity]);

  // Animated style for native platforms
  const animatedContentStyle = useAnimatedStyle(() => {
    if (Platform.OS === "web") return {};

    return {
      opacity: opacity.value,
      transform: [{ scale: scale.value }],
    };
  });

  // Animated blur opacity style
  const animatedBlurStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  // Content component - animated on native, regular on web
  const ContentComponent =
    Platform.OS === "web"
      ? DropdownMenuPrimitive.Content
      : Animated.createAnimatedComponent(DropdownMenuPrimitive.Content);

  // For now, let's use a simpler approach with animated opacity
  // We can try the animated props approach later if needed

  return (
    <DropdownMenuPrimitive.Portal hostName={portalHost}>
      <DropdownMenuPrimitive.Overlay
        style={
          overlayStyle
            ? StyleSheet.flatten([
                Platform.OS !== "web" ? StyleSheet.absoluteFill : undefined,
                overlayStyle as typeof StyleSheet.absoluteFill,
              ])
            : Platform.OS !== "web"
              ? StyleSheet.absoluteFill
              : undefined
        }
        className={cn(
          Platform.OS === "web" ? "bg-foreground/5" : "",
          overlayClassName
        )}
      >
        {Platform.OS !== "web" && (
          <Animated.View style={[StyleSheet.absoluteFill, animatedBlurStyle]}>
            <BlurView
              intensity={20}
              tint="systemMaterialDark"
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        )}
        <ContentComponent
          style={Platform.OS !== "web" ? animatedContentStyle : undefined}
          className={cn(
            "z-50 min-w-[8rem] overflow-hidden rounded-3xl border border-border bg-popover p-1 shadow-md shadow-foreground/5 web:data-[side=bottom]:slide-in-from-top-2 web:data-[side=left]:slide-in-from-right-2 web:data-[side=right]:slide-in-from-left-2 web:data-[side=top]:slide-in-from-bottom-2",
            open
              ? "web:animate-in web:fade-in-0 web:zoom-in-95"
              : "web:animate-out web:fade-out-0 web:zoom-out-95",
            className
          )}
          {...props}
        />
      </DropdownMenuPrimitive.Overlay>
    </DropdownMenuPrimitive.Portal>
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: DropdownMenuPrimitive.ItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.ItemRef>;
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <TextClassContext.Provider
      value={cn(
        "select-none text-sm native:text-lg text-popover-foreground web:group-focus:text-accent-foreground",
        variant === "destructive" && "text-red-500"
      )}
    >
      <DropdownMenuPrimitive.Item
        className={cn(
          "relative flex flex-row web:cursor-default gap-2 items-center rounded-2xl px-4 py-1.5 native:py-2 web:outline-none web:focus:bg-accent active:bg-accent web:hover:bg-accent group",
          variant === "destructive" && "bg-red-500/15 dark:bg-red-600/15",
          inset && "pl-8",
          props.disabled && "opacity-50 web:pointer-events-none",
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: DropdownMenuPrimitive.CheckboxItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.CheckboxItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <DropdownMenuPrimitive.CheckboxItem
      className={cn(
        "relative flex flex-row web:cursor-default items-center web:group rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-accent active:bg-accent",
        props.disabled && "web:pointer-events-none opacity-50",
        className
      )}
      checked={checked}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <Icon
            name="tick"
            size={14}
            strokeWidth={3}
            className="text-foreground"
          />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </DropdownMenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: DropdownMenuPrimitive.RadioItemProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.RadioItemRef>;
  children?: React.ReactNode;
}) {
  return (
    <DropdownMenuPrimitive.RadioItem
      className={cn(
        "relative flex flex-row web:cursor-default web:group items-center rounded-sm py-1.5 native:py-2 pl-8 pr-2 web:outline-none web:focus:bg-accent active:bg-accent",
        props.disabled && "web:pointer-events-none opacity-50",
        className
      )}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <DropdownMenuPrimitive.ItemIndicator>
          <View className="bg-foreground h-2 w-2 rounded-full" />
        </DropdownMenuPrimitive.ItemIndicator>
      </View>
      {children}
    </DropdownMenuPrimitive.RadioItem>
  );
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: DropdownMenuPrimitive.LabelProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.LabelRef>;
  className?: string;
  inset?: boolean;
}) {
  return (
    <DropdownMenuPrimitive.Label
      className={cn(
        "px-4 py-2 text-sm font-semibold text-foreground/80 web:cursor-default",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: DropdownMenuPrimitive.SeparatorProps & {
  ref?: React.RefObject<DropdownMenuPrimitive.SeparatorRef>;
}) {
  return (
    <DropdownMenuPrimitive.Separator
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({ className, ...props }: TextProps) {
  return (
    <Text
      className={cn(
        "ml-auto text-xs native:text-sm tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
