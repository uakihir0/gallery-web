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
  const [width, setWidth] = useState<number>(10000);

  const updateWidth = (_event: any) => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    window.addEventListener(`resize`, updateWidth, {
      capture: false,
      passive: true,
    });
    return () => window.removeEventListener(`resize`, updateWidth);
  }, []);

  useEffect(() => {
    getTweets().then((s) => setTweets(s));
  }, []);

  // サイズを計算
  const getSize = (w: number) => {
    if (w <= 320 * 2 + 20 * 3) return (w - 20 * 2) / 1;
    if (w <= 320 * 3 + 20 * 4) return (w - 20 * 3) / 2;
    if (w <= 320 * 4 + 20 * 5) return (w - 20 * 4) / 3;
    return 320;
  };

  return (
    <>
      <Header />
      {tweets && (
        <Box>
          <StackGrid //
            columnWidth={getSize(width)}
            gutterWidth={12}
            gutterHeight={12}
          >
            {tweets.tweets
              // クオリティーの高いもののみを表示
              .filter((t) => t.quality == 1)
              .map((tweet) => {
                const w = getSize(width);
                const zoom = w / tweet.imageSize.width;
                const height = tweet.imageSize.height * zoom;
                return (
                  <div key={tweet.galleryId}>
                    <ShadowBox>
                      <Box
                        width={w}
                        height={height}
                        onClick={() => {
                          setTweet(tweet);
                          onOpen();
                        }}
                      >
                        <Image
                          width={w}
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
