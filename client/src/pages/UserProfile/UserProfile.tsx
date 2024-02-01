import { Layout } from "@/features/Layout";
import CardProfile from "@/features/userProfile/cardProfile";
import MenuTabs from "@/features/userProfile/menuTabs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface userProps {
  id: string;
  username: string;
  lastname: string;
  firstname: string;
  pseudo: string;
  bio: string;
  followers: number;
  following: number;
}

const UserProfile = () => {
  const [userData, setUserData] = useState<userProps>();
  const { username } = useParams<{ username: string }>();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/${username}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.log("error", error));
  }, [username]);
  return (
    <Layout>
      <CardProfile
        userLastName={userData?.lastname ?? ""}
        userFirstName={userData?.firstname ?? ""}
        userPseudo={userData?.username ?? ""}
        userBio={userData?.bio ?? ""}
        userFollowers={userData?.followers ?? 0}
        userSubscribers={userData?.following ?? 0}
      />
      <MenuTabs />
    </Layout>
  );
};

export default UserProfile;
