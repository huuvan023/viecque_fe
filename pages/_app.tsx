import "../styles/globals.css";
import "@Public/assets/css/style.css";
import type { AppProps } from "next/app";
import { GlobalStateProvider } from "@Store/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}
