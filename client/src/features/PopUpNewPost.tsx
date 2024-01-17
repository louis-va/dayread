import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";
import { SetStateAction, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function PopUpNewPost() {
  const { isModalOpen, closeModal } = useModal();
  const { toast } = useToast();

  const [contenuTextarea, setContenuTextarea] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setContenuTextarea(e.target.value);
  };

  const handlePublier = () => {
    const dataToSend = {
      content: contenuTextarea,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include" as RequestCredentials,
      body: JSON.stringify(dataToSend),
    };

    fetch("http://localhost:8000/post/", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setContenuTextarea("");
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

  return (
    <>
      {isModalOpen && (
        <div
          className="hidden md:flex flex-col gap-5 justify-center items-center md:absolute z-10 bg-background/90 p-5 w-full h-full"
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
                <AvatarFallback>BS</AvatarFallback>
              </Avatar>
              <Typography as="span" className="font-bold text-md">
                bSchutters
              </Typography>
            </div>
            <Textarea
              placeholder="Nouveau post..."
              value={contenuTextarea}
              onChange={handleChange}
            ></Textarea>
            <div className="flex justify-between items-center">
              <Typography as="span" className="text-muted-foreground text-sm">
                Attention vous ne pourrez pas modifier votre post !
              </Typography>
              <Button
                variant="secondary"
                className="self-end"
                onClick={handlePublier}
              >
                Publier
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
