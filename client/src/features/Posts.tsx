import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import Icon from "@/components/ui/icons";

export default function Posts() {
  return (
    <div className="py-5 border-border border-b-2 flex gap-3">
      <div>
        <Avatar>
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Typography as="span" className="font-bold text-sm">
            bSchutters
          </Typography>
          <Typography as="span" className="text-muted-foreground text-sm">
            18h
          </Typography>
        </div>
        <div className="flex flex-col gap-3">
          <Typography as="span" className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
            cupiditate. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Labore, hic.
          </Typography>
          <div className="flex">
            <Icon icon="like" size={22} />
            {/* <Icon icon="message" size={22} /> */}
            <Icon icon="send" size={22} />
          </div>
          <Typography
            as="span"
            className="text-muted-foreground text-xs self-end"
          >
            141 mentions J'aime
          </Typography>
        </div>
      </div>
    </div>
  );
}
