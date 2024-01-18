import { Layout } from "@/features/Layout";
import CardProfile from "@/features/userProfile/CardProfile";
import MenuTabs from "@/features/userProfile/MenuTabs";
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
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetch(`http://localhost:8000/user/bschutters`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.log("error", error));
  }, [id]);
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
