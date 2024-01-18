import NewPost from "@/features/NewPost";
import { Layout } from "@/features/Layout";

import { Toaster } from "@/components/ui/toaster";
import PostList from "@/features/postList";

function Home() {
  return (
    <Layout>
      <Toaster />
      <NewPost />
      <PostList />
    </Layout>
  );
}

export default Home;
