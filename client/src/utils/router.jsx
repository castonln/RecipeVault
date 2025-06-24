import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from "react-router";
import RecipeBook from "../components/RecipeBook";
import RecipePage from "../components/RecipePage/RecipePage";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import PrivateRoute from "./PrivateRoute";

export const ROUTES = {
  RECIPEBOOK: {
    path: "/",
    element:
      <PrivateRoute>
        <RecipeBook />
      </PrivateRoute>
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
      <PrivateRoute>
        <RecipePage />
      </PrivateRoute>
  }
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    Object.values(ROUTES).map((route) => (
      <Route key={route.path} path={route.path} element={route.element} />
    ))
  )
);