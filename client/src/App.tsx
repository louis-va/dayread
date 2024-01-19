import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider,} from "react-router-dom";
import Home from "./pages/home/Home";
import UserProfile from "@/pages/UserProfile/UserProfile";
import UserProfileUpdate from "@/pages/UserProfile/UserProfileUpdate";
import NotFound from './pages/notFound/NotFound'
import SignIn from "./pages/signin/SignIn";
import Login from "./pages/login/Login";
import PostPage from "./pages/post/postPage";
import {ThemeProvider} from "@/components/ui/theme-provider";
import "./main.css";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path='*' element={<NotFound/>}/>
            <Route index element={<Home/>}/>
            <Route path="profil" element={<UserProfile/>}/>
            <Route path="profil/update" element={<UserProfileUpdate/>}/>
            <Route path="signin" element={<SignIn/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="post/:id" element={<PostPage/>}/>
        </Route>
    )
);

function App() {
    return (
        <>
            <ThemeProvider>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </>
    );
}

export default App;
