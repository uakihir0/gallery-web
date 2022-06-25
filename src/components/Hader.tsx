import React from "react";
import {
  Box,
  Text,
  Center,
  Flex,
  Drawer,
  Spacer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { AboutSite } from "./AboutSite";
import { Info } from "react-feather";

export const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex>
        <Center //
          mb={6}
          w="100%"
          bg="#00acee"
          boxShadow="md"
        >
          <Text //
            my={1.5}
            color="white"
            fontSize="2xl"
            fontWeight={700}
          >
            Twitter Illustration Gallery
          </Text>
        </Center>
        <Flex //
          w="100%"
          h="100%"
          position="absolute"
        >
          <Spacer />
          <Box //
            mx={3}
            my={3}
            onClick={() => {
              onOpen();
            }}
          >
            <Info color="white" />
          </Box>
        </Flex>
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size="lg">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <AboutSite />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
