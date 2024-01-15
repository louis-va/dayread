import NewPost from "@/features/NewPost";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";

function Home() {
  return (
    <ThemeProvider defaultTheme="system">
      <Layout>
        <NewPost />
        <Posts />
      </Layout>
    </ThemeProvider>
  );
}

export default Home;
