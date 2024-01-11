import { ThemeProvider } from "./components/ui/theme-provider";
import Typography from "./features/Typography";
import Avatars from "@/features/Avatars.tsx";
import "./main.css";

import { Layout } from "@/features/Layout";

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <Typography>Hello World</Typography>
          <Avatars multiAvatars={true} icon={false} value={'test@gmail.com'} style={'shape'} border={true} borderSize={2} borderColor={'#27272A'}/>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
