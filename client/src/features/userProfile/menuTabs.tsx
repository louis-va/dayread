import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Typography from "@/features/Typography";
import PostList from "./postList";
import LikeList from "./likeList";

const MenuTabs = () => {
  return (
    <>
      <Tabs defaultValue="publications" className="w-full h-full">
        <TabsList className="w-full justify-between py-6 rounded-md">
          <TabsTrigger
            value="publications"
            className={"py-2 rounded-md w-full"}
          >
            <Typography>Publications</Typography>
          </TabsTrigger>
          <TabsTrigger value="like" className={"py-2 rounded-md w-full"}>
            <Typography>Like</Typography>
          </TabsTrigger>
        </TabsList>
        <TabsContent className={"h-full"} value="publications">
          <PostList />
        </TabsContent>
        <TabsContent className={"h-full"} value="like">
          <LikeList />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MenuTabs;
