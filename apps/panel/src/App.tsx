import React from "react";
import logo from "./logo.svg";
import { RouterProvider } from "react-router-dom";
import router from "./routers/index";
import Global from "./global/styles/reset";

function App() {
  return (
    <>
      <Global />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
