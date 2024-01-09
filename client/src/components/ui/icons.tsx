import {
  LuHeart,
  LuHome,
  LuMenu,
  LuMoreHorizontal,
  LuPenSquare,
  LuUser,
} from "react-icons/lu";

interface IconProps {
  icon: "home" | "like" | "newPost" | "profile" | "more" | "burger";
  size?: 24 | 32 | 64;
  notif?: boolean;
  className?: string;
}

export default function Icon({
  icon,
  size = 24,
  notif = false,
  className,
}: IconProps) {
  switch (size) {
    case 24:
      size = 24;
      break;
    case 32:
      size = 32;
      break;
    case 64:
      size = 64;
      break;
  }

  if (notif === false) {
    return (
      <div className="icons">
        {icon === "home" && <LuHome size={size} className={className} />}
        {icon === "like" && <LuHeart size={size} />}
        {icon === "newPost" && <LuPenSquare size={size} />}
        {icon === "profile" && <LuUser size={size} />}
        {icon === "burger" && <LuMenu size={size} />}
        {icon === "more" && <LuMoreHorizontal size={size} />}
      </div>
    );
  }
  //   TODO: Add notif icons
}
