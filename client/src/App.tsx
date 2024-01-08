import Nav from "./components/Nav";
import { ThemeProvider } from "./components/theme-provider";
import "./main.css";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <main className="flex flex-col p-5 gap-20">
        <Nav />
        <section className="flex flex-col gap-8 items-center">
          <h1>Shadcn is awesome</h1>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
