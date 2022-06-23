import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import StackGrid from "react-stack-grid";

import { Tweets } from "../interactors/type";
import { getTweets } from "../interactors/client/getTweets";

const Gallery = () => {
  const [tweets, setTweets] = useState<Tweets | null>(null);

  useEffect(() => {
    getTweets().then((s) => setTweets(s));
  }, []);

  return (
    <>
      {tweets && (
        <StackGrid columnWidth={300}>
          {tweets.tweets.map((tweet) => {
            return (
              <div key={tweet.galleryId}>
                <Box boxShadow="md">
                  <img src={tweet.imageUrl} />
                </Box>
              </div>
            );
          })}
        </StackGrid>
      )}
    </>
  );
};

export default Gallery;
