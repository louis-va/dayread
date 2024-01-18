import { useEffect, useState } from "react";
import Posts from "../Posts";
import { Link } from "react-router-dom";

export default function LikeList() {
  const [likeList, setLikeList] = useState<postListProps>();

  interface postListProps {
    map(
      arg0: (post: postListProps) => import("react/jsx-runtime").JSX.Element
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

  useEffect(() => {
    fetch("http://localhost:8000/user/bschutters/liked-posts?page=1", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((dataLikes) => {
        console.log("dataLikes", dataLikes);
        setLikeList(dataLikes);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      {likeList &&
        likeList.map((post: postListProps) => (
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
    </>
  );
}
