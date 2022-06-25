import { useEffect, useState } from "react";
import {
  Box,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import Image from "next/image";
import StackGrid from "react-stack-grid";
import { Tweet, Tweets } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";
import { ShadowBox } from "../components/ShadowBox";
import { TweetDetail } from "../components/TweetDetail";
import { Header } from "../components/Hader";

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweets, setTweets] = useState<Tweets | null>(null);
  const [tweet, setTweet] = useState<Tweet | null>(null);

  useEffect(() => {
    getTweets().then((s) => setTweets(s));
  }, []);

  return (
    <>
      <Header />
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
                        width={320}
                        height={height}
                        onClick={() => {
                          setTweet(tweet);
                          onOpen();
                        }}
                      >
                        <Image
                          width={320}
                          height={height}
                          src={tweet.imageUrl}
                          alt={tweet.imageUrl}
                        />
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
