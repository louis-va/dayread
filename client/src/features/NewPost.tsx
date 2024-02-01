import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";

export default function NewPost() {
  const { openModal, isModalOpen } = useModal();

  const handleOpenModal = () => {
    openModal();
    console.log(isModalOpen);
  };
  return (
    <div
      className="hidden lg:flex items-center w-full justify-between border-b-2 border-border pb-5"
      onClick={handleOpenModal}
    >
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://picsum.photos/200" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Typography as="span" className="text-muted-foreground">
          Poster un DayPost...
        </Typography>
      </div>
      <Button variant="outline" size="lg" disabled>
        Publier
      </Button>
    </div>
  );
}
