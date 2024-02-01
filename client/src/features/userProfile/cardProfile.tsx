import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Typography from "@/features/Typography";
import Avatars from "@/features/Avatars";
import { Link, useParams } from "react-router-dom";
import ListFllwrsSubs from "@/features/ListFllwrsSubs";
import { getUserName } from "@/localStorageUtils/LsUtils";

interface CardProfileProps {
  userLastName: string;
  userFirstName: string;
  userPseudo: string;
  userBio: string;
  userFollowers: number;
  userSubscribers: number;
}

const CardProfile = ({
  userLastName,
  userFirstName,
  userPseudo,
  userBio,
  userFollowers,
  userSubscribers,
}: CardProfileProps) => {
  const firstLetterLastName = userLastName.charAt(0);
  const firstLetterFirstName = userFirstName.charAt(0);
  const initiales = firstLetterLastName + firstLetterFirstName;

  const userUseParams = useParams<{ username: string }>();
  const userLink = userUseParams.username;
  const userName = getUserName();
  let isUser;

  if (userName === userLink) {
    isUser = true;
  } else {
    isUser = false;
  }

  return (
    <Card className="bg-background border-none shadow-none w-full">
      <CardHeader className={"flex-row justify-between items-center"}>
        <section className="flex-col">
          <CardTitle className={"text-xl lg:text-2xl"}>{userPseudo}</CardTitle>
          <CardDescription className={"lg:text-lg"}>
            {userLastName} {userFirstName}
          </CardDescription>
        </section>
        <Avatars value={initiales.toString()} size={64} style={"shape"} />
      </CardHeader>
      <CardContent>
        <Typography as="p">{userBio}</Typography>
        <Dialog>
          <DialogTrigger className="flex items-center">
            <Typography className={"text-sm"} as="p">
              {userFollowers} followers
            </Typography>
            <Typography className={"px-3"} as={"span"}>
              ·
            </Typography>
            <Typography className={"text-sm"} as="p">
              {userSubscribers} suivi(e)s
            </Typography>
          </DialogTrigger>
          <DialogContent className={"h-full lg:h-3/4 overflow-hidden"}>
            <Tabs defaultValue="followers" className="w-full h-full pt-4">
              <DialogHeader>
                <TabsList className="w-full justify-between py-6 rounded-md">
                  <TabsTrigger
                    value="followers"
                    className={"py-2 rounded-md w-full"}
                  >
                    <Typography> {userFollowers} followers</Typography>
                  </TabsTrigger>
                  <TabsTrigger
                    value="subscribers"
                    className={"py-2 rounded-md w-full"}
                  >
                    <Typography> {userSubscribers} suivi(e)s</Typography>
                  </TabsTrigger>
                </TabsList>
              </DialogHeader>
              <TabsContent
                className={"h-full p-2 overflow-auto lg:h-3/4"}
                value="followers"
              >
                <ul>
                  <ListFllwrsSubs
                    variant="followers"
                    userName="John Doe"
                    userPseudo="john_doe"
                  />
                </ul>
              </TabsContent>
              <TabsContent
                className={"h-full p-2 overflow-auto lg:h-3/4"}
                value="subscribers"
              >
                <ul className={" h-1/2 overflow-auto lg:h-3/4"}>
                  <ListFllwrsSubs
                    variant="subscribers"
                    userName="Jane Smith"
                    userPseudo="jane_smith"
                  />
                </ul>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </CardContent>
      <CardFooter className={"px-0 lg:justify-center"}>
        {isUser ? (
          <Button
            className="w-full"
            variant="outline"
            asChild={true}
            size={"lg"}
          >
            <Link to={"/profil/update"}>
              <Typography as="p">Modifier le profil</Typography>
            </Link>
          </Button>
        ) : (
          <Button className="w-full" variant="white" size={"lg"}>
            <Typography as="p">S'abonner</Typography>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export default CardProfile;
