import { ThemeProvider } from "./components/ui/theme-provider";
import Typography from "./features/Typography";
import Avatars from "@/features/Avatars.tsx";

import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/home/Home";
import "./main.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
    </Route>
  )
);

function App() {
  return (

    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
