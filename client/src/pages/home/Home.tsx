import NewPost from "@/features/NewPost";

import {Layout} from "@/features/Layout";
import Posts from "@/features/Posts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Skeleton} from "@/components/ui/skeleton";
import {Toaster} from "@/components/ui/toaster";
import Feed from "@/features/feed/feed";
import {
  TabsContentHome,
  TabsListHome,
  TabsHome,
  TabsTriggerHome,
} from "@/components/ui/tabsHome";
import Discover from "@/features/discover/discover";

function Home() {
  return (
    <Layout>
      <Toaster />
      <NewPost />
      <TabsHome defaultValue="forYou" className="w-full">
        <TabsListHome>
          <TabsTriggerHome value="forYou">Pour vous</TabsTriggerHome>
          <TabsTriggerHome value="discover">Découverte</TabsTriggerHome>
        </TabsListHome>
        <TabsContentHome value="forYou">
          <Feed />
        </TabsContentHome>
        <TabsContentHome value="discover">
          <Discover />
        </TabsContentHome>
      </TabsHome>
    </Layout>
  );
}


export default Home;
