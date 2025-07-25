import { useId } from "react";

import { SvgProps } from "react-native-svg";

import CalendarIcon from "~/assets/icons/calendar.svg";
import ChatIcon from "~/assets/icons/chat.svg";
import ChevronDownIcon from "~/assets/icons/chevron-down.svg";
import ChevronLeftIcon from "~/assets/icons/chevron-left.svg";
import ChevronRightIcon from "~/assets/icons/chevron-right.svg";
import ChevronUpIcon from "~/assets/icons/chevron-up.svg";
import CommentIcon from "~/assets/icons/comment.svg";
import CompassIcon from "~/assets/icons/compass.svg";
import FavoriteIcon from "~/assets/icons/favorite.svg";
import GlobeIcon from "~/assets/icons/globe.svg";
import HeadphonesIcon from "~/assets/icons/headphones.svg";
import HomeIcon from "~/assets/icons/home.svg";
import ImageIcon from "~/assets/icons/image.svg";
import LocationIcon from "~/assets/icons/location.svg";
import MoreHorizontalCircleIcon from "~/assets/icons/more-horizontal-circle.svg";
import MoreHorizontalIcon from "~/assets/icons/more-horizontal.svg";
import MusicNoteIcon from "~/assets/icons/music-note.svg";
import SentIcon from "~/assets/icons/sent.svg";
import SettingsIcon from "~/assets/icons/settings.svg";
import TickIcon from "~/assets/icons/tick.svg";
import UserIcon from "~/assets/icons/user.svg";
import VerifiedBadgeIcon from "~/assets/icons/verified-badge.svg";
import VideoIcon from "~/assets/icons/video.svg";
import useTheme from "~/hooks/use-theme";

const ICONS = {
  home: HomeIcon,
  chat: ChatIcon,
  compass: CompassIcon,
  user: UserIcon,
  video: VideoIcon,
  image: ImageIcon,
  headphones: HeadphonesIcon,
  "music-note": MusicNoteIcon,
  "more-horizontal": MoreHorizontalIcon,
  "more-horizontal-circle": MoreHorizontalCircleIcon,
  favorite: FavoriteIcon,
  comment: CommentIcon,
  sent: SentIcon,
  tick: TickIcon,
  "chevron-up": ChevronUpIcon,
  "chevron-down": ChevronDownIcon,
  "chevron-right": ChevronRightIcon,
  "chevron-left": ChevronLeftIcon,
  settings: SettingsIcon,
  "verified-badge": VerifiedBadgeIcon,
  calendar: CalendarIcon,
  location: LocationIcon,
  globe: GlobeIcon,
};

export type IconProps = SvgProps & {
  name: keyof typeof ICONS;
  darkColor?: string;
  size?: number;
};

export default function Icon({
  name,
  size,
  color,
  darkColor,
  ...props
}: IconProps) {
  const id = useId();

  const { isDarkTheme } = useTheme();

  const resolvedColor = isDarkTheme && darkColor ? darkColor : color;

  const IconComponent = ICONS[name];
  return (
    <IconComponent
      id={`icon-${name}-${id}`}
      width={size}
      height={size}
      color={resolvedColor}
      {...props}
    />
  );
}
