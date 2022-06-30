import { useEffect, useState, useCallback } from "react";
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

import StackGrid from "react-stack-grid";
import { Tweet } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";
import { TweetDetail } from "../components/TweetDetail";
import { Header } from "../components/Hader";
import { boxShadow } from "../foundations/const";

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tweets, setTweets] = useState<Tweet[] | null>(null);
  const [tweet, setTweet] = useState<Tweet | null>(null);
  const [width, setWidth] = useState<number>(10000);
  const [count, setCount] = useState<number>(0);

  const updateWidth = (_event: any) => {
    setWidth(window.innerWidth);
  };

  // 最後の画像を追う処理を追加
  const lastRef = useCallback(
    (element: HTMLDivElement | null) => {
      if (element === null) return;
      const options = { threshold: 0.01 };
      const observer = new IntersectionObserver((entries, observer) => {
        const ratio = entries[0].intersectionRatio;
        if (ratio > 0 && ratio <= 1) {
          observer.disconnect();
          fetchNextImages();
        }
      }, options);
      observer.observe(element);
    },
    [tweets, count]
  );

  // 次の画面のロードを実行
  const fetchNextImages = useCallback(() => {
    if (tweets === null) return;
    if (tweets.length > count) {
      setCount(tweets.length);
    }
    setCount(count + 10);
  }, [tweets, count]);

  // リサイズハンドラ設定
  useEffect(() => {
    setWidth(window.innerWidth);
    const options = { capture: false, passive: true };
    window.addEventListener(`resize`, updateWidth, options);
    return () => window.removeEventListener(`resize`, updateWidth);
  }, []);

  // 初回ロード実行
  useEffect(() => {
    getTweets().then((s) => {
      // クオリティーの高いもののみを表示
      const results = s!!.tweets.filter((t) => t.quality == 1);
      setCount(results.length < 10 ? results.length : 10);
      setTweets(results);
    });
  }, []);

  // サイズを計算
  const getSize = (w: number) => {
    if (w <= 320 * 2 + 20 * 3) return (w - 20 * 2) / 1;
    if (w <= 320 * 3 + 20 * 4) return (w - 20 * 3) / 2;
    if (w <= 320 * 4 + 20 * 5) return (w - 20 * 4) / 3;
    return 320;
  };

  // ツイートが消されているパターンを検知
  const unlistTweet = useCallback(
    (tweet: Tweet) => {
      if (tweets != null) {
        const index = tweets.indexOf(tweet);
        if (index !== -1) {
          tweets.splice(index, 1);
          setTweets(tweets);
          setCount(count - 1);
        }
      }
    },
    [tweets, count]
  );
  return (
    <>
      <Header />
      {tweets && (
        <Box>
          {(() => {
            const w = getSize(width);
            return (
              <StackGrid //
                columnWidth={w}
                gutterWidth={12}
                gutterHeight={12}
                duration={0}
              >
                {tweets //
                  .slice(0, count)
                  .map((tweet) => {
                    const zoom = w / tweet.imageSize.width;
                    const height = tweet.imageSize.height * zoom;
                    const isLast = tweets.indexOf(tweet) === count - 1;

                    return (
                      <Box
                        key={tweet.galleryId}
                        width={w}
                        height={height}
                        ref={isLast ? lastRef : undefined}
                        boxShadow={boxShadow}
                        onClick={() => {
                          setTweet(tweet);
                          onOpen();
                        }}
                      >
                        <img
                          width={w}
                          height={height}
                          src={tweet.imageUrl}
                          alt={tweet.imageUrl}
                          onError={() => {
                            unlistTweet(tweet);
                          }}
                        />
                      </Box>
                    );
                  })}
              </StackGrid>
            );
          })()}
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
