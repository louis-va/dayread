import Nav from "./components/Nav";
import { ThemeProvider } from "./components/theme-provider";
import Icon from "./components/ui/icons";
import "./main.css";
import Typography from "@/features/Typography";
import {Layout} from "@/features/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
        <Layout>
            <Typography as={'h1'} className={'text-7xl underline'}>ShadCN is awesome</Typography>
        </Layout>
    </ThemeProvider>
  );
}

export default App;
