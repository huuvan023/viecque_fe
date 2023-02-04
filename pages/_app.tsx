import "../styles/globals.css";
import "@Public/assets/css/style.css";
import type { AppProps } from "next/app";
import { GlobalStateProvider } from "@Store/Provider";
import { SWRConfig } from "swr/_internal";
import axios from "axios";

export default function App({ Component, pageProps }: AppProps) {
  const configAxios = axios.create({
    baseURL: "/",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return (
    <GlobalStateProvider>
      <SWRConfig
        value={{
          fetcher: (url) => configAxios.get(url),
          shouldRetryOnError: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </GlobalStateProvider>
  );
}
