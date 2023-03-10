import 'globalthis/auto';
import "../styles/globals.css";
import "@Public/assets/css/style.css";
import type { AppProps } from "next/app";
import { GlobalStateProvider } from "@Store/Provider";
import { SWRConfig } from "swr/_internal";
import AxiosClient from "@Axios/axios";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <SWRConfig
        value={{
          fetcher: (url) => AxiosClient.get(url),
          shouldRetryOnError: false,
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </GlobalStateProvider>
  );
}
