import Posts from "../Posts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkeletonPostList from "./skeletonFeed";
import Typography from "../Typography";

interface FeedProps {
  map(
    arg0: (
      post: FeedProps,
      index: number
    ) => import("react/jsx-runtime").JSX.Element
  ): unknown;
  length: number;
  id: string;
  content: string;
  favourites: number;
  author: {
    username: string;
  };
  username: string;
  created_date: Date;
}

export default function Feed() {
  const [postData, setPostData] = useState<FeedProps>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/feed?page=1`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        }
        return response.json();
      })
      .then((data) => {
        console.log("data", data);
        setPostData(data);
      })
      .catch((error) => console.log("error", error));
  }, [navigate]);
  return (
    <>
      {postData &&
        postData.length > 0 &&
        postData.map((post: FeedProps, index: number) => (
          <Link to={`/post/${post.id}`} key={post.id}>
            <Posts
              postId={post.id}
              content={post.content}
              favourites={post.favourites}
              username={post.author.username}
              created_date={new Date(post.created_date)}
              className={`${
                index === postData.length - 1 ? "" : "border-border border-b-2"
              }`}
            />
          </Link>
        ))}
      {postData && postData.length === 0 && (
        <Typography as="p" className="p-2">
          Aucun post à afficher, vous ne suivez personne
        </Typography>
      )}
      {!postData && <SkeletonPostList />}
    </>
  );
}
