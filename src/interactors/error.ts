import { createStandaloneToast } from "@chakra-ui/react";

const errorHandle = (error: any) => {
  const { toast } = createStandaloneToast();

  const message =
    error.response && error.response.data //
      ? error.response.data.message
      : "不明なエラーです。時間をおいて試してみてください。それでも改善しない場合はサポートまでご連絡ください。";

  toast({
    title: `${message}`,
    status: "warning",
    isClosable: true,
    position: "top",
  });
};

export { errorHandle };
