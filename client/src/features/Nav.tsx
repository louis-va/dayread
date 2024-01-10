"use client";

import Typography from "@/features/Typography";
import { ModeToggle } from "./mode-toggle";
import Icon from "../components/ui/icons";
import { Button } from "../components/ui/button";

export default function Nav() {
  const navDesktopClasses =
    "md:flex md:flex-col md:relative md:justify-between md:gap-5 md:border-none py-5 md:py-0 md:h-full";
  const navMobileClasses =
    "absolute bottom-0 bg-background border-border border-t-2 w-full";
  return (
    <nav className={`${navMobileClasses} ${navDesktopClasses}`}>
      <div className="flex justify-around items-center md:flex md:flex-col md:items-start md:gap-5">
        <div className="hidden md:block md:pl-5">D.</div>
        <Button size="default" variant="ghost" className="flex gap-3">
          <Icon icon="home" size={24} />
          <Typography className="hidden md:block">Home</Typography>
        </Button>
        <Button size="default" variant="ghost" className="flex gap-3">
          <Icon icon="newPost" size={24} />
          <Typography className="hidden md:block">New Post</Typography>
        </Button>
        <Button size="default" variant="ghost" className="flex gap-3">
          <Icon icon="profile" size={24} />
          <Typography className="hidden md:block">Profile</Typography>
        </Button>
      </div>
      <div className="hidden md:block">
        <ModeToggle />
      </div>
    </nav>
  );
}
