import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../../styles/globals.css";
import theme from "../theme";

import { GoogleAnalytics, usePageView } from "../foundations/gtag";

function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <GoogleAnalytics />
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
