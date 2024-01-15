import {
  LuHeart,
  LuHome,
  LuLogOut,
  LuMenu,
  LuMessageCircle,
  LuMoreHorizontal,
  LuPenSquare,
  LuRepeat,
  LuSend,
  LuUser,
} from "react-icons/lu";

interface IconProps {
  icon:
    | "home"
    | "like"
    | "newPost"
    | "profile"
    | "more"
    | "burger"
    | "retweet"
    | "message"
    | "send"
    | "logout";
  size?: 22 | 32 | 64;
  notif?: boolean;
  className?: undefined | string;
}

export default function Icon({
  icon,
  size = 22,
  notif = false,
  className,
}: IconProps) {
  switch (size) {
    case 22:
      size = 22;
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
        {icon === "home" && (
          <div className={className}>
            <LuHome size={size} />
          </div>
        )}
        {icon === "like" && (
          <div
            className={`${className} p-2 rounded-full flex items-center justify-center hover:bg-card ease-in-out duration-300`}
          >
            <LuHeart size={size} />
          </div>
        )}
        {icon === "newPost" && (
          <div className={className}>
            <LuPenSquare size={size} />
          </div>
        )}
        {icon === "profile" && (
          <div className={className}>
            <LuUser size={size} />
          </div>
        )}
        {icon === "burger" && (
          <div className={className}>
            <LuMenu size={size} />
          </div>
        )}
        {icon === "more" && (
          <div className={className}>
            <LuMoreHorizontal size={size} />
          </div>
        )}
        {icon === "retweet" && (
          <div
            className={`${className} p-2 rounded-full flex items-center justify-center hover:bg-card ease-in-out duration-300`}
          >
            <LuRepeat size={size} />
          </div>
        )}
        {icon === "message" && (
          <div
            className={`${className} p-2 rounded-full flex items-center justify-center hover:bg-card ease-in-out duration-300`}
          >
            <LuMessageCircle size={size} />
          </div>
        )}
        {icon === "send" && (
          <div
            className={`${className} p-2 rounded-full flex items-center justify-center hover:bg-card ease-in-out duration-300`}
          >
            <LuSend size={size} />
          </div>
        )}
        {icon === "logout" && (
          <div className={className}>
            <LuLogOut size={size} />
          </div>
        )}
      </div>
    );
  }
  //   TODO: Add notif icons
}
