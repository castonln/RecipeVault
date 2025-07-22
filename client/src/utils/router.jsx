import { createHashRouter, createRoutesFromElements, Route } from "react-router";
import RecipeBook from "../components/RecipeBook";
import RecipePage from "../components/RecipePage/RecipePage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import RequiresAuth from "./RequiresAuth";
import RequiresNoAuth from "./RequiresNoAuth";
import PageNotFound from "../components/NotFound/PageNotFound";
import RecipeNotFound from "../components/NotFound/RecipeNotFound";

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
  },
  PAGENOTFOUND: {
    path: "/*",
    element: <PageNotFound />  
  },
};

export const router = createHashRouter(
  createRoutesFromElements(
    Object.values(ROUTES).map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);
