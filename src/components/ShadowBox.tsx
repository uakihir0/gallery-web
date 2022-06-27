import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

export const ShadowBox = ({ children }: { children: ReactNode }) => {
  return (
    <Box //
      boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.4),0 4px 6px -2px rgba(0, 0, 0, 0.2);"
    >
      {children}
    </Box>
  );
};
