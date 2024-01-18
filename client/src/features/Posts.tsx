import React, { useState} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import Icon from "@/components/ui/icons";
import TimeElapsedComponent from "./fonctions/TimeElapsed";

interface PostProps {
    postId: string;
    content: string;
    favourites: number;
    username: string;
    created_date: Date;
}

const Posts: React.FC<PostProps> = ({
                                        postId,
                                        content,
                                        favourites,
                                        username,
                                        created_date,
                                    }: PostProps) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [likesCount, setLikesCount] = useState<number>(favourites);

    const handleLikeClick = async () => {
        try {
            const response = await fetch(`http://localhost:8000/post/${postId}/${isLiked ? 'unlike' : 'like'}`, {
                method: "POST",
                credentials: "include",
            });

            if (response.status === 200) {
                setIsLiked(!isLiked);
                setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
            } else {
                console.error('Erreur lors de la gestion du like');
            }
        } catch (error) {
            console.error("Erreur lors de l'enregistrement du like", error);
        }
    };

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
                        <Icon
                            icon="like"
                            size={22}
                            style={{
                                color: isLiked ? "text-primary" : "",
                                cursor: "pointer",
                            }}
                            onClick={handleLikeClick}
                        />
                        <Icon icon="send" size={22} />
                    </div>
                    <Typography as="span" className="text-muted-foreground text-xs">
                        {likesCount} likes
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default Posts;
