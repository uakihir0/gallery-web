import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <title>Twitter Illustration Gallery</title>
          <meta //
            property="og:url"
            content="https://gallery-uakihir0.vercel.app/"
          />
          <meta //
            property="og:title"
            content="Twitter Illustration Gallery"
          />
          <meta //
            property="og:description"
            content="Twitter でお気に入り登録件数の多いイラスト作品を、ギャラリー形式で紹介しています。"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
