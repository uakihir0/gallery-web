import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import StackGrid from "react-stack-grid";
import { Tweet, Tweets } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";
import { ShadowBox } from "../components/ShadowBox";
import { TweetDetail } from "../components/TweetDetail";

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweets, setTweets] = useState<Tweets | null>(null);
  const [tweet, setTweet] = useState<Tweet | null>(null);

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
            columnWidth={320}
            gutterWidth={12}
            gutterHeight={12}
          >
            {tweets.tweets
              // クオリティーの高いもののみを表示
              .filter((t) => t.quality == 1)
              .map((tweet) => {
                const zoom = 320 / tweet.imageSize.width;
                const height = tweet.imageSize.height * zoom;
                return (
                  <div key={tweet.galleryId}>
                    <ShadowBox>
                      <Box
                        h={height}
                        onClick={() => {
                          setTweet(tweet);
                          onOpen();
                        }}
                      >
                        <img src={tweet.imageUrl} />
                      </Box>
                    </ShadowBox>
                  </div>
                );
              })}
          </StackGrid>
        </Box>
      )}

      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Center my={8}>
              {/** ツイート本文を表示 */}
              {tweet && <TweetDetail tweet={tweet} />}
            </Center>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Gallery;
