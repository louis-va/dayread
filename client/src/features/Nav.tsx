"use client";

import Typography from "@/features/Typography";
import { ModeToggle } from "./mode-toggle";
import Icon from "../components/ui/icons";
import Logo from "@/components/ui/logo";
import { Link } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";

export default function Nav() {
  const navDesktopClasses =
    "md:flex md:flex-col md:relative md:justify-between md:gap-5 md:border-none md:py-5 md:py-0 md:h-full md:bg-background";

  const navMobileClasses =
    "fixed bottom-0 bg-popover/70 backdrop-blur-lg  border-border border-t-2 w-full z-10 p-2";

  const { openModal } = useModal();

  return (
    <nav className={`${navMobileClasses} ${navDesktopClasses}`}>
      <div className="flex justify-around items-center md:flex md:flex-col md:items-start md:gap-5">
        <Link to="/" className="hidden hover:cursor-pointer md:block md:pl-6">
          <Logo size={50} />
        </Link>

        <Link
          to="/"
          className={
            buttonVariants({ variant: "ghost", size: "default" }) +
            "flex gap-3 md:w-full md:justify-start"
          }
        >
          <Icon icon="home" size={24} />
          <Typography className="hidden md:block">Home</Typography>
        </Link>

        <Button
          variant="ghost"
          className={
            buttonVariants({ variant: "ghost", size: "default" }) +
            "flex gap-3 md:w-full md:justify-start"
          }
          onClick={() => openModal()}
        >
          <Icon icon="newPost" size={24} />
          <Typography className="hidden md:block">New Post</Typography>
        </Button>

        <Link
          to="/profile"
          className={
            buttonVariants({ variant: "ghost", size: "default" }) +
            "flex gap-3 md:w-full md:justify-start"
          }
        >
          <Icon icon="profile" size={24} />
          <Typography className="hidden md:block">Profile</Typography>
        </Link>
      </div>
      <div className="hidden md:block md:pl-6">
        <ModeToggle />
      </div>
    </nav>
  );
}
