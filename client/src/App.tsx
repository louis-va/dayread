import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import UserProfile from "@/pages/UserProfile/UserProfile";
import { ThemeProvider } from "@/components/ui/theme-provider";
import "./main.css";
import SignIn from "./pages/signin/SignIn";
import Login from "./pages/login/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return (
    <>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
