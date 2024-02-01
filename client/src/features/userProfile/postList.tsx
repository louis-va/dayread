import { useEffect, useState } from "react";
import Posts from "../Posts";
import { Link, useParams } from "react-router-dom";

export default function PostList() {
  const [postList, setPostList] = useState<postListProps>();
  const { username } = useParams<{ username: string }>();

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
    fetch(`${import.meta.env.VITE_API_URL}/user/${username}/posts?page=1`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((dataPosts) => {
        setPostList(dataPosts);
        console.log("dataPosts", dataPosts);
      })
      .catch((error) => console.log("error", error));
  }, [username]);
  return (
    <>
      {postList &&
        postList.map((post: postListProps) => (
          <Link to={`/post/${post.id}`} key={post.id}>
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
