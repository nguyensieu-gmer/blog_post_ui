import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router";
import { SignUp } from "./component/signup.jsx";
import { LogIn } from "./component/login.jsx";
import { UserContext } from "./context.js";
import { YourPost } from "./component/yourpost.jsx";
import { Posts } from "./component/posts.jsx";
import ErrorPage from "./component/BadUrl.jsx";

export function RootLayout() {
  const [user, setUser] = useState(null);
  return (
    <UserContext value={{ user, setUser }}>
      <Outlet />
    </UserContext>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "your_post", element: <YourPost /> },
          { index: true, element: <Posts /> },
        ],
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "log-in",
        element: <LogIn />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
