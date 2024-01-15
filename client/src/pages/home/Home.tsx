import NewPost from "@/features/NewPost";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";

function Home() {
  return (
    <Layout>
      <NewPost />
      <Posts
        content="test"
        favourites={10}
        username="bSchutters"
        created_date={new Date("2023-01-11T15:34:21")}
      />
    </Layout>
  );
}

export default Home;
