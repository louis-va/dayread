import Nav from "@/components/Nav";
import {ReactNode} from "react";

interface LayoutProps {
    children?: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <section className="w-full h-dvh flex flex-col items-center">
            <section className={"w-full h-full md:w-[64%] flex flex-col gap-4"}>
                <Nav/>
                <main className="flex">
                    {children}
                </main>
                {/* A modifier par le bon component */}
                <Nav/>
            </section>
        </section>
    );
};

export default Layout;