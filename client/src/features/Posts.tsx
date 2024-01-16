import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import Icon from "@/components/ui/icons";
import TimeElapsedComponent from "./fonctions/TimeElapsed";

// TODO: Add interface for props and connect to api

interface PostProps {
  content: string;
  favourites: number;
  username: string;
  created_date: Date;
}

const Posts = ({ content, favourites, username, created_date }: PostProps) => {
  return (
    <div className="py-5 border-border border-b-2 flex gap-3">
      <div>
        <Avatar>
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full justify-between">
          <Typography as="span" className="font-bold text-sm">
            {username}
          </Typography>
          <Typography as="span" className="text-muted-foreground text-sm">
            <TimeElapsedComponent startTime={created_date} />
          </Typography>
        </div>
        <div className="flex flex-col gap-3">
          <Typography as="span" className="text-sm">
            {content}
          </Typography>
          <div className="flex -ml-2">
            <Icon icon="like" size={22} />
            {/* <Icon icon="message" size={22} /> */}
            <Icon icon="send" size={22} />
          </div>
          <Typography as="span" className="text-muted-foreground text-xs">
            {favourites} likes
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Posts;
