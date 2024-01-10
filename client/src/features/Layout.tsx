import Logo from "@/components/ui/logo";
import Nav from "@/features/Nav";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full flex items-center justify-center overflow-x-hidden">
      <section className="md:w-9/12 w-full h-full flex">
        <aside className="md:w-1/5 md:p-5">
          <Nav />
        </aside>
        <header className="fixed w-full flex items-center justify-center p-5 bg-popover/70 z-10 backdrop-blur-lg md:hidden">
          <Link to="/">
            <Logo size={30}></Logo>
          </Link>
        </header>
        <main className="relative top-[70px] w-4/5 h-[1000px] md:w-4/5 md:border-x-2 md:border-border md:top-0">
          {children}
        </main>
      </section>
    </div>
  );
};
