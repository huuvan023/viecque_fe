import "../styles/globals.css";
import "../public/assets/css/style.css";
// import "../public/assets/scss./"

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
