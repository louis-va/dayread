import Posts from "../Posts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SkeletonPostList from "./skeletonDiscover";

interface DiscoverProps {
  map(
    arg0: (post: DiscoverProps) => import("react/jsx-runtime").JSX.Element
  ): unknown;
  id: string;
  content: string;
  favourites: number;
  author: {
    username: string;
  };
  username: string;
  created_date: Date;
}

export default function Discover() {
  const [postData, setPostData] = useState<DiscoverProps>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/feed/discover?page=1", {
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
        postData.map((post: DiscoverProps) => (
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
