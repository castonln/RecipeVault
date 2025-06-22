import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import SignIn from "../components/SignIn";
import RecipeBook from "../components/RecipeBook";
import RequiresAuth from "./RequiresAuth";
import SignUp from "../components/SignUp";

export const ROUTES = {
  RECIPEBOOK:
  {
    path: "/",
    element:
      <RequiresAuth>
        <RecipeBook />
      </RequiresAuth>
  },
  SIGNUP:
  {
    path: "/signup",
    element: <SignUp />
  },
  SIGNIN:
  {
    path: "/signin",
    element: <SignIn />,
  },
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    Object.values(ROUTES).map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);