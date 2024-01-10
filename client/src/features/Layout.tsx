import Logo from "@/components/ui/logo";
import Nav from "@/features/Nav";
import { ReactNode } from "react";

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
        <header className="fixed w-full flex items-center justify-center p-5 bg-popover z-10 md:hidden">
          <Logo size={30}></Logo>
        </header>
        <main className="relative top-[70px] w-4/5 h-screen md:w-4/5 md:border-x-2 md:border-border md:top-0">
          {children}
        </main>
      </section>
    </div>
  );
};
