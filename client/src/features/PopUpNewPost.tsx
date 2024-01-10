import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Typography from "./Typography";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useModal } from "@/context/ModalContext";

export default function PopUpNewPost() {
  const { isModalOpen, closeModal } = useModal();
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
            className="p-5 rounded-md bg-popover border-2 border-border w-1/3 flex flex-col gap-5 z-20"
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
            <div className="flex justify-between items-center">
              <Typography as="span" className="text-muted-foreground text-sm">
                Attention vous ne pourrez pas modifier votre post !
              </Typography>
              <Button variant="secondary" className="self-end">
                Publier
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
