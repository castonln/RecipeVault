import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import SignIn from "../components/SignIn";
import RecipeBook from "../components/RecipeBook";
import RequiresAuth from "./RequiresAuth";
import SignUp from "../components/SignUp";

export const ROUTES = [
  {
    path: "/",
    element:
      <RequiresAuth>
        <RecipeBook />
      </RequiresAuth>
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
]

export const router = createBrowserRouter(
  createRoutesFromElements(
    ROUTES.map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);