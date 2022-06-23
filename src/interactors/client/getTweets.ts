import { rest } from "../rest";
import { Tweets } from "../type";
import { errorHandle } from "../error";

const getTweets = async (): Promise<Tweets | null> => {
  const path = "/gallery.json";

  try {
    const { data } = await rest().get<Tweets>(path);
    return data;
  } catch (error) {
    errorHandle(error);
    return null;
  }
};

export { getTweets };
