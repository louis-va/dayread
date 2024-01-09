import Nav from "./components/Nav";
import { ThemeProvider } from "./components/theme-provider";
import "./main.css";
import Typography from "@/features/Typography";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <main className="flex flex-col p-5 gap-20">
        <Nav />
        <section className="flex flex-col gap-8 items-center">
          <Typography as={'h1'} className={'text-7xl underline'}>ShadCN is awesome</Typography>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
