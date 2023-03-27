import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "../configs/queryClient";
import Global from "../global";
import createStore from "../store";

import { Suspense } from "react";
import "tailwindcss/tailwind.css";
import Loading from "../components/Loading";
import { IntlProvider } from "react-intl";

import messagesinVi from "../languages/vi.json";
import Head from "next/head";

const store = createStore();

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale = 1.0, user-scalable = no"
        ></meta>
      </Head>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <IntlProvider messages={messagesinVi} locale="vi">
            <QueryClientProvider client={queryClient}>
              <Suspense fallback={<Loading />}>
                {getLayout(<Component {...pageProps} />)}
                <Global />
              </Suspense>
            </QueryClientProvider>
          </IntlProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
