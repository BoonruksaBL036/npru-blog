import { createBrowserRouter } from "react-router";
import { MainLayout } from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import PostDetail from "../pages/PostDetail";
import PostByAuthor from "../pages/PostByAuthor";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/postdetail/:id",
        element: <PostDetail />,
      },
      {
        path: "/postbyauthor/:id",
        element: <PostByAuthor />,
      },
    ],
  },
]);

export default router;
