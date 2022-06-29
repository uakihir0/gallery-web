import { Image, Share } from "react-feather";
import React, { useCallback, useEffect } from "react";

import { Tweet } from "../interactors/type";
import { Box, Center } from "@chakra-ui/react";

export const TweetDetail = ({ tweet }: { tweet: Tweet }) => {
  // 開く度に実行
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 画像のシェアを実行
  const handleSubmit = useCallback(async () => {
    const blob = await fetch(tweet.imageUrl).then((r) => r.blob());
    const data = {
      files: [
        new File([blob], "file.jpg", {
          type: blob.type,
        }),
      ],
      title: "title",
      text: "image",
    };
    if (navigator["share"] != undefined) {
      if (navigator.canShare(data)) {
        await navigator.share(data);
      }
    }
  }, [tweet]);

  return (
    <>
      <Box w="100%">
        <Center mb={4}>
          <blockquote className="twitter-tweet">
            <a href={tweet.tweetUrl} />
          </blockquote>
        </Center>

        <Center>
          <Box //
            as="a"
            href={tweet.imageUrl}
            borderRadius="full"
            borderColor="gray.300"
            borderWidth="2px"
            p={2.5}
            mx={2}
          >
            <Image color="#abb" />
          </Box>

          {navigator["share"] != undefined && (
            <Box //
              onClick={handleSubmit}
              borderRadius="full"
              borderColor="gray.300"
              borderWidth="2px"
              p={2.5}
              mx={2}
            >
              <Share color="#abb" />
            </Box>
          )}
        </Center>
      </Box>
    </>
  );
};
