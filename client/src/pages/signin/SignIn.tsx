import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import Typography from "@/features/Typography";
import SignForm from "@/features/forms/SignForm";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex h-screen">
      <div className="hidden h-full p-10 lg:flex lg:flex-col lg:justify-between lg:border-r lg:border-border lg:bg-popover lg:w-1/2">
        <div className="flex gap-2">
          <Logo size={30} />
          <Typography as="span" className="text-xl font-medium">
            DayRead
          </Typography>
        </div>
        <Typography as="p" className="font-medium w-2/3">
          "Partager c'est aimer !"
        </Typography>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 h-full p-5 lg:p-10 ">
        <div className="self-end">
          <Button variant="link">
            <Link to="/login">Login</Link>
          </Button>
        </div>
        <div className="h-full w-full flex  flex-col items-center justify-center gap-8">
          <Typography
            as="h1"
            className="font-bold text-2xl lg:text-4xl border-b-4 border-foreground pb-2"
          >
            S'inscrire
          </Typography>
          <SignForm />
        </div>
      </div>
    </div>
  );
}
