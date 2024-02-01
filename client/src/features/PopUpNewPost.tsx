import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { getUserName } from "@/localStorageUtils/LsUtils";

export default function PopUpNewPost() {
  const { isModalOpen, closeModal } = useModal();
  const [postText, setPostText] = useState<string>("");
  const { toast } = useToast();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handlePublier = () => {
    const dataToSend = {
      content: postText,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(dataToSend),
    };

    fetch(`${import.meta.env.VITE_API_URL}/post/`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setPostText("");
          toast({
            description: "Votre post à bien été publié !",
          });
          closeModal();
        }

        if (!response.ok) {
          throw new Error(
            `La requête a échoué avec le statut ${response.status}`
          );
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
      });
  };

  const maxPostLength: number = 240;
  const decrementCharacter: number = maxPostLength - postText.length;

  return (
    <>
      {isModalOpen && (
        <div
          className="hidden lg:flex flex-col gap-5 justify-center items-center lg:absolute z-10 bg-background/90 p-5 w-full h-full"
          onClick={() => closeModal()}
        >
          <Typography
            as="h2"
            className="font-bold text-lg"
            onClick={(e) => e.stopPropagation()}
          >
            Nouveau DayPost
          </Typography>
          <div
            className="p-5 rounded-md bg-popover border-2 border-border w-2/3 flex flex-col gap-5 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex gap-3 items-center ">
              <Avatar>
                <AvatarImage src="https://picsum.photos/200" />
              </Avatar>
              <Typography as="span" className="font-bold text-md">
                {getUserName()}
              </Typography>
            </div>
            <Textarea
              minLength={3}
              maxLength={maxPostLength}
              placeholder="Nouveau post..."
              value={postText}
              onChange={handleTextChange}
            />
            <div className="flex justify-between items-center">
              <Typography as="span" className="text-muted-foreground text-sm">
                Attention vous ne pourrez pas modifier votre post !
              </Typography>
              <section className="flex items-center gap-8">
                <Typography
                  as="span"
                  className={`text-sm ${
                    decrementCharacter <= 20 ? "text-primary" : ""
                  }`}
                >
                  {decrementCharacter}/{maxPostLength}
                </Typography>
                <Button
                  variant="secondary"
                  className="self-end"
                  onClick={handlePublier}
                >
                  Publier
                </Button>
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
