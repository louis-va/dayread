import { ThemeProvider } from "./components/ui/theme-provider";
import Typography from "./features/Typography";
import "./main.css";

import { Layout } from "@/features/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <Typography>Hello World</Typography>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
