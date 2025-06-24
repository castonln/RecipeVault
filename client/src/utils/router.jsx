import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router";
import RecipeBook from "../components/RecipeBook";
import RecipePage from "../components/RecipePage/RecipePage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequiresAuth from "./RequiresAuth";
import RequiresNoAuth from "./RequiresNoAuth";

export const ROUTES = {
  RECIPEBOOK: {
    path: "/",
    element:
      <RequiresAuth>
        <RecipeBook />
      </RequiresAuth>
  },
  SIGNUP: {
    path: "/signup",
    element:
      <RequiresNoAuth>
        <SignUp />
      </RequiresNoAuth>
  },
  SIGNIN: {
    path: "/signin",
    element:
      <RequiresNoAuth>
        <SignIn />
      </RequiresNoAuth>
  },
  RECIPEPAGE: {
    path: "/recipe/:recipeId",
    element:
      <RequiresAuth>
        <RecipePage />
      </RequiresAuth>
  }
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    Object.values(ROUTES).map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);