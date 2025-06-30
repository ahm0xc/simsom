import { SvgProps } from "react-native-svg";

import ChatIcon from "~/assets/icons/chat.svg";
import CompassIcon from "~/assets/icons/compass.svg";
import HomeIcon from "~/assets/icons/home.svg";
import UserIcon from "~/assets/icons/user.svg";

const ICONS = {
  home: HomeIcon,
  chat: ChatIcon,
  compass: CompassIcon,
  user: UserIcon,
};

export type IconProps = SvgProps & {
  name: keyof typeof ICONS;
  size?: number;
};

export default function Icon({ name, size, ...props }: IconProps) {
  const IconComponent = ICONS[name];
  return <IconComponent width={size} height={size} {...props} />;
}
