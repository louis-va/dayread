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
        <main className="w-4/5 h-screen md:w-4/5 md:border-x-2 md:border-border">
          {children}
        </main>
      </section>
    </div>
  );
};
