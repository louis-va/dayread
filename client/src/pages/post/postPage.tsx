import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";
import { useEffect, useState } from "react";

interface PostProps {
  content: string;
  favourites: number;
  author: {
    username: string;
  };
  username: string;
  created_date: Date;
}

function PostPage() {
  const [postData, setPostData] = useState<PostProps>();

  useEffect(() => {
    fetch("http://localhost:8000/post/65a6e7dd464ec41eac67d345", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.created_date);
        setPostData(data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Layout>
      <Button variant="ghostIcon" size="icon">
        <Icon icon="logout" size={22} />
      </Button>
      {postData ? (
        <Posts
          content={postData.content}
          favourites={postData.favourites}
          username={postData.author.username}
          created_date={new Date(postData.created_date)}
        />
      ) : (
        <div className="flex gap-3 w-full">
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
    </Layout>
  );
}

export default PostPage;
