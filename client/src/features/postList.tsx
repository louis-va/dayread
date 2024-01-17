import { Skeleton } from "@/components/ui/skeleton";
import Posts from "./Posts";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface PostProps {
  content: string;
  favourites: number;
  author: {
    username: string;
  };
  username: string;
  created_date: Date;
}

export default function PostList() {
  const [postData, setPostData] = useState<PostProps>();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/post/65a6fbf76fc237aa2e6200f1", {
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
        setPostData(data);
      })
      .catch((error) => console.log("error", error));
  }, [navigate]);
  return (
    <>
      {postData ? (
        <Link to="/postpage/65a6fbf76fc237aa2e6200f1">
          <Posts
            content={postData.content}
            favourites={postData.favourites}
            username={postData.author.username}
            created_date={new Date(postData.created_date)}
          />
        </Link>
      ) : (
        <div className="flex gap-3 w-full py-5">
          <Skeleton className="w-[40px] h-[40px] rounded-full bg-border" />
          <div className="flex flex-col gap-3 w-full">
            <div className="flex w-full justify-between">
              <Skeleton className="w-[100px] h-[20px] rounded-full bg-border" />
              <Skeleton className="w-[60px] h-[20px] rounded-full bg-border" />
            </div>
            <Skeleton className="w-2/3 h-[20px] rounded-full bg-border" />
            <Skeleton className="w-2/3 h-[20px] rounded-full bg-border" />
            <div className="flex gap-2">
              <Skeleton className="w-[30px] h-[30px] rounded-full bg-border" />
              <Skeleton className="w-[30px] h-[30px] rounded-full bg-border" />
            </div>
            <Skeleton className="w-[50px] h-[14px] rounded-full bg-border" />
          </div>
        </div>
      )}
    </>
  );
}
