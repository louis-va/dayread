import Logo from "@/components/ui/logo";
import Nav from "@/features/Nav";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import PopUpNewPost from "./PopUpNewPost";
import DrawerNewPost from "./DrawerNewPost";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      {isMobile ? <DrawerNewPost /> : <PopUpNewPost />}

      <aside className="lg:fixed lg:left-0 lg:p-5 lg:h-full">
        <Nav />
      </aside>
      <section className="lg:w-2/5 w-full h-svh flex">
        <header className="fixed w-full flex items-center justify-center p-5 bg-popover/70 z-10 backdrop-blur-lg lg:hidden">
          <Link to="/">
            <Logo size={30}></Logo>
          </Link>
        </header>
        <main className="relative top-[70px] w-full h-full p-5 lg:border-x-2 lg:border-border lg:top-0">
          {children}
        </main>
      </section>
    </div>
  );
};
