import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export const ShadowBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box boxShadow="lg">
      <Box boxShadow="lg">
        <Box boxShadow="lg">
          <Box boxShadow="lg">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};
