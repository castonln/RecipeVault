import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import SignIn from "../components/SignIn";
import RecipeBook from "../components/RecipeBook";
import RequiresAuth from "./RequiresAuth";
import SignUp from "../components/SignUp";
import RecipePage from "../components/RecipePage/RecipePage";

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
    element: <SignUp />
  },
  SIGNIN: {
    path: "/signin",
    element: <SignIn />,
  },
  RECIPEPAGE: {
    path: "/recipe/:recipeId",
    element:
      <RequiresAuth>
        <RecipePage />
      </RequiresAuth>
  }
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    Object.values(ROUTES).map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);
