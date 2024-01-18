import Posts from "../Posts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkeletonPostList from "./skeletonFeed";

interface FeedProps {
  map(
    arg0: (post: FeedProps) => import("react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
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
    fetch("http://localhost:8000/feed?page=1", {
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
        postData.map((post: FeedProps) => (
          <Link to={`/post/${post.id}`}>
            <Posts
              postId={post.id}
              content={post.content}
              favourites={post.favourites}
              username={post.author.username}
              created_date={new Date(post.created_date)}
            />
          </Link>
        ))}
      {!postData && <SkeletonPostList />}
    </>
  );
}
