import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "../views/Root";
import Product from "../views/Product";
import Auth from "../views/Auth";
import authLoader from "../utils/authLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/auth" element={<Auth />} />
      <Route
        loader={authLoader}
        path="/products"
        element={<Product />}
      />
    </Route>
  )
);

export default router;
