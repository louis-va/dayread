import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams<{ id: string }>();

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/post/65a6e7dd464ec41eac67d345", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostData(data);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <Layout>
      {postData ? (
        <Posts
          content="test"
          favourites={10}
          username="bSchutters"
          created_date={new Date("2024-01-14T15:34:21")}
        />
      ) : (
        <div>Chargement...</div>
      )}
    </Layout>
  );
}

export default PostPage;
