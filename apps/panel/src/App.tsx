import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import router from "./routers/index";
import Global from "./global/styles/reset";
import { IntlProvider } from "react-intl";

import messagesinVi from "./global/lang/vi.json";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <IntlProvider messages={messagesinVi} locale="vi">
          <Global />
          <RouterProvider router={router} />
        </IntlProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
