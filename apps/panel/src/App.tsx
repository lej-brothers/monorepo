import React from "react";
import { IntlProvider } from "react-intl";
import { RouterProvider, redirect } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Global from "./global/styles/reset";
import router from "./routers/index";

import { QueryClientWrapper } from "queries";
import messagesinVi from "./global/lang/vi.json";

function App() {
  
  return (
    <QueryClientWrapper>
      <RecoilRoot>
        <IntlProvider messages={messagesinVi} locale="vi">
          <Global />
          <RouterProvider router={router} />
        </IntlProvider>
      </RecoilRoot>
    </QueryClientWrapper>
  );
}

export default App;
