import axios, { AxiosResponse } from "axios";

type Data = { [key: string]: string | number | boolean | object };

export const rest = () => {
  const url = "https://uakihir0.github.io/gallery-data";

  const client = axios.create({
    baseURL: url,
    timeout: 15000,
  });

  return {
    client,

    get: <T = any, R = AxiosResponse<T>>( //
      url: string
    ): Promise<R> => {
      return client.get(url);
    },
  };
};
