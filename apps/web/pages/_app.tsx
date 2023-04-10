import { AppProps } from "next/app";
import Head from "next/head";
import { Suspense } from "react";
import { IntlProvider } from "react-intl";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "tailwindcss/tailwind.css";
import Loading from "../components/Loading";
import { queryClient } from "../configs/queryClient";
import Global from "../global";
import messagesinVi from "../languages/vi.json";
import LejCompactLogoWhite from "../public/lej-compact-logo-white.png";
import createStore from "../store";

const store = createStore();

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const getLayout = (Component as any).getLayout || ((page: any) => page);

  return (
    <>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="shortcut icon" href={LejCompactLogoWhite.src} />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={LejCompactLogoWhite.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={LejCompactLogoWhite.src}
        />
        <link rel="manifest" href="/site.webmanifest" />
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
