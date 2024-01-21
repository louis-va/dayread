"use client";

import Typography from "@/features/Typography";
import { ModeToggle } from "./mode-toggle";
import Icon from "../components/ui/icons";
import Logo from "@/components/ui/logo";
import { Link, useNavigate } from "react-router-dom";
import { Button, buttonVariants } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import {getUserName} from "@/localStorageUtils/getUserNameLS";
import {useEffect, useState} from "react";

export default function Nav() {
  const navDesktopClasses =
    "lg:flex lg:flex-col lg:relative lg:justify-between lg:gap-5 lg:border-none lg:py-5 lg:py-0 lg:h-full lg:bg-background";

  const navMobileClasses =
    "fixed bottom-0 bg-popover/70 backdrop-blur-lg  border-border border-t-2 w-full z-10 p-2";

  const { openModal } = useModal();
  const [username, setUsername] = useState(getUserName());
  const navigate = useNavigate();

  useEffect(() => {
    const updatedUsername = getUserName();
    setUsername(updatedUsername);
  }, []);
  const handleLogOut = async () => {
    try {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      const options = {
        method: "POST",
        credentials: "include" as RequestCredentials,
        headers: headers,
      };

      const response = await fetch(
        "http://localhost:8000/auth/signout",
        options
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className={`${navMobileClasses} ${navDesktopClasses}`}>
      <div className="flex justify-center items-center lg:flex lg:flex-col lg:items-start lg:gap-10">
        <Link to="/" className="hidden hover:cursor-pointer lg:block lg:pl-6">
          <Logo size={50} />
        </Link>

        <div className="flex lg:flex-col gap-3 justify-around w-full">
          <Link
            to="/"
            className={
              buttonVariants({ variant: "ghost", size: "default" }) +
              "flex gap-3 lg:w-full lg:justify-start"
            }
          >
            <Icon icon="home" size={22} />
            <Typography className="hidden lg:block">Home</Typography>
          </Link>

          <Button
            variant="ghost"
            className={
              buttonVariants({ variant: "ghost", size: "default" }) +
              "flex gap-3 lg:w-full lg:justify-start"
            }
            onClick={() => openModal()}
          >
            <Icon icon="newPost" size={22} />
            <Typography className="hidden lg:block">New Post</Typography>
          </Button>

          <Link
            to={`profil/${username}`}
            className={
              buttonVariants({ variant: "ghost", size: "default" }) +
              "flex gap-3 lg:w-full lg:justify-start"
            }
          >
            <Icon icon="profile" size={22} />
            <Typography className="hidden lg:block">Profile</Typography>
          </Link>

          <Button
            variant="ghost"
            className={
              buttonVariants({ variant: "ghost", size: "default" }) +
              "flex gap-3 lg:w-full lg:justify-start"
            }
            onClick={handleLogOut}
          >
            <Icon icon="logout" size={22} />
            <Typography className="hidden lg:block">Logout</Typography>
          </Button>
        </div>
      </div>
      <div className="hidden lg:block lg:pl-6">
        <ModeToggle />
      </div>
    </nav>
  );
}
