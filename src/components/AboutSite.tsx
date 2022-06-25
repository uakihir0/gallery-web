import React from "react";
import { Link, Box, Text, Heading } from "@chakra-ui/react";

export const AboutSite = () => {
  return (
    <>
      <Box //
        mt={8}
        w="100%"
      >
        <Box my={8}>
          <Heading size="md">このサイトについて</Heading>
          <Text mt={4}>
            　本サイトは、Twitter でお気に入り登録件数が <b>一万件</b>
            を超えている画像付きツイートの中で、
            イラストとして完成度の高い作品のみに絞って、ギャラリー形式でイラストを掲載しています。
            ばらつきはありますが、一時間毎に数件イラストが自動で先頭に追加されます。
            また、ギャラリー内のイラストをクリックすると、作者のツイート内容が確認できます。
          </Text>
        </Box>
        <Box my={8}>
          <Heading size="md">お問い合わせ</Heading>
          <Text mt={4}>
            　このサイトについて、ご要望・お問い合わせ等ございましたら、お手数ですが、
            制作者の Twitter アカウントである
            <Link //
              mx={2}
              href="https://twitter.com/uakihir0"
            >
              <b>@uakihir0</b>
            </Link>
            までご連絡ください。
          </Text>
        </Box>
      </Box>
    </>
  );
};
