import NewPost from "@/features/NewPost";
import { ThemeProvider } from "../../components/ui/theme-provider";
import { Layout } from "@/features/Layout";

function Home() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <NewPost />
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
