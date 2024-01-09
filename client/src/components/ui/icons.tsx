import { LuHome } from "react-icons/lu";

interface IconProps {
  icon: "home" | "like" | "newPost" | "profile" | "..." | "burger";
  color?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  notif?: boolean;
  className?: string;
}

export default function Icon({
  icon,
  color,
  size = "md",
  notif = false,
  className,
}: IconProps) {
  return (
    <div className={` ${color} ${size} ${className}`}>
      {icon === "home" && <LuHome />}
      {icon === "like" && <LikeIcon />}
      {icon === "newPost" && <NewPostIcon />}
      {icon === "profile" && <ProfileIcon />}
      {icon === "burger" && <BurgerIcon />}
      {icon === "..." && <DotsIcon />}
      {notif && <div className="notif"></div>}
    </div>
  );
}
