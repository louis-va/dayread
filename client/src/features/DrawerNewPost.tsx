import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerOverlay,
} from "@/components/ui/drawer";
import { Avatar } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Textarea } from "@/components/ui/textarea";
import { useModal } from "@/context/ModalContext";

export default function DrawerNewPost() {
  const { isModalOpen, closeModal } = useModal();

  const handlePublier = () => {
    closeModal();
  };

  return (
    <Drawer open={isModalOpen} onDrag={closeModal}>
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
              <AvatarFallback>BS</AvatarFallback>
            </Avatar>
            <Typography as="span" className="font-bold text-md">
              bSchutters
            </Typography>
          </div>
          <Textarea placeholder="Nouveau post..."></Textarea>
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
            <DrawerClose>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => closeModal()}
              >
                Annuler
              </Button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
