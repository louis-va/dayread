import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTrigger,} from "@/components/ui/dialog";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import Typography from "@/features/Typography";
import Avatars from "@/features/Avatars";
import {Link} from "react-router-dom";
import ListFllwrsSubs from "@/features/ListFllwrsSubs";

interface CardProfileProps {
    userName: string;
    userPseudo: string;
    userEmail: string;
    userBio: string;
    userFollowers: number;
    userSubscribers: number;
    listFollowers: string;
    listSubscribers: string;
}

const CardProfile = ({
                         userName,
                         userPseudo,
                         userEmail,
                         userBio,
                         userFollowers,
                         userSubscribers
                     }: CardProfileProps) => {
    return (
        <Card className="bg-background border-none shadow-none w-full">
            <CardHeader className={"flex-row justify-between items-center"}>
                <section className="flex-col">
                    <CardTitle className={"text-xl lg:text-2xl"}>{userName}</CardTitle>
                    <CardDescription className={"lg:text-lg"}>
                        {userPseudo}
                    </CardDescription>
                </section>
                <Avatars value={userEmail} size={64} style={"shape"}/>
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
                    <DialogContent className={"h-1/2 lg:h-3/4"}>
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
                            <TabsContent className={"h-full"} value="followers">
                                <ul className={'pt-6 h-1/2 overflow-auto lg:h-3/4 '}>
                                    <ListFllwrsSubs variant="followers"
                                                    userName="John Doe"
                                                    userPseudo="john_doe"
                                    />
                                    <ListFllwrsSubs variant="followers"
                                                    userName="John Doe"
                                                    userPseudo="john_doe"
                                    /> <ListFllwrsSubs variant="followers"
                                                       userName="John Doe"
                                                       userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                /> <ListFllwrsSubs variant="followers"
                                                   userName="John Doe"
                                                   userPseudo="john_doe"
                                />
                                </ul>
                            </TabsContent>
                            <TabsContent className={"h-full"} value="subscribers">
                                <ul className={'pt-6 h-1/2 overflow-auto lg:h-3/4'}>
                                    <ListFllwrsSubs variant="subscribers"
                                                    userName="Jane Smith"
                                                    userPseudo="jane_smith"
                                    />
                                </ul>
                            </TabsContent>
                        </Tabs>
                    </DialogContent>
                </Dialog>
            </CardContent>
            <CardFooter className={"px-0 md:justify-center"}>
                <Button className="w-full" variant="outline" asChild={true} size={"lg"}>
                    <Link to={"/"}>
                        <Typography as="p">Modifier le profil</Typography>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CardProfile;
