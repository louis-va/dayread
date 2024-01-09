import Nav from "./components/Nav";
import { ThemeProvider } from "./components/theme-provider";
import Icon from "./components/ui/icons";
import "./main.css";
import Typography from "@/features/Typography";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <main className="flex flex-col p-5 gap-20">
        <Nav />
        <section className="flex flex-col gap-8 items-center">
          <Typography as={"h1"} className={"text-7xl underline"}>
            ShadCN is awesome
          </Typography>
          <div className="flex gap-5 mt-20">
            <Icon icon="home" />
            <Icon icon="like" />
            <Icon icon="newPost" />
            <Icon icon="profile" />
            <Icon icon="burger" />
            <Icon icon="more" />
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;
