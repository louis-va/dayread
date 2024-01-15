import NewPost from "@/features/NewPost";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";

function Home() {
  return (
    <Layout>
      <NewPost />
      <Posts />
    </Layout>
  );
}

export default Home;
