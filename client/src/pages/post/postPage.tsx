import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/features/Layout";
import Posts from "@/features/Posts";
import Typography from "@/features/Typography";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface PostProps {
  id: string;
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
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setPostData(data);
      })
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <Layout>
      <Link to="/">
        <Button variant="outline" size="sm" className="flex gap-3">
          <Icon icon="retour" size={20} />
          <Typography as={"span"} className={"text-sm"}>
            Retour
          </Typography>
        </Button>
      </Link>
      {postData ? (
        <Posts
          postId={postData.id}
          content={postData.content}
          favourites={postData.favourites}
          username={postData.author.username}
          created_date={new Date(postData.created_date)}
        />
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
    </Layout>
  );
}

export default PostPage;
