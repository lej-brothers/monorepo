import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Root from "../views/Root";
import Order from "../views/Order";
import Product from "../views/Product";
import Auth from "../views/Auth";
import authLoader from "../utils/authLoader";
import Promotion from "../views/Promotion";
import Insight from "../views/Insight";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/auth" element={<Auth />} />
      <Route loader={authLoader} path="/orders" element={<Order />} />
      <Route loader={authLoader} path="/products" element={<Product />} />
      <Route loader={authLoader} path="/promotions" element={<Promotion />} />
      <Route loader={authLoader} path="/insights" element={<Insight />} />
    </Route>
  )
);

export default router;
