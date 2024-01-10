import { ThemeProvider } from "../../components/ui/theme-provider";
import Typography from "../../features/Typography";

import { Layout } from "@/features/Layout";

function Home() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <Typography>Hello World</Typography>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
        <img src="https://images.unsplash.com/photo-1682687982360-3fbab65f9d50?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8"></img>
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
