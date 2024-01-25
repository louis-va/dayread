import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import Icon from "@/components/ui/icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TimeElapsedComponent from "./fonctions/TimeElapsed";
import { useNavigate } from "react-router-dom";
import ListFllwrsSubs from "./ListFllwrsSubs";

interface PostProps {
  postId: string;
  content: string;
  favourites: number;
  username: string;
  created_date: Date;
  className?: string;
}

const Posts = ({
  postId,
  content,
  favourites,
  username,
  created_date,
  className,
}: PostProps) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState<number>(favourites);
  const [isDialogTriggerOpen, setIsDialogTriggerOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLikeStatus = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/user/${username}/liked-posts?page=%2A`,
          {
            method: "GET",
            credentials: "include" as RequestCredentials,
          }
        );

        if (response.status === 200) {
          const likedPosts = await response.json();
          const postIsLiked = likedPosts.some(
            (post) => post.id === postId.toLowerCase()
          );
          setIsLiked(postIsLiked);
        } else {
          // Gérer les erreurs, si nécessaire
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'état de like :",
          error
        );
      }
    };

    checkLikeStatus();
  }, [postId, username]);

  const handleLikeClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/post/${postId}/${isLiked ? "unlike" : "like"}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.status === 200) {
        setIsLiked(!isLiked);
        setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      } else if (response.status === 401) {
        // Rediriger vers la page de connexion si l'utilisateur n'est pas authentifié
        console.error(
          "Erreur lors de la gestion du like : Utilisateur non authentifié"
        );
      } else if (response.status === 403) {
        // Afficher un message d'erreur spécifique pour un accès interdit
        console.error("Erreur lors de la gestion du like : Accès interdit");
      } else if (response.status === 404) {
        // Afficher un message d'erreur spécifique pour une ressource non trouvée
        console.error(
          "Erreur lors de la gestion du like : Ressource non trouvée"
        );
      } else if (response.status === 500) {
        // Afficher un message d'erreur spécifique pour une erreur serveur
        console.error("Erreur lors de la gestion du like : Erreur serveur");
      } else {
        // Si le code de statut n'est pas géré ci-dessus, afficher le statut par défaut
        const responseData = await response.json();
        console.error(
          "Erreur lors de la gestion du like :",
          responseData.message || response.statusText
        );
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du like", error);
    }
  };

  // const handleLikesCountClick = (e: React.MouseEvent<HTMLSpanElement>) => {
  //   e.preventDefault();
  //   setIsDialogTriggerOpen((prev) => !prev);
  // };

  // const handleDialogClose = () => {
  //   setIsDialogTriggerOpen(false);
  // };

  // const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
  //   e.preventDefault();
  //   if (stopPropagation && e.target === e.currentTarget) {
  //     setIsDialogTriggerOpen((prev) => !prev);
  //   }
  // };

  return (
    <div className={`py-5 flex gap-3 ${className}`}>
      <div>
        <Avatar>
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex w-full justify-between">
          <p
            onClick={(e) => {
              e.preventDefault();
              navigate(`/profil/${username}`);
            }}
          >
            <Typography
              as="span"
              className="font-bold text-sm hover:underline "
            >
              {username}
            </Typography>
          </p>
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
              isLiked={isLiked}
              onClick={handleLikeClick}
            />
            <Icon icon="send" size={22} />
          </div>
          <Dialog>
            <DialogTrigger className="flex items-center">
              <Typography
                className="text-muted-foreground text-xs whitespace-nowrap"
                as="p"
              >
                {likesCount} followers
              </Typography>
            </DialogTrigger>
            <DialogContent className={"h-full lg:h-3/4 overflow-hidden"}>
              Bonjour
            </DialogContent>
          </Dialog>
          {/* <Dialog open={isDialogTriggerOpen} close={handleDialogClose}>
            <DialogTrigger
              className={"items-start justify-start w-min"}
              onClick={handleLikesCountClick}
            >
              <Typography
                as="span"
                className="text-muted-foreground text-xs whitespace-nowrap"
              >
                {likesCount} likes
              </Typography>
            </DialogTrigger>
            <DialogContent onClick={handleInteraction}>
              <DialogHeader>
                <DialogTitle>Liste des likes</DialogTitle>
                <DialogDescription>liste des likes</DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog> */}
        </div>
      </div>
    </div>
  );
};

export default Posts;
