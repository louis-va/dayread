import NewPost from "@/features/NewPost";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Home() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`, { method: "GET" })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log("error", error));
  }, [id]);

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
