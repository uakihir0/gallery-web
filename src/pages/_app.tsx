import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  const handleScroll = (e: any) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    console.log(e.target.scrollHeight - e.target.scrollTop);
    if (bottom) {
      console.log("bottom");
    }
  };

  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} onScroll={handleScroll} />
    </ChakraProvider>
  );
}

export default MyApp;
