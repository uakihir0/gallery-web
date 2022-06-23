import { useEffect, useState } from "react";
import { Box, Flex, Text, Center } from "@chakra-ui/react";
import StackGrid from "react-stack-grid";

import { Tweets } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";
import { ShadowBox } from "../components/ShadowBox";

const Gallery = () => {
  const [tweets, setTweets] = useState<Tweets | null>(null);

  useEffect(() => {
    getTweets().then((s) => setTweets(s));
  }, []);

  return (
    <>
      <Center //
        w="100%"
        bg="blue.300"
        boxShadow="md"
        mb={6}
      >
        <Text //
          my={1.5}
          color="white"
          fontSize="2xl"
        >
          <b>Twitter Illustration Gallery</b>
        </Text>
      </Center>
      {tweets && (
        <Box //
          my={4}
        >
          <StackGrid //
            columnWidth={300}
            gutterWidth={12}
            gutterHeight={12}
          >
            {tweets.tweets.map((tweet) => {
              const zoom = 300 / tweet.imageSize.width;
              return (
                <div key={tweet.galleryId}>
                  <ShadowBox>
                    <Box h={tweet.imageSize.height * zoom}>
                      <img src={tweet.imageUrl} />
                    </Box>
                  </ShadowBox>
                </div>
              );
            })}
          </StackGrid>
        </Box>
      )}
    </>
  );
};

export default Gallery;
