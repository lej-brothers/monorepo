import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routers/index";
import Global from "./global/styles/reset";
import { IntlProvider } from "react-intl";

import messagesinVi from "./global/lang/vi.json";

function App() {
  return (
    <IntlProvider messages={messagesinVi} locale="vi">
      <Global />
      <RouterProvider router={router} />
    </IntlProvider>
  );
}

export default App;
