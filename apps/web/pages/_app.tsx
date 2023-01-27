import { AppProps } from "next/app";
import Global from "../global";
import 'tailwindcss/tailwind.css'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Component {...pageProps} />
      <Global />
    </>
  );
}
