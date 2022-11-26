import { type AppType } from "next/app";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import {
  Box,
  Button,
  ChakraProvider,
  Container,
  HStack,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <ChakraProvider>
        <div className="min-h-screen w-screen">
          <Container maxW="3xl">
            <Box padding="4">
              <VStack spacing={4} align="flex-start">
                <HStack spacing={4}>
                  <Button as={Link} href="/">
                    Index
                  </Button>
                  <Button as={Link} href="/create">
                    Create
                  </Button>
                  <Button as={Link} href="/search">
                    Search
                  </Button>
                </HStack>
                <Component {...pageProps} />
              </VStack>
            </Box>
          </Container>
        </div>
      </ChakraProvider>
    </>
  );
};

export default trpc.withTRPC(MyApp);
