import Logo from "@/components/ui/logo";
import Nav from "@/features/Nav";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import PopUpNewPost from "./PopUpNewPost";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full flex justify-center overflow-x-hidden">
      <PopUpNewPost />
      <aside className="md:fixed md:left-0 md:p-5 md:h-full">
        <Nav />
      </aside>
      <section className="md:w-2/5 w-full h-full flex">
        <header className="fixed w-full flex items-center justify-center p-5 bg-popover/70 z-10 backdrop-blur-lg md:hidden">
          <Link to="/">
            <Logo size={30}></Logo>
          </Link>
        </header>
        <main className="relative top-[70px] w-full h-[1000px] p-5 md:border-x-2 md:border-border md:top-0">
          {children}
        </main>
      </section>
    </div>
  );
};
