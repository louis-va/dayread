import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/logo/logo";
import Typography from "@/features/Typography";
import SignForm from "@/features/forms/SignForm";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="flex h-screen">
      <div className="hidden h-full p-10 md:flex md:flex-col md:justify-between md:border-r md:border-border md:bg-popover md:w-1/2">
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

      <div className="flex flex-col w-full md:w-1/2 h-full p-5 md:p-10 ">
        <div className="self-end">
          <Button variant="link">
            <Link to="/login">Login</Link>
          </Button>
        </div>
        <div className="h-full w-full flex  flex-col items-center justify-center gap-8">
          <Typography
            as="h1"
            className="font-bold text-2xl md:text-4xl border-b-4 border-foreground pb-2"
          >
            S'inscrire
          </Typography>
          <SignForm />
        </div>
      </div>
    </div>
  );
}
