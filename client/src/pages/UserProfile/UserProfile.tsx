import {Layout} from "@/features/Layout";
import CardProfile from "../../features/CardProfile"
import * as React from "react"
import MenuTabs from "@/features/MenuTabs";

const UserProfile = () => {

    return (
        <Layout>
            <CardProfile userName={'User Name'}
                         userPseudo={'User Pseudo'}
                         userEmail={'unep*ute@gmail.com'}
                         userBio={'Je suis une p*te'}
                         userFollowers={199}
                         userSubscribers={266}
            />
            <MenuTabs/>
        </Layout>
    )
}

export default UserProfile;