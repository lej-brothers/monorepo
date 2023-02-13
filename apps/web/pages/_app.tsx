import { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { queryClient } from "../configs/queryClient";
import Global from "../global";
import createStore from "../store";

import "tailwindcss/tailwind.css";

const store = createStore();

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  const getLayout = (Component as any).getLayout || ((page: any) => page)

  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <Global />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
