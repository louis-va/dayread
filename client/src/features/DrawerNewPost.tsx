import { AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/ModalContext";
import { useToast } from "@/components/ui/use-toast";
import { SetStateAction, useState } from "react";
import { getUserName } from "@/localStorageUtils/LsUtils";

export default function DrawerNewPost() {
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

    fetch(`${process.env.VITE_API_URL}/post/`, requestOptions)
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
    <Drawer open={isModalOpen} onClose={closeModal}>
      <DrawerOverlay onClick={closeModal} />
      <DrawerContent className="p-5 gap-5">
        <DrawerHeader>
          <DrawerTitle>Nouveau DayPost</DrawerTitle>
        </DrawerHeader>
        <div
          className="p-5 rounded-md  w-full flex flex-col gap-5 z-20"
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
            placeholder="Nouveau post..."
            value={contenuTextarea}
            onChange={handleChange}
          ></Textarea>
          <div className="flex flex-col gap-5">
            <Typography
              as="span"
              className="text-muted-foreground text-sm self-start"
            >
              Attention vous ne pourrez pas modifier votre post !
            </Typography>
            <Button variant="secondary" onClick={handlePublier}>
              Publier
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => closeModal()}
            >
              Annuler
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
