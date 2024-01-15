import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";

function Home() {
  return (
    <Layout>
      <Posts
        content="test"
        favourites={10}
        username="bSchutters"
        created_date={new Date("2024-01-14T15:34:21")}
      />
    </Layout>
  );
}

export default Home;
