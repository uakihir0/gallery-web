import { errorHandle } from "../error";
import { rest } from "../rest";
import { Tweets } from "../type";

const getTweets = async (): Promise<Tweets | null> => {
  const path = "http://www.uakihir0.com/gallery-data/gallery.json";

  try {
    const { data } = await rest().get<Tweets>(path);
    return data;
  } catch (error) {
    errorHandle(error);
    return null;
  }
};

export { getTweets };
