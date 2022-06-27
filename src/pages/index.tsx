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
import { Tweet } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";
import { ShadowBox } from "../components/ShadowBox";
import { TweetDetail } from "../components/TweetDetail";
import { Header } from "../components/Hader";
import { chunk } from "../foundations/array";
import { text } from "stream/consumers";

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [width, setWidth] = useState<number>(10000);
  const [scroll, setScroll] = useState<number>(20);

  const updateWidth = (_event: any) => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    const options = { capture: false, passive: true };
    window.addEventListener(`resize`, updateWidth, options);
    return () => window.removeEventListener(`resize`, updateWidth);
  }, []);

  useEffect(() => {
    window.addEventListener(`scroll`, handleScroll);
    return () => window.removeEventListener(`scroll`, handleScroll);
  }, [scroll, tweets]);

  useEffect(() => {
    getTweets().then((s) => {
      // クオリティーの高いもののみを表示
      setTweets(s!!.tweets.filter((t) => t.quality == 1));
    });
  }, []);

  // サイズを計算
  const getSize = (w: number) => {
    if (w <= 320 * 2 + 20 * 3) return (w - 20 * 2) / 1;
    if (w <= 320 * 3 + 20 * 4) return (w - 20 * 3) / 2;
    if (w <= 320 * 4 + 20 * 5) return (w - 20 * 4) / 3;
    return 320;
  };

  // スクロール時に追加
  const handleScroll = () => {
    const bottomPosition =
      document.body.offsetHeight - (window.scrollY + window.innerHeight);

    // 画面が更新される前に更新
    if (bottomPosition < window.innerHeight) {
      if (tweets != null) {
        const count = scroll + 20;
        if (tweets.length < count) {
          setScroll(tweets.length);
        }
        setScroll(scroll + 20);
      }
    }
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
            {tweets.slice(0, scroll).map((tweet) => {
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
